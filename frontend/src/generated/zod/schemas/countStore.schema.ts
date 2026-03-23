import type { Prisma } from '@prisma/client';
import * as z from 'zod';
import { StoreOrderByWithRelationInputObjectSchema as StoreOrderByWithRelationInputObjectSchema } from './objects/StoreOrderByWithRelationInput.schema';
import { StoreWhereInputObjectSchema as StoreWhereInputObjectSchema } from './objects/StoreWhereInput.schema';
import { StoreWhereUniqueInputObjectSchema as StoreWhereUniqueInputObjectSchema } from './objects/StoreWhereUniqueInput.schema';
import { StoreCountAggregateInputObjectSchema as StoreCountAggregateInputObjectSchema } from './objects/StoreCountAggregateInput.schema';

export const StoreCountSchema: z.ZodType<Prisma.StoreCountArgs> = z.object({ orderBy: z.union([StoreOrderByWithRelationInputObjectSchema, StoreOrderByWithRelationInputObjectSchema.array()]).optional(), where: StoreWhereInputObjectSchema.optional(), cursor: StoreWhereUniqueInputObjectSchema.optional(), take: z.number().optional(), skip: z.number().optional(), select: z.union([ z.literal(true), StoreCountAggregateInputObjectSchema ]).optional() }).strict() as unknown as z.ZodType<Prisma.StoreCountArgs>;

export const StoreCountZodSchema = z.object({ orderBy: z.union([StoreOrderByWithRelationInputObjectSchema, StoreOrderByWithRelationInputObjectSchema.array()]).optional(), where: StoreWhereInputObjectSchema.optional(), cursor: StoreWhereUniqueInputObjectSchema.optional(), take: z.number().optional(), skip: z.number().optional(), select: z.union([ z.literal(true), StoreCountAggregateInputObjectSchema ]).optional() }).strict();