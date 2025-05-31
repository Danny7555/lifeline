"use client"
import Image from "next/image"
import Link from "next/link"
import { useState } from "react"
import { ArrowRight, Mail, Globe } from "lucide-react"
import { useRouter } from "next/navigation"

export default function ForgotPassword() {
  const [email, setEmail] = useState("")
  const [error, setError] = useState("")
  const [success, setSuccess] = useState("")
  const [loading, setLoading] = useState(false)
  const router = useRouter()

  // Handle form input change
  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setEmail(e.target.value)
  }

  // Handle password reset request
  const handleResetRequest = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault()
    setError("")
    setSuccess("")
    setLoading(true)

    // Validate email
    if (!email) {
      setError("Email is required")
      setLoading(false)
      return
    }

    try {
      // Send password reset request to the API
      const response = await fetch('/api/reset-password', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ email })
      })

      // Enhanced error logging
      console.log('Reset password response status:', response.status);
      
      const data = await response.json();
      console.log('Reset password response data:', data);

      if (!response.ok) {
        throw new Error(data?.error || `Request failed with status ${response.status}`)
      }

      // Show success message
      setSuccess("Password reset link has been sent to your email")
      setEmail("")
      
      // Automatically redirect after a delay
      setTimeout(() => {
        router.push('/auth/signIn')
      }, 5000)
      
    } catch (error) {
      console.error("Error during password reset request:", error)
      setError(error instanceof Error ? error.message : "An unexpected error occurred")
    } finally {
      setLoading(false)
    }
  }

  return (
    <div className="min-h-screen flex flex-col relative bg-gradient-to-br from-white to-red-50">
      {/* Background pattern */}
      <div className="absolute inset-0 bg-[url('/images/background.jpg')] bg-cover bg-repeat opacity-10 pointer-events-none" />
      
      {/* Navigation */}
      <div className="absolute top-0 left-0 right-0 py-2 px-4 flex justify-between items-center z-10">
        <div className="w-20">
          {/* Empty div for spacing */}
        </div>
        <Link href="/" className="flex items-center text-gray-400 hover:text-gray-900">
          <span className="text-sm font-bold">/home</span>
        </Link>
        <div className="flex items-center text-gray-400">
          <Globe size={16} className="mr-1 " />
          <span className="text-sm font-bold">English (UK)</span>
        </div>
      </div><br /><br />
      
      <main className="flex-1 flex flex-col md:flex-row relative z-10">
        {/* Left side with illustration */}
        <div className="w-full md:w-1/2 flex items-center justify-center p-6 md:p-12">
          <div className="max-w-md relative">
            {/* Decorative elements */}
            <div className="absolute -top-10 -left-10 w-20 h-20 bg-red-100 rounded-full opacity-60" />
            <div className="absolute top-1/2 -right-8 w-16 h-16 bg-red-200 rounded-full opacity-60" />
            <div className="absolute -bottom-8 left-1/3 w-24 h-24 bg-red-100 rounded-full opacity-60" />

            <div className="relative transform transition-all duration-500 hover:scale-105">
              <div className="absolute inset-0 bg-gradient-to-br from-red-200 to-red-100 rounded-full blur-xl opacity-70" />
              <Image
                src="/images/signup.png" 
                alt="Password reset illustration"
                width={400}
                height={400}
                priority
                style={{ width: "auto", height: "auto" }}
                className="relative z-10 mx-auto drop-shadow-lg"
              />
            </div>

            <div className="mt-8 text-center">
              <p className="text-gray-700">&apos;No worries, we&apos;ll help you recover your account&apos;</p>
            </div>
          </div>
        </div>

        {/* Right side with reset password form */}
        <div className="w-full md:w-1/2 flex flex-col">
          <div className="p-4 flex justify-end">
            <div className="text-sm text-gray-600">
              Remember your password?{" "}
              <Link href="/auth/signIn" className="font-extrabold text-red-600 hover:text-red-700 transition-colors">
                Login
              </Link>
            </div>
          </div>

          <div className="flex-1 flex items-center justify-center p-6">
            <div className="w-full max-w-md">
              <div className="bg-white p-12 rounded-xl border border-gray-800 shadow-lg">
                <div className="mb-8">
                  <p className="text-gray-600 text-lg font-extralight">
                    Password Recovery
                  </p>
                  <h1 className="text-2xl md:text-3xl font-poppins mt-2 text-gray-800">Reset your password</h1>
                  <p className="text-gray-500 mt-3">Enter your email address and we&apos;ll send you a link to reset your password.</p>
                </div>

                {/* Show error message if any */}
                {error && (
                  <div className="bg-red-100 border border-red-400 text-red-700 px-4 py-3 rounded relative mb-4" role="alert">
                    <span className="block sm:inline">{error}</span>
                  </div>
                )}

                {/* Show success message if any */}
                {success && (
                  <div className="bg-green-100 border border-green-400 text-green-700 px-4 py-3 rounded relative mb-4" role="alert">
                    <span className="block sm:inline">{success}</span>
                    <p className="text-sm mt-1">Redirecting to login page...</p>
                  </div>
                )}

                <form className="space-y-5" onSubmit={handleResetRequest}>
                  <div className="space-y-2">
                    <label htmlFor="email" className="block text-sm font-medium text-gray-700">
                      Email
                    </label>
                    <div className="relative">
                      <input
                        id="email"
                        type="email"
                        placeholder="username@example.com"
                        value={email}
                        onChange={handleChange}
                        className="w-full px-4 py-3 border-0 border-b-2 border-gray-200 focus:outline-none focus:ring-0 focus:border-gray-500 transition-all pr-10"
                      />
                      <Mail className="absolute right-3 top-1/2 transform -translate-y-1/2 text-gray-400 h-5 w-5" />
                    </div>
                  </div>

                  <button
                    type="submit"
                    disabled={loading}
                    className={`w-full py-3 px-4 bg-red-500 hover:bg-red-600 text-white font-medium rounded-lg transition duration-200 flex items-center justify-center group mt-6 ${loading ? 'opacity-70 cursor-not-allowed' : ''}`}
                  >
                    {loading ? 'Sending...' : 'Send Reset Link'}
                    <ArrowRight className="ml-2 h-4 w-4 transform group-hover:translate-x-1 transition-transform" />
                  </button>
                </form>

                <div className="mt-8 text-center">
                  <Link href="/auth/signUp" className="text-sm text-gray-600 hover:text-red-600 transition-colors">
                    Don&apos;t have an account? <span className="font-bold">Sign up</span>
                  </Link>
                </div>
              </div>
            </div>
          </div>
        </div>
      </main>

      <footer className="py-4 border-t relative z-10">
        <div className="container mx-auto flex justify-center space-x-4 text-sm font-extrabold text-gray-400">
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

        <div className="text-center text-gray-500 text-xs mt-2">
          &copy; {new Date().getFullYear()} Lifeliner. All rights reserved. Daniella Asiedu
        </div>
      </footer>
    </div>
  )
}