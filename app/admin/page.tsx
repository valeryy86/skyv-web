import { Suspense } from "react";
import { RequireAuth } from "@/src/features/auth/components/RequireAuth";
import { AdminProductos } from "@/src/features/productos/components/AdminProductos";
import { AdminPedidos } from "@/src/features/pedidos/components/AdminPedidos";
import { Cargando } from "@/src/features/common/components/EstadosUI";

export default function AdminPage() {
  return (
    <RequireAuth role="admin">
      <section className="mx-auto max-w-6xl space-y-12 px-4 sm:px-6">
        <h1 className="titulo-rosa text-center text-3xl font-semibold">Administración</h1>
        <AdminProductos />
        <Suspense fallback={<Cargando />}>
          <AdminPedidos />
        </Suspense>
      </section>
    </RequireAuth>
  );
}
