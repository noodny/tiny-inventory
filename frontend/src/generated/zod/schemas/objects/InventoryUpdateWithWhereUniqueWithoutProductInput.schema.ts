import * as z from 'zod';
import type { Prisma } from '@prisma/client';
import { InventoryWhereUniqueInputObjectSchema as InventoryWhereUniqueInputObjectSchema } from './InventoryWhereUniqueInput.schema';
import { InventoryUpdateWithoutProductInputObjectSchema as InventoryUpdateWithoutProductInputObjectSchema } from './InventoryUpdateWithoutProductInput.schema';
import { InventoryUncheckedUpdateWithoutProductInputObjectSchema as InventoryUncheckedUpdateWithoutProductInputObjectSchema } from './InventoryUncheckedUpdateWithoutProductInput.schema'

const makeSchema = () => z.object({
  where: z.lazy(() => InventoryWhereUniqueInputObjectSchema),
  data: z.union([z.lazy(() => InventoryUpdateWithoutProductInputObjectSchema), z.lazy(() => InventoryUncheckedUpdateWithoutProductInputObjectSchema)])
}).strict();
export const InventoryUpdateWithWhereUniqueWithoutProductInputObjectSchema: z.ZodType<Prisma.InventoryUpdateWithWhereUniqueWithoutProductInput> = makeSchema() as unknown as z.ZodType<Prisma.InventoryUpdateWithWhereUniqueWithoutProductInput>;
export const InventoryUpdateWithWhereUniqueWithoutProductInputObjectZodSchema = makeSchema();
