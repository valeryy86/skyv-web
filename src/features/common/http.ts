import { API_BASE_URL } from "./config";
import { clearToken, getToken } from "./session";
import type { ApiErrorBody } from "./types";

export class ApiError extends Error {
  status: number;
  fieldErrors: Record<string, string>;

  constructor(message: string, status: number, fieldErrors: Record<string, string> = {}) {
    super(message);
    this.name = "ApiError";
    this.status = status;
    this.fieldErrors = fieldErrors;
  }
}

interface RequestOptions {
  method?: "GET" | "POST" | "PUT" | "DELETE";
  body?: unknown;
}


export async function http<T>(path: string, options: RequestOptions = {}): Promise<T> {
  const headers: Record<string, string> = { "Content-Type": "application/json" };
  const token = getToken();
  if (token) {
    headers.Authorization = `Bearer ${token}`;
  }

  let response: Response;
  try {
    response = await fetch(`${API_BASE_URL}${path}`, {
      method: options.method ?? "GET",
      headers,
      body: options.body !== undefined ? JSON.stringify(options.body) : undefined,
    });
  } catch {
    throw new ApiError("No se pudo conectar con el servidor. Intenta de nuevo.", 0);
  }

  if (response.status === 401 && token) {
    clearToken();
    window.location.href = "/login?expirada=1";
    throw new ApiError("Tu sesión expiró. Inicia sesión de nuevo.", 401);
  }

  if (response.status === 204) {
    return undefined as T;
  }

  const data: unknown = await response.json().catch(() => null);

  if (!response.ok) {
    const body = (data ?? {}) as ApiErrorBody;
    throw new ApiError(body.message ?? "Ocurrió un error inesperado", response.status, body.errors ?? {});
  }

  return data as T;
}
