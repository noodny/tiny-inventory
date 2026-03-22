import { FastifyInstance } from 'fastify';

const itemProperties = {
  id: { type: 'integer' },
  name: { type: 'string' },
  description: { type: 'string', nullable: true },
  quantity: { type: 'integer' },
  price: { type: 'string' },
  createdAt: { type: 'string', format: 'date-time' },
  updatedAt: { type: 'string', format: 'date-time' },
};

const itemSchema = {
  type: 'object',
  properties: itemProperties,
};

const errorSchema = {
  type: 'object',
  properties: { message: { type: 'string' } },
};

export default async function itemsRoutes(fastify: FastifyInstance) {
  // GET /api/items
  fastify.get('/items', {
    schema: {
      response: {
        200: { type: 'array', items: itemSchema },
      },
    },
    handler: async () => {
      return fastify.prisma.item.findMany({ orderBy: { createdAt: 'desc' } });
    },
  });

  // GET /api/items/:id
  fastify.get<{ Params: { id: string } }>('/items/:id', {
    schema: {
      params: {
        type: 'object',
        required: ['id'],
        properties: { id: { type: 'string' } },
      },
      response: {
        200: itemSchema,
        404: errorSchema,
      },
    },
    handler: async (request, reply) => {
      const id = parseInt(request.params.id, 10);
      const item = await fastify.prisma.item.findUnique({ where: { id } });
      if (!item) {
        return reply.status(404).send({ message: 'Item not found' });
      }
      return item;
    },
  });

  // POST /api/items
  fastify.post<{
    Body: { name: string; description?: string; quantity: number; price: number };
  }>('/items', {
    schema: {
      body: {
        type: 'object',
        required: ['name', 'quantity', 'price'],
        properties: {
          name: { type: 'string', minLength: 1, maxLength: 255 },
          description: { type: 'string', maxLength: 1000 },
          quantity: { type: 'integer', minimum: 0 },
          price: { type: 'number', minimum: 0 },
        },
      },
      response: {
        201: itemSchema,
      },
    },
    handler: async (request, reply) => {
      const item = await fastify.prisma.item.create({
        data: {
          name: request.body.name,
          description: request.body.description ?? null,
          quantity: request.body.quantity,
          price: request.body.price,
        },
      });
      return reply.status(201).send(item);
    },
  });

  // PATCH /api/items/:id
  fastify.patch<{
    Params: { id: string };
    Body: { name?: string; description?: string; quantity?: number; price?: number };
  }>('/items/:id', {
    schema: {
      params: {
        type: 'object',
        required: ['id'],
        properties: { id: { type: 'string' } },
      },
      body: {
        type: 'object',
        properties: {
          name: { type: 'string', minLength: 1, maxLength: 255 },
          description: { type: 'string', maxLength: 1000 },
          quantity: { type: 'integer', minimum: 0 },
          price: { type: 'number', minimum: 0 },
        },
      },
      response: {
        200: itemSchema,
        404: errorSchema,
      },
    },
    handler: async (request, reply) => {
      const id = parseInt(request.params.id, 10);
      const existing = await fastify.prisma.item.findUnique({ where: { id } });
      if (!existing) {
        return reply.status(404).send({ message: 'Item not found' });
      }
      const item = await fastify.prisma.item.update({
        where: { id },
        data: request.body,
      });
      return item;
    },
  });

  // DELETE /api/items/:id
  fastify.delete<{ Params: { id: string } }>('/items/:id', {
    schema: {
      params: {
        type: 'object',
        required: ['id'],
        properties: { id: { type: 'string' } },
      },
      response: {
        204: { type: 'null' },
        404: errorSchema,
      },
    },
    handler: async (request, reply) => {
      const id = parseInt(request.params.id, 10);
      const existing = await fastify.prisma.item.findUnique({ where: { id } });
      if (!existing) {
        return reply.status(404).send({ message: 'Item not found' });
      }
      await fastify.prisma.item.delete({ where: { id } });
      return reply.status(204).send();
    },
  });
}
