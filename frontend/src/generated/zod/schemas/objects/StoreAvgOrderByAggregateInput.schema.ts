import * as z from 'zod';
import type { Prisma } from '@prisma/client';
import { SortOrderSchema } from '../enums/SortOrder.schema'

const makeSchema = () => z.object({
  id: SortOrderSchema.optional()
}).strict();
export const StoreAvgOrderByAggregateInputObjectSchema: z.ZodType<Prisma.StoreAvgOrderByAggregateInput> = makeSchema() as unknown as z.ZodType<Prisma.StoreAvgOrderByAggregateInput>;
export const StoreAvgOrderByAggregateInputObjectZodSchema = makeSchema();
