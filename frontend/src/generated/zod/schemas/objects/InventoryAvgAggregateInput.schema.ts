import * as z from 'zod';
import type { Prisma } from '@prisma/client';


const makeSchema = () => z.object({
  id: z.literal(true).optional(),
  storeId: z.literal(true).optional(),
  productId: z.literal(true).optional(),
  quantity: z.literal(true).optional()
}).strict();
export const InventoryAvgAggregateInputObjectSchema: z.ZodType<Prisma.InventoryAvgAggregateInputType> = makeSchema() as unknown as z.ZodType<Prisma.InventoryAvgAggregateInputType>;
export const InventoryAvgAggregateInputObjectZodSchema = makeSchema();
