import {
  ProductSchema,
  paginatedSchema,
  type Product,
  type CreateProduct,
  type UpdateProduct,
  type PaginatedResult,
} from 'tiny-inventory-shared';
import { request } from './client';

const ProductListResponse = paginatedSchema(ProductSchema);

export async function fetchProducts(
  query: Record<string, string | number | boolean> = {},
): Promise<PaginatedResult<Product>> {
  const params = new URLSearchParams();
  for (const [k, v] of Object.entries(query)) {
    if (v !== undefined && v !== '') params.set(k, String(v));
  }
  const qs = params.toString();
  const data = await request(`/products${qs ? `?${qs}` : ''}`);
  return ProductListResponse.parse(data);
}

export async function fetchProduct(id: number): Promise<Product> {
  const data = await request(`/products/${id}`);
  return ProductSchema.parse(data);
}

export async function createProduct(input: CreateProduct): Promise<Product> {
  const data = await request('/products', {
    method: 'POST',
    body: JSON.stringify(input),
  });
  return ProductSchema.parse(data);
}

export async function updateProduct(id: number, input: UpdateProduct): Promise<Product> {
  const data = await request(`/products/${id}`, {
    method: 'PATCH',
    body: JSON.stringify(input),
  });
  return ProductSchema.parse(data);
}

export async function deleteProduct(id: number): Promise<void> {
  await request(`/products/${id}`, { method: 'DELETE' });
}
