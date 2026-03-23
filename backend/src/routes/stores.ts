import { FastifyInstance } from 'fastify';
import { jsonSchemas } from 'tiny-inventory-shared';
import type { CreateStore, UpdateStore, StoreListQuery } from 'tiny-inventory-shared';
import { notFound, conflict, badRequest } from '../plugins/errors';
import { parsePagination, paginate } from '../utils/pagination';
import { handlePrismaError } from '../utils/prisma-errors';

const { storeResponse, storeCreateBody, storeUpdateBody, storeListQuery, idParamSchema, errorSchema, paginatedResponse } = jsonSchemas;

const storeListResponse = paginatedResponse(storeResponse);

export default async function storeRoutes(fastify: FastifyInstance) {
  // POST /api/stores
  fastify.post<{ Body: CreateStore }>('/stores', {
    schema: {
      body: storeCreateBody,
      response: { 201: storeResponse, 400: errorSchema, 409: errorSchema },
    },
    handler: async (request, reply) => {
      try {
        const store = await fastify.prisma.store.create({
          data: { name: request.body.name },
        });
        return reply.status(201).send(store);
      } catch (err) {
        throw handlePrismaError(err);
      }
    },
  });

  // GET /api/stores
  fastify.get<{ Querystring: StoreListQuery }>('/stores', {
    schema: {
      querystring: storeListQuery,
      response: { 200: storeListResponse },
    },
    handler: async (request) => {
      const { page, pageSize } = parsePagination(request.query);
      const where: Record<string, unknown> = {};
      if (request.query.isActive !== undefined) {
        where.isActive = request.query.isActive;
      }

      const [data, total] = await Promise.all([
        fastify.prisma.store.findMany({
          where,
          skip: (page - 1) * pageSize,
          take: pageSize,
          orderBy: { createdAt: 'desc' },
        }),
        fastify.prisma.store.count({ where }),
      ]);

      return paginate(data, total, { page, pageSize });
    },
  });

  // GET /api/stores/:id
  fastify.get<{ Params: { id: number } }>('/stores/:id', {
    schema: {
      params: idParamSchema,
      response: { 200: storeResponse, 404: errorSchema },
    },
    handler: async (request, reply) => {
      const store = await fastify.prisma.store.findUnique({
        where: { id: request.params.id },
      });
      if (!store) throw notFound('Store');
      return reply.send(store);
    },
  });

  // PATCH /api/stores/:id
  fastify.patch<{ Params: { id: number }; Body: UpdateStore }>('/stores/:id', {
    schema: {
      params: idParamSchema,
      body: storeUpdateBody,
      response: { 200: storeResponse, 400: errorSchema, 404: errorSchema },
    },
    handler: async (request, reply) => {
      if (Object.keys(request.body).length === 0) {
        throw badRequest('At least one field must be provided');
      }

      try {
        const updated = await fastify.prisma.store.update({
          where: { id: request.params.id },
          data: request.body,
        });
        return reply.send(updated);
      } catch (err) {
        throw handlePrismaError(err, 'Store');
      }
    },
  });

  // DELETE /api/stores/:id
  fastify.delete<{ Params: { id: number } }>('/stores/:id', {
    schema: {
      params: idParamSchema,
      response: { 204: { type: 'null' }, 404: errorSchema, 409: errorSchema },
    },
    handler: async (request, reply) => {
      await fastify.prisma.$transaction(async (tx) => {
        const store = await tx.store.findUnique({
          where: { id: request.params.id },
        });
        if (!store) throw notFound('Store');

        const inventoryCount = await tx.inventory.count({
          where: { storeId: request.params.id },
        });
        if (inventoryCount > 0) {
          throw conflict(
            'Store has inventory records. Deactivate it instead or remove inventory first.',
          );
        }

        await tx.store.delete({ where: { id: request.params.id } });
      });

      return reply.status(204).send();
    },
  });
}
