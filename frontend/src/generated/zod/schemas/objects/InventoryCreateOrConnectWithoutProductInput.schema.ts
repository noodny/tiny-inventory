import * as z from 'zod';
import type { Prisma } from '@prisma/client';
import { InventoryWhereUniqueInputObjectSchema as InventoryWhereUniqueInputObjectSchema } from './InventoryWhereUniqueInput.schema';
import { InventoryCreateWithoutProductInputObjectSchema as InventoryCreateWithoutProductInputObjectSchema } from './InventoryCreateWithoutProductInput.schema';
import { InventoryUncheckedCreateWithoutProductInputObjectSchema as InventoryUncheckedCreateWithoutProductInputObjectSchema } from './InventoryUncheckedCreateWithoutProductInput.schema'

const makeSchema = () => z.object({
  where: z.lazy(() => InventoryWhereUniqueInputObjectSchema),
  create: z.union([z.lazy(() => InventoryCreateWithoutProductInputObjectSchema), z.lazy(() => InventoryUncheckedCreateWithoutProductInputObjectSchema)])
}).strict();
export const InventoryCreateOrConnectWithoutProductInputObjectSchema: z.ZodType<Prisma.InventoryCreateOrConnectWithoutProductInput> = makeSchema() as unknown as z.ZodType<Prisma.InventoryCreateOrConnectWithoutProductInput>;
export const InventoryCreateOrConnectWithoutProductInputObjectZodSchema = makeSchema();
