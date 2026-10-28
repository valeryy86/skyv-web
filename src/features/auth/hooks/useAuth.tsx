"use client";

import { createContext, useCallback, useContext, useEffect, useMemo, useState, type ReactNode } from "react";
import { clearToken, getToken, isTokenExpired, setToken } from "@/src/features/common/session";
import * as authService from "../services/auth.service";
import type { AuthResponse, LoginRequest, RegisterRequest, User } from "../domain/types";

type Status = "loading" | "authenticated" | "guest";

interface AuthContextValue {
  user: User | null;
  status: Status;
  login: (data: LoginRequest) => Promise<User>;
  register: (data: RegisterRequest) => Promise<User>;
  logout: () => void;
}

const AuthContext = createContext<AuthContextValue | null>(null);

export function AuthProvider({ children }: { children: ReactNode }) {
  const [user, setUser] = useState<User | null>(null);
  const [status, setStatus] = useState<Status>("loading");

  
  useEffect(() => {
    const token = getToken();
    if (!token || isTokenExpired(token)) {
      clearToken();
      setStatus("guest");
      return;
    }
    authService
      .me()
      .then((u) => {
        setUser(u);
        setStatus("authenticated");
      })
      .catch(() => {
        clearToken();
        setUser(null);
        setStatus("guest");
      });
  }, []);

  const iniciarSesion = useCallback((respuesta: AuthResponse) => {
    setToken(respuesta.token);
    setUser(respuesta.user);
    setStatus("authenticated");
    return respuesta.user;
  }, []);

  const login = useCallback(
    async (data: LoginRequest) => iniciarSesion(await authService.login(data)),
    [iniciarSesion],
  );

  const register = useCallback(
    async (data: RegisterRequest) => iniciarSesion(await authService.register(data)),
    [iniciarSesion],
  );

  const logout = useCallback(() => {
    clearToken();
    setUser(null);
    setStatus("guest");
  }, []);

  const value = useMemo(
    () => ({ user, status, login, register, logout }),
    [user, status, login, register, logout],
  );

  return <AuthContext.Provider value={value}>{children}</AuthContext.Provider>;
}

export function useAuth(): AuthContextValue {
  const ctx = useContext(AuthContext);
  if (!ctx) {
    throw new Error("useAuth debe usarse dentro de <AuthProvider>");
  }
  return ctx;
}
