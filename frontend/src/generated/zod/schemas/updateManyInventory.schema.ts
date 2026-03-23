import type { Prisma } from '@prisma/client';
import * as z from 'zod';
import { InventoryUpdateManyMutationInputObjectSchema as InventoryUpdateManyMutationInputObjectSchema } from './objects/InventoryUpdateManyMutationInput.schema';
import { InventoryWhereInputObjectSchema as InventoryWhereInputObjectSchema } from './objects/InventoryWhereInput.schema';

export const InventoryUpdateManySchema: z.ZodType<Prisma.InventoryUpdateManyArgs> = z.object({ data: InventoryUpdateManyMutationInputObjectSchema, where: InventoryWhereInputObjectSchema.optional() }).strict() as unknown as z.ZodType<Prisma.InventoryUpdateManyArgs>;

export const InventoryUpdateManyZodSchema = z.object({ data: InventoryUpdateManyMutationInputObjectSchema, where: InventoryWhereInputObjectSchema.optional() }).strict();