export default function FilterSidebar() {
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
    <div className="bg-white p-4 rounded-xl shadow-sm border">
      <h2 className="font-semibold text-xl mb-4">Filters</h2>

      {sections.map((section) => (
        <div key={section.title} className="mb-6">
          <h3 className="font-semibold mb-2">{section.title}</h3>
          <div className="flex flex-col gap-1">
            {section.items.map((item) => (
              <button
                key={item}
                className="text-left px-2 py-1 rounded-md hover:bg-blue-100"
              >
                {item}
              </button>
            ))}
          </div>
        </div>
      ))}

      <button className="w-full border py-2 rounded-lg mt-4 hover:bg-gray-100">
        Reset Filters
      </button>
    </div>
  );
}
