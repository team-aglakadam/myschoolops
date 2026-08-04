export interface ISection {
  id: string;
  name: string;
  teacher: string;
}

export interface IClassSection {
  id: string;
  name: string;
  teacher: string;
  studentCount: number;
  status: "active" | "inactive";
}

export interface IClass {
  id: string;
  name: string;
  sections: IClassSection[];
  createdAt: string;
}

export interface IClassFormValues {
  name: string;
  sections: Array<{ name: string; teacher: string }>;
}

export type ClassFormMode = "create" | "edit";

export interface IClassFormProps {
  open?: boolean;
  onOpenChange?: (open: boolean) => void;
  mode?: ClassFormMode;
  initialClass?: IClass | null;
  onSave?: (values: IClassFormValues) => void | Promise<void>;
}

export interface IClassListQuery {
  search: string;
}

export interface IClassListResult {
  items: IClass[];
  total: number;
  totalSections: number;
}

export const SECTION_AVATAR_COLORS = [
  "bg-primary/15 text-primary",
  "bg-info/15 text-info",
  "bg-success/15 text-success",
  "bg-warning/15 text-warning",
  "bg-destructive/15 text-destructive",
  "bg-secondary text-secondary-foreground",
] as const;
