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
    <header className="flex items-start max-[800px]:pt-13.5">
      <button
        className="hidden"
        type="button"
        onClick={onMenu}
        aria-label="Open menu"
      >
        <Menu size={20} />
      </button>
      <div>
        <p className="mb-3 text-[10px] font-bold uppercase tracking-[0.16em] text-muted-foreground">
          {eyebrow || "Your work"}
        </p>
        <h1 className="m-0 mb-3 font-serif text-[clamp(40px,5vw,61px)] font-normal leading-none tracking-[-0.045em] max-[800px]:text-[45px]">
          {title}
        </h1>
        <p className="m-0 font-serif text-base text-muted-foreground italic">
          {subtitle}
        </p>
      </div>
    </header>
  );
}
