export type TipoCliente = "Cliente" | "Revendedor";
export type EstadoPedido = "pendiente" | "confirmado" | "cancelado";

export interface Pedido {
  id: number;
  cantidad: number;
  telefono: string;
  tipoCliente: TipoCliente;
  mensaje: string | null;
  estado: EstadoPedido;
  createdAt: string;
  producto: { id: number; nombre: string; marca: string; precio: number; imagen: string };
  user: { id: number; nombre: string; email: string };
}

export interface CrearPedidoRequest {
  productoId: number;
  cantidad: number;
  telefono: string;
  tipoCliente: TipoCliente;
  mensaje: string | null;
}
