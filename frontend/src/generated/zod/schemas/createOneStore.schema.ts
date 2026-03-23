import type { Prisma } from '@prisma/client';
import * as z from 'zod';
import { StoreCreateInputObjectSchema as StoreCreateInputObjectSchema } from './objects/StoreCreateInput.schema';
import { StoreUncheckedCreateInputObjectSchema as StoreUncheckedCreateInputObjectSchema } from './objects/StoreUncheckedCreateInput.schema';

export const StoreCreateOneSchema: z.ZodType<Prisma.StoreCreateArgs> = z.object({   data: z.union([StoreCreateInputObjectSchema, StoreUncheckedCreateInputObjectSchema]) }).strict() as unknown as z.ZodType<Prisma.StoreCreateArgs>;

export const StoreCreateOneZodSchema = z.object({   data: z.union([StoreCreateInputObjectSchema, StoreUncheckedCreateInputObjectSchema]) }).strict();