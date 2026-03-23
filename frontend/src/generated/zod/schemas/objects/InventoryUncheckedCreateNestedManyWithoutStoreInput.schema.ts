import * as z from 'zod';
import type { Prisma } from '@prisma/client';
import { InventoryCreateWithoutStoreInputObjectSchema as InventoryCreateWithoutStoreInputObjectSchema } from './InventoryCreateWithoutStoreInput.schema';
import { InventoryUncheckedCreateWithoutStoreInputObjectSchema as InventoryUncheckedCreateWithoutStoreInputObjectSchema } from './InventoryUncheckedCreateWithoutStoreInput.schema';
import { InventoryCreateOrConnectWithoutStoreInputObjectSchema as InventoryCreateOrConnectWithoutStoreInputObjectSchema } from './InventoryCreateOrConnectWithoutStoreInput.schema';
import { InventoryCreateManyStoreInputEnvelopeObjectSchema as InventoryCreateManyStoreInputEnvelopeObjectSchema } from './InventoryCreateManyStoreInputEnvelope.schema';
import { InventoryWhereUniqueInputObjectSchema as InventoryWhereUniqueInputObjectSchema } from './InventoryWhereUniqueInput.schema'

const makeSchema = () => z.object({
  create: z.union([z.lazy(() => InventoryCreateWithoutStoreInputObjectSchema), z.lazy(() => InventoryCreateWithoutStoreInputObjectSchema).array(), z.lazy(() => InventoryUncheckedCreateWithoutStoreInputObjectSchema), z.lazy(() => InventoryUncheckedCreateWithoutStoreInputObjectSchema).array()]).optional(),
  connectOrCreate: z.union([z.lazy(() => InventoryCreateOrConnectWithoutStoreInputObjectSchema), z.lazy(() => InventoryCreateOrConnectWithoutStoreInputObjectSchema).array()]).optional(),
  createMany: z.lazy(() => InventoryCreateManyStoreInputEnvelopeObjectSchema).optional(),
  connect: z.union([z.lazy(() => InventoryWhereUniqueInputObjectSchema), z.lazy(() => InventoryWhereUniqueInputObjectSchema).array()]).optional()
}).strict();
export const InventoryUncheckedCreateNestedManyWithoutStoreInputObjectSchema: z.ZodType<Prisma.InventoryUncheckedCreateNestedManyWithoutStoreInput> = makeSchema() as unknown as z.ZodType<Prisma.InventoryUncheckedCreateNestedManyWithoutStoreInput>;
export const InventoryUncheckedCreateNestedManyWithoutStoreInputObjectZodSchema = makeSchema();
