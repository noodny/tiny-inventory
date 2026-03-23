import * as z from 'zod';
import type { Prisma } from '@prisma/client';
import { IntFilterObjectSchema as IntFilterObjectSchema } from './IntFilter.schema';
import { DateTimeFilterObjectSchema as DateTimeFilterObjectSchema } from './DateTimeFilter.schema';
import { StoreScalarRelationFilterObjectSchema as StoreScalarRelationFilterObjectSchema } from './StoreScalarRelationFilter.schema';
import { StoreWhereInputObjectSchema as StoreWhereInputObjectSchema } from './StoreWhereInput.schema';
import { ProductScalarRelationFilterObjectSchema as ProductScalarRelationFilterObjectSchema } from './ProductScalarRelationFilter.schema';
import { ProductWhereInputObjectSchema as ProductWhereInputObjectSchema } from './ProductWhereInput.schema'

const inventorywhereinputSchema = z.object({
  AND: z.union([z.lazy(() => InventoryWhereInputObjectSchema), z.lazy(() => InventoryWhereInputObjectSchema).array()]).optional(),
  OR: z.lazy(() => InventoryWhereInputObjectSchema).array().optional(),
  NOT: z.union([z.lazy(() => InventoryWhereInputObjectSchema), z.lazy(() => InventoryWhereInputObjectSchema).array()]).optional(),
  id: z.union([z.lazy(() => IntFilterObjectSchema), z.number().int()]).optional(),
  storeId: z.union([z.lazy(() => IntFilterObjectSchema), z.number().int()]).optional(),
  productId: z.union([z.lazy(() => IntFilterObjectSchema), z.number().int()]).optional(),
  quantity: z.union([z.lazy(() => IntFilterObjectSchema), z.number().int()]).optional(),
  createdAt: z.union([z.lazy(() => DateTimeFilterObjectSchema), z.coerce.date()]).optional(),
  updatedAt: z.union([z.lazy(() => DateTimeFilterObjectSchema), z.coerce.date()]).optional(),
  store: z.union([z.lazy(() => StoreScalarRelationFilterObjectSchema), z.lazy(() => StoreWhereInputObjectSchema)]).optional(),
  product: z.union([z.lazy(() => ProductScalarRelationFilterObjectSchema), z.lazy(() => ProductWhereInputObjectSchema)]).optional()
}).strict();
export const InventoryWhereInputObjectSchema: z.ZodType<Prisma.InventoryWhereInput> = inventorywhereinputSchema as unknown as z.ZodType<Prisma.InventoryWhereInput>;
export const InventoryWhereInputObjectZodSchema = inventorywhereinputSchema;
