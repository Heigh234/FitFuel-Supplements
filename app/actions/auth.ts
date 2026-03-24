"use server";

import { cookies } from "next/headers";

const SESSION_COOKIE = "fitfuel_session";
const SESSION_MAX_AGE = 60 * 60 * 24; // 24 hours

/**
 * Validates credentials against environment variables (never hardcoded).
 * Sets an httpOnly session cookie on success.
 */
export async function loginAction(
  email: string,
  password: string
): Promise<boolean> {
  const valid =
    email === process.env.DEMO_EMAIL &&
    password === process.env.DEMO_PASSWORD;

  if (!valid) return false;

  const cookieStore = await cookies();
  cookieStore.set(SESSION_COOKIE, "1", {
    httpOnly: true,
    secure: process.env.NODE_ENV === "production",
    sameSite: "lax",
    path: "/",
    maxAge: SESSION_MAX_AGE,
  });

  return true;
}

/**
 * Clears the session cookie server-side.
 */
export async function logoutAction(): Promise<void> {
  const cookieStore = await cookies();
  cookieStore.delete(SESSION_COOKIE);
}
