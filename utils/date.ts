import {
  addMonths,
  eachDayOfInterval,
  endOfMonth,
  endOfWeek,
  format,
  parse,
  startOfMonth,
  startOfWeek,
} from "date-fns";

export const DATE_FORMATS = {
  dayHeading: "EEEE d MMMM",
  input: "yyyy-MM-dd",
  long: "PPP",
  monthName: "MMMM",
  monthYear: "MMMM yyyy",
  shortMonthDay: "MMMM d",
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

export function formatMonthName(date: Date | string) {
  return format(toDate(date), DATE_FORMATS.monthName);
}

export function formatShortMonthDay(date: Date | string) {
  return format(toDate(date), DATE_FORMATS.shortMonthDay);
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

export function getMonthDate(year: number, month: number) {
  return new Date(year, month - 1, 1);
}

export function getAdjacentMonth(date: Date | string, offset: number) {
  return addMonths(toDate(date), offset);
}

export function getMonthDateRange(date: Date | string) {
  const monthDate = toDate(date);

  return {
    start: formatInputDate(startOfMonth(monthDate)),
    end: formatInputDate(endOfMonth(monthDate)),
  };
}

export function getCalendarGridDates(date: Date | string) {
  const monthDate = toDate(date);

  return eachDayOfInterval({
    start: startOfWeek(startOfMonth(monthDate), { weekStartsOn: 1 }),
    end: endOfWeek(endOfMonth(monthDate), { weekStartsOn: 1 }),
  });
}
