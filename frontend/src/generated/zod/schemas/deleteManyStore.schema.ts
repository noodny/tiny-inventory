import type { Prisma } from '@prisma/client';
import * as z from 'zod';
import { StoreWhereInputObjectSchema as StoreWhereInputObjectSchema } from './objects/StoreWhereInput.schema';

export const StoreDeleteManySchema: z.ZodType<Prisma.StoreDeleteManyArgs> = z.object({ where: StoreWhereInputObjectSchema.optional() }).strict() as unknown as z.ZodType<Prisma.StoreDeleteManyArgs>;

export const StoreDeleteManyZodSchema = z.object({ where: StoreWhereInputObjectSchema.optional() }).strict();