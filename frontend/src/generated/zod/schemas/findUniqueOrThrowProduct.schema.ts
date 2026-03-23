import type { Prisma } from '@prisma/client';
import * as z from 'zod';
import { ProductWhereUniqueInputObjectSchema as ProductWhereUniqueInputObjectSchema } from './objects/ProductWhereUniqueInput.schema';

export const ProductFindUniqueOrThrowSchema: z.ZodType<Prisma.ProductFindUniqueOrThrowArgs> = z.object({   where: ProductWhereUniqueInputObjectSchema }).strict() as unknown as z.ZodType<Prisma.ProductFindUniqueOrThrowArgs>;

export const ProductFindUniqueOrThrowZodSchema = z.object({   where: ProductWhereUniqueInputObjectSchema }).strict();