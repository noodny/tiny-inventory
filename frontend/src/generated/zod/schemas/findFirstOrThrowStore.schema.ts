import type { Prisma } from '@prisma/client';
import * as z from 'zod';
import { StoreOrderByWithRelationInputObjectSchema as StoreOrderByWithRelationInputObjectSchema } from './objects/StoreOrderByWithRelationInput.schema';
import { StoreWhereInputObjectSchema as StoreWhereInputObjectSchema } from './objects/StoreWhereInput.schema';
import { StoreWhereUniqueInputObjectSchema as StoreWhereUniqueInputObjectSchema } from './objects/StoreWhereUniqueInput.schema';
import { StoreScalarFieldEnumSchema } from './enums/StoreScalarFieldEnum.schema';

// Select schema needs to be in file to prevent circular imports
//------------------------------------------------------

export const StoreFindFirstOrThrowSelectSchema: z.ZodType<Prisma.StoreSelect> = z.object({
    id: z.boolean().optional(),
    name: z.boolean().optional(),
    isActive: z.boolean().optional(),
    createdAt: z.boolean().optional(),
    updatedAt: z.boolean().optional(),
    inventory: z.boolean().optional(),
    _count: z.boolean().optional()
  }).strict() as unknown as z.ZodType<Prisma.StoreSelect>;

export const StoreFindFirstOrThrowSelectZodSchema = z.object({
    id: z.boolean().optional(),
    name: z.boolean().optional(),
    isActive: z.boolean().optional(),
    createdAt: z.boolean().optional(),
    updatedAt: z.boolean().optional(),
    inventory: z.boolean().optional(),
    _count: z.boolean().optional()
  }).strict();

export const StoreFindFirstOrThrowSchema: z.ZodType<Prisma.StoreFindFirstOrThrowArgs> = z.object({ select: StoreFindFirstOrThrowSelectSchema.optional(),  orderBy: z.union([StoreOrderByWithRelationInputObjectSchema, StoreOrderByWithRelationInputObjectSchema.array()]).optional(), where: StoreWhereInputObjectSchema.optional(), cursor: StoreWhereUniqueInputObjectSchema.optional(), take: z.number().optional(), skip: z.number().optional(), distinct: z.union([StoreScalarFieldEnumSchema, StoreScalarFieldEnumSchema.array()]).optional() }).strict() as unknown as z.ZodType<Prisma.StoreFindFirstOrThrowArgs>;

export const StoreFindFirstOrThrowZodSchema = z.object({ select: StoreFindFirstOrThrowSelectSchema.optional(),  orderBy: z.union([StoreOrderByWithRelationInputObjectSchema, StoreOrderByWithRelationInputObjectSchema.array()]).optional(), where: StoreWhereInputObjectSchema.optional(), cursor: StoreWhereUniqueInputObjectSchema.optional(), take: z.number().optional(), skip: z.number().optional(), distinct: z.union([StoreScalarFieldEnumSchema, StoreScalarFieldEnumSchema.array()]).optional() }).strict();