import type { Prisma } from '@prisma/client';
import * as z from 'zod';
import { StoreOrderByWithRelationInputObjectSchema as StoreOrderByWithRelationInputObjectSchema } from './objects/StoreOrderByWithRelationInput.schema';
import { StoreWhereInputObjectSchema as StoreWhereInputObjectSchema } from './objects/StoreWhereInput.schema';
import { StoreWhereUniqueInputObjectSchema as StoreWhereUniqueInputObjectSchema } from './objects/StoreWhereUniqueInput.schema';
import { StoreScalarFieldEnumSchema } from './enums/StoreScalarFieldEnum.schema';

// Select schema needs to be in file to prevent circular imports
//------------------------------------------------------

export const StoreFindManySelectSchema: z.ZodType<Prisma.StoreSelect> = z.object({
    id: z.boolean().optional(),
    name: z.boolean().optional(),
    isActive: z.boolean().optional(),
    createdAt: z.boolean().optional(),
    updatedAt: z.boolean().optional(),
    inventory: z.boolean().optional(),
    _count: z.boolean().optional()
  }).strict() as unknown as z.ZodType<Prisma.StoreSelect>;

export const StoreFindManySelectZodSchema = z.object({
    id: z.boolean().optional(),
    name: z.boolean().optional(),
    isActive: z.boolean().optional(),
    createdAt: z.boolean().optional(),
    updatedAt: z.boolean().optional(),
    inventory: z.boolean().optional(),
    _count: z.boolean().optional()
  }).strict();

export const StoreFindManySchema: z.ZodType<Prisma.StoreFindManyArgs> = z.object({ select: StoreFindManySelectSchema.optional(),  orderBy: z.union([StoreOrderByWithRelationInputObjectSchema, StoreOrderByWithRelationInputObjectSchema.array()]).optional(), where: StoreWhereInputObjectSchema.optional(), cursor: StoreWhereUniqueInputObjectSchema.optional(), take: z.number().optional(), skip: z.number().optional(), distinct: z.union([StoreScalarFieldEnumSchema, StoreScalarFieldEnumSchema.array()]).optional() }).strict() as unknown as z.ZodType<Prisma.StoreFindManyArgs>;

export const StoreFindManyZodSchema = z.object({ select: StoreFindManySelectSchema.optional(),  orderBy: z.union([StoreOrderByWithRelationInputObjectSchema, StoreOrderByWithRelationInputObjectSchema.array()]).optional(), where: StoreWhereInputObjectSchema.optional(), cursor: StoreWhereUniqueInputObjectSchema.optional(), take: z.number().optional(), skip: z.number().optional(), distinct: z.union([StoreScalarFieldEnumSchema, StoreScalarFieldEnumSchema.array()]).optional() }).strict();