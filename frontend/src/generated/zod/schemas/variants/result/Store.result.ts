import * as z from 'zod';
// prettier-ignore
export const StoreResultSchema = z.object({
    id: z.number().int(),
    name: z.string(),
    isActive: z.boolean(),
    createdAt: z.date(),
    updatedAt: z.date(),
    inventory: z.array(z.unknown())
}).strict();

export type StoreResultType = z.infer<typeof StoreResultSchema>;
