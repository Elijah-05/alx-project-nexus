"use client";
import React, { useState } from "react";
import { useRouter } from "next/navigation";
import { useAuth } from "@/context/AuthProvider";

const EXPERIENCE_LEVELS = [
  "Junior",
  "Mid Level",
  "Senior Level",
  "Lead",
] as const;
type ExperienceLevel = (typeof EXPERIENCE_LEVELS)[number];

const jobTypes = ["Full-time", "Part-time", "Contract", "Internship"] as const;
type JobType = (typeof jobTypes)[number];

const workTypes = ["On-site", "Remote", "Hybrid"] as const;
type WorkType = (typeof workTypes)[number];

export default function NewJobPage() {
  const router = useRouter();
  const [title, setTitle] = useState("");
  const [company, setCompany] = useState("");
  const [description, setDescription] = useState("");
  const [location, setLocation] = useState("");
  const [jobType, setJobType] = useState("Full-time");
  const [workType, setWorkType] = useState("On-site");
  const [experienceLevel, setExperienceLevel] = useState<ExperienceLevel[]>([]);
  const [salaryMin, setSalaryMin] = useState("");
  const [salaryMax, setSalaryMax] = useState("");
  const [tags, setTags] = useState("");
  const [isFeatured, setIsFeatured] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const { user, loading: loadingUser } = useAuth();
  const [publishing, setPublishing] = useState(false);

  const toggleExperience = (level: ExperienceLevel) => {
    setExperienceLevel((prev) =>
      prev.includes(level) ? prev.filter((v) => v !== level) : [...prev, level]
    );
  };

  async function handleSubmit(e: React.FormEvent) {
    e.preventDefault();
    setError(null);
    try {
      setPublishing(true);
      const payload = {
        title,
        company,
        description,
        location,
        jobType,
        workType,
        experienceLevel,
        salary: { min: Number(salaryMin || 0), max: Number(salaryMax || 0) },
        tags: tags ? tags.split(",").map((s) => s.trim()) : [],
        isFeatured,
      };
      const res = await fetch("/api/jobs", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(payload),
      });
      const data = await res.json();
      if (!res.ok) throw new Error(data?.error || "Failed to create job");
      const id = data?.job?._id || data?.job?.id || data?.insertedId;
      if (!id) router.push("/jobs");
      else router.push(`/jobs/${id}`);
      // eslint-disable-next-line @typescript-eslint/no-explicit-any
    } catch (err: any) {
      setError(err.message || String(err));
    } finally {
      setPublishing(false);
    }
  }

  function handleResetForm() {
    setTitle("");
    setCompany("");
    setDescription("");
    setLocation("");
    setJobType("Full-time");
    setWorkType("On-site");
    setExperienceLevel([]);
    setSalaryMin("");
    setSalaryMax("");
    setTags("");
    setIsFeatured(false);
  }

  if (!user || !user._id) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        {loadingUser ? "Loading..." : "You must be logged in to create a job."}
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-[#eef6ff] flex items-start justify-center pt-24 lg:pt-32 pb-12">
      <div className="w-full max-w-7xl  px-4 sm:px-6 lg:px-8">
        {/* Header */}
        <div className="flex flex-col md:flex-row gap-6 mb-8">
          <div>
            <h1 className="text-2xl md:text-3xl font-semibold">Create a New Job</h1>
            <p className="text-gray-600 mt-1">
              Provide job information and choose one or more experience levels.
            </p>
          </div>
        </div>

        {/* Form */}
        <form
          onSubmit={handleSubmit}
          className="bg-white rounded-xl shadow-md p-4 sm:p-6 md:p-8"
        >
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            {/* Title */}
            <div>
              <label className="block mb-2 text-sm font-medium text-gray-700">
                Job Title
              </label>
              <input
                value={title}
                onChange={(e) => setTitle(e.target.value)}
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
                value={company}
                onChange={(e) => setCompany(e.target.value)}
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
                value={jobType}
                onChange={(e) => setJobType(e.target.value as JobType)}
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
                value={workType}
                onChange={(e) => setWorkType(e.target.value as WorkType)}
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
                value={location}
                onChange={(e) => setLocation(e.target.value)}
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
                  value={salaryMin}
                  onChange={(e) => setSalaryMin(e.target.value)}
                  className="w-full px-4 py-3 border rounded-lg border-gray-300 focus:ring-2 focus:ring-primary outline-none"
                />
                <input
                  placeholder="Salary max"
                  type="number"
                  value={salaryMax}
                  onChange={(e) => setSalaryMax(e.target.value)}
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
              value={tags}
              onChange={(e) => setTags(e.target.value)}
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
              value={description}
              onChange={(e) => setDescription(e.target.value)}
              rows={6}
              placeholder="Describe responsibilities, tech stack, perks..."
              className="w-full px-4 py-3 border rounded-lg border-gray-300 focus:ring-2 focus:ring-primary outline-none resize-none"
            />
          </div>
          <div
            onClick={() => setIsFeatured((prev) => !prev)}
            className={`mt-1 py-2 w-fit rounded-lg text-sm cursor-pointer flex items-center gap-3 transition select-none `}
          >
            {/* Checkbox */}
            <div
              className={`size-6 flex items-center justify-center border rounded-sm ${
                isFeatured
                  ? "border-white text-white bg-primary /20"
                  : "border-gray-300"
              }`}
            >
              {isFeatured && (
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
                const selected = experienceLevel.includes(lvl);

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
          <div className="mt-6 flex flex-col md:flex-row items-stretch md:items-center justify-between gap-4">
            <button
              type="button"
              onClick={handleResetForm}
              className="px-4 py-2 border border-gray-300 rounded-lg hover:bg-gray-50 transition"
              disabled={publishing}
            >
              Reset
            </button>
            <button
              type="submit"
              className="px-6 py-3 rounded-lg bg-primary text-white font-medium hover:opacity-95 transition"
              disabled={publishing}
            >
              {publishing ? "Publishing..." : "Publish Job"}
            </button>
          </div>
        </form>
      </div>
    </div>
  );
}
