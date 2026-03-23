import * as z from 'zod';
import type { Prisma } from '@prisma/client';
import { InventoryScalarWhereInputObjectSchema as InventoryScalarWhereInputObjectSchema } from './InventoryScalarWhereInput.schema';
import { InventoryUpdateManyMutationInputObjectSchema as InventoryUpdateManyMutationInputObjectSchema } from './InventoryUpdateManyMutationInput.schema';
import { InventoryUncheckedUpdateManyWithoutProductInputObjectSchema as InventoryUncheckedUpdateManyWithoutProductInputObjectSchema } from './InventoryUncheckedUpdateManyWithoutProductInput.schema'

const makeSchema = () => z.object({
  where: z.lazy(() => InventoryScalarWhereInputObjectSchema),
  data: z.union([z.lazy(() => InventoryUpdateManyMutationInputObjectSchema), z.lazy(() => InventoryUncheckedUpdateManyWithoutProductInputObjectSchema)])
}).strict();
export const InventoryUpdateManyWithWhereWithoutProductInputObjectSchema: z.ZodType<Prisma.InventoryUpdateManyWithWhereWithoutProductInput> = makeSchema() as unknown as z.ZodType<Prisma.InventoryUpdateManyWithWhereWithoutProductInput>;
export const InventoryUpdateManyWithWhereWithoutProductInputObjectZodSchema = makeSchema();
