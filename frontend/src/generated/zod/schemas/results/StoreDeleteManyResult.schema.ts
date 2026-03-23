import * as z from 'zod';
export const StoreDeleteManyResultSchema = z.object({
  count: z.number()
});