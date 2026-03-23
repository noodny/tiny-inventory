import * as z from 'zod';
// prettier-ignore
export const StoreModelSchema = z.object({
    id: z.number().int(),
    name: z.string(),
    isActive: z.boolean(),
    createdAt: z.date(),
    updatedAt: z.date(),
    inventory: z.array(z.unknown())
}).strict();

export type StorePureType = z.infer<typeof StoreModelSchema>;
