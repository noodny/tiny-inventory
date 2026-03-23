import * as z from 'zod';
import type { Prisma } from '@prisma/client';


const makeSchema = () => z.object({
  id: z.literal(true).optional()
}).strict();
export const StoreSumAggregateInputObjectSchema: z.ZodType<Prisma.StoreSumAggregateInputType> = makeSchema() as unknown as z.ZodType<Prisma.StoreSumAggregateInputType>;
export const StoreSumAggregateInputObjectZodSchema = makeSchema();
