import * as z from 'zod';
import type { Prisma } from '@prisma/client';
import { StoreCreateNestedOneWithoutInventoryInputObjectSchema as StoreCreateNestedOneWithoutInventoryInputObjectSchema } from './StoreCreateNestedOneWithoutInventoryInput.schema'

const makeSchema = () => z.object({
  quantity: z.number().int().optional(),
  createdAt: z.coerce.date().optional(),
  updatedAt: z.coerce.date().optional(),
  store: z.lazy(() => StoreCreateNestedOneWithoutInventoryInputObjectSchema)
}).strict();
export const InventoryCreateWithoutProductInputObjectSchema: z.ZodType<Prisma.InventoryCreateWithoutProductInput> = makeSchema() as unknown as z.ZodType<Prisma.InventoryCreateWithoutProductInput>;
export const InventoryCreateWithoutProductInputObjectZodSchema = makeSchema();
