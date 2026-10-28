import type { ReactNode } from "react";

export function FormCard({ titulo, subtitulo, children }: { titulo: string; subtitulo?: string; children: ReactNode }) {
  return (
    <section className="mx-4 my-6 max-w-[650px] rounded-[20px] border border-borde-claro bg-white p-6 shadow-[0_5px_20px_rgba(255,151,189,0.25)] sm:mx-auto sm:p-9">
      <h1 className="mb-2 text-center text-3xl font-semibold text-rosa">{titulo}</h1>
      {subtitulo && <p className="mb-8 text-center text-gris">{subtitulo}</p>}
      {children}
    </section>
  );
}
