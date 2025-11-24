"use client";

import { ArrowRight } from "lucide-react";
import Button from "../common/Button";
import JobCard from "../JobCard";
import { useEffect, useState } from "react";
import { useRouter } from "next/navigation";
import Link from "next/link";

export default function FeaturedJobs() {
  const [jobs, setJobs] = useState<JobCardProps[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  const router = useRouter();

  const goToJobsListPage = () => {
    router.push("/jobs"); // navigates to /jobs
  };

  useEffect(() => {
    let mounted = true;
    fetch("/api/jobs?featured=true&limit=6")
      .then((res) => {
        if (!res.ok) throw new Error(`API error ${res.status}`);
        return res.json();
      })
      .then((data) => {
        if (!mounted) return;
        setJobs(data.jobs ?? []);
      })
      .catch((err) => {
        if (!mounted) return;
        setError(err.message ?? "Failed to load featured jobs");
      })
      .finally(() => {
        if (!mounted) return;
        setLoading(false);
      });

    return () => {
      mounted = false;
    };
  }, []);

  return (
    <section className="py-14 md:py-20">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex justify-between items-end mb-10">
          <div>
            <h2 className="text-xl lg:text-2xl xl:text-3xl font-bold text-gray-900">Featured Jobs</h2>
            <p className="text-gray-500">Hand-picked opportunities for you.</p>
          </div>
          <Link
            href="jobs"
            className="group hidden sm:flex items-center pr-2 gap-1 text-gray-600 transition-all"
          >
            View all jobs{" "}
            <ArrowRight
              size={16}
              className="transition-all duration-300 group-hover:translate-x-1"
            />
          </Link>
        </div>

        {loading ? (
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <div className="h-40 bg-gray-50 rounded-xl animate-pulse" />
            <div className="h-40 bg-gray-50 rounded-xl animate-pulse" />
            <div className="h-40 bg-gray-50 rounded-xl animate-pulse" />
            <div className="h-40 bg-gray-50 rounded-xl animate-pulse" />
          </div>
        ) : error ? (
          <div className="text-red-500">{error}</div>
        ) : (
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            {jobs && jobs.length > 0 ? (
              jobs.map((job) => {
                return <JobCard key={job._id + job.title} job={job} />;
              })
            ) : (
              <div>No featured jobs available.</div>
            )}
          </div>
        )}

        <div className="mt-10 text-center">
          <Button
            variant="outline"
            className="text-gray-600 font-normal border py-3 border-slate-100"
            fullWidth
            onClick={() => goToJobsListPage()}
          >
            View all jobs
          </Button>
        </div>
      </div>
    </section>
  );
}
