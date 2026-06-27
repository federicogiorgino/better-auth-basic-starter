"use client";

import { Button } from "@/components/ui/button";
import { authClient } from "@/lib/auth-client";

export function RegisterPageClient() {
  return (
    <Button
      onClick={() =>
        authClient.signUp.email({
          email: "test@xyz.com",
          password: "1234567890",
          name: "Test User",
        })
      }
    >
      Register
    </Button>
  );
}
