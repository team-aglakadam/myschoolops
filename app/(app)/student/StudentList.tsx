"use client";

import { Eye, Pencil, Trash2 } from "lucide-react";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import { Avatar, AvatarFallback } from "@/components/ui/avatar";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Skeleton } from "@/components/ui/skeleton";
import { useIsMobile } from "@/hooks/useIsMobile";
import type { IStudent } from "@/types/IStudentTypes";
import { cn } from "@/lib/utils";

interface StudentListProps {
  students: IStudent[];
  isLoading?: boolean;
  onView?: (student: IStudent) => void;
  onEdit?: (student: IStudent) => void;
  onDelete?: (student: IStudent) => void;
  className?: string;
}

function getInitials(name: string) {
  return name
    .split(" ")
    .filter(Boolean)
    .slice(0, 2)
    .map((part) => part[0]?.toUpperCase() ?? "")
    .join("");
}

function StudentActions({
  student,
  onView,
  onEdit,
  onDelete,
  compact = false,
}: {
  student: IStudent;
  onView?: (student: IStudent) => void;
  onEdit?: (student: IStudent) => void;
  onDelete?: (student: IStudent) => void;
  compact?: boolean;
}) {
  return (
    <div className={cn("flex items-center gap-0.5", compact && "justify-end")}>
      <Button
        type="button"
        variant="ghost"
        size="icon"
        aria-label={`View ${student.fullName}`}
        onClick={() => onView?.(student)}
      >
        <Eye className="h-4 w-4" />
      </Button>
      <Button
        type="button"
        variant="ghost"
        size="icon"
        aria-label={`Edit ${student.fullName}`}
        onClick={() => onEdit?.(student)}
      >
        <Pencil className="h-4 w-4" />
      </Button>
      <Button
        type="button"
        variant="ghost"
        size="icon"
        className="text-destructive hover:bg-destructive/10 hover:text-destructive"
        aria-label={`Delete ${student.fullName}`}
        onClick={() => onDelete?.(student)}
      >
        <Trash2 className="h-4 w-4" />
      </Button>
    </div>
  );
}

function StatusBadge({ status }: { status: IStudent["status"] }) {
  return (
    <Badge variant={status === "active" ? "success" : "secondary"}>
      {status === "active" ? "Active" : "Inactive"}
    </Badge>
  );
}

function StudentMobileCard({
  student,
  onView,
  onEdit,
  onDelete,
}: {
  student: IStudent;
  onView?: (student: IStudent) => void;
  onEdit?: (student: IStudent) => void;
  onDelete?: (student: IStudent) => void;
}) {
  return (
    <article className="rounded-lg border border-border bg-surface p-4">
      <div className="flex items-start gap-3">
        <Avatar className="h-10 w-10">
          <AvatarFallback>{getInitials(student.fullName)}</AvatarFallback>
        </Avatar>
        <div className="min-w-0 flex-1">
          <div className="flex items-start justify-between gap-2">
            <div className="min-w-0">
              <h3 className="truncate font-medium">{student.fullName}</h3>
              <p className="text-xs text-muted-foreground">
                {student.admissionNo} · Roll {student.rollNumber}
              </p>
            </div>
            <StatusBadge status={student.status} />
          </div>
          <dl className="mt-3 grid grid-cols-2 gap-2 text-sm">
            <div>
              <dt className="text-xs text-muted-foreground">Class</dt>
              <dd>
                {student.className} · {student.section}
              </dd>
            </div>
            <div>
              <dt className="text-xs text-muted-foreground">Guardian</dt>
              <dd className="truncate">{student.guardianName}</dd>
            </div>
            <div className="col-span-2">
              <dt className="text-xs text-muted-foreground">Phone</dt>
              <dd>{student.mobileNumber}</dd>
            </div>
          </dl>
          <div className="mt-3 border-t border-border pt-2">
            <StudentActions
              student={student}
              onView={onView}
              onEdit={onEdit}
              onDelete={onDelete}
              compact
            />
          </div>
        </div>
      </div>
    </article>
  );
}

function LoadingState({ mobile }: { mobile: boolean }) {
  if (mobile) {
    return (
      <div className="space-y-3 p-1">
        {Array.from({ length: 4 }).map((_, i) => (
          <Skeleton key={i} className="h-36 w-full rounded-lg" />
        ))}
      </div>
    );
  }

  return (
    <div className="space-y-0 rounded-lg border border-border">
      {Array.from({ length: 6 }).map((_, i) => (
        <div
          key={i}
          className="flex items-center gap-4 border-b border-border px-4 py-3 last:border-0"
        >
          <Skeleton className="h-9 w-9 rounded-full" />
          <Skeleton className="h-4 w-32" />
          <Skeleton className="ml-auto h-4 w-20" />
          <Skeleton className="h-4 w-16" />
        </div>
      ))}
    </div>
  );
}

export function StudentList({
  students,
  isLoading,
  onView,
  onEdit,
  onDelete,
  className,
}: StudentListProps) {
  const isMobile = useIsMobile();

  if (isLoading) {
    return (
      <div className={cn("min-h-0 flex-1 overflow-auto", className)}>
        <LoadingState mobile={isMobile} />
      </div>
    );
  }

  if (isMobile) {
    return (
      <div
        className={cn(
          "min-h-0 flex-1 space-y-3 overflow-y-auto overscroll-contain",
          className
        )}
      >
        {students.map((student) => (
          <StudentMobileCard
            key={student.id}
            student={student}
            onView={onView}
            onEdit={onEdit}
            onDelete={onDelete}
          />
        ))}
      </div>
    );
  }

  return (
    <div
      className={cn(
        "min-h-0 flex-1 overflow-auto overscroll-contain rounded-lg border border-border",
        className
      )}
    >
      <Table className="min-w-[860px]">
        <TableHeader className="sticky top-0 z-10 bg-background">
          <TableRow className="hover:bg-transparent">
            <TableHead className="bg-background">Admission No.</TableHead>
            <TableHead className="bg-background">Name</TableHead>
            <TableHead className="bg-background">Roll No.</TableHead>
            <TableHead className="bg-background">Class</TableHead>
            <TableHead className="bg-background">Section</TableHead>
            <TableHead className="bg-background">Guardian</TableHead>
            <TableHead className="bg-background">Phone</TableHead>
            <TableHead className="bg-background">Status</TableHead>
            <TableHead className="bg-background text-right">Actions</TableHead>
          </TableRow>
        </TableHeader>
        <TableBody>
          {students.map((student) => (
            <TableRow key={student.id}>
              <TableCell className="font-medium text-muted-foreground">
                {student.admissionNo}
              </TableCell>
              <TableCell>
                <div className="flex items-center gap-3">
                  <Avatar className="h-8 w-8">
                    <AvatarFallback className="text-[10px]">
                      {getInitials(student.fullName)}
                    </AvatarFallback>
                  </Avatar>
                  <span className="font-medium">{student.fullName}</span>
                </div>
              </TableCell>
              <TableCell>{student.rollNumber}</TableCell>
              <TableCell>{student.className}</TableCell>
              <TableCell>{student.section}</TableCell>
              <TableCell>{student.guardianName}</TableCell>
              <TableCell>{student.mobileNumber}</TableCell>
              <TableCell>
                <StatusBadge status={student.status} />
              </TableCell>
              <TableCell className="text-right">
                <StudentActions
                  student={student}
                  onView={onView}
                  onEdit={onEdit}
                  onDelete={onDelete}
                  compact
                />
              </TableCell>
            </TableRow>
          ))}
        </TableBody>
      </Table>
    </div>
  );
}
