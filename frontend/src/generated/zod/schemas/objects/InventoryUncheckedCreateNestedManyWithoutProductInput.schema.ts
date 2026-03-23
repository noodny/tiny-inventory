import * as z from 'zod';
import type { Prisma } from '@prisma/client';
import { InventoryCreateWithoutProductInputObjectSchema as InventoryCreateWithoutProductInputObjectSchema } from './InventoryCreateWithoutProductInput.schema';
import { InventoryUncheckedCreateWithoutProductInputObjectSchema as InventoryUncheckedCreateWithoutProductInputObjectSchema } from './InventoryUncheckedCreateWithoutProductInput.schema';
import { InventoryCreateOrConnectWithoutProductInputObjectSchema as InventoryCreateOrConnectWithoutProductInputObjectSchema } from './InventoryCreateOrConnectWithoutProductInput.schema';
import { InventoryCreateManyProductInputEnvelopeObjectSchema as InventoryCreateManyProductInputEnvelopeObjectSchema } from './InventoryCreateManyProductInputEnvelope.schema';
import { InventoryWhereUniqueInputObjectSchema as InventoryWhereUniqueInputObjectSchema } from './InventoryWhereUniqueInput.schema'

const makeSchema = () => z.object({
  create: z.union([z.lazy(() => InventoryCreateWithoutProductInputObjectSchema), z.lazy(() => InventoryCreateWithoutProductInputObjectSchema).array(), z.lazy(() => InventoryUncheckedCreateWithoutProductInputObjectSchema), z.lazy(() => InventoryUncheckedCreateWithoutProductInputObjectSchema).array()]).optional(),
  connectOrCreate: z.union([z.lazy(() => InventoryCreateOrConnectWithoutProductInputObjectSchema), z.lazy(() => InventoryCreateOrConnectWithoutProductInputObjectSchema).array()]).optional(),
  createMany: z.lazy(() => InventoryCreateManyProductInputEnvelopeObjectSchema).optional(),
  connect: z.union([z.lazy(() => InventoryWhereUniqueInputObjectSchema), z.lazy(() => InventoryWhereUniqueInputObjectSchema).array()]).optional()
}).strict();
export const InventoryUncheckedCreateNestedManyWithoutProductInputObjectSchema: z.ZodType<Prisma.InventoryUncheckedCreateNestedManyWithoutProductInput> = makeSchema() as unknown as z.ZodType<Prisma.InventoryUncheckedCreateNestedManyWithoutProductInput>;
export const InventoryUncheckedCreateNestedManyWithoutProductInputObjectZodSchema = makeSchema();
