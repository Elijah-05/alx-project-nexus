import { NextResponse } from "next/server";
import { connectToDatabase } from "@/lib/mongodb";
import { verifyPassword, signToken, createAuthCookie } from "@/lib/auth";

export async function POST(request: Request) {
  try {
    const body = await request.json();
    const { email, password } = body;
    if (!email || !password)
      return NextResponse.json({ error: "Missing fields" }, { status: 400 });

    const { db } = await connectToDatabase();
    const user = await db.collection("users").findOne({ email });
    if (!user)
      return NextResponse.json(
        { error: "Invalid credentials" },
        { status: 401 }
      );

    const ok = await verifyPassword(password, user.passwordHash);
    if (!ok)
      return NextResponse.json(
        { error: "Invalid credentials" },
        { status: 401 }
      );

    const token = signToken({ userId: String(user._id), email });
    const cookie = createAuthCookie(token);
    const res = NextResponse.json({
      ok: true,
      user: { _id: String(user._id), name: user.name, email: user.email },
    });
    res.headers.set("Set-Cookie", cookie);
    return res;
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  } catch (err: any) {
    return NextResponse.json(
      { error: err?.message ?? "Internal Server Error" },
      { status: 500 }
    );
  }
}
