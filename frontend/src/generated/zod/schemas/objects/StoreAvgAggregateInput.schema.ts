import * as z from 'zod';
import type { Prisma } from '@prisma/client';


const makeSchema = () => z.object({
  id: z.literal(true).optional()
}).strict();
export const StoreAvgAggregateInputObjectSchema: z.ZodType<Prisma.StoreAvgAggregateInputType> = makeSchema() as unknown as z.ZodType<Prisma.StoreAvgAggregateInputType>;
export const StoreAvgAggregateInputObjectZodSchema = makeSchema();
