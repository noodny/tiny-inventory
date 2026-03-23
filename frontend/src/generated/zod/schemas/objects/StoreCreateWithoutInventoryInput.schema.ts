import * as z from 'zod';
import type { Prisma } from '@prisma/client';


const makeSchema = () => z.object({
  name: z.string().max(255),
  isActive: z.boolean().optional(),
  createdAt: z.coerce.date().optional(),
  updatedAt: z.coerce.date().optional()
}).strict();
export const StoreCreateWithoutInventoryInputObjectSchema: z.ZodType<Prisma.StoreCreateWithoutInventoryInput> = makeSchema() as unknown as z.ZodType<Prisma.StoreCreateWithoutInventoryInput>;
export const StoreCreateWithoutInventoryInputObjectZodSchema = makeSchema();
