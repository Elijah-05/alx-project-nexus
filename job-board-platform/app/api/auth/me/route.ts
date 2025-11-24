import { NextResponse } from "next/server";
import { getUserFromRequest } from "@/lib/auth";

export async function GET(request: Request) {
  try {
    const user = await getUserFromRequest(request);
    if (!user) return NextResponse.json({ user: null });
    // hide passwordHash if present
    const out = { _id: String(user._id), name: user.name, email: user.email };
    return NextResponse.json({ user: out });
  } catch (err: unknown) {
    return NextResponse.json({ user: null });
  }
}
