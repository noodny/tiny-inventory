import type { Prisma } from '@prisma/client';
import * as z from 'zod';
import { ProductWhereUniqueInputObjectSchema as ProductWhereUniqueInputObjectSchema } from './objects/ProductWhereUniqueInput.schema';

export const ProductFindUniqueSchema: z.ZodType<Prisma.ProductFindUniqueArgs> = z.object({   where: ProductWhereUniqueInputObjectSchema }).strict() as unknown as z.ZodType<Prisma.ProductFindUniqueArgs>;

export const ProductFindUniqueZodSchema = z.object({   where: ProductWhereUniqueInputObjectSchema }).strict();