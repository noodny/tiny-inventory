import type { Prisma } from '@prisma/client';
import * as z from 'zod';
import { InventoryWhereUniqueInputObjectSchema as InventoryWhereUniqueInputObjectSchema } from './objects/InventoryWhereUniqueInput.schema';

export const InventoryDeleteOneSchema: z.ZodType<Prisma.InventoryDeleteArgs> = z.object({   where: InventoryWhereUniqueInputObjectSchema }).strict() as unknown as z.ZodType<Prisma.InventoryDeleteArgs>;

export const InventoryDeleteOneZodSchema = z.object({   where: InventoryWhereUniqueInputObjectSchema }).strict();