import * as z from 'zod';
import type { Prisma } from '@prisma/client';
import { InventoryWhereUniqueInputObjectSchema as InventoryWhereUniqueInputObjectSchema } from './InventoryWhereUniqueInput.schema';
import { InventoryCreateWithoutStoreInputObjectSchema as InventoryCreateWithoutStoreInputObjectSchema } from './InventoryCreateWithoutStoreInput.schema';
import { InventoryUncheckedCreateWithoutStoreInputObjectSchema as InventoryUncheckedCreateWithoutStoreInputObjectSchema } from './InventoryUncheckedCreateWithoutStoreInput.schema'

const makeSchema = () => z.object({
  where: z.lazy(() => InventoryWhereUniqueInputObjectSchema),
  create: z.union([z.lazy(() => InventoryCreateWithoutStoreInputObjectSchema), z.lazy(() => InventoryUncheckedCreateWithoutStoreInputObjectSchema)])
}).strict();
export const InventoryCreateOrConnectWithoutStoreInputObjectSchema: z.ZodType<Prisma.InventoryCreateOrConnectWithoutStoreInput> = makeSchema() as unknown as z.ZodType<Prisma.InventoryCreateOrConnectWithoutStoreInput>;
export const InventoryCreateOrConnectWithoutStoreInputObjectZodSchema = makeSchema();
