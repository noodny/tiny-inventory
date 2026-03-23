import { FastifyInstance } from 'fastify';
import { Prisma } from '@prisma/client';
import { jsonSchemas } from 'tiny-inventory-shared';
import type { CreateInventory, UpdateInventory, InventoryListQuery } from 'tiny-inventory-shared';
import { notFound } from '../plugins/errors';
import { parsePagination, paginate } from '../utils/pagination';
import { handlePrismaError } from '../utils/prisma-errors';

const {
  inventoryResponse,
  inventoryWithRelationsResponse,
  inventoryCreateBody,
  inventoryUpdateBody,
  inventoryListQuery,
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
