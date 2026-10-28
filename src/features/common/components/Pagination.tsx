import Link from "next/link";

interface PaginationProps {
  page: number;
  totalPages: number;
  hrefFor: (page: number) => string; // cómo armar la URL de cada página (?page=2)
}

// Paginación por URL: cada botón es un enlace a ?page=N
export function Pagination({ page, totalPages, hrefFor }: PaginationProps) {
  if (totalPages <= 1) return null;
  const paginas = Array.from({ length: totalPages }, (_, i) => i + 1);
  const boton = "min-w-10 rounded-full border-2 border-rosa px-3 py-1.5 text-center font-semibold transition";

  return (
    <nav aria-label="Paginación" className="mt-10 flex flex-wrap items-center justify-center gap-2">
      {page > 1 ? (
        <Link href={hrefFor(page - 1)} className={`${boton} bg-white text-rosa hover:bg-rosa hover:text-white`}>
          Anterior
        </Link>
      ) : (
        <span className={`${boton} cursor-not-allowed bg-white text-rosa opacity-40`}>Anterior</span>
      )}

      {paginas.map((n) => (
        <Link
          key={n}
          href={hrefFor(n)}
          aria-current={n === page ? "page" : undefined}
          className={`${boton} ${n === page ? "bg-rosa text-white" : "bg-white text-rosa hover:bg-rosa hover:text-white"}`}
        >
          {n}
        </Link>
      ))}

      {page < totalPages ? (
        <Link href={hrefFor(page + 1)} className={`${boton} bg-white text-rosa hover:bg-rosa hover:text-white`}>
          Siguiente
        </Link>
      ) : (
        <span className={`${boton} cursor-not-allowed bg-white text-rosa opacity-40`}>Siguiente</span>
      )}
    </nav>
  );
}
