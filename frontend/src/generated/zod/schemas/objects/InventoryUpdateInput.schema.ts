import * as z from 'zod';
import type { Prisma } from '@prisma/client';
import { IntFieldUpdateOperationsInputObjectSchema as IntFieldUpdateOperationsInputObjectSchema } from './IntFieldUpdateOperationsInput.schema';
import { DateTimeFieldUpdateOperationsInputObjectSchema as DateTimeFieldUpdateOperationsInputObjectSchema } from './DateTimeFieldUpdateOperationsInput.schema';
import { StoreUpdateOneRequiredWithoutInventoryNestedInputObjectSchema as StoreUpdateOneRequiredWithoutInventoryNestedInputObjectSchema } from './StoreUpdateOneRequiredWithoutInventoryNestedInput.schema';
import { ProductUpdateOneRequiredWithoutInventoryNestedInputObjectSchema as ProductUpdateOneRequiredWithoutInventoryNestedInputObjectSchema } from './ProductUpdateOneRequiredWithoutInventoryNestedInput.schema'

const makeSchema = () => z.object({
  quantity: z.union([z.number().int(), z.lazy(() => IntFieldUpdateOperationsInputObjectSchema)]).optional(),
  createdAt: z.union([z.coerce.date(), z.lazy(() => DateTimeFieldUpdateOperationsInputObjectSchema)]).optional(),
  updatedAt: z.union([z.coerce.date(), z.lazy(() => DateTimeFieldUpdateOperationsInputObjectSchema)]).optional(),
  store: z.lazy(() => StoreUpdateOneRequiredWithoutInventoryNestedInputObjectSchema).optional(),
  product: z.lazy(() => ProductUpdateOneRequiredWithoutInventoryNestedInputObjectSchema).optional()
}).strict();
export const InventoryUpdateInputObjectSchema: z.ZodType<Prisma.InventoryUpdateInput> = makeSchema() as unknown as z.ZodType<Prisma.InventoryUpdateInput>;
export const InventoryUpdateInputObjectZodSchema = makeSchema();
