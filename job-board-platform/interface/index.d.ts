type ExperienceLevel = 'Junior' | 'Mid Level' | 'Senior Level' | 'Lead';
type JobType = "Full-time" | "Part-time" | "Contract" | "Internship";
type WorkType = "On-site" | "Remote" | "Hybrid";

interface JobCardProps {
  _id?: string;
  title: string;
  company: string;
  location: string;
  description: string;
  salary: { min: number | string; max: number | string };
  jobType: string;
  experienceLevel?: ExperienceLevel[]
  isFeatured: boolean;
  postedAt: string;
  workType: WorkType;
  tags: string[];
  createdBy?: string;
}

type PaginationProps= {
  jobs?: JobCardProps[];
  total: number;
  page: number;
  limit: number;
  onClickPage: (page: number) => void;
  onPrev: () => void;
  onNext: () => void;
};

