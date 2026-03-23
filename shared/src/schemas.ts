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

  isActive: z.boolean().optional(),
});

// ---------------------------------------------------------------------------
// Product categories
// ---------------------------------------------------------------------------

export const PRODUCT_CATEGORIES = [
  'Peripherals',
  'Furniture',
  'Accessories',
  'Electronics',
  'Software',
  'Networking',
  'Storage',
] as const;

export const ProductCategorySchema = z.enum(PRODUCT_CATEGORIES);

export type ProductCategory = z.infer<typeof ProductCategorySchema>;

// ---------------------------------------------------------------------------
// Product
// ---------------------------------------------------------------------------

export const ProductSchema = z.object({
  id: z.number().int(),
  sku: z.string(),
  name: z.string(),
  category: ProductCategorySchema,
  description: z.string().nullable(),
  price: z.string(), // Decimal serialized as string in JSON
  isActive: z.boolean(),
  createdAt: z.string().datetime({ offset: true }),
  updatedAt: z.string().datetime({ offset: true }),
});

export const CreateProductSchema = z.object({
  sku: z.string().min(1).max(100),
  name: z.string().min(1).max(255),
  category: ProductCategorySchema,
  description: z.string().max(1000).nullable().optional(),
  price: z.number().min(0),
});

export const UpdateProductSchema = z
  .object({
    sku: z.string().min(1).max(100),
    name: z.string().min(1).max(255),
    category: ProductCategorySchema,
    description: z.string().max(1000).nullable(),
    price: z.number().min(0),
    isActive: z.boolean(),
  })
  .partial();

export const ProductListQuerySchema = z.object({
  page: z.coerce.number().int().min(1).default(1),
  pageSize: z.coerce.number().int().min(1).max(100).default(20),

  category: ProductCategorySchema.optional(),
  minPrice: z.coerce.number().min(0).optional(),
  maxPrice: z.coerce.number().min(0).optional(),
  isActive: z.boolean().optional(),
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

export const InventoryWithRelationsSchema = InventorySchema.extend({
  store: StoreSchema,
  product: ProductSchema,
});

export const CreateInventorySchema = z.object({
  storeId: z.number().int(),
  productId: z.number().int(),
  quantity: z.number().int().min(0).default(0),
});

export const UpdateInventorySchema = z.object({
  quantity: z.number().int().min(0),
});

// ---------------------------------------------------------------------------
// Inventory Batch Import
// ---------------------------------------------------------------------------

export const InventoryBatchItemSchema = z.object({
  storeName: z.string().min(1, 'Store name is required'),
  sku: z.string().min(1, 'SKU is required'),
  quantity: z.number().int('Quantity must be an integer').min(0, 'Quantity must be >= 0'),
});

export const InventoryBatchRequestSchema = z.object({
  items: z.array(InventoryBatchItemSchema).min(1, 'At least one item is required').max(1000, 'Maximum 1000 items per batch'),
});

export const InventoryBatchResultItemSchema = z.object({
  row: z.number().int(),
  storeName: z.string(),
  sku: z.string(),
  quantity: z.number().int(),
  status: z.enum(['created', 'updated']),
});

export const InventoryBatchErrorItemSchema = z.object({
  row: z.number().int(),
  storeName: z.string(),
  sku: z.string(),
  error: z.string(),
});

export const InventoryBatchResponseSchema = z.object({
  success: z.boolean(),
  created: z.number().int(),
  updated: z.number().int(),
  errors: z.array(InventoryBatchErrorItemSchema),
  results: z.array(InventoryBatchResultItemSchema),
});

export const InventoryListQuerySchema = z.object({
  page: z.coerce.number().int().min(1).default(1),
  pageSize: z.coerce.number().int().min(1).max(100).default(20),

  storeId: z.coerce.number().int().optional(),
  category: ProductCategorySchema.optional(),
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
export type InventoryWithRelations = z.infer<typeof InventoryWithRelationsSchema>;
export type CreateInventory = z.infer<typeof CreateInventorySchema>;
export type UpdateInventory = z.infer<typeof UpdateInventorySchema>;

export type InventoryBatchItem = z.infer<typeof InventoryBatchItemSchema>;
export type InventoryBatchRequest = z.infer<typeof InventoryBatchRequestSchema>;
export type InventoryBatchResultItem = z.infer<typeof InventoryBatchResultItemSchema>;
export type InventoryBatchErrorItem = z.infer<typeof InventoryBatchErrorItemSchema>;
export type InventoryBatchResponse = z.infer<typeof InventoryBatchResponseSchema>;

export type PaginationMeta = z.infer<typeof PaginationMetaSchema>;
export type PaginatedResult<T> = { data: T[]; meta: PaginationMeta };
export type AppError = z.infer<typeof ErrorSchema>;
