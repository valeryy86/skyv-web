"use client";

import { useQuery } from "@/src/features/common/hooks/useQuery";
import { listarProductos } from "../services/productos.service";
import type { FiltrosProductos } from "../domain/types";

export function useProductos(filtros: FiltrosProductos) {
  const { data, loading, error, recargar } = useQuery(() => listarProductos(filtros), JSON.stringify(filtros));
  return {
    productos: data?.data ?? [],
    pagination: data?.pagination ?? null,
    loading,
    error,
    recargar,
  };
}
