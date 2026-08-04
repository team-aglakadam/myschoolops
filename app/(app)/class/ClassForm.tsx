"use client";

import * as React from "react";
import { Plus, Trash2 } from "lucide-react";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Separator } from "@/components/ui/separator";
import { useIsMobile } from "@/hooks/useIsMobile";
import type {
  IClassFormProps,
  IClassFormValues,
  ISection,
} from "@/types/IClassTypes";

function createEmptySection(): ISection {
  return { id: crypto.randomUUID(), name: "", teacher: "" };
}

function classToFormSections(
  initialClass: IClassFormProps["initialClass"]
): ISection[] {
  if (!initialClass?.sections.length) return [createEmptySection()];
  return initialClass.sections.map((section) => ({
    id: section.id,
    name: section.name,
    teacher: section.teacher,
  }));
}

export const ClassForm: React.FC<IClassFormProps> = ({
  open,
  onOpenChange,
  onSave,
  mode = "create",
  initialClass = null,
}) => {
  const [className, setClassName] = React.useState("");
  const [sections, setSections] = React.useState<ISection[]>([
    createEmptySection(),
  ]);
  const [isSaving, setIsSaving] = React.useState(false);
  const [formError, setFormError] = React.useState<string | null>(null);
  const isMobile = useIsMobile();
  const isEdit = mode === "edit";

  React.useEffect(() => {
    if (!open) return;
    setClassName(initialClass?.name ?? "");
    setSections(classToFormSections(initialClass));
    setFormError(null);
    setIsSaving(false);
  }, [open, initialClass, mode]);

  const addSection = () => {
    setSections((prev) => [...prev, createEmptySection()]);
  };

  const removeSection = (id: string) => {
    setSections((prev) =>
      prev.length > 1 ? prev.filter((section) => section.id !== id) : prev
    );
  };

  const updateSection = (id: string, field: keyof ISection, value: string) => {
    setSections((prev) =>
      prev.map((section) =>
        section.id === id ? { ...section, [field]: value } : section
      )
    );
  };

  const hasValidSections = sections.some((section) => section.name.trim());
  const isValid = className.trim() && hasValidSections;

  const handleSave = async () => {
    if (!isValid || isSaving) return;

    const values: IClassFormValues = {
      name: className.trim(),
      sections: sections
        .filter((section) => section.name.trim())
        .map(({ name, teacher }) => ({
          name: name.trim(),
          teacher: teacher.trim(),
        })),
    };

    setIsSaving(true);
    setFormError(null);
    try {
      await onSave?.(values);
      onOpenChange?.(false);
    } catch (error) {
      setFormError(
        error instanceof Error
          ? error.message
          : isEdit
            ? "Could not update class."
            : "Could not create class."
      );
    } finally {
      setIsSaving(false);
    }
  };

  const handleCancel = () => {
    setClassName("");
    setSections([createEmptySection()]);
    setFormError(null);
    onOpenChange?.(false);
  };

  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      <DialogContent
        className="flex max-h-[min(85vh,720px)] w-[calc(100%-1.5rem)] flex-col gap-0 overflow-hidden p-0 sm:max-w-[600px]"
        onInteractOutside={(e) => e.preventDefault()}
        onEscapeKeyDown={(e) => e.preventDefault()}
      >
        <div className="shrink-0 space-y-4 p-5 pb-4 sm:p-6">
          <DialogHeader>
            <DialogTitle className="text-xl font-semibold">
              {isEdit ? "Edit Class" : "Add Class"}
            </DialogTitle>
            <DialogDescription>
              {isEdit
                ? "Update this class and its sections."
                : "Create a new class and add its sections."}
            </DialogDescription>
          </DialogHeader>

          <div className="space-y-2">
            <Label htmlFor="className">
              Class Name <span className="text-destructive">*</span>
            </Label>
            <Input
              id="className"
              placeholder="Enter class name (e.g. Grade 6, Class 10, Nursery)"
              value={className}
              onChange={(e) => setClassName(e.target.value)}
            />
            <p className="text-xs text-muted-foreground">
              Examples: Grade 6, Grade 10, Nursery, LKG, UKG, Class 8
            </p>
          </div>
        </div>

        <Separator />

        <div className="min-h-0 flex-1 overflow-y-auto overscroll-contain p-5 sm:p-6">
          {formError && (
            <p
              className="mb-4 rounded-[var(--radius-md)] bg-destructive/10 px-3 py-2 text-sm text-destructive"
              role="alert"
            >
              {formError}
            </p>
          )}

          <div className="mb-4 flex flex-col gap-3 sm:flex-row sm:items-center sm:justify-between">
            <div>
              <h3 className="text-base font-semibold">Sections</h3>
              <p className="text-sm text-muted-foreground">
                Add one or more sections for this class.
              </p>
            </div>
            <Button
              type="button"
              variant="outline"
              size="sm"
              onClick={addSection}
              className="gap-1 self-start text-primary hover:text-primary"
            >
              <Plus className="h-4 w-4" />
              Add Section
            </Button>
          </div>

          <div className="space-y-3">
            {sections.map((section) => (
              <div
                key={section.id}
                className={`flex items-start gap-3 rounded-lg border border-border bg-surface p-4 ${
                  isMobile ? "flex-col" : ""
                }`}
              >
                <div className="flex-1 space-y-1.5">
                  <Label>
                    Section Name <span className="text-destructive">*</span>
                  </Label>
                  <Input
                    placeholder="e.g. A, B, C"
                    value={section.name}
                    onChange={(e) =>
                      updateSection(section.id, "name", e.target.value)
                    }
                  />
                </div>

                <div className="flex-1 space-y-1.5">
                  <Label>
                    Class Teacher{" "}
                    <span className="text-muted-foreground">(Optional)</span>
                  </Label>
                  <Input
                    placeholder="Enter teacher name"
                    value={section.teacher}
                    onChange={(e) =>
                      updateSection(section.id, "teacher", e.target.value)
                    }
                  />
                </div>

                <Button
                  type="button"
                  variant="ghost"
                  size="icon"
                  className={`${isMobile ? "" : "mt-6"} h-9 w-9 text-destructive hover:bg-destructive/10 hover:text-destructive`}
                  onClick={() => removeSection(section.id)}
                  disabled={sections.length === 1}
                  aria-label="Remove section"
                >
                  <Trash2 className="h-4 w-4" />
                </Button>
              </div>
            ))}
          </div>
        </div>

        <DialogFooter className="shrink-0 border-t border-border bg-background p-4">
          <Button type="button" variant="outline" onClick={handleCancel}>
            Cancel
          </Button>
          <Button
            type="button"
            onClick={handleSave}
            disabled={!isValid || isSaving}
          >
            {isSaving
              ? isEdit
                ? "Updating…"
                : "Saving…"
              : isEdit
                ? "Update Class"
                : "Save Class"}
          </Button>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  );
};
