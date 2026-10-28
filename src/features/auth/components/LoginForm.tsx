"use client";

import Link from "next/link";
import { useRouter, useSearchParams } from "next/navigation";
import { useState, type FormEvent } from "react";
import { Button } from "@/src/features/common/components/Button";
import { FormCard } from "@/src/features/common/components/FormCard";
import { ErrorCampo, Input } from "@/src/features/common/components/Input";
import { ApiError } from "@/src/features/common/http";
import { useAuth } from "../hooks/useAuth";

type Errores = Partial<Record<"email" | "password" | "general", string>>;

// Solo se permite volver a rutas internas (evita redirecciones a otros sitios)
function destinoSeguro(next: string | null): string {
  return next && next.startsWith("/") && !next.startsWith("//") ? next : "/";
}

export function LoginForm() {
  const { login } = useAuth();
  const router = useRouter();
  const searchParams = useSearchParams();
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [errores, setErrores] = useState<Errores>({});
  const [enviando, setEnviando] = useState(false);

  const sesionExpirada = searchParams.get("expirada") === "1";

  function validar(): Errores {
    const e: Errores = {};
    if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email.trim())) e.email = "Ingrese un correo electrónico válido.";
    if (!password) e.password = "Ingrese su contraseña.";
    return e;
  }

  async function onSubmit(event: FormEvent<HTMLFormElement>) {
    event.preventDefault();
    const e = validar();
    setErrores(e);
    if (Object.keys(e).length > 0) return;

    setEnviando(true);
    try {
      await login({ email: email.trim(), password });
      router.replace(destinoSeguro(searchParams.get("next")));
    } catch (error) {
      if (error instanceof ApiError) {
        // 400: errores por campo | 401: credenciales incorrectas (mensaje genérico)
        setErrores({ ...error.fieldErrors, general: Object.keys(error.fieldErrors).length ? undefined : error.message });
      } else {
        setErrores({ general: "Ocurrió un error inesperado" });
      }
    } finally {
      setEnviando(false);
    }
  }

  return (
    <FormCard titulo="Iniciar sesión" subtitulo="Ingresa para hacer pedidos y ver tu historial.">
      {sesionExpirada && (
        <p className="mb-6 rounded-xl border border-exito-borde bg-exito-fondo p-3 text-center text-gris-oscuro">
          Tu sesión expiró. Inicia sesión de nuevo.
        </p>
      )}
      <form onSubmit={onSubmit} noValidate>
        <Input label="Correo electrónico" name="email" type="email" autoComplete="email" value={email} onChange={(e) => setEmail(e.target.value)} error={errores.email} />
        <Input label="Contraseña" name="password" type="password" autoComplete="current-password" value={password} onChange={(e) => setPassword(e.target.value)} error={errores.password} />
        <ErrorCampo mensaje={errores.general} />
        <Button type="submit" disabled={enviando} className="mt-2 w-full">
          {enviando ? "Ingresando..." : "Ingresar"}
        </Button>
      </form>
      <p className="mt-6 text-center text-gris">
        ¿No tienes cuenta?{" "}
        <Link href="/registro" className="font-semibold text-rosa hover:text-rosa-hover">
          Regístrate
        </Link>
      </p>
    </FormCard>
  );
}
