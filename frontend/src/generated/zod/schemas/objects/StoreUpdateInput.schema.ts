import * as z from 'zod';
import type { Prisma } from '@prisma/client';
import { StringFieldUpdateOperationsInputObjectSchema as StringFieldUpdateOperationsInputObjectSchema } from './StringFieldUpdateOperationsInput.schema';
import { BoolFieldUpdateOperationsInputObjectSchema as BoolFieldUpdateOperationsInputObjectSchema } from './BoolFieldUpdateOperationsInput.schema';
import { DateTimeFieldUpdateOperationsInputObjectSchema as DateTimeFieldUpdateOperationsInputObjectSchema } from './DateTimeFieldUpdateOperationsInput.schema';
import { InventoryUpdateManyWithoutStoreNestedInputObjectSchema as InventoryUpdateManyWithoutStoreNestedInputObjectSchema } from './InventoryUpdateManyWithoutStoreNestedInput.schema'

const makeSchema = () => z.object({
  name: z.union([z.string().max(255), z.lazy(() => StringFieldUpdateOperationsInputObjectSchema)]).optional(),
  isActive: z.union([z.boolean(), z.lazy(() => BoolFieldUpdateOperationsInputObjectSchema)]).optional(),
  createdAt: z.union([z.coerce.date(), z.lazy(() => DateTimeFieldUpdateOperationsInputObjectSchema)]).optional(),
  updatedAt: z.union([z.coerce.date(), z.lazy(() => DateTimeFieldUpdateOperationsInputObjectSchema)]).optional(),
  inventory: z.lazy(() => InventoryUpdateManyWithoutStoreNestedInputObjectSchema).optional()
}).strict();
export const StoreUpdateInputObjectSchema: z.ZodType<Prisma.StoreUpdateInput> = makeSchema() as unknown as z.ZodType<Prisma.StoreUpdateInput>;
export const StoreUpdateInputObjectZodSchema = makeSchema();
