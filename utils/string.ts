export function pluralize(
  count: number,
  singular: string,
  plural = `${singular}s`,
) {
  return count === 1 ? singular : plural;
}

export function formatCountLabel(
  count: number,
  singular: string,
  plural?: string,
) {
  return `${count} ${pluralize(count, singular, plural)}`;
}
