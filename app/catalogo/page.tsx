import { Suspense } from "react";
import { CatalogoView } from "@/src/features/productos/components/CatalogoView";
import { Cargando } from "@/src/features/common/components/EstadosUI";

export default function CatalogoPage() {
  return (
    <Suspense fallback={<Cargando texto="Cargando catálogo..." />}>
      <CatalogoView />
    </Suspense>
  );
}
