import Image from "next/image";
import Link from "next/link";
import { marcasCapilares, marcasMaquillaje, type Marca } from "../data/marcas";

function GrupoMarcas({ titulo, marcas }: { titulo: string; marcas: Marca[] }) {
  return (
    <div className="mb-20">
      <h3 className="titulo-rosa mb-14 text-center text-3xl font-semibold">{titulo}</h3>
      <div className="grid grid-cols-2 gap-y-10 lg:grid-cols-4">
        {marcas.map((marca) => (
          <article key={marca.slug} className="justify-self-center text-center">
            <Link href={`/catalogo?marca=${marca.slug}`} aria-label={`Ver productos de ${marca.nombre}`}>
              <Image
                src={marca.logo}
                alt={`Logo ${marca.nombre}`}
                width={140}
                height={140}
                className="h-28 w-28 rounded-full border-[3px] border-rosa object-cover transition duration-300 hover:scale-110 hover:shadow-[0_0_15px_var(--color-rosa)] sm:h-36 sm:w-36"
              />
            </Link>
            <h4 className="mt-4 text-xl font-semibold text-rosa">{marca.nombre}</h4>
          </article>
        ))}
      </div>
    </div>
  );
}

export function MarcasSeccion() {
  return (
    <section id="marcas" className="mx-auto max-w-6xl scroll-mt-28 px-4 pt-20">
      <h2 className="titulo-rosa mb-16 text-center text-3xl font-semibold">Marcas que manejamos</h2>
      <GrupoMarcas titulo="Maquillaje" marcas={marcasMaquillaje} />
      <GrupoMarcas titulo="Capilares" marcas={marcasCapilares} />
    </section>
  );
}
