"use client";

import {
  ArrowRight,
  Bell,
  Check,
  CircleHelp,
  Download,
  Keyboard,
  Lock,
  LogOut,
  Moon,
  Settings,
  Sparkles,
  Sun,
} from "lucide-react";
import Link from "next/link";
import { useRouter } from "next/navigation";
import { useTheme } from "next-themes";
import { useEffect, useMemo, useState } from "react";
import { PageHeading } from "@/components/page-heading";
import { Button } from "@/components/ui/button";
import {
  Select,
  SelectContent,
  SelectGroup,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { useAccomplishments } from "@/hooks/use-accomplishments";
import { useCategories } from "@/hooks/use-categories";
import { authClient } from "@/lib/auth-client";
import { cn } from "@/lib/utils";

const themeOptions = [
  {
    value: "light",
    label: "Light",
    icon: Sun,
  },
  {
    value: "dark",
    label: "Dark",
    icon: Moon,
  },
  {
    value: "system",
    label: "System",
    icon: Settings,
  },
];

export function SettingsPageClient() {
  const router = useRouter();
  const [mounted, setMounted] = useState(false);
  const [isSigningOut, setIsSigningOut] = useState(false);
  const [reminders, setReminders] = useState(true);
  const [weeklyReview, setWeeklyReview] = useState(true);
  const [privateMode, setPrivateMode] = useState(false);
  const [weekStarts, setWeekStarts] = useState("Monday");
  const [defaultCategory, setDefaultCategory] = useState("");
  const { theme = "system", setTheme } = useTheme();
  const { data: categories = [] } = useCategories();
  const { data: accomplishments } = useAccomplishments({
    page: 1,
    pageSize: 100,
    sortBy: "date",
    sortOrder: "desc",
  });

  useEffect(() => {
    setMounted(true);
  }, []);

  useEffect(() => {
    if (!defaultCategory && categories[0]) {
      setDefaultCategory(categories[0].id);
    }
  }, [categories, defaultCategory]);

  const exportPayload = useMemo(
    () => ({
      exportedAt: new Date().toISOString(),
      categories,
      accomplishments: accomplishments?.data ?? [],
    }),
    [accomplishments, categories],
  );

  function exportTracenotes() {
    const blob = new Blob([JSON.stringify(exportPayload, null, 2)], {
      type: "application/json",
    });
    const url = URL.createObjectURL(blob);
    const link = document.createElement("a");

    link.href = url;
    link.download = "tracenotes-export.json";
    link.click();
    URL.revokeObjectURL(url);
  }

  function signOut() {
    setIsSigningOut(true);
    authClient.signOut({
      fetchOptions: {
        onSuccess: () => {
          router.push("/login");
          router.refresh();
        },
        onError: () => {
          setIsSigningOut(false);
        },
      },
    });
  }

  return (
    <div className="flex flex-col gap-4">
      <PageHeading
        eyebrow="Workspace"
        title="Settings"
        subtitle="Small choices for Tracenotes."
        onMenu={() => {}}
      />

      <div className="mt-9 max-w-3xl">
        <div className="flex items-center justify-between gap-5 border-b py-6 max-md:flex-col max-md:items-start">
          <div className="flex items-start gap-3">
            <span className="grid size-9 place-items-center rounded-full bg-muted text-muted-foreground">
              <Settings size={16} />
            </span>
            <div>
              <h2 className="mb-1 font-serif text-xl leading-tight tracking-tight">
                Your workspace
              </h2>
              <p className="text-sm leading-6 text-muted-foreground">
                Small notes. Clearer progress.
              </p>
            </div>
          </div>

          <span className="inline-flex items-center gap-1.5 rounded-full bg-muted px-3 py-1.5 text-xs text-muted-foreground">
            <Check size={13} />
            Up to date
          </span>
        </div>

        <SettingsSection eyebrow="Appearance">
          <SettingLine
            title="Theme"
            description="Choose how Tracenotes looks on your screen."
          >
            <div className="flex border p-1">
              {themeOptions.map((option) => {
                const Icon = option.icon;
                const active = mounted && theme === option.value;

                return (
                  <button
                    key={option.value}
                    type="button"
                    className={cn(
                      "inline-flex h-8 items-center gap-1.5 px-2.5 text-xs text-muted-foreground transition-colors hover:text-foreground",
                      active && "bg-muted text-foreground",
                    )}
                    onClick={() => setTheme(option.value)}
                  >
                    <Icon size={15} />
                    {option.label}
                  </button>
                );
              })}
            </div>
          </SettingLine>

          <SettingLine
            title="Week starts on"
            description="Used for your calendar and weekly reviews."
          >
            <Select value={weekStarts} onValueChange={setWeekStarts}>
              <SelectTrigger className="w-36">
                <SelectValue />
              </SelectTrigger>
              <SelectContent>
                <SelectGroup>
                  <SelectItem value="Monday">Monday</SelectItem>
                  <SelectItem value="Sunday">Sunday</SelectItem>
                </SelectGroup>
              </SelectContent>
            </Select>
          </SettingLine>
        </SettingsSection>

        <SettingsSection eyebrow="Capture">
          <SettingLine
            title="Default category"
            description="Pre-select an area when you add a new accomplishment."
          >
            <Select
              value={defaultCategory}
              onValueChange={setDefaultCategory}
              disabled={categories.length === 0}
            >
              <SelectTrigger className="w-44">
                <SelectValue placeholder="Select category" />
              </SelectTrigger>
              <SelectContent>
                <SelectGroup>
                  {categories.map((category) => (
                    <SelectItem key={category.id} value={category.id}>
                      {category.name}
                    </SelectItem>
                  ))}
                </SelectGroup>
              </SelectContent>
            </Select>
          </SettingLine>

          <SettingToggle
            icon={Bell}
            title="Gentle reminders"
            description="Keep a small nudge available at the end of your day."
            checked={reminders}
            onCheckedChange={setReminders}
          />

          <SettingToggle
            icon={Sparkles}
            title="Weekly review prompt"
            description="Show a prompt to reflect on your week every Friday."
            checked={weeklyReview}
            onCheckedChange={setWeeklyReview}
          />
        </SettingsSection>

        <SettingsSection eyebrow="Privacy & data">
          <SettingToggle
            icon={Lock}
            title="Private mode"
            description="Hide accomplishment details in previews and shared views."
            checked={privateMode}
            onCheckedChange={setPrivateMode}
          />

          <SettingLine
            icon={Download}
            title="Backup your work"
            description="Download a copy of your entries as a portable JSON file."
          >
            <Button type="button" variant="ghost" onClick={exportTracenotes}>
              Export
              <Download data-icon="inline-end" />
            </Button>
          </SettingLine>
        </SettingsSection>

        <SettingsSection eyebrow="Workspace">
          <SettingLine
            title="Categories"
            description="Manage the colors and areas used in your journal."
          >
            <Button variant="ghost" asChild>
              <Link href="/categories">
                Manage
                <ArrowRight data-icon="inline-end" />
              </Link>
            </Button>
          </SettingLine>

          <SettingLine
            icon={Keyboard}
            title="Keyboard shortcuts"
            description="Press N anywhere to quickly add an accomplishment."
          >
            <span className="border bg-muted px-2 py-1 font-mono text-xs text-muted-foreground">
              N
            </span>
          </SettingLine>
        </SettingsSection>

        <SettingsSection eyebrow="Account">
          <SettingLine
            icon={LogOut}
            title="Sign out"
            description="Leave this Tracenotes session on this device."
          >
            <Button
              type="button"
              variant="outline"
              onClick={signOut}
              disabled={isSigningOut}
            >
              {isSigningOut ? "Signing out..." : "Sign out"}
              <LogOut data-icon="inline-end" />
            </Button>
          </SettingLine>
        </SettingsSection>

        <div className="mt-7 flex items-start gap-3 text-muted-foreground">
          <CircleHelp size={18} />
          <div>
            <h3 className="mb-1 font-serif text-base leading-tight tracking-tight text-foreground">
              About Tracenotes
            </h3>
            <p className="text-sm leading-6">Small notes. Clearer progress.</p>
          </div>
        </div>
      </div>
    </div>
  );
}

function SettingsSection({
  eyebrow,
  children,
}: {
  eyebrow: string;
  children: React.ReactNode;
}) {
  return (
    <section className="border-b py-7">
      <p className="mb-2 text-xs font-bold tracking-widest text-muted-foreground uppercase">
        {eyebrow}
      </p>
      <div>{children}</div>
    </section>
  );
}

function SettingLine({
  title,
  description,
  children,
  icon: Icon,
}: {
  title: string;
  description: string;
  children: React.ReactNode;
  icon?: React.ComponentType<{ size?: number; className?: string }>;
}) {
  return (
    <div className="flex items-center justify-between gap-6 py-5 max-md:flex-col max-md:items-start">
      <div className="flex items-start gap-3">
        {Icon && (
          <Icon
            size={17}
            className="mt-1 shrink-0 text-muted-foreground"
            aria-hidden="true"
          />
        )}
        <div>
          <h3 className="mb-1 font-serif text-lg leading-tight tracking-tight">
            {title}
          </h3>
          <p className="max-w-xl text-sm leading-6 text-muted-foreground">
            {description}
          </p>
        </div>
      </div>
      <div className="shrink-0">{children}</div>
    </div>
  );
}

function SettingToggle({
  icon,
  title,
  description,
  checked,
  onCheckedChange,
}: {
  icon: React.ComponentType<{ size?: number; className?: string }>;
  title: string;
  description: string;
  checked: boolean;
  onCheckedChange: (checked: boolean) => void;
}) {
  return (
    <SettingLine icon={icon} title={title} description={description}>
      <button
        type="button"
        role="switch"
        aria-checked={checked}
        className={cn(
          "flex h-7 w-12 items-center border p-1 transition-colors",
          checked ? "bg-foreground" : "bg-transparent",
        )}
        onClick={() => onCheckedChange(!checked)}
      >
        <span
          className={cn(
            "size-4 bg-muted transition-transform",
            checked && "translate-x-5 bg-background",
          )}
        />
      </button>
    </SettingLine>
  );
}
