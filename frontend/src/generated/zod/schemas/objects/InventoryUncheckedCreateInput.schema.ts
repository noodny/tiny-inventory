import * as z from 'zod';
import type { Prisma } from '@prisma/client';


const makeSchema = () => z.object({
  id: z.number().int().optional(),
  storeId: z.number().int(),
  productId: z.number().int(),
  quantity: z.number().int().optional(),
  createdAt: z.coerce.date().optional()
}).strict();
export const InventoryUncheckedCreateInputObjectSchema: z.ZodType<Prisma.InventoryUncheckedCreateInput> = makeSchema() as unknown as z.ZodType<Prisma.InventoryUncheckedCreateInput>;
export const InventoryUncheckedCreateInputObjectZodSchema = makeSchema();
