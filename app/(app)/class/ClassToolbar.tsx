"use client";

import { Search, X } from "lucide-react";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { Label } from "@/components/ui/label";
import { cn } from "@/lib/utils";

interface ClassToolbarProps {
  search: string;
  onSearchChange: (value: string) => void;
  className?: string;
}

export function ClassToolbar({
  search,
  onSearchChange,
  className,
}: ClassToolbarProps) {
  return (
    <div
      className={cn(
        "flex shrink-0 flex-col gap-3 rounded-lg border border-border bg-surface/40 p-3 sm:flex-row sm:items-center sm:p-4",
        className
      )}
    >
      <div className="relative min-w-0 flex-1">
        <Label htmlFor="class-search" className="sr-only">
          Search classes
        </Label>
        <Search className="pointer-events-none absolute top-1/2 left-3 h-4 w-4 -translate-y-1/2 text-muted-foreground" />
        <Input
          id="class-search"
          type="search"
          placeholder="Search classes, sections or teacher…"
          value={search}
          onChange={(e) => onSearchChange(e.target.value)}
          className="pl-9"
        />
      </div>
      {search.trim() && (
        <Button
          type="button"
          variant="ghost"
          size="sm"
          onClick={() => onSearchChange("")}
          className="gap-1 self-end sm:self-auto"
        >
          <X className="h-3.5 w-3.5" />
          Clear
        </Button>
      )}
    </div>
  );
}
