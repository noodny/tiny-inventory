import * as z from 'zod';
import type { Prisma } from '@prisma/client';


const makeSchema = () => z.object({
  id: z.literal(true).optional(),
  storeId: z.literal(true).optional(),
  productId: z.literal(true).optional(),
  quantity: z.literal(true).optional(),
  createdAt: z.literal(true).optional(),
  updatedAt: z.literal(true).optional(),
  _all: z.literal(true).optional()
}).strict();
export const InventoryCountAggregateInputObjectSchema: z.ZodType<Prisma.InventoryCountAggregateInputType> = makeSchema() as unknown as z.ZodType<Prisma.InventoryCountAggregateInputType>;
export const InventoryCountAggregateInputObjectZodSchema = makeSchema();
