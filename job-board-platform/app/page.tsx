import AppDownload from "@/components/landing/AppDownload";
import CategorySection from "@/components/landing/CategorySection";
import CTA from "@/components/landing/CTA";
import FeaturedJobs from "@/components/landing/FeaturedJobs";
import Hero from "@/components/landing/Hero";
import Partners from "@/components/landing/Partners";
import StatsSection from "@/components/landing/StatSection";

export default function Home() {
  return (
    <div className="min-h-screen bg-white font-sans text-gray-900">
      <main>
        <Hero />
        <StatsSection />
        <CategorySection />
        <FeaturedJobs />
        <Partners />
        <CTA />
        <AppDownload />
      </main>
    </div>
  );
}
