import type { InputHTMLAttributes, SelectHTMLAttributes, TextareaHTMLAttributes } from "react";

const base =
  "w-full rounded-[10px] border bg-white p-3 text-base outline-none transition focus:border-rosa focus:shadow-[0_0_6px_rgba(255,151,189,0.3)]";

function clases(error?: string) {
  return `${base} ${error ? "border-error" : "border-input-borde"}`;
}

export function ErrorCampo({ mensaje, id }: { mensaje?: string; id?: string }) {
  return (
    <span id={id} className="mt-1 block min-h-[18px] text-[13px] text-error" role={mensaje ? "alert" : undefined}>
      {mensaje ?? ""}
    </span>
  );
}

interface CampoBase {
  label: string;
  name: string;
  error?: string;
}

export function Input({ label, name, error, ...props }: CampoBase & InputHTMLAttributes<HTMLInputElement>) {
  return (
    <div className="mb-3">
      <label htmlFor={name} className="mb-2 block font-semibold text-gris-oscuro">
        {label}
      </label>
      <input
        id={name}
        name={name}
        aria-invalid={Boolean(error)}
        aria-describedby={`error-${name}`}
        className={clases(error)}
        {...props}
      />
      <ErrorCampo id={`error-${name}`} mensaje={error} />
    </div>
  );
}

export function Select({
  label,
  name,
  error,
  children,
  ...props
}: CampoBase & SelectHTMLAttributes<HTMLSelectElement>) {
  return (
    <div className="mb-3">
      <label htmlFor={name} className="mb-2 block font-semibold text-gris-oscuro">
        {label}
      </label>
      <select id={name} name={name} aria-invalid={Boolean(error)} className={clases(error)} {...props}>
        {children}
      </select>
      <ErrorCampo mensaje={error} />
    </div>
  );
}

export function Textarea({ label, name, error, ...props }: CampoBase & TextareaHTMLAttributes<HTMLTextAreaElement>) {
  return (
    <div className="mb-3">
      <label htmlFor={name} className="mb-2 block font-semibold text-gris-oscuro">
        {label}
      </label>
      <textarea id={name} name={name} aria-invalid={Boolean(error)} className={`${clases(error)} resize-y`} {...props} />
      <ErrorCampo mensaje={error} />
    </div>
  );
}
