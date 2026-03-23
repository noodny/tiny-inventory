import * as z from 'zod';
import { Prisma } from '@prisma/client';
import Decimal from 'decimal.js';
import { InventoryCreateNestedManyWithoutProductInputObjectSchema as InventoryCreateNestedManyWithoutProductInputObjectSchema } from './InventoryCreateNestedManyWithoutProductInput.schema'

import { DecimalJSLikeSchema, isValidDecimalInput } from '../../helpers/decimal-helpers';
const makeSchema = () => z.object({
  sku: z.string().max(100),
  name: z.string().max(255),
  category: z.string().max(255),
  description: z.string().optional().nullable(),
  price: z.union([
  z.number(),
  z.string(),
  z.instanceof(Decimal),
  z.instanceof(Prisma.Decimal),
  DecimalJSLikeSchema,
]).refine((v) => isValidDecimalInput(v), {
  message: "Field 'price' must be a Decimal",
}),
  isActive: z.boolean().optional(),
  createdAt: z.coerce.date().optional(),
  inventory: z.lazy(() => InventoryCreateNestedManyWithoutProductInputObjectSchema).optional()
}).strict();
export const ProductCreateInputObjectSchema: z.ZodType<Prisma.ProductCreateInput> = makeSchema() as unknown as z.ZodType<Prisma.ProductCreateInput>;
export const ProductCreateInputObjectZodSchema = makeSchema();
