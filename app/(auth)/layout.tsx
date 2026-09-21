import { NotebookPen } from "lucide-react";
import Image from "next/image";
import Link from "next/link";

export default function Layout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <div className="grid min-h-svh lg:grid-cols-2">
      <div className="flex flex-col gap-4 bg-white p-6 dark:bg-black md:p-10">
        <div className="flex justify-center md:justify-start">
          <Link href="/" className="flex items-center gap-2">
            <span className="grid size-7 place-items-center rounded-md bg-sidebar-primary text-sidebar-primary-foreground">
              <NotebookPen size={16} />
            </span>
            <span className="text-xs font-bold tracking-widest">
              TRACENOTES
            </span>
          </Link>
        </div>
        <div className="flex flex-1 items-center justify-center">
          <div className="flex w-full max-w-xs flex-col gap-8">
            <div>
              <p className="mb-3 text-xs font-bold tracking-widest text-muted-foreground uppercase">
                Small notes
              </p>
              <h1 className="font-serif text-4xl leading-tight tracking-tight">
                Clearer progress.
              </h1>
            </div>
            {children}
          </div>
        </div>
      </div>
      <div className="relative hidden bg-muted lg:block">
        <Image
          src="/auth-bg.png"
          alt="work"
          fill
          sizes="50vw"
          className="object-cover dark:brightness-25 dark:grayscale"
        />
        <div className="auth-image-overlay absolute inset-0" />
      </div>
    </div>
  );
}
