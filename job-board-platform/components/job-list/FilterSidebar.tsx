type Filters = {
  jobType?: string;
  experience?: string;
  location?: string;
};

export default function FilterSidebar({
  filters = {},
  onChange,
  onReset,
}: {
  filters?: Filters;
  onChange?: (key: keyof Filters, value: string) => void;
  onReset?: () => void;
}) {
  const sections = [
    {
      title: "Job Type",
      items: ["Full-time", "Part-time", "Contract", "Internship"],
    },
    {
      title: "Experience",
      items: ["Entry Level", "Mid Level", "Senior Level"],
    },
    {
      title: "Location",
      items: ["Remote", "On-site", "Hybrid"],
    },
  ];

  return (
    <div className="p-4 pl-2">
      <h2 className="font-semibold text-xl mb-4">Filters</h2>

      {sections.map((section) => (
        <div key={section.title} className="mb-6">
          <h3 className="font-semibold mb-2">{section.title}</h3>
          <div className="flex flex-col gap-1">
            {section.items.map((item) => (
              <button
                key={item}
                onClick={() =>
                  onChange?.(
                    section.title === "Job Type"
                      ? "jobType"
                      : section.title === "Experience"
                      ? "experience"
                      : "location",
                    item
                  )
                }
                className={`text-left pl-4 pr-3 py-1 rounded-md hover:bg-blue-100 ${
                  (section.title === "Job Type" && filters.jobType === item) ||
                  (section.title === "Experience" &&
                    filters.experience === item) ||
                  (section.title === "Location" && filters.location === item)
                    ? "bg-primary/20 font-medium"
                    : ""
                }`}
              >
                {item}
              </button>
            ))}
          </div>
        </div>
      ))}

      <button
        onClick={() => onReset?.()}
        className="w-full border border-gray-200 py-2 rounded-lg hover:bg-slate-100"
      >
        Reset Filters
      </button>
    </div>
  );
}
