import { http } from "@/src/features/common/http";
import type { Paginated } from "@/src/features/common/types";
import type { CrearPedidoRequest, Pedido } from "../domain/types";

export function crearPedido(data: CrearPedidoRequest): Promise<Pedido> {
  return http<Pedido>("/pedidos", { method: "POST", body: data });
}

export function listarMisPedidos(page = 1, limit = 5): Promise<Paginated<Pedido>> {
  return http<Paginated<Pedido>>(`/pedidos/mias?page=${page}&limit=${limit}`);
}

export function listarTodosLosPedidos(page = 1, limit = 10): Promise<Paginated<Pedido>> {
  return http<Paginated<Pedido>>(`/pedidos?page=${page}&limit=${limit}`);
}
