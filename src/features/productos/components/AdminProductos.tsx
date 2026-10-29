/* eslint-disable @next/next/no-img-element */
"use client";

import { useState } from "react";
import { Button } from "@/src/features/common/components/Button";
import { Cargando, ErrorMensaje, Vacio } from "@/src/features/common/components/EstadosUI";
import { formatearPrecio } from "@/src/features/common/format";
import { useProductoAdmin } from "../hooks/useProductoAdmin";
import { useProductos } from "../hooks/useProductos";
import type { Producto, ProductoInput } from "../domain/types";
import { ProductoForm } from "./ProductoForm";

export function AdminProductos() {
  const { productos, loading, error, recargar } = useProductos({ page: 1, limit: 50 });
  const admin = useProductoAdmin();
  const [formAbierto, setFormAbierto] = useState(false);
  const [editando, setEditando] = useState<Producto | null>(null);
  const [confirmarId, setConfirmarId] = useState<number | null>(null);
  const [aviso, setAviso] = useState<string | null>(null);

  function abrirNuevo() {
    admin.limpiarErrores();
    setEditando(null);
    setFormAbierto(true);
  }

  function abrirEditar(p: Producto) {
    admin.limpiarErrores();
    setEditando(p);
    setFormAbierto(true);
  }

  async function guardar(data: ProductoInput) {
    const ok = await admin.guardar(data, editando?.id);
    if (ok) {
      setAviso(editando ? "Producto actualizado." : "Producto creado.");
      setFormAbierto(false);
      setEditando(null);
      recargar();
    }
  }

  async function eliminar(id: number) {
    const ok = await admin.eliminar(id);
    setConfirmarId(null);
    if (ok) {
      setAviso("Producto eliminado.");
      recargar();
    } else {
      setAviso(null);
    }
  }

  return (
    <section>
      <div className="mb-6 flex flex-wrap items-center justify-between gap-4">
        <h2 className="text-2xl font-semibold text-rosa">Productos del catálogo</h2>
        {!formAbierto && <Button onClick={abrirNuevo}>+ Nuevo producto</Button>}
      </div>

      {aviso && <p className="mb-4 rounded-xl border border-exito-borde bg-exito-fondo p-3 text-gris-oscuro">{aviso}</p>}
      {!formAbierto && admin.error && <p className="mb-4 text-error" role="alert">{admin.error}</p>}

      {formAbierto && (
        <div className="mb-8">
          <ProductoForm
            key={editando?.id ?? "nuevo"}
            inicial={editando}
            enviando={admin.enviando}
            fieldErrors={admin.fieldErrors}
            error={admin.error}
            onGuardar={guardar}
            onCancelar={() => {
              setFormAbierto(false);
              setEditando(null);
            }}
          />
        </div>
      )}

      {loading ? (
        <Cargando texto="Cargando productos..." />
      ) : error ? (
        <ErrorMensaje texto={error} onReintentar={recargar} />
      ) : productos.length === 0 ? (
        <Vacio texto="Todavía no hay productos." />
      ) : (
        <ul className="divide-y divide-borde-claro overflow-hidden rounded-2xl border border-borde-claro bg-white">
          {productos.map((p) => (
            <li key={p.id} className="flex flex-col gap-3 p-4 sm:flex-row sm:items-center">
              <img src={p.imagen} alt={p.nombre} className="h-16 w-16 rounded-xl object-cover" />
              <div className="flex-1">
                <p className="font-semibold">{p.nombre}</p>
                <p className="text-sm text-gris">
                  {p.marca} · {p.categoria} · {formatearPrecio(p.precio)}
                </p>
              </div>
              {confirmarId === p.id ? (
                // Confirmación antes de eliminar
                <div className="flex flex-wrap items-center gap-2">
                  <span className="text-sm font-semibold text-error">¿Eliminar este producto?</span>
                  <Button variante="peligro" disabled={admin.enviando} onClick={() => eliminar(p.id)}>Sí, eliminar</Button>
                  <Button variante="secundario" onClick={() => setConfirmarId(null)}>Cancelar</Button>
                </div>
              ) : (
                <div className="flex gap-2">
                  <Button variante="secundario" onClick={() => abrirEditar(p)}>Editar</Button>
                  <Button variante="peligro" onClick={() => { setAviso(null); setConfirmarId(p.id); }}>Eliminar</Button>
                </div>
              )}
            </li>
          ))}
        </ul>
      )}
    </section>
  );
}
