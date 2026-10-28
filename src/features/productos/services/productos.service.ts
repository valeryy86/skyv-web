import { http } from "@/src/features/common/http";
import type { Paginated } from "@/src/features/common/types";
import type { FiltrosProductos, Producto, ProductoInput } from "../domain/types";

export function listarProductos(filtros: FiltrosProductos = {}): Promise<Paginated<Producto>> {
  const params = new URLSearchParams();
  for (const [clave, valor] of Object.entries(filtros)) {
    if (valor !== undefined && valor !== "") params.set(clave, String(valor));
  }
  const query = params.toString();
  return http<Paginated<Producto>>(`/productos${query ? `?${query}` : ""}`);
}

export function obtenerProducto(id: number): Promise<Producto> {
  return http<Producto>(`/productos/${id}`);
}

export function crearProducto(data: ProductoInput): Promise<Producto> {
  return http<Producto>("/productos", { method: "POST", body: data });
}

export function actualizarProducto(id: number, data: ProductoInput): Promise<Producto> {
  return http<Producto>(`/productos/${id}`, { method: "PUT", body: data });
}

export function eliminarProducto(id: number): Promise<void> {
  return http<void>(`/productos/${id}`, { method: "DELETE" });
}
