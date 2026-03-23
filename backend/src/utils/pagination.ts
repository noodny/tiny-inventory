import type { PaginatedResult } from 'tiny-inventory-shared';

export interface PaginationParams {
  page: number;
  pageSize: number;
}

export function parsePagination(query: { page?: number; pageSize?: number }): PaginationParams {
  return {
    page: query.page ?? 1,
    pageSize: query.pageSize ?? 20,
  };
}

export function paginate<T>(
  data: T[],
  total: number,
  params: PaginationParams,
): PaginatedResult<T> {
  return {
    data,
    meta: {
      page: params.page,
      pageSize: params.pageSize,
      total,
      totalPages: Math.ceil(total / params.pageSize),
    },
  };
}
