import { z } from 'zod/v4';

// ---------------------------------------------------------------------------
// Store
// ---------------------------------------------------------------------------

export const StoreSchema = z.object({
  id: z.number().int(),
  name: z.string(),
  isActive: z.boolean(),
  createdAt: z.string().datetime({ offset: true }),
  updatedAt: z.string().datetime({ offset: true }),
});

export const CreateStoreSchema = z.object({
  name: z.string().min(1).max(255),
});

export const UpdateStoreSchema = z
  .object({
    name: z.string().min(1).max(255),
    isActive: z.boolean(),
  })
  .partial();

export const StoreListQuerySchema = z.object({
  page: z.coerce.number().int().min(1).default(1),
  pageSize: z.coerce.number().int().min(1).max(100).default(20),
  sort: z.string().optional(),
  isActive: z
    .union([z.boolean(), z.string().transform((v) => v === 'true')])
    .optional(),
});

// ---------------------------------------------------------------------------
// Product
// ---------------------------------------------------------------------------

export const ProductSchema = z.object({
  id: z.number().int(),
  sku: z.string(),
  name: z.string(),
  category: z.string(),
  description: z.string().nullable(),
  price: z.string(), // Decimal serialized as string in JSON
  isActive: z.boolean(),
  createdAt: z.string().datetime({ offset: true }),
  updatedAt: z.string().datetime({ offset: true }),
});

export const CreateProductSchema = z.object({
  sku: z.string().min(1).max(100),
  name: z.string().min(1).max(255),
  category: z.string().min(1).max(255),
  description: z.string().max(1000).nullable().optional(),
  price: z.number().min(0),
});

export const UpdateProductSchema = z
  .object({
    sku: z.string().min(1).max(100),
    name: z.string().min(1).max(255),
    category: z.string().min(1).max(255),
    description: z.string().max(1000).nullable(),
    price: z.number().min(0),
    isActive: z.boolean(),
  })
  .partial();

export const ProductListQuerySchema = z.object({
  page: z.coerce.number().int().min(1).default(1),
  pageSize: z.coerce.number().int().min(1).max(100).default(20),
  sort: z.string().optional(),
  category: z.string().optional(),
  minPrice: z.coerce.number().min(0).optional(),
  maxPrice: z.coerce.number().min(0).optional(),
  isActive: z
    .union([z.boolean(), z.string().transform((v) => v === 'true')])
    .optional(),
});

// ---------------------------------------------------------------------------
// Inventory
// ---------------------------------------------------------------------------

export const InventorySchema = z.object({
  id: z.number().int(),
  storeId: z.number().int(),
  productId: z.number().int(),
  quantity: z.number().int(),
  createdAt: z.string().datetime({ offset: true }),
  updatedAt: z.string().datetime({ offset: true }),
});

export const CreateInventorySchema = z.object({
  storeId: z.number().int(),
  productId: z.number().int(),
  quantity: z.number().int().min(0).default(0),
});

export const UpdateInventorySchema = z.object({
  quantity: z.number().int().min(0),
});

export const InventoryListQuerySchema = z.object({
  page: z.coerce.number().int().min(1).default(1),
  pageSize: z.coerce.number().int().min(1).max(100).default(20),
  sort: z.string().optional(),
  storeId: z.coerce.number().int().optional(),
  category: z.string().optional(),
  minPrice: z.coerce.number().min(0).optional(),
  maxPrice: z.coerce.number().min(0).optional(),
  stockLevel: z.enum(['in_stock', 'out_of_stock', 'low_stock']).optional(),
});

// ---------------------------------------------------------------------------
// Pagination envelope
// ---------------------------------------------------------------------------

export const PaginationMetaSchema = z.object({
  page: z.number().int(),
  pageSize: z.number().int(),
  total: z.number().int(),
  totalPages: z.number().int(),
});

export function paginatedSchema<T extends z.ZodType>(itemSchema: T) {
  return z.object({
    data: z.array(itemSchema),
    meta: PaginationMetaSchema,
  });
}

// ---------------------------------------------------------------------------
// Error envelope
// ---------------------------------------------------------------------------

export const ErrorSchema = z.object({
  code: z.string(),
  message: z.string(),
  details: z.unknown().optional(),
});

// ---------------------------------------------------------------------------
// Param schemas
// ---------------------------------------------------------------------------

export const IdParamSchema = z.object({
  id: z.coerce.number().int(),
});

export const StoreIdParamSchema = z.object({
  storeId: z.coerce.number().int(),
});

// ---------------------------------------------------------------------------
// Inferred types
// ---------------------------------------------------------------------------

export type Store = z.infer<typeof StoreSchema>;
export type CreateStore = z.infer<typeof CreateStoreSchema>;
export type UpdateStore = z.input<typeof UpdateStoreSchema>;

export type Product = z.infer<typeof ProductSchema>;
export type CreateProduct = z.infer<typeof CreateProductSchema>;
export type UpdateProduct = z.input<typeof UpdateProductSchema>;

export type ProductListQuery = z.infer<typeof ProductListQuerySchema>;
export type StoreListQuery = z.infer<typeof StoreListQuerySchema>;
export type InventoryListQuery = z.infer<typeof InventoryListQuerySchema>;

export type Inventory = z.infer<typeof InventorySchema>;
export type CreateInventory = z.infer<typeof CreateInventorySchema>;
export type UpdateInventory = z.infer<typeof UpdateInventorySchema>;

export type PaginationMeta = z.infer<typeof PaginationMetaSchema>;
export type PaginatedResult<T> = { data: T[]; meta: PaginationMeta };
export type AppError = z.infer<typeof ErrorSchema>;
