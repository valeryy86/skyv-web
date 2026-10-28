"use client";

import { usePathname, useRouter } from "next/navigation";
import { useEffect, type ReactNode } from "react";
import { Cargando } from "@/src/features/common/components/EstadosUI";
import { useAuth } from "../hooks/useAuth";
import type { Role } from "../domain/types";


export function RequireAuth({ children, role }: { children: ReactNode; role?: Role }) {
  const { user, status } = useAuth();
  const router = useRouter();
  const pathname = usePathname();

  const permitido = status === "authenticated" && (!role || user?.role === role);

  useEffect(() => {
    if (status === "guest") {
      router.replace(`/login?next=${encodeURIComponent(pathname)}`);
    } else if (status === "authenticated" && role && user?.role !== role) {
      router.replace("/");
    }
  }, [status, user, role, router, pathname]);

  if (!permitido) {
    return <Cargando texto="Verificando sesión..." />;
  }
  return <>{children}</>;
}
