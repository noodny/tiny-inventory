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
export const InventoryMinOrderByAggregateInputObjectSchema: z.ZodType<Prisma.InventoryMinOrderByAggregateInput> = makeSchema() as unknown as z.ZodType<Prisma.InventoryMinOrderByAggregateInput>;
export const InventoryMinOrderByAggregateInputObjectZodSchema = makeSchema();
