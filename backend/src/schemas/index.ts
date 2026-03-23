/**
 * Route-level JSON Schemas derived from the Prisma-generated JSON Schema.
 *
 * These schemas are consumed by Fastify route definitions for
 * params, query, body, and response validation.
 */
import jsonSchema from '../generated/json-schema/json-schema.json';

type JsonSchemaObject = Record<string, unknown>;

const defs = jsonSchema.definitions;

// ---------------------------------------------------------------------------
// Helpers
// ---------------------------------------------------------------------------

/** Strip relation fields ($ref, array-of-$ref) and lifecycle auto-fields from a model definition. */
function pickDataFields(
  model: (typeof defs)[keyof typeof defs],
  omit: string[] = [],
): Record<string, unknown> {
  const omitSet = new Set(omit);
  const props: Record<string, unknown> = {};
  for (const [key, val] of Object.entries(model.properties)) {
    if (omitSet.has(key)) continue;
    const v = val as JsonSchemaObject;
    if (v.$ref || (v.type === 'array' && (v.items as JsonSchemaObject)?.$ref)) continue;
    props[key] = val;
  }
  return props;
}

/** Build a response schema for a single model (all data fields, no relations). */
function responseSchema(model: (typeof defs)[keyof typeof defs], omit: string[] = []) {
  return {
    type: 'object' as const,
    properties: pickDataFields(model, omit),
  };
}

// ---------------------------------------------------------------------------
// Common schemas
// ---------------------------------------------------------------------------

export const errorSchema = {
  type: 'object' as const,
  required: ['code', 'message'],
  properties: {
    code: { type: 'string' as const },
    message: { type: 'string' as const },
    details: {},
  },
};

export const paginationQuerySchema = {
  type: 'object' as const,
  properties: {
    page: { type: 'integer' as const, minimum: 1, default: 1 },
    pageSize: { type: 'integer' as const, minimum: 1, maximum: 100, default: 20 },
    sort: { type: 'string' as const },
  },
};

export function paginatedResponse(itemSchema: object) {
  return {
    type: 'object' as const,
    properties: {
      data: { type: 'array' as const, items: itemSchema },
      meta: {
        type: 'object' as const,
        properties: {
          page: { type: 'integer' as const },
          pageSize: { type: 'integer' as const },
          total: { type: 'integer' as const },
          totalPages: { type: 'integer' as const },
        },
      },
    },
  };
}

export const idParamSchema = {
  type: 'object' as const,
  required: ['id'],
  properties: { id: { type: 'integer' as const } },
};

// ---------------------------------------------------------------------------
// Store schemas
// ---------------------------------------------------------------------------

export const storeResponse = responseSchema(defs.Store);

export const storeCreateBody = {
  type: 'object' as const,
  required: ['name'],
  properties: {
    name: { type: 'string' as const, minLength: 1, maxLength: 255 },
  },
};

export const storeUpdateBody = {
  type: 'object' as const,
  minProperties: 1,
  properties: {
    name: { type: 'string' as const, minLength: 1, maxLength: 255 },
    isActive: { type: 'boolean' as const },
  },
};

export const storeListQuery = {
  type: 'object' as const,
  properties: {
    ...paginationQuerySchema.properties,
    isActive: { type: 'boolean' as const },
  },
};

// ---------------------------------------------------------------------------
// Product schemas
// ---------------------------------------------------------------------------

export const productResponse = responseSchema(defs.Product);

export const productCreateBody = {
  type: 'object' as const,
  required: ['sku', 'name', 'category', 'price'],
  properties: {
    sku: { type: 'string' as const, minLength: 1, maxLength: 100 },
    name: { type: 'string' as const, minLength: 1, maxLength: 255 },
    category: { type: 'string' as const, minLength: 1, maxLength: 255 },
    description: { type: ['string', 'null'] as const, maxLength: 1000 },
    price: { type: 'number' as const, minimum: 0 },
  },
};

export const productUpdateBody = {
  type: 'object' as const,
  minProperties: 1,
  properties: {
    sku: { type: 'string' as const, minLength: 1, maxLength: 100 },
    name: { type: 'string' as const, minLength: 1, maxLength: 255 },
    category: { type: 'string' as const, minLength: 1, maxLength: 255 },
    description: { type: ['string', 'null'] as const, maxLength: 1000 },
    price: { type: 'number' as const, minimum: 0 },
    isActive: { type: 'boolean' as const },
  },
};

export const productListQuery = {
  type: 'object' as const,
  properties: {
    ...paginationQuerySchema.properties,
    category: { type: 'string' as const },
    minPrice: { type: 'number' as const, minimum: 0 },
    maxPrice: { type: 'number' as const, minimum: 0 },
    isActive: { type: 'boolean' as const },
  },
};

// ---------------------------------------------------------------------------
// Inventory schemas
// ---------------------------------------------------------------------------

export const inventoryResponse = responseSchema(defs.Inventory);

export const inventoryCreateBody = {
  type: 'object' as const,
  required: ['storeId', 'productId'],
  properties: {
    storeId: { type: 'integer' as const },
    productId: { type: 'integer' as const },
    quantity: { type: 'integer' as const, minimum: 0, default: 0 },
  },
};

export const inventoryUpdateBody = {
  type: 'object' as const,
  required: ['quantity'],
  properties: {
    quantity: { type: 'integer' as const, minimum: 0 },
  },
};

export const inventoryListQuery = {
  type: 'object' as const,
  properties: {
    ...paginationQuerySchema.properties,
    storeId: { type: 'integer' as const },
    category: { type: 'string' as const },
    minPrice: { type: 'number' as const, minimum: 0 },
    maxPrice: { type: 'number' as const, minimum: 0 },
    stockLevel: { type: 'string' as const, enum: ['in_stock', 'out_of_stock', 'low_stock'] },
  },
};

export const storeIdParamSchema = {
  type: 'object' as const,
  required: ['storeId'],
  properties: { storeId: { type: 'integer' as const } },
};
