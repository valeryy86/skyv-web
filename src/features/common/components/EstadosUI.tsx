import { Button } from "./Button";


export function Cargando({ texto = "Cargando..." }: { texto?: string }) {
  return (
    <div className="flex flex-col items-center gap-3 py-16 text-rosa" role="status">
      <span className="h-10 w-10 animate-spin rounded-full border-4 border-borde-claro border-t-rosa" />
      <p className="font-semibold">{texto}</p>
    </div>
  );
}

export function Vacio({ texto }: { texto: string }) {
  return <p className="py-16 text-center text-lg text-gris">{texto}</p>;
}

export function ErrorMensaje({ texto, onReintentar }: { texto: string; onReintentar?: () => void }) {
  return (
    <div className="mx-auto my-10 max-w-md rounded-2xl border border-error/40 bg-white p-6 text-center" role="alert">
      <p className="mb-4 text-error">{texto}</p>
      {onReintentar && (
        <Button variante="secundario" onClick={onReintentar}>
          Reintentar
        </Button>
      )}
    </div>
  );
}
