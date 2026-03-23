import * as z from 'zod';
import type { Prisma } from '@prisma/client';
import { InventoryCreateNestedManyWithoutStoreInputObjectSchema as InventoryCreateNestedManyWithoutStoreInputObjectSchema } from './InventoryCreateNestedManyWithoutStoreInput.schema'

const makeSchema = () => z.object({
  name: z.string().max(255),
  isActive: z.boolean().optional(),
  createdAt: z.coerce.date().optional(),
  inventory: z.lazy(() => InventoryCreateNestedManyWithoutStoreInputObjectSchema).optional()
}).strict();
export const StoreCreateInputObjectSchema: z.ZodType<Prisma.StoreCreateInput> = makeSchema() as unknown as z.ZodType<Prisma.StoreCreateInput>;
export const StoreCreateInputObjectZodSchema = makeSchema();
