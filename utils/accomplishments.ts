import type {
  AccomplishmentListItem,
  AccomplishmentWithCategory,
  CreateAccomplishmentFormValues,
  EditingAccomplishment,
} from "@/types/accomplishment";
import { formatDayHeading, formatInputDate, toDate } from "./date";

export type AccomplishmentDayGroup = {
  date: string;
  heading: string;
  accomplishments: AccomplishmentWithCategory[];
};

export function groupAccomplishmentsByDate(
  accomplishments: AccomplishmentWithCategory[],
): AccomplishmentDayGroup[] {
  const groups = new Map<string, AccomplishmentDayGroup>();

  for (const accomplishment of accomplishments) {
    const group = groups.get(accomplishment.date);

    if (group) {
      group.accomplishments.push(accomplishment);
      continue;
    }

    groups.set(accomplishment.date, {
      date: accomplishment.date,
      heading: formatDayHeading(accomplishment.date),
      accomplishments: [accomplishment],
    });
  }

  return Array.from(groups.values());
}

export function toAccomplishmentWithCategory(
  item: AccomplishmentListItem,
): AccomplishmentWithCategory {
  return {
    id: item.id,
    userId: item.userId,
    categoryId: item.categoryId,
    title: item.title,
    date: item.date,
    impact: item.impact,
    notes: item.notes,
    link: item.link,
    createdAt: toDate(item.createdAt),
    updatedAt: toDate(item.updatedAt),
    category: {
      id: item.categoryId,
      name: item.categoryName,
      color: item.categoryColor,
    },
  };
}

export function toEditingAccomplishment(
  accomplishment: AccomplishmentWithCategory,
): EditingAccomplishment {
  return {
    id: accomplishment.id,
    title: accomplishment.title,
    date: accomplishment.date,
    categoryId: accomplishment.categoryId,
    impact: accomplishment.impact,
    notes: accomplishment.notes,
    link: accomplishment.link,
  };
}

export function getAccomplishmentFormDefaultValues(
  defaultValues?: EditingAccomplishment | null,
): CreateAccomplishmentFormValues {
  return {
    categoryId: defaultValues?.categoryId ?? "",
    title: defaultValues?.title ?? "",
    date: defaultValues?.date ?? formatInputDate(new Date()),
    impact: defaultValues?.impact ?? "",
    notes: defaultValues?.notes ?? "",
    link: defaultValues?.link ?? "",
  };
}
