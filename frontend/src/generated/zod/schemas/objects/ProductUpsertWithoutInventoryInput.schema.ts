import * as z from 'zod';
import type { Prisma } from '@prisma/client';
import { ProductUpdateWithoutInventoryInputObjectSchema as ProductUpdateWithoutInventoryInputObjectSchema } from './ProductUpdateWithoutInventoryInput.schema';
import { ProductUncheckedUpdateWithoutInventoryInputObjectSchema as ProductUncheckedUpdateWithoutInventoryInputObjectSchema } from './ProductUncheckedUpdateWithoutInventoryInput.schema';
import { ProductCreateWithoutInventoryInputObjectSchema as ProductCreateWithoutInventoryInputObjectSchema } from './ProductCreateWithoutInventoryInput.schema';
import { ProductUncheckedCreateWithoutInventoryInputObjectSchema as ProductUncheckedCreateWithoutInventoryInputObjectSchema } from './ProductUncheckedCreateWithoutInventoryInput.schema';
import { ProductWhereInputObjectSchema as ProductWhereInputObjectSchema } from './ProductWhereInput.schema'

const makeSchema = () => z.object({
  update: z.union([z.lazy(() => ProductUpdateWithoutInventoryInputObjectSchema), z.lazy(() => ProductUncheckedUpdateWithoutInventoryInputObjectSchema)]),
  create: z.union([z.lazy(() => ProductCreateWithoutInventoryInputObjectSchema), z.lazy(() => ProductUncheckedCreateWithoutInventoryInputObjectSchema)]),
  where: z.lazy(() => ProductWhereInputObjectSchema).optional()
}).strict();
export const ProductUpsertWithoutInventoryInputObjectSchema: z.ZodType<Prisma.ProductUpsertWithoutInventoryInput> = makeSchema() as unknown as z.ZodType<Prisma.ProductUpsertWithoutInventoryInput>;
export const ProductUpsertWithoutInventoryInputObjectZodSchema = makeSchema();
