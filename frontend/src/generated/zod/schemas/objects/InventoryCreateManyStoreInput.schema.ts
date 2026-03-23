import * as z from 'zod';
import type { Prisma } from '@prisma/client';


const makeSchema = () => z.object({
  id: z.number().int().optional(),
  productId: z.number().int(),
  quantity: z.number().int().optional(),
  createdAt: z.coerce.date().optional(),
  updatedAt: z.coerce.date().optional()
}).strict();
export const InventoryCreateManyStoreInputObjectSchema: z.ZodType<Prisma.InventoryCreateManyStoreInput> = makeSchema() as unknown as z.ZodType<Prisma.InventoryCreateManyStoreInput>;
export const InventoryCreateManyStoreInputObjectZodSchema = makeSchema();
