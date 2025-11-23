interface JobCardProps {
  _id?: string;
  title: string;
  company: string;
  location: string;
  description: string;
  salary: { min: number | string; max: number | string };
  jobType: string;
  isFeatured: boolean;
  postedAt: string;
  remote: boolean;
  tags: string[];
}
