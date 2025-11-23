import { PARTNERS } from "@/constants";
import { Marquee } from "@/components/ui/marquee";

export default function Partners() {
  return (
    <section className="py-12 bg-gray-50/50 border-y border-gray-100">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
        <p className="text-3xl font-semibold text-gray-400 uppercase tracking-wider mb-8">
          Our Partners
        </p>
        <div className="flex flex-wrap justify-center items-center gap-8 md:gap-16">
          <Marquee>
            {PARTNERS.map((partner, idx) => (
              <div
                key={idx}
                className={`flex flex-col mx-4 items-center gap-2 text-4xl font-bold ${partner.color} grayscale opacity-60 hover:grayscale-0 hover:opacity-100 transition-all duration-500 cursor-pointer`}
              >
                {/* <span className="w-8 h-8 bg-current rounded-md opacity-20"></span> */}
                {partner.name}
              </div>
            ))}
          </Marquee>
        </div>
      </div>
    </section>
  );
}
