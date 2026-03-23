import type { Prisma } from '@prisma/client';
import * as z from 'zod';
import { StoreOrderByWithRelationInputObjectSchema as StoreOrderByWithRelationInputObjectSchema } from './objects/StoreOrderByWithRelationInput.schema';
import { StoreWhereInputObjectSchema as StoreWhereInputObjectSchema } from './objects/StoreWhereInput.schema';
import { StoreWhereUniqueInputObjectSchema as StoreWhereUniqueInputObjectSchema } from './objects/StoreWhereUniqueInput.schema';
import { StoreCountAggregateInputObjectSchema as StoreCountAggregateInputObjectSchema } from './objects/StoreCountAggregateInput.schema';
import { StoreMinAggregateInputObjectSchema as StoreMinAggregateInputObjectSchema } from './objects/StoreMinAggregateInput.schema';
import { StoreMaxAggregateInputObjectSchema as StoreMaxAggregateInputObjectSchema } from './objects/StoreMaxAggregateInput.schema';
import { StoreAvgAggregateInputObjectSchema as StoreAvgAggregateInputObjectSchema } from './objects/StoreAvgAggregateInput.schema';
import { StoreSumAggregateInputObjectSchema as StoreSumAggregateInputObjectSchema } from './objects/StoreSumAggregateInput.schema';

export const StoreAggregateSchema: z.ZodType<Prisma.StoreAggregateArgs> = z.object({ orderBy: z.union([StoreOrderByWithRelationInputObjectSchema, StoreOrderByWithRelationInputObjectSchema.array()]).optional(), where: StoreWhereInputObjectSchema.optional(), cursor: StoreWhereUniqueInputObjectSchema.optional(), take: z.number().optional(), skip: z.number().optional(), _count: z.union([ z.literal(true), StoreCountAggregateInputObjectSchema ]).optional(), _min: StoreMinAggregateInputObjectSchema.optional(), _max: StoreMaxAggregateInputObjectSchema.optional(), _avg: StoreAvgAggregateInputObjectSchema.optional(), _sum: StoreSumAggregateInputObjectSchema.optional() }).strict() as unknown as z.ZodType<Prisma.StoreAggregateArgs>;

export const StoreAggregateZodSchema = z.object({ orderBy: z.union([StoreOrderByWithRelationInputObjectSchema, StoreOrderByWithRelationInputObjectSchema.array()]).optional(), where: StoreWhereInputObjectSchema.optional(), cursor: StoreWhereUniqueInputObjectSchema.optional(), take: z.number().optional(), skip: z.number().optional(), _count: z.union([ z.literal(true), StoreCountAggregateInputObjectSchema ]).optional(), _min: StoreMinAggregateInputObjectSchema.optional(), _max: StoreMaxAggregateInputObjectSchema.optional(), _avg: StoreAvgAggregateInputObjectSchema.optional(), _sum: StoreSumAggregateInputObjectSchema.optional() }).strict();