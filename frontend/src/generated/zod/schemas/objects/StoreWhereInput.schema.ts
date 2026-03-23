import * as z from 'zod';
import type { Prisma } from '@prisma/client';
import { IntFilterObjectSchema as IntFilterObjectSchema } from './IntFilter.schema';
import { StringFilterObjectSchema as StringFilterObjectSchema } from './StringFilter.schema';
import { BoolFilterObjectSchema as BoolFilterObjectSchema } from './BoolFilter.schema';
import { DateTimeFilterObjectSchema as DateTimeFilterObjectSchema } from './DateTimeFilter.schema';
import { InventoryListRelationFilterObjectSchema as InventoryListRelationFilterObjectSchema } from './InventoryListRelationFilter.schema'

const storewhereinputSchema = z.object({
  AND: z.union([z.lazy(() => StoreWhereInputObjectSchema), z.lazy(() => StoreWhereInputObjectSchema).array()]).optional(),
  OR: z.lazy(() => StoreWhereInputObjectSchema).array().optional(),
  NOT: z.union([z.lazy(() => StoreWhereInputObjectSchema), z.lazy(() => StoreWhereInputObjectSchema).array()]).optional(),
  id: z.union([z.lazy(() => IntFilterObjectSchema), z.number().int()]).optional(),
  name: z.union([z.lazy(() => StringFilterObjectSchema), z.string().max(255)]).optional(),
  isActive: z.union([z.lazy(() => BoolFilterObjectSchema), z.boolean()]).optional(),
  createdAt: z.union([z.lazy(() => DateTimeFilterObjectSchema), z.coerce.date()]).optional(),
  updatedAt: z.union([z.lazy(() => DateTimeFilterObjectSchema), z.coerce.date()]).optional(),
  inventory: z.lazy(() => InventoryListRelationFilterObjectSchema).optional()
}).strict();
export const StoreWhereInputObjectSchema: z.ZodType<Prisma.StoreWhereInput> = storewhereinputSchema as unknown as z.ZodType<Prisma.StoreWhereInput>;
export const StoreWhereInputObjectZodSchema = storewhereinputSchema;
