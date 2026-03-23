import type { AppError } from 'tiny-inventory-shared';

const API_BASE = '/api';

export class ApiError extends Error {
  constructor(
    public status: number,
    public body: AppError,
  ) {
    super(body.message);
    this.name = 'ApiError';
  }
}

export async function request<T>(
  path: string,
  options: RequestInit = {},
): Promise<T> {
  const res = await fetch(`${API_BASE}${path}`, {
    headers: { 'Content-Type': 'application/json', ...options.headers },
    ...options,
  });

  if (!res.ok) {
    const body = await res.json().catch(() => ({ code: 'UNKNOWN', message: `HTTP ${res.status}` }));
    throw new ApiError(res.status, body as AppError);
  }

  if (res.status === 204) return undefined as T;
  return res.json() as Promise<T>;
}
