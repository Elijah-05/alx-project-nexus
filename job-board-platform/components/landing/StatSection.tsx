import { STATS } from "@/constants";

export default function StatsSection() {
  return (
    <section className="py-10 bg-white border-b border-gray-100">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid grid-cols-2 md:grid-cols-4 gap-8 divide-x-0 md:divide-x divide-gray-100">
          {STATS.map((stat) => (
            <div key={stat.id} className="text-center">
              <p className="text-2xl lg:text-3xl md:text-4xl font-bold text-gray-900 mb-1">
                {stat.value}
              </p>
              <p className="text-xs md:text-sm text-gray-500 font-medium uppercase tracking-wide">
                {stat.label}
              </p>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
