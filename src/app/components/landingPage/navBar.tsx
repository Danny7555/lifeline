"use client"

import Image from "next/image"
import Link from "next/link"
import { User } from "lucide-react"
import { useState } from "react"

export default function NavBar() {
  const [isMenuOpen, setIsMenuOpen] = useState(false);

  return (
    <nav className="w-full bg-[#FFB5B5] px-4 sm:px-6 py-4 shadow-md sticky top-0 z-50">
      <div className="container mx-auto max-w-6xl flex justify-between items-center">
        {/* Logo */}
        <Link href="/" className="flex items-center group">
          <div className="relative h-12 w-12 bg-white rounded-md overflow-hidden border-2 border-black shadow-sm transition-transform duration-200 group-hover:scale-105">
            <Image
              src="/images/logo.jpg" 
              alt="Lifeline Logo"
              width={48}
              height={48}
              className="object-contain"
              priority
            />
          </div>
          <span className="ml-2 font-bold text-xl hidden sm:block">LIFELINE</span>
        </Link>

        {/* Navigation Links - Desktop */}
        <div className="hidden md:flex items-center justify-center space-x-8 flex-1 mx-12">
          <Link 
            href="/" 
            className="text-black font-medium border-b-2 border-black pb-1 hover:text-gray-800 transition-colors"
          >
            HOME
          </Link>
          <Link 
            href="/symptom-checker" 
            className="text-black font-medium relative hover:text-gray-800 transition-colors group"
          >
            <span className="group-hover:border-b-2 group-hover:border-black group-hover:pb-1">SYMPTOM CHECKER</span>
          </Link>
          <Link 
            href="/first-aid-guide" 
            className="text-black font-medium relative hover:text-gray-800 transition-colors group"
          >
            <span className="group-hover:border-b-2 group-hover:border-black group-hover:pb-1">FIRST AID GUIDE</span>
          </Link>
          <Link 
            href="../contact" 
            className="text-black font-medium hover:text-gray-800 transition-colors hover:border-b-2 hover:border-black hover:pb-1"
          >
            CONTACT US
          </Link>
        </div>

        {/* Mobile menu button */}
        <div className="md:hidden">
          <button 
            className="text-black focus:outline-none p-2 rounded-md hover:bg-[#FA9D9D] transition-colors"
            onClick={() => setIsMenuOpen(!isMenuOpen)}
            aria-label="Toggle menu"
          >
            {!isMenuOpen ? (
              <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 6h16M4 12h16M4 18h16" />
              </svg>
            ) : (
              <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
              </svg>
            )}
          </button>
        </div>

        {/* Right Side - Donate Button & User Icon */}
        <div className="hidden md:flex items-center space-x-4">
          <Link 
            href="/donate" 
            className="bg-white text-black font-bold py-2 px-6 border-2 border-black rounded-md hover:bg-gray-100 transition-all duration-200 hover:shadow-md transform hover:-translate-y-0.5"
          >
            DONATE
          </Link>
          <Link 
            href="/auth/signIn" 
            className="text-black p-2 rounded-full hover:bg-[#FA9D9D] transition-colors"
            aria-label="User account"
          >
            <User className="h-7 w-7" />
          </Link>
        </div>
      </div>

      {/* Mobile Navigation - Conditional rendering based on state */}
      <div className={`md:hidden px-4 py-3 space-y-4 bg-[#FA9D9D] rounded-b-lg mt-4 transition-all duration-300 ${isMenuOpen ? 'block' : 'hidden'}`}>
        <Link href="/" className="block text-black font-medium py-2 px-3 rounded hover:bg-[#FFB5B5] transition-colors">HOME</Link>
        <Link href="/symptom-checker" className="block text-black font-medium py-2 px-3 rounded hover:bg-[#FFB5B5] transition-colors">SYMPTOM CHECKER</Link>
        <Link href="/first-aid-guide" className="block text-black font-medium py-2 px-3 rounded hover:bg-[#FFB5B5] transition-colors">FIRST AID GUIDE</Link>
        <Link href="/contact" className="block text-black font-medium py-2 px-3 rounded hover:bg-[#FFB5B5] transition-colors">CONTACT US</Link>
        <Link href="/donate" className="block text-white font-medium py-2 px-3 mt-4 bg-black rounded-md hover:bg-gray-800 transition-colors">DONATE</Link>
        <Link href="/auth/signIn" className="flex items-center text-black font-medium py-2 px-3 rounded hover:bg-[#FFB5B5] transition-colors">
          <User className="h-5 w-5 mr-2" />
          <span>ACCOUNT</span>
        </Link>
      </div>
    </nav>
  )
}