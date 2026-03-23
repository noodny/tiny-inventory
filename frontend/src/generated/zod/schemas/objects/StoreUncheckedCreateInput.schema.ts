import * as z from 'zod';
import type { Prisma } from '@prisma/client';
import { InventoryUncheckedCreateNestedManyWithoutStoreInputObjectSchema as InventoryUncheckedCreateNestedManyWithoutStoreInputObjectSchema } from './InventoryUncheckedCreateNestedManyWithoutStoreInput.schema'

const makeSchema = () => z.object({
  id: z.number().int().optional(),
  name: z.string().max(255),
  isActive: z.boolean().optional(),
  createdAt: z.coerce.date().optional(),
  inventory: z.lazy(() => InventoryUncheckedCreateNestedManyWithoutStoreInputObjectSchema).optional()
}).strict();
export const StoreUncheckedCreateInputObjectSchema: z.ZodType<Prisma.StoreUncheckedCreateInput> = makeSchema() as unknown as z.ZodType<Prisma.StoreUncheckedCreateInput>;
export const StoreUncheckedCreateInputObjectZodSchema = makeSchema();
