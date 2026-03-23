import * as z from 'zod';
import type { Prisma } from '@prisma/client';
import { ProductWhereInputObjectSchema as ProductWhereInputObjectSchema } from './ProductWhereInput.schema';
import { ProductUpdateWithoutInventoryInputObjectSchema as ProductUpdateWithoutInventoryInputObjectSchema } from './ProductUpdateWithoutInventoryInput.schema';
import { ProductUncheckedUpdateWithoutInventoryInputObjectSchema as ProductUncheckedUpdateWithoutInventoryInputObjectSchema } from './ProductUncheckedUpdateWithoutInventoryInput.schema'

const makeSchema = () => z.object({
  where: z.lazy(() => ProductWhereInputObjectSchema).optional(),
  data: z.union([z.lazy(() => ProductUpdateWithoutInventoryInputObjectSchema), z.lazy(() => ProductUncheckedUpdateWithoutInventoryInputObjectSchema)])
}).strict();
export const ProductUpdateToOneWithWhereWithoutInventoryInputObjectSchema: z.ZodType<Prisma.ProductUpdateToOneWithWhereWithoutInventoryInput> = makeSchema() as unknown as z.ZodType<Prisma.ProductUpdateToOneWithWhereWithoutInventoryInput>;
export const ProductUpdateToOneWithWhereWithoutInventoryInputObjectZodSchema = makeSchema();
