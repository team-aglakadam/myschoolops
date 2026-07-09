import { NextResponse } from "next/server";
import { createClient } from "@/lib/supabase/server";

export async function GET() {
  const supabase = await createClient();

  const {
    data: { user },
    error: authError,
  } = await supabase.auth.getUser();

  if (authError || !user) {
    return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
  }

  const schoolId = user.user_metadata?.school_id;
  if (!schoolId) {
    return NextResponse.json({ data: null }, { status: 200 });
  }

  const { data: school, error } = await supabase
    .from("schools")
    .select("*")
    .eq("id", schoolId)
    .single();

  if (error) {
    return NextResponse.json({ error: error.message }, { status: 500 });
  }

  return NextResponse.json({ data: school }, { status: 200 });
}
