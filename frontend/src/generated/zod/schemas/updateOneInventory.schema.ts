import type { Prisma } from '@prisma/client';
import * as z from 'zod';
import { InventoryUpdateInputObjectSchema as InventoryUpdateInputObjectSchema } from './objects/InventoryUpdateInput.schema';
import { InventoryUncheckedUpdateInputObjectSchema as InventoryUncheckedUpdateInputObjectSchema } from './objects/InventoryUncheckedUpdateInput.schema';
import { InventoryWhereUniqueInputObjectSchema as InventoryWhereUniqueInputObjectSchema } from './objects/InventoryWhereUniqueInput.schema';

export const InventoryUpdateOneSchema: z.ZodType<Prisma.InventoryUpdateArgs> = z.object({   data: z.union([InventoryUpdateInputObjectSchema, InventoryUncheckedUpdateInputObjectSchema]), where: InventoryWhereUniqueInputObjectSchema }).strict() as unknown as z.ZodType<Prisma.InventoryUpdateArgs>;

export const InventoryUpdateOneZodSchema = z.object({   data: z.union([InventoryUpdateInputObjectSchema, InventoryUncheckedUpdateInputObjectSchema]), where: InventoryWhereUniqueInputObjectSchema }).strict();