"use client";

import { useState, type FormEvent } from "react";
import { capitalizar } from "@/src/features/common/format";
import { todasLasMarcas } from "@/src/features/home/data/marcas";

interface FiltrosProps {
  marca?: string;
  q?: string;
  categoria?: string;
  minPrecio?: string;
  maxPrecio?: string;
  onCambiar: (cambios: Record<string, string | undefined>) => void;
}

export function FiltrosCatalogo({ marca, q, categoria, minPrecio, maxPrecio, onCambiar }: FiltrosProps) {
  const [texto, setTexto] = useState(q ?? "");
  const [cat, setCat] = useState(categoria ?? "");
  const [min, setMin] = useState(minPrecio ?? "");
  const [max, setMax] = useState(maxPrecio ?? "");

  function aplicar(e: FormEvent<HTMLFormElement>) {
    e.preventDefault();
    onCambiar({ q: texto.trim() || undefined, categoria: cat || undefined, minPrecio: min || undefined, maxPrecio: max || undefined });
  }

  function limpiar() {
    setTexto("");
    setCat("");
    setMin("");
    setMax("");
    onCambiar({ q: undefined, categoria: undefined, minPrecio: undefined, maxPrecio: undefined, marca: undefined });
  }

  const botonMarca = (activo: boolean) =>
    `rounded-[20px] border-2 border-rosa px-4 py-2 text-[15px] font-semibold shadow-[2px_2px_5px_rgba(255,151,189,0.2)] transition ${
      activo ? "bg-rosa text-white" : "bg-white text-rosa hover:bg-rosa hover:text-white"
    }`;
  const campo = "rounded-[10px] border border-input-borde bg-white p-2.5 outline-none focus:border-rosa";

  return (
    <div className="mb-10 space-y-6">
      <div className="flex flex-wrap justify-center gap-3">
        <button className={botonMarca(!marca)} onClick={() => onCambiar({ marca: undefined })}>
          Todos
        </button>
        {todasLasMarcas.map((m) => (
          <button key={m.slug} className={botonMarca(marca === m.slug)} onClick={() => onCambiar({ marca: m.slug })}>
            {capitalizar(m.nombre)}
          </button>
        ))}
      </div>

      <form onSubmit={aplicar} className="grid grid-cols-1 gap-3 sm:grid-cols-2 lg:grid-cols-[2fr_1fr_1fr_1fr_auto_auto]">
        <input className={campo} placeholder="Buscar por nombre..." value={texto} onChange={(e) => setTexto(e.target.value)} aria-label="Buscar por nombre" />
        <select className={campo} value={cat} onChange={(e) => setCat(e.target.value)} aria-label="Categoría">
          <option value="">Todas las categorías</option>
          <option value="maquillaje">Maquillaje</option>
          <option value="capilar">Capilar</option>
        </select>
        <input className={campo} type="number" min={0} placeholder="Precio mín." value={min} onChange={(e) => setMin(e.target.value)} aria-label="Precio mínimo" />
        <input className={campo} type="number" min={0} placeholder="Precio máx." value={max} onChange={(e) => setMax(e.target.value)} aria-label="Precio máximo" />
        <button type="submit" className="rounded-[10px] bg-rosa px-5 py-2.5 font-semibold text-white transition hover:bg-rosa-hover">
          Filtrar
        </button>
        <button type="button" onClick={limpiar} className="rounded-[10px] border-2 border-rosa bg-white px-5 py-2 font-semibold text-rosa transition hover:bg-rosa hover:text-white">
          Limpiar
        </button>
      </form>
    </div>
  );
}
