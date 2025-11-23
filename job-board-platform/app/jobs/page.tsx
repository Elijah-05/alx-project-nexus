"use client";

import { useEffect, useState } from "react";
import JobCard from "@/components/JobCard";
import Button from "@/components/common/Button";

export default function JobsPage() {
  const [jobs, setJobs] = useState<JobCardProps[]>([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [page, setPage] = useState(1);
  const [total, setTotal] = useState(0);
  const [limit] = useState(10);
  const [q, setQ] = useState("");
  const [location, setLocation] = useState("");
  const [jobType, setJobType] = useState("");
  const [remote, setRemote] = useState(false);

  useEffect(() => {
    fetchJobs();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [page]);

  function buildUrl() {
    const params = new URLSearchParams();
    params.set("page", String(page));
    params.set("limit", String(limit));
    if (q) params.set("q", q);
    if (location) params.set("location", location);
    if (jobType) params.set("jobType", jobType);
    if (remote) params.set("remote", "true");
    return `/api/jobs?${params.toString()}`;
  }

  function mapToCard(job: JobCardProps) {
    return {
      // JobCard expects a full job shape (see components/JobCard.tsx)
      title: job.title,
      company: job.company,
      location: job.location ?? "Remote",
      description: job.description ?? "",
      salary: {
        min: job.salary?.min ?? 0,
        max: job.salary?.max ?? 0,
      },
      jobType: job.jobType ?? "Full-time",
      isFeatured: !!job.isFeatured,
      postedAt: job.postedAt ?? new Date().toISOString(),
      remote: !!job.remote,
      tags: job.tags ?? [],
    };
  }

  async function fetchJobs() {
    setLoading(true);
    setError(null);
    try {
      const url = buildUrl();
      const res = await fetch(url);
      if (!res.ok) throw new Error(`API error ${res.status}`);
      const data = await res.json();
      setJobs(data.jobs ?? []);
      setTotal(data.total ?? 0);
    } catch (err: any) {
      setError(err.message ?? "Failed to load jobs");
    } finally {
      setLoading(false);
    }
  }

  function onSearch(e: React.FormEvent) {
    e.preventDefault();
    setPage(1);
    fetchJobs();
  }

  return (
    <div className="py-14 md:py-20 lg:pt-40 bg-gray-50 min-h-screen">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <h1 className="text-3xl font-bold mb-4">All Jobs</h1>

        {/* <form onSubmit={onSearch} className="flex flex-wrap gap-3 mb-6">
          <input
            value={q}
            onChange={(e) => setQ(e.target.value)}
            placeholder="Search roles, companies..."
            className="flex-1 px-4 py-2 border rounded-md"
          />
          <input
            value={location}
            onChange={(e) => setLocation(e.target.value)}
            placeholder="Location"
            className="px-4 py-2 border rounded-md"
          />
          <select
            value={jobType}
            onChange={(e) => setJobType(e.target.value)}
            className="px-4 py-2 border rounded-md"
          >
            <option value="">Any type</option>
            <option>Full-time</option>
            <option>Part-time</option>
            <option>Contract</option>
            <option>Internship</option>
          </select>
          <label className="flex items-center gap-2">
            <input
              type="checkbox"
              checked={remote}
              onChange={(e) => setRemote(e.target.checked)}
            />{" "}
            Remote
          </label>
          <Button variant="primary">Search</Button>
        </form> */}

        {loading ? (
          <div>Loading...</div>
        ) : error ? (
          <div className="text-red-500">{error}</div>
        ) : (
          <>
            {jobs.length > 0 && (
              <div className="grid grid-cols-[200px_1fr]">
                <div>filters here</div>
                <div className="space-y-4">
                  {jobs.map((j) => (
                    <JobCard key={j._id ?? j.title} job={mapToCard(j)} />
                  ))}
                  <div className="flex items-center justify-between mt-8">
                    <div>
                      Showing{" "}
                      {Math.min(total, page * limit) - (page - 1) * limit} of{" "}
                      {total} jobs
                    </div>
                    <div className="flex gap-2">
                      <button
                        type="button"
                        onClick={() => setPage((p) => Math.max(1, p - 1))}
                        className="px-6 py-2.5 rounded-lg font-semibold transition-all duration-200 flex items-center justify-center gap-2 border-2 border-primary text-primary hover:bg-blue-50"
                      >
                        Previous
                      </button>
                      <button
                        type="button"
                        onClick={() => setPage((p) => p + 1)}
                        className="px-6 py-2.5 rounded-lg font-semibold transition-all duration-200 flex items-center justify-center gap-2 bg-primary text-white hover:bg-primary/90"
                      >
                        Next
                      </button>
                    </div>
                  </div>
                </div>
              </div>
            )}
            {jobs.length === 0 && !loading && <div>No jobs found.</div>}
          </>
        )}
      </div>
    </div>
  );
}
