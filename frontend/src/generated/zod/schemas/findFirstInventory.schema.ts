import type { Prisma } from '@prisma/client';
import * as z from 'zod';
import { InventoryOrderByWithRelationInputObjectSchema as InventoryOrderByWithRelationInputObjectSchema } from './objects/InventoryOrderByWithRelationInput.schema';
import { InventoryWhereInputObjectSchema as InventoryWhereInputObjectSchema } from './objects/InventoryWhereInput.schema';
import { InventoryWhereUniqueInputObjectSchema as InventoryWhereUniqueInputObjectSchema } from './objects/InventoryWhereUniqueInput.schema';
import { InventoryScalarFieldEnumSchema } from './enums/InventoryScalarFieldEnum.schema';

// Select schema needs to be in file to prevent circular imports
//------------------------------------------------------

export const InventoryFindFirstSelectSchema: z.ZodType<Prisma.InventorySelect> = z.object({
    id: z.boolean().optional(),
    storeId: z.boolean().optional(),
    productId: z.boolean().optional(),
    quantity: z.boolean().optional(),
    createdAt: z.boolean().optional(),
    updatedAt: z.boolean().optional(),
    store: z.boolean().optional(),
    product: z.boolean().optional()
  }).strict() as unknown as z.ZodType<Prisma.InventorySelect>;

export const InventoryFindFirstSelectZodSchema = z.object({
    id: z.boolean().optional(),
    storeId: z.boolean().optional(),
    productId: z.boolean().optional(),
    quantity: z.boolean().optional(),
    createdAt: z.boolean().optional(),
    updatedAt: z.boolean().optional(),
    store: z.boolean().optional(),
    product: z.boolean().optional()
  }).strict();

export const InventoryFindFirstSchema: z.ZodType<Prisma.InventoryFindFirstArgs> = z.object({ select: InventoryFindFirstSelectSchema.optional(),  orderBy: z.union([InventoryOrderByWithRelationInputObjectSchema, InventoryOrderByWithRelationInputObjectSchema.array()]).optional(), where: InventoryWhereInputObjectSchema.optional(), cursor: InventoryWhereUniqueInputObjectSchema.optional(), take: z.number().optional(), skip: z.number().optional(), distinct: z.union([InventoryScalarFieldEnumSchema, InventoryScalarFieldEnumSchema.array()]).optional() }).strict() as unknown as z.ZodType<Prisma.InventoryFindFirstArgs>;

export const InventoryFindFirstZodSchema = z.object({ select: InventoryFindFirstSelectSchema.optional(),  orderBy: z.union([InventoryOrderByWithRelationInputObjectSchema, InventoryOrderByWithRelationInputObjectSchema.array()]).optional(), where: InventoryWhereInputObjectSchema.optional(), cursor: InventoryWhereUniqueInputObjectSchema.optional(), take: z.number().optional(), skip: z.number().optional(), distinct: z.union([InventoryScalarFieldEnumSchema, InventoryScalarFieldEnumSchema.array()]).optional() }).strict();