import { FastifyInstance } from 'fastify';
import { Prisma } from '@prisma/client';
import { jsonSchemas } from 'tiny-inventory-shared';
import type { CreateInventory, UpdateInventory, InventoryListQuery, InventoryBatchRequest, InventoryBatchErrorItem, InventoryBatchResultItem } from 'tiny-inventory-shared';
import { notFound } from '../plugins/errors';
import { parsePagination, paginate } from '../utils/pagination';
import { handlePrismaError } from '../utils/prisma-errors';

const {
  inventoryResponse,
  inventoryWithRelationsResponse,
  inventoryCreateBody,
  inventoryUpdateBody,
  inventoryListQuery,
  inventoryBatchBody,
  inventoryBatchResponse,
  idParamSchema,
  storeIdParamSchema,
  errorSchema,
  paginatedResponse,
} = jsonSchemas;

const inventoryListResponse = paginatedResponse(inventoryWithRelationsResponse);

const LOW_STOCK_THRESHOLD = 10;

function buildInventoryWhere(query: InventoryListQuery, storeId?: number): Prisma.InventoryWhereInput {
  const where: Prisma.InventoryWhereInput = {};
  if (storeId !== undefined) where.storeId = storeId;
  else if (query.storeId !== undefined) where.storeId = query.storeId;

  if (query.stockLevel === 'out_of_stock') where.quantity = 0;
  else if (query.stockLevel === 'low_stock') where.quantity = { gt: 0, lte: LOW_STOCK_THRESHOLD };
  else if (query.stockLevel === 'in_stock') where.quantity = { gt: LOW_STOCK_THRESHOLD };

  const productWhere: Prisma.ProductWhereInput = {};
  if (query.category) productWhere.category = query.category;
  if (query.minPrice !== undefined || query.maxPrice !== undefined) {
    productWhere.price = {};
    if (query.minPrice !== undefined) productWhere.price.gte = query.minPrice;
    if (query.maxPrice !== undefined) productWhere.price.lte = query.maxPrice;
  }
  if (Object.keys(productWhere).length > 0) where.product = productWhere;

  return where;
}

function validateNoDuplicatePairs(items: InventoryBatchRequest['items']): InventoryBatchErrorItem[] {
  const seen = new Set<string>();
  const errors: InventoryBatchErrorItem[] = [];
  for (let i = 0; i < items.length; i++) {
    const item = items[i];
    const pairKey = `${item.storeName}:${item.sku}`;
    if (seen.has(pairKey)) {
      errors.push({ row: i + 1, storeName: item.storeName, sku: item.sku, error: `Duplicate entry for store '${item.storeName}' + SKU '${item.sku}' in this batch` });
    }
    seen.add(pairKey);
  }
  return errors;
}

const includeRelations = { store: true, product: true } as const;

export default async function inventoryRoutes(fastify: FastifyInstance) {
  // POST /api/inventory
  fastify.post<{ Body: CreateInventory }>('/inventory', {
    schema: {
      body: inventoryCreateBody,
      response: { 201: inventoryResponse, 400: errorSchema, 404: errorSchema, 409: errorSchema },
    },
    handler: async (request, reply) => {
      const inventory = await fastify.prisma.$transaction(async (tx) => {
        const [store, product] = await Promise.all([
          tx.store.findUnique({ where: { id: request.body.storeId } }),
          tx.product.findUnique({ where: { id: request.body.productId } }),
        ]);
        if (!store) throw notFound('Store');
        if (!product) throw notFound('Product');

        try {
          return await tx.inventory.create({
            data: {
              storeId: request.body.storeId,
              productId: request.body.productId,
              quantity: request.body.quantity,
            },
          });
        } catch (err) {
          throw handlePrismaError(err, 'Inventory');
        }
      });

      return reply.status(201).send(inventory);
    },
  });

  // POST /api/inventory/batch
  fastify.post<{ Body: InventoryBatchRequest }>('/inventory/batch', {
    schema: {
      body: inventoryBatchBody,
      response: { 200: inventoryBatchResponse },
    },
    handler: async (request, reply) => {
      const { items } = request.body;

      const duplicateErrors = validateNoDuplicatePairs(items);
      if (duplicateErrors.length > 0) {
        return reply.send({ success: false, created: 0, updated: 0, errors: duplicateErrors, results: [] });
      }

      // Split into batches of 100, each with its own transaction (validate + upsert)
      const BATCH_SIZE = 100;
      const allErrors: InventoryBatchErrorItem[] = [];
      const allResults: InventoryBatchResultItem[] = [];

      for (let i = 0; i < items.length; i += BATCH_SIZE) {
        const chunk = items.slice(i, i + BATCH_SIZE);
        const chunkOffset = i;

        await fastify.prisma.$transaction(async (tx) => {
          // 1. Collect unique store names and SKUs for this chunk
          const storeNames = [...new Set(chunk.map((c) => c.storeName))];
          const skus = [...new Set(chunk.map((c) => c.sku))];

          // 2. Fetch stores and products
          const [stores, products] = await Promise.all([
            tx.store.findMany({ where: { name: { in: storeNames } } }),
            tx.product.findMany({ where: { sku: { in: skus } } }),
          ]);

          // 3. Build lookup maps
          const storesByName = new Map<string, typeof stores>();
          for (const s of stores) {
            const list = storesByName.get(s.name) ?? [];
            list.push(s);
            storesByName.set(s.name, list);
          }
          const productsBySku = new Map(products.map((p) => [p.sku, p]));

          // 4. Validate each row
          type ResolvedRow = { row: number; storeId: number; productId: number; quantity: number; storeName: string; sku: string };
          const resolvedRows: ResolvedRow[] = [];

          for (let j = 0; j < chunk.length; j++) {
            const item = chunk[j];
            const row = chunkOffset + j + 1;

            const matchingStores = storesByName.get(item.storeName);
            if (!matchingStores || matchingStores.length === 0) {
              allErrors.push({ row, storeName: item.storeName, sku: item.sku, error: `Store '${item.storeName}' not found` });
              continue;
            }
            if (matchingStores.length > 1) {
              allErrors.push({ row, storeName: item.storeName, sku: item.sku, error: `Ambiguous store name '${item.storeName}' — ${matchingStores.length} stores match` });
              continue;
            }
            const store = matchingStores[0];
            if (!store.isActive) {
              allErrors.push({ row, storeName: item.storeName, sku: item.sku, error: `Store '${item.storeName}' is inactive` });
              continue;
            }

            const product = productsBySku.get(item.sku);
            if (!product) {
              allErrors.push({ row, storeName: item.storeName, sku: item.sku, error: `Product with SKU '${item.sku}' not found` });
              continue;
            }
            if (!product.isActive) {
              allErrors.push({ row, storeName: item.storeName, sku: item.sku, error: `Product '${item.sku}' is inactive` });
              continue;
            }

            resolvedRows.push({ row, storeId: store.id, productId: product.id, quantity: item.quantity, storeName: item.storeName, sku: item.sku });
          }

          // 5. If this chunk has no valid rows, skip upsert
          if (resolvedRows.length === 0) return;

          // 6. Pre-query existing records to determine create vs update
          const existing = await tx.inventory.findMany({
            where: {
              OR: resolvedRows.map((r) => ({ storeId: r.storeId, productId: r.productId })),
            },
            select: { storeId: true, productId: true },
          });
          const existingSet = new Set(existing.map((e) => `${e.storeId}:${e.productId}`));

          // 7. Bulk upsert via raw SQL
          const values = resolvedRows.map((r) =>
            Prisma.sql`(${r.storeId}, ${r.productId}, ${r.quantity}, NOW(), NOW())`
          );
          await tx.$executeRaw`
            INSERT INTO inventory (storeId, productId, quantity, createdAt, updatedAt)
            VALUES ${Prisma.join(values)}
            ON DUPLICATE KEY UPDATE quantity = VALUES(quantity), updatedAt = NOW()
          `;

          for (const row of resolvedRows) {
            const pairKey = `${row.storeId}:${row.productId}`;
            allResults.push({
              row: row.row,
              storeName: row.storeName,
              sku: row.sku,
              quantity: row.quantity,
              status: existingSet.has(pairKey) ? 'updated' : 'created',
            });
          }
        });
      }

      const created = allResults.filter((r) => r.status === 'created').length;
      const updated = allResults.filter((r) => r.status === 'updated').length;

      return reply.send({ success: true, created, updated, errors: allErrors, results: allResults });
    },
  });

  // GET /api/inventory (global)
  fastify.get<{ Querystring: InventoryListQuery }>('/inventory', {
    schema: {
      querystring: inventoryListQuery,
      response: { 200: inventoryListResponse },
    },
    handler: async (request) => {
      const { page, pageSize } = parsePagination(request.query);
      const where = buildInventoryWhere(request.query);

      const [data, total] = await Promise.all([
        fastify.prisma.inventory.findMany({
          where,
          include: includeRelations,
          skip: (page - 1) * pageSize,
          take: pageSize,
          orderBy: { createdAt: 'desc' },
        }),
        fastify.prisma.inventory.count({ where }),
      ]);

      return paginate(data, total, { page, pageSize });
    },
  });

  // GET /api/stores/:storeId/inventory (per-store)
  fastify.get<{
    Params: { storeId: number };
    Querystring: InventoryListQuery;
  }>('/stores/:storeId/inventory', {
    schema: {
      params: storeIdParamSchema,
      querystring: inventoryListQuery,
      response: { 200: inventoryListResponse, 404: errorSchema },
    },
    handler: async (request) => {
      const store = await fastify.prisma.store.findUnique({
        where: { id: request.params.storeId },
      });
      if (!store) throw notFound('Store');

      const { page, pageSize } = parsePagination(request.query);
      const where = buildInventoryWhere(request.query, request.params.storeId);

      const [data, total] = await Promise.all([
        fastify.prisma.inventory.findMany({
          where,
          include: includeRelations,
          skip: (page - 1) * pageSize,
          take: pageSize,
          orderBy: { createdAt: 'desc' },
        }),
        fastify.prisma.inventory.count({ where }),
      ]);

      return paginate(data, total, { page, pageSize });
    },
  });

  // PATCH /api/inventory/:id
  fastify.patch<{ Params: { id: number }; Body: UpdateInventory }>('/inventory/:id', {
    schema: {
      params: idParamSchema,
      body: inventoryUpdateBody,
      response: { 200: inventoryResponse, 400: errorSchema, 404: errorSchema },
    },
    handler: async (request, reply) => {
      try {
        const updated = await fastify.prisma.inventory.update({
          where: { id: request.params.id },
          data: { quantity: request.body.quantity },
        });
        return reply.send(updated);
      } catch (err) {
        throw handlePrismaError(err, 'Inventory');
      }
    },
  });

  // DELETE /api/inventory/:id
  fastify.delete<{ Params: { id: number } }>('/inventory/:id', {
    schema: {
      params: idParamSchema,
      response: { 204: { type: 'null' }, 404: errorSchema },
    },
    handler: async (request, reply) => {
      try {
        await fastify.prisma.inventory.delete({
          where: { id: request.params.id },
        });
        return reply.status(204).send();
      } catch (err) {
        throw handlePrismaError(err, 'Inventory');
      }
    },
  });
}
