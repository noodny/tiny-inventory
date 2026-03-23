import * as z from 'zod';
// prettier-ignore
export const ProductModelSchema = z.object({
    id: z.number().int(),
    sku: z.string(),
    name: z.string(),
    category: z.string(),
    description: z.string().nullable(),
    price: z.number(),
    isActive: z.boolean(),
    createdAt: z.date(),
    updatedAt: z.date(),
    inventory: z.array(z.unknown())
}).strict();

export type ProductPureType = z.infer<typeof ProductModelSchema>;
