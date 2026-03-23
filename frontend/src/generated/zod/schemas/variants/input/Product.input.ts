import * as z from 'zod';
// prettier-ignore
export const ProductInputSchema = z.object({
    id: z.number().int(),
    sku: z.string(),
    name: z.string(),
    category: z.string(),
    description: z.string().optional().nullable(),
    price: z.number(),
    isActive: z.boolean(),
    createdAt: z.date(),
    updatedAt: z.date(),
    inventory: z.array(z.unknown())
}).strict();

export type ProductInputType = z.infer<typeof ProductInputSchema>;
