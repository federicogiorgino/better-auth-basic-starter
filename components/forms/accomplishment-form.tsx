"use client";

import { zodResolver } from "@hookform/resolvers/zod";
import { CalendarIcon } from "lucide-react";
import { useEffect } from "react";
import { Controller, useForm } from "react-hook-form";
import { toast } from "sonner";
import {
  FormActions,
  FormGrid,
  FormShell,
} from "@/components/forms/form-layout";
import { Button } from "@/components/ui/button";
import { Calendar } from "@/components/ui/calendar";
import { Field, FieldError, FieldLabel } from "@/components/ui/field";
import { Input } from "@/components/ui/input";
import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from "@/components/ui/popover";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { Textarea } from "@/components/ui/textarea";
import {
  useCreateAccomplishment,
  useUpdateAccomplishment,
} from "@/hooks/use-accomplishments";
import { useCategories } from "@/hooks/use-categories";
import { cn } from "@/lib/utils";
import { createAccomplishmentSchema } from "@/schemas/accomplishement";
import type {
  CreateAccomplishmentFormValues,
  EditingAccomplishment,
} from "@/types/accomplishment";
import { getAccomplishmentFormDefaultValues } from "@/utils/accomplishments";
import { formatInputDate, formatLongDate, toDate } from "@/utils/date";

type AccomplishmentFormProps = {
  defaultValues?: EditingAccomplishment | null;
  onSuccess: () => void;
};

export function AccomplishmentForm({
  defaultValues,
  onSuccess,
}: AccomplishmentFormProps) {
  const isEditing = Boolean(defaultValues);

  const { data: categories } = useCategories();
  const createAccomplishment = useCreateAccomplishment();
  const updateAccomplishment = useUpdateAccomplishment();
  const isPending =
    createAccomplishment.isPending || updateAccomplishment.isPending;

  const form = useForm<CreateAccomplishmentFormValues>({
    resolver: zodResolver(createAccomplishmentSchema),
    defaultValues: getAccomplishmentFormDefaultValues(defaultValues),
    mode: "onChange",
  });

  useEffect(() => {
    form.reset(getAccomplishmentFormDefaultValues(defaultValues));
  }, [defaultValues, form]);

  function onSubmit(values: CreateAccomplishmentFormValues) {
    if (isEditing && defaultValues) {
      updateAccomplishment.mutate(
        { id: defaultValues.id, ...values },
        {
          onSuccess: () => onSuccess(),
          onError: (error) => {
            toast.error(
              error instanceof Error
                ? error.message
                : "Failed to update accomplishment.",
            );
          },
        },
      );
    } else {
      createAccomplishment.mutate(values, {
        onSuccess: () => {
          form.reset();
          onSuccess();
        },
        onError: (error) => {
          toast.error(
            error instanceof Error
              ? error.message
              : "Failed to create accomplishment.",
          );
        },
      });
    }
  }

  return (
    <form onSubmit={form.handleSubmit(onSubmit)} className="w-full">
      <FormShell>
        <Controller
          name="title"
          control={form.control}
          render={({ field, fieldState }) => (
            <Field data-invalid={fieldState.invalid}>
              <FieldLabel htmlFor={field.name}>Title</FieldLabel>
              <Input
                {...field}
                id={field.name}
                type="text"
                aria-invalid={fieldState.invalid}
                placeholder="e.g. Shipped the new onboarding flow"
                autoComplete="off"
                autoFocus
              />
              {fieldState.invalid && <FieldError errors={[fieldState.error]} />}
            </Field>
          )}
        />

        <FormGrid>
          <Controller
            name="date"
            control={form.control}
            render={({ field, fieldState }) => (
              <Field data-invalid={fieldState.invalid}>
                <FieldLabel htmlFor={field.name}>Date</FieldLabel>
                <Popover>
                  <PopoverTrigger asChild>
                    <Button
                      id={field.name}
                      type="button"
                      variant="outline"
                      aria-invalid={fieldState.invalid}
                      className={cn(
                        "w-full justify-start text-left font-normal",
                        !field.value && "text-muted-foreground",
                      )}
                    >
                      <CalendarIcon />
                      {field.value
                        ? formatLongDate(field.value)
                        : "Pick a date"}
                    </Button>
                  </PopoverTrigger>
                  <PopoverContent className="w-auto p-0" align="start">
                    <Calendar
                      mode="single"
                      selected={field.value ? toDate(field.value) : undefined}
                      onSelect={(date) =>
                        field.onChange(date ? formatInputDate(date) : "")
                      }
                      autoFocus
                    />
                  </PopoverContent>
                </Popover>
                {fieldState.invalid && (
                  <FieldError errors={[fieldState.error]} />
                )}
              </Field>
            )}
          />

          <Controller
            name="categoryId"
            control={form.control}
            render={({ field, fieldState }) => (
              <Field data-invalid={fieldState.invalid}>
                <FieldLabel htmlFor={field.name}>Category</FieldLabel>
                <Select value={field.value} onValueChange={field.onChange}>
                  <SelectTrigger
                    id={field.name}
                    aria-invalid={fieldState.invalid}
                  >
                    <SelectValue placeholder="Select category" />
                  </SelectTrigger>
                  <SelectContent>
                    {categories?.map((category) => (
                      <SelectItem key={category.id} value={category.id}>
                        <span className="flex items-center gap-2">
                          <span
                            className="h-2.5 w-2.5 rounded-full"
                            style={{ backgroundColor: category.color }}
                          />
                          {category.name}
                        </span>
                      </SelectItem>
                    ))}
                  </SelectContent>
                </Select>
                {fieldState.invalid && (
                  <FieldError errors={[fieldState.error]} />
                )}
              </Field>
            )}
          />
        </FormGrid>

        <Controller
          name="impact"
          control={form.control}
          render={({ field, fieldState }) => (
            <Field data-invalid={fieldState.invalid}>
              <FieldLabel htmlFor={field.name}>
                Impact <span className="text-muted-foreground">(optional)</span>
              </FieldLabel>
              <Textarea
                {...field}
                id={field.name}
                aria-invalid={fieldState.invalid}
                placeholder="What changed because of this?"
                rows={2}
              />
              {fieldState.invalid && <FieldError errors={[fieldState.error]} />}
            </Field>
          )}
        />

        <Controller
          name="notes"
          control={form.control}
          render={({ field, fieldState }) => (
            <Field data-invalid={fieldState.invalid}>
              <FieldLabel htmlFor={field.name}>
                Notes <span className="text-muted-foreground">(optional)</span>
              </FieldLabel>
              <Textarea
                {...field}
                id={field.name}
                aria-invalid={fieldState.invalid}
                placeholder="Any extra context"
                rows={2}
              />
              {fieldState.invalid && <FieldError errors={[fieldState.error]} />}
            </Field>
          )}
        />

        <Controller
          name="link"
          control={form.control}
          render={({ field, fieldState }) => (
            <Field data-invalid={fieldState.invalid}>
              <FieldLabel htmlFor={field.name}>
                Link <span className="text-muted-foreground">(optional)</span>
              </FieldLabel>
              <Input
                {...field}
                id={field.name}
                type="url"
                aria-invalid={fieldState.invalid}
                placeholder="https://..."
                autoComplete="off"
              />
              {fieldState.invalid && <FieldError errors={[fieldState.error]} />}
            </Field>
          )}
        />

        <FormActions>
          <Button
            type="submit"
            className="w-full"
            disabled={isPending || !form.formState.isValid}
          >
            {isPending
              ? "Saving..."
              : isEditing
                ? "Save changes"
                : "Add accomplishment"}
          </Button>
        </FormActions>
      </FormShell>
    </form>
  );
}
