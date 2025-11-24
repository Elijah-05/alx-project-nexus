import { Briefcase } from "lucide-react";
import Link from "next/link";

export default function Logo({
  hideLabelOnMobile = false,
}: {
  hideLabelOnMobile?: boolean;
}) {
  return (
    <Link
      href={"/"}
      className="flex items-center gap-2 font-bold text-xl lg:text-2xl text-primary"
    >
      <Briefcase className="size-6 lg:size-8" strokeWidth={2.5} />
      <span className={hideLabelOnMobile ? "hidden lg:block" : "block"}>
        JobStream
      </span>
    </Link>
  );
}
