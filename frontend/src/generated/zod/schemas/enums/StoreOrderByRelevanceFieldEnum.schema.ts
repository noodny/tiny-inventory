import * as z from 'zod';

export const StoreOrderByRelevanceFieldEnumSchema = z.enum(['name'])

export type StoreOrderByRelevanceFieldEnum = z.infer<typeof StoreOrderByRelevanceFieldEnumSchema>;