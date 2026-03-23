import * as z from 'zod';
import type { Prisma } from '@prisma/client';
import { StoreOrderByRelevanceFieldEnumSchema } from '../enums/StoreOrderByRelevanceFieldEnum.schema';
import { SortOrderSchema } from '../enums/SortOrder.schema'

const makeSchema = () => z.object({
  fields: z.union([StoreOrderByRelevanceFieldEnumSchema, StoreOrderByRelevanceFieldEnumSchema.array()]),
  sort: SortOrderSchema,
  search: z.string()
}).strict();
export const StoreOrderByRelevanceInputObjectSchema: z.ZodType<Prisma.StoreOrderByRelevanceInput> = makeSchema() as unknown as z.ZodType<Prisma.StoreOrderByRelevanceInput>;
export const StoreOrderByRelevanceInputObjectZodSchema = makeSchema();
