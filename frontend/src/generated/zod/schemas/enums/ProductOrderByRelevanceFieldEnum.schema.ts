import * as z from 'zod';

export const ProductOrderByRelevanceFieldEnumSchema = z.enum(['sku', 'name', 'category', 'description'])

export type ProductOrderByRelevanceFieldEnum = z.infer<typeof ProductOrderByRelevanceFieldEnumSchema>;