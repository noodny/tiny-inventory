import type { Prisma } from '@prisma/client';
import * as z from 'zod';
import { InventoryWhereInputObjectSchema as InventoryWhereInputObjectSchema } from './objects/InventoryWhereInput.schema';

export const InventoryDeleteManySchema: z.ZodType<Prisma.InventoryDeleteManyArgs> = z.object({ where: InventoryWhereInputObjectSchema.optional() }).strict() as unknown as z.ZodType<Prisma.InventoryDeleteManyArgs>;

export const InventoryDeleteManyZodSchema = z.object({ where: InventoryWhereInputObjectSchema.optional() }).strict();