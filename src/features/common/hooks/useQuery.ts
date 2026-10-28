"use client";

import { useCallback, useEffect, useRef, useState } from "react";


export function useQuery<T>(fetcher: () => Promise<T>, key: string) {
  const fetcherRef = useRef(fetcher);
  const [data, setData] = useState<T | null>(null);
  const [error, setError] = useState<string | null>(null);
  const [loading, setLoading] = useState(true);
  const [version, setVersion] = useState(0);

  useEffect(() => {
    fetcherRef.current = fetcher;
  });

  useEffect(() => {
    let activo = true;
    setLoading(true);
    setError(null);

    fetcherRef
      .current()
      .then((resultado) => {
        if (activo) setData(resultado);
      })
      .catch((e: unknown) => {
        if (activo) setError(e instanceof Error ? e.message : "Ocurrió un error");
      })
      .finally(() => {
        if (activo) setLoading(false);
      });

    return () => {
      activo = false;
    };
  }, [key, version]);

  const recargar = useCallback(() => setVersion((v) => v + 1), []);

  return { data, error, loading, recargar };
}
