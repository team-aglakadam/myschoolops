import type { User } from "@supabase/supabase-js";
import type { DbUser } from "@/types/database";

/** Mock identity used when NEXT_PUBLIC_SKIP_AUTH=true */
export const DEV_USER = {
  id: "00000000-0000-4000-8000-000000000001",
  email: "dev@myschoolops.local",
  app_metadata: {},
  user_metadata: {
    full_name: "Dev Admin",
    school_id: "00000000-0000-4000-8000-000000000010",
  },
  aud: "authenticated",
  created_at: new Date().toISOString(),
} as User;

export const DEV_PROFILE: DbUser = {
  id: "00000000-0000-4000-8000-000000000002",
  school_id: "00000000-0000-4000-8000-000000000010",
  email: "dev@myschoolops.local",
  role: "admin",
  full_name: "Dev Admin",
  phone: null,
  address: null,
  date_of_birth: null,
  blood_group: null,
  gender: null,
  auth_id: DEV_USER.id,
  created_at: new Date().toISOString(),
  updated_at: new Date().toISOString(),
};
