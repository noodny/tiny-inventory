import { describe, it, expect, vi } from 'vitest';
import { PrismaClient } from '@prisma/client';
import { buildApp } from '../app';

// Build a typed mock for the parts of PrismaClient used by routes
const mockPrisma = {
  item: {
    findMany: vi.fn().mockResolvedValue([
      {
        id: 1,
        name: 'Test Item',
        description: 'A test item',
        quantity: 10,
        price: '19.99',
        sku: 'TEST-001',
        createdAt: new Date().toISOString(),
        updatedAt: new Date().toISOString(),
      },
    ]),
    findUnique: vi.fn().mockImplementation(({ where }: { where: { id: number } }) =>
      where.id === 1
        ? Promise.resolve({
            id: 1,
            name: 'Test Item',
            description: 'A test item',
            quantity: 10,
            price: '19.99',
            sku: 'TEST-001',
            createdAt: new Date().toISOString(),
            updatedAt: new Date().toISOString(),
          })
        : Promise.resolve(null),
    ),
    create: vi.fn().mockImplementation(({ data }: { data: Record<string, unknown> }) =>
      Promise.resolve({
        id: 2,
        ...data,
        price: String(data.price),
        createdAt: new Date().toISOString(),
        updatedAt: new Date().toISOString(),
      }),
    ),
    update: vi.fn().mockImplementation(({ data }: { data: Record<string, unknown> }) =>
      Promise.resolve({
        id: 1,
        name: 'Test Item',
        ...data,
        createdAt: new Date().toISOString(),
        updatedAt: new Date().toISOString(),
      }),
    ),
    delete: vi.fn().mockResolvedValue({}),
  },
} as unknown as PrismaClient;

describe('Items routes', () => {
  // Inject mock prisma to avoid needing a real database
  const app = buildApp({ prismaClient: mockPrisma });

  it('GET /api/items returns a list of items', async () => {
    const response = await app.inject({ method: 'GET', url: '/api/items' });
    expect(response.statusCode).toBe(200);
    const body = response.json();
    expect(Array.isArray(body)).toBe(true);
    expect(body[0]).toMatchObject({ id: 1, name: 'Test Item' });
  });

  it('GET /api/items/1 returns a single item', async () => {
    const response = await app.inject({ method: 'GET', url: '/api/items/1' });
    expect(response.statusCode).toBe(200);
    expect(response.json()).toMatchObject({ id: 1, name: 'Test Item' });
  });

  it('GET /api/items/999 returns 404', async () => {
    const response = await app.inject({ method: 'GET', url: '/api/items/999' });
    expect(response.statusCode).toBe(404);
    expect(response.json()).toMatchObject({ message: 'Item not found' });
  });

  it('POST /api/items creates a new item', async () => {
    const response = await app.inject({
      method: 'POST',
      url: '/api/items',
      payload: { name: 'New Item', quantity: 5, price: 9.99 },
    });
    expect(response.statusCode).toBe(201);
    expect(response.json()).toMatchObject({ name: 'New Item' });
  });

  it('POST /api/items with missing fields returns 400', async () => {
    const response = await app.inject({
      method: 'POST',
      url: '/api/items',
      payload: { name: 'Incomplete' },
    });
    expect(response.statusCode).toBe(400);
  });

  it('DELETE /api/items/1 returns 204', async () => {
    const response = await app.inject({ method: 'DELETE', url: '/api/items/1' });
    expect(response.statusCode).toBe(204);
  });

  it('DELETE /api/items/999 returns 404', async () => {
    const response = await app.inject({ method: 'DELETE', url: '/api/items/999' });
    expect(response.statusCode).toBe(404);
  });
});
