"use client";

import { useState } from "react";
import { ApiError } from "@/src/features/common/http";
import { actualizarProducto, crearProducto, eliminarProducto } from "../services/productos.service";
import type { ProductoInput } from "../domain/types";

export function useProductoAdmin() {
  const [enviando, setEnviando] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [fieldErrors, setFieldErrors] = useState<Record<string, string>>({});

  async function ejecutar(accion: () => Promise<unknown>): Promise<boolean> {
    setEnviando(true);
    setError(null);
    setFieldErrors({});
    try {
      await accion();
      return true;
    } catch (e) {
      if (e instanceof ApiError) {
        setFieldErrors(e.fieldErrors);
        setError(e.message);
      } else {
        setError("Ocurrió un error inesperado");
      }
      return false;
    } finally {
      setEnviando(false);
    }
  }

  return {
    enviando,
    error,
    fieldErrors,
    guardar: (data: ProductoInput, id?: number) =>
      ejecutar(() => (id ? actualizarProducto(id, data) : crearProducto(data))),
    eliminar: (id: number) => ejecutar(() => eliminarProducto(id)),
    limpiarErrores: () => {
      setError(null);
      setFieldErrors({});
    },
  };
}
