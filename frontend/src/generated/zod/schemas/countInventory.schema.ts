import type { Prisma } from '@prisma/client';
import * as z from 'zod';
import { InventoryOrderByWithRelationInputObjectSchema as InventoryOrderByWithRelationInputObjectSchema } from './objects/InventoryOrderByWithRelationInput.schema';
import { InventoryWhereInputObjectSchema as InventoryWhereInputObjectSchema } from './objects/InventoryWhereInput.schema';
import { InventoryWhereUniqueInputObjectSchema as InventoryWhereUniqueInputObjectSchema } from './objects/InventoryWhereUniqueInput.schema';
import { InventoryCountAggregateInputObjectSchema as InventoryCountAggregateInputObjectSchema } from './objects/InventoryCountAggregateInput.schema';

export const InventoryCountSchema: z.ZodType<Prisma.InventoryCountArgs> = z.object({ orderBy: z.union([InventoryOrderByWithRelationInputObjectSchema, InventoryOrderByWithRelationInputObjectSchema.array()]).optional(), where: InventoryWhereInputObjectSchema.optional(), cursor: InventoryWhereUniqueInputObjectSchema.optional(), take: z.number().optional(), skip: z.number().optional(), select: z.union([ z.literal(true), InventoryCountAggregateInputObjectSchema ]).optional() }).strict() as unknown as z.ZodType<Prisma.InventoryCountArgs>;

export const InventoryCountZodSchema = z.object({ orderBy: z.union([InventoryOrderByWithRelationInputObjectSchema, InventoryOrderByWithRelationInputObjectSchema.array()]).optional(), where: InventoryWhereInputObjectSchema.optional(), cursor: InventoryWhereUniqueInputObjectSchema.optional(), take: z.number().optional(), skip: z.number().optional(), select: z.union([ z.literal(true), InventoryCountAggregateInputObjectSchema ]).optional() }).strict();