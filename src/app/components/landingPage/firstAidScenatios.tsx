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
      className={`relative w-full min-h-screen bg-repeat bg-white bg-opacity-90 ${inter.className}`}
    >
      {/* Background pattern */}
      <div className="absolute inset-0 bg-[url('/images/background.jpg')] bg-repeat opacity-10 pointer-events-none z-0" />

      <div className="relative z-10 max-w-2xl mx-auto p-4 md:p-6">
        {/* Heading */}
        <h1 className="text-3xl md:text-4xl lg:text-5xl font-bold text-center mb-2 md:mb-4">
          Some Featured Scenarios
        </h1>
        <p className="text-center mb-6 md:mb-8 text-base md:text-lg">
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
              title: "Bleeding?",
              subtitle: "Recognizing the Break, Providing Support.",
            },
          ].map(({ src, title, subtitle }, idx) => (
            <div
              key={idx}
              className="flex flex-col sm:flex-row bg-white bg-opacity-95 rounded-lg shadow-md overflow-hidden border border-gray-200"
            >
              <div className="w-full sm:w-1/4 flex items-center justify-center p-2">
                <div className="w-20 h-20 sm:w-24 sm:h-24 rounded-md overflow-hidden bg-gray-100 flex items-center justify-center">
                  <Image
                    src={src}
                    alt={title}
                    width={96}
                    height={96}
                    unoptimized
                    className="object-cover rounded-md w-full h-full"
                  />
                </div>
              </div>
              <div className="w-full sm:w-3/4 p-3 md:p-4">
                <h3 className="text-xl md:text-2xl font-bold">{title}</h3>
                <p className="text-gray-700 mb-2 md:mb-3 text-sm md:text-base">
                  {subtitle}
                </p>
                <button className="bg-red-200 text-gray-800 px-4 md:px-6 py-1.5 md:py-2 rounded-full text-xs md:text-sm hover:bg-red-300 transition-colors">
                  Learn to Save a Life
                </button>
              </div>
            </div>
          ))}
        </div>

        {/* Footer Button */}
        <div className="mt-6 md:mt-8 text-center">
          <button className="bg-red-400 text-white px-6 md:px-8 py-2 md:py-3 rounded-full font-medium hover:bg-red-500 transition-colors text-base md:text-lg">
            View First Aid Guides?
          </button>
        </div>
      </div>
    </div>
  );
}
