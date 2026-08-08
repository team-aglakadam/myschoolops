import type {
  IStudent,
  IStudentFormValues,
  IStudentListQuery,
  IStudentListResult,
} from "@/types/IStudentTypes";

// ── API helper ──────────────────────────────────────────────────────────
async function apiFetch<T>(url: string, options?: RequestInit): Promise<T> {
  const res = await fetch(url, {
    headers: { "Content-Type": "application/json" },
    ...options,
  });

  const json = await res.json();

  if (!res.ok) {
    throw new Error(json.error || `Request failed (${res.status})`);
  }

  return json;
}

// ── Public API ──────────────────────────────────────────────────────────

export async function listStudents(
  query: IStudentListQuery
): Promise<IStudentListResult & { catalogCount: number }> {
  const params = new URLSearchParams();
  if (query.search) params.set("search", query.search);
  if (query.filters.className) params.set("className", query.filters.className);
  if (query.filters.section) params.set("section", query.filters.section);
  if (query.filters.status) params.set("status", query.filters.status);
  params.set("page", String(query.page));
  params.set("pageSize", String(query.pageSize));

  const result = await apiFetch<{
    data: IStudent[];
    total: number;
    page: number;
    pageSize: number;
    totalPages: number;
    catalogCount: number;
  }>(`/api/students?${params}`);

  return {
    items: result.data,
    total: result.total,
    page: result.page,
    pageSize: result.pageSize,
    totalPages: result.totalPages,
    catalogCount: result.catalogCount,
  };
}

export async function createStudent(
  values: IStudentFormValues
): Promise<void> {
  await apiFetch("/api/students", {
    method: "POST",
    body: JSON.stringify(values),
  });
}

export async function updateStudent(
  id: string,
  values: IStudentFormValues
): Promise<void> {
  await apiFetch("/api/students", {
    method: "PUT",
    body: JSON.stringify({ id, ...values }),
  });
}

export async function deleteStudent(id: string): Promise<void> {
  await apiFetch(`/api/students?id=${encodeURIComponent(id)}`, {
    method: "DELETE",
  });
}

export function studentToFormValues(student: IStudent): IStudentFormValues {
  return {
    fullName: student.fullName,
    admissionNo: student.admissionNo,
    rollNumber: student.rollNumber,
    className: student.className,
    section: student.section,
    classId: student.classId ?? "",
    dateOfBirth: student.dateOfBirth,
    gender: student.gender,
    bloodGroup: student.bloodGroup,
    guardianName: student.guardianName,
    mobileNumber: student.mobileNumber,
  };
}
