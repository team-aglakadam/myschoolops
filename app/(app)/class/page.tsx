"use client";

import { useEffect, useState } from "react";
import { Plus, School, X } from "lucide-react";
import { AppPage } from "@/components/layout/app-page";
import { Button } from "@/components/ui/button";
import { EmptyState } from "@/components/common/empty-state";
import { useClasses } from "@/hooks/useClasses";
import type { IClass, IClassFormValues } from "@/types/IClassTypes";
import { ClassForm } from "./ClassForm";
import { ClassList } from "./ClassList";
import { ClassToolbar } from "./ClassToolbar";
import { cn } from "@/lib/utils";

type DialogState =
  | { type: "closed" }
  | { type: "create" }
  | { type: "edit"; item: IClass };

export default function ClassPage() {
  const {
    search,
    setSearch,
    catalogCount,
    result,
    isLoading,
    isMutating,
    feedback,
    clearFeedback,
    create,
    update,
    remove,
  } = useClasses();

  const [dialog, setDialog] = useState<DialogState>({ type: "closed" });

  useEffect(() => {
    if (!feedback) return;
    const id = window.setTimeout(() => clearFeedback(), 4000);
    return () => window.clearTimeout(id);
  }, [feedback, clearFeedback]);

  const openCreate = () => setDialog({ type: "create" });
  const closeDialog = () => setDialog({ type: "closed" });

  const handleSave = async (values: IClassFormValues) => {
    if (dialog.type === "edit") {
      await update(dialog.item.id, values);
      return;
    }
    await create(values);
  };

  const handleDelete = async (item: IClass) => {
    const confirmed = window.confirm(
      `Remove ${item.name} and all of its sections? This cannot be undone.`
    );
    if (!confirmed) return;

    try {
      await remove(item);
      closeDialog();
    } catch {
      // feedback handled in hook
    }
  };

  const formOpen = dialog.type === "create" || dialog.type === "edit";
  const hasCatalog = catalogCount > 0;
  const hasResults = result.total > 0;
  const showEmptyCatalog = !isLoading && !hasCatalog;
  const showEmptyFilters = !isLoading && hasCatalog && !hasResults;
  const showList = hasResults || isLoading;

  return (
    <div className="flex h-full min-h-0 flex-col gap-4">
      <div className="flex shrink-0 flex-col gap-3 sm:flex-row sm:items-start sm:justify-between">
        <AppPage
          title="Classes"
          description="Manage all the classes in your school."
          className="max-w-none min-w-0 flex-1"
        />
        <Button
          className="shrink-0 self-start"
          onClick={openCreate}
          disabled={isMutating}
        >
          <Plus /> Add Class
        </Button>
      </div>

      {feedback && (
        <div
          role="status"
          className={cn(
            "flex shrink-0 items-start justify-between gap-3 rounded-[var(--radius-md)] px-3 py-2 text-sm",
            feedback.type === "success"
              ? "bg-success/10 text-success"
              : "bg-destructive/10 text-destructive"
          )}
        >
          <p>{feedback.message}</p>
          <button
            type="button"
            aria-label="Dismiss notification"
            className="rounded-sm opacity-70 hover:opacity-100"
            onClick={clearFeedback}
          >
            <X className="h-4 w-4" />
          </button>
        </div>
      )}

      {hasCatalog && (
        <ClassToolbar search={search} onSearchChange={setSearch} />
      )}

      <div className="flex min-h-0 flex-1 flex-col">
        {showEmptyCatalog && (
          <div className="flex min-h-0 flex-1 items-center justify-center overflow-auto rounded-lg border border-border bg-surface/30">
            <EmptyState
              icon={School}
              title="No classes added yet"
              description="Create your first class and add sections to organize students."
              actionLabel="Add Class"
              onAction={openCreate}
            />
          </div>
        )}

        {showEmptyFilters && (
          <div className="flex min-h-0 flex-1 items-center justify-center overflow-auto rounded-lg border border-border bg-surface/30">
            <EmptyState
              icon={School}
              title="No classes match your search"
              description="Try a different class name, section, or teacher."
              actionLabel="Clear search"
              onAction={() => setSearch("")}
            />
          </div>
        )}

        {showList && !showEmptyCatalog && !showEmptyFilters && (
          <ClassList
            classes={result.items}
            isLoading={isLoading}
            onEdit={(item) => setDialog({ type: "edit", item })}
            onDelete={handleDelete}
          />
        )}
      </div>

      {hasResults && (
        <p className="shrink-0 text-sm text-muted-foreground">
          Showing {result.total} {result.total === 1 ? "class" : "classes"} ·{" "}
          {result.totalSections}{" "}
          {result.totalSections === 1 ? "section" : "sections"}
        </p>
      )}

      {formOpen && (
        <ClassForm
          open={formOpen}
          mode={dialog.type === "edit" ? "edit" : "create"}
          initialClass={dialog.type === "edit" ? dialog.item : null}
          onOpenChange={(open) => {
            if (!open) closeDialog();
          }}
          onSave={handleSave}
        />
      )}
    </div>
  );
}
