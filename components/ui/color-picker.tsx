"use client";

import { forwardRef, useEffect, useMemo, useRef, useState } from "react";
import { HexColorPicker } from "react-colorful";
import type { ButtonProps } from "@/components/ui/button";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from "@/components/ui/popover";
import { cn } from "@/lib/utils";

export function useForwardedRef<T>(ref: React.ForwardedRef<T>) {
  const innerRef = useRef<T>(null);

  useEffect(() => {
    if (!ref) return;
    if (typeof ref === "function") {
      ref(innerRef.current);
    } else {
      ref.current = innerRef.current;
    }
  });

  return innerRef;
}

const PRESET_COLORS = [
  "#ef4444", // red
  "#f97316", // orange
  "#f59e0b", // amber
  "#eab308", // yellow
  "#84cc16", // lime
  "#22c55e", // green
  "#10b981", // emerald
  "#06b6d4", // cyan
  "#3b82f6", // blue
  "#6366f1", // indigo
  "#a855f7", // purple
  "#ec4899", // pink
];

interface ColorPickerProps {
  value: string;
  onChange: (value: string) => void;
  onBlur?: () => void;
}

const ColorPicker = forwardRef<
  HTMLInputElement,
  Omit<ButtonProps, "value" | "onChange" | "onBlur"> &
    ColorPickerProps &
    ButtonProps
>(
  (
    { disabled, value, onChange, onBlur, name, className, size, ...props },
    forwardedRef,
  ) => {
    const ref = useForwardedRef(forwardedRef);
    const [open, setOpen] = useState(false);
    const [mode, setMode] = useState<"presets" | "custom">("presets");

    const parsedValue = useMemo(() => {
      return value || "#FFFFFF";
    }, [value]);

    return (
      <Popover onOpenChange={setOpen} open={open}>
        <PopoverTrigger asChild disabled={disabled} onBlur={onBlur}>
          <Button
            {...props}
            className={cn("block", className)}
            name={name}
            onClick={() => {
              setOpen(true);
            }}
            size={size}
            style={{
              backgroundColor: parsedValue,
            }}
            variant="outline"
          >
            <div />
          </Button>
        </PopoverTrigger>
        <PopoverContent className="w-64 space-y-3">
          <div className="flex rounded-md border p-0.5 text-sm">
            <button
              type="button"
              onClick={() => setMode("presets")}
              className={cn(
                "flex-1 rounded-sm py-1 transition-colors",
                mode === "presets"
                  ? "bg-neutral-900 text-white dark:bg-white dark:text-neutral-900"
                  : "text-neutral-500 hover:text-neutral-900 dark:hover:text-white",
              )}
            >
              Presets
            </button>
            <button
              type="button"
              onClick={() => setMode("custom")}
              className={cn(
                "flex-1 rounded-sm py-1 transition-colors",
                mode === "custom"
                  ? "bg-neutral-900 text-white dark:bg-white dark:text-neutral-900"
                  : "text-neutral-500 hover:text-neutral-900 dark:hover:text-white",
              )}
            >
              Custom
            </button>
          </div>

          {mode === "presets" ? (
            <div className="grid grid-cols-6 gap-2 py-1">
              {PRESET_COLORS.map((color) => (
                <button
                  key={color}
                  type="button"
                  onClick={() => onChange(color)}
                  className={cn(
                    "h-7 w-7 rounded-full transition-transform hover:scale-110",
                    parsedValue.toLowerCase() === color.toLowerCase() &&
                      "ring-2 ring-offset-2 ring-neutral-900 dark:ring-offset-neutral-900 dark:ring-white",
                  )}
                  style={{ backgroundColor: color }}
                  aria-label={`Select color ${color}`}
                />
              ))}
            </div>
          ) : (
            <>
              <HexColorPicker color={parsedValue} onChange={onChange} />
              <Input
                maxLength={7}
                onChange={(e) => {
                  onChange(e?.currentTarget?.value);
                }}
                ref={ref}
                value={parsedValue}
              />
            </>
          )}
        </PopoverContent>
      </Popover>
    );
  },
);

ColorPicker.displayName = "ColorPicker";

export { ColorPicker };
