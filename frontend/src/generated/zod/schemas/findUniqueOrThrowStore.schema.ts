import type { Prisma } from '@prisma/client';
import * as z from 'zod';
import { StoreWhereUniqueInputObjectSchema as StoreWhereUniqueInputObjectSchema } from './objects/StoreWhereUniqueInput.schema';

export const StoreFindUniqueOrThrowSchema: z.ZodType<Prisma.StoreFindUniqueOrThrowArgs> = z.object({   where: StoreWhereUniqueInputObjectSchema }).strict() as unknown as z.ZodType<Prisma.StoreFindUniqueOrThrowArgs>;

export const StoreFindUniqueOrThrowZodSchema = z.object({   where: StoreWhereUniqueInputObjectSchema }).strict();