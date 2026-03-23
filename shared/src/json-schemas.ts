import { z, toJSONSchema } from 'zod/v4';
import {
  StoreSchema,
  CreateStoreSchema,
  UpdateStoreSchema,
  StoreListQuerySchema,
  ProductSchema,
  CreateProductSchema,
  UpdateProductSchema,
  ProductListQuerySchema,
  InventorySchema,
  InventoryWithRelationsSchema,
  CreateInventorySchema,
  UpdateInventorySchema,
  InventoryListQuerySchema,
  InventoryBatchRequestSchema,
  InventoryBatchResponseSchema,
  PaginationMetaSchema,
  ErrorSchema,
  IdParamSchema,
  StoreIdParamSchema,
} from './schemas';

// eslint-disable-next-line @typescript-eslint/no-explicit-any
function toJS(schema: z.ZodType<any>): Record<string, unknown> {
  const raw = toJSONSchema(schema as never) as Record<string, unknown>;
  // Strip $schema — Fastify's AJV doesn't recognise it as a valid ref
  delete raw.$schema;
  return raw;
}

// Store
export const storeResponse = toJS(StoreSchema);
export const storeCreateBody = toJS(CreateStoreSchema);
export const storeUpdateBody = toJS(UpdateStoreSchema);
export const storeListQuery = toJS(StoreListQuerySchema);

// Product
export const productResponse = toJS(ProductSchema);
export const productCreateBody = toJS(CreateProductSchema);
export const productUpdateBody = toJS(UpdateProductSchema);
export const productListQuery = toJS(ProductListQuerySchema);

// Inventory
export const inventoryResponse = toJS(InventorySchema);
export const inventoryWithRelationsResponse = toJS(InventoryWithRelationsSchema);
export const inventoryCreateBody = toJS(CreateInventorySchema);
export const inventoryUpdateBody = toJS(UpdateInventorySchema);
export const inventoryListQuery = toJS(InventoryListQuerySchema);
export const inventoryBatchBody = toJS(InventoryBatchRequestSchema);
export const inventoryBatchResponse = toJS(InventoryBatchResponseSchema);

// Common
export const errorSchema = toJS(ErrorSchema);
export const idParamSchema = toJS(IdParamSchema);
export const storeIdParamSchema = toJS(StoreIdParamSchema);
export const paginationMeta = toJS(PaginationMetaSchema);

export function paginatedResponse(itemSchema: Record<string, unknown>) {
  return {
    type: 'object' as const,
    properties: {
      data: { type: 'array' as const, items: itemSchema },
      meta: paginationMeta,
    },
    required: ['data', 'meta'],
  };
}
