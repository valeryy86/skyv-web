import { Suspense } from "react";
import { RequireAuth } from "@/src/features/auth/components/RequireAuth";
import { MisPedidosView } from "@/src/features/pedidos/components/MisPedidosView";
import { Cargando } from "@/src/features/common/components/EstadosUI";

export default function MisPedidosPage() {
  return (
    <RequireAuth>
      <Suspense fallback={<Cargando />}>
        <MisPedidosView />
      </Suspense>
    </RequireAuth>
  );
}
