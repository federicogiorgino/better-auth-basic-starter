"use client";
import { useRouter } from "next/navigation";
import { Button } from "@/components/ui/button";
import { authClient } from "@/lib/auth-client";

export function HomePageClient() {
  const router = useRouter();
  return (
    <Button
      onClick={() => {
        authClient.signOut(undefined, {
          onSuccess: () => router.refresh(),
        });
      }}
    >
      Logout
    </Button>
  );
}
