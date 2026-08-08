export interface IStudentFormValues {
  fullName: string;
  admissionNo: string;
  rollNumber: string;
  className: string;
  section: string;
  classId: string;
  dateOfBirth: string;
  gender: string;
  bloodGroup: string;
  guardianName: string;
  mobileNumber: string;
}

export type StudentFormMode = "create" | "edit";

export interface IStudentFormProps {
  open?: boolean;
  onOpenChange?: (open: boolean) => void;
  mode?: StudentFormMode;
  /** Prefill when editing */
  initialValues?: IStudentFormValues | null;
  /** Called with form values on successful save — page owns persistence */
  onSave?: (values: IStudentFormValues) => void | Promise<void>;
}

/** List row model — shaped for easy mapping from API / DbStudent + user join */
export interface IStudent {
  id: string;
  fullName: string;
  admissionNo: string;
  rollNumber: string;
  className: string;
  section: string;
  classId: string;
  dateOfBirth: string;
  gender: string;
  bloodGroup: string;
  guardianName: string;
  mobileNumber: string;
  status: "active" | "inactive";
  createdAt: string;
}

export type StudentStatusFilter = "" | "active" | "inactive";

/** Extensible filter bag — add keys without rewriting the list pipeline */
export interface IStudentFilters {
  className: string;
  section: string;
  status: StudentStatusFilter;
}

export interface IStudentListQuery {
  search: string;
  filters: IStudentFilters;
  page: number;
  pageSize: number;
}

export interface IStudentListResult {
  items: IStudent[];
  total: number;
  page: number;
  pageSize: number;
  totalPages: number;
}

export const DEFAULT_STUDENT_FILTERS: IStudentFilters = {
  className: "",
  section: "",
  status: "",
};

export const EMPTY_STUDENT_FORM: IStudentFormValues = {
  fullName: "",
  admissionNo: "",
  rollNumber: "",
  className: "",
  section: "",
  classId: "",
  dateOfBirth: "",
  gender: "",
  bloodGroup: "",
  guardianName: "",
  mobileNumber: "",
};

export const STUDENT_PAGE_SIZE = 8;


export const STUDENT_GENDER_OPTIONS = [
  { value: "male", label: "Male" },
  { value: "female", label: "Female" },
  { value: "other", label: "Other" },
] as const;

export const STUDENT_BLOOD_GROUP_OPTIONS = [
  "A+",
  "A-",
  "B+",
  "B-",
  "AB+",
  "AB-",
  "O+",
  "O-",
] as const;

export const STUDENT_STATUS_OPTIONS = [
  { value: "", label: "All statuses" },
  { value: "active", label: "Active" },
  { value: "inactive", label: "Inactive" },
] as const;
