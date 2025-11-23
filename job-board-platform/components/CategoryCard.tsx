import { ArrowRight } from "lucide-react";

interface CategoryCardProps {
  category: {
    name: string;
    jobs: string;
    icon: React.ComponentType<{ size: number }>;
  };
}

export default function CategoryCard ({ category }: CategoryCardProps) {
  const Icon = category.icon;
  return (
    <div className="group p-6 bg-gray-50 rounded-xl border border-slate-300 hover:border-blue-200 hover:bg-blue-50/30 transition-all cursor-pointer  text-center flex flex-col items-center">
      <div className="w-12 h-12 mx-auto sm:mx-0 flex items-center justify-center text-primary mb-4 group-hover:scale-110 transition-transform">
        <Icon size={24} />
      </div>
      <h3 className="font-bold text-gray-900 mb-1">{category.name}</h3>
      <p className="relative text-sm text-gray-500 group-hover:text-primary transition-colors flex items-center justify-center text-center gap-1">
        {category.jobs} <ArrowRight size={14} className="absolute opacity-0 group-hover:opacity-100 transition-all translate-x-0 group-hover:translate-x-14 duration:300" />
      </p>
    </div>
  );
};