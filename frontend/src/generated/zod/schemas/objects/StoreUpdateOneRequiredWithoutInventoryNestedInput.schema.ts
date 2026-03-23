import * as z from 'zod';
import type { Prisma } from '@prisma/client';
import { StoreCreateWithoutInventoryInputObjectSchema as StoreCreateWithoutInventoryInputObjectSchema } from './StoreCreateWithoutInventoryInput.schema';
import { StoreUncheckedCreateWithoutInventoryInputObjectSchema as StoreUncheckedCreateWithoutInventoryInputObjectSchema } from './StoreUncheckedCreateWithoutInventoryInput.schema';
import { StoreCreateOrConnectWithoutInventoryInputObjectSchema as StoreCreateOrConnectWithoutInventoryInputObjectSchema } from './StoreCreateOrConnectWithoutInventoryInput.schema';
import { StoreUpsertWithoutInventoryInputObjectSchema as StoreUpsertWithoutInventoryInputObjectSchema } from './StoreUpsertWithoutInventoryInput.schema';
import { StoreWhereUniqueInputObjectSchema as StoreWhereUniqueInputObjectSchema } from './StoreWhereUniqueInput.schema';
import { StoreUpdateToOneWithWhereWithoutInventoryInputObjectSchema as StoreUpdateToOneWithWhereWithoutInventoryInputObjectSchema } from './StoreUpdateToOneWithWhereWithoutInventoryInput.schema';
import { StoreUpdateWithoutInventoryInputObjectSchema as StoreUpdateWithoutInventoryInputObjectSchema } from './StoreUpdateWithoutInventoryInput.schema';
import { StoreUncheckedUpdateWithoutInventoryInputObjectSchema as StoreUncheckedUpdateWithoutInventoryInputObjectSchema } from './StoreUncheckedUpdateWithoutInventoryInput.schema'

const makeSchema = () => z.object({
  create: z.union([z.lazy(() => StoreCreateWithoutInventoryInputObjectSchema), z.lazy(() => StoreUncheckedCreateWithoutInventoryInputObjectSchema)]).optional(),
  connectOrCreate: z.lazy(() => StoreCreateOrConnectWithoutInventoryInputObjectSchema).optional(),
  upsert: z.lazy(() => StoreUpsertWithoutInventoryInputObjectSchema).optional(),
  connect: z.lazy(() => StoreWhereUniqueInputObjectSchema).optional(),
  update: z.union([z.lazy(() => StoreUpdateToOneWithWhereWithoutInventoryInputObjectSchema), z.lazy(() => StoreUpdateWithoutInventoryInputObjectSchema), z.lazy(() => StoreUncheckedUpdateWithoutInventoryInputObjectSchema)]).optional()
}).strict();
export const StoreUpdateOneRequiredWithoutInventoryNestedInputObjectSchema: z.ZodType<Prisma.StoreUpdateOneRequiredWithoutInventoryNestedInput> = makeSchema() as unknown as z.ZodType<Prisma.StoreUpdateOneRequiredWithoutInventoryNestedInput>;
export const StoreUpdateOneRequiredWithoutInventoryNestedInputObjectZodSchema = makeSchema();
