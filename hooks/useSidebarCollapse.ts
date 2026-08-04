import { SIDEBAR_STORAGE_KEY } from "@/utils/constants";
import { useState } from "react";


const getInitialCollapsed = () => {
  if (typeof window === "undefined") return false;
  return localStorage.getItem(SIDEBAR_STORAGE_KEY) === "true";
};

export const useSidebarCollapse = () => {
  const [isCollapsed, setIsCollapsed] = useState(getInitialCollapsed);

  const toggleCollapsed = () => {
    setIsCollapsed((prev) => {
      const newValue = !prev;
      localStorage.setItem(SIDEBAR_STORAGE_KEY, String(newValue));
      return newValue;
    });
  };

  return { isCollapsed, toggleCollapsed, setIsCollapsed };
}