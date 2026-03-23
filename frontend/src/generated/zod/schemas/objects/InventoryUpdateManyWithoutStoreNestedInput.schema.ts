import * as z from 'zod';
import type { Prisma } from '@prisma/client';
import { InventoryCreateWithoutStoreInputObjectSchema as InventoryCreateWithoutStoreInputObjectSchema } from './InventoryCreateWithoutStoreInput.schema';
import { InventoryUncheckedCreateWithoutStoreInputObjectSchema as InventoryUncheckedCreateWithoutStoreInputObjectSchema } from './InventoryUncheckedCreateWithoutStoreInput.schema';
import { InventoryCreateOrConnectWithoutStoreInputObjectSchema as InventoryCreateOrConnectWithoutStoreInputObjectSchema } from './InventoryCreateOrConnectWithoutStoreInput.schema';
import { InventoryUpsertWithWhereUniqueWithoutStoreInputObjectSchema as InventoryUpsertWithWhereUniqueWithoutStoreInputObjectSchema } from './InventoryUpsertWithWhereUniqueWithoutStoreInput.schema';
import { InventoryCreateManyStoreInputEnvelopeObjectSchema as InventoryCreateManyStoreInputEnvelopeObjectSchema } from './InventoryCreateManyStoreInputEnvelope.schema';
import { InventoryWhereUniqueInputObjectSchema as InventoryWhereUniqueInputObjectSchema } from './InventoryWhereUniqueInput.schema';
import { InventoryUpdateWithWhereUniqueWithoutStoreInputObjectSchema as InventoryUpdateWithWhereUniqueWithoutStoreInputObjectSchema } from './InventoryUpdateWithWhereUniqueWithoutStoreInput.schema';
import { InventoryUpdateManyWithWhereWithoutStoreInputObjectSchema as InventoryUpdateManyWithWhereWithoutStoreInputObjectSchema } from './InventoryUpdateManyWithWhereWithoutStoreInput.schema';
import { InventoryScalarWhereInputObjectSchema as InventoryScalarWhereInputObjectSchema } from './InventoryScalarWhereInput.schema'

const makeSchema = () => z.object({
  create: z.union([z.lazy(() => InventoryCreateWithoutStoreInputObjectSchema), z.lazy(() => InventoryCreateWithoutStoreInputObjectSchema).array(), z.lazy(() => InventoryUncheckedCreateWithoutStoreInputObjectSchema), z.lazy(() => InventoryUncheckedCreateWithoutStoreInputObjectSchema).array()]).optional(),
  connectOrCreate: z.union([z.lazy(() => InventoryCreateOrConnectWithoutStoreInputObjectSchema), z.lazy(() => InventoryCreateOrConnectWithoutStoreInputObjectSchema).array()]).optional(),
  upsert: z.union([z.lazy(() => InventoryUpsertWithWhereUniqueWithoutStoreInputObjectSchema), z.lazy(() => InventoryUpsertWithWhereUniqueWithoutStoreInputObjectSchema).array()]).optional(),
  createMany: z.lazy(() => InventoryCreateManyStoreInputEnvelopeObjectSchema).optional(),
  set: z.union([z.lazy(() => InventoryWhereUniqueInputObjectSchema), z.lazy(() => InventoryWhereUniqueInputObjectSchema).array()]).optional(),
  disconnect: z.union([z.lazy(() => InventoryWhereUniqueInputObjectSchema), z.lazy(() => InventoryWhereUniqueInputObjectSchema).array()]).optional(),
  delete: z.union([z.lazy(() => InventoryWhereUniqueInputObjectSchema), z.lazy(() => InventoryWhereUniqueInputObjectSchema).array()]).optional(),
  connect: z.union([z.lazy(() => InventoryWhereUniqueInputObjectSchema), z.lazy(() => InventoryWhereUniqueInputObjectSchema).array()]).optional(),
  update: z.union([z.lazy(() => InventoryUpdateWithWhereUniqueWithoutStoreInputObjectSchema), z.lazy(() => InventoryUpdateWithWhereUniqueWithoutStoreInputObjectSchema).array()]).optional(),
  updateMany: z.union([z.lazy(() => InventoryUpdateManyWithWhereWithoutStoreInputObjectSchema), z.lazy(() => InventoryUpdateManyWithWhereWithoutStoreInputObjectSchema).array()]).optional(),
  deleteMany: z.union([z.lazy(() => InventoryScalarWhereInputObjectSchema), z.lazy(() => InventoryScalarWhereInputObjectSchema).array()]).optional()
}).strict();
export const InventoryUpdateManyWithoutStoreNestedInputObjectSchema: z.ZodType<Prisma.InventoryUpdateManyWithoutStoreNestedInput> = makeSchema() as unknown as z.ZodType<Prisma.InventoryUpdateManyWithoutStoreNestedInput>;
export const InventoryUpdateManyWithoutStoreNestedInputObjectZodSchema = makeSchema();
