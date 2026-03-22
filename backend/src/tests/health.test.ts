import { describe, it, expect, afterAll } from 'vitest';
import { buildApp } from '../app';

describe('Health endpoint', () => {
  // Pass a stub prisma so the test runs without a real database
  const app = buildApp({ prismaClient: { $disconnect: async () => {} } as never });

  afterAll(async () => {
    await app.close();
  });

  it('GET /health returns 200 with status ok', async () => {
    const response = await app.inject({
      method: 'GET',
      url: '/health',
    });

    expect(response.statusCode).toBe(200);
    expect(response.json()).toEqual({ status: 'ok' });
  });
});
