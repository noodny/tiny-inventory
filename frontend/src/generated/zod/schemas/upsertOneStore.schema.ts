import type { Prisma } from '@prisma/client';
import * as z from 'zod';
import { StoreWhereUniqueInputObjectSchema as StoreWhereUniqueInputObjectSchema } from './objects/StoreWhereUniqueInput.schema';
import { StoreCreateInputObjectSchema as StoreCreateInputObjectSchema } from './objects/StoreCreateInput.schema';
import { StoreUncheckedCreateInputObjectSchema as StoreUncheckedCreateInputObjectSchema } from './objects/StoreUncheckedCreateInput.schema';
import { StoreUpdateInputObjectSchema as StoreUpdateInputObjectSchema } from './objects/StoreUpdateInput.schema';
import { StoreUncheckedUpdateInputObjectSchema as StoreUncheckedUpdateInputObjectSchema } from './objects/StoreUncheckedUpdateInput.schema';

export const StoreUpsertOneSchema: z.ZodType<Prisma.StoreUpsertArgs> = z.object({   where: StoreWhereUniqueInputObjectSchema, create: z.union([ StoreCreateInputObjectSchema, StoreUncheckedCreateInputObjectSchema ]), update: z.union([ StoreUpdateInputObjectSchema, StoreUncheckedUpdateInputObjectSchema ]) }).strict() as unknown as z.ZodType<Prisma.StoreUpsertArgs>;

export const StoreUpsertOneZodSchema = z.object({   where: StoreWhereUniqueInputObjectSchema, create: z.union([ StoreCreateInputObjectSchema, StoreUncheckedCreateInputObjectSchema ]), update: z.union([ StoreUpdateInputObjectSchema, StoreUncheckedUpdateInputObjectSchema ]) }).strict();