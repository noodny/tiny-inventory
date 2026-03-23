import * as z from 'zod';
import type { Prisma } from '@prisma/client';
import { InventoryCreateManyProductInputObjectSchema as InventoryCreateManyProductInputObjectSchema } from './InventoryCreateManyProductInput.schema'

const makeSchema = () => z.object({
  data: z.union([z.lazy(() => InventoryCreateManyProductInputObjectSchema), z.lazy(() => InventoryCreateManyProductInputObjectSchema).array()]),
  skipDuplicates: z.boolean().optional()
}).strict();
export const InventoryCreateManyProductInputEnvelopeObjectSchema: z.ZodType<Prisma.InventoryCreateManyProductInputEnvelope> = makeSchema() as unknown as z.ZodType<Prisma.InventoryCreateManyProductInputEnvelope>;
export const InventoryCreateManyProductInputEnvelopeObjectZodSchema = makeSchema();
