"use client"
import Image from "next/image"
import Link from "next/link"
import { useState } from "react"
import { ArrowRight, Eye, EyeOff } from "lucide-react"

export default function SignIn() {
  const [showPassword, setShowPassword] = useState(false)

  return (
    <div className="min-h-screen flex flex-col relative bg-gradient-to-br from-white to-red-50">
      {/* Background pattern */}
      <div className="absolute inset-0 bg-[url('/images/background.jpg')] bg-repeat opacity-10 pointer-events-none" />

      <main className="flex-1 flex flex-col md:flex-row relative z-10">
        {/* Left side with illustration */}
        <div className="w-full md:w-1/2 flex items-center justify-center p-6 md:p-12">
          <div className="max-w-md relative">
            {/* Decorative elements */}
            <div className="absolute -top-10 -left-10 w-20 h-20 bg-red-100 rounded-full opacity-60" />
            <div className="absolute top-1/2 -right-8 w-16 h-16 bg-red-200 rounded-full opacity-60" />
            <div className="absolute -bottom-8 left-1/3 w-24 h-24 bg-red-100 rounded-full opacity-60" />

            <div className="relative z-10 text-center mb-8 md:mb-12">
              <h2 className="text-3xl md:text-4xl font-bold text-red-600 mb-3">LIFELINER</h2>
              <p className="text-gray-600 text-lg">Your health companion</p>
            </div>

            <div className="relative transform transition-all duration-500 hover:scale-105">
              <div className="absolute inset-0 bg-gradient-to-br from-red-200 to-red-100 rounded-full blur-xl opacity-70" />
              <Image
                src="/images/medical-kit.png"
                alt="Medical kit illustration"
                width={400}
                height={400}
                className="relative z-10 mx-auto drop-shadow-lg"
              />
            </div>

            <div className="mt-8 text-center">
              <p className="text-gray-600 italic">&apos;Caring for your health, every step of the way&apos;</p>
            </div>
          </div>
        </div>

        {/* Right side with login form */}
        <div className="w-full md:w-1/2 flex flex-col">
          <div className="p-4 flex justify-end">
            <div className="text-sm text-gray-600">
              Don&apos;t have an account yet?{" "}
              <Link href="/signup" className="font-bold text-red-600 hover:text-red-700 transition-colors">
                Sign up
              </Link>
            </div>
          </div>

          <div className="flex-1 flex items-center justify-center p-6">
            <div className="w-full max-w-md">
              <div className="bg-white p-8 rounded-xl border border-gray-100 shadow-lg">
                <div className="mb-8">
                  <p className="text-gray-600 text-lg">
                    Welcome back <span className="uppercase font-extrabold text-gray-500">Lifeliner!</span>
                  </p>
                  <h1 className="text-2xl md:text-3xl font-bold mt-2 text-gray-800">Login to your account</h1>
                </div>

                <form className="space-y-6">
                  <div className="space-y-2">
                    <label htmlFor="email" className="block text-sm font-medium text-gray-700">
                      Email
                    </label>
                    <input
                      id="email"
                      type="email"
                      placeholder="username@example.com"
                      className="w-full px-4 py-3 border border-gray-200 rounded-lg focus:outline-none focus:ring-2 focus:ring-red-300 focus:border-red-300 transition-all"
                    />
                  </div>

                  <div className="space-y-2">
                    <div className="flex justify-between items-center">
                      <label htmlFor="password" className="block text-sm font-medium text-gray-700">
                        Password
                      </label>
                      <Link
                        href="/forgot-password"
                        className="text-sm text-red-600 hover:text-red-700 hover:underline transition-colors"
                      >
                        Forgot Password ?
                      </Link>
                    </div>
                    <div className="relative">
                      <input
                        id="password"
                        type={showPassword ? "text" : "password"}
                        placeholder="Enter your password"
                        className="w-full px-4 py-3 border border-gray-200 rounded-lg focus:outline-none focus:ring-2 focus:ring-red-300 focus:border-red-300 transition-all"
                      />
                      <button
                        type="button"
                        className="absolute right-3 top-1/2 transform -translate-y-1/2 text-gray-500 hover:text-gray-700"
                        onClick={() => setShowPassword(!showPassword)}
                      >
                        {showPassword ? <EyeOff size={20} /> : <Eye size={20} />}
                      </button>
                    </div>
                  </div>

                  <button
                    type="submit"
                    className="w-full py-3 px-4 bg-red-500 hover:bg-red-600 text-white font-medium rounded-lg transition duration-200 flex items-center justify-center group"
                  >
                    Continue
                    <ArrowRight className="ml-2 h-4 w-4 transform group-hover:translate-x-1 transition-transform" />
                  </button>
                </form>

                <div className="mt-8 text-center text-sm text-gray-600">
                  Don&apos;t have an account?{" "}
                  <Link
                    href="/register"
                    className="font-medium text-red-600 hover:text-red-700 hover:underline transition-colors"
                  >
                    Register
                  </Link>
                </div>
              </div>
            </div>
          </div>
        </div>
      </main>

      <footer className="bg-white py-4 border-t relative z-10">
        <div className="container mx-auto flex justify-center space-x-6 text-sm text-gray-500">
          <Link href="/contact" className="hover:text-red-600 transition-colors">
            Contact Support
          </Link>
          <Link href="/privacy" className="hover:text-red-600 transition-colors">
            Privacy Policy
          </Link>
          <Link href="/terms" className="hover:text-red-600 transition-colors">
            Terms & Conditions
          </Link>
        </div>
      </footer>
    </div>
  )
}
