import * as z from 'zod';
import type { Prisma } from '@prisma/client';
import { ProductCreateWithoutInventoryInputObjectSchema as ProductCreateWithoutInventoryInputObjectSchema } from './ProductCreateWithoutInventoryInput.schema';
import { ProductUncheckedCreateWithoutInventoryInputObjectSchema as ProductUncheckedCreateWithoutInventoryInputObjectSchema } from './ProductUncheckedCreateWithoutInventoryInput.schema';
import { ProductCreateOrConnectWithoutInventoryInputObjectSchema as ProductCreateOrConnectWithoutInventoryInputObjectSchema } from './ProductCreateOrConnectWithoutInventoryInput.schema';
import { ProductUpsertWithoutInventoryInputObjectSchema as ProductUpsertWithoutInventoryInputObjectSchema } from './ProductUpsertWithoutInventoryInput.schema';
import { ProductWhereUniqueInputObjectSchema as ProductWhereUniqueInputObjectSchema } from './ProductWhereUniqueInput.schema';
import { ProductUpdateToOneWithWhereWithoutInventoryInputObjectSchema as ProductUpdateToOneWithWhereWithoutInventoryInputObjectSchema } from './ProductUpdateToOneWithWhereWithoutInventoryInput.schema';
import { ProductUpdateWithoutInventoryInputObjectSchema as ProductUpdateWithoutInventoryInputObjectSchema } from './ProductUpdateWithoutInventoryInput.schema';
import { ProductUncheckedUpdateWithoutInventoryInputObjectSchema as ProductUncheckedUpdateWithoutInventoryInputObjectSchema } from './ProductUncheckedUpdateWithoutInventoryInput.schema'

const makeSchema = () => z.object({
  create: z.union([z.lazy(() => ProductCreateWithoutInventoryInputObjectSchema), z.lazy(() => ProductUncheckedCreateWithoutInventoryInputObjectSchema)]).optional(),
  connectOrCreate: z.lazy(() => ProductCreateOrConnectWithoutInventoryInputObjectSchema).optional(),
  upsert: z.lazy(() => ProductUpsertWithoutInventoryInputObjectSchema).optional(),
  connect: z.lazy(() => ProductWhereUniqueInputObjectSchema).optional(),
  update: z.union([z.lazy(() => ProductUpdateToOneWithWhereWithoutInventoryInputObjectSchema), z.lazy(() => ProductUpdateWithoutInventoryInputObjectSchema), z.lazy(() => ProductUncheckedUpdateWithoutInventoryInputObjectSchema)]).optional()
}).strict();
export const ProductUpdateOneRequiredWithoutInventoryNestedInputObjectSchema: z.ZodType<Prisma.ProductUpdateOneRequiredWithoutInventoryNestedInput> = makeSchema() as unknown as z.ZodType<Prisma.ProductUpdateOneRequiredWithoutInventoryNestedInput>;
export const ProductUpdateOneRequiredWithoutInventoryNestedInputObjectZodSchema = makeSchema();
