"use client";

import { useSearchParams } from "next/navigation";
import { Cargando, ErrorMensaje, Vacio } from "@/src/features/common/components/EstadosUI";
import { Pagination } from "@/src/features/common/components/Pagination";
import { usePedidosAdmin } from "../hooks/usePedidos";
import { PedidosLista } from "./PedidosLista";

export function AdminPedidos() {
  const searchParams = useSearchParams();
  const page = Math.max(1, Number(searchParams.get("page")) || 1);
  const { pedidos, pagination, loading, error, recargar } = usePedidosAdmin(page);

  return (
    <section>
      <h2 className="mb-6 text-2xl font-semibold text-rosa">Todos los pedidos</h2>
      {loading ? (
        <Cargando texto="Cargando pedidos..." />
      ) : error ? (
        <ErrorMensaje texto={error} onReintentar={recargar} />
      ) : pedidos.length === 0 ? (
        <Vacio texto="Aún no hay pedidos." />
      ) : (
        <>
          <PedidosLista pedidos={pedidos} mostrarCliente />
          {pagination && (
            <Pagination page={pagination.page} totalPages={pagination.totalPages} hrefFor={(n) => `/admin?page=${n}`} />
          )}
        </>
      )}
    </section>
  );
}
