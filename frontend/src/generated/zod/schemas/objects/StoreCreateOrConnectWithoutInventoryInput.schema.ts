import * as z from 'zod';
import type { Prisma } from '@prisma/client';
import { StoreWhereUniqueInputObjectSchema as StoreWhereUniqueInputObjectSchema } from './StoreWhereUniqueInput.schema';
import { StoreCreateWithoutInventoryInputObjectSchema as StoreCreateWithoutInventoryInputObjectSchema } from './StoreCreateWithoutInventoryInput.schema';
import { StoreUncheckedCreateWithoutInventoryInputObjectSchema as StoreUncheckedCreateWithoutInventoryInputObjectSchema } from './StoreUncheckedCreateWithoutInventoryInput.schema'

const makeSchema = () => z.object({
  where: z.lazy(() => StoreWhereUniqueInputObjectSchema),
  create: z.union([z.lazy(() => StoreCreateWithoutInventoryInputObjectSchema), z.lazy(() => StoreUncheckedCreateWithoutInventoryInputObjectSchema)])
}).strict();
export const StoreCreateOrConnectWithoutInventoryInputObjectSchema: z.ZodType<Prisma.StoreCreateOrConnectWithoutInventoryInput> = makeSchema() as unknown as z.ZodType<Prisma.StoreCreateOrConnectWithoutInventoryInput>;
export const StoreCreateOrConnectWithoutInventoryInputObjectZodSchema = makeSchema();
