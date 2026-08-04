import type {
  IClass,
  IClassFormValues,
  IClassListQuery,
  IClassListResult,
  IClassSection,
} from "@/types/IClassTypes";
import { MOCK_CLASSES } from "@/lib/classes/mock-data";

/**
 * In-memory class store.
 * Swap these function bodies for fetch("/api/classes") later.
 */
let classes: IClass[] = structuredClone(MOCK_CLASSES);

function delay(ms = 120) {
  return new Promise((resolve) => setTimeout(resolve, ms));
}

function toSections(
  values: IClassFormValues["sections"]
): IClassSection[] {
  return values
    .filter((s) => s.name.trim())
    .map((s) => ({
      id: crypto.randomUUID(),
      name: s.name.trim(),
      teacher: s.teacher.trim(),
      studentCount: 0,
      status: "active" as const,
    }));
}

export async function listClasses(
  query: IClassListQuery
): Promise<IClassListResult> {
  await delay();

  const q = query.search.trim().toLowerCase();
  const filtered = classes
    .filter((item) => {
      if (!q) return true;
      if (item.name.toLowerCase().includes(q)) return true;
      return item.sections.some(
        (section) =>
          section.name.toLowerCase().includes(q) ||
          section.teacher.toLowerCase().includes(q)
      );
    })
    .sort((a, b) => a.name.localeCompare(b.name, undefined, { numeric: true }));

  const totalSections = filtered.reduce(
    (sum, item) => sum + item.sections.length,
    0
  );

  return {
    items: filtered,
    total: filtered.length,
    totalSections,
  };
}

export async function getAllClasses(): Promise<IClass[]> {
  await delay();
  return structuredClone(classes);
}

export async function getClass(id: string): Promise<IClass | null> {
  await delay();
  const found = classes.find((c) => c.id === id);
  return found ? structuredClone(found) : null;
}

export async function createClass(values: IClassFormValues): Promise<IClass> {
  await delay();

  const name = values.name.trim();
  if (!name) throw new Error("Class name is required");

  const sections = toSections(values.sections);
  if (sections.length === 0) {
    throw new Error("Add at least one section");
  }

  const duplicate = classes.some(
    (c) => c.name.toLowerCase() === name.toLowerCase()
  );
  if (duplicate) {
    throw new Error("A class with this name already exists");
  }

  const created: IClass = {
    id: crypto.randomUUID(),
    name,
    sections,
    createdAt: new Date().toISOString(),
  };

  classes = [created, ...classes];
  return structuredClone(created);
}

export async function updateClass(
  id: string,
  values: IClassFormValues
): Promise<IClass> {
  await delay();

  const existing = classes.find((c) => c.id === id);
  if (!existing) throw new Error("Class not found");

  const name = values.name.trim();
  if (!name) throw new Error("Class name is required");

  const sections = toSections(values.sections);
  if (sections.length === 0) {
    throw new Error("Add at least one section");
  }

  const duplicate = classes.some(
    (c) => c.id !== id && c.name.toLowerCase() === name.toLowerCase()
  );
  if (duplicate) {
    throw new Error("A class with this name already exists");
  }

  // Preserve student counts when section names match
  const mergedSections = sections.map((section) => {
    const prev = existing.sections.find(
      (s) => s.name.toLowerCase() === section.name.toLowerCase()
    );
    return prev
      ? {
          ...section,
          id: prev.id,
          studentCount: prev.studentCount,
          status: prev.status,
        }
      : section;
  });

  const updated: IClass = {
    ...existing,
    name,
    sections: mergedSections,
  };

  classes = classes.map((c) => (c.id === id ? updated : c));
  return structuredClone(updated);
}

export async function deleteClass(id: string): Promise<void> {
  await delay();
  if (!classes.some((c) => c.id === id)) {
    throw new Error("Class not found");
  }
  classes = classes.filter((c) => c.id !== id);
}

export async function resetClasses(seed = false): Promise<void> {
  await delay(0);
  classes = seed ? structuredClone(MOCK_CLASSES) : [];
}
