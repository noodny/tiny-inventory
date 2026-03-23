import type { Prisma } from '@prisma/client';
import * as z from 'zod';
import { InventoryCreateInputObjectSchema as InventoryCreateInputObjectSchema } from './objects/InventoryCreateInput.schema';
import { InventoryUncheckedCreateInputObjectSchema as InventoryUncheckedCreateInputObjectSchema } from './objects/InventoryUncheckedCreateInput.schema';

export const InventoryCreateOneSchema: z.ZodType<Prisma.InventoryCreateArgs> = z.object({   data: z.union([InventoryCreateInputObjectSchema, InventoryUncheckedCreateInputObjectSchema]) }).strict() as unknown as z.ZodType<Prisma.InventoryCreateArgs>;

export const InventoryCreateOneZodSchema = z.object({   data: z.union([InventoryCreateInputObjectSchema, InventoryUncheckedCreateInputObjectSchema]) }).strict();