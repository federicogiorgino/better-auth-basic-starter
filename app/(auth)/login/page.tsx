import { redirect } from "next/navigation";
import { getServerSession } from "@/lib/get-server-session";
import { LoginPageClient } from "./client";

export default async function LoginPage() {
  const session = await getServerSession();

  if (session) redirect("/");
  return <LoginPageClient />;
}
