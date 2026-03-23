import { describe, it, expect } from 'vitest';
import Fastify from 'fastify';
import errorPlugin from '../plugins/errors';
import { HttpError, notFound, conflict, badRequest } from '../plugins/errors';

function buildTestApp() {
  const app = Fastify();
  app.register(errorPlugin);

  // Route that throws HttpError variants
  app.get('/not-found', async () => {
    throw notFound('Store');
  });
  app.get('/conflict', async () => {
    throw conflict('Duplicate SKU');
  });
  app.get('/bad-request', async () => {
    throw badRequest('Invalid input', { field: 'name' });
  });
  app.get('/unexpected', async () => {
    throw new Error('kaboom');
  });

  // Route with body validation
  app.post(
    '/validated',
    {
      schema: {
        body: {
          type: 'object',
          required: ['name'],
          properties: { name: { type: 'string', minLength: 1 } },
        },
      },
    },
    async (req) => req.body,
  );

  return app;
}

describe('Error plugin', () => {
  const app = buildTestApp();

  it('returns 404 with standard error payload', async () => {
    const res = await app.inject({ method: 'GET', url: '/not-found' });
    expect(res.statusCode).toBe(404);
    expect(res.json()).toEqual({ code: 'NOT_FOUND', message: 'Store not found' });
  });

  it('returns 409 with standard error payload', async () => {
    const res = await app.inject({ method: 'GET', url: '/conflict' });
    expect(res.statusCode).toBe(409);
    expect(res.json()).toEqual({ code: 'CONFLICT', message: 'Duplicate SKU' });
  });

  it('returns 400 with details', async () => {
    const res = await app.inject({ method: 'GET', url: '/bad-request' });
    expect(res.statusCode).toBe(400);
    expect(res.json()).toEqual({
      code: 'BAD_REQUEST',
      message: 'Invalid input',
      details: { field: 'name' },
    });
  });

  it('returns 500 for unexpected errors', async () => {
    const res = await app.inject({ method: 'GET', url: '/unexpected' });
    expect(res.statusCode).toBe(500);
    expect(res.json()).toEqual({
      code: 'INTERNAL_ERROR',
      message: 'An unexpected error occurred',
    });
  });

  it('returns VALIDATION_ERROR for schema validation failures', async () => {
    const res = await app.inject({
      method: 'POST',
      url: '/validated',
      payload: {},
    });
    expect(res.statusCode).toBe(400);
    const body = res.json();
    expect(body.code).toBe('VALIDATION_ERROR');
    expect(body.message).toBe('Request validation failed');
    expect(body.details).toBeInstanceOf(Array);
    expect(body.details.length).toBeGreaterThan(0);
    expect(body.details[0]).toHaveProperty('field');
    expect(body.details[0]).toHaveProperty('message');
  });

  it('HttpError toPayload omits details when undefined', () => {
    const err = new HttpError(404, 'NOT_FOUND', 'Gone');
    expect(err.toPayload()).toEqual({ code: 'NOT_FOUND', message: 'Gone' });
  });
});
