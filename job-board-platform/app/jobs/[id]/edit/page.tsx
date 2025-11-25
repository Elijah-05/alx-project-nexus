/* eslint-disable @typescript-eslint/no-explicit-any */
"use client";
import React, { useEffect, useState } from "react";
import { useRouter, useParams } from "next/navigation";
import { useAuth } from "@/context/AuthProvider";
import ShimmerJobForm from "@/components/jobform/ShimmerJobForm";

const EXPERIENCE_LEVELS = [
  "Junior",
  "Mid Level",
  "Senior Level",
  "Lead",
] as const;
type ExperienceLevel = (typeof EXPERIENCE_LEVELS)[number];

const jobTypes = ["Full-time", "Part-time", "Contract", "Internship"] as const;

const workTypes = ["On-site", "Remote", "Hybrid"] as const;

export default function EditJobPage() {
  const router = useRouter();
  const params = useParams() as { id?: string };
  const id = params?.id;
  const [loading, setLoading] = useState(true);
  const [job, setJob] = useState<JobCardProps | null>(null);
  const [error, setError] = useState<string | null>(null);
  const [updating, setUpdating] = useState(false);
  const { user, loading: loadingUser } = useAuth();

  useEffect(() => {
    if (!id) return;
    setLoading(true);
    fetch(`/api/jobs/${id}`)
      .then((r) => r.json())
      .then((data) => {
        setJob(data);
      })
      .catch((e) => setError(String(e)))
      .finally(() => setLoading(false));
  }, [id]);

  if (!loading && (!user || !job?.createdBy || user._id !== job?.createdBy)) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <p className="text-red-600">
          You do not have permission to edit this job.
        </p>
      </div>
    );
  }

  const toggleExperience = (level: ExperienceLevel) => {
    setJob((jo) => {
      if (!jo) return jo;
      return {
        ...jo,
        experienceLevel: jo?.experienceLevel?.includes(level)
          ? jo?.experienceLevel?.filter((v) => v !== level)
          : [...(jo?.experienceLevel || []), level],
      };
    });
  };

  async function handleSubmit(e: React.FormEvent) {
    e.preventDefault();
    setError(null);

    if (!job) {
      setError("Job data is missing");
      return;
    }

    try {
      setUpdating(true);
      const updates = {
        title: job.title,
        company: job.company,
        description: job.description,
        location: job.location,
        jobType: job.jobType,
        workType: job.workType,
        experienceLevel: job.experienceLevel,
        salary: job.salary,
        tags: job.tags,
        isFeatured: job.isFeatured,
      };
      const res = await fetch(`/api/jobs/${id}`, {
        method: "PATCH",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(updates),
      });
      const data = await res.json();
      if (!res.ok) throw new Error(data?.error || "Failed to update");
      router.push(`/jobs/${id}`);
    } catch (err: any) {
      setError(err.message || String(err));
    } finally {
      setUpdating(false);
    }
  }

  if (!id)
    return (
      <div className="min-h-screen p-6 pt-32 flex items-center justify-center">
        Missing job id
      </div>
    );
  if (loading) return <ShimmerJobForm />;
  if (!user || !user._id) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        {loadingUser ? "Loading..." : "You must be logged in to create a job."}
      </div>
    );
  }
  if (error)
    return (
      <div className="min-h-screen p-6 pt-32 flex items-center justify-center text-red-600">
        {error}
      </div>
    );

  if (job === null)
    return (
      <div className="min-h-screen p-6 pt-32 flex items-center justify-center text-red-600">
        {error}
      </div>
    );

  return (
    <div className="min-h-screen bg-[#eef6ff] flex justify-center pt-32 pb-12 px-4">
      <div className="w-full max-w-6xl">
        {/* Header */}
        <div className="flex flex-col md:flex-row gap-6 mb-8">
          <div>
            <h1 className="text-3xl font-semibold">Create a New Job</h1>
            <p className="text-gray-600 mt-1">
              Provide job information and choose one or more experience levels.
            </p>
          </div>
        </div>

        {/* Form */}
        <form
          onSubmit={handleSubmit}
          className="bg-white rounded-xl shadow-md p-6 md:p-8"
        >
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            {/* Title */}
            <div>
              <label className="block mb-2 text-sm font-medium text-gray-700">
                Job Title
              </label>
              <input
                value={job?.title || ""}
                onChange={(e) => setJob({ ...job, title: e.target.value })}
                placeholder="e.g. Frontend Developer"
                className="w-full px-4 py-3 border rounded-lg border-gray-300 focus:ring-2 focus:ring-primary outline-none"
              />
            </div>

            {/* Company */}
            <div>
              <label className="block mb-2 text-sm font-medium text-gray-700">
                Company
              </label>
              <input
                value={job?.company || ""}
                onChange={(e) => setJob({ ...job, company: e.target.value })}
                placeholder="e.g. Acme Corp"
                className="w-full px-4 py-3 border rounded-lg border-gray-300 focus:ring-2 focus:ring-primary outline-none"
              />
            </div>

            {/* Job Type */}
            <div>
              <label className="block mb-2 text-sm font-medium text-gray-700">
                Job Type
              </label>
              <select
                value={job?.jobType || "Full-time"}
                onChange={(e) =>
                  setJob({ ...job, jobType: e.target.value as JobType })
                }
                className="w-full px-4 py-3 border rounded-lg border-gray-300 bg-white focus:ring-2 focus:ring-primary outline-none"
              >
                {jobTypes.map((t) => (
                  <option key={t}>{t}</option>
                ))}
              </select>
            </div>

            {/* Work Type */}
            <div>
              <label className="block mb-2 text-sm font-medium text-gray-700">
                Work Type
              </label>
              <select
                value={job?.workType || "On-site"}
                onChange={(e) =>
                  setJob({ ...job, workType: e.target.value as WorkType })
                }
                className="w-full px-4 py-3 border rounded-lg border-gray-300 bg-white focus:ring-2 focus:ring-primary outline-none"
              >
                {workTypes.map((w) => (
                  <option key={w}>{w}</option>
                ))}
              </select>
            </div>

            {/* Location */}
            <div>
              <label className="block mb-2 text-sm font-medium text-gray-700">
                Location
              </label>
              <input
                value={job.location || ""}
                onChange={(e) => setJob({ ...job, location: e.target.value })}
                placeholder="City / Remote / Hybrid"
                className="w-full px-4 py-3 border rounded-lg border-gray-300 focus:ring-2 focus:ring-primary outline-none"
              />
            </div>

            {/* Salary */}
            <div>
              <label className="block mb-2 text-sm font-medium text-gray-700">
                Salary
              </label>
              <div className="flex flex-col xs:flex-row gap-2">
                <input
                  placeholder="Salary min"
                  type="number"
                  value={job?.salary?.min || ""}
                  onChange={(e) =>
                    setJob({
                      ...job,
                      salary: { ...job.salary, min: e.target.value },
                    })
                  }
                  className="w-full px-4 py-3 border rounded-lg border-gray-300 focus:ring-2 focus:ring-primary outline-none"
                />
                <input
                  placeholder="Salary max"
                  type="number"
                  value={job?.salary?.max || ""}
                  onChange={(e) =>
                    setJob({
                      ...job,
                      salary: { ...job.salary, max: e.target.value },
                    })
                  }
                  className="w-full px-4 py-3 border rounded-lg border-gray-300 focus:ring-2 focus:ring-primary outline-none"
                />
              </div>
            </div>
          </div>

          {/* Tags */}
          <div className="mt-4">
            <label className="block mb-2 text-sm font-medium text-gray-700">
              Tags
            </label>
            <input
              value={job?.tags?.join(", ") || ""}
              onChange={(e) =>
                setJob({
                  ...job,
                  tags: e.target.value.split(",").map((tag) => tag.trim()),
                })
              }
              placeholder="React, TypeScript, Node"
              className="w-full px-4 py-3 border rounded-lg border-gray-300 focus:ring-2 focus:ring-primary outline-none"
            />
          </div>

          {/* Description */}
          <div className="mt-4">
            <label className="block mb-2 text-sm font-medium text-gray-700">
              Description
            </label>
            <textarea
              value={job?.description || ""}
              onChange={(e) => setJob({ ...job, description: e.target.value })}
              rows={6}
              placeholder="Describe responsibilities, tech stack, perks..."
              className="w-full px-4 py-3 border rounded-lg border-gray-300 focus:ring-2 focus:ring-primary outline-none resize-none"
            />
          </div>
          <div
            onClick={() => setJob({ ...job, isFeatured: !job.isFeatured })}
            className={`mt-1 py-2 w-fit rounded-lg text-sm cursor-pointer flex items-center gap-3 transition select-none `}
          >
            {/* Checkbox */}
            <div
              className={`size-6 flex items-center justify-center border rounded-sm ${
                job.isFeatured
                  ? "border-white text-white bg-primary /20"
                  : "border-gray-300"
              }`}
            >
              {job.isFeatured && (
                <svg
                  width="14"
                  height="14"
                  viewBox="0 0 24 24"
                  fill="none"
                  stroke="currentColor"
                  strokeWidth="3"
                  strokeLinecap="round"
                  strokeLinejoin="round"
                >
                  <path d="M20 6L9 17l-5-5" />
                </svg>
              )}
            </div>
            Featured Job?
          </div>

          {/* Experience Levels */}
          <div className="mt-6">
            <label className="block mb-3 text-sm font-medium text-gray-700">
              Experience Level (select any)
            </label>

            <div className="flex flex-wrap gap-3">
              {EXPERIENCE_LEVELS.map((lvl) => {
                const selected = job?.experienceLevel?.includes(lvl);

                return (
                  <div
                    key={lvl}
                    onClick={() => toggleExperience(lvl)}
                    className={`px-4 py-2 rounded-lg border text-sm cursor-pointer flex items-center gap-3 transition select-none ${
                      selected
                        ? "bg-primary text-white border-primary shadow"
                        : "bg-white text-gray-700 border-gray-300 hover:shadow"
                    }`}
                  >
                    {/* Checkbox */}
                    <div
                      className={`w-5 h-5 flex items-center justify-center border rounded-sm ${
                        selected
                          ? "border-white bg-white/20"
                          : "border-gray-300"
                      }`}
                    >
                      {selected && (
                        <svg
                          width="14"
                          height="14"
                          viewBox="0 0 24 24"
                          fill="none"
                          stroke="currentColor"
                          strokeWidth="3"
                          strokeLinecap="round"
                          strokeLinejoin="round"
                        >
                          <path d="M20 6L9 17l-5-5" />
                        </svg>
                      )}
                    </div>

                    {lvl}
                  </div>
                );
              })}
            </div>
          </div>
          {error && <div className="mt-2 text-red-600">{error}</div>}
          {/* Submit */}
          <div className="mt-6 flex flex-col md:flex-row items-stretch md:items-center justify-end gap-4">
            <button
              type="submit"
              className="px-6 py-3 rounded-lg bg-primary text-white font-medium hover:opacity-95 transition"
              disabled={updating}
            >
              {updating ? "Updating..." : "Update Job"}
            </button>
          </div>
        </form>
      </div>
    </div>
  );
}
