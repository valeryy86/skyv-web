export interface Pagination {
  page: number;
  limit: number;
  total: number;
  totalPages: number;
}

export interface Paginated<T> {
  pagination: Pagination;
  data: T[];
}

export interface ApiErrorBody {
  message?: string;
  errors?: Record<string, string>;
}
