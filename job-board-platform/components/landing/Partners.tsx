import { PARTNERS } from "@/constants";
import { Marquee } from "@/components/ui/marquee";

export default function Partners() {
  return (
    <section id="partners" className="pt-2 lg:pt-6 pb-14 scroll-mt-20">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
        <p className="text-xl lg:text-2xl xl:text-3xl font-bold text-gray-900 mb-6 xl:mb-8">
          Our Partners
        </p>
        <div className="flex flex-wrap justify-center items-center gap-8 md:gap-14 lg:gap-16">
          <Marquee pauseOnHover>
            {PARTNERS.map((partner, idx) => (
              <div
                key={idx}
                className={`flex flex-col mx-4 items-center gap-2 text-3xl lg:text-4xl font-bold ${partner.color} grayscale opacity-60 hover:grayscale-0 hover:opacity-100 transition-all duration-500 cursor-pointer`}
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
