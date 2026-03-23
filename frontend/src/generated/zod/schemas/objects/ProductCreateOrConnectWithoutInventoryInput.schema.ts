import * as z from 'zod';
import type { Prisma } from '@prisma/client';
import { ProductWhereUniqueInputObjectSchema as ProductWhereUniqueInputObjectSchema } from './ProductWhereUniqueInput.schema';
import { ProductCreateWithoutInventoryInputObjectSchema as ProductCreateWithoutInventoryInputObjectSchema } from './ProductCreateWithoutInventoryInput.schema';
import { ProductUncheckedCreateWithoutInventoryInputObjectSchema as ProductUncheckedCreateWithoutInventoryInputObjectSchema } from './ProductUncheckedCreateWithoutInventoryInput.schema'

const makeSchema = () => z.object({
  where: z.lazy(() => ProductWhereUniqueInputObjectSchema),
  create: z.union([z.lazy(() => ProductCreateWithoutInventoryInputObjectSchema), z.lazy(() => ProductUncheckedCreateWithoutInventoryInputObjectSchema)])
}).strict();
export const ProductCreateOrConnectWithoutInventoryInputObjectSchema: z.ZodType<Prisma.ProductCreateOrConnectWithoutInventoryInput> = makeSchema() as unknown as z.ZodType<Prisma.ProductCreateOrConnectWithoutInventoryInput>;
export const ProductCreateOrConnectWithoutInventoryInputObjectZodSchema = makeSchema();
