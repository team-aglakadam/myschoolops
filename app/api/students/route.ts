import { NextRequest, NextResponse } from "next/server";
import { createClient } from "@/lib/supabase/server";

async function getAuthSchoolId(
  supabase: Awaited<ReturnType<typeof createClient>>
) {
  const {
    data: { user },
    error,
  } = await supabase.auth.getUser();

  if (error || !user) {
    return { user: null, schoolId: null, authError: "Unauthorized" };
  }

  let schoolId: string | null = user.user_metadata?.school_id ?? null;

  if (!schoolId) {
    const { data: profile } = await supabase
      .from("users")
      .select("school_id")
      .eq("auth_id", user.id)
      .single();
    schoolId = profile?.school_id ?? null;
  }

  return { user, schoolId, authError: null };
}

// ── Types for raw DB rows ───────────────────────────────────────────────
interface DbStudentRow {
  id: string;
  roll_number: string | null;
  admission_no: string | null;
  is_active: boolean | null;
  created_at: string | null;
  class_id: string | null;
  parent_name: string | null;
  parent_number: string | null;
  users: {
    full_name: string | null;
    phone: string | null;
    date_of_birth: string | null;
    blood_group: string | null;
    gender: string | null;
  } | null;
  classes: {
    name: string | null;
    section: string | null;
  } | null;
}

function transformStudent(row: DbStudentRow) {
  return {
    id: row.id,
    fullName: row.users?.full_name ?? "",
    admissionNo: row.admission_no ?? "",
    rollNumber: row.roll_number ?? "",
    className: row.classes?.name ?? "",
    section: row.classes?.section ?? "",
    classId: row.class_id ?? "",
    dateOfBirth: row.users?.date_of_birth ?? "",
    gender: row.users?.gender ?? "",
    bloodGroup: row.users?.blood_group ?? "",
    guardianName: row.parent_name ?? "",
    mobileNumber: row.users?.phone ?? "",
    status: row.is_active !== false ? "active" : "inactive",
    createdAt: row.created_at ?? new Date().toISOString(),
  };
}

// ── GET /api/students ───────────────────────────────────────────────────
export async function GET(request: NextRequest) {
  try {
    const supabase = await createClient();
    const { schoolId, authError } = await getAuthSchoolId(supabase);

    if (authError) {
      return NextResponse.json({ error: authError }, { status: 401 });
    }
    if (!schoolId) {
      return NextResponse.json(
        { error: "No school associated with this account" },
        { status: 400 }
      );
    }

    const { searchParams } = new URL(request.url);
    const search = searchParams.get("search") ?? "";
    const filterClass = searchParams.get("className") ?? "";
    const filterSection = searchParams.get("section") ?? "";
    const filterStatus = searchParams.get("status") ?? "";
    const page = Math.max(1, Number(searchParams.get("page")) || 1);
    const pageSize = Math.min(
      50,
      Math.max(1, Number(searchParams.get("pageSize")) || 8)
    );

    // First get total count without filters for catalogCount
    const { count: catalogCount } = await supabase
      .from("students")
      .select("id", { count: "exact", head: true })
      .eq("school_id", schoolId);

    // Build filtered query
    let query = supabase
      .from("students")
      .select(
        `
        id,
        roll_number,
        admission_no,
        is_active,
        created_at,
        class_id,
        parent_name,
        parent_number,
        users!students_user_id_fkey (
          full_name,
          phone,
          date_of_birth,
          blood_group,
          gender
        ),
        classes!students_class_id_fkey (
          name,
          section
        )
      `,
        { count: "exact" }
      )
      .eq("school_id", schoolId);

    // Apply status filter
    if (filterStatus === "active") {
      query = query.eq("is_active", true);
    } else if (filterStatus === "inactive") {
      query = query.eq("is_active", false);
    }

    // Apply class/section filter via class_id lookup
    if (filterClass || filterSection) {
      // Get matching class IDs
      let classQuery = supabase
        .from("classes")
        .select("id")
        .eq("school_id", schoolId);

      if (filterClass) {
        classQuery = classQuery.eq("name", filterClass);
      }
      if (filterSection) {
        classQuery = classQuery.eq("section", filterSection);
      }

      const { data: matchingClasses } = await classQuery;
      const classIds = (matchingClasses ?? []).map((c) => c.id);

      if (classIds.length === 0) {
        // No matching classes → return empty
        return NextResponse.json({
          data: [],
          total: 0,
          page,
          pageSize,
          totalPages: 1,
          catalogCount: catalogCount ?? 0,
        });
      }

      query = query.in("class_id", classIds);
    }

    // Apply search (across full_name via users join isn't directly filterable,
    // so we fetch all matching and filter in memory for search)
    if (search.trim()) {
      // For search, we need to fetch without pagination, filter, then paginate
      const { data: allRows, error } = await query.order("created_at", {
        ascending: false,
      });

      if (error) {
        console.error("Error fetching students:", error);
        return NextResponse.json(
          { error: "Failed to fetch students" },
          { status: 500 }
        );
      }

      const q = search.trim().toLowerCase();
      const filtered = (allRows as unknown as DbStudentRow[]).filter((row) => {
        const haystack = [
          row.users?.full_name,
          row.roll_number,
          row.admission_no,
          row.parent_name,
          row.parent_number,
          row.users?.phone,
          row.classes?.name,
          row.classes?.section,
        ]
          .filter(Boolean)
          .join(" ")
          .toLowerCase();
        return haystack.includes(q);
      });

      const total = filtered.length;
      const totalPages = Math.max(1, Math.ceil(total / pageSize));
      const safePage = Math.min(page, totalPages);
      const start = (safePage - 1) * pageSize;

      return NextResponse.json({
        data: filtered.slice(start, start + pageSize).map(transformStudent),
        total,
        page: safePage,
        pageSize,
        totalPages,
        catalogCount: catalogCount ?? 0,
      });
    }

    // No search — use DB pagination
    const from = (page - 1) * pageSize;
    const to = from + pageSize - 1;

    const { data, error, count } = await query
      .order("created_at", { ascending: false })
      .range(from, to);

    if (error) {
      console.error("Error fetching students:", error);
      return NextResponse.json(
        { error: "Failed to fetch students" },
        { status: 500 }
      );
    }

    const total = count ?? 0;
    const totalPages = Math.max(1, Math.ceil(total / pageSize));

    return NextResponse.json({
      data: (data as unknown as DbStudentRow[]).map(transformStudent),
      total,
      page,
      pageSize,
      totalPages,
      catalogCount: catalogCount ?? 0,
    });
  } catch (err) {
    console.error("Unexpected error fetching students:", err);
    return NextResponse.json(
      { error: "An unexpected error occurred" },
      { status: 500 }
    );
  }
}

// ── POST /api/students ──────────────────────────────────────────────────
export async function POST(request: NextRequest) {
  try {
    const supabase = await createClient();
    const { schoolId, authError } = await getAuthSchoolId(supabase);

    if (authError) {
      return NextResponse.json({ error: authError }, { status: 401 });
    }
    if (!schoolId) {
      return NextResponse.json(
        { error: "No school associated with this account" },
        { status: 400 }
      );
    }

    const body = await request.json();

    // Validate required fields
    const fullName = (body.fullName as string)?.trim();
    const rollNumber = (body.rollNumber as string)?.trim();
    const classId = body.classId as string;
    const dateOfBirth = body.dateOfBirth as string;
    const gender = body.gender as string;
    const guardianName = (body.guardianName as string)?.trim();
    const mobileNumber = (body.mobileNumber as string)?.trim();

    if (!fullName) {
      return NextResponse.json(
        { error: "Full name is required" },
        { status: 400 }
      );
    }
    if (!rollNumber) {
      return NextResponse.json(
        { error: "Roll number is required" },
        { status: 400 }
      );
    }
    if (!classId) {
      return NextResponse.json(
        { error: "Class and section must be selected" },
        { status: 400 }
      );
    }
    if (!dateOfBirth) {
      return NextResponse.json(
        { error: "Date of birth is required" },
        { status: 400 }
      );
    }
    if (!gender) {
      return NextResponse.json(
        { error: "Gender is required" },
        { status: 400 }
      );
    }
    if (!guardianName) {
      return NextResponse.json(
        { error: "Guardian name is required" },
        { status: 400 }
      );
    }
    if (!mobileNumber) {
      return NextResponse.json(
        { error: "Mobile number is required" },
        { status: 400 }
      );
    }

    // Validate class_id belongs to this school
    const { data: classRow } = await supabase
      .from("classes")
      .select("id")
      .eq("id", classId)
      .eq("school_id", schoolId)
      .single();

    if (!classRow) {
      return NextResponse.json(
        { error: "Selected class/section does not exist" },
        { status: 400 }
      );
    }

    // Check duplicate roll number within same class
    const { data: dupRoll } = await supabase
      .from("students")
      .select("id")
      .eq("class_id", classId)
      .eq("roll_number", rollNumber)
      .eq("school_id", schoolId)
      .limit(1);

    if (dupRoll && dupRoll.length > 0) {
      return NextResponse.json(
        {
          error: `Roll number ${rollNumber} already exists in this class/section`,
        },
        { status: 409 }
      );
    }

    // Auto-generate unique email for users table
    const emailPrefix = crypto.randomUUID().slice(0, 12);
    const email = `stu-${emailPrefix}@school.local`;

    // 1. Create user record
    const { data: userData, error: userError } = await supabase
      .from("users")
      .insert({
        school_id: schoolId,
        email,
        role: "student",
        full_name: fullName,
        phone: mobileNumber,
        date_of_birth: dateOfBirth || null,
        blood_group: (body.bloodGroup as string)?.trim() || null,
        gender: gender || null,
      })
      .select("id")
      .single();

    if (userError) {
      console.error("Error creating user record:", userError);
      return NextResponse.json(
        { error: "Failed to create student record" },
        { status: 500 }
      );
    }

    // 2. Create student record
    const admissionNo = (body.admissionNo as string)?.trim() || null;

    const { data: studentData, error: studentError } = await supabase
      .from("students")
      .insert({
        user_id: userData.id,
        school_id: schoolId,
        class_id: classId,
        roll_number: rollNumber,
        admission_no: admissionNo,
        parent_name: guardianName,
        parent_number: mobileNumber,
        is_active: true,
      })
      .select("id")
      .single();

    if (studentError) {
      console.error("Error creating student record:", studentError);
      // Rollback: delete the user record we just created
      await supabase.from("users").delete().eq("id", userData.id);
      return NextResponse.json(
        { error: "Failed to create student record" },
        { status: 500 }
      );
    }

    return NextResponse.json(
      {
        data: { id: studentData.id },
        message: `${fullName} added successfully`,
      },
      { status: 201 }
    );
  } catch (err) {
    console.error("Unexpected error creating student:", err);
    return NextResponse.json(
      { error: "An unexpected error occurred" },
      { status: 500 }
    );
  }
}

// ── PUT /api/students ───────────────────────────────────────────────────
export async function PUT(request: NextRequest) {
  try {
    const supabase = await createClient();
    const { schoolId, authError } = await getAuthSchoolId(supabase);

    if (authError) {
      return NextResponse.json({ error: authError }, { status: 401 });
    }
    if (!schoolId) {
      return NextResponse.json(
        { error: "No school associated with this account" },
        { status: 400 }
      );
    }

    const body = await request.json();
    const studentId = body.id as string;

    if (!studentId) {
      return NextResponse.json(
        { error: "Student ID is required" },
        { status: 400 }
      );
    }

    // Fetch existing student to get user_id
    const { data: existing, error: fetchErr } = await supabase
      .from("students")
      .select("user_id, school_id, class_id")
      .eq("id", studentId)
      .eq("school_id", schoolId)
      .single();

    if (fetchErr || !existing) {
      return NextResponse.json(
        { error: "Student not found" },
        { status: 404 }
      );
    }

    const classId = body.classId as string | undefined;
    const rollNumber = (body.rollNumber as string)?.trim();

    // Check for duplicate roll number in the target class
    // Runs if either classId or rollNumber is changing
    if (classId || rollNumber) {
      const targetClassId = classId || existing.class_id;

      // Need the effective roll number — use new value if provided, else fetch existing
      let effectiveRollNumber = rollNumber;
      if (!effectiveRollNumber && targetClassId) {
        const { data: cur } = await supabase
          .from("students")
          .select("roll_number")
          .eq("id", studentId)
          .single();
        effectiveRollNumber = cur?.roll_number ?? undefined;
      }

      if (targetClassId && effectiveRollNumber) {
        const { data: dupRoll } = await supabase
          .from("students")
          .select("id")
          .eq("class_id", targetClassId)
          .eq("roll_number", effectiveRollNumber)
          .eq("school_id", schoolId)
          .neq("id", studentId)
          .limit(1);

        if (dupRoll && dupRoll.length > 0) {
          return NextResponse.json(
            {
              error: `Roll number ${effectiveRollNumber} already exists in this class/section`,
            },
            { status: 409 }
          );
        }
      }
    }

    // Validate class_id if provided
    if (classId) {
      const { data: classRow } = await supabase
        .from("classes")
        .select("id")
        .eq("id", classId)
        .eq("school_id", schoolId)
        .single();

      if (!classRow) {
        return NextResponse.json(
          { error: "Selected class/section does not exist" },
          { status: 400 }
        );
      }
    }

    // Update user record
    if (existing.user_id) {
      const userUpdate: Record<string, unknown> = {};
      if (body.fullName !== undefined)
        userUpdate.full_name = (body.fullName as string)?.trim() ?? "";
      if (body.mobileNumber !== undefined)
        userUpdate.phone = (body.mobileNumber as string)?.trim() ?? "";
      if (body.dateOfBirth !== undefined)
        userUpdate.date_of_birth = body.dateOfBirth || null;
      if (body.bloodGroup !== undefined)
        userUpdate.blood_group = (body.bloodGroup as string)?.trim() || null;
      if (body.gender !== undefined) userUpdate.gender = body.gender || null;

      if (Object.keys(userUpdate).length > 0) {
        const { error: userErr } = await supabase
          .from("users")
          .update(userUpdate)
          .eq("id", existing.user_id);

        if (userErr) {
          console.error("Error updating user:", userErr);
          return NextResponse.json(
            { error: "Failed to update student details" },
            { status: 500 }
          );
        }
      }
    }

    // Update student record
    const studentUpdate: Record<string, unknown> = {};
    if (classId !== undefined) studentUpdate.class_id = classId;
    if (rollNumber !== undefined) studentUpdate.roll_number = rollNumber;
    if (body.admissionNo !== undefined)
      studentUpdate.admission_no =
        (body.admissionNo as string)?.trim() || null;
    if (body.guardianName !== undefined)
      studentUpdate.parent_name = (body.guardianName as string).trim();
    if (body.mobileNumber !== undefined)
      studentUpdate.parent_number = (body.mobileNumber as string).trim();
    if (body.status !== undefined)
      studentUpdate.is_active = body.status === "active";

    if (Object.keys(studentUpdate).length > 0) {
      const { error: stuErr } = await supabase
        .from("students")
        .update(studentUpdate)
        .eq("id", studentId);

      if (stuErr) {
        console.error("Error updating student:", stuErr);
        return NextResponse.json(
          { error: "Failed to update student record" },
          { status: 500 }
        );
      }
    }

    return NextResponse.json({
      success: true,
      message: "Student updated successfully",
    });
  } catch (err) {
    console.error("Unexpected error updating student:", err);
    return NextResponse.json(
      { error: "An unexpected error occurred" },
      { status: 500 }
    );
  }
}

// ── DELETE /api/students ────────────────────────────────────────────────
export async function DELETE(request: NextRequest) {
  try {
    const supabase = await createClient();
    const { schoolId, authError } = await getAuthSchoolId(supabase);

    if (authError) {
      return NextResponse.json({ error: authError }, { status: 401 });
    }
    if (!schoolId) {
      return NextResponse.json(
        { error: "No school associated with this account" },
        { status: 400 }
      );
    }

    const { searchParams } = new URL(request.url);
    const studentId = searchParams.get("id");

    if (!studentId) {
      return NextResponse.json(
        { error: "Student ID is required" },
        { status: 400 }
      );
    }

    // Fetch student to verify ownership and get user_id
    const { data: student, error: fetchErr } = await supabase
      .from("students")
      .select("user_id")
      .eq("id", studentId)
      .eq("school_id", schoolId)
      .single();

    if (fetchErr || !student) {
      return NextResponse.json(
        { error: "Student not found" },
        { status: 404 }
      );
    }

    // Check for dependent attendance records
    const { count: attendanceCount } = await supabase
      .from("student_attendance")
      .select("id", { count: "exact", head: true })
      .eq("student_id", studentId);

    if (attendanceCount && attendanceCount > 0) {
      return NextResponse.json(
        {
          error:
            "Cannot delete this student because they have attendance records. Remove attendance records first.",
        },
        { status: 409 }
      );
    }

    // Check for dependent exam scores
    const { count: scoresCount } = await supabase
      .from("student_exam_scores")
      .select("id", { count: "exact", head: true })
      .eq("student_id", studentId);

    if (scoresCount && scoresCount > 0) {
      return NextResponse.json(
        {
          error:
            "Cannot delete this student because they have exam score records. Remove exam scores first.",
        },
        { status: 409 }
      );
    }

    // Delete student record
    const { error: delStudentErr } = await supabase
      .from("students")
      .delete()
      .eq("id", studentId)
      .eq("school_id", schoolId);

    if (delStudentErr) {
      console.error("Error deleting student:", delStudentErr);
      return NextResponse.json(
        { error: "Failed to delete student" },
        { status: 500 }
      );
    }

    // Delete associated user record
    if (student.user_id) {
      const { error: delUserErr } = await supabase
        .from("users")
        .delete()
        .eq("id", student.user_id)
        .eq("school_id", schoolId);

      if (delUserErr) {
        console.error("Error deleting user record:", delUserErr);
        // Student already deleted — log warning but don't fail
      }
    }

    return NextResponse.json({
      success: true,
      message: "Student deleted successfully",
    });
  } catch (err) {
    console.error("Unexpected error deleting student:", err);
    return NextResponse.json(
      { error: "An unexpected error occurred" },
      { status: 500 }
    );
  }
}
