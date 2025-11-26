"use client";

import { useState, useEffect, useCallback } from "react";
import { useRouter, useSearchParams } from "next/navigation";
import JobCard from "@/components/cards/JobCard";
import FilterSidebar from "@/components/job-list/FilterSidebar";
import MobileFilterDrawer from "@/components/job-list/MobileFilterDrawer";
import Image from "next/image";
import { SlidersHorizontal } from "lucide-react";
import Pagination from "@/components/common/Pagination";
import JobCardSkeleton from "@/components/job-list/JobCardSkeleton";

export default function JobsPage() {
  const [isFilterOpen, setIsFilterOpen] = useState(false);

  const [jobs, setJobs] = useState<JobCardProps[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const [page, setPage] = useState(1);
  const [limit] = useState(6);
  const [total, setTotal] = useState(0);

  const [filters, setFilters] = useState<{
    jobType?: string;
    experience?: string;
    location?: string;
    q?: string;
  }>({});

  const router = useRouter();
  const searchParams = useSearchParams();

  // initialize from URL for shareable links
  useEffect(() => {
    const p = Number(searchParams.get("page") ?? "1") || 1;
    const q = searchParams.get("q") ?? "";
    const jobType = searchParams.get("jobType") ?? "";
    const location = searchParams.get("location") ?? "";
    const experience = searchParams.get("experience") ?? "";

    setPage(p);
    setFilters((prev) => ({
      ...prev,
      q: q || undefined,
      jobType: jobType || undefined,
      location: location || undefined,
      experience: experience || undefined,
    }));
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  const fetchJobs = useCallback(async () => {
    setLoading(true);
    setError(null);
    try {
      const params = new URLSearchParams();
      params.set("page", String(page));
      params.set("limit", String(limit));
      if (filters.q) params.set("q", filters.q);
      if (filters.jobType) params.set("jobType", filters.jobType);
      if (filters.experience) params.set("experience", filters.experience);
      if (filters.location) params.set("location", filters.location);

      // sync URL so the current filters/page are shareable
      const url = `/jobs?${params.toString()}`;
      // replace to avoid creating history entries on each fetch
      router.replace(url);

      const res = await fetch(`/api/jobs?${params.toString()}`);
      if (!res.ok) throw new Error(`API error ${res.status}`);
      const data = await res.json();
      setJobs(data.jobs ?? []);
      setTotal(data.total ?? 0);
    } catch (err: unknown) {
      const message =
        err instanceof Error ? err.message : "Failed to load jobs";
      setError(message);
    } finally {
      setLoading(false);
    }
  }, [page, limit, filters, router]);

  useEffect(() => {
    fetchJobs();
  }, [fetchJobs]);

  function handleFilterChange(key: keyof typeof filters, value: string) {
    setFilters((prev) => {
      // if same value selected again (or empty string), remove the key
      if (prev[key] === value || value === "") {
        // eslint-disable-next-line @typescript-eslint/no-unused-vars
        const { [key]: _removed, ...rest } = prev;
        return rest;
      }
      // otherwise set/update the value
      return { ...prev, [key]: value };
    });
    setPage(1);
  }

  function handleReset() {
    setFilters({});
    setPage(1);
  }

  function handlePrev() {
    if (page > 1) {
      setPage(page - 1);
    }
  }

  function handleNext() {
    if (page < Math.ceil(total / limit)) {
      setPage(page + 1);
    }
  }

  return (
    <div className="min-h-screen pt-20 ">
      <div className="max-w-7xl mx-auto px-4 pt-4 pb-6">
        <div className="grid grid-cols-1 md:grid-cols-[130px_1fr] lg:grid-cols-[150px_1fr] xl:grid-cols-[200px_1fr] gap-4">
          {/* Desktop Sidebar */}
          <div className="hidden md:block sticky top-20 h-fit">
            <FilterSidebar
              filters={filters}
              onChange={(k, v) =>
                handleFilterChange(
                  k as "jobType" | "experience" | "location",
                  v
                )
              }
              onReset={handleReset}
            />
          </div>

          {/* Mobile Filter Drawer */}
          <MobileFilterDrawer
            open={isFilterOpen}
            filters={filters}
            onChange={(k, v) =>
              handleFilterChange(k as "jobType" | "experience" | "location", v)
            }
            onReset={handleReset}
            onClose={() => setIsFilterOpen(false)}
          />

          {/* Job Cards List */}
          <div className="space-y-4">
            <div className="sticky top-20 pt-4 bg-background flex items-strech justify-between flex-wrap pb-4 gap-4">
              <div className="relative flex grow max-w-md gap-2">
                <input
                  value={filters.q ?? ""}
                  onChange={(e) =>
                    setFilters((p) => ({ ...p, q: e.target.value }))
                  }
                  placeholder="Search jobs, companies..."
                  className="grow pl-12 pr-3 py-3 rounded-md minw-0 border border-gray-300 outline-none"
                />
                <Image
                  src="/assets/icon/search.png"
                  alt="Search"
                  width={24}
                  height={24}
                  className="absolute left-3 top-1/2 transform -translate-y-1/2 pointer-events-none"
                />
              </div>
              {/* Mobile Filter Button */}
              <button
                type="button"
                onClick={() => setIsFilterOpen(true)}
                className="grow md:hidden flex items-center justify-center gap-2 border py-2 px-4 border-gray-400 rounded-lg"
              >
                <SlidersHorizontal size={16} />
                Filters
              </button>
            </div>

            {loading ? (
              <div className="space-y-4">
                <JobCardSkeleton />
                <JobCardSkeleton />
                <JobCardSkeleton />
              </div>
            ) : error ? (
              <div className="text-red-500">{error}</div>
            ) : (
              <div className="pb-14">
                <div className="grid grid-cols-1 gap-4 px-1">
                  {jobs.map((job) => {
                    return <JobCard key={job._id ?? job.title} job={job} />;
                  })}
                </div>

                {jobs.length > 0 && (
                  <div className="flex flex-col sm:flex-row gap-4 items-center justify-between mt-12">
                    <div className="text-gray-400">
                      Showing {(page - 1) * limit + 1} -{" "}
                      {Math.min(page * limit, total)} of {total}
                    </div>

                    <Pagination
                      page={page}
                      total={total}
                      limit={limit}
                      onClickPage={(pg) => setPage(pg)}
                      onPrev={() => handlePrev()}
                      onNext={() => handleNext()}
                    />
                  </div>
                )}
              </div>
            )}
            {!loading && !error && jobs.length === 0 && (
              <div className="text-center text-gray-500 mt-20">
                No jobs found matching your criteria.
              </div>
            )}
          </div>
        </div>
      </div>
    </div>
  );
}
