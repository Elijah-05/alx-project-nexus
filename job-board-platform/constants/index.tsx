import { FaGear, FaUser } from "react-icons/fa6";
import { GiCardboardBoxClosed } from "react-icons/gi";
import { IoStatsChart } from "react-icons/io5";
import { MdOutlineDesignServices } from "react-icons/md";

export const STATS = [
  { id: 1, value: "1.5k+", label: "Active Jobs" },
  { id: 2, value: "200+", label: "Companies" },
  { id: 3, value: "150k+", label: "Job Seekers" },
  { id: 4, value: "48h", label: "Response Time" },
];

export const CATEGORIES = [
  { id: 1, name: "Engineering", jobs: "500+ Jobs", icon: FaGear},
  { id: 2, name: "Design", jobs: "200+ Jobs", icon: MdOutlineDesignServices },
  { id: 3, name: "Marketing", jobs: "150+ Jobs", icon: IoStatsChart },
  { id: 4, name: "Product", jobs: "100+ Jobs", icon: GiCardboardBoxClosed },
  { id: 5, name: "Customer Service", jobs: "300+ Jobs", icon: FaUser  },
];

export const FEATURED_JOBS = [
  {
    id: 1,
    company: "TechFlow",
    logoBg: "bg-blue-100",
    logoColor: "text-blue-600",
    title: "Senior UI Designer",
    type: "Full Time",
    level: "Senior",
    location: "Remote",
    posted: "2 days ago"
  },
  {
    id: 2,
    company: "CreativeX",
    logoBg: "bg-purple-100",
    logoColor: "text-purple-600",
    title: "Product Manager",
    type: "Full Time",
    level: "Lead",
    location: "New York, NY",
    posted: "5 hours ago"
  },
  {
    id: 3,
    company: "DevWorks",
    logoBg: "bg-green-100",
    logoColor: "text-green-600",
    title: "Frontend Developer",
    type: "Contract",
    level: "Mid",
    location: "San Francisco, CA",
    posted: "1 day ago"
  },
  {
    id: 4,
    company: "GrowthCo",
    logoBg: "bg-orange-100",
    logoColor: "text-orange-600",
    title: "Marketing Specialist",
    type: "Part Time",
    level: "Junior",
    location: "London, UK",
    posted: "3 days ago"
  }
];

export const PARTNERS = [
  { name: "Start Up", color: "text-blue-500" },
  { name: "Nai Tech", color: "text-purple-500" },
  { name: "Spotify", color: "text-green-500" },
  { name: "Addis Tech", color: "text-orange-500" },
  { name: "Microsoft", color: "text-blue-600" },
  { name: "ALX", color: "text-blue-600" },
];

export const FOOTER_LINKS = {
  Platform: ["Browse Jobs", "Browse Companies", "Candidate Profiles", "Pricing"],
  Resources: ["Blog", "Help Center", "Guides", "Events"],
  Legal: ["Terms", "Privacy", "Cookies", "Licenses"],
};
