import type { PaginatedResult } from 'tiny-inventory-shared';

export async function fetchAll<T>(
  fetcher: (query: Record<string, string | number | boolean>) => Promise<PaginatedResult<T>>,
  baseQuery: Record<string, string | number | boolean> = {},
): Promise<T[]> {
  const items: T[] = [];
  let page = 1;
  let totalPages = 1;
  do {
    const result = await fetcher({ ...baseQuery, page, pageSize: 100 });
    items.push(...result.data);
    totalPages = result.meta.totalPages;
    page++;
  } while (page <= totalPages);
  return items;
}
