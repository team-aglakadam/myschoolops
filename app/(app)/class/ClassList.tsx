"use client";

import { useState } from "react";
import {
  ChevronDown,
  MoreHorizontal,
  Pencil,
  Trash2,
  Users,
} from "lucide-react";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Skeleton } from "@/components/ui/skeleton";
import {
  SECTION_AVATAR_COLORS,
  type IClass,
  type IClassSection,
} from "@/types/IClassTypes";
import { cn } from "@/lib/utils";

interface ClassListProps {
  classes: IClass[];
  isLoading?: boolean;
  onEdit?: (item: IClass) => void;
  onDelete?: (item: IClass) => void;
  className?: string;
}

function sectionColor(index: number) {
  return SECTION_AVATAR_COLORS[index % SECTION_AVATAR_COLORS.length];
}

function SectionCard({
  section,
  colorIndex,
}: {
  section: IClassSection;
  colorIndex: number;
}) {
  return (
    <article className="rounded-xl border border-border bg-surface p-4 transition-colors hover:bg-surface/80">
      <div className="mb-3 flex items-start justify-between gap-2">
        <div
          className={cn(
            "flex h-11 w-11 items-center justify-center rounded-full text-base font-semibold",
            sectionColor(colorIndex)
          )}
          aria-hidden
        >
          {section.name.slice(0, 2).toUpperCase()}
        </div>
        <Button
          type="button"
          variant="ghost"
          size="icon"
          className="h-8 w-8 text-muted-foreground"
          aria-label={`Options for section ${section.name}`}
          disabled
        >
          <MoreHorizontal className="h-4 w-4" />
        </Button>
      </div>

      <h4 className="font-semibold">Section {section.name}</h4>
      <p className="mt-1 truncate text-sm text-muted-foreground">
        {section.teacher.trim() || "No teacher assigned"}
      </p>

      <div className="mt-4 flex items-center justify-between gap-2">
        <p className="inline-flex items-center gap-1.5 text-sm text-muted-foreground">
          <Users className="h-3.5 w-3.5" />
          {section.studentCount}{" "}
          {section.studentCount === 1 ? "Student" : "Students"}
        </p>
        <Badge variant={section.status === "active" ? "success" : "secondary"}>
          {section.status === "active" ? "Active" : "Inactive"}
        </Badge>
      </div>
    </article>
  );
}

function ClassAccordionItem({
  item,
  defaultOpen,
  onEdit,
  onDelete,
}: {
  item: IClass;
  defaultOpen: boolean;
  onEdit?: (item: IClass) => void;
  onDelete?: (item: IClass) => void;
}) {
  const [open, setOpen] = useState(defaultOpen);

  return (
    <section className="overflow-hidden rounded-xl border border-border bg-background">
      <div className="flex items-center gap-2 border-b border-border px-3 py-2 sm:px-4">
        <button
          type="button"
          className="flex min-w-0 flex-1 items-center gap-3 rounded-[var(--radius-md)] px-1 py-2 text-left transition-colors hover:bg-surface/60"
          aria-expanded={open}
          onClick={() => setOpen((prev) => !prev)}
        >
          <ChevronDown
            className={cn(
              "h-4 w-4 shrink-0 text-muted-foreground transition-transform",
              open ? "rotate-0" : "-rotate-90"
            )}
          />
          <span className="truncate text-base font-semibold">{item.name}</span>
          <span className="shrink-0 text-sm text-muted-foreground">
            {item.sections.length}{" "}
            {item.sections.length === 1 ? "Section" : "Sections"}
          </span>
        </button>

        <div className="flex shrink-0 items-center gap-0.5">
          <Button
            type="button"
            variant="ghost"
            size="icon"
            aria-label={`Edit ${item.name}`}
            onClick={() => onEdit?.(item)}
          >
            <Pencil className="h-4 w-4" />
          </Button>
          <Button
            type="button"
            variant="ghost"
            size="icon"
            className="text-destructive hover:bg-destructive/10 hover:text-destructive"
            aria-label={`Delete ${item.name}`}
            onClick={() => onDelete?.(item)}
          >
            <Trash2 className="h-4 w-4" />
          </Button>
        </div>
      </div>

      {open && (
        <div className="grid grid-cols-1 gap-3 p-3 sm:grid-cols-2 sm:p-4 lg:grid-cols-3 xl:grid-cols-4">
          {item.sections.map((section, index) => (
            <SectionCard
              key={section.id}
              section={section}
              colorIndex={index}
            />
          ))}
        </div>
      )}
    </section>
  );
}

function LoadingState() {
  return (
    <div className="space-y-3">
      {Array.from({ length: 4 }).map((_, i) => (
        <Skeleton key={i} className="h-16 w-full rounded-xl" />
      ))}
    </div>
  );
}

export function ClassList({
  classes,
  isLoading,
  onEdit,
  onDelete,
  className,
}: ClassListProps) {
  if (isLoading) {
    return (
      <div className={cn("min-h-0 flex-1 overflow-auto", className)}>
        <LoadingState />
      </div>
    );
  }

  return (
    <div
      className={cn(
        "min-h-0 flex-1 space-y-3 overflow-y-auto overscroll-contain",
        className
      )}
    >
      {classes.map((item, index) => (
        <ClassAccordionItem
          key={item.id}
          item={item}
          defaultOpen={index === 0}
          onEdit={onEdit}
          onDelete={onDelete}
        />
      ))}
    </div>
  );
}
