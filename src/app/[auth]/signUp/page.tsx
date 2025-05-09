import Image from "next/image"
import Link from "next/link"

export default function SignUpPage() {
  return (
    <div className="min-h-screen flex items-center justify-center p-4 relative overflow-hidden">
      {/* Background pattern */}
      <div
        className="absolute inset-0 z-0 opacity-15"
        style={{
          backgroundImage: `url('/images/background.jpg')`,
          backgroundSize: "800px",
          backgroundPosition: "center",
        }}
      />

      <div className="container max-w-5xl mx-auto z-10">
        <div className=" rounded-xl shadow-lg overflow-hidden">
          {/* Top labels */}
          <div className="relative h-8">
            <Link href="#" className="absolute top-3 left-4 text-gray-400 text-xs font-light">/home</Link>
            <div className="absolute top-3 right-4">
              <button className="flex items-center text-gray-500 text-xs gap-1.5">
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  width="14"
                  height="14"
                  viewBox="0 0 24 24"
                  fill="none"
                  stroke="currentColor"
                  strokeWidth="2"
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  className="lucide lucide-globe"
                >
                  <circle cx="12" cy="12" r="10" />
                  <line x1="2" x2="22" y1="12" y2="12" />
                  <path d="M12 2a15.3 15.3 0 0 1 4 10 15.3 15.3 0 0 1-4 10 15.3 15.3 0 0 1-4-10 15.3 15.3 0 0 1 4-10z" />
                </svg>
                English (UK)
              </button>
            </div>
          </div>

          <div className="flex flex-col md:flex-row">
            {/* Left side with illustration */}
            <div className="w-full md:w-5/12 p-6 md:p-8 flex items-center justify-center">
              <div className="w-full max-w-[300px] md:max-w-none">
                <Image
                  src="/images/signup.png"
                  alt="Medical illustration"
                  width={400}
                  height={400}
                  className="w-full h-auto"
                  priority
                />
              </div>
            </div>

            {/* Right side with form */}
            <div className="w-full md:w-7/12 p-6 md:p-10 lg:p-12">
              <h1 className="text-3xl md:text-4xl font-bold text-[#ff6b6b] mb-1">Welcome!</h1>
              <p className="text-gray-700 mb-6">Sign up to continue</p>

              {/* Google button */}
              <button className="w-full flex items-center justify-center gap-2 border border-gray-300 rounded-md py-2 px-4 text-gray-700 mb-6  transition-colors text-sm bg-transparent">
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
                Continue with Google
              </button>

              {/* OR divider */}
              <div className="relative flex items-center justify-center mb-6">
                <div className="flex-grow border-t border-gray-300"></div>
                <span className="flex-shrink mx-4 text-gray-500 text-sm">OR</span>
                <div className="flex-grow border-t border-gray-300"></div>
              </div>

              <h2 className="text-gray-700 font-medium mb-4">Enter your details below</h2>

              <div className="space-y-4">
                {/* Name field */}
                <div>
                  <label htmlFor="name" className="block text-sm font-medium text-gray-700 mb-1">
                    Name
                  </label>
                  <div className="relative">
                    <input
                      id="name"
                      type="text"
                      className="w-full px-3 py-2 border border-gray-300 rounded-full focus:outline-none focus:ring-2 focus:ring-[#ff6b6b] focus:border-transparent pr-10 bg-transparent"
                    />
                    <div className="absolute inset-y-0 right-0 flex items-center pr-3 pointer-events-none text-gray-400">
                      <svg
                        xmlns="http://www.w3.org/2000/svg"
                        width="16"
                        height="16"
                        viewBox="0 0 24 24"
                        fill="none"
                        stroke="currentColor"
                        strokeWidth="2"
                        strokeLinecap="round"
                        strokeLinejoin="round"
                        className="lucide lucide-user"
                      >
                        <path d="M19 21v-2a4 4 0 0 0-4-4H9a4 4 0 0 0-4 4v2" />
                        <circle cx="12" cy="7" r="4" />
                      </svg>
                    </div>
                  </div>
                </div>

                {/* Email field */}
                <div>
                  <label htmlFor="email" className="block text-sm font-medium text-gray-700 mb-1">
                    Email
                  </label>
                  <div className="relative">
                    <input
                      id="email"
                      type="email"
                      className="w-full px-3 py-2 border border-gray-300 rounded-full focus:outline-none focus:ring-2 focus:ring-[#ff6b6b] focus:border-transparent pr-10 bg-transparent"
                    />
                    <div className="absolute inset-y-0 right-0 flex items-center pr-3 pointer-events-none text-gray-400">
                      <svg
                        xmlns="http://www.w3.org/2000/svg"
                        width="16"
                        height="16"
                        viewBox="0 0 24 24"
                        fill="none"
                        stroke="currentColor"
                        strokeWidth="2"
                        strokeLinecap="round"
                        strokeLinejoin="round"
                        className="lucide lucide-mail"
                      >
                        <rect width="20" height="16" x="2" y="4" rx="2" />
                        <path d="m22 7-8.97 5.7a1.94 1.94 0 0 1-2.06 0L2 7" />
                      </svg>
                    </div>
                  </div>
                </div>

                {/* Password field */}
                <div>
                  <label htmlFor="password" className="block text-sm font-medium text-gray-700 mb-1">
                    Password
                  </label>
                  <div className="relative">
                    <input
                      id="password"
                      type="password"
                      className="w-full px-3 py-2 border border-gray-300 rounded-full focus:outline-none focus:ring-2 focus:ring-[#ff6b6b] focus:border-transparent pr-10 bg-transparent"
                    />
                    <div className="absolute inset-y-0 right-0 flex items-center pr-3 pointer-events-none text-gray-400">
                      <svg
                        xmlns="http://www.w3.org/2000/svg"
                        width="16"
                        height="16"
                        viewBox="0 0 24 24"
                        fill="none"
                        stroke="currentColor"
                        strokeWidth="2"
                        strokeLinecap="round"
                        strokeLinejoin="round"
                        className="lucide lucide-lock"
                      >
                        <rect width="18" height="11" x="3" y="11" rx="2" ry="2" />
                        <path d="M7 11V7a5 5 0 0 1 10 0v4" />
                      </svg>
                    </div>
                  </div>
                </div>

                {/* Repeat Password field */}
                <div>
                  <label htmlFor="repeat-password" className="block text-sm font-medium text-gray-700 mb-1">
                    Repeat Password
                  </label>
                  <div className="relative">
                    <input
                      id="repeat-password"
                      type="password"
                      className="w-full px-3 py-2 border border-gray-300 rounded-full focus:outline-none focus:ring-2 focus:ring-[#ff6b6b] focus:border-transparent pr-10 bg-transparent"
                    />
                    <div className="absolute inset-y-0 right-0 flex items-center pr-3 pointer-events-none text-gray-400">
                      <svg
                        xmlns="http://www.w3.org/2000/svg"
                        width="16"
                        height="16"
                        viewBox="0 0 24 24"
                        fill="none"
                        stroke="currentColor"
                        strokeWidth="2"
                        strokeLinecap="round"
                        strokeLinejoin="round"
                        className="lucide lucide-lock"
                      >
                        <rect width="18" height="11" x="3" y="11" rx="2" ry="2" />
                        <path d="M7 11V7a5 5 0 0 1 10 0v4" />
                      </svg>
                    </div>
                  </div>
                </div>

                {/* Remember me checkbox */}
                <div className="flex items-center space-x-2 mt-2">
                  <input
                    type="checkbox"
                    id="remember"
                    className="h-4 w-4 text-[#ff6b6b] focus:ring-[#ff6b6b] border-gray-500 rounded bg-gray-500"
                  />
                  <label htmlFor="remember" className="text-sm text-gray-700">
                    Remember me
                  </label>
                </div>

                {/* Sign up button */}
                <button className="w-full bg-[#ff6b6b] hover:bg-[#ff5252] text-white py-2 px-4 rounded-full transition-colors font-medium mt-2">
                  SIGN UP
                </button>

                {/* Login link */}
                <div className="text-center text-sm text-gray-600 mt-2">
                  Already have an account?{" "}
                  <Link href="/auth/signIn" className="text-[#ff6b6b] hover:underline">
                    Login
                  </Link>
                </div>
              </div>

              {/* Footer links */}
              <div className="mt-8 pt-4 border-t border-gray-200 flex justify-center space-x-4 text-xs text-gray-500">
                <Link href="/contact" className="hover:text-gray-700">
                  Contact Support
                </Link>
                <Link href="/privacy" className="hover:text-gray-700">
                  Privacy Policy
                </Link>
                <Link href="/terms" className="hover:text-gray-700">
                  Terms & Conditions
                </Link>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}
