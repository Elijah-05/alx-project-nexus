import { FEATURED_JOBS } from "@/constants";
import { ArrowRight } from "lucide-react";
import Button from "../common/Button";
import JobCard from "../JobCard";

export default function FeaturedJobs() {
    return (
  <section className="py-14 md:py-20 bg-white">
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
      <div className="flex justify-between items-end mb-10">
        <div>
          <h2 className="text-3xl font-bold text-gray-900">Featured Jobs</h2>
          <p className="text-gray-500">Hand-picked opportunities for you.</p>
        </div>
        <a href="#" className="group hidden sm:flex items-center pr-2 gap-1 text-gray-600 transition-all">
          View all jobs <ArrowRight size={16} className="transition-all duration-300 group-hover:translate-x-1" />
        </a>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        {FEATURED_JOBS.map((job) => (
          <JobCard key={job.id} job={job} />
        ))}
      </div>

      <div className="mt-10 text-center sm:hidden">
        <Button variant="outline" className="text-gray-600 font-normal border py-3" fullWidth>View all jobs</Button>
      </div>
    </div>
  </section>
);
}