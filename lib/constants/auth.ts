export const DUMMY_CREDENTIALS = {
  email: "admin@myschoolops.com",
  password: "password123",
} as const;

export const DUMMY_USER = {
  email: DUMMY_CREDENTIALS.email,
  name: "Andrew Smith",
  role: "School Administrator",
  initials: "AS",
} as const;

export const AUTH_STORAGE_KEY = "myschoolops_auth";
