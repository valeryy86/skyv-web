import { GuestOnly } from "@/src/features/auth/components/GuestOnly";
import { RegisterForm } from "@/src/features/auth/components/RegisterForm";

export default function RegistroPage() {
  return (
    <GuestOnly>
      <RegisterForm />
    </GuestOnly>
  );
}
