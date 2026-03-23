import type { Prisma } from '@prisma/client';
import * as z from 'zod';
import { StoreWhereUniqueInputObjectSchema as StoreWhereUniqueInputObjectSchema } from './objects/StoreWhereUniqueInput.schema';

export const StoreDeleteOneSchema: z.ZodType<Prisma.StoreDeleteArgs> = z.object({   where: StoreWhereUniqueInputObjectSchema }).strict() as unknown as z.ZodType<Prisma.StoreDeleteArgs>;

export const StoreDeleteOneZodSchema = z.object({   where: StoreWhereUniqueInputObjectSchema }).strict();