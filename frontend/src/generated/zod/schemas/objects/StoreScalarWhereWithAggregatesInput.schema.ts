import * as z from 'zod';
import type { Prisma } from '@prisma/client';
import { IntWithAggregatesFilterObjectSchema as IntWithAggregatesFilterObjectSchema } from './IntWithAggregatesFilter.schema';
import { StringWithAggregatesFilterObjectSchema as StringWithAggregatesFilterObjectSchema } from './StringWithAggregatesFilter.schema';
import { BoolWithAggregatesFilterObjectSchema as BoolWithAggregatesFilterObjectSchema } from './BoolWithAggregatesFilter.schema';
import { DateTimeWithAggregatesFilterObjectSchema as DateTimeWithAggregatesFilterObjectSchema } from './DateTimeWithAggregatesFilter.schema'

const storescalarwherewithaggregatesinputSchema = z.object({
  AND: z.union([z.lazy(() => StoreScalarWhereWithAggregatesInputObjectSchema), z.lazy(() => StoreScalarWhereWithAggregatesInputObjectSchema).array()]).optional(),
  OR: z.lazy(() => StoreScalarWhereWithAggregatesInputObjectSchema).array().optional(),
  NOT: z.union([z.lazy(() => StoreScalarWhereWithAggregatesInputObjectSchema), z.lazy(() => StoreScalarWhereWithAggregatesInputObjectSchema).array()]).optional(),
  id: z.union([z.lazy(() => IntWithAggregatesFilterObjectSchema), z.number().int()]).optional(),
  name: z.union([z.lazy(() => StringWithAggregatesFilterObjectSchema), z.string().max(255)]).optional(),
  isActive: z.union([z.lazy(() => BoolWithAggregatesFilterObjectSchema), z.boolean()]).optional(),
  createdAt: z.union([z.lazy(() => DateTimeWithAggregatesFilterObjectSchema), z.coerce.date()]).optional(),
  updatedAt: z.union([z.lazy(() => DateTimeWithAggregatesFilterObjectSchema), z.coerce.date()]).optional()
}).strict();
export const StoreScalarWhereWithAggregatesInputObjectSchema: z.ZodType<Prisma.StoreScalarWhereWithAggregatesInput> = storescalarwherewithaggregatesinputSchema as unknown as z.ZodType<Prisma.StoreScalarWhereWithAggregatesInput>;
export const StoreScalarWhereWithAggregatesInputObjectZodSchema = storescalarwherewithaggregatesinputSchema;
