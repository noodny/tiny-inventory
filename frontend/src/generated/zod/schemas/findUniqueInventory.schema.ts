import type { Prisma } from '@prisma/client';
import * as z from 'zod';
import { InventoryWhereUniqueInputObjectSchema as InventoryWhereUniqueInputObjectSchema } from './objects/InventoryWhereUniqueInput.schema';

export const InventoryFindUniqueSchema: z.ZodType<Prisma.InventoryFindUniqueArgs> = z.object({   where: InventoryWhereUniqueInputObjectSchema }).strict() as unknown as z.ZodType<Prisma.InventoryFindUniqueArgs>;

export const InventoryFindUniqueZodSchema = z.object({   where: InventoryWhereUniqueInputObjectSchema }).strict();