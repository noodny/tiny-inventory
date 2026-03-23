import * as z from 'zod';
import type { Prisma } from '@prisma/client';
import { ProductCreateNestedOneWithoutInventoryInputObjectSchema as ProductCreateNestedOneWithoutInventoryInputObjectSchema } from './ProductCreateNestedOneWithoutInventoryInput.schema'

const makeSchema = () => z.object({
  quantity: z.number().int().optional(),
  createdAt: z.coerce.date().optional(),
  updatedAt: z.coerce.date().optional(),
  product: z.lazy(() => ProductCreateNestedOneWithoutInventoryInputObjectSchema)
}).strict();
export const InventoryCreateWithoutStoreInputObjectSchema: z.ZodType<Prisma.InventoryCreateWithoutStoreInput> = makeSchema() as unknown as z.ZodType<Prisma.InventoryCreateWithoutStoreInput>;
export const InventoryCreateWithoutStoreInputObjectZodSchema = makeSchema();
