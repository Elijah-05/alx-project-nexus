type ExperienceLevel = 'Junior' | 'Mid Level' | 'Senior Level' | 'Lead';

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
  workType: boolean;
  tags: string[];
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
