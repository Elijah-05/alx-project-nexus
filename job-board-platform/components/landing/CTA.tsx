import Button from "../common/Button";

export default function CTA() {
  return (
    <section className="py-20 bg-primary text-center">
      <div className="max-w-4xl mx-auto px-4">
          <h2 className="text-3xl md:text-4xl font-bold text-white">
            Ready to accelerate your career?
          </h2>
          <p className="text-blue-100 mb-10 max-w-xl text-lg mx-auto">
            Join thousands of professionals and top companies building the
            future. Create your profile in minutes.
          </p>
        <div className="flex flex-col sm:flex-row items-center justify-center gap-4">
          <Button variant="white" className="w-full sm:w-auto py-3.5">
            Register today
          </Button>
          <Button variant="ghost" className="py-3.5 text-white border border-white hover:bg-transparent hover:text-white hover:border-white/80 w-full sm:w-auto">
            Post a Job
          </Button>
        </div>
      </div>
    </section>
  );
}
