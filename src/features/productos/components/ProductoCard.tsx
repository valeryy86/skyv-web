import Link from "next/link";
import { formatearPrecio } from "@/src/features/common/format";
import type { Producto } from "../domain/types";

export function ProductoCard({ producto }: { producto: Producto }) {
  return (
    <article className="flex flex-col justify-between overflow-hidden rounded-[15px] border border-borde-claro bg-white shadow-[0_4px_10px_rgba(255,151,189,0.2)] transition duration-300 hover:-translate-y-1 hover:shadow-[0_8px_20px_rgba(255,151,189,0.4)]">
      <img src={producto.imagen} alt={producto.nombre} className="h-[200px] w-full object-cover" loading="lazy" />
      <div className="flex grow flex-col gap-2 p-4">
        <span className="text-xs font-bold tracking-wide text-rosa uppercase">{producto.marca}</span>
        <h3 className="text-lg font-semibold text-texto">{producto.nombre}</h3>
        {producto.descripcion && <p className="text-sm text-gris">{producto.descripcion}</p>}
        <p className="mt-auto text-xl font-bold text-rosa">{formatearPrecio(producto.precio)}</p>
        <Link
          href={`/pedido?producto=${producto.id}`}
          className="rounded-[10px] bg-rosa p-2.5 text-center font-semibold text-white transition hover:scale-[1.02] hover:bg-rosa-hover"
        >
          Hacer pedido
        </Link>
      </div>
    </article>
  );
}
