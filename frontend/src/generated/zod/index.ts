// AUTO-GENERATED from Prisma JSON Schema — do not edit manually.
// Regenerate with: npm run generate:contracts
import { z } from 'zod';

export const StoreSchema = z.object({
  id: z.number().int(),
  name: z.string(),
  isActive: z.boolean(),
  createdAt: z.string().datetime({ offset: true }),
  updatedAt: z.string().datetime({ offset: true }),
});

export type Store = z.infer<typeof StoreSchema>;

export const CreateStoreSchema = z.object({
  name: z.string(),
  isActive: z.boolean().optional(),
});

export type CreateStore = z.infer<typeof CreateStoreSchema>;

export const UpdateStoreSchema = CreateStoreSchema.partial();

export type UpdateStore = z.infer<typeof UpdateStoreSchema>;

export const ProductSchema = z.object({
  id: z.number().int(),
  sku: z.string(),
  name: z.string(),
  category: z.string(),
  description: z.string().nullable(),
  price: z.string(),
  isActive: z.boolean(),
  createdAt: z.string().datetime({ offset: true }),
  updatedAt: z.string().datetime({ offset: true }),
});

export type Product = z.infer<typeof ProductSchema>;

export const CreateProductSchema = z.object({
  sku: z.string(),
  name: z.string(),
  category: z.string(),
  description: z.string().nullable().optional(),
  price: z.string(),
  isActive: z.boolean().optional(),
});

export type CreateProduct = z.infer<typeof CreateProductSchema>;

export const UpdateProductSchema = CreateProductSchema.partial();

export type UpdateProduct = z.infer<typeof UpdateProductSchema>;

export const InventorySchema = z.object({
  id: z.number().int(),
  storeId: z.number().int(),
  productId: z.number().int(),
  quantity: z.number().int(),
  createdAt: z.string().datetime({ offset: true }),
  updatedAt: z.string().datetime({ offset: true }),
});

export type Inventory = z.infer<typeof InventorySchema>;

export const CreateInventorySchema = z.object({
  storeId: z.number().int(),
  productId: z.number().int(),
  quantity: z.number().int().optional(),
});

export type CreateInventory = z.infer<typeof CreateInventorySchema>;

export const UpdateInventorySchema = CreateInventorySchema.partial();

export type UpdateInventory = z.infer<typeof UpdateInventorySchema>;
