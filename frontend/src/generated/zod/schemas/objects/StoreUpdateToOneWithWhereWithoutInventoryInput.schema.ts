import * as z from 'zod';
import type { Prisma } from '@prisma/client';
import { StoreWhereInputObjectSchema as StoreWhereInputObjectSchema } from './StoreWhereInput.schema';
import { StoreUpdateWithoutInventoryInputObjectSchema as StoreUpdateWithoutInventoryInputObjectSchema } from './StoreUpdateWithoutInventoryInput.schema';
import { StoreUncheckedUpdateWithoutInventoryInputObjectSchema as StoreUncheckedUpdateWithoutInventoryInputObjectSchema } from './StoreUncheckedUpdateWithoutInventoryInput.schema'

const makeSchema = () => z.object({
  where: z.lazy(() => StoreWhereInputObjectSchema).optional(),
  data: z.union([z.lazy(() => StoreUpdateWithoutInventoryInputObjectSchema), z.lazy(() => StoreUncheckedUpdateWithoutInventoryInputObjectSchema)])
}).strict();
export const StoreUpdateToOneWithWhereWithoutInventoryInputObjectSchema: z.ZodType<Prisma.StoreUpdateToOneWithWhereWithoutInventoryInput> = makeSchema() as unknown as z.ZodType<Prisma.StoreUpdateToOneWithWhereWithoutInventoryInput>;
export const StoreUpdateToOneWithWhereWithoutInventoryInputObjectZodSchema = makeSchema();
