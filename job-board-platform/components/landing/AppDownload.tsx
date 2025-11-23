import Image from "next/image";

export default function AppDownload() {
  return (
    <section className="relative w-full bg-[#EAF0F7] pt-24 overflow-hidden">
      <div className="max-w-7xl mx-auto relative flex flex-col-reverse">
        {/* PHONE IMAGE */}
        <div className="relative max-lg:mx-auto">
          <Image
            src="/assets/image/mobile-mock.png"
            alt="App phone preview"
            width={420}
            height={820}
            className="relative z-10"
          />
        </div>

        {/* TEXT BLOCK – ABSOLUTE RIGHT */}
        <div className="lg:absolute lg:top-1/3 lg:right-[5%] max-lg:text-center lg:-translate-y-1/2 max-w-lg max-lg:mb-14 max-lg:mx-auto">
          <h2 className="text-4xl font-extrabold text-gray-900 leading-tight mb-2">
            Download the <br />
            <span className="">Job Listing App</span> Today!
          </h2>

          <p className="text-gray-600 text-base leading-relaxed mb-8">
            It won&apos;t be a bigger problem to find one video game lover in your
            neighbor. Since the introduction of Virtual Game, it has been
            achieving great heights so far as its popularity and technological
            advancement are concerned.
          </p>

          {/* DOWNLOAD BUTTONS */}
          <div className="flex flex-col lg:flex-row items-center gap-4">
            {/* APP STORE */}
            <button className="flex justify-center items-center gap-3 bg-gray-700 text-white px-5 py-3 rounded-xl lg: w-full max-lg:max-w-sm lg:px-8 hover:bg-gray-900 transition">
              <Image
                src="/assets/icon/app-store.png"
                alt="Apple"
                width={24}
                height={24}
              />
              <div className="text-left leading-0">
                <p className="text-lg uppercase font-bold">Available</p>
                <p className="text-sm font-light">on App Store</p>
              </div>
            </button>

            {/* GOOGLE PLAY */}
            <button className="flex justify-center items-center gap-3 bg-gray-700 text-white px-5 py-3 rounded-xl lg: w-full max-lg:max-w-sm lg:px-8 hover:bg-gray-900 transition">
              <Image
                src="/assets/icon/play-store.png"
                alt="Google Play"
                width={24}
                height={24}
              />
              <div className="text-left leading-0">
                <p className="text-lg font-bold uppercase">Available</p>
                <p className="text-sm font-light">on Play Store</p>
              </div>
            </button>
          </div>
        </div>
      </div>
    </section>
  );
}
