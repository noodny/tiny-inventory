import type { Prisma } from '@prisma/client';
import * as z from 'zod';
import { ProductWhereUniqueInputObjectSchema as ProductWhereUniqueInputObjectSchema } from './objects/ProductWhereUniqueInput.schema';

export const ProductDeleteOneSchema: z.ZodType<Prisma.ProductDeleteArgs> = z.object({   where: ProductWhereUniqueInputObjectSchema }).strict() as unknown as z.ZodType<Prisma.ProductDeleteArgs>;

export const ProductDeleteOneZodSchema = z.object({   where: ProductWhereUniqueInputObjectSchema }).strict();