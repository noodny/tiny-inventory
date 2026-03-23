import type { Prisma } from '@prisma/client';
import * as z from 'zod';
import { StoreUpdateInputObjectSchema as StoreUpdateInputObjectSchema } from './objects/StoreUpdateInput.schema';
import { StoreUncheckedUpdateInputObjectSchema as StoreUncheckedUpdateInputObjectSchema } from './objects/StoreUncheckedUpdateInput.schema';
import { StoreWhereUniqueInputObjectSchema as StoreWhereUniqueInputObjectSchema } from './objects/StoreWhereUniqueInput.schema';

export const StoreUpdateOneSchema: z.ZodType<Prisma.StoreUpdateArgs> = z.object({   data: z.union([StoreUpdateInputObjectSchema, StoreUncheckedUpdateInputObjectSchema]), where: StoreWhereUniqueInputObjectSchema }).strict() as unknown as z.ZodType<Prisma.StoreUpdateArgs>;

export const StoreUpdateOneZodSchema = z.object({   data: z.union([StoreUpdateInputObjectSchema, StoreUncheckedUpdateInputObjectSchema]), where: StoreWhereUniqueInputObjectSchema }).strict();