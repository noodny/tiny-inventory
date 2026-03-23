import { FastifyInstance } from 'fastify';
import { Prisma } from '@prisma/client';
import { jsonSchemas } from 'tiny-inventory-shared';
import type { CreateProduct, UpdateProduct, ProductListQuery } from 'tiny-inventory-shared';
import { notFound, conflict, badRequest } from '../plugins/errors';
import { parsePagination, paginate } from '../utils/pagination';
import { handlePrismaError } from '../utils/prisma-errors';

const {
  productResponse,
  productCreateBody,
  productUpdateBody,
  productListQuery,
  idParamSchema,
  errorSchema,
  paginatedResponse,
} = jsonSchemas;

const productListResponse = paginatedResponse(productResponse);

export default async function productRoutes(fastify: FastifyInstance) {
  // POST /api/products
  fastify.post<{ Body: CreateProduct }>('/products', {
    schema: {
      body: productCreateBody,
      response: { 201: productResponse, 400: errorSchema, 409: errorSchema },
    },
    handler: async (request, reply) => {
      try {
        const product = await fastify.prisma.product.create({
          data: {
            sku: request.body.sku,
            name: request.body.name,
            category: request.body.category,
            description: request.body.description ?? null,
            price: request.body.price,
          },
        });
        return reply.status(201).send(product);
      } catch (err) {
        throw handlePrismaError(err);
      }
    },
  });

  // GET /api/products
  fastify.get<{ Querystring: ProductListQuery }>('/products', {
    schema: {
      querystring: productListQuery,
      response: { 200: productListResponse },
    },
    handler: async (request) => {
      const { page, pageSize } = parsePagination(request.query);
      const where: Prisma.ProductWhereInput = {};

      if (request.query.isActive !== undefined) where.isActive = request.query.isActive;
      if (request.query.category) where.category = request.query.category;
      if (request.query.minPrice !== undefined || request.query.maxPrice !== undefined) {
        where.price = {};
        if (request.query.minPrice !== undefined) where.price.gte = request.query.minPrice;
        if (request.query.maxPrice !== undefined) where.price.lte = request.query.maxPrice;
      }

      const [data, total] = await Promise.all([
        fastify.prisma.product.findMany({
          where,
          skip: (page - 1) * pageSize,
          take: pageSize,
          orderBy: { createdAt: 'desc' },
        }),
        fastify.prisma.product.count({ where }),
      ]);

      return paginate(data, total, { page, pageSize });
    },
  });

  // GET /api/products/:id
  fastify.get<{ Params: { id: number } }>('/products/:id', {
    schema: {
      params: idParamSchema,
      response: { 200: productResponse, 404: errorSchema },
    },
    handler: async (request, reply) => {
      const product = await fastify.prisma.product.findUnique({
        where: { id: request.params.id },
      });
      if (!product) throw notFound('Product');
      return reply.send(product);
    },
  });

  // PATCH /api/products/:id
  fastify.patch<{ Params: { id: number }; Body: UpdateProduct }>('/products/:id', {
    schema: {
      params: idParamSchema,
      body: productUpdateBody,
      response: { 200: productResponse, 400: errorSchema, 404: errorSchema, 409: errorSchema },
    },
    handler: async (request, reply) => {
      if (Object.keys(request.body).length === 0) {
        throw badRequest('At least one field must be provided');
      }

      try {
        const updated = await fastify.prisma.product.update({
          where: { id: request.params.id },
          data: request.body,
        });
        return reply.send(updated);
      } catch (err) {
        throw handlePrismaError(err, 'Product');
      }
    },
  });

  // DELETE /api/products/:id
  fastify.delete<{ Params: { id: number } }>('/products/:id', {
    schema: {
      params: idParamSchema,
      response: { 204: { type: 'null' }, 404: errorSchema, 409: errorSchema },
    },
    handler: async (request, reply) => {
      await fastify.prisma.$transaction(async (tx) => {
        const product = await tx.product.findUnique({
          where: { id: request.params.id },
        });
        if (!product) throw notFound('Product');

        const inventoryCount = await tx.inventory.count({
          where: { productId: request.params.id },
        });
        if (inventoryCount > 0) {
          throw conflict(
            'Product has inventory records. Deactivate it instead or remove inventory first.',
          );
        }

        await tx.product.delete({ where: { id: request.params.id } });
      });

      return reply.status(204).send();
    },
  });
}
