"use client";
import { useRouter } from "next/navigation";
import { Button } from "@/components/ui/button";
import { authClient } from "@/lib/auth-client";

export function LoginPageClient() {
  const router = useRouter();

  return (
    <Button
      onClick={() =>
        authClient.signIn.email(
          {
            email: "test@xyz.com",
            password: "1234567890",
          },
          {
            onSuccess: () => router.refresh(),
          },
        )
      }
    >
      Login
    </Button>
  );
}
