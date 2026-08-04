import type {
  IStudent,
  IStudentFormValues,
  IStudentListQuery,
  IStudentListResult,
} from "@/types/IStudentTypes";
import { MOCK_STUDENTS } from "@/lib/students/mock-data";

/**
 * In-memory student store.
 * Swap these function bodies for fetch("/api/students") later —
 * call sites already treat them as async.
 */
let students: IStudent[] = [...MOCK_STUDENTS];

function delay(ms = 120) {
  return new Promise((resolve) => setTimeout(resolve, ms));
}

function matchesSearch(student: IStudent, search: string) {
  if (!search.trim()) return true;
  const q = search.trim().toLowerCase();
  return [
    student.fullName,
    student.admissionNo,
    student.rollNumber,
    student.className,
    student.section,
    student.guardianName,
    student.mobileNumber,
  ]
    .join(" ")
    .toLowerCase()
    .includes(q);
}

function matchesFilters(student: IStudent, query: IStudentListQuery) {
  const { filters } = query;
  if (filters.className && student.className !== filters.className) return false;
  if (filters.section && student.section !== filters.section) return false;
  if (filters.status && student.status !== filters.status) return false;
  return true;
}

export function studentToFormValues(student: IStudent): IStudentFormValues {
  return {
    fullName: student.fullName,
    admissionNo: student.admissionNo,
    rollNumber: student.rollNumber,
    className: student.className,
    section: student.section,
    dateOfBirth: student.dateOfBirth,
    gender: student.gender,
    bloodGroup: student.bloodGroup,
    guardianName: student.guardianName,
    mobileNumber: student.mobileNumber,
  };
}

export async function listStudents(
  query: IStudentListQuery
): Promise<IStudentListResult> {
  await delay();

  const filtered = students
    .filter((s) => matchesSearch(s, query.search) && matchesFilters(s, query))
    .sort(
      (a, b) =>
        new Date(b.createdAt).getTime() - new Date(a.createdAt).getTime()
    );

  const total = filtered.length;
  const totalPages = Math.max(1, Math.ceil(total / query.pageSize) || 1);
  const page = Math.min(Math.max(1, query.page), totalPages || 1);
  const start = (page - 1) * query.pageSize;

  return {
    items: filtered.slice(start, start + query.pageSize),
    total,
    page,
    pageSize: query.pageSize,
    totalPages,
  };
}

export async function getAllStudents(): Promise<IStudent[]> {
  await delay();
  return [...students];
}

export async function getStudent(id: string): Promise<IStudent | null> {
  await delay();
  return students.find((s) => s.id === id) ?? null;
}

export async function createStudent(
  values: IStudentFormValues
): Promise<IStudent> {
  await delay();

  const admissionNo =
    values.admissionNo.trim() ||
    `ADM-${new Date().getFullYear()}-${String(students.length + 1).padStart(3, "0")}`;

  const student: IStudent = {
    id: crypto.randomUUID(),
    fullName: values.fullName.trim(),
    admissionNo,
    rollNumber: values.rollNumber.trim(),
    className: values.className,
    section: values.section,
    dateOfBirth: values.dateOfBirth,
    gender: values.gender,
    bloodGroup: values.bloodGroup,
    guardianName: values.guardianName.trim(),
    mobileNumber: values.mobileNumber.trim(),
    status: "active",
    createdAt: new Date().toISOString(),
  };

  students = [student, ...students];
  return student;
}

export async function updateStudent(
  id: string,
  values: IStudentFormValues
): Promise<IStudent> {
  await delay();

  const existing = students.find((s) => s.id === id);
  if (!existing) {
    throw new Error("Student not found");
  }

  const updated: IStudent = {
    ...existing,
    fullName: values.fullName.trim(),
    admissionNo: values.admissionNo.trim() || existing.admissionNo,
    rollNumber: values.rollNumber.trim(),
    className: values.className,
    section: values.section,
    dateOfBirth: values.dateOfBirth,
    gender: values.gender,
    bloodGroup: values.bloodGroup,
    guardianName: values.guardianName.trim(),
    mobileNumber: values.mobileNumber.trim(),
  };

  students = students.map((s) => (s.id === id ? updated : s));
  return updated;
}

export async function deleteStudent(id: string): Promise<void> {
  await delay();
  const exists = students.some((s) => s.id === id);
  if (!exists) {
    throw new Error("Student not found");
  }
  students = students.filter((s) => s.id !== id);
}

/** Dev helper — clear or reseed store */
export async function resetStudents(seed = false): Promise<void> {
  await delay(0);
  students = seed ? [...MOCK_STUDENTS] : [];
}
