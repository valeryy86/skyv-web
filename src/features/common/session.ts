const COOKIE = "skyv_token";
const UN_DIA = 60 * 60 * 24;

export function getToken(): string | null {
  if (typeof document === "undefined") return null;
  const match = document.cookie.match(new RegExp(`(?:^|; )${COOKIE}=([^;]*)`));
  return match ? decodeURIComponent(match[1]) : null;
}

export function setToken(token: string): void {
  const segura = window.location.protocol === "https:" ? "; Secure" : "";
  document.cookie = `${COOKIE}=${encodeURIComponent(token)}; path=/; max-age=${UN_DIA}; SameSite=Lax${segura}`;
}

export function clearToken(): void {
  document.cookie = `${COOKIE}=; path=/; max-age=0; SameSite=Lax`;
}

export interface TokenPayload {
  id: number;
  role: "admin" | "user";
  exp?: number;
}


export function decodeToken(token: string): TokenPayload | null {
  try {
    const base64 = token.split(".")[1].replace(/-/g, "+").replace(/_/g, "/");
    const relleno = base64 + "=".repeat((4 - (base64.length % 4)) % 4);
    return JSON.parse(atob(relleno)) as TokenPayload;
  } catch {
    return null;
  }
}

export function isTokenExpired(token: string): boolean {
  const payload = decodeToken(token);
  if (!payload) return true;
  return typeof payload.exp === "number" && payload.exp * 1000 < Date.now();
}
