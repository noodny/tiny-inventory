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
export const StoreCountOrderByAggregateInputObjectSchema: z.ZodType<Prisma.StoreCountOrderByAggregateInput> = makeSchema() as unknown as z.ZodType<Prisma.StoreCountOrderByAggregateInput>;
export const StoreCountOrderByAggregateInputObjectZodSchema = makeSchema();
