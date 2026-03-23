import * as z from 'zod';
import type { Prisma } from '@prisma/client';
import { StoreCreateNestedOneWithoutInventoryInputObjectSchema as StoreCreateNestedOneWithoutInventoryInputObjectSchema } from './StoreCreateNestedOneWithoutInventoryInput.schema';
import { ProductCreateNestedOneWithoutInventoryInputObjectSchema as ProductCreateNestedOneWithoutInventoryInputObjectSchema } from './ProductCreateNestedOneWithoutInventoryInput.schema'

const makeSchema = () => z.object({
  quantity: z.number().int().optional(),
  createdAt: z.coerce.date().optional(),
  store: z.lazy(() => StoreCreateNestedOneWithoutInventoryInputObjectSchema),
  product: z.lazy(() => ProductCreateNestedOneWithoutInventoryInputObjectSchema)
}).strict();
export const InventoryCreateInputObjectSchema: z.ZodType<Prisma.InventoryCreateInput> = makeSchema() as unknown as z.ZodType<Prisma.InventoryCreateInput>;
export const InventoryCreateInputObjectZodSchema = makeSchema();
