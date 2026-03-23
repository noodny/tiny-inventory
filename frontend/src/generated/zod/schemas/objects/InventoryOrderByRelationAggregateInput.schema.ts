import * as z from 'zod';
import type { Prisma } from '@prisma/client';
import { SortOrderSchema } from '../enums/SortOrder.schema'

const makeSchema = () => z.object({
  _count: SortOrderSchema.optional()
}).strict();
export const InventoryOrderByRelationAggregateInputObjectSchema: z.ZodType<Prisma.InventoryOrderByRelationAggregateInput> = makeSchema() as unknown as z.ZodType<Prisma.InventoryOrderByRelationAggregateInput>;
export const InventoryOrderByRelationAggregateInputObjectZodSchema = makeSchema();
