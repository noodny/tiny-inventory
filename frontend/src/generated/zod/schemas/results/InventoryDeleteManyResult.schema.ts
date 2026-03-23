import * as z from 'zod';
export const InventoryDeleteManyResultSchema = z.object({
  count: z.number()
});