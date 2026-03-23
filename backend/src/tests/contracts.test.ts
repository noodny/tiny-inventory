/**
 * PRD-11: Contract and validation test suite.
 *
 * Fills gaps in existing route tests — focuses on:
 * - Pagination metadata assertions
 * - Error payload shape consistency
 * - Explicit page/pageSize forwarding
 * - Combined filter scenarios
 * - Response field completeness
 */
import { describe, it, expect, vi, beforeEach } from 'vitest';
import { Prisma } from '@prisma/client';
import { buildApp } from '../app';

const now = new Date().toISOString();

const mockStore = { id: 1, name: 'Store A', isActive: true, createdAt: now, updatedAt: now };
const mockProduct = {
  id: 1, sku: 'KB-001', name: 'Keyboard', category: 'Peripherals',
  description: 'A keyboard', price: '49.99', isActive: true, createdAt: now, updatedAt: now,
};
const mockInventory = { id: 1, storeId: 1, productId: 1, quantity: 10, createdAt: now, updatedAt: now };
const mockInventoryWithRelations = { ...mockInventory, store: mockStore, product: mockProduct };

const storeMock = {
  create: vi.fn().mockResolvedValue(mockStore),
  findMany: vi.fn().mockResolvedValue([mockStore]),
  findUnique: vi.fn().mockResolvedValue(mockStore),
  count: vi.fn().mockResolvedValue(1),
  update: vi.fn().mockResolvedValue(mockStore),
  delete: vi.fn().mockResolvedValue(mockStore),
};

const productMock = {
  create: vi.fn().mockResolvedValue(mockProduct),
  findMany: vi.fn().mockResolvedValue([mockProduct]),
  findUnique: vi.fn().mockResolvedValue(mockProduct),
  count: vi.fn().mockResolvedValue(1),
  update: vi.fn().mockResolvedValue(mockProduct),
  delete: vi.fn().mockResolvedValue(mockProduct),
};

const inventoryMock = {
  create: vi.fn().mockResolvedValue(mockInventory),
  findMany: vi.fn().mockResolvedValue([mockInventoryWithRelations]),
  findUnique: vi.fn().mockResolvedValue(mockInventory),
  count: vi.fn().mockResolvedValue(25),
  update: vi.fn().mockResolvedValue(mockInventory),
  delete: vi.fn().mockResolvedValue(mockInventory),
};

const mockPrisma = {
  store: storeMock,
  product: productMock,
  inventory: inventoryMock,
  $transaction: vi.fn().mockImplementation((fn: (tx: typeof mockPrisma) => Promise<unknown>) => fn(mockPrisma)),
  $disconnect: async () => {},
} as never;

const app = buildApp({ prismaClient: mockPrisma });

beforeEach(() => vi.clearAllMocks());

// ---------------------------------------------------------------------------
// Pagination metadata
// ---------------------------------------------------------------------------

describe('Pagination metadata', () => {
  beforeEach(() => {
    storeMock.count.mockResolvedValue(45);
    productMock.count.mockResolvedValue(30);
    inventoryMock.count.mockResolvedValue(25);
  });

  it('GET /api/stores returns correct pagination meta', async () => {
    const res = await app.inject({ method: 'GET', url: '/api/stores?page=2&pageSize=10' });
    const body = res.json();
    expect(body.meta).toEqual({ page: 2, pageSize: 10, total: 45, totalPages: 5 });
  });

  it('GET /api/stores forwards skip/take to Prisma', async () => {
    await app.inject({ method: 'GET', url: '/api/stores?page=3&pageSize=5' });
    expect(storeMock.findMany).toHaveBeenCalledWith(
      expect.objectContaining({ skip: 10, take: 5 }),
    );
  });

  it('GET /api/products returns correct pagination meta', async () => {
    const res = await app.inject({ method: 'GET', url: '/api/products?page=2&pageSize=15' });
    const body = res.json();
    expect(body.meta).toEqual({ page: 2, pageSize: 15, total: 30, totalPages: 2 });
  });

  it('GET /api/inventory returns correct pagination meta', async () => {
    const res = await app.inject({ method: 'GET', url: '/api/inventory?page=1&pageSize=10' });
    const body = res.json();
    expect(body.meta).toEqual({ page: 1, pageSize: 10, total: 25, totalPages: 3 });
  });

  it('GET /api/stores/:storeId/inventory returns pagination meta', async () => {
    const res = await app.inject({ method: 'GET', url: '/api/stores/1/inventory?page=1&pageSize=5' });
    const body = res.json();
    expect(body.meta).toEqual({ page: 1, pageSize: 5, total: 25, totalPages: 5 });
  });
});

// ---------------------------------------------------------------------------
// Error contract shape
// ---------------------------------------------------------------------------

describe('Error contract shape', () => {
  const p2025 = new Prisma.PrismaClientKnownRequestError('Not found', {
    code: 'P2025', clientVersion: '6.0.0',
  });

  it('404 errors have code and message', async () => {
    storeMock.findUnique.mockResolvedValueOnce(null);
    const res = await app.inject({ method: 'GET', url: '/api/stores/999' });
    expect(res.statusCode).toBe(404);
    const body = res.json();
    expect(body).toHaveProperty('code', 'NOT_FOUND');
    expect(body).toHaveProperty('message');
    expect(typeof body.message).toBe('string');
  });

  it('409 errors have code and message', async () => {
    const p2002 = new Prisma.PrismaClientKnownRequestError('Unique', {
      code: 'P2002', clientVersion: '6.0.0', meta: { target: ['sku'] },
    });
    productMock.create.mockRejectedValueOnce(p2002);
    const res = await app.inject({
      method: 'POST', url: '/api/products',
      payload: { sku: 'X', name: 'X', category: 'X', price: 1 },
    });
    expect(res.statusCode).toBe(409);
    const body = res.json();
    expect(body).toHaveProperty('code', 'CONFLICT');
    expect(body).toHaveProperty('message');
  });

  it('400 validation errors have code, message, and details array', async () => {
    const res = await app.inject({
      method: 'POST', url: '/api/stores', payload: {},
    });
    expect(res.statusCode).toBe(400);
    const body = res.json();
    expect(body).toHaveProperty('code', 'VALIDATION_ERROR');
    expect(body).toHaveProperty('message', 'Request validation failed');
    expect(body.details).toBeInstanceOf(Array);
    expect(body.details[0]).toHaveProperty('field');
    expect(body.details[0]).toHaveProperty('message');
  });

  it('PATCH 404 via P2025 returns standard error shape', async () => {
    storeMock.update.mockRejectedValueOnce(p2025);
    const res = await app.inject({
      method: 'PATCH', url: '/api/stores/999', payload: { name: 'x' },
    });
    expect(res.statusCode).toBe(404);
    expect(res.json()).toHaveProperty('code', 'NOT_FOUND');
  });
});

// ---------------------------------------------------------------------------
// Response field completeness
// ---------------------------------------------------------------------------

describe('Response field completeness', () => {
  it('Store response contains all expected fields', async () => {
    const res = await app.inject({
      method: 'POST', url: '/api/stores', payload: { name: 'Test' },
    });
    const body = res.json();
    expect(body).toHaveProperty('id');
    expect(body).toHaveProperty('name');
    expect(body).toHaveProperty('isActive');
    expect(body).toHaveProperty('createdAt');
    expect(body).toHaveProperty('updatedAt');
  });

  it('Product response contains all expected fields', async () => {
    const res = await app.inject({
      method: 'POST', url: '/api/products',
      payload: { sku: 'T', name: 'T', category: 'T', price: 1 },
    });
    const body = res.json();
    for (const field of ['id', 'sku', 'name', 'category', 'description', 'price', 'isActive', 'createdAt', 'updatedAt']) {
      expect(body).toHaveProperty(field);
    }
  });

  it('Inventory list item contains store and product relations', async () => {
    const res = await app.inject({ method: 'GET', url: '/api/inventory' });
    const item = res.json().data[0];
    expect(item).toHaveProperty('store');
    expect(item).toHaveProperty('product');
    expect(item.store).toHaveProperty('name');
    expect(item.product).toHaveProperty('sku');
  });
});

// ---------------------------------------------------------------------------
// Additional filter scenarios
// ---------------------------------------------------------------------------

describe('Additional filter scenarios', () => {
  it('GET /api/products supports isActive filter', async () => {
    await app.inject({ method: 'GET', url: '/api/products?isActive=false' });
    expect(productMock.findMany).toHaveBeenCalledWith(
      expect.objectContaining({ where: expect.objectContaining({ isActive: false }) }),
    );
  });

  it('GET /api/inventory supports price range filter', async () => {
    await app.inject({ method: 'GET', url: '/api/inventory?minPrice=10&maxPrice=50' });
    expect(inventoryMock.findMany).toHaveBeenCalledWith(
      expect.objectContaining({
        where: expect.objectContaining({
          product: expect.objectContaining({ price: { gte: 10, lte: 50 } }),
        }),
      }),
    );
  });

  it('GET /api/inventory supports combined category + stockLevel filters', async () => {
    await app.inject({ method: 'GET', url: '/api/inventory?category=Peripherals&stockLevel=low_stock' });
    expect(inventoryMock.findMany).toHaveBeenCalledWith(
      expect.objectContaining({
        where: expect.objectContaining({
          quantity: { gt: 0, lte: 10 },
          product: expect.objectContaining({ category: 'Peripherals' }),
        }),
      }),
    );
  });

  it('GET /api/inventory supports storeId query param in global view', async () => {
    await app.inject({ method: 'GET', url: '/api/inventory?storeId=1' });
    expect(inventoryMock.findMany).toHaveBeenCalledWith(
      expect.objectContaining({ where: expect.objectContaining({ storeId: 1 }) }),
    );
  });
});
