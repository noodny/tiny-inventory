import * as z from 'zod';
export const InventoryCreateManyResultSchema = z.object({
  count: z.number()
});