import { NextRequest, NextResponse } from "next/server";
import { createClient } from "@/lib/supabase/server";

async function getAuthSchoolId(supabase: Awaited<ReturnType<typeof createClient>>) {
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

// ── GET /api/classes ────────────────────────────────────────────────────
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

    const { data, error } = await supabase
      .from("classes")
      .select(
        `
        id,
        name,
        section,
        class_teacher_id,
        created_at,
        students(count)
      `
      )
      .eq("school_id", schoolId)
      .order("name");

    if (error) {
      console.error("Error fetching classes:", error);
      return NextResponse.json(
        { error: "Failed to fetch classes" },
        { status: 500 }
      );
    }

    return NextResponse.json({ data: data ?? [] });
  } catch (err) {
    console.error("Unexpected error fetching classes:", err);
    return NextResponse.json(
      { error: "An unexpected error occurred" },
      { status: 500 }
    );
  }
}

// ── POST /api/classes ───────────────────────────────────────────────────
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
    const name = (body.name as string)?.trim();
    const sections = body.sections as Array<{ name: string; teacher: string }>;

    if (!name) {
      return NextResponse.json(
        { error: "Class name is required" },
        { status: 400 }
      );
    }
    if (!sections?.length) {
      return NextResponse.json(
        { error: "At least one section is required" },
        { status: 400 }
      );
    }

    // Check for duplicate class name within the school
    const { data: existing } = await supabase
      .from("classes")
      .select("id")
      .eq("school_id", schoolId)
      .ilike("name", name)
      .limit(1);

    if (existing && existing.length > 0) {
      return NextResponse.json(
        { error: "A class with this name already exists" },
        { status: 409 }
      );
    }

    // Insert one row per section
    const rows = sections
      .filter((s) => s.name.trim())
      .map((s) => ({
        name,
        section: s.name.trim(),
        school_id: schoolId,
        class_teacher_id: null,
      }));

    const { data, error } = await supabase
      .from("classes")
      .insert(rows)
      .select();

    if (error) {
      console.error("Error creating class:", error);
      return NextResponse.json(
        { error: "Failed to create class" },
        { status: 500 }
      );
    }

    return NextResponse.json(
      {
        data,
        message: `${name} created with ${rows.length} section(s)`,
      },
      { status: 201 }
    );
  } catch (err) {
    console.error("Unexpected error creating class:", err);
    return NextResponse.json(
      { error: "An unexpected error occurred" },
      { status: 500 }
    );
  }
}

// ── PUT /api/classes ────────────────────────────────────────────────────
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
    const className: string = body.className; // current class name
    const newName = (body.name as string)?.trim();
    const sections = body.sections as Array<{
      id?: string;
      name: string;
      teacher: string;
    }>;

    if (!className) {
      return NextResponse.json(
        { error: "Current class name (className) is required" },
        { status: 400 }
      );
    }
    if (!newName) {
      return NextResponse.json(
        { error: "New class name is required" },
        { status: 400 }
      );
    }
    if (!sections?.length) {
      return NextResponse.json(
        { error: "At least one section is required" },
        { status: 400 }
      );
    }

    // If renaming, check the new name isn't already taken
    if (newName.toLowerCase() !== className.toLowerCase()) {
      const { data: dup } = await supabase
        .from("classes")
        .select("id")
        .eq("school_id", schoolId)
        .ilike("name", newName)
        .limit(1);

      if (dup && dup.length > 0) {
        return NextResponse.json(
          { error: "A class with this name already exists" },
          { status: 409 }
        );
      }
    }

    // Fetch existing sections for this class (case-insensitive to match duplicate check)
    const { data: existing, error: fetchErr } = await supabase
      .from("classes")
      .select("id, section")
      .eq("school_id", schoolId)
      .ilike("name", className);

    if (fetchErr) {
      console.error("Error fetching existing sections:", fetchErr);
      return NextResponse.json(
        { error: "Failed to fetch existing class data" },
        { status: 500 }
      );
    }

    const existingIds = new Set((existing ?? []).map((row) => row.id));

    // Sections with an ID that exists in DB → update
    const toUpdate = sections.filter(
      (s) => s.id && existingIds.has(s.id) && s.name.trim()
    );

    // Sections without a DB ID (or ID not in DB) → insert
    const toInsert = sections.filter(
      (s) => s.name.trim() && (!s.id || !existingIds.has(s.id))
    );

    // Existing DB sections whose ID is not in the incoming list → delete
    const incomingIds = new Set(
      sections.filter((s) => s.id).map((s) => s.id!)
    );
    const toDelete = (existing ?? []).filter(
      (row) => !incomingIds.has(row.id)
    );

    // 1. Delete removed sections (check for enrolled students first)
    if (toDelete.length > 0) {
      const deleteIds = toDelete.map((r) => r.id);

      const { count: enrolledCount } = await supabase
        .from("students")
        .select("id", { count: "exact", head: true })
        .in("class_id", deleteIds);

      if (enrolledCount && enrolledCount > 0) {
        return NextResponse.json(
          {
            error: `Cannot remove section(s) because ${enrolledCount} student(s) are enrolled. Reassign students first.`,
          },
          { status: 409 }
        );
      }

      const { error: delErr } = await supabase
        .from("classes")
        .delete()
        .in("id", deleteIds);
      if (delErr) {
        console.error("Error deleting removed sections:", delErr);
        return NextResponse.json(
          { error: "Failed to remove old sections" },
          { status: 500 }
        );
      }
    }

    // 2. Update existing sections (section name, class name)
    for (const s of toUpdate) {
      const { error: updErr } = await supabase
        .from("classes")
        .update({ name: newName, section: s.name.trim() })
        .eq("id", s.id!);
      if (updErr) {
        console.error("Error updating section:", updErr);
        return NextResponse.json(
          { error: `Failed to update section ${s.name}` },
          { status: 500 }
        );
      }
    }

    // 3. Insert new sections
    if (toInsert.length > 0) {
      const rows = toInsert.map((s) => ({
        name: newName,
        section: s.name.trim(),
        school_id: schoolId,
        class_teacher_id: null,
      }));

      const { error: insErr } = await supabase
        .from("classes")
        .insert(rows);
      if (insErr) {
        console.error("Error inserting new sections:", insErr);
        return NextResponse.json(
          { error: "Failed to add new sections" },
          { status: 500 }
        );
      }
    }

    return NextResponse.json({
      success: true,
      message: `${newName} updated successfully`,
    });
  } catch (err) {
    console.error("Unexpected error updating class:", err);
    return NextResponse.json(
      { error: "An unexpected error occurred" },
      { status: 500 }
    );
  }
}

// ── DELETE /api/classes ─────────────────────────────────────────────────
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

    const body = await request.json();
    const className: string = body.name;

    if (!className) {
      return NextResponse.json(
        { error: "Class name is required" },
        { status: 400 }
      );
    }

    // Fetch rows to delete
    const { data: rows, error: fetchErr } = await supabase
      .from("classes")
      .select("id")
      .eq("school_id", schoolId)
      .eq("name", className);

    if (fetchErr) {
      console.error("Error fetching class for deletion:", fetchErr);
      return NextResponse.json(
        { error: "Failed to find class" },
        { status: 500 }
      );
    }

    if (!rows || rows.length === 0) {
      return NextResponse.json(
        { error: "Class not found" },
        { status: 404 }
      );
    }

    const ids = rows.map((r) => r.id);

    // Check for enrolled students before deleting
    const { count: studentCount } = await supabase
      .from("students")
      .select("id", { count: "exact", head: true })
      .in("class_id", ids);

    if (studentCount && studentCount > 0) {
      return NextResponse.json(
        {
          error: `Cannot delete ${className} because ${studentCount} student(s) are enrolled. Reassign or remove students first.`,
        },
        { status: 409 }
      );
    }

    // Delete class_teacher_map entries first (FK constraint)
    await supabase
      .from("class_teacher_map")
      .delete()
      .in("class_id", ids);

    // Delete the class rows
    const { error: delErr } = await supabase
      .from("classes")
      .delete()
      .in("id", ids);

    if (delErr) {
      console.error("Error deleting class:", delErr);
      return NextResponse.json(
        { error: "Failed to delete class. It may have timetable entries assigned." },
        { status: 500 }
      );
    }

    return NextResponse.json({
      success: true,
      message: `${className} and ${rows.length} section(s) deleted`,
    });
  } catch (err) {
    console.error("Unexpected error deleting class:", err);
    return NextResponse.json(
      { error: "An unexpected error occurred" },
      { status: 500 }
    );
  }
}
