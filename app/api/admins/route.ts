import { NextResponse } from "next/server";
import { createClient, createServiceClient } from "@/lib/supabase/server";

export async function POST(req: Request) {
  const supabase = await createClient();

  // 1. Auth check — must be signed in
  const {
    data: { user },
    error: authError,
  } = await supabase.auth.getUser();

  if (authError || !user) {
    return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
  }

  // 2. Role check — only an existing admin can create another admin
  const { data: requester, error: requesterError } = await supabase
    .from("users")
    .select("role, school_id")
    .eq("auth_id", user.id)
    .single();

  if (requesterError || requester?.role !== "admin") {
    return NextResponse.json({ error: "Forbidden" }, { status: 403 });
  }

  const schoolId = requester.school_id;
  if (!schoolId) {
    return NextResponse.json({ error: "No school associated with this account" }, { status: 400 });
  }

  // 3. Validate input
  const { email, password } = await req.json();

  if (typeof email !== "string" || !email.trim()) {
    return NextResponse.json({ error: "Email is required" }, { status: 400 });
  }
  if (typeof password !== "string" || password.length < 8) {
    return NextResponse.json(
      { error: "Password must be at least 8 characters" },
      { status: 400 }
    );
  }

  const serviceClient = await createServiceClient();

  // 4. Create the auth user — email verification skipped (email_confirm: true)
  const { data: authData, error: createAuthError } =
    await serviceClient.auth.admin.createUser({
      email,
      password,
      email_confirm: true,
      user_metadata: {
        school_id: schoolId,
        role: ["admin"],
      },
    });

  if (createAuthError || !authData.user) {
    return NextResponse.json(
      { error: createAuthError?.message || "Failed to create admin auth user" },
      { status: 400 }
    );
  }

  // 5. Create the users table profile row
  const { data: userData, error: userInsertError } = await serviceClient
    .from("users")
    .insert({
      school_id: schoolId,
      email,
      role: "admin",
      auth_id: authData.user.id,
    })
    .select()
    .single();

  if (userInsertError) {
    // Roll back the auth user if the profile insert failed
    await serviceClient.auth.admin.deleteUser(authData.user.id);
    return NextResponse.json({ error: userInsertError.message }, { status: 400 });
  }

  return NextResponse.json({ user: userData }, { status: 201 });
}
