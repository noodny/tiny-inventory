import type { Prisma } from '@prisma/client';
import * as z from 'zod';
import { StoreWhereUniqueInputObjectSchema as StoreWhereUniqueInputObjectSchema } from './objects/StoreWhereUniqueInput.schema';

export const StoreFindUniqueSchema: z.ZodType<Prisma.StoreFindUniqueArgs> = z.object({   where: StoreWhereUniqueInputObjectSchema }).strict() as unknown as z.ZodType<Prisma.StoreFindUniqueArgs>;

export const StoreFindUniqueZodSchema = z.object({   where: StoreWhereUniqueInputObjectSchema }).strict();