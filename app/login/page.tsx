import { Suspense } from "react";
import { GuestOnly } from "@/src/features/auth/components/GuestOnly";
import { LoginForm } from "@/src/features/auth/components/LoginForm";
import { Cargando } from "@/src/features/common/components/EstadosUI";

export default function LoginPage() {
  return (
    <GuestOnly>
      <Suspense fallback={<Cargando />}>
        <LoginForm />
      </Suspense>
    </GuestOnly>
  );
}
