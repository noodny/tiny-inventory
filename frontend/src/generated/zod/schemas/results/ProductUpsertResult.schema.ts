import * as z from 'zod';
export const ProductUpsertResultSchema = z.object({
  id: z.number().int(),
  sku: z.string(),
  name: z.string(),
  category: z.string(),
  description: z.string().optional(),
  price: z.number(),
  isActive: z.boolean(),
  createdAt: z.date(),
  updatedAt: z.date(),
  inventory: z.array(z.unknown())
});