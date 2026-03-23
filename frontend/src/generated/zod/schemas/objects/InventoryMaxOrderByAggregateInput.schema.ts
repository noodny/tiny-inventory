import * as z from 'zod';
import type { Prisma } from '@prisma/client';
import { SortOrderSchema } from '../enums/SortOrder.schema'

const makeSchema = () => z.object({
  id: SortOrderSchema.optional(),
  storeId: SortOrderSchema.optional(),
  productId: SortOrderSchema.optional(),
  quantity: SortOrderSchema.optional(),
  createdAt: SortOrderSchema.optional(),
  updatedAt: SortOrderSchema.optional()
}).strict();
export const InventoryMaxOrderByAggregateInputObjectSchema: z.ZodType<Prisma.InventoryMaxOrderByAggregateInput> = makeSchema() as unknown as z.ZodType<Prisma.InventoryMaxOrderByAggregateInput>;
export const InventoryMaxOrderByAggregateInputObjectZodSchema = makeSchema();
