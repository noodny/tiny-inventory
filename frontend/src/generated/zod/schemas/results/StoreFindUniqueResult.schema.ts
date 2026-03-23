import * as z from 'zod';
export const StoreFindUniqueResultSchema = z.nullable(z.object({
  id: z.number().int(),
  name: z.string(),
  isActive: z.boolean(),
  createdAt: z.date(),
  updatedAt: z.date(),
  inventory: z.array(z.unknown())
}));