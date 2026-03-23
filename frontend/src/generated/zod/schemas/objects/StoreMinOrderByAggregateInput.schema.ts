import * as z from 'zod';
import type { Prisma } from '@prisma/client';
import { SortOrderSchema } from '../enums/SortOrder.schema'

const makeSchema = () => z.object({
  id: SortOrderSchema.optional(),
  name: SortOrderSchema.optional(),
  isActive: SortOrderSchema.optional(),
  createdAt: SortOrderSchema.optional(),
  updatedAt: SortOrderSchema.optional()
}).strict();
export const StoreMinOrderByAggregateInputObjectSchema: z.ZodType<Prisma.StoreMinOrderByAggregateInput> = makeSchema() as unknown as z.ZodType<Prisma.StoreMinOrderByAggregateInput>;
export const StoreMinOrderByAggregateInputObjectZodSchema = makeSchema();
