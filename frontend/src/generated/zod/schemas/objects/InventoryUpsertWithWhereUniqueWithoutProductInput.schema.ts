import * as z from 'zod';
import type { Prisma } from '@prisma/client';
import { InventoryWhereUniqueInputObjectSchema as InventoryWhereUniqueInputObjectSchema } from './InventoryWhereUniqueInput.schema';
import { InventoryUpdateWithoutProductInputObjectSchema as InventoryUpdateWithoutProductInputObjectSchema } from './InventoryUpdateWithoutProductInput.schema';
import { InventoryUncheckedUpdateWithoutProductInputObjectSchema as InventoryUncheckedUpdateWithoutProductInputObjectSchema } from './InventoryUncheckedUpdateWithoutProductInput.schema';
import { InventoryCreateWithoutProductInputObjectSchema as InventoryCreateWithoutProductInputObjectSchema } from './InventoryCreateWithoutProductInput.schema';
import { InventoryUncheckedCreateWithoutProductInputObjectSchema as InventoryUncheckedCreateWithoutProductInputObjectSchema } from './InventoryUncheckedCreateWithoutProductInput.schema'

const makeSchema = () => z.object({
  where: z.lazy(() => InventoryWhereUniqueInputObjectSchema),
  update: z.union([z.lazy(() => InventoryUpdateWithoutProductInputObjectSchema), z.lazy(() => InventoryUncheckedUpdateWithoutProductInputObjectSchema)]),
  create: z.union([z.lazy(() => InventoryCreateWithoutProductInputObjectSchema), z.lazy(() => InventoryUncheckedCreateWithoutProductInputObjectSchema)])
}).strict();
export const InventoryUpsertWithWhereUniqueWithoutProductInputObjectSchema: z.ZodType<Prisma.InventoryUpsertWithWhereUniqueWithoutProductInput> = makeSchema() as unknown as z.ZodType<Prisma.InventoryUpsertWithWhereUniqueWithoutProductInput>;
export const InventoryUpsertWithWhereUniqueWithoutProductInputObjectZodSchema = makeSchema();
