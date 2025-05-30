"use client"
import Image from "next/image"
import Link from "next/link"
import { useState } from "react"
import { ArrowRight, Eye, EyeOff, User, Mail, Globe } from "lucide-react"
import { useRouter } from "next/navigation"
import { signIn } from "next-auth/react"

export default function SignUp() {
  const [showPassword, setShowPassword] = useState(false)
  const [showConfirmPassword, setShowConfirmPassword] = useState(false)
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    password: "",
    confirmPassword: ""
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

  // Handle email/password signup
  const handleSignUp = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault()
    setError("")
    setLoading(true)

    // Validate form
    if (!formData.name || !formData.email || !formData.password) {
      setError("All fields are required")
      setLoading(false)
      return
    }

    if (formData.password !== formData.confirmPassword) {
      setError("Passwords do not match")
      setLoading(false)
      return
    }

    try {
      // Register the user through our API
      const response = await fetch('/api/register', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          name: formData.name,
          email: formData.email,
          password: formData.password
        })
      })

      // Log detailed response information
      console.log('Registration response status:', response.status);
      
      const data = await response.json()
      console.log('Registration response data:', data);

      if (!response.ok) {
        throw new Error(data.error || `Registration failed with status ${response.status}`)
      }

      // Sign in the user after successful registration
      const result = await signIn('credentials', {
        redirect: false,
        email: formData.email,
        password: formData.password
      })

      if (result?.error) {
        console.error('Sign-in error after registration:', result.error);
        throw new Error(result.error)
      }

      // Redirect to profile page - update to match Google sign-in path
      router.push('/dashboard/profile')
    } catch (error) {
      console.error("Error during signup:", error)
      setError(error instanceof Error ? error.message : "An unexpected error occurred")
    } finally {
      setLoading(false)
    }
  }

  // Handle Google sign-in
  const handleGoogleSignIn = async () => {
    setError("")
    setLoading(true)
    
    try {
      // Update to match the protected route pattern from middleware
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
                alt="Medical illustration"
                width={400}
                height={400}
                priority
                style={{ width: "auto", height: "auto" }}
                className="relative z-10 mx-auto drop-shadow-lg"
              />
            </div>

            <div className="mt-8 text-center">
              <p className="text-gray-700">&apos;Join our community for better healthcare&apos;</p>
            </div>
          </div>
        </div>

        {/* Right side with signup form */}
        <div className="w-full md:w-1/2 flex flex-col">
          <div className="p-4 flex justify-end">
            <div className="text-sm text-gray-600">
              Already have an account?{" "}
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
                    Welcome <span className="uppercase font-extrabold text-gray-500">Lifeliner!</span>
                  </p>
                  <h1 className="text-2xl md:text-3xl font-poppins mt-2 text-gray-800">Create your account</h1>
                </div>

                {/* Show error message if any */}
                {error && (
                  <div className="bg-red-100 border border-red-400 text-red-700 px-4 py-3 rounded relative mb-4" role="alert">
                    <span className="block sm:inline">{error}</span>
                  </div>
                )}

                <form className="space-y-5" onSubmit={handleSignUp}>
                  <div className="space-y-2">
                    <label htmlFor="name" className="block text-sm font-medium text-gray-700">
                      Name
                    </label>
                    <div className="relative">
                      <input
                        id="name"
                        type="text"
                        placeholder="Your full name"
                        value={formData.name}
                        onChange={handleChange}
                        className="w-full px-4 py-3 border-0 border-b-2 border-gray-200 focus:outline-none focus:ring-0 focus:border-gray-500 transition-all pr-10"
                      />
                      <User className="absolute right-3 top-1/2 transform -translate-y-1/2 text-gray-400 h-5 w-5" />
                    </div>
                  </div>

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
                        placeholder="Create a strong password"
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

                  <div className="space-y-2">
                    <label htmlFor="confirmPassword" className="block text-sm font-medium text-gray-700">
                      Confirm Password
                    </label>
                    <div className="relative">
                      <input
                        id="confirmPassword" 
                        type={showConfirmPassword ? "text" : "password"}
                        placeholder="Confirm your password"
                        value={formData.confirmPassword}
                        onChange={handleChange}
                        className="w-full px-4 py-3 border-0 border-b-2 border-gray-200 focus:outline-none focus:ring-0 focus:border-gray-500 transition-all"
                      />
                      <button
                        type="button"
                        className="absolute right-3 top-1/2 transform -translate-y-1/2 text-gray-500 hover:text-gray-700"
                        onClick={() => setShowConfirmPassword(!showConfirmPassword)}
                      >
                        {showConfirmPassword ? <EyeOff size={20} /> : <Eye size={20} />}
                      </button>
                    </div>
                  </div>

                  <div className="flex items-center space-x-2 mt-2">
                    <input
                      type="checkbox"
                      id="remember"
                      className="h-4 w-4 text-red-500 focus:ring-red-500 border-gray-300 rounded"
                    />
                    <label htmlFor="remember" className="text-sm text-gray-700">
                      Remember me
                    </label>
                  </div>

                  <button
                    type="submit"
                    disabled={loading}
                    className={`w-full py-3 px-4 bg-red-500 hover:bg-red-600 text-white font-medium rounded-lg transition duration-200 flex items-center justify-center group mt-2 ${loading ? 'opacity-70 cursor-not-allowed' : ''}`}
                  >
                    {loading ? 'Processing...' : 'Sign Up'}
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
                    <path
                      fill="#4285F4"
                      d="M22.56 12.25c0-.78-.07-1.53-.2-2.25H12v4.26h5.92c-.26 1.37-1.04 2.53-2.21 3.31v2.77h3.57c2.08-1.92 3.28-4.74 3.28-8.09z"
                    />
                    <path
                      fill="#34A853"
                      d="M12 23c2.97 0 5.46-.98 7.28-2.66l-3.57-2.77c-.98.66-2.23 1.06-3.71 1.06-2.86 0-5.29-1.93-6.16-4.53H2.18v2.84C3.99 20.53 7.7 23 12 23z"
                    />
                    <path
                      fill="#FBBC05"
                      d="M5.84 14.09c-.22-.66-.35-1.36-.35-2.09s.13-1.43.35-2.09V7.07H2.18C1.43 8.55 1 10.22 1 12s.43 3.45 1.18 4.93l2.85-2.22.81-.62z"
                    />
                    <path
                      fill="#EA4335"
                      d="M12 5.38c1.62 0 3.06.56 4.21 1.64l3.15-3.15C17.45 2.09 14.97 1 12 1 7.7 1 3.99 3.47 2.18 7.07l3.66 2.84c.87-2.6 3.3-4.53 6.16-4.53z"
                    />
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