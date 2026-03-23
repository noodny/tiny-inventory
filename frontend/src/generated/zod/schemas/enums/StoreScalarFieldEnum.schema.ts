import * as z from 'zod';

export const StoreScalarFieldEnumSchema = z.enum(['id', 'name', 'isActive', 'createdAt', 'updatedAt'])

export type StoreScalarFieldEnum = z.infer<typeof StoreScalarFieldEnumSchema>;