# Supabase Backend Reference

## Project

- **Project ref:** `bbmkzwzczzvqljbtqcpa`
- **Project URL:** `https://bbmkzwzczzvqljbtqcpa.supabase.co`
- **MCP configured:** `.mcp.json` at repo root (`/Users/harish.bogam/schools/.mcp.json`)

## Environment Variables

Required in `.env.local`:

```
NEXT_PUBLIC_SUPABASE_URL=https://bbmkzwzczzvqljbtqcpa.supabase.co
NEXT_PUBLIC_SUPABASE_ANON_KEY=<anon key>
NEXT_PUBLIC_SUPABASE_ANON_KEY=<service role key>
```

The service role key is needed for admin operations (creating/deleting auth users). Get it from the Supabase dashboard > Settings > API.

## Database Schema

### Tables (public schema)

| Table | RLS | Rows | Purpose |
|-------|-----|------|---------|
| `users` | Yes | 16 | User profiles (linked to auth.users via `auth_id`) |
| `schools` | Yes | 3 | School records with `enabled_features` JSONB |
| `teachers` | Yes | 5 | Teacher records (linked to `users` via `user_id`) |
| `students` | Yes | 5 | Student records (linked to `users` via `user_id`) |
| `classes` | No | 11 | Classes with section and class_teacher_id |
| `class_subjects` | No | 7 | Subjects assigned to classes |
| `class_teacher_map` | No | 5 | Class-teacher assignments |
| `class_timetable` | Yes | 2 | Timetable per class per day_of_week (1-7) |
| `timetable_slots` | Yes | 4 | Individual time slots within a timetable |
| `teacher_attendance` | Yes | 20 | Teacher attendance with status (present/absent/leave) |
| `student_attendance` | Yes | 0 | Student attendance with status (present/absent/leave) |
| `exams` | No | 0 | Exam definitions with date range |
| `exam_subjects` | No | 0 | Subjects within an exam with max_marks |
| `student_exam_scores` | No | 0 | Student scores per exam subject |
| `calendars` | No | 0 | Academic year calendars per school |
| `calendar_events` | No | 0 | Events (exam/holiday/working_day/event) |
| `salary_payments` | No | 0 | Teacher salary payment records |
| `teacher_subjects` | No | 0 | Teacher-subject assignments |

### Key Relationships

```
auth.users (Supabase Auth)
  └── users.auth_id → auth.users.id
        ├── teachers.user_id → users.id
        │     ├── teacher_attendance.teacher_id → teachers.id
        │     ├── class_subjects.teacher_id → teachers.id
        │     ├── classes.class_teacher_id → teachers.id
        │     └── salary_payments.teacher_id → teachers.id
        └── students.user_id → users.id
              ├── student_attendance.student_id → students.id
              └── student_exam_scores.student_id → students.id

schools.id
  ├── users.school_id
  ├── teachers.school_id
  ├── students.school_id
  ├── classes.school_id
  ├── class_subjects.school_id
  ├── teacher_attendance.school_id
  ├── student_attendance.school_id
  ├── exams.school_id
  ├── calendars.school_id
  └── salary_payments.school_id
```

### users table columns

| Column | Type | Notes |
|--------|------|-------|
| id | uuid (PK) | Auto-generated |
| auth_id | uuid | Links to `auth.users.id` |
| school_id | uuid (FK) | Links to `schools.id` |
| email | text (unique) | |
| role | text | admin, teacher, student, staff, parent |
| full_name | text | |
| phone | text | |
| address | text | |
| date_of_birth | date | |
| blood_group | text | |
| gender | text | |
| created_at | timestamptz | |
| updated_at | timestamptz | |

### schools table columns

| Column | Type | Notes |
|--------|------|-------|
| id | uuid (PK) | Auto-generated |
| name | text | |
| address | text | |
| phone | text | |
| email | text | |
| logo_url | text | |
| principal_name | text | |
| enabled_features | jsonb | `{fees, exams, reports, timetable, transport, attendance}` |
| created_at | timestamptz | |
| updated_at | timestamptz | |

### Auth User Metadata

When creating auth users, store in `user_metadata`:
- `full_name` — display name
- `school_id` — associated school UUID
- `role` — user role string (or array like `["teacher"]`)

This metadata is accessible on the client via `user.user_metadata` without a DB query.

## Supabase Client Setup

### Files

| File | Export | Usage |
|------|--------|-------|
| `lib/supabase/client.ts` | `createClient()` | Browser-side client (client components) |
| `lib/supabase/server.ts` | `createClient()` | Server-side client (API routes, server components) |
| `lib/supabase/server.ts` | `createServiceClient()` | Service role client (admin ops: create/delete auth users) |
| `lib/supabase/middleware.ts` | `updateSession()` | Middleware session refresh |

### When to use which client

- **Browser client** (`client.ts`): Client components, real-time subscriptions, auth state listening
- **Server client** (`server.ts` → `createClient`): API routes, server components, reading data with user's auth context
- **Service client** (`server.ts` → `createServiceClient`): Admin operations that bypass RLS — creating auth users, deleting users, etc. Never expose to client.

## Auth Flow

1. **Login:** `POST /api/auth/sign-in` → `supabase.auth.signInWithPassword`
2. **Signup:** `POST /api/auth/sign-up` → `supabase.auth.signUp` with `user_metadata`
3. **Logout:** `POST /api/auth/sign-out` → `supabase.auth.signOut`
4. **OAuth callback:** `GET /api/auth/callback` → `supabase.auth.exchangeCodeForSession`
5. **Session refresh:** Middleware runs on every request via `updateSession()`

### AuthProvider (client-side)

- Exposes: `user` (Supabase User), `profile` (DbUser from users table), `session`, `schoolId`, `isAuthenticated`, `isLoading`, `login()`, `logout()`
- On auth state change, fetches user profile from `users` table using `auth_id`
- `schoolId` resolved from: profile.school_id → user_metadata.school_id

## API Route Pattern

All protected API routes should follow this pattern:

```typescript
import { createClient } from "@/lib/supabase/server";

export async function GET() {
  const supabase = await createClient();

  // 1. Auth check
  const { data: { user }, error: authError } = await supabase.auth.getUser();
  if (authError || !user) {
    return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
  }

  // 2. Get school context
  const schoolId = user.user_metadata?.school_id;

  // 3. Query with school isolation
  const { data, error } = await supabase
    .from("table_name")
    .select("*")
    .eq("school_id", schoolId);

  // 4. Return response
  return NextResponse.json({ data });
}
```

### Role-based access

```typescript
// Fetch user role from users table
const { data: userData } = await supabase
  .from("users")
  .select("role")
  .eq("auth_id", user.id)
  .single();

if (userData?.role !== "admin") {
  return NextResponse.json({ error: "Forbidden" }, { status: 403 });
}
```

## RLS Status

10 tables currently have RLS **disabled** and need policies:
`calendar_events`, `calendars`, `class_subjects`, `class_teacher_map`, `classes`, `exam_subjects`, `exams`, `salary_payments`, `student_exam_scores`, `teacher_subjects`

## TypeScript Types

- `types/database.ts` — All table types matching the live database schema
- `types/user.ts` — User interface
