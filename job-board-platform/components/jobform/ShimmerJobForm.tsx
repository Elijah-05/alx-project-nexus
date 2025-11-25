export default function ShimmerJobForm() {
  return (
    <div className="min-h-screen bg-[#eef6ff] flex items-start justify-center pt-32 pb-12 px-4 animate-pulse">
      <div className="w-full max-w-6xl">
        {/* Header */}
        <div className="flex flex-col gap-3 mb-8">
          <div className="w-48 h-7 bg-gray-300 rounded"></div>
          <div className="w-80 h-4 bg-gray-300 rounded"></div>
        </div>

        {/* Form Skeleton */}
        <div className="bg-white rounded-xl shadow-md p-6 md:p-8 space-y-6">
          {/* 2-column grid */}
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            {Array.from({ length: 6 }).map((_, i) => (
              <div key={i} className="space-y-2">
                <div className="w-28 h-4 bg-gray-300 rounded"></div>
                <div className="w-full h-11 bg-gray-300 rounded"></div>
              </div>
            ))}
          </div>

          {/* Tags */}
          <div className="space-y-2">
            <div className="w-20 h-4 bg-gray-300 rounded"></div>
            <div className="w-full h-11 bg-gray-300 rounded"></div>
          </div>

          {/* Description */}
          <div className="space-y-2">
            <div className="w-28 h-4 bg-gray-300 rounded"></div>
            <div className="w-full h-32 bg-gray-300 rounded"></div>
          </div>

          {/* Featured Checkbox */}
          <div className="flex items-center gap-3 mt-2">
            <div className="w-6 h-6 bg-gray-300 rounded"></div>
            <div className="w-32 h-4 bg-gray-300 rounded"></div>
          </div>

          {/* Experience Level */}
          <div className="space-y-3 mt-6">
            <div className="w-48 h-4 bg-gray-300 rounded"></div>
            <div className="flex flex-wrap gap-3">
              {Array.from({ length: 4 }).map((_, i) => (
                <div key={i} className="w-32 h-10 bg-gray-300 rounded-lg"></div>
              ))}
            </div>
          </div>

          {/* Buttons */}
          <div className="flex flex-col md:flex-row gap-4 mt-6">
            <div className="w-32 h-11 bg-gray-300 rounded-lg"></div>
            <div className="w-40 h-11 bg-gray-300 rounded-lg"></div>
          </div>
        </div>
      </div>
    </div>
  );
}
