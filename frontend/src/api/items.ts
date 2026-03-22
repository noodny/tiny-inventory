import { z } from 'zod';

const API_BASE = '/api';

// ── Input schemas (validated before sending) ──────────────────────────────────
export const createItemSchema = z.object({
  name: z.string().min(1).max(255),
  description: z.string().max(1000).optional(),
  quantity: z.number().int().min(0),
  price: z.number().min(0),
  sku: z.string().max(100).optional(),
});

export const updateItemSchema = createItemSchema.partial();

export type CreateItemInput = z.infer<typeof createItemSchema>;
export type UpdateItemInput = z.infer<typeof updateItemSchema>;

// ── API helpers ───────────────────────────────────────────────────────────────
async function handleResponse<T>(res: Response): Promise<T> {
  if (!res.ok) {
    const body = await res.json().catch(() => ({}));
    throw new Error((body as { message?: string }).message ?? `HTTP ${res.status}`);
  }
  if (res.status === 204) return undefined as T;
  return res.json() as Promise<T>;
}

export async function fetchItemsApi(): Promise<unknown> {
  const res = await fetch(`${API_BASE}/items`);
  return handleResponse(res);
}

export async function createItemApi(input: CreateItemInput): Promise<unknown> {
  const validated = createItemSchema.parse(input);
  const res = await fetch(`${API_BASE}/items`, {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify(validated),
  });
  return handleResponse(res);
}

export async function updateItemApi(id: number, input: UpdateItemInput): Promise<unknown> {
  const validated = updateItemSchema.parse(input);
  const res = await fetch(`${API_BASE}/items/${id}`, {
    method: 'PATCH',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify(validated),
  });
  return handleResponse(res);
}

export async function deleteItemApi(id: number): Promise<void> {
  const res = await fetch(`${API_BASE}/items/${id}`, { method: 'DELETE' });
  await handleResponse<void>(res);
}
