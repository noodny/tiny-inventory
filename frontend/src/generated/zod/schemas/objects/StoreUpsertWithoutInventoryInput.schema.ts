import * as z from 'zod';
import type { Prisma } from '@prisma/client';
import { StoreUpdateWithoutInventoryInputObjectSchema as StoreUpdateWithoutInventoryInputObjectSchema } from './StoreUpdateWithoutInventoryInput.schema';
import { StoreUncheckedUpdateWithoutInventoryInputObjectSchema as StoreUncheckedUpdateWithoutInventoryInputObjectSchema } from './StoreUncheckedUpdateWithoutInventoryInput.schema';
import { StoreCreateWithoutInventoryInputObjectSchema as StoreCreateWithoutInventoryInputObjectSchema } from './StoreCreateWithoutInventoryInput.schema';
import { StoreUncheckedCreateWithoutInventoryInputObjectSchema as StoreUncheckedCreateWithoutInventoryInputObjectSchema } from './StoreUncheckedCreateWithoutInventoryInput.schema';
import { StoreWhereInputObjectSchema as StoreWhereInputObjectSchema } from './StoreWhereInput.schema'

const makeSchema = () => z.object({
  update: z.union([z.lazy(() => StoreUpdateWithoutInventoryInputObjectSchema), z.lazy(() => StoreUncheckedUpdateWithoutInventoryInputObjectSchema)]),
  create: z.union([z.lazy(() => StoreCreateWithoutInventoryInputObjectSchema), z.lazy(() => StoreUncheckedCreateWithoutInventoryInputObjectSchema)]),
  where: z.lazy(() => StoreWhereInputObjectSchema).optional()
}).strict();
export const StoreUpsertWithoutInventoryInputObjectSchema: z.ZodType<Prisma.StoreUpsertWithoutInventoryInput> = makeSchema() as unknown as z.ZodType<Prisma.StoreUpsertWithoutInventoryInput>;
export const StoreUpsertWithoutInventoryInputObjectZodSchema = makeSchema();
