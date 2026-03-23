import { Prisma } from '@prisma/client';
import { conflict, notFound } from '../plugins/errors';

export function handlePrismaError(err: unknown, resource?: string): never {
  if (err instanceof Prisma.PrismaClientKnownRequestError) {
    if (err.code === 'P2002') {
      const target = (err.meta?.target as string[])?.join(', ') ?? 'field';
      throw conflict(`Unique constraint violation on: ${target}`);
    }
    if (err.code === 'P2025') {
      throw notFound(resource ?? 'Record');
    }
  }
  throw err;
}
