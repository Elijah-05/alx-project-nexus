import { Briefcase } from "lucide-react";

export default function Logo({hideLabelOnMobile = false}: {hideLabelOnMobile?: boolean}) {
  return (
    <div
      className="flex items-center gap-2 font-bold text-2xl text-primary"
    >
      <Briefcase className="w-8 h-8" strokeWidth={2.5} />
      <span className={hideLabelOnMobile ? "hidden lg:block" : "block"}>JobStream</span>
    </div>
  );
}
