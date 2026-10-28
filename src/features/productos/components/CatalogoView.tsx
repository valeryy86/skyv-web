"use client";

import { usePathname, useRouter, useSearchParams } from "next/navigation";
import { Cargando, ErrorMensaje, Vacio } from "@/src/features/common/components/EstadosUI";
import { Pagination } from "@/src/features/common/components/Pagination";
import { useProductos } from "../hooks/useProductos";
import type { Categoria } from "../domain/types";
import { FiltrosCatalogo } from "./FiltrosCatalogo";
import { ProductoCard } from "./ProductoCard";

const POR_PAGINA = 6;

function numero(valor: string | null): number | undefined {
  if (!valor) return undefined;
  const n = Number(valor);
  return Number.isFinite(n) ? n : undefined;
}

export function CatalogoView() {
  const searchParams = useSearchParams();
  const router = useRouter();
  const pathname = usePathname();

  const page = Math.max(1, numero(searchParams.get("page")) ?? 1);
  const marca = searchParams.get("marca") ?? undefined;
  const q = searchParams.get("q") ?? undefined;
  const categoriaUrl = searchParams.get("categoria");
  const categoria: Categoria | undefined =
    categoriaUrl === "maquillaje" || categoriaUrl === "capilar" ? categoriaUrl : undefined;
  const minPrecio = numero(searchParams.get("minPrecio"));
  const maxPrecio = numero(searchParams.get("maxPrecio"));

  const { productos, pagination, loading, error, recargar } = useProductos({
    page,
    limit: POR_PAGINA,
    marca,
    q,
    categoria,
    minPrecio,
    maxPrecio,
  });

  function cambiarFiltros(cambios: Record<string, string | undefined>) {
    const params = new URLSearchParams(searchParams.toString());
    for (const [clave, valor] of Object.entries(cambios)) {
      if (valor) params.set(clave, valor);
      else params.delete(clave);
    }
    params.delete("page");
    const query = params.toString();
    router.push(query ? `${pathname}?${query}` : pathname);
  }

  function hrefPagina(n: number) {
    const params = new URLSearchParams(searchParams.toString());
    params.set("page", String(n));
    return `${pathname}?${params.toString()}`;
  }

  return (
    <section className="mx-auto max-w-[1200px] px-[5%] py-5">
      <h1 className="titulo-rosa mb-6 text-center text-[32px] font-semibold">Nuestro Catálogo</h1>

      <FiltrosCatalogo
        key={searchParams.toString()}
        marca={marca}
        q={q}
        categoria={categoria}
        minPrecio={searchParams.get("minPrecio") ?? undefined}
        maxPrecio={searchParams.get("maxPrecio") ?? undefined}
        onCambiar={cambiarFiltros}
      />

      {loading ? (
        <Cargando texto="Cargando productos..." />
      ) : error ? (
        <ErrorMensaje texto={error} onReintentar={recargar} />
      ) : productos.length === 0 ? (
        <Vacio texto="No hay productos disponibles con estos filtros." />
      ) : (
        <>
          <div className="grid grid-cols-[repeat(auto-fill,minmax(220px,1fr))] gap-8">
            {productos.map((p) => (
              <ProductoCard key={p.id} producto={p} />
            ))}
          </div>
          {pagination && <Pagination page={pagination.page} totalPages={pagination.totalPages} hrefFor={hrefPagina} />}
        </>
      )}
    </section>
  );
}
