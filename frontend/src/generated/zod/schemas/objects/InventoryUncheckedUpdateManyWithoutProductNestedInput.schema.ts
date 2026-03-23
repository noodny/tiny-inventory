import * as z from 'zod';
import type { Prisma } from '@prisma/client';
import { InventoryCreateWithoutProductInputObjectSchema as InventoryCreateWithoutProductInputObjectSchema } from './InventoryCreateWithoutProductInput.schema';
import { InventoryUncheckedCreateWithoutProductInputObjectSchema as InventoryUncheckedCreateWithoutProductInputObjectSchema } from './InventoryUncheckedCreateWithoutProductInput.schema';
import { InventoryCreateOrConnectWithoutProductInputObjectSchema as InventoryCreateOrConnectWithoutProductInputObjectSchema } from './InventoryCreateOrConnectWithoutProductInput.schema';
import { InventoryUpsertWithWhereUniqueWithoutProductInputObjectSchema as InventoryUpsertWithWhereUniqueWithoutProductInputObjectSchema } from './InventoryUpsertWithWhereUniqueWithoutProductInput.schema';
import { InventoryCreateManyProductInputEnvelopeObjectSchema as InventoryCreateManyProductInputEnvelopeObjectSchema } from './InventoryCreateManyProductInputEnvelope.schema';
import { InventoryWhereUniqueInputObjectSchema as InventoryWhereUniqueInputObjectSchema } from './InventoryWhereUniqueInput.schema';
import { InventoryUpdateWithWhereUniqueWithoutProductInputObjectSchema as InventoryUpdateWithWhereUniqueWithoutProductInputObjectSchema } from './InventoryUpdateWithWhereUniqueWithoutProductInput.schema';
import { InventoryUpdateManyWithWhereWithoutProductInputObjectSchema as InventoryUpdateManyWithWhereWithoutProductInputObjectSchema } from './InventoryUpdateManyWithWhereWithoutProductInput.schema';
import { InventoryScalarWhereInputObjectSchema as InventoryScalarWhereInputObjectSchema } from './InventoryScalarWhereInput.schema'

const makeSchema = () => z.object({
  create: z.union([z.lazy(() => InventoryCreateWithoutProductInputObjectSchema), z.lazy(() => InventoryCreateWithoutProductInputObjectSchema).array(), z.lazy(() => InventoryUncheckedCreateWithoutProductInputObjectSchema), z.lazy(() => InventoryUncheckedCreateWithoutProductInputObjectSchema).array()]).optional(),
  connectOrCreate: z.union([z.lazy(() => InventoryCreateOrConnectWithoutProductInputObjectSchema), z.lazy(() => InventoryCreateOrConnectWithoutProductInputObjectSchema).array()]).optional(),
  upsert: z.union([z.lazy(() => InventoryUpsertWithWhereUniqueWithoutProductInputObjectSchema), z.lazy(() => InventoryUpsertWithWhereUniqueWithoutProductInputObjectSchema).array()]).optional(),
  createMany: z.lazy(() => InventoryCreateManyProductInputEnvelopeObjectSchema).optional(),
  set: z.union([z.lazy(() => InventoryWhereUniqueInputObjectSchema), z.lazy(() => InventoryWhereUniqueInputObjectSchema).array()]).optional(),
  disconnect: z.union([z.lazy(() => InventoryWhereUniqueInputObjectSchema), z.lazy(() => InventoryWhereUniqueInputObjectSchema).array()]).optional(),
  delete: z.union([z.lazy(() => InventoryWhereUniqueInputObjectSchema), z.lazy(() => InventoryWhereUniqueInputObjectSchema).array()]).optional(),
  connect: z.union([z.lazy(() => InventoryWhereUniqueInputObjectSchema), z.lazy(() => InventoryWhereUniqueInputObjectSchema).array()]).optional(),
  update: z.union([z.lazy(() => InventoryUpdateWithWhereUniqueWithoutProductInputObjectSchema), z.lazy(() => InventoryUpdateWithWhereUniqueWithoutProductInputObjectSchema).array()]).optional(),
  updateMany: z.union([z.lazy(() => InventoryUpdateManyWithWhereWithoutProductInputObjectSchema), z.lazy(() => InventoryUpdateManyWithWhereWithoutProductInputObjectSchema).array()]).optional(),
  deleteMany: z.union([z.lazy(() => InventoryScalarWhereInputObjectSchema), z.lazy(() => InventoryScalarWhereInputObjectSchema).array()]).optional()
}).strict();
export const InventoryUncheckedUpdateManyWithoutProductNestedInputObjectSchema: z.ZodType<Prisma.InventoryUncheckedUpdateManyWithoutProductNestedInput> = makeSchema() as unknown as z.ZodType<Prisma.InventoryUncheckedUpdateManyWithoutProductNestedInput>;
export const InventoryUncheckedUpdateManyWithoutProductNestedInputObjectZodSchema = makeSchema();
