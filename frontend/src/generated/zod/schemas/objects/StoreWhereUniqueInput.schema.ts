import * as z from 'zod';
import type { Prisma } from '@prisma/client';


const makeSchema = () => z.object({
  id: z.number().int().optional()
}).strict();
export const StoreWhereUniqueInputObjectSchema: z.ZodType<Prisma.StoreWhereUniqueInput> = makeSchema() as unknown as z.ZodType<Prisma.StoreWhereUniqueInput>;
export const StoreWhereUniqueInputObjectZodSchema = makeSchema();
