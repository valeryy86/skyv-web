import { formatearFecha, formatearPrecio } from "@/src/features/common/format";
import type { EstadoPedido, Pedido } from "../domain/types";

const coloresEstado: Record<EstadoPedido, string> = {
  pendiente: "bg-exito-fondo text-rosa-hover",
  confirmado: "bg-green-100 text-green-700",
  cancelado: "bg-gray-100 text-gray-500",
};

export function PedidosLista({ pedidos, mostrarCliente = false }: { pedidos: Pedido[]; mostrarCliente?: boolean }) {
  return (
    <ul className="space-y-4">
      {pedidos.map((p) => (
        <li key={p.id} className="flex flex-col gap-4 rounded-2xl border border-borde-claro bg-white p-4 shadow-[0_4px_10px_rgba(255,151,189,0.15)] sm:flex-row sm:items-center">
          <img src={p.producto.imagen} alt={p.producto.nombre} className="h-20 w-20 rounded-xl object-cover" />
          <div className="flex-1 space-y-1">
            <p className="font-semibold">
              #{p.id} · {p.producto.nombre} <span className="text-sm text-gris uppercase">({p.producto.marca})</span>
            </p>
            <p className="text-sm text-gris">
              {p.cantidad} × {formatearPrecio(p.producto.precio)} ={" "}
              <strong className="text-rosa">{formatearPrecio(p.cantidad * p.producto.precio)}</strong>
            </p>
            <p className="text-sm text-gris">
              {formatearFecha(p.createdAt)} · {p.tipoCliente} · Tel. {p.telefono}
            </p>
            {mostrarCliente && (
              <p className="text-sm text-gris-oscuro">Cliente: {p.user.nombre} ({p.user.email})</p>
            )}
            {p.mensaje && <p className="text-sm italic text-gris">“{p.mensaje}”</p>}
          </div>
          <span className={`self-start rounded-full px-3 py-1 text-sm font-semibold capitalize sm:self-center ${coloresEstado[p.estado]}`}>
            {p.estado}
          </span>
        </li>
      ))}
    </ul>
  );
}
