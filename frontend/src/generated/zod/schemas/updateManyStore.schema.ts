import type { Prisma } from '@prisma/client';
import * as z from 'zod';
import { StoreUpdateManyMutationInputObjectSchema as StoreUpdateManyMutationInputObjectSchema } from './objects/StoreUpdateManyMutationInput.schema';
import { StoreWhereInputObjectSchema as StoreWhereInputObjectSchema } from './objects/StoreWhereInput.schema';

export const StoreUpdateManySchema: z.ZodType<Prisma.StoreUpdateManyArgs> = z.object({ data: StoreUpdateManyMutationInputObjectSchema, where: StoreWhereInputObjectSchema.optional() }).strict() as unknown as z.ZodType<Prisma.StoreUpdateManyArgs>;

export const StoreUpdateManyZodSchema = z.object({ data: StoreUpdateManyMutationInputObjectSchema, where: StoreWhereInputObjectSchema.optional() }).strict();