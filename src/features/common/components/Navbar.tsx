"use client";

import Image from "next/image";
import Link from "next/link";
import { usePathname, useRouter } from "next/navigation";
import { useState } from "react";
import { useAuth } from "@/src/features/auth/hooks/useAuth";

export function Navbar() {
  const { user, status, logout } = useAuth();
  const [abierto, setAbierto] = useState(false);
  const pathname = usePathname();
  const router = useRouter();

  const links = [
    { href: "/", texto: "Inicio" },
    { href: "/catalogo", texto: "Catálogo" },
    { href: "/pedido", texto: "Hacer pedido" },
    ...(user ? [{ href: "/mis-pedidos", texto: "Mis pedidos" }] : []),
    ...(user?.role === "admin" ? [{ href: "/admin", texto: "Administración" }] : []),
  ];

  function salir() {
    logout();
    setAbierto(false);
    router.push("/");
  }

  const claseLink = (href: string) =>
    `text-lg font-semibold transition hover:text-rosa-hover ${pathname === href ? "text-rosa-hover" : "text-rosa"}`;

  return (
    <header className="fixed inset-x-0 top-0 z-50 rounded-b-[10px] bg-fondo-header shadow-sm">
      <nav className="mx-auto flex max-w-7xl items-center justify-between px-4 py-2 sm:px-10">
        <Link href="/" aria-label="Ir al inicio">
          <Image
            src="/img/logoSkyV.jpeg"
            alt="Logo Sky V Cosmetics"
            width={80}
            height={80}
            className="h-16 w-16 rounded-full object-cover sm:h-20 sm:w-20"
            priority
          />
        </Link>

        {/* Botón hamburguesa (solo en móvil y tablet) */}
        <button
          className="text-3xl text-rosa lg:hidden"
          aria-label="Abrir menú"
          aria-expanded={abierto}
          onClick={() => setAbierto(!abierto)}
        >
          &#9776;
        </button>

        <div
          className={`${abierto ? "flex" : "hidden"} absolute inset-x-0 top-full flex-col items-center gap-5 border-t-2 border-rosa bg-fondo-header py-6 lg:static lg:flex lg:flex-row lg:gap-8 lg:border-0 lg:py-0`}
        >
          <ul className="flex flex-col items-center gap-5 lg:flex-row lg:gap-8">
            {links.map((link) => (
              <li key={link.href}>
                <Link href={link.href} className={claseLink(link.href)} onClick={() => setAbierto(false)}>
                  {link.texto}
                </Link>
              </li>
            ))}
          </ul>

          {/* Zona de sesión: cambia según invitado / usuario / admin */}
          <div className="flex items-center gap-3">
            {status === "loading" ? null : user ? (
              <>
                <span className="font-semibold text-gris-oscuro">Hola, {user.nombre.split(" ")[0]}</span>
                <button
                  onClick={salir}
                  className="rounded-full border-2 border-rosa px-4 py-1.5 font-semibold text-rosa transition hover:bg-rosa hover:text-white"
                >
                  Salir
                </button>
              </>
            ) : (
              <Link
                href="/login"
                onClick={() => setAbierto(false)}
                className="rounded-full bg-rosa px-5 py-2 font-semibold text-white transition hover:bg-rosa-hover"
              >
                Ingresar
              </Link>
            )}
          </div>
        </div>
      </nav>
    </header>
  );
}
