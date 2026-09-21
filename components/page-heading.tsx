import { Menu } from "lucide-react";

export function PageHeading({
  title,
  eyebrow,
  subtitle,
  onMenu,
}: {
  title: string;
  eyebrow?: string;
  subtitle: string;
  onMenu: () => void;
}) {
  return (
    <header className="flex items-start max-md:pt-14">
      <button
        className="hidden"
        type="button"
        onClick={onMenu}
        aria-label="Open menu"
      >
        <Menu size={20} />
      </button>
      <div>
        <p className="mb-3 text-xs font-bold uppercase tracking-widest text-muted-foreground">
          {eyebrow || "Your work"}
        </p>
        <h1 className="m-0 mb-3 font-serif text-6xl font-normal leading-none tracking-tight max-md:text-5xl">
          {title}
        </h1>
        <p className="m-0 font-serif text-base text-muted-foreground italic">
          {subtitle}
        </p>
      </div>
    </header>
  );
}
