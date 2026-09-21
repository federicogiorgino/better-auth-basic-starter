import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";
import {
  createAccomplishment,
  deleteAccomplishment,
  fetchAccomplishments,
  updateAccomplishment,
} from "@/lib/api/accomplishments";
import type { AccomplishmentQuery } from "@/types/accomplishment";

export function useAccomplishments(query: Partial<AccomplishmentQuery>) {
  return useQuery({
    queryKey: ["accomplishments", query],
    queryFn: () => fetchAccomplishments(query),
    placeholderData: (prev) => prev, // keep old page visible while fetching next page
  });
}

export function useCreateAccomplishment() {
  const queryClient = useQueryClient();
  return useMutation({
    mutationFn: createAccomplishment,
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["accomplishments"] });
      queryClient.invalidateQueries({ queryKey: ["categories"] }); // count changed
    },
  });
}

export function useUpdateAccomplishment() {
  const queryClient = useQueryClient();
  return useMutation({
    mutationFn: ({
      id,
      ...input
    }: { id: string } & Parameters<typeof updateAccomplishment>[1]) =>
      updateAccomplishment(id, input),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["accomplishments"] });
      queryClient.invalidateQueries({ queryKey: ["categories"] });
    },
  });
}

export function useDeleteAccomplishment() {
  const queryClient = useQueryClient();
  return useMutation({
    mutationFn: deleteAccomplishment,
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["accomplishments"] });
      queryClient.invalidateQueries({ queryKey: ["categories"] });
    },
  });
}
