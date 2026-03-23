import * as z from 'zod';
import type { Prisma } from '@prisma/client';
import { InventoryWhereUniqueInputObjectSchema as InventoryWhereUniqueInputObjectSchema } from './InventoryWhereUniqueInput.schema';
import { InventoryUpdateWithoutStoreInputObjectSchema as InventoryUpdateWithoutStoreInputObjectSchema } from './InventoryUpdateWithoutStoreInput.schema';
import { InventoryUncheckedUpdateWithoutStoreInputObjectSchema as InventoryUncheckedUpdateWithoutStoreInputObjectSchema } from './InventoryUncheckedUpdateWithoutStoreInput.schema'

const makeSchema = () => z.object({
  where: z.lazy(() => InventoryWhereUniqueInputObjectSchema),
  data: z.union([z.lazy(() => InventoryUpdateWithoutStoreInputObjectSchema), z.lazy(() => InventoryUncheckedUpdateWithoutStoreInputObjectSchema)])
}).strict();
export const InventoryUpdateWithWhereUniqueWithoutStoreInputObjectSchema: z.ZodType<Prisma.InventoryUpdateWithWhereUniqueWithoutStoreInput> = makeSchema() as unknown as z.ZodType<Prisma.InventoryUpdateWithWhereUniqueWithoutStoreInput>;
export const InventoryUpdateWithWhereUniqueWithoutStoreInputObjectZodSchema = makeSchema();
