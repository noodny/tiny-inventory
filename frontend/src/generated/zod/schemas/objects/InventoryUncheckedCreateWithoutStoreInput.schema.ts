import * as z from 'zod';
import type { Prisma } from '@prisma/client';


const makeSchema = () => z.object({
  id: z.number().int().optional(),
  productId: z.number().int(),
  quantity: z.number().int().optional(),
  createdAt: z.coerce.date().optional(),
  updatedAt: z.coerce.date().optional()
}).strict();
export const InventoryUncheckedCreateWithoutStoreInputObjectSchema: z.ZodType<Prisma.InventoryUncheckedCreateWithoutStoreInput> = makeSchema() as unknown as z.ZodType<Prisma.InventoryUncheckedCreateWithoutStoreInput>;
export const InventoryUncheckedCreateWithoutStoreInputObjectZodSchema = makeSchema();
