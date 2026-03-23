import * as z from 'zod';
import type { Prisma } from '@prisma/client';
import { InventoryCreateManyStoreInputObjectSchema as InventoryCreateManyStoreInputObjectSchema } from './InventoryCreateManyStoreInput.schema'

const makeSchema = () => z.object({
  data: z.union([z.lazy(() => InventoryCreateManyStoreInputObjectSchema), z.lazy(() => InventoryCreateManyStoreInputObjectSchema).array()]),
  skipDuplicates: z.boolean().optional()
}).strict();
export const InventoryCreateManyStoreInputEnvelopeObjectSchema: z.ZodType<Prisma.InventoryCreateManyStoreInputEnvelope> = makeSchema() as unknown as z.ZodType<Prisma.InventoryCreateManyStoreInputEnvelope>;
export const InventoryCreateManyStoreInputEnvelopeObjectZodSchema = makeSchema();
