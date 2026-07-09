export type Json =
  | string
  | number
  | boolean
  | null
  | { [key: string]: Json | undefined }
  | Json[]

export type UserRole = "admin" | "teacher" | "student" | "staff" | "parent";
export type Gender = "male" | "female" | "other";
export type AttendanceStatus = "present" | "absent" | "leave";
export type EventType = "exam" | "holiday" | "working_day" | "event";

// ── Users table (public.users) ──────────────────────────────────────────
export interface DbUser {
  id: string;
  school_id: string | null;
  email: string;
  role: UserRole | null;
  full_name: string | null;
  phone: string | null;
  address: string | null;
  date_of_birth: string | null;
  blood_group: string | null;
  gender: string | null;
  auth_id: string | null;
  created_at: string | null;
  updated_at: string | null;
}

// ── Schools table ───────────────────────────────────────────────────────
export interface EnabledFeatures {
  fees: boolean;
  exams: boolean;
  reports: boolean;
  timetable: boolean;
  transport: boolean;
  attendance: boolean;
}

export interface DbSchool {
  id: string;
  name: string;
  address: string | null;
  phone: string | null;
  email: string | null;
  logo_url: string | null;
  principal_name: string | null;
  enabled_features: EnabledFeatures;
  created_at: string | null;
  updated_at: string | null;
}

// ── Teachers table ──────────────────────────────────────────────────────
export interface DbTeacher {
  id: string;
  user_id: string;
  school_id: string;
  is_class_teacher: boolean;
  class_assigned: string | null;
  designation: string | null;
  salary: number | null;
  date_of_joining: string | null;
  education_details: string | null;
  is_active: boolean | null;
  created_at: string | null;
}

// ── Students table ──────────────────────────────────────────────────────
export interface DbStudent {
  id: string;
  user_id: string | null;
  school_id: string | null;
  class_id: string | null;
  roll_number: string | null;
  parent_name: string | null;
  parent_number: string | null;
  is_active: boolean | null;
  created_at: string | null;
}

// ── Classes table ───────────────────────────────────────────────────────
export interface DbClass {
  id: string;
  school_id: string | null;
  name: string;
  section: string | null;
  class_teacher_id: string | null;
  created_at: string | null;
}

// ── Class subjects table ────────────────────────────────────────────────
export interface DbClassSubject {
  id: string;
  class_id: string | null;
  teacher_id: string | null;
  name: string;
  is_break: boolean | null;
  school_id: string | null;
  created_at: string | null;
}

// ── Teacher attendance table ────────────────────────────────────────────
export interface DbTeacherAttendance {
  id: string;
  teacher_id: string | null;
  school_id: string;
  date: string;
  status: AttendanceStatus | null;
  remarks: string | null;
  marked_by_admin_id: string | null;
  event_id: string | null;
  created_at: string | null;
  last_updated_at: string | null;
}

// ── Student attendance table ────────────────────────────────────────────
export interface DbStudentAttendance {
  id: string;
  student_id: string | null;
  school_id: string | null;
  date: string;
  status: AttendanceStatus;
  remarks: string | null;
  marked_by_admin_id: string | null;
  event_id: string | null;
  created_at: string | null;
  last_updated_at: string | null;
}

// ── Exams table ─────────────────────────────────────────────────────────
export interface DbExam {
  id: string;
  school_id: string;
  class_id: string;
  title: string;
  exam_start_date: string;
  exam_end_date: string | null;
  created_by: string | null;
  created_at: string | null;
}

// ── Exam subjects table ─────────────────────────────────────────────────
export interface DbExamSubject {
  id: string;
  exam_id: string;
  subject_id: string;
  max_marks: number;
  created_at: string | null;
}

// ── Student exam scores table ───────────────────────────────────────────
export interface DbStudentExamScore {
  id: string;
  exam_subject_id: string;
  student_id: string;
  marks_obtained: number | null;
  remarks: string | null;
  updated_by: string | null;
  created_at: string | null;
}

// ── Timetable tables ────────────────────────────────────────────────────
export interface DbClassTimetable {
  id: string;
  class_id: string | null;
  day_of_week: number; // 1-7
  created_at: string | null;
}

export interface DbTimetableSlot {
  id: string;
  class_timetable_id: string | null;
  slot_number: number | null;
  subject_id: string | null;
  start_time: string;
  end_time: string;
  slot_name: string | null;
  created_at: string | null;
}

// ── Calendar tables ─────────────────────────────────────────────────────
export interface DbCalendar {
  id: string;
  school_id: string | null;
  year: string;
  created_at: string | null;
}

export interface DbCalendarEvent {
  id: string;
  calendar_id: string | null;
  event_type: EventType | null;
  title: string;
  description: string | null;
  date: string;
  created_at: string | null;
}

// ── Salary payments table ───────────────────────────────────────────────
export interface DbSalaryPayment {
  id: string;
  teacher_id: string | null;
  school_id: string | null;
  amount: number;
  payment_date: string;
  payment_method: string | null;
  notes: string | null;
  created_by_admin_id: string | null;
  created_at: string | null;
}

// ── Class teacher map table ─────────────────────────────────────────────
export interface DbClassTeacherMap {
  id: string;
  class_id: string | null;
  teacher_id: string | null;
  assigned_at: string | null;
}

// ── Teacher subjects table ──────────────────────────────────────────────
export interface DbTeacherSubject {
  id: string;
  teacher_id: string | null;
  subject_id: string | null;
}
