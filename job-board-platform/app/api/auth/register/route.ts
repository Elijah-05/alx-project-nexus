import { NextResponse } from "next/server";
import { connectToDatabase } from "@/lib/mongodb";
import { hashPassword, signToken, createAuthCookie } from "@/lib/auth";

export async function POST(request: Request) {
  try {
    const body = await request.json();
    const { name, email, password } = body;
    if (!name || !email || !password) {
      return NextResponse.json({ error: "Missing fields" }, { status: 400 });
    }

    const { db } = await connectToDatabase();
    const existing = await db.collection("users").findOne({ email });
    if (existing) {
      return NextResponse.json(
        { error: "Email already registered" },
        { status: 400 }
      );
    }

    const passwordHash = await hashPassword(password);
    const result = await db
      .collection("users")
      .insertOne({
        name,
        email,
        passwordHash,
        createdAt: new Date().toISOString(),
      });
    const userId = String(result.insertedId);
    const token = signToken({ userId, email });
    const cookie = createAuthCookie(token);

    const res = NextResponse.json({
      ok: true,
      user: { _id: userId, name, email },
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
