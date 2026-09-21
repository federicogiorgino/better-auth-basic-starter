import { format, parse } from "date-fns";

export const DATE_FORMATS = {
  dayHeading: "EEEE d MMMM",
  input: "yyyy-MM-dd",
  long: "PPP",
  monthYear: "MMMM yyyy",
} as const;

const inputDatePattern = /^\d{4}-\d{2}-\d{2}$/;

export function formatDayHeading(date: Date | string) {
  return format(toDate(date), DATE_FORMATS.dayHeading);
}

export function formatInputDate(date: Date) {
  return format(date, DATE_FORMATS.input);
}

export function formatLongDate(date: Date | string) {
  return format(toDate(date), DATE_FORMATS.long);
}

export function formatMonthYear(date: Date | string) {
  return format(toDate(date), DATE_FORMATS.monthYear);
}

export function formatTime(date: Date | string) {
  return new Intl.DateTimeFormat("en", {
    hour: "numeric",
    minute: "2-digit",
  }).format(toDate(date));
}

export function toDate(date: Date | string) {
  if (typeof date === "string" && inputDatePattern.test(date)) {
    return parse(date, DATE_FORMATS.input, new Date());
  }

  return date instanceof Date ? date : new Date(date);
}
