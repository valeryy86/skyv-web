"use client";

import { useRouter } from "next/navigation";
import { useEffect, useRef, type ReactNode } from "react";
import { Cargando } from "@/src/features/common/components/EstadosUI";
import { useAuth } from "../hooks/useAuth";


export function GuestOnly({ children }: { children: ReactNode }) {
  const { status } = useAuth();
  const router = useRouter();
  const eraInvitado = useRef(false);

  useEffect(() => {
    if (status === "guest") {
      eraInvitado.current = true;
    } else if (status === "authenticated" && !eraInvitado.current) {
      router.replace("/");
    }
  }, [status, router]);

  if (status === "loading" || (status === "authenticated" && !eraInvitado.current)) {
    return <Cargando />;
  }
  return <>{children}</>;
}
