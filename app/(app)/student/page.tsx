"use client";

import { useEffect, useState } from "react";
import { Plus, Users, X } from "lucide-react";
import { AppPage } from "@/components/layout/app-page";
import { Button } from "@/components/ui/button";
import { EmptyState } from "@/components/common/empty-state";
import { Pagination } from "@/components/common/pagination";
import { useStudents } from "@/hooks/useStudents";
import { studentToFormValues } from "@/lib/students/student-service";
import {
  DEFAULT_STUDENT_FILTERS,
  type IStudent,
  type IStudentFormValues,
  type StudentFormMode,
} from "@/types/IStudentTypes";
import { StudentDetail } from "./StudentDetail";
import { StudentForm } from "./StudentForm";
import { StudentList } from "./StudentList";
import { StudentToolbar } from "./StudentToolbar";
import { cn } from "@/lib/utils";

type DialogState =
  | { type: "closed" }
  | { type: "create" }
  | { type: "edit"; student: IStudent }
  | { type: "view"; student: IStudent };

export default function StudentPage() {
  const {
    search,
    setSearch,
    filters,
    setFilters,
    setPage,
    catalogCount,
    result,
    isLoading,
    isMutating,
    feedback,
    clearFeedback,
    create,
    update,
    remove,
  } = useStudents();

  const [dialog, setDialog] = useState<DialogState>({ type: "closed" });

  useEffect(() => {
    if (!feedback) return;
    const id = window.setTimeout(() => clearFeedback(), 4000);
    return () => window.clearTimeout(id);
  }, [feedback, clearFeedback]);

  const openCreate = () => setDialog({ type: "create" });
  const closeDialog = () => setDialog({ type: "closed" });

  const handleSave = async (values: IStudentFormValues) => {
    if (dialog.type === "edit") {
      await update(dialog.student.id, values);
      return;
    }
    await create(values);
  };

  const handleDelete = async (student: IStudent) => {
    const confirmed = window.confirm(
      `Remove ${student.fullName} from the student list? This cannot be undone.`
    );
    if (!confirmed) return;

    try {
      await remove(student);
      closeDialog();
    } catch {
      // feedback handled in hook
    }
  };

  const handleView = (student: IStudent) => {
    setDialog({ type: "view", student });
  };

  const handleEdit = (student: IStudent) => {
    setDialog({ type: "edit", student });
  };

  const formMode: StudentFormMode =
    dialog.type === "edit" ? "edit" : "create";
  const formInitial =
    dialog.type === "edit" ? studentToFormValues(dialog.student) : null;
  const formOpen = dialog.type === "create" || dialog.type === "edit";
  const detailOpen = dialog.type === "view";
  const detailStudent = dialog.type === "view" ? dialog.student : null;

  const hasCatalog = catalogCount > 0;
  const hasFilteredResults = result.total > 0;
  const showToolbar = hasCatalog;
  const showEmptyCatalog = !isLoading && !hasCatalog;
  const showEmptyFilters = !isLoading && hasCatalog && !hasFilteredResults;
  const showList = hasFilteredResults || isLoading;

  return (
    <div className="flex h-full min-h-0 flex-col gap-4">
      {/* Fixed page chrome — does not scroll */}
      <div className="flex shrink-0 flex-col gap-3 sm:flex-row sm:items-start sm:justify-between">
        <AppPage
          title="Students"
          description="Manage student records and information."
          className="max-w-none min-w-0 flex-1"
        />
        <Button
          className="shrink-0 self-start"
          onClick={openCreate}
          disabled={isMutating}
        >
          <Plus /> Add
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

      {showToolbar && (
        <StudentToolbar
          className="shrink-0"
          search={search}
          onSearchChange={setSearch}
          filters={filters}
          onFiltersChange={setFilters}
        />
      )}

      {/* Single primary scroll region */}
      <div className="flex min-h-0 flex-1 flex-col">
        {showEmptyCatalog && (
          <div className="flex min-h-0 flex-1 items-center justify-center overflow-auto rounded-lg border border-border bg-surface/30">
            <EmptyState
              icon={Users}
              title="No students added yet"
              description="Add your first student to start managing records, attendance, and guardian contacts."
              actionLabel="Add Student"
              onAction={openCreate}
            />
          </div>
        )}

        {showEmptyFilters && (
          <div className="flex min-h-0 flex-1 items-center justify-center overflow-auto rounded-lg border border-border bg-surface/30">
            <EmptyState
              icon={Users}
              title="No students match your filters"
              description="Try adjusting search or clearing filters to see more results."
              actionLabel="Clear filters"
              onAction={() => {
                setSearch("");
                setFilters(DEFAULT_STUDENT_FILTERS);
              }}
            />
          </div>
        )}

        {showList && !showEmptyCatalog && !showEmptyFilters && (
          <StudentList
            students={result.items}
            isLoading={isLoading}
            onView={handleView}
            onEdit={handleEdit}
            onDelete={handleDelete}
          />
        )}
      </div>

      {hasFilteredResults && (
        <Pagination
          className="shrink-0 border-t border-border pt-3"
          page={result.page}
          totalPages={result.totalPages}
          totalItems={result.total}
          pageSize={result.pageSize}
          onPageChange={setPage}
        />
      )}

      {formOpen && (
        <StudentForm
          open={formOpen}
          mode={formMode}
          initialValues={formInitial}
          onOpenChange={(open) => {
            if (!open) closeDialog();
          }}
          onSave={handleSave}
        />
      )}

      {detailOpen && (
        <StudentDetail
          student={detailStudent}
          open={detailOpen}
          onOpenChange={(open) => {
            if (!open) closeDialog();
          }}
          onEdit={(student) => handleEdit(student)}
          onDelete={handleDelete}
        />
      )}
    </div>
  );
}
