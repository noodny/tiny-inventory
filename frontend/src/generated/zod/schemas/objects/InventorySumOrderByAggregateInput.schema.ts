import * as z from 'zod';
import type { Prisma } from '@prisma/client';
import { SortOrderSchema } from '../enums/SortOrder.schema'

const makeSchema = () => z.object({
  id: SortOrderSchema.optional(),
  storeId: SortOrderSchema.optional(),
  productId: SortOrderSchema.optional(),
  quantity: SortOrderSchema.optional()
}).strict();
export const InventorySumOrderByAggregateInputObjectSchema: z.ZodType<Prisma.InventorySumOrderByAggregateInput> = makeSchema() as unknown as z.ZodType<Prisma.InventorySumOrderByAggregateInput>;
export const InventorySumOrderByAggregateInputObjectZodSchema = makeSchema();
