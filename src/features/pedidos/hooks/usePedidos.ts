"use client";

import { useState } from "react";
import { useQuery } from "@/src/features/common/hooks/useQuery";
import { ApiError } from "@/src/features/common/http";
import { crearPedido, listarMisPedidos, listarTodosLosPedidos } from "../services/pedidos.service";
import type { CrearPedidoRequest, Pedido } from "../domain/types";

export function useMisPedidos(page: number) {
  const { data, loading, error, recargar } = useQuery(() => listarMisPedidos(page), `mis-${page}`);
  return { pedidos: data?.data ?? [], pagination: data?.pagination ?? null, loading, error, recargar };
}

export function usePedidosAdmin(page: number) {
  const { data, loading, error, recargar } = useQuery(() => listarTodosLosPedidos(page), `todos-${page}`);
  return { pedidos: data?.data ?? [], pagination: data?.pagination ?? null, loading, error, recargar };
}

export function useCrearPedido() {
  const [enviando, setEnviando] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [fieldErrors, setFieldErrors] = useState<Record<string, string>>({});

  async function crear(data: CrearPedidoRequest): Promise<Pedido | null> {
    setEnviando(true);
    setError(null);
    setFieldErrors({});
    try {
      return await crearPedido(data);
    } catch (e) {
      if (e instanceof ApiError) {
        setFieldErrors(e.fieldErrors);
        setError(e.message);
      } else {
        setError("Ocurrió un error inesperado");
      }
      return null;
    } finally {
      setEnviando(false);
    }
  }

  return { crear, enviando, error, fieldErrors };
}
