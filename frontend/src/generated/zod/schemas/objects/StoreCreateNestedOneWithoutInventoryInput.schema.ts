import * as z from 'zod';
import type { Prisma } from '@prisma/client';
import { StoreCreateWithoutInventoryInputObjectSchema as StoreCreateWithoutInventoryInputObjectSchema } from './StoreCreateWithoutInventoryInput.schema';
import { StoreUncheckedCreateWithoutInventoryInputObjectSchema as StoreUncheckedCreateWithoutInventoryInputObjectSchema } from './StoreUncheckedCreateWithoutInventoryInput.schema';
import { StoreCreateOrConnectWithoutInventoryInputObjectSchema as StoreCreateOrConnectWithoutInventoryInputObjectSchema } from './StoreCreateOrConnectWithoutInventoryInput.schema';
import { StoreWhereUniqueInputObjectSchema as StoreWhereUniqueInputObjectSchema } from './StoreWhereUniqueInput.schema'

const makeSchema = () => z.object({
  create: z.union([z.lazy(() => StoreCreateWithoutInventoryInputObjectSchema), z.lazy(() => StoreUncheckedCreateWithoutInventoryInputObjectSchema)]).optional(),
  connectOrCreate: z.lazy(() => StoreCreateOrConnectWithoutInventoryInputObjectSchema).optional(),
  connect: z.lazy(() => StoreWhereUniqueInputObjectSchema).optional()
}).strict();
export const StoreCreateNestedOneWithoutInventoryInputObjectSchema: z.ZodType<Prisma.StoreCreateNestedOneWithoutInventoryInput> = makeSchema() as unknown as z.ZodType<Prisma.StoreCreateNestedOneWithoutInventoryInput>;
export const StoreCreateNestedOneWithoutInventoryInputObjectZodSchema = makeSchema();
