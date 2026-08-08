import type {
  IClass,
  IClassFormValues,
  IClassListQuery,
  IClassListResult,
  IClassSection,
} from "@/types/IClassTypes";

// ── Types for raw DB rows returned by the API ───────────────────────────
interface DbClassRow {
  id: string;
  name: string;
  section: string | null;
  class_teacher_id: string | null;
  created_at: string | null;
  students: Array<{ count: number }>;
}

// ── Transform flat DB rows into grouped IClass objects ──────────────────
function groupRows(rows: DbClassRow[]): IClass[] {
  const map = new Map<string, IClass>();

  for (const row of rows) {
    const key = row.name;

    if (!map.has(key)) {
      map.set(key, {
        id: key,
        name: row.name,
        sections: [],
        createdAt: row.created_at ?? new Date().toISOString(),
      });
    }

    const cls = map.get(key)!;

    if (row.section) {
      const section: IClassSection = {
        id: row.id,
        name: row.section,
        teacher: "",
        studentCount: row.students?.[0]?.count ?? 0,
        status: "active",
      };
      cls.sections.push(section);
    }

    // Use the earliest created_at
    if (row.created_at && row.created_at < cls.createdAt) {
      cls.createdAt = row.created_at;
    }
  }

  return Array.from(map.values()).sort((a, b) =>
    a.name.localeCompare(b.name, undefined, { numeric: true })
  );
}

// ── API helper ──────────────────────────────────────────────────────────
async function apiFetch<T>(
  url: string,
  options?: RequestInit
): Promise<T> {
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

export async function fetchAllClasses(): Promise<IClass[]> {
  const { data } = await apiFetch<{ data: DbClassRow[] }>("/api/classes");
  return groupRows(data);
}

export async function listClasses(
  query: IClassListQuery
): Promise<IClassListResult> {
  const all = await fetchAllClasses();
  const q = query.search.trim().toLowerCase();

  const filtered = q
    ? all.filter((item) => {
        if (item.name.toLowerCase().includes(q)) return true;
        return item.sections.some(
          (s) =>
            s.name.toLowerCase().includes(q) ||
            s.teacher.toLowerCase().includes(q)
        );
      })
    : all;

  const totalSections = filtered.reduce(
    (sum, item) => sum + item.sections.length,
    0
  );

  return { items: filtered, total: filtered.length, totalSections };
}

export async function getAllClasses(): Promise<IClass[]> {
  return fetchAllClasses();
}

export async function createClass(values: IClassFormValues): Promise<void> {
  const name = values.name.trim();
  if (!name) throw new Error("Class name is required");

  const sections = values.sections.filter((s) => s.name.trim());
  if (sections.length === 0) throw new Error("Add at least one section");

  await apiFetch("/api/classes", {
    method: "POST",
    body: JSON.stringify({ name, sections }),
  });
}

export async function updateClass(
  id: string, // current class name (used as identifier)
  values: IClassFormValues
): Promise<void> {
  const name = values.name.trim();
  if (!name) throw new Error("Class name is required");

  const sections = values.sections.filter((s) => s.name.trim());
  if (sections.length === 0) throw new Error("Add at least one section");

  await apiFetch("/api/classes", {
    method: "PUT",
    body: JSON.stringify({
      className: id,
      name,
      sections,
    }),
  });
}

export async function deleteClass(id: string): Promise<void> {
  await apiFetch("/api/classes", {
    method: "DELETE",
    body: JSON.stringify({ name: id }),
  });
}
