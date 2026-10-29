import { NextResponse, type NextRequest } from "next/server";


const RUTAS_PRIVADAS = ["/pedido", "/mis-pedidos"];
const RUTAS_ADMIN = ["/admin"];
const RUTAS_INVITADO = ["/login", "/registro"];

interface Sesion {
  role: string;
}

function leerSesion(request: NextRequest): Sesion | null {
  const token = request.cookies.get("skyv_token")?.value;
  if (!token) return null;
  try {
    const base64 = token.split(".")[1].replace(/-/g, "+").replace(/_/g, "/");
    const payload = JSON.parse(atob(base64 + "=".repeat((4 - (base64.length % 4)) % 4))) as {
      role?: string;
      exp?: number;
    };
    if (typeof payload.exp === "number" && payload.exp * 1000 < Date.now()) return null;
    return { role: payload.role ?? "user" };
  } catch {
    return null;
  }
}

function coincide(pathname: string, rutas: string[]) {
  return rutas.some((ruta) => pathname === ruta || pathname.startsWith(`${ruta}/`));
}

export function proxy(request: NextRequest) {
  const { pathname } = request.nextUrl;
  const sesion = leerSesion(request);

  if (!sesion && (coincide(pathname, RUTAS_PRIVADAS) || coincide(pathname, RUTAS_ADMIN))) {
    const url = new URL("/login", request.url);
    url.searchParams.set("next", pathname);
    return NextResponse.redirect(url);
  }

  if (sesion && sesion.role !== "admin" && coincide(pathname, RUTAS_ADMIN)) {
    return NextResponse.redirect(new URL("/", request.url));
  }

  if (sesion && coincide(pathname, RUTAS_INVITADO)) {
    return NextResponse.redirect(new URL("/", request.url));
  }

  return NextResponse.next();
}

export const config = {
  matcher: ["/pedido/:path*", "/mis-pedidos/:path*", "/admin/:path*", "/login", "/registro"],
};
