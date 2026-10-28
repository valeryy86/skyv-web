import { Banner } from "@/src/features/home/components/Banner";
import { MarcasSeccion } from "@/src/features/home/components/MarcasSeccion";

// Las páginas solo COMPONEN: la lógica vive en src/features
export default function InicioPage() {
  return (
    <>
      <Banner />
      <MarcasSeccion />
    </>
  );
}
