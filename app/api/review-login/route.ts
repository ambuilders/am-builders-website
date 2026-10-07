import { NextResponse } from "next/server";

export async function POST(request: Request) {
  const body = await request.json().catch(() => ({}));
  const { password } = body;

  if (!password || password !== process.env.REVIEW_PAGE_PASSWORD) {
    return NextResponse.json({ error: "Incorrect password" }, { status: 401 });
  }

  const res = NextResponse.json({ ok: true });

  // The cookie stores an opaque session secret — NOT the password itself —
  // so a leaked cookie doesn't hand over the login password.
  res.cookies.set("am_review_auth", process.env.REVIEW_SESSION_SECRET ?? "", {
    httpOnly: true,
    secure: true,
    sameSite: "lax",
    path: "/",
    maxAge: 60 * 60 * 24 * 30, // 30 days
  });

  return res;
}
