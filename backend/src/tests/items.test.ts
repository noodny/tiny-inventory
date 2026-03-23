import { describe, it, expect } from 'vitest';
import { buildApp } from '../app';

// Stub prisma for route-less app (item routes removed in PRD-01)
const mockPrisma = {
  $disconnect: async () => {},
} as never;

describe('Legacy items routes (removed)', () => {
  const app = buildApp({ prismaClient: mockPrisma });

  it('GET /api/items returns 404 (routes removed)', async () => {
    const response = await app.inject({ method: 'GET', url: '/api/items' });
    expect(response.statusCode).toBe(404);
  });
});
