"use client"

import Image from "next/image"
import Counter from "@/app/components/counter"

export default function Home() {
  return (
    <main className="min-h-screen bg-white">
      <div className="container mx-auto px-4 sm:px-6 py-8 sm:py-16 max-w-6xl">
        {/* Hero Section */}
        <div className="flex flex-col md:flex-row items-center gap-8 mb-8">
          <div className="md:w-1/2">
            <h1 className="text-3xl sm:text-4xl md:text-5xl font-bold leading-tight mb-4">
              Lifeline: Your answer and your emergency toolkit, so{" "}
              <span className="underline decoration-pink-500 decoration-4">you can...</span>
            </h1>
            <p className="text-gray-700 mb-4">
              Lifeline provides instant access to crucial first-aid information during emergencies, ensuring you&apos;re
              prepared to act quickly and effectively.
            </p>
            <p className="text-gray-700 mb-4">Your pocket guide to handling medical emergencies with confidence.</p>
            <p className="text-gray-700 mb-6">
              Empowering you to take control in critical situations, with clear, step-by-step guidance.
            </p>
          </div>
          <div className="md:w-1/2">
            <div className="relative h-64 sm:h-80 w-full">
              <div className="absolute -z-10 top-0 right-0 w-64 h-64 bg-pink-100 rounded-full opacity-50 blur-3xl"></div>
              <Image
                src="/placeholder.svg?height=400&width=400"
                alt="Person with first aid kit"
                fill
                className="object-contain"
              />
            </div>
          </div>
        </div>

        {/* Stats Section - With Counters */}
        <div className="mt-8 sm:mt-12 mb-8">
          <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-4 sm:gap-6">
            {/* Lifeliners Stat */}
            <div className="bg-gradient-to-br from-pink-100 to-pink-200 rounded-2xl p-6 shadow-md transform transition-all duration-300 hover:scale-105 hover:shadow-lg">
              <div className="flex flex-col items-center">
                <div className="relative mb-2">
                  <span className="text-5xl sm:text-6xl font-extrabold text-pink-500">
                    <Counter end={100} duration={2000} />
                  </span>
                  <span
                    className="absolute text-2xl sm:text-3xl font-bold text-pink-500"
                    style={{ top: "0", right: "-20px" }}
                  >
                    +
                  </span>
                </div>
                <p className="text-base sm:text-lg font-medium text-gray-700">Lifeliners</p>
                <div className="mt-3 w-16 h-1 bg-pink-400 rounded-full"></div>
              </div>
            </div>

            {/* Emergency Scenarios Stat */}
            <div className="bg-gradient-to-br from-pink-100 to-pink-200 rounded-2xl p-6 shadow-md transform transition-all duration-300 hover:scale-105 hover:shadow-lg">
              <div className="flex flex-col items-center">
                <div className="relative mb-2">
                  <span className="text-5xl sm:text-6xl font-extrabold text-pink-500">
                    <Counter end={46} duration={1800} />
                  </span>
                  <span
                    className="absolute text-2xl sm:text-3xl font-bold text-pink-500"
                    style={{ top: "0", right: "-20px" }}
                  >
                    +
                  </span>
                </div>
                <p className="text-base sm:text-lg font-medium text-gray-700">Emergency Scenarios</p>
                <div className="mt-3 w-16 h-1 bg-pink-400 rounded-full"></div>
              </div>
            </div>

            {/* Medical Professionals Stat */}
            <div className="bg-gradient-to-br from-pink-100 to-pink-200 rounded-2xl p-6 shadow-md transform transition-all duration-300 hover:scale-105 hover:shadow-lg sm:col-span-2 md:col-span-1 sm:mx-auto md:mx-0 sm:max-w-md md:max-w-none">
              <div className="flex flex-col items-center">
                <div className="relative mb-2">
                  <span className="text-5xl sm:text-6xl font-extrabold text-pink-500">
                    <Counter end={10} duration={1500} />
                  </span>
                  <span
                    className="absolute text-2xl sm:text-3xl font-bold text-pink-500"
                    style={{ top: "0", right: "-20px" }}
                  >
                    +
                  </span>
                </div>
                <p className="text-base sm:text-lg font-medium text-gray-700">Medical Professionals</p>
                <div className="mt-3 w-16 h-1 bg-pink-400 rounded-full"></div>
              </div>
            </div>
          </div>
        </div>

        {/* Features Section */}
        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-4 sm:gap-6 mt-12 sm:mt-16">
          <div className="bg-gradient-to-br from-pink-100 to-pink-200 rounded-xl p-6 sm:p-8 shadow-md hover:shadow-lg transition-shadow duration-300">
            <div className="mb-4 flex justify-center">
              {/* Custom Alert/Urgent Icon */}
              <svg
                width="64"
                height="64"
                viewBox="0 0 64 64"
                fill="none"
                xmlns="http://www.w3.org/2000/svg"
                className="text-pink-500"
              >
                <circle cx="32" cy="32" r="28" stroke="currentColor" strokeWidth="2" fill="white" />
                <path d="M32 16V36" stroke="currentColor" strokeWidth="4" strokeLinecap="round" />
                <circle cx="32" cy="44" r="3" fill="currentColor" />
              </svg>
            </div>
            <h3 className="text-xl font-bold mb-3 text-gray-800 text-center">URGENT</h3>
            <p className="text-gray-600 text-center sm:text-left">
              Lifeline recognizes the critical nature of emergencies and delivers information and tools for rapid
              response.
            </p>
          </div>

          <div className="bg-gradient-to-br from-pink-100 to-pink-200 rounded-xl p-6 sm:p-8 shadow-md hover:shadow-lg transition-shadow duration-300">
            <div className="mb-4 flex justify-center">
              {/* Custom Checkmark/Accuracy Icon */}
              <svg
                width="64"
                height="64"
                viewBox="0 0 64 64"
                fill="none"
                xmlns="http://www.w3.org/2000/svg"
                className="text-pink-500"
              >
                <circle cx="32" cy="32" r="28" stroke="currentColor" strokeWidth="2" fill="white" />
                <path
                  d="M20 32L28 40L44 24"
                  stroke="currentColor"
                  strokeWidth="4"
                  strokeLinecap="round"
                  strokeLinejoin="round"
                />
              </svg>
            </div>
            <h3 className="text-xl font-bold mb-3 text-gray-800 text-center">ACCURACY</h3>
            <p className="text-gray-600 text-center sm:text-left">
              Lifeline&apos;s content is sourced from trusted medical authorities and rigorously reviewed by healthcare professionals.
            </p>
          </div>

          <div className="bg-gradient-to-br from-pink-400 to-pink-500 rounded-xl p-6 sm:p-8 shadow-md hover:shadow-lg transition-shadow duration-300">
            <div className="mb-4 flex justify-center">
              {/* Globe Icon */}
              <svg width="64" height="64" viewBox="0 0 64 64" fill="none" xmlns="http://www.w3.org/2000/svg">
                <circle cx="32" cy="32" r="28" stroke="white" strokeWidth="2" fill="none" />
                <path d="M32 4C32 4 16 18 16 32C16 46 32 60 32 60" stroke="white" strokeWidth="2" />
                <path d="M32 4C32 4 48 18 48 32C48 46 32 60 32 60" stroke="white" strokeWidth="2" />
                <path d="M4 32H60" stroke="white" strokeWidth="2" />
                <path d="M12 16H52" stroke="white" strokeWidth="2" />
                <path d="M12 48H52" stroke="white" strokeWidth="2" />
              </svg>
            </div>
            <h3 className="text-xl font-bold mb-3 text-white text-center">ACCESSIBLE</h3>
            <p className="text-white text-center sm:text-left">
              Lifeline is designed to be user-friendly and accessible to everyone, regardless of technical skills or
              circumstances.
            </p>
          </div>

          <div className="bg-gradient-to-br from-pink-100 to-pink-200 rounded-xl p-6 sm:p-8 shadow-md hover:shadow-lg transition-shadow duration-300 sm:col-span-2 md:col-span-3">
            <div className="mb-4 flex justify-center">
              {/* User Icon */}
              <svg
                width="64"
                height="64"
                viewBox="0 0 64 64"
                fill="none"
                xmlns="http://www.w3.org/2000/svg"
                className="text-pink-500"
              >
                <circle cx="32" cy="22" r="12" stroke="currentColor" strokeWidth="2" fill="white" />
                <path
                  d="M54 54C54 42.9543 44.1503 34 32 34C19.8497 34 10 42.9543 10 54"
                  stroke="currentColor"
                  strokeWidth="2"
                />
                <path
                  d="M44 44L48 48L56 40"
                  stroke="currentColor"
                  strokeWidth="2"
                  strokeLinecap="round"
                  strokeLinejoin="round"
                />
              </svg>
            </div>
            <h3 className="text-xl font-bold mb-3 text-gray-800 text-center">ACCESSIBLE</h3>
            <p className="text-gray-600 text-center md:text-left max-w-2xl mx-auto md:mx-0">
              Lifeline equips individuals with the knowledge and confidence to make decisive actions in emergencies.
            </p>
          </div>
        </div>
      </div>
    </main>
  )
}
