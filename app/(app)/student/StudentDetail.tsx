"use client";

import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Avatar, AvatarFallback } from "@/components/ui/avatar";
import { Separator } from "@/components/ui/separator";
import { STUDENT_GENDER_OPTIONS, type IStudent } from "@/types/IStudentTypes";

interface StudentDetailProps {
  student: IStudent | null;
  open: boolean;
  onOpenChange: (open: boolean) => void;
  onEdit: (student: IStudent) => void;
  onDelete: (student: IStudent) => void;
}

function getInitials(name: string) {
  return name
    .split(" ")
    .filter(Boolean)
    .slice(0, 2)
    .map((part) => part[0]?.toUpperCase() ?? "")
    .join("");
}

function DetailRow({
  label,
  value,
}: {
  label: string;
  value: string | null | undefined;
}) {
  return (
    <div className="space-y-1">
      <dt className="text-xs font-medium text-muted-foreground">{label}</dt>
      <dd className="text-sm break-words">{value?.trim() ? value : "—"}</dd>
    </div>
  );
}

function formatDate(value: string) {
  if (!value) return "—";
  const date = new Date(value);
  if (Number.isNaN(date.getTime())) return value;
  return date.toLocaleDateString(undefined, {
    year: "numeric",
    month: "short",
    day: "numeric",
  });
}

export function StudentDetail({
  student,
  open,
  onOpenChange,
  onEdit,
  onDelete,
}: StudentDetailProps) {
  if (!student) return null;

  const genderLabel =
    STUDENT_GENDER_OPTIONS.find((g) => g.value === student.gender)?.label ??
    student.gender;

  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      <DialogContent className="flex max-h-[85vh] flex-col gap-0 overflow-hidden p-0 sm:max-w-[520px]">
        <div className="shrink-0 space-y-4 p-6 pb-4">
          <DialogHeader>
            <DialogTitle className="text-xl font-semibold">
              Student Details
            </DialogTitle>
            <DialogDescription>
              Review this student&apos;s profile and guardian information.
            </DialogDescription>
          </DialogHeader>

          <div className="flex items-center gap-3">
            <Avatar className="h-12 w-12">
              <AvatarFallback>{getInitials(student.fullName)}</AvatarFallback>
            </Avatar>
            <div className="min-w-0 flex-1">
              <p className="truncate text-base font-semibold">
                {student.fullName}
              </p>
              <p className="text-sm text-muted-foreground">
                {student.admissionNo}
              </p>
            </div>
            <Badge variant={student.status === "active" ? "success" : "secondary"}>
              {student.status === "active" ? "Active" : "Inactive"}
            </Badge>
          </div>
        </div>

        <Separator />

        <div className="min-h-0 flex-1 overflow-y-auto p-6">
          <section className="space-y-4" aria-labelledby="detail-student-heading">
            <h3
              id="detail-student-heading"
              className="text-sm font-semibold text-primary"
            >
              Student Information
            </h3>
            <dl className="grid grid-cols-1 gap-4 sm:grid-cols-2">
              <DetailRow label="Roll Number" value={student.rollNumber} />
              <DetailRow
                label="Class / Section"
                value={`${student.className} · ${student.section}`}
              />
              <DetailRow
                label="Date of Birth"
                value={formatDate(student.dateOfBirth)}
              />
              <DetailRow label="Gender" value={genderLabel} />
              <DetailRow label="Blood Group" value={student.bloodGroup} />
              <DetailRow
                label="Added"
                value={formatDate(student.createdAt)}
              />
            </dl>
          </section>

          <Separator className="my-6" />

          <section
            className="space-y-4"
            aria-labelledby="detail-guardian-heading"
          >
            <h3
              id="detail-guardian-heading"
              className="text-sm font-semibold text-primary"
            >
              Guardian Information
            </h3>
            <dl className="grid grid-cols-1 gap-4 sm:grid-cols-2">
              <DetailRow label="Guardian Name" value={student.guardianName} />
              <DetailRow label="Mobile Number" value={student.mobileNumber} />
            </dl>
          </section>
        </div>

        <DialogFooter className="shrink-0 border-t border-border bg-background p-4">
          <Button
            type="button"
            variant="outline"
            className="text-destructive hover:bg-destructive/10 hover:text-destructive"
            onClick={() => onDelete(student)}
          >
            Delete
          </Button>
          <Button type="button" onClick={() => onEdit(student)}>
            Edit
          </Button>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  );
}
