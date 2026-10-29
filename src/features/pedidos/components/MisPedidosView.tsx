"use client";

import Link from "next/link";
import { useSearchParams } from "next/navigation";
import { Cargando, ErrorMensaje, Vacio } from "@/src/features/common/components/EstadosUI";
import { Pagination } from "@/src/features/common/components/Pagination";
import { useMisPedidos } from "../hooks/usePedidos";
import { PedidosLista } from "./PedidosLista";

export function MisPedidosView() {
  const searchParams = useSearchParams();
  const page = Math.max(1, Number(searchParams.get("page")) || 1);
  const { pedidos, pagination, loading, error, recargar } = useMisPedidos(page);

  return (
    <section className="mx-auto max-w-3xl px-4">
      <h1 className="titulo-rosa mb-8 text-center text-3xl font-semibold">Mis pedidos</h1>
      {loading ? (
        <Cargando texto="Cargando tus pedidos..." />
      ) : error ? (
        <ErrorMensaje texto={error} onReintentar={recargar} />
      ) : pedidos.length === 0 ? (
        <div className="text-center">
          <Vacio texto="Todavía no has hecho pedidos." />
          <Link href="/catalogo" className="font-semibold text-rosa hover:text-rosa-hover">Ir al catálogo</Link>
        </div>
      ) : (
        <>
          <PedidosLista pedidos={pedidos} />
          {pagination && (
            <Pagination page={pagination.page} totalPages={pagination.totalPages} hrefFor={(n) => `/mis-pedidos?page=${n}`} />
          )}
        </>
      )}
    </section>
  );
}
