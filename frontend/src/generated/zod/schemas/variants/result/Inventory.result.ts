import * as z from 'zod';
// prettier-ignore
export const InventoryResultSchema = z.object({
    id: z.number().int(),
    storeId: z.number().int(),
    productId: z.number().int(),
    quantity: z.number().int(),
    createdAt: z.date(),
    updatedAt: z.date(),
    store: z.unknown(),
    product: z.unknown()
}).strict();

export type InventoryResultType = z.infer<typeof InventoryResultSchema>;
