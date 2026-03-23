import * as z from 'zod';

export const InventoryScalarFieldEnumSchema = z.enum(['id', 'storeId', 'productId', 'quantity', 'createdAt', 'updatedAt'])

export type InventoryScalarFieldEnum = z.infer<typeof InventoryScalarFieldEnumSchema>;