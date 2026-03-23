import type { Prisma } from '@prisma/client';
import * as z from 'zod';
import { InventoryWhereUniqueInputObjectSchema as InventoryWhereUniqueInputObjectSchema } from './objects/InventoryWhereUniqueInput.schema';
import { InventoryCreateInputObjectSchema as InventoryCreateInputObjectSchema } from './objects/InventoryCreateInput.schema';
import { InventoryUncheckedCreateInputObjectSchema as InventoryUncheckedCreateInputObjectSchema } from './objects/InventoryUncheckedCreateInput.schema';
import { InventoryUpdateInputObjectSchema as InventoryUpdateInputObjectSchema } from './objects/InventoryUpdateInput.schema';
import { InventoryUncheckedUpdateInputObjectSchema as InventoryUncheckedUpdateInputObjectSchema } from './objects/InventoryUncheckedUpdateInput.schema';

export const InventoryUpsertOneSchema: z.ZodType<Prisma.InventoryUpsertArgs> = z.object({   where: InventoryWhereUniqueInputObjectSchema, create: z.union([ InventoryCreateInputObjectSchema, InventoryUncheckedCreateInputObjectSchema ]), update: z.union([ InventoryUpdateInputObjectSchema, InventoryUncheckedUpdateInputObjectSchema ]) }).strict() as unknown as z.ZodType<Prisma.InventoryUpsertArgs>;

export const InventoryUpsertOneZodSchema = z.object({   where: InventoryWhereUniqueInputObjectSchema, create: z.union([ InventoryCreateInputObjectSchema, InventoryUncheckedCreateInputObjectSchema ]), update: z.union([ InventoryUpdateInputObjectSchema, InventoryUncheckedUpdateInputObjectSchema ]) }).strict();