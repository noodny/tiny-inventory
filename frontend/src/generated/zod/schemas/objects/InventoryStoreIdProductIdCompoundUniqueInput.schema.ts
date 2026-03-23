import * as z from 'zod';
import type { Prisma } from '@prisma/client';


const makeSchema = () => z.object({
  storeId: z.number().int(),
  productId: z.number().int()
}).strict();
export const InventoryStoreIdProductIdCompoundUniqueInputObjectSchema: z.ZodType<Prisma.InventoryStoreIdProductIdCompoundUniqueInput> = makeSchema() as unknown as z.ZodType<Prisma.InventoryStoreIdProductIdCompoundUniqueInput>;
export const InventoryStoreIdProductIdCompoundUniqueInputObjectZodSchema = makeSchema();
