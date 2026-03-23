import * as z from 'zod';
import type { Prisma } from '@prisma/client';


const makeSchema = () => z.object({
  id: z.number().int().optional(),
  name: z.string(),
  isActive: z.boolean().optional(),
  createdAt: z.coerce.date().optional(),
  updatedAt: z.coerce.date().optional()
}).strict();
export const StoreUncheckedCreateWithoutInventoryInputObjectSchema: z.ZodType<Prisma.StoreUncheckedCreateWithoutInventoryInput> = makeSchema() as unknown as z.ZodType<Prisma.StoreUncheckedCreateWithoutInventoryInput>;
export const StoreUncheckedCreateWithoutInventoryInputObjectZodSchema = makeSchema();
