import { describe, it, expect, vi, beforeEach } from 'vitest';
import { Prisma } from '@prisma/client';
import { buildApp } from '../app';

const p2025 = new Prisma.PrismaClientKnownRequestError('Record not found', {
  code: 'P2025',
  clientVersion: '6.0.0',
});

const mockProductData = {
  id: 1,
  sku: 'KB-001',
  name: 'Wireless Keyboard',
  category: 'Peripherals',
  description: 'A keyboard',
  price: '49.99',
  isActive: true,
  createdAt: new Date().toISOString(),
  updatedAt: new Date().toISOString(),
};

const productMock = {
  create: vi.fn().mockResolvedValue(mockProductData),
  findMany: vi.fn().mockResolvedValue([mockProductData]),
  findUnique: vi.fn().mockImplementation(({ where }: { where: { id: number } }) =>
    where.id === 1 ? Promise.resolve(mockProductData) : Promise.resolve(null),
  ),
  count: vi.fn().mockResolvedValue(1),
  update: vi.fn().mockResolvedValue({ ...mockProductData, name: 'Updated Keyboard' }),
  delete: vi.fn().mockResolvedValue(mockProductData),
};

const inventoryMock = {
  count: vi.fn().mockResolvedValue(0),
};

const storeMock = {
  findMany: vi.fn().mockResolvedValue([]),
  findUnique: vi.fn().mockResolvedValue(null),
  count: vi.fn().mockResolvedValue(0),
  create: vi.fn(),
  update: vi.fn(),
  delete: vi.fn(),
};

const mockPrisma = {
  store: storeMock,
  product: productMock,
  inventory: inventoryMock,
  $transaction: vi.fn().mockImplementation((fn: (tx: typeof mockPrisma) => Promise<unknown>) =>
    fn(mockPrisma),
  ),
  $disconnect: async () => {},
} as never;

describe('Product routes', () => {
  const app = buildApp({ prismaClient: mockPrisma });

  beforeEach(() => {
    vi.clearAllMocks();
    productMock.findUnique.mockImplementation(
      ({ where }: { where: { id: number } }) =>
        where.id === 1 ? Promise.resolve(mockProductData) : Promise.resolve(null),
    );
    inventoryMock.count.mockResolvedValue(0);
  });

  // POST /api/products
  it('POST /api/products creates a product', async () => {
    const res = await app.inject({
      method: 'POST',
      url: '/api/products',
      payload: { sku: 'KB-001', name: 'Keyboard', category: 'Peripherals', price: 49.99 },
    });
    expect(res.statusCode).toBe(201);
    expect(res.json()).toMatchObject({ sku: 'KB-001' });
  });

  it('POST /api/products rejects missing required fields', async () => {
    const res = await app.inject({
      method: 'POST',
      url: '/api/products',
      payload: { name: 'Keyboard' },
    });
    expect(res.statusCode).toBe(400);
  });

  it('POST /api/products rejects negative price', async () => {
    const res = await app.inject({
      method: 'POST',
      url: '/api/products',
      payload: { sku: 'X', name: 'X', category: 'Peripherals', price: -1 },
    });
    expect(res.statusCode).toBe(400);
  });

  it('POST /api/products returns 409 on duplicate SKU', async () => {
    const prismaError = new Prisma.PrismaClientKnownRequestError('Unique constraint failed', {
      code: 'P2002',
      clientVersion: '6.0.0',
      meta: { target: ['sku'] },
    });
    productMock.create.mockRejectedValueOnce(prismaError);

    const res = await app.inject({
      method: 'POST',
      url: '/api/products',
      payload: { sku: 'KB-001', name: 'Dupe', category: 'Peripherals', price: 10 },
    });
    expect(res.statusCode).toBe(409);
    expect(res.json()).toMatchObject({ code: 'CONFLICT' });
  });

  // GET /api/products
  it('GET /api/products returns paginated list', async () => {
    const res = await app.inject({ method: 'GET', url: '/api/products' });
    expect(res.statusCode).toBe(200);
    const body = res.json();
    expect(body.data).toBeInstanceOf(Array);
    expect(body.meta).toHaveProperty('page');
    expect(body.meta).toHaveProperty('totalPages');
  });

  it('GET /api/products supports category filter', async () => {
    await app.inject({ method: 'GET', url: '/api/products?category=Peripherals' });
    expect(productMock.findMany).toHaveBeenCalledWith(
      expect.objectContaining({ where: expect.objectContaining({ category: 'Peripherals' }) }),
    );
  });

  it('GET /api/products supports price range filter', async () => {
    await app.inject({ method: 'GET', url: '/api/products?minPrice=10&maxPrice=100' });
    expect(productMock.findMany).toHaveBeenCalledWith(
      expect.objectContaining({
        where: expect.objectContaining({ price: { gte: 10, lte: 100 } }),
      }),
    );
  });

  // GET /api/products/:id
  it('GET /api/products/1 returns the product', async () => {
    const res = await app.inject({ method: 'GET', url: '/api/products/1' });
    expect(res.statusCode).toBe(200);
    expect(res.json()).toMatchObject({ id: 1, sku: 'KB-001' });
  });

  it('GET /api/products/999 returns 404', async () => {
    const res = await app.inject({ method: 'GET', url: '/api/products/999' });
    expect(res.statusCode).toBe(404);
    expect(res.json()).toMatchObject({ code: 'NOT_FOUND' });
  });

  // PATCH /api/products/:id
  it('PATCH /api/products/1 updates the product', async () => {
    const res = await app.inject({
      method: 'PATCH',
      url: '/api/products/1',
      payload: { name: 'Updated Keyboard' },
    });
    expect(res.statusCode).toBe(200);
    expect(res.json()).toMatchObject({ name: 'Updated Keyboard' });
  });

  it('PATCH /api/products/999 returns 404', async () => {
    productMock.update.mockRejectedValueOnce(p2025);
    const res = await app.inject({
      method: 'PATCH',
      url: '/api/products/999',
      payload: { name: 'Nope' },
    });
    expect(res.statusCode).toBe(404);
  });

  it('PATCH /api/products/1 with empty body returns 400', async () => {
    const res = await app.inject({
      method: 'PATCH',
      url: '/api/products/1',
      payload: {},
    });
    expect(res.statusCode).toBe(400);
  });

  it('PATCH /api/products/1 returns 409 on duplicate SKU', async () => {
    const prismaError = new Prisma.PrismaClientKnownRequestError('Unique constraint failed', {
      code: 'P2002',
      clientVersion: '6.0.0',
      meta: { target: ['sku'] },
    });
    productMock.update.mockRejectedValueOnce(prismaError);

    const res = await app.inject({
      method: 'PATCH',
      url: '/api/products/1',
      payload: { sku: 'DUPLICATE' },
    });
    expect(res.statusCode).toBe(409);
    expect(res.json()).toMatchObject({ code: 'CONFLICT' });
  });

  // DELETE /api/products/:id
  it('DELETE /api/products/1 returns 204', async () => {
    const res = await app.inject({ method: 'DELETE', url: '/api/products/1' });
    expect(res.statusCode).toBe(204);
    expect(productMock.delete).toHaveBeenCalled();
  });

  it('DELETE /api/products/999 returns 404', async () => {
    const res = await app.inject({ method: 'DELETE', url: '/api/products/999' });
    expect(res.statusCode).toBe(404);
  });

  it('DELETE /api/products/1 returns 409 when inventory exists', async () => {
    inventoryMock.count.mockResolvedValue(5);
    const res = await app.inject({ method: 'DELETE', url: '/api/products/1' });
    expect(res.statusCode).toBe(409);
    expect(res.json()).toMatchObject({ code: 'CONFLICT' });
  });
});
