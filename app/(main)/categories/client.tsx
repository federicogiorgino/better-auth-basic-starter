"use client";

import { Plus } from "lucide-react";
import { PageHeading } from "@/components/page-heading";
import { Button } from "@/components/ui/button";
import { useCategoryModalStore } from "@/store/categories-modal-store";
import { CategoriesList } from "./_components/categories-list";

export function CategoriesPageClient() {
  const { openCreate } = useCategoryModalStore();
  return (
    <div className="flex flex-col gap-4">
      <PageHeading
        eyebrow="Make it yours"
        title="Your Categories"
        subtitle="Manage your categories"
        onMenu={() => {}}
      />
      <CategoriesList />
      <Button variant="outline" onClick={openCreate} className="self-start">
        <Plus size={16} /> New category
      </Button>
    </div>
  );
}
