export type SalaryRange = {
  min?: number;
  max?: number;
};

export type Job = {
  _id?: number | string;
  title: string;
  company: string;
  location: string;
  description: string;
  salary: SalaryRange;
  jobType: string; // e.g. Full-time, Part-time, Contract
  isFeatured: boolean;
  postedAt: string; // ISO date string
  remote?: boolean;
  tags: string[];
};
