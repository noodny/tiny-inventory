import * as z from 'zod';
import type { Prisma } from '@prisma/client';
import { StoreWhereInputObjectSchema as StoreWhereInputObjectSchema } from './StoreWhereInput.schema'

const makeSchema = () => z.object({
  is: z.lazy(() => StoreWhereInputObjectSchema).optional(),
  isNot: z.lazy(() => StoreWhereInputObjectSchema).optional()
}).strict();
export const StoreScalarRelationFilterObjectSchema: z.ZodType<Prisma.StoreScalarRelationFilter> = makeSchema() as unknown as z.ZodType<Prisma.StoreScalarRelationFilter>;
export const StoreScalarRelationFilterObjectZodSchema = makeSchema();
