import { NextResponse } from "next/server";
import { connectToDatabase } from "@/lib/mongodb";
import { ObjectId } from "mongodb";

export async function GET(request: Request) {
  // extract id from the request URL path to avoid strict handler signature issues
  try {
    const url = new URL(request.url);
    const parts = url.pathname.split("/").filter(Boolean);
    const id = parts[parts.length - 1];

    if (!id) return NextResponse.json({ error: "Missing id" }, { status: 400 });

    const { db } = await connectToDatabase();
    let _id: ObjectId;
    try {
      _id = new ObjectId(id);
    } catch {
      return NextResponse.json({ error: "Invalid id" }, { status: 400 });
    }

    const job = await db.collection("jobs").findOne({ _id });
    if (!job) return NextResponse.json({ error: "Not found" }, { status: 404 });

    // convert _id to string for JSON
    const out = { ...job, _id: String(job._id) };
    return NextResponse.json(out);
  } catch (err: unknown) {
    const message =
      err instanceof Error ? err.message : "Internal Server Error";
    return NextResponse.json({ error: message }, { status: 500 });
  }
}
