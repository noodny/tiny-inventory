import * as z from 'zod';
import type { Prisma } from '@prisma/client';
import { InventoryStoreIdProductIdCompoundUniqueInputObjectSchema as InventoryStoreIdProductIdCompoundUniqueInputObjectSchema } from './InventoryStoreIdProductIdCompoundUniqueInput.schema'

const makeSchema = () => z.object({
  id: z.number().int().optional(),
  storeId_productId: z.lazy(() => InventoryStoreIdProductIdCompoundUniqueInputObjectSchema).optional()
}).strict();
export const InventoryWhereUniqueInputObjectSchema: z.ZodType<Prisma.InventoryWhereUniqueInput> = makeSchema() as unknown as z.ZodType<Prisma.InventoryWhereUniqueInput>;
export const InventoryWhereUniqueInputObjectZodSchema = makeSchema();
