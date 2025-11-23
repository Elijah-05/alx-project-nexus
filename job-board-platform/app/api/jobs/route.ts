import { NextResponse } from "next/server";
import { connectToDatabase } from "@/lib/mongodb";

// GET /api/jobs
// Supports query parameters:
// - featured=true to only return featured jobs
// - q=searchText to search title/company/description
// - jobType, location, remote=true
// - minSalary, maxSalary
// - page, limit

export async function GET(request: Request) {
  const { searchParams } = new URL(request.url);
  const featured = searchParams.get("featured");
  const q = searchParams.get("q") ?? "";
  const page = Math.max(1, Number(searchParams.get("page") ?? 1));
  // server-side cap for list widgets
  const requestedLimit = Number(searchParams.get("limit") ?? 6);
  const limit = Math.min(12, Math.max(1, requestedLimit));
  const jobType = searchParams.get("jobType");
  const location = searchParams.get("location");
  const remote = searchParams.get("remote");
  const minSalary = searchParams.get("minSalary");
  const maxSalary = searchParams.get("maxSalary");

  try {
    const { db } = await connectToDatabase();
    const col = db.collection("jobs");

    // Build base filter (without isFeatured) so we can reuse for editorial and filler
    const baseFilter: any = {};
    if (q)
      baseFilter.$or = [
        { title: { $regex: q, $options: "i" } },
        { company: { $regex: q, $options: "i" } },
        { description: { $regex: q, $options: "i" } },
      ];
    if (jobType) baseFilter.jobType = jobType;
    if (location) baseFilter.location = { $regex: location, $options: "i" };
    if (remote === "true") baseFilter.remote = true;
    if (minSalary || maxSalary) {
      baseFilter["salary.min"] = {};
      if (minSalary) baseFilter["salary.min"].$gte = Number(minSalary);
      if (maxSalary) baseFilter["salary.min"].$lte = Number(maxSalary);
    }

    if (featured === "true") {
      // Combined approach: prefer editorial picks, fill with latest by date
      const N = limit;
      // 1) fetch editorial picks
      const editorialFilter = { ...baseFilter, isFeatured: true };
      const editorial = await col
        .find(editorialFilter)
        .sort({ postedAt: -1 })
        .limit(N)
        .toArray();

      // 2) if not enough editorial picks, fill with latest (excluding editorial ids)
      let jobs = editorial;
      if (editorial.length < N) {
        const excludedIds = editorial.map((j: any) => j._id);
        const fillerFilter: any = { ...baseFilter };
        if (excludedIds.length) fillerFilter._id = { $nin: excludedIds };
        const filler = await col
          .find(fillerFilter)
          .sort({ postedAt: -1 })
          .limit(N - editorial.length)
          .toArray();
        jobs = editorial.concat(filler);
      }

      const total = await col.countDocuments(baseFilter);
      return NextResponse.json({ jobs, total, page: 1, limit: N });
    }

    // Non-featured requests (regular search/list) use pagination
    const filter: any = { ...baseFilter };
    const skip = (page - 1) * limit;
    const [jobs, total] = await Promise.all([
      col.find(filter).sort({ postedAt: -1 }).skip(skip).limit(limit).toArray(),
      col.countDocuments(filter),
    ]);

    return NextResponse.json({ jobs, total, page, limit });
  } catch (err: any) {
    return NextResponse.json(
      { error: err?.message ?? "Internal Server Error" },
      { status: 500 }
    );
  }
}
