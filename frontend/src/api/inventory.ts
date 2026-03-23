import {
  InventoryWithRelationsSchema,
  InventorySchema,
  InventoryBatchResponseSchema,
  paginatedSchema,
  type Inventory,
  type InventoryWithRelations,
  type CreateInventory,
  type UpdateInventory,
  type InventoryBatchItem,
  type InventoryBatchResponse,
  type PaginatedResult,
} from 'tiny-inventory-shared';
import { request } from './client';

const InventoryListResponse = paginatedSchema(InventoryWithRelationsSchema);

export async function fetchInventory(
  query: Record<string, string | number | boolean> = {},
): Promise<PaginatedResult<InventoryWithRelations>> {
  const params = new URLSearchParams();
  for (const [k, v] of Object.entries(query)) {
    if (v !== undefined && v !== '') params.set(k, String(v));
  }
  const qs = params.toString();
  const data = await request(`/inventory${qs ? `?${qs}` : ''}`);
  return InventoryListResponse.parse(data);
}

export async function fetchStoreInventory(
  storeId: number,
  query: Record<string, string | number | boolean> = {},
): Promise<PaginatedResult<InventoryWithRelations>> {
  const params = new URLSearchParams();
  for (const [k, v] of Object.entries(query)) {
    if (v !== undefined && v !== '') params.set(k, String(v));
  }
  const qs = params.toString();
  const data = await request(`/stores/${storeId}/inventory${qs ? `?${qs}` : ''}`);
  return InventoryListResponse.parse(data);
}

export async function createInventory(input: CreateInventory): Promise<Inventory> {
  const data = await request('/inventory', {
    method: 'POST',
    body: JSON.stringify(input),
  });
  return InventorySchema.parse(data);
}

export async function updateInventory(id: number, input: UpdateInventory): Promise<Inventory> {
  const data = await request(`/inventory/${id}`, {
    method: 'PATCH',
    body: JSON.stringify(input),
  });
  return InventorySchema.parse(data);
}

export async function deleteInventory(id: number): Promise<void> {
  await request(`/inventory/${id}`, { method: 'DELETE' });
}

export async function batchImportInventory(
  items: InventoryBatchItem[],
): Promise<InventoryBatchResponse> {
  const data = await request('/inventory/batch', {
    method: 'POST',
    body: JSON.stringify({ items }),
  });
  return InventoryBatchResponseSchema.parse(data);
}
