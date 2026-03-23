import * as z from 'zod';
import type { Prisma } from '@prisma/client';


const makeSchema = () => z.object({
  id: z.number().int().optional(),
  name: z.string().max(255),
  isActive: z.boolean().optional(),
  createdAt: z.coerce.date().optional(),
  updatedAt: z.coerce.date().optional()
}).strict();
export const StoreCreateManyInputObjectSchema: z.ZodType<Prisma.StoreCreateManyInput> = makeSchema() as unknown as z.ZodType<Prisma.StoreCreateManyInput>;
export const StoreCreateManyInputObjectZodSchema = makeSchema();
