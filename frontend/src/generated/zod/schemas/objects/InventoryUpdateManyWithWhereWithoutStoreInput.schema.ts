import * as z from 'zod';
import type { Prisma } from '@prisma/client';
import { InventoryScalarWhereInputObjectSchema as InventoryScalarWhereInputObjectSchema } from './InventoryScalarWhereInput.schema';
import { InventoryUpdateManyMutationInputObjectSchema as InventoryUpdateManyMutationInputObjectSchema } from './InventoryUpdateManyMutationInput.schema';
import { InventoryUncheckedUpdateManyWithoutStoreInputObjectSchema as InventoryUncheckedUpdateManyWithoutStoreInputObjectSchema } from './InventoryUncheckedUpdateManyWithoutStoreInput.schema'

const makeSchema = () => z.object({
  where: z.lazy(() => InventoryScalarWhereInputObjectSchema),
  data: z.union([z.lazy(() => InventoryUpdateManyMutationInputObjectSchema), z.lazy(() => InventoryUncheckedUpdateManyWithoutStoreInputObjectSchema)])
}).strict();
export const InventoryUpdateManyWithWhereWithoutStoreInputObjectSchema: z.ZodType<Prisma.InventoryUpdateManyWithWhereWithoutStoreInput> = makeSchema() as unknown as z.ZodType<Prisma.InventoryUpdateManyWithWhereWithoutStoreInput>;
export const InventoryUpdateManyWithWhereWithoutStoreInputObjectZodSchema = makeSchema();
