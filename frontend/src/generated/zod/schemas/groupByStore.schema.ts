import type { Prisma } from '@prisma/client';
import * as z from 'zod';
import { StoreWhereInputObjectSchema as StoreWhereInputObjectSchema } from './objects/StoreWhereInput.schema';
import { StoreOrderByWithAggregationInputObjectSchema as StoreOrderByWithAggregationInputObjectSchema } from './objects/StoreOrderByWithAggregationInput.schema';
import { StoreScalarWhereWithAggregatesInputObjectSchema as StoreScalarWhereWithAggregatesInputObjectSchema } from './objects/StoreScalarWhereWithAggregatesInput.schema';
import { StoreScalarFieldEnumSchema } from './enums/StoreScalarFieldEnum.schema';
import { StoreCountAggregateInputObjectSchema as StoreCountAggregateInputObjectSchema } from './objects/StoreCountAggregateInput.schema';
import { StoreMinAggregateInputObjectSchema as StoreMinAggregateInputObjectSchema } from './objects/StoreMinAggregateInput.schema';
import { StoreMaxAggregateInputObjectSchema as StoreMaxAggregateInputObjectSchema } from './objects/StoreMaxAggregateInput.schema';
import { StoreAvgAggregateInputObjectSchema as StoreAvgAggregateInputObjectSchema } from './objects/StoreAvgAggregateInput.schema';
import { StoreSumAggregateInputObjectSchema as StoreSumAggregateInputObjectSchema } from './objects/StoreSumAggregateInput.schema';

export const StoreGroupBySchema: z.ZodType<Prisma.StoreGroupByArgs> = z.object({ where: StoreWhereInputObjectSchema.optional(), orderBy: z.union([StoreOrderByWithAggregationInputObjectSchema, StoreOrderByWithAggregationInputObjectSchema.array()]).optional(), having: StoreScalarWhereWithAggregatesInputObjectSchema.optional(), take: z.number().optional(), skip: z.number().optional(), by: z.array(StoreScalarFieldEnumSchema), _count: z.union([ z.literal(true), StoreCountAggregateInputObjectSchema ]).optional(), _min: StoreMinAggregateInputObjectSchema.optional(), _max: StoreMaxAggregateInputObjectSchema.optional(), _avg: StoreAvgAggregateInputObjectSchema.optional(), _sum: StoreSumAggregateInputObjectSchema.optional() }).strict() as unknown as z.ZodType<Prisma.StoreGroupByArgs>;

export const StoreGroupByZodSchema = z.object({ where: StoreWhereInputObjectSchema.optional(), orderBy: z.union([StoreOrderByWithAggregationInputObjectSchema, StoreOrderByWithAggregationInputObjectSchema.array()]).optional(), having: StoreScalarWhereWithAggregatesInputObjectSchema.optional(), take: z.number().optional(), skip: z.number().optional(), by: z.array(StoreScalarFieldEnumSchema), _count: z.union([ z.literal(true), StoreCountAggregateInputObjectSchema ]).optional(), _min: StoreMinAggregateInputObjectSchema.optional(), _max: StoreMaxAggregateInputObjectSchema.optional(), _avg: StoreAvgAggregateInputObjectSchema.optional(), _sum: StoreSumAggregateInputObjectSchema.optional() }).strict();