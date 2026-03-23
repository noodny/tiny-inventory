import * as z from 'zod';
import type { Prisma } from '@prisma/client';
import { ProductCreateWithoutInventoryInputObjectSchema as ProductCreateWithoutInventoryInputObjectSchema } from './ProductCreateWithoutInventoryInput.schema';
import { ProductUncheckedCreateWithoutInventoryInputObjectSchema as ProductUncheckedCreateWithoutInventoryInputObjectSchema } from './ProductUncheckedCreateWithoutInventoryInput.schema';
import { ProductCreateOrConnectWithoutInventoryInputObjectSchema as ProductCreateOrConnectWithoutInventoryInputObjectSchema } from './ProductCreateOrConnectWithoutInventoryInput.schema';
import { ProductWhereUniqueInputObjectSchema as ProductWhereUniqueInputObjectSchema } from './ProductWhereUniqueInput.schema'

const makeSchema = () => z.object({
  create: z.union([z.lazy(() => ProductCreateWithoutInventoryInputObjectSchema), z.lazy(() => ProductUncheckedCreateWithoutInventoryInputObjectSchema)]).optional(),
  connectOrCreate: z.lazy(() => ProductCreateOrConnectWithoutInventoryInputObjectSchema).optional(),
  connect: z.lazy(() => ProductWhereUniqueInputObjectSchema).optional()
}).strict();
export const ProductCreateNestedOneWithoutInventoryInputObjectSchema: z.ZodType<Prisma.ProductCreateNestedOneWithoutInventoryInput> = makeSchema() as unknown as z.ZodType<Prisma.ProductCreateNestedOneWithoutInventoryInput>;
export const ProductCreateNestedOneWithoutInventoryInputObjectZodSchema = makeSchema();
