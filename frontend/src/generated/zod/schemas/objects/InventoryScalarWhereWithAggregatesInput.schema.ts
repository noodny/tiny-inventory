import * as z from 'zod';
import type { Prisma } from '@prisma/client';
import { IntWithAggregatesFilterObjectSchema as IntWithAggregatesFilterObjectSchema } from './IntWithAggregatesFilter.schema';
import { DateTimeWithAggregatesFilterObjectSchema as DateTimeWithAggregatesFilterObjectSchema } from './DateTimeWithAggregatesFilter.schema'

const inventoryscalarwherewithaggregatesinputSchema = z.object({
  AND: z.union([z.lazy(() => InventoryScalarWhereWithAggregatesInputObjectSchema), z.lazy(() => InventoryScalarWhereWithAggregatesInputObjectSchema).array()]).optional(),
  OR: z.lazy(() => InventoryScalarWhereWithAggregatesInputObjectSchema).array().optional(),
  NOT: z.union([z.lazy(() => InventoryScalarWhereWithAggregatesInputObjectSchema), z.lazy(() => InventoryScalarWhereWithAggregatesInputObjectSchema).array()]).optional(),
  id: z.union([z.lazy(() => IntWithAggregatesFilterObjectSchema), z.number().int()]).optional(),
  storeId: z.union([z.lazy(() => IntWithAggregatesFilterObjectSchema), z.number().int()]).optional(),
  productId: z.union([z.lazy(() => IntWithAggregatesFilterObjectSchema), z.number().int()]).optional(),
  quantity: z.union([z.lazy(() => IntWithAggregatesFilterObjectSchema), z.number().int()]).optional(),
  createdAt: z.union([z.lazy(() => DateTimeWithAggregatesFilterObjectSchema), z.coerce.date()]).optional(),
  updatedAt: z.union([z.lazy(() => DateTimeWithAggregatesFilterObjectSchema), z.coerce.date()]).optional()
}).strict();
export const InventoryScalarWhereWithAggregatesInputObjectSchema: z.ZodType<Prisma.InventoryScalarWhereWithAggregatesInput> = inventoryscalarwherewithaggregatesinputSchema as unknown as z.ZodType<Prisma.InventoryScalarWhereWithAggregatesInput>;
export const InventoryScalarWhereWithAggregatesInputObjectZodSchema = inventoryscalarwherewithaggregatesinputSchema;
