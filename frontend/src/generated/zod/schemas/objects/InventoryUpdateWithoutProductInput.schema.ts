import * as z from 'zod';
import type { Prisma } from '@prisma/client';
import { IntFieldUpdateOperationsInputObjectSchema as IntFieldUpdateOperationsInputObjectSchema } from './IntFieldUpdateOperationsInput.schema';
import { DateTimeFieldUpdateOperationsInputObjectSchema as DateTimeFieldUpdateOperationsInputObjectSchema } from './DateTimeFieldUpdateOperationsInput.schema';
import { StoreUpdateOneRequiredWithoutInventoryNestedInputObjectSchema as StoreUpdateOneRequiredWithoutInventoryNestedInputObjectSchema } from './StoreUpdateOneRequiredWithoutInventoryNestedInput.schema'

const makeSchema = () => z.object({
  quantity: z.union([z.number().int(), z.lazy(() => IntFieldUpdateOperationsInputObjectSchema)]).optional(),
  createdAt: z.union([z.coerce.date(), z.lazy(() => DateTimeFieldUpdateOperationsInputObjectSchema)]).optional(),
  updatedAt: z.union([z.coerce.date(), z.lazy(() => DateTimeFieldUpdateOperationsInputObjectSchema)]).optional(),
  store: z.lazy(() => StoreUpdateOneRequiredWithoutInventoryNestedInputObjectSchema).optional()
}).strict();
export const InventoryUpdateWithoutProductInputObjectSchema: z.ZodType<Prisma.InventoryUpdateWithoutProductInput> = makeSchema() as unknown as z.ZodType<Prisma.InventoryUpdateWithoutProductInput>;
export const InventoryUpdateWithoutProductInputObjectZodSchema = makeSchema();
