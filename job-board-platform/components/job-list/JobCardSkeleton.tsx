export default function JobCardSkeleton() {
  return (
    <div className="w-full bg-white p-5 rounded-xl shadow-sm animate-pulse">
      {/* Top Row */}
      <div className="flex items-center gap-4 mb-4">
        <div className="w-12 h-12 rounded-full bg-gray-200" />
        <div className="flex flex-col gap-2 flex-1">
          <div className="h-4 w-1/2 bg-gray-200 rounded" />
          <div className="h-3 w-1/4 bg-gray-200 rounded" />
        </div>
      </div>

      {/* Tags */}
      <div className="flex gap-2 mb-4">
        <div className="h-5 w-16 bg-gray-200 rounded" />
        <div className="h-5 w-16 bg-gray-200 rounded" />
        <div className="h-5 w-16 bg-gray-200 rounded" />
      </div>

      {/* Description lines */}
      <div className="flex flex-col gap-2 mb-5">
        <div className="h-3 w-full bg-gray-200 rounded" />
        <div className="h-3 w-5/6 bg-gray-200 rounded" />
        <div className="h-3 w-2/3 bg-gray-200 rounded" />
      </div>

      {/* Bottom row */}
      <div className="flex justify-between items-center">
        <div className="h-4 w-24 bg-gray-200 rounded" />
        <div className="h-8 w-20 bg-gray-300 rounded-lg" />
      </div>
    </div>
  );
}
