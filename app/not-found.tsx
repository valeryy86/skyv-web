import Link from "next/link";

export default function NotFound() {
  return (
    <section className="mx-auto max-w-xl px-4 text-center">
      <p className="titulo-rosa text-7xl font-bold">404</p>
      <h1 className="mt-4 text-2xl font-semibold text-rosa">Esta página no existe</h1>
      <p className="mt-2 text-gris">
        Puede que el enlace esté mal escrito o que la página se haya movido.
      </p>
      <Link
        href="/"
        className="mt-8 inline-block rounded-full bg-rosa px-6 py-3 font-semibold text-white transition hover:bg-rosa-hover"
      >
        Volver al inicio
      </Link>
    </section>
  );
}
