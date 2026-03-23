import { Prisma } from '@prisma/client';
import { conflict } from '../plugins/errors';

export function handlePrismaError(err: unknown): never {
  if (err instanceof Prisma.PrismaClientKnownRequestError) {
    if (err.code === 'P2002') {
      const target = (err.meta?.target as string[])?.join(', ') ?? 'field';
      throw conflict(`Unique constraint violation on: ${target}`);
    }
  }
  throw err;
}
