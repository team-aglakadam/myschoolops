"use client";

import { useCallback, useEffect, useRef, useState } from "react";
import { useDebouncedValue } from "@/hooks/useDebouncedValue";
import {
  createClass,
  deleteClass,
  getAllClasses,
  listClasses,
  updateClass,
} from "@/lib/classes/class-service";
import type {
  IClass,
  IClassFormValues,
  IClassListResult,
} from "@/types/IClassTypes";

export type ClassFeedback = {
  type: "success" | "error";
  message: string;
} | null;

const EMPTY_RESULT: IClassListResult = {
  items: [],
  total: 0,
  totalSections: 0,
};

export function useClasses() {
  const [search, setSearch] = useState("");
  const [catalogCount, setCatalogCount] = useState(0);
  const [result, setResult] = useState<IClassListResult>(EMPTY_RESULT);
  const [isLoading, setIsLoading] = useState(true);
  const [isMutating, setIsMutating] = useState(false);
  const [feedback, setFeedback] = useState<ClassFeedback>(null);

  const debouncedSearch = useDebouncedValue(search, 300);
  const requestId = useRef(0);
  const searchRef = useRef(debouncedSearch);
  searchRef.current = debouncedSearch;

  const showFeedback = useCallback(
    (type: "success" | "error", message: string) => {
      setFeedback({ type, message });
    },
    []
  );

  const clearFeedback = useCallback(() => setFeedback(null), []);

  const load = useCallback(
    async (searchValue: string) => {
      const id = ++requestId.current;
      setIsLoading(true);
      try {
        const [data, all] = await Promise.all([
          listClasses({ search: searchValue }),
          getAllClasses(),
        ]);
        if (id !== requestId.current) return;
        setResult(data);
        setCatalogCount(all.length);
      } catch {
        if (id !== requestId.current) return;
        showFeedback("error", "Could not load classes. Please try again.");
      } finally {
        if (id === requestId.current) setIsLoading(false);
      }
    },
    [showFeedback]
  );

  useEffect(() => {
    void load(debouncedSearch);
  }, [debouncedSearch, load]);

  const create = useCallback(
    async (values: IClassFormValues) => {
      setIsMutating(true);
      clearFeedback();
      try {
        await createClass(values);
        setSearch("");
        await load("");
        showFeedback("success", "Class created successfully.");
      } catch (error) {
        const message =
          error instanceof Error ? error.message : "Failed to create class.";
        showFeedback("error", message);
        throw error;
      } finally {
        setIsMutating(false);
      }
    },
    [clearFeedback, load, showFeedback]
  );

  const update = useCallback(
    async (id: string, values: IClassFormValues) => {
      setIsMutating(true);
      clearFeedback();
      try {
        await updateClass(id, values);
        await load(searchRef.current);
        showFeedback("success", "Class updated successfully.");
      } catch (error) {
        const message =
          error instanceof Error ? error.message : "Failed to update class.";
        showFeedback("error", message);
        throw error;
      } finally {
        setIsMutating(false);
      }
    },
    [clearFeedback, load, showFeedback]
  );

  const remove = useCallback(
    async (item: IClass) => {
      setIsMutating(true);
      clearFeedback();
      try {
        await deleteClass(item.id);
        await load(searchRef.current);
        showFeedback("success", `${item.name} was removed.`);
      } catch {
        showFeedback("error", "Failed to delete class.");
        throw new Error("delete_failed");
      } finally {
        setIsMutating(false);
      }
    },
    [clearFeedback, load, showFeedback]
  );

  return {
    search,
    setSearch,
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
