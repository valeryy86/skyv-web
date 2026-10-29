import { Suspense } from "react";
import { RequireAuth } from "@/src/features/auth/components/RequireAuth";
import { PedidoForm } from "@/src/features/pedidos/components/PedidoForm";
import { Cargando } from "@/src/features/common/components/EstadosUI";

export default function PedidoPage() {
  return (
    <RequireAuth>
      <Suspense fallback={<Cargando />}>
        <PedidoForm />
      </Suspense>
    </RequireAuth>
  );
}
