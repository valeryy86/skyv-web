"use client";

import Link from "next/link";
import { useRouter } from "next/navigation";
import { useState, type FormEvent } from "react";
import { Button } from "@/src/features/common/components/Button";
import { FormCard } from "@/src/features/common/components/FormCard";
import { ErrorCampo, Input } from "@/src/features/common/components/Input";
import { ApiError } from "@/src/features/common/http";
import { useAuth } from "../hooks/useAuth";

type Campo = "nombre" | "email" | "password" | "confirmar" | "general";
type Errores = Partial<Record<Campo, string>>;

export function RegisterForm() {
  const { register } = useAuth();
  const router = useRouter();
  const [form, setForm] = useState({ nombre: "", email: "", password: "", confirmar: "" });
  const [errores, setErrores] = useState<Errores>({});
  const [enviando, setEnviando] = useState(false);

  function cambiar(campo: keyof typeof form, valor: string) {
    setForm((f) => ({ ...f, [campo]: valor }));
  }

  function validar(): Errores {
    const e: Errores = {};
    if (form.nombre.trim().length < 3) e.nombre = "El nombre debe tener al menos 3 caracteres.";
    if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(form.email.trim())) e.email = "Ingrese un correo electrónico válido.";
    if (form.password.length < 8) e.password = "La contraseña debe tener al menos 8 caracteres.";
    if (form.confirmar !== form.password) e.confirmar = "Las contraseñas no coinciden.";
    return e;
  }

  async function onSubmit(event: FormEvent<HTMLFormElement>) {
    event.preventDefault();
    const e = validar();
    setErrores(e);
    if (Object.keys(e).length > 0) return;

    setEnviando(true);
    try {
      await register({ nombre: form.nombre.trim(), email: form.email.trim(), password: form.password });
      router.replace("/");
    } catch (error) {
      if (error instanceof ApiError) {
        // 409 => { errors: { email: "Este correo ya está registrado" } } se muestra bajo el campo email
        const porCampo = error.fieldErrors;
        setErrores({ ...porCampo, general: Object.keys(porCampo).length ? undefined : error.message });
      } else {
        setErrores({ general: "Ocurrió un error inesperado" });
      }
    } finally {
      setEnviando(false);
    }
  }

  return (
    <FormCard titulo="Crear cuenta" subtitulo="Completa los siguientes datos para registrarte.">
      <form onSubmit={onSubmit} noValidate>
        <Input label="Nombre completo" name="nombre" autoComplete="name" value={form.nombre} onChange={(e) => cambiar("nombre", e.target.value)} error={errores.nombre} />
        <Input label="Correo electrónico" name="email" type="email" autoComplete="email" value={form.email} onChange={(e) => cambiar("email", e.target.value)} error={errores.email} />
        <Input label="Contraseña" name="password" type="password" autoComplete="new-password" value={form.password} onChange={(e) => cambiar("password", e.target.value)} error={errores.password} />
        <Input label="Confirmar contraseña" name="confirmar" type="password" autoComplete="new-password" value={form.confirmar} onChange={(e) => cambiar("confirmar", e.target.value)} error={errores.confirmar} />
        <ErrorCampo mensaje={errores.general} />
        <Button type="submit" disabled={enviando} className="mt-2 w-full">
          {enviando ? "Creando cuenta..." : "Registrarse"}
        </Button>
      </form>
      <p className="mt-6 text-center text-gris">
        ¿Ya tienes cuenta?{" "}
        <Link href="/login" className="font-semibold text-rosa hover:text-rosa-hover">
          Inicia sesión
        </Link>
      </p>
    </FormCard>
  );
}
