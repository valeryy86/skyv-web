import Image from "next/image";
import Link from "next/link";

export function Banner() {
  return (
    <section className="relative h-[420px] w-full sm:h-[530px]">
      <Image src="/img/FotoBanner.jpeg" alt="Productos de Sky V Cosmetics" fill priority className="object-cover" />
      <div className="absolute top-1/2 left-1/2 w-[90%] -translate-x-1/2 -translate-y-1/2 text-center sm:left-[10%] sm:w-auto sm:translate-x-0">
        <h1 className="text-4xl font-bold text-white [text-shadow:2px_2px_5px_var(--color-rosa)] sm:text-5xl">
          Sky V cosmetics
        </h1>
        <p className="mt-3 mb-8 text-xl text-white [text-shadow:2px_2px_5px_var(--color-rosa)]">
          Aquí podrás encontrar tus marcas favoritas y las más virales.
        </p>
        <Link
          href="#marcas"
          className="rounded-[20px] bg-white px-4 pt-2.5 pb-3.5 font-semibold text-rosa shadow-[2px_2px_5px_var(--color-rosa)] transition duration-500 hover:scale-105 hover:bg-rosa hover:text-white"
        >
          ¡Conócelas!
        </Link>
      </div>
    </section>
  );
}
