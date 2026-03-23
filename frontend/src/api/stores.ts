import {
  StoreSchema,
  paginatedSchema,
  type Store,
  type CreateStore,
  type UpdateStore,
  type PaginatedResult,
} from 'tiny-inventory-shared';
import { request } from './client';

const StoreListResponse = paginatedSchema(StoreSchema);

export async function fetchStores(
  query: Record<string, string | number | boolean> = {},
): Promise<PaginatedResult<Store>> {
  const params = new URLSearchParams();
  for (const [k, v] of Object.entries(query)) {
    if (v !== undefined && v !== '') params.set(k, String(v));
  }
  const qs = params.toString();
  const data = await request(`/stores${qs ? `?${qs}` : ''}`);
  return StoreListResponse.parse(data);
}

export async function fetchStore(id: number): Promise<Store> {
  const data = await request(`/stores/${id}`);
  return StoreSchema.parse(data);
}

export async function createStore(input: CreateStore): Promise<Store> {
  const data = await request('/stores', {
    method: 'POST',
    body: JSON.stringify(input),
  });
  return StoreSchema.parse(data);
}

export async function updateStore(id: number, input: UpdateStore): Promise<Store> {
  const data = await request(`/stores/${id}`, {
    method: 'PATCH',
    body: JSON.stringify(input),
  });
  return StoreSchema.parse(data);
}

export async function deleteStore(id: number): Promise<void> {
  await request(`/stores/${id}`, { method: 'DELETE' });
}
