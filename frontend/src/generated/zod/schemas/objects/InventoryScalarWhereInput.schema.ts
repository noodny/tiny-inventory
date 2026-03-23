import * as z from 'zod';
import type { Prisma } from '@prisma/client';
import { IntFilterObjectSchema as IntFilterObjectSchema } from './IntFilter.schema';
import { DateTimeFilterObjectSchema as DateTimeFilterObjectSchema } from './DateTimeFilter.schema'

const inventoryscalarwhereinputSchema = z.object({
  AND: z.union([z.lazy(() => InventoryScalarWhereInputObjectSchema), z.lazy(() => InventoryScalarWhereInputObjectSchema).array()]).optional(),
  OR: z.lazy(() => InventoryScalarWhereInputObjectSchema).array().optional(),
  NOT: z.union([z.lazy(() => InventoryScalarWhereInputObjectSchema), z.lazy(() => InventoryScalarWhereInputObjectSchema).array()]).optional(),
  id: z.union([z.lazy(() => IntFilterObjectSchema), z.number().int()]).optional(),
  storeId: z.union([z.lazy(() => IntFilterObjectSchema), z.number().int()]).optional(),
  productId: z.union([z.lazy(() => IntFilterObjectSchema), z.number().int()]).optional(),
  quantity: z.union([z.lazy(() => IntFilterObjectSchema), z.number().int()]).optional(),
  createdAt: z.union([z.lazy(() => DateTimeFilterObjectSchema), z.coerce.date()]).optional(),
  updatedAt: z.union([z.lazy(() => DateTimeFilterObjectSchema), z.coerce.date()]).optional()
}).strict();
export const InventoryScalarWhereInputObjectSchema: z.ZodType<Prisma.InventoryScalarWhereInput> = inventoryscalarwhereinputSchema as unknown as z.ZodType<Prisma.InventoryScalarWhereInput>;
export const InventoryScalarWhereInputObjectZodSchema = inventoryscalarwhereinputSchema;
