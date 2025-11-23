import { formatMoney, lighten, randomHexColor, timeAgo } from "@/utils";
import { CircleDollarSign, Clock3, MapPin } from "lucide-react";
import Button from "./common/Button";

export default function JobCard({ job }: { job: JobCardProps }) {
  const base = randomHexColor();
  const bg = lighten(base, 0.1); // very light version
  const text = base;

  return (
    <div className="bg-white p-4 rounded-xl shadow-sm border border-gray-100 hover:shadow-md transition-shadow group">
      <div className="flex justify-between items-start mb-4">
        <div className="flex gap-3">
          <div
            className={`size-12 shrink-0 rounded-full font-bold text-xl flex items-center justify-center `}
            style={{
              backgroundColor: bg,
              color: text,
            }}
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
        <span className="max-xs:hidden text-xs font-medium text-gray-400 flex items-center gap-1">
          <Clock3 size={16} className="inline-block" /> {timeAgo(job.postedAt)}
        </span>
      </div>

      <div className="flex flex-wrap gap-2 mb-4">
        {job.tags.map((tag, idx) => (
          <span
            key={idx}
            className="px-2.5 py-1 rounded-md bg-gray-50 text-xs text-gray-600 font-medium border border-gray-100"
          >
            {tag}
          </span>
        ))}
      </div>

      <div className="flex flex-col xs:flex-row xs:items-center justify-between border-gray-50">
        <div className="flex items-center flex-wrap gap-3 text-sm text-gray-500">
          <div className="flex gap-2">
            <MapPin size={14} />
            {job.location}
          </div>
          <div className="flex gap-2">
            <CircleDollarSign size={14} />
            {formatMoney(job.salary.min)} - {formatMoney(job.salary.max)}
          </div>
          <span className="xs:hidden text-xs font-medium text-gray-400 flex items-center gap-1">
            <Clock3 size={16} className="inline-block" />{" "}
            {timeAgo(job.postedAt)}
          </span>
        </div>
        <Button
          variant="primary"
          className="max-xs:mt-4 md:group-hover:scale-105"
        >
          Apply
        </Button>
      </div>
    </div>
  );
}
