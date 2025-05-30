"use client"
import Image from "next/image"
import Link from "next/link"
import { useState } from "react"
import { ArrowRight, Eye, EyeOff, User, Mail, Globe } from "lucide-react"
import { useRouter } from "next/navigation"
import { signIn } from "next-auth/react"

export default function SignIn() {
  const [showPassword, setShowPassword] = useState(false)
  const [formData, setFormData] = useState({
    email: "",
    password: "",
  })
  const [error, setError] = useState("")
  const [loading, setLoading] = useState(false)
  const router = useRouter()

  // Handle form input changes
  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { id, value } = e.target
    setFormData(prev => ({
      ...prev,
      [id]: value
    }))
  }

  // Handle email/password signin
  const handleSignIn = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault()
    setError("")
    setLoading(true)

    // Validate form
    if (!formData.email || !formData.password) {
      setError("Email and password are required")
      setLoading(false)
      return
    }

    try {
      const result = await signIn('credentials', {
        redirect: false,
        email: formData.email,
        password: formData.password
      })

      if (result?.error) {
        throw new Error(result.error)
      }

      // Redirect to dashboard/profile
      router.push('/dashboard/profile')
    } catch (error) {
      console.error("Error during sign in:", error)
      setError(error instanceof Error ? error.message : "Invalid email or password")
    } finally {
      setLoading(false)
    }
  }

  // Handle Google sign-in
  const handleGoogleSignIn = async () => {
    setError("")
    setLoading(true)
    
    try {
      await signIn('google', { callbackUrl: '/dashboard/profile' })
    } catch (error) {
      console.error("Error initiating Google sign-in:", error)
      setError(error instanceof Error ? error.message : "An unexpected error occurred")
      setLoading(false)
    }
  }

  return (
    <div className="min-h-screen flex flex-col relative bg-gradient-to-br from-white to-red-50">
      {/* Background pattern */}
      <div className="absolute inset-0 bg-[url('/images/background.jpg')] bg-cover bg-repeat opacity-10 pointer-events-none" />
           {/* Navigation overlay - positioned on top of background */}
      <div className="absolute top-0 left-0 right-0 py-2 px-4 flex justify-between items-center z-10">
        <div className="w-20">
          {/* Empty div for spacing */}
        </div>
        
      </div>

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
                src="/images/medical-kit.png"
                alt="Medical kit illustration"
                width={400}
                height={400}
                className="relative z-10 mx-auto drop-shadow-lg"
              />
            </div>

            <div className="mt-8 text-center">
              <p className="text-gray-700">&apos;Caring for your health, every step of the way&apos;</p>
            </div>
          </div>
        </div>

        {/* Right side with signin form */}
        <div className="w-full md:w-1/2 flex flex-col">
          <div className="p-4 flex justify-end">
            <div className="text-sm text-gray-600">
              Don&apos;t have an account?{" "}
              <Link href="/auth/signUp" className="font-extrabold text-red-600 hover:text-red-700 transition-colors">
                Sign Up
              </Link>
            </div>
          </div>

          <div className="flex-1 flex items-center justify-center p-6">
            <div className="w-full max-w-md">
              <div className="bg-white p-12 rounded-xl border border-gray-800 shadow-lg">
                <div className="mb-8">
                  <p className="text-gray-600 text-lg font-extralight">
                    Welcome back <span className="uppercase font-extrabold text-gray-500">Lifeliner!</span>
                  </p>
                  <h1 className="text-2xl md:text-3xl font-poppins mt-2 text-gray-800">Sign in to your account</h1>
                </div>

                {/* Show error message if any */}
                {error && (
                  <div className="bg-red-100 border border-red-400 text-red-700 px-4 py-3 rounded relative mb-4" role="alert">
                    <span className="block sm:inline">{error}</span>
                  </div>
                )}

                <form className="space-y-5" onSubmit={handleSignIn}>
                  <div className="space-y-2">
                    <label htmlFor="email" className="block text-sm font-medium text-gray-700">
                      Email
                    </label>
                    <div className="relative">
                      <input
                        id="email"
                        type="email"
                        placeholder="username@example.com"
                        value={formData.email}
                        onChange={handleChange}
                        className="w-full px-4 py-3 border-0 border-b-2 border-gray-200 focus:outline-none focus:ring-0 focus:border-gray-500 transition-all pr-10"
                      />
                      <Mail className="absolute right-3 top-1/2 transform -translate-y-1/2 text-gray-400 h-5 w-5" />
                    </div>
                  </div>

                  <div className="space-y-2">
                    <label htmlFor="password" className="block text-sm font-medium text-gray-700">
                      Password
                    </label>
                    <div className="relative">
                      <input
                        id="password"
                        type={showPassword ? "text" : "password"}
                        placeholder="Enter your password"
                        value={formData.password}
                        onChange={handleChange}
                        className="w-full px-4 py-3 border-0 border-b-2 border-gray-200 focus:outline-none focus:ring-0 focus:border-gray-500 transition-all"
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

                  <div className="flex items-center justify-between mt-2">
                    <div className="flex items-center">
                      <input
                        type="checkbox"
                        id="remember"
                        className="h-4 w-4 text-red-500 focus:ring-red-500 border-gray-300 rounded"
                      />
                      <label htmlFor="remember" className="ml-2 text-sm text-gray-700">
                        Remember me
                      </label>
                    </div>
                    <Link href="/auth/forgot-password" className="text-sm text-red-600 hover:text-red-700">
                      Forgot password?
                    </Link>
                  </div>

                  <button
                    type="submit"
                    disabled={loading}
                    className={`w-full py-3 px-4 bg-red-500 hover:bg-red-600 text-white font-medium rounded-lg transition duration-200 flex items-center justify-center group mt-2 ${loading ? 'opacity-70 cursor-not-allowed' : ''}`}
                  >
                    {loading ? 'Signing in...' : 'Sign In'}
                    <ArrowRight className="ml-2 h-4 w-4 transform group-hover:translate-x-1 transition-transform" />
                  </button>
                </form>

                <div className="relative flex items-center justify-center my-6">
                  <div className="flex-grow border-t border-gray-300"></div>
                  <span className="flex-shrink mx-4 text-gray-500 text-sm">OR</span>
                  <div className="flex-grow border-t border-gray-300"></div>
                </div>

                <button 
                  type="button"
                  onClick={handleGoogleSignIn}
                  disabled={loading}
                  className={`w-full flex items-center justify-center gap-2 border border-gray-300 rounded-lg py-2.5 px-4 text-gray-700 transition-colors text-sm bg-white hover:bg-gray-50 ${loading ? 'opacity-70 cursor-not-allowed' : ''}`}
                >
                  <svg xmlns="http://www.w3.org/2000/svg" width="18" height="18" viewBox="0 0 24 24">
                    {/* Google icon SVG paths */}
                  </svg>
                  {loading ? 'Processing...' : 'Continue with Google'}
                </button>
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
