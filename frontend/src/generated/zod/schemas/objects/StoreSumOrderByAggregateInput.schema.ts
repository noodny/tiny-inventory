import * as z from 'zod';
import type { Prisma } from '@prisma/client';
import { SortOrderSchema } from '../enums/SortOrder.schema'

const makeSchema = () => z.object({
  id: SortOrderSchema.optional()
}).strict();
export const StoreSumOrderByAggregateInputObjectSchema: z.ZodType<Prisma.StoreSumOrderByAggregateInput> = makeSchema() as unknown as z.ZodType<Prisma.StoreSumOrderByAggregateInput>;
export const StoreSumOrderByAggregateInputObjectZodSchema = makeSchema();
