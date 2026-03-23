import { describe, it, expect, vi, beforeEach } from 'vitest';
import { Prisma } from '@prisma/client';
import { buildApp } from '../app';

const p2025 = new Prisma.PrismaClientKnownRequestError('Record not found', {
  code: 'P2025',
  clientVersion: '6.0.0',
});

const mockStoreData = {
  id: 1,
  name: 'Downtown Store',
  isActive: true,
  createdAt: new Date().toISOString(),
  updatedAt: new Date().toISOString(),
};

const storeMock = {
  create: vi.fn().mockResolvedValue(mockStoreData),
  findMany: vi.fn().mockResolvedValue([mockStoreData]),
  findUnique: vi.fn().mockImplementation(({ where }: { where: { id: number } }) =>
    where.id === 1 ? Promise.resolve(mockStoreData) : Promise.resolve(null),
  ),
  count: vi.fn().mockResolvedValue(1),
  update: vi.fn().mockResolvedValue({ ...mockStoreData, name: 'Updated Store' }),
  delete: vi.fn().mockResolvedValue(mockStoreData),
};

const inventoryMock = {
  count: vi.fn().mockResolvedValue(0),
};

// $transaction passes the same mock object to the callback
const mockPrisma = {
  store: storeMock,
  inventory: inventoryMock,
  $transaction: vi.fn().mockImplementation((fn: (tx: typeof mockPrisma) => Promise<unknown>) =>
    fn(mockPrisma),
  ),
  $disconnect: async () => {},
} as never;

describe('Store routes', () => {
  const app = buildApp({ prismaClient: mockPrisma });

  beforeEach(() => {
    vi.clearAllMocks();
    storeMock.findUnique.mockImplementation(
      ({ where }: { where: { id: number } }) =>
        where.id === 1 ? Promise.resolve(mockStoreData) : Promise.resolve(null),
    );
    inventoryMock.count.mockResolvedValue(0);
  });

  // POST /api/stores
  it('POST /api/stores creates a store', async () => {
    const res = await app.inject({
      method: 'POST',
      url: '/api/stores',
      payload: { name: 'New Store' },
    });
    expect(res.statusCode).toBe(201);
    expect(res.json()).toMatchObject({ name: 'Downtown Store' });
  });

  it('POST /api/stores rejects empty name', async () => {
    const res = await app.inject({
      method: 'POST',
      url: '/api/stores',
      payload: { name: '' },
    });
    expect(res.statusCode).toBe(400);
    expect(res.json().code).toBe('VALIDATION_ERROR');
  });

  it('POST /api/stores rejects missing body', async () => {
    const res = await app.inject({
      method: 'POST',
      url: '/api/stores',
      payload: {},
    });
    expect(res.statusCode).toBe(400);
  });

  // GET /api/stores
  it('GET /api/stores returns paginated list', async () => {
    const res = await app.inject({ method: 'GET', url: '/api/stores' });
    expect(res.statusCode).toBe(200);
    const body = res.json();
    expect(body.data).toBeInstanceOf(Array);
    expect(body.meta).toHaveProperty('page');
    expect(body.meta).toHaveProperty('totalPages');
  });

  it('GET /api/stores supports isActive filter', async () => {
    await app.inject({ method: 'GET', url: '/api/stores?isActive=true' });
    expect(storeMock.findMany).toHaveBeenCalledWith(
      expect.objectContaining({ where: { isActive: true } }),
    );
  });

  // GET /api/stores/:id
  it('GET /api/stores/1 returns the store', async () => {
    const res = await app.inject({ method: 'GET', url: '/api/stores/1' });
    expect(res.statusCode).toBe(200);
    expect(res.json()).toMatchObject({ id: 1, name: 'Downtown Store' });
  });

  it('GET /api/stores/999 returns 404', async () => {
    const res = await app.inject({ method: 'GET', url: '/api/stores/999' });
    expect(res.statusCode).toBe(404);
    expect(res.json()).toMatchObject({ code: 'NOT_FOUND' });
  });

  // PATCH /api/stores/:id
  it('PATCH /api/stores/1 updates the store', async () => {
    const res = await app.inject({
      method: 'PATCH',
      url: '/api/stores/1',
      payload: { name: 'Updated Store' },
    });
    expect(res.statusCode).toBe(200);
    expect(res.json()).toMatchObject({ name: 'Updated Store' });
  });

  it('PATCH /api/stores/999 returns 404', async () => {
    storeMock.update.mockRejectedValueOnce(p2025);
    const res = await app.inject({
      method: 'PATCH',
      url: '/api/stores/999',
      payload: { name: 'Nope' },
    });
    expect(res.statusCode).toBe(404);
  });

  it('PATCH /api/stores/1 with empty body returns 400', async () => {
    const res = await app.inject({
      method: 'PATCH',
      url: '/api/stores/1',
      payload: {},
    });
    expect(res.statusCode).toBe(400);
  });

  // DELETE /api/stores/:id
  it('DELETE /api/stores/1 returns 204', async () => {
    const res = await app.inject({ method: 'DELETE', url: '/api/stores/1' });
    expect(res.statusCode).toBe(204);
    expect(storeMock.delete).toHaveBeenCalled();
  });

  it('DELETE /api/stores/999 returns 404', async () => {
    const res = await app.inject({ method: 'DELETE', url: '/api/stores/999' });
    expect(res.statusCode).toBe(404);
  });

  it('DELETE /api/stores/1 returns 409 when inventory exists', async () => {
    inventoryMock.count.mockResolvedValue(3);
    const res = await app.inject({ method: 'DELETE', url: '/api/stores/1' });
    expect(res.statusCode).toBe(409);
    expect(res.json()).toMatchObject({ code: 'CONFLICT' });
  });
});
