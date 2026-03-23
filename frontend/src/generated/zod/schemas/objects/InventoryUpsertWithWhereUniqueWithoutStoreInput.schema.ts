import * as z from 'zod';
import type { Prisma } from '@prisma/client';
import { InventoryWhereUniqueInputObjectSchema as InventoryWhereUniqueInputObjectSchema } from './InventoryWhereUniqueInput.schema';
import { InventoryUpdateWithoutStoreInputObjectSchema as InventoryUpdateWithoutStoreInputObjectSchema } from './InventoryUpdateWithoutStoreInput.schema';
import { InventoryUncheckedUpdateWithoutStoreInputObjectSchema as InventoryUncheckedUpdateWithoutStoreInputObjectSchema } from './InventoryUncheckedUpdateWithoutStoreInput.schema';
import { InventoryCreateWithoutStoreInputObjectSchema as InventoryCreateWithoutStoreInputObjectSchema } from './InventoryCreateWithoutStoreInput.schema';
import { InventoryUncheckedCreateWithoutStoreInputObjectSchema as InventoryUncheckedCreateWithoutStoreInputObjectSchema } from './InventoryUncheckedCreateWithoutStoreInput.schema'

const makeSchema = () => z.object({
  where: z.lazy(() => InventoryWhereUniqueInputObjectSchema),
  update: z.union([z.lazy(() => InventoryUpdateWithoutStoreInputObjectSchema), z.lazy(() => InventoryUncheckedUpdateWithoutStoreInputObjectSchema)]),
  create: z.union([z.lazy(() => InventoryCreateWithoutStoreInputObjectSchema), z.lazy(() => InventoryUncheckedCreateWithoutStoreInputObjectSchema)])
}).strict();
export const InventoryUpsertWithWhereUniqueWithoutStoreInputObjectSchema: z.ZodType<Prisma.InventoryUpsertWithWhereUniqueWithoutStoreInput> = makeSchema() as unknown as z.ZodType<Prisma.InventoryUpsertWithWhereUniqueWithoutStoreInput>;
export const InventoryUpsertWithWhereUniqueWithoutStoreInputObjectZodSchema = makeSchema();
