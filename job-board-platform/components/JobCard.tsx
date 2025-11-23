import { Building2, Clock3, MapPin } from "lucide-react";
import Button from "./common/Button";

interface JobCardProps {
  job: {
    logoBg: string;
    logoColor: string;
    posted: string;
    title: string;
    company: string;
    type: string;
    level: string;
    location: string;
  };
}

export default function JobCard({ job }: JobCardProps) {
  return (
    <div className="bg-white p-4 rounded-xl shadow-sm border border-gray-100 hover:shadow-md transition-shadow group">
      <div className="flex justify-between items-start mb-4">
        <div className="flex gap-3">
          <div
            className={`w-12 h-12 rounded-full font-bold text-xl flex items-center justify-center ${job.logoBg} ${job.logoColor}`}
          >
            {job.company.charAt(0)}
          </div>
          <div>
            <h3 className="font-bold text-lg text-gray-900 group-hover:text-primary transition-colors">
              {job.title}
            </h3>
            <p className="text-sm text-gray-500 mb-4">{job.company}</p>
          </div>
        </div>
        <span className="text-xs font-medium text-gray-400 flex items-center gap-1">
          <Clock3 size={16} className="inline-block" />  {job.posted}</span>
      </div>

      <div className="flex flex-wrap gap-2 mb-4">
        <span className="px-2.5 py-1 rounded-md bg-gray-50 text-xs text-gray-600 font-medium border border-gray-100">
          {job.type}
        </span>
        <span className="px-2.5 py-1 rounded-md bg-gray-50 text-xs text-gray-600 font-medium border border-gray-100">
          {job.level}
        </span>
      </div>

      <div className="flex items-center justify-between border-gray-50">
        <div className="flex items-center gap-3 text-sm text-gray-500">
          <div className="flex gap-2">
            <MapPin size={14} />
            {job.location}
          </div>
          <div className="flex gap-2">
            <MapPin size={14} />
            {150000}
          </div>
        </div>
        <Button variant="primary" className="md:group-hover:scale-105">
          Apply
        </Button>
      </div>
    </div>
  );
}
