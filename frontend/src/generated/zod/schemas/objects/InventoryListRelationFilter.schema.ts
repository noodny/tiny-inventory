import * as z from 'zod';
import type { Prisma } from '@prisma/client';
import { InventoryWhereInputObjectSchema as InventoryWhereInputObjectSchema } from './InventoryWhereInput.schema'

const makeSchema = () => z.object({
  every: z.lazy(() => InventoryWhereInputObjectSchema).optional(),
  some: z.lazy(() => InventoryWhereInputObjectSchema).optional(),
  none: z.lazy(() => InventoryWhereInputObjectSchema).optional()
}).strict();
export const InventoryListRelationFilterObjectSchema: z.ZodType<Prisma.InventoryListRelationFilter> = makeSchema() as unknown as z.ZodType<Prisma.InventoryListRelationFilter>;
export const InventoryListRelationFilterObjectZodSchema = makeSchema();
