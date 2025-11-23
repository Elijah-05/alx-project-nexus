import Button from "../common/Button";
const backgroundImageUrl = "/assets/image/man-with-briefcase.jpg";

export default function Hero() {

  return (
    <section className="h-screen sm:h-[600px] lg:h-[700px] relative pt-32 pb-20 lg:pt-48 lg:pb-32 overflow-hidden">
      <div className="relative z-10 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 flex justify-center items-center h-full">
        <div className="flex flex-col lg:flex-row items-center justify-center gap-12">
          <div className="flex-1 flex flex-col items-center text-center">
            <h1 className="text-4xl md:text-5xl lg:text-6xl max-w-2xl lg:max-w-3xl font-extrabold text-white tracking-tight leading-tight mb-2">
              The complete platform to <br className="hidden lg:block" />
              <span className="">find your next role.</span>
            </h1>
            <p className="text-lg md:text-xl text-[#F2F2F2] mb-8 max-w-lg md:max-w-2xl mx-auto lg:mx-0">
              Your career path is unique. We bring together jobs, companies, and
              community to help you find what&apos;s next.
            </p>

            <div className="flex flex-col sm:flex-row items-center gap-3 max-w-lg mx-auto lg:mx-0">
              <Button
                variant="ghost"
                className="w-full text-white border border-white py-3 px-8"
                navigateTo="/jobs"
              >
                Find a Jobs
              </Button>
            </div>
          </div>
        </div>
      </div>
      <div className="absolute inset-0 z-[5] bg-linear-to-t from-[#137ECA]/80 to-[#2FA8FF]/75" />
      <div
        style={{
          backgroundImage: `url(${backgroundImageUrl})`,
          backgroundSize: "cover",
          backgroundPosition: "center",
          position: "absolute",
          inset: 0,
        }}
      />
    </section>
  );
}
