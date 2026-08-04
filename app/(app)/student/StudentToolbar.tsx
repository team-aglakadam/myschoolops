"use client";

import { Search, X } from "lucide-react";
import { Input } from "@/components/ui/input";
import { Select } from "@/components/ui/select";
import { Button } from "@/components/ui/button";
import { Label } from "@/components/ui/label";
import {
  IStudentFilters,
  STUDENT_CLASS_OPTIONS,
  STUDENT_SECTION_OPTIONS,
  STUDENT_STATUS_OPTIONS,
  type StudentStatusFilter,
} from "@/types/IStudentTypes";
import { cn } from "@/lib/utils";

interface StudentToolbarProps {
  search: string;
  onSearchChange: (value: string) => void;
  filters: IStudentFilters;
  onFiltersChange: (filters: IStudentFilters) => void;
  className?: string;
}

export function StudentToolbar({
  search,
  onSearchChange,
  filters,
  onFiltersChange,
  className,
}: StudentToolbarProps) {
  const hasActiveFilters =
    Boolean(search.trim()) ||
    Boolean(filters.className) ||
    Boolean(filters.section) ||
    Boolean(filters.status);

  const updateFilter = <K extends keyof IStudentFilters>(
    key: K,
    value: IStudentFilters[K]
  ) => {
    onFiltersChange({ ...filters, [key]: value });
  };

  const clearAll = () => {
    onSearchChange("");
    onFiltersChange({ className: "", section: "", status: "" });
  };

  return (
    <div
      className={cn(
        "flex shrink-0 flex-col gap-3 rounded-lg border border-border bg-surface/40 p-3 sm:p-4",
        className
      )}
    >
      <div className="flex flex-col gap-3 lg:flex-row lg:items-end">
        <div className="min-w-0 flex-1 space-y-1.5">
          <Label htmlFor="student-search" className="sr-only">
            Search students
          </Label>
          <div className="relative">
            <Search className="pointer-events-none absolute top-1/2 left-3 h-4 w-4 -translate-y-1/2 text-muted-foreground" />
            <Input
              id="student-search"
              type="search"
              placeholder="Search by name, admission no, roll, guardian…"
              value={search}
              onChange={(e) => onSearchChange(e.target.value)}
              className="pl-9"
            />
          </div>
        </div>

        <div className="grid grid-cols-1 gap-3 sm:grid-cols-3 lg:w-auto lg:min-w-[28rem]">
          <div className="space-y-1.5">
            <Label htmlFor="filter-class" className="text-xs text-muted-foreground">
              Class
            </Label>
            <Select
              id="filter-class"
              value={filters.className}
              onChange={(e) => updateFilter("className", e.target.value)}
              aria-label="Filter by class"
            >
              <option value="">All classes</option>
              {STUDENT_CLASS_OPTIONS.map((option) => (
                <option key={option} value={option}>
                  {option}
                </option>
              ))}
            </Select>
          </div>

          <div className="space-y-1.5">
            <Label
              htmlFor="filter-section"
              className="text-xs text-muted-foreground"
            >
              Section
            </Label>
            <Select
              id="filter-section"
              value={filters.section}
              onChange={(e) => updateFilter("section", e.target.value)}
              aria-label="Filter by section"
            >
              <option value="">All sections</option>
              {STUDENT_SECTION_OPTIONS.map((option) => (
                <option key={option} value={option}>
                  {option}
                </option>
              ))}
            </Select>
          </div>

          <div className="space-y-1.5">
            <Label
              htmlFor="filter-status"
              className="text-xs text-muted-foreground"
            >
              Status
            </Label>
            <Select
              id="filter-status"
              value={filters.status}
              onChange={(e) =>
                updateFilter("status", e.target.value as StudentStatusFilter)
              }
              aria-label="Filter by status"
            >
              {STUDENT_STATUS_OPTIONS.map((option) => (
                <option key={option.value || "all"} value={option.value}>
                  {option.label}
                </option>
              ))}
            </Select>
          </div>
        </div>
      </div>

      {hasActiveFilters && (
        <div className="flex justify-end">
          <Button
            type="button"
            variant="ghost"
            size="sm"
            onClick={clearAll}
            className="gap-1"
          >
            <X className="h-3.5 w-3.5" />
            Clear filters
          </Button>
        </div>
      )}
    </div>
  );
}
