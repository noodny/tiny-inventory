import { describe, it, expect, vi, beforeEach } from 'vitest';
import { Prisma } from '@prisma/client';
import { buildApp } from '../app';

const p2025 = new Prisma.PrismaClientKnownRequestError('Record not found', {
  code: 'P2025',
  clientVersion: '6.0.0',
});

const mockStore = { id: 1, name: 'Store', isActive: true, createdAt: new Date().toISOString(), updatedAt: new Date().toISOString() };
const mockProduct = { id: 1, sku: 'KB-001', name: 'Keyboard', category: 'Peripherals', description: null, price: '49.99', isActive: true, createdAt: new Date().toISOString(), updatedAt: new Date().toISOString() };
const mockInventory = { id: 1, storeId: 1, productId: 1, quantity: 10, createdAt: new Date().toISOString(), updatedAt: new Date().toISOString() };
const mockInventoryWithRelations = { ...mockInventory, store: mockStore, product: mockProduct };

const storeMock = {
  create: vi.fn(), findMany: vi.fn().mockResolvedValue([]),
  findUnique: vi.fn().mockImplementation(({ where }: { where: { id: number } }) =>
    where.id === 1 ? Promise.resolve(mockStore) : Promise.resolve(null),
  ),
  count: vi.fn().mockResolvedValue(0), update: vi.fn(), delete: vi.fn(),
};

const productMock = {
  create: vi.fn(), findMany: vi.fn().mockResolvedValue([]),
  findUnique: vi.fn().mockImplementation(({ where }: { where: { id: number } }) =>
    where.id === 1 ? Promise.resolve(mockProduct) : Promise.resolve(null),
  ),
  count: vi.fn().mockResolvedValue(0), update: vi.fn(), delete: vi.fn(),
};

const inventoryMock = {
  create: vi.fn().mockResolvedValue(mockInventory),
  findMany: vi.fn().mockResolvedValue([mockInventoryWithRelations]),
  findUnique: vi.fn().mockImplementation(({ where }: { where: { id: number } }) =>
    where.id === 1 ? Promise.resolve(mockInventory) : Promise.resolve(null),
  ),
  count: vi.fn().mockResolvedValue(1),
  update: vi.fn().mockResolvedValue({ ...mockInventory, quantity: 20 }),
  delete: vi.fn().mockResolvedValue(mockInventory),
};

const mockPrisma = {
  store: storeMock,
  product: productMock,
  inventory: inventoryMock,
  $transaction: vi.fn().mockImplementation((fn: (tx: typeof mockPrisma) => Promise<unknown>) => fn(mockPrisma)),
  $disconnect: async () => {},
} as never;

describe('Inventory routes', () => {
  const app = buildApp({ prismaClient: mockPrisma });

  beforeEach(() => {
    vi.clearAllMocks();
    storeMock.findUnique.mockImplementation(({ where }: { where: { id: number } }) =>
      where.id === 1 ? Promise.resolve(mockStore) : Promise.resolve(null),
    );
    productMock.findUnique.mockImplementation(({ where }: { where: { id: number } }) =>
      where.id === 1 ? Promise.resolve(mockProduct) : Promise.resolve(null),
    );
    inventoryMock.count.mockResolvedValue(1);
  });

  // POST /api/inventory
  it('POST /api/inventory creates an assignment', async () => {
    const res = await app.inject({
      method: 'POST',
      url: '/api/inventory',
      payload: { storeId: 1, productId: 1, quantity: 10 },
    });
    expect(res.statusCode).toBe(201);
    expect(res.json()).toMatchObject({ storeId: 1, productId: 1, quantity: 10 });
  });

  it('POST /api/inventory returns 404 for missing store', async () => {
    const res = await app.inject({
      method: 'POST',
      url: '/api/inventory',
      payload: { storeId: 999, productId: 1, quantity: 5 },
    });
    expect(res.statusCode).toBe(404);
    expect(res.json()).toMatchObject({ code: 'NOT_FOUND', message: 'Store not found' });
  });

  it('POST /api/inventory returns 404 for missing product', async () => {
    const res = await app.inject({
      method: 'POST',
      url: '/api/inventory',
      payload: { storeId: 1, productId: 999, quantity: 5 },
    });
    expect(res.statusCode).toBe(404);
    expect(res.json()).toMatchObject({ code: 'NOT_FOUND', message: 'Product not found' });
  });

  it('POST /api/inventory returns 409 on duplicate storeId+productId', async () => {
    const prismaError = new Prisma.PrismaClientKnownRequestError('Unique constraint', {
      code: 'P2002',
      clientVersion: '6.0.0',
      meta: { target: ['storeId', 'productId'] },
    });
    inventoryMock.create.mockRejectedValueOnce(prismaError);

    const res = await app.inject({
      method: 'POST',
      url: '/api/inventory',
      payload: { storeId: 1, productId: 1, quantity: 5 },
    });
    expect(res.statusCode).toBe(409);
    expect(res.json()).toMatchObject({ code: 'CONFLICT' });
  });

  it('POST /api/inventory rejects negative quantity', async () => {
    const res = await app.inject({
      method: 'POST',
      url: '/api/inventory',
      payload: { storeId: 1, productId: 1, quantity: -5 },
    });
    expect(res.statusCode).toBe(400);
  });

  // GET /api/inventory (global)
  it('GET /api/inventory returns paginated list with relations', async () => {
    const res = await app.inject({ method: 'GET', url: '/api/inventory' });
    expect(res.statusCode).toBe(200);
    const body = res.json();
    expect(body.data).toBeInstanceOf(Array);
    expect(body.data[0]).toHaveProperty('store');
    expect(body.data[0]).toHaveProperty('product');
    expect(body.meta).toHaveProperty('page');
  });

  it('GET /api/inventory supports category filter', async () => {
    await app.inject({ method: 'GET', url: '/api/inventory?category=Peripherals' });
    expect(inventoryMock.findMany).toHaveBeenCalledWith(
      expect.objectContaining({
        where: expect.objectContaining({
          product: expect.objectContaining({ category: 'Peripherals' }),
        }),
      }),
    );
  });

  it('GET /api/inventory supports stockLevel filter', async () => {
    await app.inject({ method: 'GET', url: '/api/inventory?stockLevel=out_of_stock' });
    expect(inventoryMock.findMany).toHaveBeenCalledWith(
      expect.objectContaining({ where: expect.objectContaining({ quantity: 0 }) }),
    );
  });

  // GET /api/stores/:storeId/inventory (per-store)
  it('GET /api/stores/1/inventory returns per-store inventory', async () => {
    const res = await app.inject({ method: 'GET', url: '/api/stores/1/inventory' });
    expect(res.statusCode).toBe(200);
    const body = res.json();
    expect(body.data).toBeInstanceOf(Array);
    expect(body.meta).toHaveProperty('page');
  });

  it('GET /api/stores/999/inventory returns 404', async () => {
    const res = await app.inject({ method: 'GET', url: '/api/stores/999/inventory' });
    expect(res.statusCode).toBe(404);
    expect(res.json()).toMatchObject({ code: 'NOT_FOUND' });
  });

  // PATCH /api/inventory/:id
  it('PATCH /api/inventory/1 updates quantity', async () => {
    const res = await app.inject({
      method: 'PATCH',
      url: '/api/inventory/1',
      payload: { quantity: 20 },
    });
    expect(res.statusCode).toBe(200);
    expect(res.json()).toMatchObject({ quantity: 20 });
  });

  it('PATCH /api/inventory/999 returns 404', async () => {
    inventoryMock.update.mockRejectedValueOnce(p2025);
    const res = await app.inject({
      method: 'PATCH',
      url: '/api/inventory/999',
      payload: { quantity: 5 },
    });
    expect(res.statusCode).toBe(404);
  });

  it('PATCH /api/inventory/1 rejects negative quantity', async () => {
    const res = await app.inject({
      method: 'PATCH',
      url: '/api/inventory/1',
      payload: { quantity: -1 },
    });
    expect(res.statusCode).toBe(400);
  });

  // DELETE /api/inventory/:id
  it('DELETE /api/inventory/1 returns 204', async () => {
    const res = await app.inject({ method: 'DELETE', url: '/api/inventory/1' });
    expect(res.statusCode).toBe(204);
    expect(inventoryMock.delete).toHaveBeenCalled();
  });

  it('DELETE /api/inventory/999 returns 404', async () => {
    inventoryMock.delete.mockRejectedValueOnce(p2025);
    const res = await app.inject({ method: 'DELETE', url: '/api/inventory/999' });
    expect(res.statusCode).toBe(404);
  });
});
