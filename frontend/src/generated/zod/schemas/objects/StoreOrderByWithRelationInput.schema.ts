import * as z from 'zod';
import type { Prisma } from '@prisma/client';
import { SortOrderSchema } from '../enums/SortOrder.schema';
import { InventoryOrderByRelationAggregateInputObjectSchema as InventoryOrderByRelationAggregateInputObjectSchema } from './InventoryOrderByRelationAggregateInput.schema';
import { StoreOrderByRelevanceInputObjectSchema as StoreOrderByRelevanceInputObjectSchema } from './StoreOrderByRelevanceInput.schema'

const makeSchema = () => z.object({
  id: SortOrderSchema.optional(),
  name: SortOrderSchema.optional(),
  isActive: SortOrderSchema.optional(),
  createdAt: SortOrderSchema.optional(),
  updatedAt: SortOrderSchema.optional(),
  inventory: z.lazy(() => InventoryOrderByRelationAggregateInputObjectSchema).optional(),
  _relevance: z.lazy(() => StoreOrderByRelevanceInputObjectSchema).optional()
}).strict();
export const StoreOrderByWithRelationInputObjectSchema: z.ZodType<Prisma.StoreOrderByWithRelationInput> = makeSchema() as unknown as z.ZodType<Prisma.StoreOrderByWithRelationInput>;
export const StoreOrderByWithRelationInputObjectZodSchema = makeSchema();
