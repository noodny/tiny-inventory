import type { Prisma } from '@prisma/client';
import * as z from 'zod';
import { ProductCreateInputObjectSchema as ProductCreateInputObjectSchema } from './objects/ProductCreateInput.schema';
import { ProductUncheckedCreateInputObjectSchema as ProductUncheckedCreateInputObjectSchema } from './objects/ProductUncheckedCreateInput.schema';

export const ProductCreateOneSchema: z.ZodType<Prisma.ProductCreateArgs> = z.object({   data: z.union([ProductCreateInputObjectSchema, ProductUncheckedCreateInputObjectSchema]) }).strict() as unknown as z.ZodType<Prisma.ProductCreateArgs>;

export const ProductCreateOneZodSchema = z.object({   data: z.union([ProductCreateInputObjectSchema, ProductUncheckedCreateInputObjectSchema]) }).strict();