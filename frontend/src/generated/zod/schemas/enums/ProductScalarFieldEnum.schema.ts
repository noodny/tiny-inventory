import * as z from 'zod';

export const ProductScalarFieldEnumSchema = z.enum(['id', 'sku', 'name', 'category', 'description', 'price', 'isActive', 'createdAt', 'updatedAt'])

export type ProductScalarFieldEnum = z.infer<typeof ProductScalarFieldEnumSchema>;