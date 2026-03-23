import type { Prisma } from '@prisma/client';
import * as z from 'zod';
import { InventoryCreateManyInputObjectSchema as InventoryCreateManyInputObjectSchema } from './objects/InventoryCreateManyInput.schema';

export const InventoryCreateManySchema: z.ZodType<Prisma.InventoryCreateManyArgs> = z.object({ data: z.union([ InventoryCreateManyInputObjectSchema, z.array(InventoryCreateManyInputObjectSchema) ]),  }).strict() as unknown as z.ZodType<Prisma.InventoryCreateManyArgs>;

export const InventoryCreateManyZodSchema = z.object({ data: z.union([ InventoryCreateManyInputObjectSchema, z.array(InventoryCreateManyInputObjectSchema) ]),  }).strict();