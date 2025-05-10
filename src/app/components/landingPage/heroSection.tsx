"use client"

import Image from "next/image"
import Counter from "@/app/components/counter"
import { CheckCircle, User, Globe } from "lucide-react"


export default function Home() {
  return (
    <main className="min-h-screen bg-white">
      <div className="container mx-auto px-4 sm:px-6 py-8 sm:py-16 max-w-6xl">
        {/* Hero Section */}
        <div className="flex flex-col md:flex-row items-center gap-8 mb-8">
          <div className="md:w-1/2">
           <h1 className="text-3xl sm:text-4xl md:text-5xl font-bold leading-tight mb-4">
            <b>Lifeline:</b> Your answer and your emergency toolkit, so{" "}
            <span className="underline decoration-pink-700 decoration-2">you</span>&nbsp;can...
          </h1>

            <p className="text-gray-700 mb-4  font-poppins">
              Lifeline provides instant access to crucial first-aid information during emergencies, ensuring you&apos;re
              prepared to act quickly and effectively.
            </p>
            <p className="text-gray-700 mb-4 font-poppins">Your pocket guide to handling medical emergencies with confidence.</p>
            <p className="text-gray-700 mb-6 font-poppins">
              Empowering you to take control in critical situations, with clear, step-by-step guidance.
            </p>
          </div>
          <div className="md:w-1/2">
            <div className="relative h-64 sm:h-80 w-full">
              <div className="absolute -z-10 top-0 right-0 w-64 h-64 bg-pink-100 rounded-full opacity-50 blur-3xl"></div>
              <Image src="/images/woman.png" alt="Person with first aid kit" 
                className="object-contain" 
               height={400}
               width={400} />
            </div>
          </div>
        </div>

        {/* Stats Section - With Counters */}
        <div className="mt-8 sm:mt-12 mb-8">
          <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-4 sm:gap-6">
            {/* Lifeliners Stat */}
            <div className="bg-[#F5D7D7] rounded-2xl p-6 shadow-md transform transition-all duration-300 hover:scale-105 hover:shadow-lg">
              <div className="flex flex-col items-center">
                <div className="relative mb-2">
                  <span className="text-5xl sm:text-6xl font-extrabold text-[#FC7A7A]">
                    <Counter end={100} duration={2000} />
                  </span>
                  <span
                    className="absolute text-2xl sm:text-3xl font-bold text-[#FC7A7A]"
                    style={{ top: "0", right: "-20px" }}
                  >
                    +
                  </span>
                </div>
                <p className="text-base sm:text-lg font-bold text-gray-700">Lifeliners</p>
                <div className="mt-3 w-16 h-1 bg-[#FC7A7A] rounded-full"></div>
              </div>
            </div>

            {/* Emergency Scenarios Stat */}
            <div className="bg-[#F5D7D7] rounded-2xl p-6 shadow-md transform transition-all duration-300 hover:scale-105 hover:shadow-lg">
              <div className="flex flex-col items-center">
                <div className="relative mb-2">
                  <span className="text-5xl sm:text-6xl font-extrabold text-[#FC7A7A]">
                    <Counter end={46} duration={1800} />
                  </span>
                  <span
                    className="absolute text-2xl sm:text-3xl font-bold text-[#FC7A7A]"
                    style={{ top: "0", right: "-20px" }}
                  >
                    +
                  </span>
                </div>
                <p className="text-base sm:text-lg font-bold text-gray-700">Emergency Scenarios</p>
                <div className="mt-3 w-16 h-1 bg-[#FC7A7A] rounded-full"></div>
              </div>
            </div>

            {/* Medical Professionals Stat */}
            <div className="bg-[#F5D7D7] rounded-2xl p-6 shadow-md transform transition-all duration-300 hover:scale-105 hover:shadow-lg sm:col-span-2 md:col-span-1 sm:mx-auto md:mx-0 sm:max-w-md md:max-w-none">
              <div className="flex flex-col items-center">
                <div className="relative mb-2">
                  <span className="text-5xl sm:text-6xl font-extrabold text-[#FC7A7A]">
                    <Counter end={10} duration={1500} />
                  </span>
                  <span
                    className="absolute text-2xl sm:text-3xl font-bold text-[#FC7A7A]"
                    style={{ top: "0", right: "-20px" }}
                  >
                    +
                  </span>
                </div>
                <p className="text-base sm:text-lg  text-gray-700 font-bold">Medical Professionals</p>
                <div className="mt-3 w-16 h-1 bg-[#FC7A7A] rounded-full"></div>
              </div>
            </div>
          </div>
        </div>

                {/* Features Section  */}
          <div className="mt-12 sm:mt-16">
            <div className="relative bg-white rounded-3xl p-4 sm:p-6 overflow-visible border-2 border-black">
              <div className="grid grid-cols-1 sm:grid-cols-4 gap-3">
                {/* URGENT */}
                <div className="group p-6 relative overflow-visible">
                  <div className="absolute inset-0 bg-white rounded-3x1 group-hover:bg-[#F8D7D7] group-hover:rounded-3xl group-hover:-m-10 group-hover:z-10 transition-all duration-300 group-hover:shadow-xl group-hover:border-[3px] group-hover:border-black"></div>
                  <div className="relative z-20 flex flex-col items-center text-center">
                    <div className="mb-3">
                      <svg width="24" height="24" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
                        <path
                          d="M12 6v6m0 4h.01M12 2a10 10 0 100 20 10 10 0 000-20z"
                          stroke="black"
                          strokeWidth="2"
                          strokeLinecap="round"
                          strokeLinejoin="round"
                        />
                      </svg>
                    </div>
                    <h3 className="text-lg font-extrabold mb-2">URGENT</h3>
                    <p className="text-sm sm:text-sm">
                      Lifeline recognizes the critical nature of emergencies and delivers information and tools for
                      rapid response.
                    </p>
                  </div>
                </div>

                {/* ACCURACY */}
                <div className="group p-6 relative overflow-visible ">
                  <div className="absolute inset-0 bg-white rounded-none group-hover:bg-[#F8D7D7] group-hover:rounded-3xl group-hover:-m-10 group-hover:z-10 transition-all duration-300 group-hover:shadow-xl group-hover:border-[3px] group-hover:border-black"></div>
                  <div className="relative z-20 flex flex-col items-center text-center">
                    <div className="mb-3">
                      <svg width="24" height="24" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
                        <path
                          d="M5 12l5 5L20 7"
                          stroke="black"
                          strokeWidth="2"
                          strokeLinecap="round"
                          strokeLinejoin="round"
                        />
                      </svg>
                    </div>
                    <h3 className="text-lg font-extrabold mb-2">ACCURACY</h3>
                    <p className="text-sm sm:text-sm">
                      Lifeline&apos;s content is sourced from trusted medical authorities and rigorously reviewed by
                      healthcare professionals.
                    </p>
                  </div>
                </div>

                {/* ACCESSIBLE */}
                <div className="group p-6 relative overflow-visible ">
                  <div className="absolute inset-0 bg-white rounded-none group-hover:bg-[#F8D7D7] group-hover:rounded-3xl group-hover:-m-10 group-hover:z-10 transition-all duration-300 group-hover:shadow-xl group-hover:border-[3px] group-hover:border-black"></div>
                  <div className="relative z-20 flex flex-col items-center text-center">
                    <div className="mb-3">
                      <svg width="24" height="24" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
                        <path
                          d="M12 2a10 10 0 100 20 10 10 0 000-20zM2 12h20M12 2a15 15 0 014 10 15 15 0 01-4 10 15 15 0 01-4-10 15 15 0 014-10z"
                          stroke="black"
                          strokeWidth="2"
                          strokeLinecap="round"
                          strokeLinejoin="round"
                        />
                      </svg>
                    </div>
                    <h3 className="text-lg font-extrabold mb-2">ACCESSIBLE</h3>
                    <p className="text-sm sm:text-sm">
                      Lifeline is designed to be user-friendly and accessible to everyone, regardless of technical
                      skills or circumstances.
                    </p>
                  </div>
                </div>

                {/* EMPOWERING */}
                <div className="group p-6 relative overflow-visible">
                  <div className="absolute inset-0 bg-white rounded-none group-hover:bg-[#F8D7D7] group-hover:rounded-3xl group-hover:-m-10 group-hover:z-10 transition-all duration-300 group-hover:shadow-xl group-hover:border-[3px] group-hover:border-black"></div>
                  <div className="relative z-20 flex flex-col items-center text-center">
                    <div className="mb-3">
                      <svg width="24" height="24" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
                        <path
                          d="M12 14c3.314 0 6-2.686 6-6s-2.686-6-6-6-6 2.686-6 6 2.686 6 6 6zM3 22c0-3.314 4.03-6 9-6s9 2.686 9 6"
                          stroke="black"
                          strokeWidth="2"
                          strokeLinecap="round"
                          strokeLinejoin="round"
                        />
                      </svg>
                    </div>
                    <h3 className="text-lg font-bold mb-2">EMPOWERMENT</h3>
                    <p className="text-sm sm:text-sm">
                      Lifeline equips individuals with the knowledge and confidence to take decisive action in
                      emergencies.
                    </p>
                  </div>
                </div>
              </div>
            </div>
          </div>

        {/* About Us Section */}
        <div className="mt-16 sm:mt-24">
          <div className="relative bg-white rounded-3xl p-4 sm:p-6 overflow-visible border-2 border-black">
            <div className="grid grid-cols-1 md:grid-cols-3 gap-2">
              {/* First Aid Kit Illustration */}
              <div className="group p-6 md:p-8 relative overflow-visible border-b-2 md:border-b-0 md:border-r-2 border-black">
                <div className="absolute inset-0 bg-white rounded-md group-hover:bg-[#F8D7D7] group-hover:rounded-3xl group-hover:-m-10 group-hover:z-10 transition-all duration-300 group-hover:shadow-xl group-hover:border-[3px] group-hover:border-black"></div>
                <div className="relative z-20 w-full h-80 md:h-full">
                  <div className="absolute inset-0 rounded-xl -z-10"></div>
                  <div className="relative h-full w-full">
                    <Image
                      src="/images/bucket.png"
                      alt="First aid kit with medical supplies"
                      width={500}
                      height={500}
                      className="object-contain w-full h-full rounded-xl"
                      priority
                    />
                  </div>
                </div>
              </div>

              {/* About Us */}
              <div className="group p-6 md:p-8 relative overflow-visible border-b-2 md:border-b-0 md:border-r-2 border-black">
                <div className="absolute inset-0 bg-white rounded-md group-hover:bg-[#F8D7D7] group-hover:rounded-3xl group-hover:-m-10 group-hover:z-10 transition-all duration-300 group-hover:shadow-xl group-hover:border-[3px] group-hover:border-black"></div>
                <div className="relative z-20">
                  <h2 className="text-3xl font-bold mb-4">About Us</h2>
                  <p className="text-md font-inter">
                    Lifeline was created by a team of dedicated healthcare professionals and technology experts who
                    recognized the critical need for accessible and reliable first aid information during emergencies.
                    Our mission is to empower individuals with the knowledge and tools to take swift and effective
                    action, potentially saving lives and minimizing the impact of medical crises. We are committed to
                    providing up-to-date, evidence-based guidance through a user-friendly platform, ensuring that help
                    is always within reach.
                  </p>
                  <p className="text-md font-inter mt-4 font-medium">
                    The exciting thing also is that it can be accessed{" "}
                    <span className="text-red-600 font-extrabold underline">
                      OFFLINE
                    </span>
                  </p>
                </div>
              </div>

              {/* Why Choose Us */}
              <div className="group p-6 md:p-8 relative overflow-visible">
                <div className="absolute inset-0 bg-white rounded-none group-hover:bg-[#F8D7D7] group-hover:rounded-3xl group-hover:-m-10 group-hover:z-10 transition-all duration-300 group-hover:shadow-xl group-hover:border-[3px] group-hover:border-black"></div>
                <div className="relative z-20">
                  <h2 className="text-3xl font-bold mb-6">Why Choose Us</h2>
                  <div className="space-y-6">
                    {/* Expert-Backed Information */}
                    <div className="flex gap-4">
                      <div className="flex-shrink-0 mt-1">
                        <div className="bg-gray-100 rounded-full p-1">
                          <CheckCircle className="h-5 w-5" />
                        </div>
                      </div>
                      <div>
                        <h3 className="font-bold text-base mb-1">Expert-Backed Information</h3>
                        <p className="text-sm font-inter text-gray-700">
                          Lifeline&apos;s content is developed, reviewed, validated by certified medical professionals,
                          adhering to the latest guidelines from reputable organizations like the American Heart
                          Association and the American Red Cross and other reputable medical sources.
                        </p>
                      </div>
                    </div>

                    {/* Accessible and User-Friendly */}
                    <div className="flex gap-4">
                      <div className="flex-shrink-0 mt-1">
                        <div className="bg-gray-100 rounded-full p-1">
                          <User className="h-5 w-5" />
                        </div>
                      </div>
                      <div>
                        <h3 className="font-bold text-base mb-1">Accessible and User-Friendly</h3>
                        <p className="text-sm font-inter text-gray-700">
                          We prioritize a clean, intuitive design, ensuring that our app is easy to navigate and
                          understand, even in high-stress situations.
                        </p>
                      </div>
                    </div>

                    {/* Comprehensive Coverage */}
                    <div className="flex gap-4">
                      <div className="flex-shrink-0 mt-1">
                        <div className="bg-gray-100 rounded-full p-1">
                          <Globe className="h-5 w-5" />
                        </div>
                      </div>
                      <div>
                        <h3 className="font-bold text-base mb-1">Comprehensive Coverage</h3>
                        <p className="text-sm font-inter text-gray-700">
                          From common injuries to critical medical events, Lifeline offers a wide range of first aid
                          guides and resources, equipping you with the knowledge to handle various emergencies.
                          Information is regularly updated to reflect the most current medical practices.
                        </p>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </main>
  )
}
