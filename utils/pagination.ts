import { clampNumber } from "./numbers";

export const PAGE_SIZE_VALUES = [8, 16, 32, 64] as const;

export function getPreviousPage(page: number) {
  return clampNumber(page - 1, 1, Number.MAX_SAFE_INTEGER);
}

export function getDisplayPageCount(totalPages: number) {
  return clampNumber(totalPages, 1, Number.MAX_SAFE_INTEGER);
}

export function getPaginationRange({
  page,
  pageSize,
  total,
}: {
  page: number;
  pageSize: number;
  total: number;
}) {
  return {
    start: (page - 1) * pageSize + 1,
    end: Math.min(page * pageSize, total),
  };
}
