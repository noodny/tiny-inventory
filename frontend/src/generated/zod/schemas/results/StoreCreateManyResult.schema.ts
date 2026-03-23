import * as z from 'zod';
export const StoreCreateManyResultSchema = z.object({
  count: z.number()
});