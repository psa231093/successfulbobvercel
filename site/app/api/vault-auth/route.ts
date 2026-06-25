import { NextResponse } from "next/server";

export async function POST(req: Request) {
  const { password } = await req.json();
  if (password === process.env.VAULT_PASSWORD) {
    const res = NextResponse.json({ ok: true });
    res.cookies.set("vault_access", "1", {
      httpOnly: true,
      path: "/",
      maxAge: 60 * 60 * 24 * 30,
      sameSite: "lax",
    });
    return res;
  }
  return NextResponse.json({ error: "Incorrect password" }, { status: 401 });
}
