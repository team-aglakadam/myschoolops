"use client";

import * as React from "react";
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
import { Select } from "@/components/ui/select";
import { Separator } from "@/components/ui/separator";
import { useIsMobile } from "@/hooks/useIsMobile";
import {
  EMPTY_STUDENT_FORM,
  STUDENT_BLOOD_GROUP_OPTIONS,
  STUDENT_CLASS_OPTIONS,
  STUDENT_GENDER_OPTIONS,
  STUDENT_SECTION_OPTIONS,
  type IStudentFormProps,
  type IStudentFormValues,
} from "@/types/IStudentTypes";

export const StudentForm: React.FC<IStudentFormProps> = ({
  open,
  onOpenChange,
  onSave,
  mode = "create",
  initialValues = null,
}) => {
  const [form, setForm] = React.useState<IStudentFormValues>(EMPTY_STUDENT_FORM);
  const [isSaving, setIsSaving] = React.useState(false);
  const [formError, setFormError] = React.useState<string | null>(null);
  const isMobile = useIsMobile();
  const isEdit = mode === "edit";

  React.useEffect(() => {
    if (!open) return;
    setForm(initialValues ?? EMPTY_STUDENT_FORM);
    setFormError(null);
    setIsSaving(false);
  }, [open, initialValues, mode]);

  const updateField = <K extends keyof IStudentFormValues>(
    field: K,
    value: IStudentFormValues[K]
  ) => {
    setForm((prev) => ({ ...prev, [field]: value }));
  };

  const isValid =
    form.fullName.trim() &&
    form.rollNumber.trim() &&
    form.className &&
    form.section &&
    form.dateOfBirth &&
    form.gender &&
    form.guardianName.trim() &&
    form.mobileNumber.trim();

  const handleSave = async () => {
    if (!isValid || isSaving) return;

    setIsSaving(true);
    setFormError(null);
    try {
      await onSave?.(form);
      onOpenChange?.(false);
    } catch {
      setFormError(
        isEdit
          ? "Could not update student. Please try again."
          : "Could not create student. Please try again."
      );
    } finally {
      setIsSaving(false);
    }
  };

  const handleCancel = () => {
    setForm(EMPTY_STUDENT_FORM);
    setFormError(null);
    onOpenChange?.(false);
  };

  const fieldGrid = isMobile ? "grid-cols-1" : "grid-cols-2";

  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      <DialogContent
        className="flex max-h-[min(85vh,720px)] w-[calc(100%-1.5rem)] flex-col gap-0 overflow-hidden p-0 sm:max-w-[600px]"
        onInteractOutside={(e) => e.preventDefault()}
        onEscapeKeyDown={(e) => e.preventDefault()}
      >
        <div className="shrink-0 space-y-1 p-5 pb-4 sm:p-6">
          <DialogHeader>
            <DialogTitle className="text-xl font-semibold">
              {isEdit ? "Edit Student" : "Add Student"}
            </DialogTitle>
            <DialogDescription>
              {isEdit
                ? "Update student and guardian details."
                : "Create a new student record and guardian details."}
            </DialogDescription>
          </DialogHeader>
        </div>

        <Separator />

        <div className="min-h-0 flex-1 space-y-8 overflow-y-auto overscroll-contain p-5 sm:p-6">
          {formError && (
            <p
              className="rounded-[var(--radius-md)] bg-destructive/10 px-3 py-2 text-sm text-destructive"
              role="alert"
            >
              {formError}
            </p>
          )}

          <section className="space-y-4" aria-labelledby="student-info-heading">
            <div>
              <h3
                id="student-info-heading"
                className="text-base font-semibold text-primary"
              >
                Student Information
              </h3>
              <p className="text-sm text-muted-foreground">
                Basic details used across attendance and reports.
              </p>
            </div>

            <div className="space-y-2">
              <Label htmlFor="fullName">
                Full Name <span className="text-destructive">*</span>
              </Label>
              <Input
                id="fullName"
                placeholder="Enter full name"
                autoComplete="name"
                value={form.fullName}
                onChange={(e) => updateField("fullName", e.target.value)}
              />
            </div>

            <div className={`grid gap-4 ${fieldGrid}`}>
              <div className="space-y-2">
                <Label htmlFor="admissionNo">
                  Admission No.{" "}
                  <span className="text-muted-foreground">(Optional)</span>
                </Label>
                <Input
                  id="admissionNo"
                  placeholder="Auto generated"
                  value={form.admissionNo}
                  onChange={(e) => updateField("admissionNo", e.target.value)}
                />
              </div>
              <div className="space-y-2">
                <Label htmlFor="rollNumber">
                  Roll Number <span className="text-destructive">*</span>
                </Label>
                <Input
                  id="rollNumber"
                  placeholder="Enter roll number"
                  value={form.rollNumber}
                  onChange={(e) => updateField("rollNumber", e.target.value)}
                />
              </div>
            </div>

            <div className={`grid gap-4 ${fieldGrid}`}>
              <div className="space-y-2">
                <Label htmlFor="className">
                  Class <span className="text-destructive">*</span>
                </Label>
                <Select
                  id="className"
                  required
                  value={form.className}
                  onChange={(e) => updateField("className", e.target.value)}
                >
                  <option value="" disabled>
                    Select class
                  </option>
                  {STUDENT_CLASS_OPTIONS.map((option) => (
                    <option key={option} value={option}>
                      {option}
                    </option>
                  ))}
                </Select>
              </div>
              <div className="space-y-2">
                <Label htmlFor="section">
                  Section <span className="text-destructive">*</span>
                </Label>
                <Select
                  id="section"
                  required
                  value={form.section}
                  onChange={(e) => updateField("section", e.target.value)}
                >
                  <option value="" disabled>
                    Select section
                  </option>
                  {STUDENT_SECTION_OPTIONS.map((option) => (
                    <option key={option} value={option}>
                      {option}
                    </option>
                  ))}
                </Select>
              </div>
            </div>

            <div className={`grid gap-4 ${fieldGrid}`}>
              <div className="space-y-2">
                <Label htmlFor="dateOfBirth">
                  Date of Birth <span className="text-destructive">*</span>
                </Label>
                <Input
                  id="dateOfBirth"
                  type="date"
                  value={form.dateOfBirth}
                  onChange={(e) => updateField("dateOfBirth", e.target.value)}
                />
              </div>
              <div className="space-y-2">
                <Label htmlFor="gender">
                  Gender <span className="text-destructive">*</span>
                </Label>
                <Select
                  id="gender"
                  required
                  value={form.gender}
                  onChange={(e) => updateField("gender", e.target.value)}
                >
                  <option value="" disabled>
                    Select gender
                  </option>
                  {STUDENT_GENDER_OPTIONS.map((option) => (
                    <option key={option.value} value={option.value}>
                      {option.label}
                    </option>
                  ))}
                </Select>
              </div>
            </div>

            <div className="space-y-2">
              <Label htmlFor="bloodGroup">
                Blood Group{" "}
                <span className="text-muted-foreground">(Optional)</span>
              </Label>
              <Select
                id="bloodGroup"
                value={form.bloodGroup}
                onChange={(e) => updateField("bloodGroup", e.target.value)}
              >
                <option value="">Select blood group (Optional)</option>
                {STUDENT_BLOOD_GROUP_OPTIONS.map((option) => (
                  <option key={option} value={option}>
                    {option}
                  </option>
                ))}
              </Select>
            </div>
          </section>

          <Separator />

          <section
            className="space-y-4"
            aria-labelledby="guardian-info-heading"
          >
            <div>
              <h3
                id="guardian-info-heading"
                className="text-base font-semibold text-primary"
              >
                Guardian Information
              </h3>
              <p className="text-sm text-muted-foreground">
                Contact details for school communication.
              </p>
            </div>

            <div className={`grid gap-4 ${fieldGrid}`}>
              <div className="space-y-2">
                <Label htmlFor="guardianName">
                  Guardian Name <span className="text-destructive">*</span>
                </Label>
                <Input
                  id="guardianName"
                  placeholder="Enter guardian name"
                  autoComplete="name"
                  value={form.guardianName}
                  onChange={(e) => updateField("guardianName", e.target.value)}
                />
              </div>
              <div className="space-y-2">
                <Label htmlFor="mobileNumber">
                  Mobile Number <span className="text-destructive">*</span>
                </Label>
                <Input
                  id="mobileNumber"
                  type="tel"
                  inputMode="tel"
                  autoComplete="tel"
                  placeholder="Enter mobile number"
                  value={form.mobileNumber}
                  onChange={(e) => updateField("mobileNumber", e.target.value)}
                />
              </div>
            </div>
          </section>
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
                ? "Update Student"
                : "Save Student"}
          </Button>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  );
};
