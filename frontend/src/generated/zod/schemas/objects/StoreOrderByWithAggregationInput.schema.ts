import * as z from 'zod';
import type { Prisma } from '@prisma/client';
import { SortOrderSchema } from '../enums/SortOrder.schema';
import { StoreCountOrderByAggregateInputObjectSchema as StoreCountOrderByAggregateInputObjectSchema } from './StoreCountOrderByAggregateInput.schema';
import { StoreAvgOrderByAggregateInputObjectSchema as StoreAvgOrderByAggregateInputObjectSchema } from './StoreAvgOrderByAggregateInput.schema';
import { StoreMaxOrderByAggregateInputObjectSchema as StoreMaxOrderByAggregateInputObjectSchema } from './StoreMaxOrderByAggregateInput.schema';
import { StoreMinOrderByAggregateInputObjectSchema as StoreMinOrderByAggregateInputObjectSchema } from './StoreMinOrderByAggregateInput.schema';
import { StoreSumOrderByAggregateInputObjectSchema as StoreSumOrderByAggregateInputObjectSchema } from './StoreSumOrderByAggregateInput.schema'

const makeSchema = () => z.object({
  id: SortOrderSchema.optional(),
  name: SortOrderSchema.optional(),
  isActive: SortOrderSchema.optional(),
  createdAt: SortOrderSchema.optional(),
  updatedAt: SortOrderSchema.optional(),
  _count: z.lazy(() => StoreCountOrderByAggregateInputObjectSchema).optional(),
  _avg: z.lazy(() => StoreAvgOrderByAggregateInputObjectSchema).optional(),
  _max: z.lazy(() => StoreMaxOrderByAggregateInputObjectSchema).optional(),
  _min: z.lazy(() => StoreMinOrderByAggregateInputObjectSchema).optional(),
  _sum: z.lazy(() => StoreSumOrderByAggregateInputObjectSchema).optional()
}).strict();
export const StoreOrderByWithAggregationInputObjectSchema: z.ZodType<Prisma.StoreOrderByWithAggregationInput> = makeSchema() as unknown as z.ZodType<Prisma.StoreOrderByWithAggregationInput>;
export const StoreOrderByWithAggregationInputObjectZodSchema = makeSchema();
