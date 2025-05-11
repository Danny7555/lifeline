"use client";

import Image from "next/image";
import { Inter } from "next/font/google";

const inter = Inter({
  subsets: ["latin"],
  display: "swap",
});

export default function FirstAidScenarios() {
  return (
    <div
      className={`relative w-full min-h-screen bg-repeat border-t border-b border-2 border-gray-900 bg-white bg-opacity-90 ${inter.className}`}
    >
      {/* Background pattern */}
      <div className="absolute inset-0 bg-[url('/images/background.jpg')] bg-cover bg-repeat opacity-10 pointer-events-none z-0" />

      <div className="relative z-10 max-w-2xl mx-auto p-3 sm:p-4 md:p-6">
        {/* Heading */}
        <h1 className="text-2xl sm:text-3xl md:text-4xl lg:text-5xl font-bold text-center mb-2 md:mb-4">
          Some Featured Scenarios
        </h1>
        <p className="text-center mb-4 sm:mb-6 md:mb-8 text-sm sm:text-base md:text-lg">
          Be prepared for common emergencies. Get immediate steps and essential
          knowledge to act fast and stay calm in critical situations.
        </p>

        {/* Scenarios */}
        <div className="space-y-3 md:space-y-4">
          {[
            {
              src: "/videos/peter.gif",
              title: "Bone Fracture?",
              subtitle: "Minor Injury, Immediate Care",
            },
            {
              src: "/videos/bleed.gif",
              title: "Bleeding?",
              subtitle: "Stop the Flow, Stay Calm.",
            },
            {
              src: "/videos/paul.gif",
              title: "Minor Injury?",
              subtitle: "Recognizing the Break, Providing Support.",
            },
          ].map(({ src, title, subtitle }, idx) => (
            <div
              key={idx}
              className="flex flex-col sm:flex-row bg-opacity-95 overflow-hidden rounded-lg shadow-sm bg-white/50 hover:bg-white/70 transition-colors"
            >
              <div className="w-full sm:w-1/4 flex items-center justify-center p-2">
                <div className="w-16 h-16 xs:w-20 xs:h-20 sm:w-24 sm:h-24 rounded-3xl overflow-hidden bg-gray-100 flex items-center justify-center">
                  <Image
                    src={src}
                    alt={title}
                    width={96}
                    height={96}
                    unoptimized
                    className="object-cover rounded-3xl w-full h-full"
                  />
                </div>
              </div>
              <div className="w-full sm:w-3/4 p-2 sm:p-3 md:p-4">
                <h3 className="text-lg sm:text-xl md:text-2xl font-bold">{title}</h3>
                <p className="text-gray-900 mb-2 text-xs sm:text-sm md:text-base">
                  {subtitle}
                </p>
                <button className="w-full sm:w-auto bg-red-200 text-gray-900 px-3 sm:px-4 md:px-6 py-1 sm:py-1.5 md:py-2 rounded-full border-t border-2 border-gray-900 text-xs md:text-sm hover:bg-red-300 transition-colors">
                  Learn to Save a Life
                </button>
              </div>
            </div>
          ))}
        </div>

        {/* Footer Button */}
        <div className="mt-4 sm:mt-6 md:mt-8 text-center">
          <button className="w-full sm:w-auto bg-red-400 text-black px-4 sm:px-6 md:px-8 py-1.5 sm:py-2 md:py-3 rounded-full border-t border-2 border-gray-900 font-medium hover:bg-red-500 transition-colors text-sm sm:text-base md:text-lg">
            View First Aid Guides?
          </button>
        </div>
      </div>
    </div>
  );
}
