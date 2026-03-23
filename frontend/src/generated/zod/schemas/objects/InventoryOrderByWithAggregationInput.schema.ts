import * as z from 'zod';
import type { Prisma } from '@prisma/client';
import { SortOrderSchema } from '../enums/SortOrder.schema';
import { InventoryCountOrderByAggregateInputObjectSchema as InventoryCountOrderByAggregateInputObjectSchema } from './InventoryCountOrderByAggregateInput.schema';
import { InventoryAvgOrderByAggregateInputObjectSchema as InventoryAvgOrderByAggregateInputObjectSchema } from './InventoryAvgOrderByAggregateInput.schema';
import { InventoryMaxOrderByAggregateInputObjectSchema as InventoryMaxOrderByAggregateInputObjectSchema } from './InventoryMaxOrderByAggregateInput.schema';
import { InventoryMinOrderByAggregateInputObjectSchema as InventoryMinOrderByAggregateInputObjectSchema } from './InventoryMinOrderByAggregateInput.schema';
import { InventorySumOrderByAggregateInputObjectSchema as InventorySumOrderByAggregateInputObjectSchema } from './InventorySumOrderByAggregateInput.schema'

const makeSchema = () => z.object({
  id: SortOrderSchema.optional(),
  storeId: SortOrderSchema.optional(),
  productId: SortOrderSchema.optional(),
  quantity: SortOrderSchema.optional(),
  createdAt: SortOrderSchema.optional(),
  updatedAt: SortOrderSchema.optional(),
  _count: z.lazy(() => InventoryCountOrderByAggregateInputObjectSchema).optional(),
  _avg: z.lazy(() => InventoryAvgOrderByAggregateInputObjectSchema).optional(),
  _max: z.lazy(() => InventoryMaxOrderByAggregateInputObjectSchema).optional(),
  _min: z.lazy(() => InventoryMinOrderByAggregateInputObjectSchema).optional(),
  _sum: z.lazy(() => InventorySumOrderByAggregateInputObjectSchema).optional()
}).strict();
export const InventoryOrderByWithAggregationInputObjectSchema: z.ZodType<Prisma.InventoryOrderByWithAggregationInput> = makeSchema() as unknown as z.ZodType<Prisma.InventoryOrderByWithAggregationInput>;
export const InventoryOrderByWithAggregationInputObjectZodSchema = makeSchema();
