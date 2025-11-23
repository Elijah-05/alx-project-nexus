import { motion, AnimatePresence } from "framer-motion";

export default function MobileFilterDrawer({ open, onClose }: {open: boolean, onClose: () => void}) {
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
    <AnimatePresence>
      {open && (
        <>
          {/* Overlay */}
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            onClick={onClose}
            className="fixed inset-0 bg-black/40 z-40"
          />

          {/* Drawer */}
          <motion.div
            initial={{ x: "-100%" }}
            animate={{ x: 0 }}
            exit={{ x: "-100%" }}
            className="fixed left-0 top-0 h-full w-4/5 max-w-[300px] bg-white z-50 p-5 overflow-y-auto"
          >
            <div className="flex justify-between items-center mb-6">
              <h2 className="text-2xl font-semibold">Filters</h2>
              <button onClick={onClose} className="text-2xl">&times;</button>
            </div>

            {sections.map((section) => (
              <div key={section.title} className="mb-8">
                <h3 className="font-semibold mb-2">{section.title}</h3>
                <div className="flex flex-col gap-1">
                  {section.items.map((item) => (
                    <button
                      key={item}
                      className="w-fit px-3 py-1 rounded-md hover:bg-blue-200 bg-blue-100"
                    >
                      {item}
                    </button>
                  ))}
                </div>
              </div>
            ))}

            <button className="w-full border py-3 rounded-lg mt-4">
              Reset Filters
            </button>
          </motion.div>
        </>
      )}
    </AnimatePresence>
  );
}
