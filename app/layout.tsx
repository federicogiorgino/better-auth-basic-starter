import type { Metadata } from "next";
import { Geist, Geist_Mono, Inter, PT_Serif } from "next/font/google";
import "./globals.css";
import { AccomplishmentPanel } from "@/components/accomplishment-panel";
import { CategoryDeleteDialog } from "@/components/category-delete-modal";
import { CategoryPanel } from "@/components/category-panel";
import { Providers } from "@/components/providers";
import { Toaster } from "@/components/ui/sonner";
import { TooltipProvider } from "@/components/ui/tooltip";
import { cn } from "@/lib/utils";

const ptSerifHeading = PT_Serif({
  subsets: ["latin"],
  weight: ["400", "700"],
  variable: "--font-heading",
});

const inter = Inter({ subsets: ["latin"], variable: "--font-sans" });

const geistSans = Geist({
  variable: "--font-geist-sans",
  subsets: ["latin"],
});

const geistMono = Geist_Mono({
  variable: "--font-geist-mono",
  subsets: ["latin"],
});

export const metadata: Metadata = {
  title: "App Starter",
  description: "Next.js starter with Better Auth and Drizzle",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html
      lang="en"
      className={cn(
        "h-full",
        "antialiased",
        geistSans.variable,
        geistMono.variable,
        "font-sans",
        inter.variable,
        ptSerifHeading.variable,
      )}
    >
      <body>
        <Providers>
          <TooltipProvider>
            {children}
            <CategoryPanel />
            <AccomplishmentPanel />
            <CategoryDeleteDialog />

            <Toaster />
          </TooltipProvider>
        </Providers>
      </body>
    </html>
  );
}
