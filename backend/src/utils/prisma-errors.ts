import { Prisma } from '@prisma/client';
import { conflict, notFound } from '../plugins/errors';

export function handlePrismaError(err: unknown, resource?: string): never {
  if (err instanceof Prisma.PrismaClientKnownRequestError) {
    if (err.code === 'P2002') {
      const raw = err.meta?.target;
      const target = Array.isArray(raw) ? raw.join(', ') : String(raw ?? 'field');
      throw conflict(`Unique constraint violation on: ${target}`);
    }
    if (err.code === 'P2025') {
      throw notFound(resource ?? 'Record');
    }
  }
  throw err;
}
