import { http } from "@/src/features/common/http";
import type { AuthResponse, LoginRequest, RegisterRequest, User } from "../domain/types";

export function login(data: LoginRequest): Promise<AuthResponse> {
  return http<AuthResponse>("/auth/login", { method: "POST", body: data });
}

export function register(data: RegisterRequest): Promise<AuthResponse> {
  return http<AuthResponse>("/auth/register", { method: "POST", body: data });
}

export function me(): Promise<User> {
  return http<User>("/auth/me");
}
