import type { ButtonHTMLAttributes } from "react";

type Variante = "primario" | "secundario" | "peligro";

interface ButtonProps extends ButtonHTMLAttributes<HTMLButtonElement> {
  variante?: Variante;
}

const estilos: Record<Variante, string> = {
  primario: "bg-rosa text-white border-rosa hover:bg-rosa-hover hover:border-rosa-hover",
  secundario: "bg-white text-rosa border-rosa hover:bg-rosa hover:text-white",
  peligro: "bg-white text-error border-error hover:bg-error hover:text-white",
};

export function Button({ variante = "primario", className = "", ...props }: ButtonProps) {
  return (
    <button
      className={`rounded-full border-2 px-6 py-2.5 font-semibold transition disabled:cursor-not-allowed disabled:opacity-60 ${estilos[variante]} ${className}`}
      {...props}
    />
  );
}
