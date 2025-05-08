'use client'

import { useState } from 'react'
import Link from 'next/link'
import Image from 'next/image'

export default function SignIn() {
  const [formData, setFormData] = useState({
    email: '',
    password: '',
  })

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault()
    // Add your authentication logic here
  }

  return (
    <div className="min-h-screen flex flex-col bg-white">
      {/* Add pattern background */}
      <div className="absolute inset-0 bg-[url('/images/pattern.svg')] opacity-5" />

      <div className="absolute top-4 right-4 flex items-center gap-3">
        <span className="text-gray-500 text-base">Don&apos;t have an account yet?</span>
        <Link href="/auth/signup" className="text-black font-semibold hover:underline text-base">
          Sign up
        </Link>
      </div>

      <div className="flex-1 flex items-center justify-center px-4">
        <div className="flex w-full max-w-[1200px] gap-8">
          {/* Left side - Image with floating animation */}
          <div className="hidden md:flex flex-1 items-center justify-center">
            <div className="relative w-[400px] h-[400px]">
              <Image
                src="/images/medical-bag.svg"
                alt="Medical Bag"
                layout="fill"
                objectFit="contain"
                priority
                className="animate-float"
              />
            </div>
          </div>

          {/* Right side - Form */}
          <div className="w-full md:w-[480px] p-8 rounded-3xl border border-gray-200 shadow-lg bg-white">
            <div className="space-y-8">
              <div>
                <p className="text-gray-500 text-lg">
                  Welcome back <span className="text-gray-700 font-bold">LIFELINER!</span>
                </p>
                <h1 className="text-3xl font-bold text-gray-900 mt-2">
                  Login to your account
                </h1>
              </div>

              <form onSubmit={handleSubmit} className="space-y-6">
                <div className="space-y-2">
                  <label htmlFor="email" className="block text-base text-gray-600">
                    Email
                  </label>
                  <input
                    type="email"
                    id="email"
                    placeholder="username@example.com"
                    className="w-full px-4 py-4 rounded-lg border-b border-gray-200 bg-transparent focus:outline-none focus:border-gray-400 transition-colors"
                    value={formData.email}
                    onChange={(e) => setFormData({ ...formData, email: e.target.value })}
                  />
                </div>

                <div className="space-y-2">
                  <div className="flex justify-between">
                    <label htmlFor="password" className="block text-base text-gray-600">
                      Password
                    </label>
                    <Link href="/auth/forgot-password" className="text-sm text-gray-600 hover:underline">
                      Forgot Password?
                    </Link>
                  </div>
                  <input
                    type="password"
                    id="password"
                    placeholder="Enter your password"
                    className="w-full px-4 py-4 rounded-lg border-b border-gray-200 bg-transparent focus:outline-none focus:border-gray-400 transition-colors"
                    value={formData.password}
                    onChange={(e) => setFormData({ ...formData, password: e.target.value })}
                  />
                </div>

                <button
                  type="submit"
                  className="w-full bg-red-400 text-white py-3 rounded-lg hover:bg-red-500 transition duration-200"
                >
                  Continue
                </button>
              </form>

              <div className="text-center text-sm text-gray-600">
                Don&apos;t have an account?{' '}
                <Link href="/auth/register" className="text-black font-semibold hover:underline">
                  Register
                </Link>
              </div>
            </div>
          </div>
        </div>
      </div>

      <footer className="py-6 text-center space-x-6 text-sm text-gray-500">
        <Link href="/support" className="hover:text-gray-700">Contact Support</Link>
        <Link href="/privacy" className="hover:text-gray-700">Privacy Policy</Link>
        <Link href="/terms" className="hover:text-gray-700">Terms & Conditions</Link>
      </footer>
    </div>
  )
}