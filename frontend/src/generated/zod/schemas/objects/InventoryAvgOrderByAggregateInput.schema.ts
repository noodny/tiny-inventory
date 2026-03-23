import * as z from 'zod';
import type { Prisma } from '@prisma/client';
import { SortOrderSchema } from '../enums/SortOrder.schema'

const makeSchema = () => z.object({
  id: SortOrderSchema.optional(),
  storeId: SortOrderSchema.optional(),
  productId: SortOrderSchema.optional(),
  quantity: SortOrderSchema.optional()
}).strict();
export const InventoryAvgOrderByAggregateInputObjectSchema: z.ZodType<Prisma.InventoryAvgOrderByAggregateInput> = makeSchema() as unknown as z.ZodType<Prisma.InventoryAvgOrderByAggregateInput>;
export const InventoryAvgOrderByAggregateInputObjectZodSchema = makeSchema();
