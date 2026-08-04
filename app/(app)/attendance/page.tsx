import type { Metadata } from "next";
import { AppPage } from "@/components/layout/app-page";

export const metadata: Metadata = {
  title: "Attendance — MySchoolOps",
  description: "Track and manage student attendance records.",
};

export default function AttendancePage() {
  return (
    <div className="h-full min-h-0 space-y-6 overflow-y-auto">
      <AppPage
        title="Attendance"
        description="Track and manage student attendance records."
      />
      {/* Attendance tracking content will go here */}
    </div>
  );
}
