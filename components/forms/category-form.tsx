"use client";

import { zodResolver } from "@hookform/resolvers/zod";
import { Controller, useForm } from "react-hook-form";
import { toast } from "sonner";
import { FormActions, FormShell } from "@/components/forms/form-layout";
import { Button } from "@/components/ui/button";
import { ColorPicker } from "@/components/ui/color-picker";
import { Field, FieldError, FieldLabel } from "@/components/ui/field";
import { Input } from "@/components/ui/input";
import { useCreateCategory, useUpdateCategory } from "@/hooks/use-categories";
import { createCategorySchema } from "@/schemas/category";
import type { CreateCategoryInput } from "@/types/category";

type CategoryFormProps = {
  defaultValues?: { id: string; name: string; color: string } | null;
  onSuccess: () => void;
};

export function CategoryForm({ defaultValues, onSuccess }: CategoryFormProps) {
  const isEditing = Boolean(defaultValues);

  const form = useForm<CreateCategoryInput>({
    resolver: zodResolver(createCategorySchema),
    defaultValues: {
      name: defaultValues?.name ?? "",
      color: defaultValues?.color ?? "#3b82f6",
    },
    mode: "onChange",
  });

  const createCategory = useCreateCategory();
  const updateCategory = useUpdateCategory();
  const isPending = createCategory.isPending || updateCategory.isPending;

  function onSubmit(values: CreateCategoryInput) {
    if (isEditing && defaultValues) {
      updateCategory.mutate(
        { id: defaultValues.id, ...values },
        {
          onSuccess: () => onSuccess(),
          onError: () => {
            toast.error("Failed to update category. Try again.");
          },
        },
      );
    } else {
      createCategory.mutate(values, {
        onSuccess: () => {
          form.reset();
          onSuccess();
        },
        onError: () => {
          toast.error("Failed to create category. Try again.");
        },
      });
    }
  }

  return (
    <form onSubmit={form.handleSubmit(onSubmit)} className="w-full">
      <FormShell>
        <Controller
          name="name"
          control={form.control}
          render={({ field, fieldState }) => (
            <Field data-invalid={fieldState.invalid}>
              <FieldLabel htmlFor={field.name}>Name</FieldLabel>

              <Input
                {...field}
                id={field.name}
                type="text"
                aria-invalid={fieldState.invalid}
                placeholder="e.g. Engineering"
                autoComplete="off"
                autoFocus
              />

              {fieldState.invalid && <FieldError errors={[fieldState.error]} />}
            </Field>
          )}
        />

        <Controller
          name="color"
          control={form.control}
          render={({ field, fieldState }) => (
            <Field data-invalid={fieldState.invalid}>
              <FieldLabel htmlFor={field.name}>Color</FieldLabel>

              <div className="flex items-center gap-3">
                <ColorPicker
                  value={field.value}
                  onChange={field.onChange}
                  onBlur={field.onBlur}
                  className="h-9 w-9 rounded-full p-0"
                />
                <span className="text-sm text-muted-foreground">
                  {field.value}
                </span>
              </div>

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
                : "Create category"}
          </Button>
        </FormActions>
      </FormShell>
    </form>
  );
}
