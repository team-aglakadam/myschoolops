"use client";

import { useCallback, useEffect, useRef, useState } from "react";
import { useDebouncedValue } from "@/hooks/useDebouncedValue";
import {
  createStudent,
  deleteStudent,
  getAllStudents,
  listStudents,
  updateStudent,
} from "@/lib/students/student-service";
import {
  DEFAULT_STUDENT_FILTERS,
  STUDENT_PAGE_SIZE,
  type IStudent,
  type IStudentFilters,
  type IStudentFormValues,
  type IStudentListResult,
} from "@/types/IStudentTypes";

export type StudentFeedback = {
  type: "success" | "error";
  message: string;
} | null;

const EMPTY_RESULT: IStudentListResult = {
  items: [],
  total: 0,
  page: 1,
  pageSize: STUDENT_PAGE_SIZE,
  totalPages: 1,
};

export function useStudents() {
  const [search, setSearch] = useState("");
  const [filters, setFilters] = useState<IStudentFilters>(DEFAULT_STUDENT_FILTERS);
  const [page, setPage] = useState(1);
  const [catalogCount, setCatalogCount] = useState(0);
  const [result, setResult] = useState<IStudentListResult>(EMPTY_RESULT);
  const [isLoading, setIsLoading] = useState(true);
  const [isMutating, setIsMutating] = useState(false);
  const [feedback, setFeedback] = useState<StudentFeedback>(null);

  const debouncedSearch = useDebouncedValue(search, 300);
  const requestId = useRef(0);

  // Keep latest query values for mutations without stale closures
  const queryRef = useRef({
    search: debouncedSearch,
    filters,
    page,
  });
  queryRef.current = { search: debouncedSearch, filters, page };

  const showFeedback = useCallback(
    (type: "success" | "error", message: string) => {
      setFeedback({ type, message });
    },
    []
  );

  const clearFeedback = useCallback(() => setFeedback(null), []);

  const load = useCallback(
    async (query: {
      search: string;
      filters: IStudentFilters;
      page: number;
    }) => {
      const id = ++requestId.current;
      setIsLoading(true);
      try {
        let data = await listStudents({
          search: query.search,
          filters: query.filters,
          page: query.page,
          pageSize: STUDENT_PAGE_SIZE,
        });

        // After deletes near the end of a page, step back if needed
        if (data.total > 0 && data.items.length === 0 && query.page > 1) {
          data = await listStudents({
            search: query.search,
            filters: query.filters,
            page: query.page - 1,
            pageSize: STUDENT_PAGE_SIZE,
          });
        }

        const all = await getAllStudents();
        if (id !== requestId.current) return;

        setResult(data);
        setPage(data.page);
        setCatalogCount(all.length);
      } catch {
        if (id !== requestId.current) return;
        showFeedback("error", "Could not load students. Please try again.");
      } finally {
        if (id === requestId.current) setIsLoading(false);
      }
    },
    [showFeedback]
  );

  const setSearchAndResetPage = useCallback((value: string) => {
    setSearch(value);
    setPage(1);
  }, []);

  const setFiltersAndResetPage = useCallback((value: IStudentFilters) => {
    setFilters(value);
    setPage(1);
  }, []);

  useEffect(() => {
    void load({
      search: debouncedSearch,
      filters,
      page,
    });
  }, [debouncedSearch, filters, page, load]);

  const create = useCallback(
    async (values: IStudentFormValues) => {
      setIsMutating(true);
      clearFeedback();
      try {
        await createStudent(values);
        setSearch("");
        setFilters(DEFAULT_STUDENT_FILTERS);
        setPage(1);
        await load({
          search: "",
          filters: DEFAULT_STUDENT_FILTERS,
          page: 1,
        });
        showFeedback("success", "Student created successfully.");
      } catch {
        showFeedback("error", "Failed to create student.");
        throw new Error("create_failed");
      } finally {
        setIsMutating(false);
      }
    },
    [clearFeedback, load, showFeedback]
  );

  const update = useCallback(
    async (id: string, values: IStudentFormValues) => {
      setIsMutating(true);
      clearFeedback();
      try {
        await updateStudent(id, values);
        await load(queryRef.current);
        showFeedback("success", "Student updated successfully.");
      } catch {
        showFeedback("error", "Failed to update student.");
        throw new Error("update_failed");
      } finally {
        setIsMutating(false);
      }
    },
    [clearFeedback, load, showFeedback]
  );

  const remove = useCallback(
    async (student: IStudent) => {
      setIsMutating(true);
      clearFeedback();
      try {
        await deleteStudent(student.id);
        await load(queryRef.current);
        showFeedback("success", `${student.fullName} was removed.`);
      } catch {
        showFeedback("error", "Failed to delete student.");
        throw new Error("delete_failed");
      } finally {
        setIsMutating(false);
      }
    },
    [clearFeedback, load, showFeedback]
  );

  return {
    search,
    setSearch: setSearchAndResetPage,
    filters,
    setFilters: setFiltersAndResetPage,
    page,
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
  };
}
