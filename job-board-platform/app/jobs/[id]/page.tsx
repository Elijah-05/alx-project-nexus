"use client";

import Button from "@/components/common/Button";
import { JobClarificationPlaceholder } from "@/components/job-detail/JobClarificationPlaceholder";
import { JobDetailShimmer } from "@/components/job-detail/JobDetailShimmer";
import { useAuth } from "@/context/AuthProvider";
import { formatMoney, timeAgo } from "@/utils";
import { Briefcase, ChevronLeft, DollarSign, MapPin } from "lucide-react";
import Link from "next/link";
import { useParams } from "next/navigation";
import { useCallback, useEffect, useState } from "react";

export default function Page() {
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const [job, setJob] = useState<JobCardProps | null>(null);
  const params = useParams();
  const id = params.id;
  const { user } = useAuth();

  console.log("User in Job Detail Page:", user, job);

  const canEditJob = user && job && user._id === job.createdBy;

  const fetchJobs = useCallback(async () => {
    setLoading(true);
    setError(null);
    try {
      const res = await fetch(`/api/jobs/${id}`);
      if (!res.ok) throw new Error(`API error ${res.status}`);
      const data = await res.json();
      setJob(data);
    } catch (err: unknown) {
      const message =
        err instanceof Error ? err.message : "Failed to load jobs";
      setError(message);
    } finally {
      setLoading(false);
    }
  }, [id]);

  // initialize from URL for shareable links
  useEffect(() => {
    fetchJobs();
  }, [fetchJobs]);

  if (loading) {
    return <JobDetailShimmer />;
  }

  if (!loading && error) {
    return (
      <div className="min-h-screen pt-28 pb-20 bg-blue-50/30 flex items-start">
        <div className="max-w-3xl mx-auto px-4 sm:px-6 lg:px-8 w-full">
          <div className="bg-white rounded-2xl p-6 border border-red-100 shadow-sm">
            <h2 className="text-lg font-bold text-red-600 mb-2">
              Failed to load job
            </h2>
            <p className="text-sm text-gray-600 mb-4">{error}</p>
            <div className="flex items-center gap-3">
              <Button variant="primary" onClick={fetchJobs}>
                Retry
              </Button>
              <Link
                href="/jobs"
                className="text-sm text-gray-600 hover:underline"
              >
                Back to Jobs
              </Link>
            </div>
          </div>
        </div>
      </div>
    );
  }

  if (!job) {
    return (
      <div className="min-h-screen flex justify-center items-center">
        Job Detail Not Found
      </div>
    );
  }

  return (
    <div className="min-h-screen pt-28 pb-20 bg-blue-50/30">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Back Button */}
        <Link
          href="/jobs"
          className="inline-flex items-center gap-4 text-gray-700 hover:text-gray-900"
        >
          <div className="w-12 h-12 rounded-full bg-gray-200 flex items-center justify-center text-gray-500">
            <ChevronLeft size={20} />
          </div>
          <span className="font-medium">Back to Jobs</span>
        </Link>

        <div className="mt-4 flex flex-col lg:flex-row lg:gap-4">
          {/* Left Content - Job Description */}
          <div className="lg:col-span-2 space-y-8">
            {/* Header Card */}
            <div className="bg-white rounded-2xl max-lg:rounded-b-none p-8 border max-lg:border-b-0 border-gray-100 shadow-sm">
              <div className="flex flex-col sm:flex-row sm:items-start gap-5">
                <div className="w-16 h-16 rounded-full bg-gray-100 flex items-center justify-center text-gray-500 shrink-0">
                  <span className="text-2xl font-bold">C</span>
                </div>
                <div>
                  <h1 className="text-3xl font-bold text-gray-900 mb-2">
                    {job.title}
                  </h1>
                  <div className="flex flex-wrap items-center gap-2 text-sm text-gray-500 font-medium">
                    <span className="text-gray-900">{job.company}</span>
                    <div className="size-1 shrink-0 rounded-full bg-primary" />
                    <span>{job.location}</span>
                    <div className="size-1 shrink-0 rounded-full bg-primary" />
                    <span>{timeAgo(job.postedAt)}</span>
                  </div>
                </div>
              </div>

              <div className="mt-8 space-y-6 text-gray-600 leading-relaxed">
                <div>
                  <h3 className="text-lg font-bold text-gray-900 mb-3">
                    Job Overview:
                  </h3>
                  <p>{job.description}</p>
                </div>
                <JobClarificationPlaceholder />
              </div>
            </div>
          </div>

          {/* Right Sidebar */}
          <div className="lg:col-span-1 space-y-6 max-w-sm">
            {/* Apply Card */}
            <div className="bg-white flex flex-col-reverse lg:flex-col rounded-2xl p-6 border max-lg:border-t-0 max-lg:rounded-t-none border-gray-100 shadow-sm sticky lg:top-28">
              <Button
                variant="primary"
                fullWidth
                className="max-lg:mt-8 py-3 text-lg"
              >
                Apply Now
              </Button>
             {canEditJob && <Button
                variant="ghost"
                fullWidth
                className="mt-3 py-3 text-lg border border-primary"
                navigateTo={`/jobs/${job._id}/edit`}
              >
                Edit
              </Button>}

              <div className="lg:mt-8 space-y-6">
                <div className="flex items-start gap-4">
                  <div className="p-2 bg-gray-100 rounded-lg text-gray-600">
                    <Briefcase size={20} />
                  </div>
                  <div>
                    <p className="text-sm font-bold text-gray-900">Job Type</p>
                    <p className="text-sm text-gray-500">{job.jobType}</p>
                  </div>
                </div>

                <div className="flex items-start gap-4">
                  <div className="p-2 bg-gray-100 rounded-lg text-gray-600">
                    <MapPin size={20} />
                  </div>
                  <div>
                    <p className="text-sm font-bold text-gray-900">Location</p>
                    <p className="text-sm text-gray-500">
                      <span className="font-medium text-gray-800">
                        {job.workType}
                      </span>
                      , {job.location}
                    </p>
                  </div>
                </div>

                <div className="flex items-start gap-4">
                  <div className="p-2 bg-gray-100 rounded-lg text-gray-600">
                    <DollarSign size={20} />
                  </div>
                  <div>
                    <p className="text-sm font-bold text-gray-900">Salary</p>
                    <p className="text-sm text-gray-500">
                      {formatMoney(job.salary.min)} -{" "}
                      {formatMoney(job.salary.max)}
                    </p>
                  </div>
                </div>
              </div>

              <hr className="my-8 border-gray-100" />

              <div>
                <h4 className="font-bold text-gray-900 mb-4">
                  About the Company
                </h4>
                <div className="flex items-center gap-3 mb-4">
                  <div className="w-10 h-10 rounded-full bg-gray-100 flex items-center justify-center text-gray-500 font-bold">
                    C
                  </div>
                  <div>
                    <p className="font-bold text-gray-900 text-sm">ALX</p>
                    <a
                      href="#"
                      className="text-blue-500 text-xs hover:underline"
                    >
                      https://www.alxafrica.com/
                    </a>
                  </div>
                </div>
                <p className="text-xs text-gray-500 leading-relaxed">
                  ALX empowers young people to create demand-driven skills
                  training, access to jobs, income, dignity, and purpose. We
                  provide world-class training to future leaders.
                </p>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
