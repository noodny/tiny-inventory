import * as z from 'zod';
export const StoreUpdateResultSchema = z.nullable(z.object({
  id: z.number().int(),
  name: z.string(),
  isActive: z.boolean(),
  createdAt: z.date(),
  updatedAt: z.date(),
  inventory: z.array(z.unknown())
}));