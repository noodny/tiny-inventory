import * as z from 'zod';
export const InventoryUpsertResultSchema = z.object({
  id: z.number().int(),
  storeId: z.number().int(),
  productId: z.number().int(),
  quantity: z.number().int(),
  createdAt: z.date(),
  updatedAt: z.date(),
  store: z.unknown(),
  product: z.unknown()
});