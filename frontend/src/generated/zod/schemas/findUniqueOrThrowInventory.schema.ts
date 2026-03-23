import type { Prisma } from '@prisma/client';
import * as z from 'zod';
import { InventoryWhereUniqueInputObjectSchema as InventoryWhereUniqueInputObjectSchema } from './objects/InventoryWhereUniqueInput.schema';

export const InventoryFindUniqueOrThrowSchema: z.ZodType<Prisma.InventoryFindUniqueOrThrowArgs> = z.object({   where: InventoryWhereUniqueInputObjectSchema }).strict() as unknown as z.ZodType<Prisma.InventoryFindUniqueOrThrowArgs>;

export const InventoryFindUniqueOrThrowZodSchema = z.object({   where: InventoryWhereUniqueInputObjectSchema }).strict();