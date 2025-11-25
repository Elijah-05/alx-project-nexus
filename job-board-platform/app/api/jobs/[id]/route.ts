/* eslint-disable @typescript-eslint/no-explicit-any */
import { NextResponse } from "next/server";
import { connectToDatabase } from "@/lib/mongodb";
import { ObjectId } from "mongodb";
import { getUserFromRequest } from "@/lib/auth";

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

export async function PATCH(request: Request) {
  try {
    const url = new URL(request.url);
    const parts = url.pathname.split("/").filter(Boolean);
    const id = parts[parts.length - 1];
    if (!id) return NextResponse.json({ error: "Missing id" }, { status: 400 });

    const user = await getUserFromRequest(request);
    if (!user)
      return NextResponse.json({ error: "Unauthorized" }, { status: 401 });

    let _id: ObjectId;
    try {
      _id = new ObjectId(id);
    } catch {
      return NextResponse.json({ error: "Invalid id" }, { status: 400 });
    }

    const { db } = await connectToDatabase();
    const job = await db.collection("jobs").findOne({ _id });
    if (!job) return NextResponse.json({ error: "Not found" }, { status: 404 });
    if (String(job.createdBy) !== String(user._id)) {
      return NextResponse.json({ error: "Forbidden" }, { status: 403 });
    }

    const updates = await request.json();
    const allowed = [
      "title",
      "company",
      "description",
      "location",
      "jobType",
      "workType",
      "experienceLevel",
      "salary",
      "tags",
      "isFeatured",
    ];
    const set: any = {};
    for (const k of allowed) {
      if (k in updates) set[k] = (updates as any)[k];
    }
    if (Object.keys(set).length === 0)
      return NextResponse.json(
        { error: "No valid fields to update" },
        { status: 400 }
      );
    set.updatedAt = new Date().toISOString();

    await db.collection("jobs").updateOne({ _id }, { $set: set });
    const updated = await db.collection("jobs").findOne({ _id });
    return NextResponse.json({ ok: true, job: updated });
  } catch (err: unknown) {
    const message =
      err instanceof Error ? err.message : "Internal Server Error";
    return NextResponse.json({ error: message }, { status: 500 });
  }
}

export async function DELETE(request: Request) {
  try {
    const url = new URL(request.url);
    const parts = url.pathname.split("/").filter(Boolean);
    const id = parts[parts.length - 1];
    if (!id) return NextResponse.json({ error: "Missing id" }, { status: 400 });

    const user = await getUserFromRequest(request);
    if (!user)
      return NextResponse.json({ error: "Unauthorized" }, { status: 401 });

    let _id: ObjectId;
    try {
      _id = new ObjectId(id);
    } catch {
      return NextResponse.json({ error: "Invalid id" }, { status: 400 });
    }

    const { db } = await connectToDatabase();
    const job = await db.collection("jobs").findOne({ _id });
    if (!job) return NextResponse.json({ error: "Not found" }, { status: 404 });
    if (String(job.createdBy) !== String(user._id)) {
      return NextResponse.json({ error: "Forbidden" }, { status: 403 });
    }

    await db.collection("jobs").deleteOne({ _id });
    return NextResponse.json({ ok: true });
  } catch (err: unknown) {
    const message =
      err instanceof Error ? err.message : "Internal Server Error";
    return NextResponse.json({ error: message }, { status: 500 });
  }
}
