import Button from "../common/Button";

export default function CTA() {
  return (
    <section className="py-14 lg:py-20 bg-primary text-center">
      <div className="max-w-4xl mx-auto px-4">
          <h2 className="text-3xl md:text-4xl font-bold text-white">
            Ready to accelerate your career?
          </h2>
          <p className="text-blue-100 mb-10 max-w-xl text-lg mx-auto">
            Join thousands of professionals and top companies building the
            future. Create your profile in minutes.
          </p>
        <div className="flex flex-row items-center justify-center gap-4">
          <Button variant="white" className="w-full max-sm:text-sm sm:w-auto max-sm:w-fit py-2.5 md:py-3 lg:py-3.5">
            Register today
          </Button>
          <Button variant="ghost" className="py-2.5 max-sm:text-sm md:py-3 lg:py-3.5 text-white border border-white hover:bg-transparent hover:text-white hover:border-white/80 w-full max-sm:w-fit sm:w-auto">
            Post a Job
          </Button>
        </div>
      </div>
    </section>
  );
}
