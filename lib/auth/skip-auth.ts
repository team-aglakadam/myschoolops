/**
 * Temporary auth bypass while Supabase credentials are unsettled.
 * Set NEXT_PUBLIC_SKIP_AUTH=true in .env.local, then remove when ready.
 */
export function isAuthSkipped(): boolean {
  return process.env.NEXT_PUBLIC_SKIP_AUTH === "true";
}
