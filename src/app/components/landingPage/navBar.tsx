"use client"

import Image from "next/image"
import Link from "next/link"
import { User } from "lucide-react"
import { useState } from "react"
import { usePathname } from "next/navigation"

export default function NavBar() {
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const pathname = usePathname();

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
            className={`text-black font-medium ${pathname === '/' ? 'border-b-2 border-black pb-1' : 'hover:text-gray-800 transition-colors group'}`}
          >
            <span className={pathname !== '/' ? "group-hover:border-b-2 group-hover:border-black group-hover:pb-1" : ""}>HOME</span>
          </Link>
          <Link 
            href="/symptom-checker" 
            className={`text-black font-medium ${pathname === '/symptom-checker' ? 'border-b-2 border-black pb-1' : 'hover:text-gray-800 transition-colors group'}`}
          >
            <span className={pathname !== '/symptom-checker' ? "group-hover:border-b-2 group-hover:border-black group-hover:pb-1" : ""}>SYMPTOM CHECKER</span>
          </Link>
          <Link 
            href="/first-aid-guide" 
            className={`text-black font-medium ${pathname === '/first-aid-guide' ? 'border-b-2 border-black pb-1' : 'hover:text-gray-800 transition-colors group'}`}
          >
            <span className={pathname !== '/first-aid-guide' ? "group-hover:border-b-2 group-hover:border-black group-hover:pb-1" : ""}>FIRST AID GUIDE</span>
          </Link>
          <Link 
            href="/contact" 
            className={`text-black font-medium ${pathname === '/contact' ? 'border-b-2 border-black pb-1' : 'hover:text-gray-800 transition-colors group'}`}
          >
            <span className={pathname !== '/contact' ? "group-hover:border-b-2 group-hover:border-black group-hover:pb-1" : ""}>CONTACT US</span>
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
            className={`bg-white text-black font-bold py-2 px-6 border-2 border-black rounded-md hover:bg-gray-100 transition-all duration-200 hover:shadow-md transform hover:-translate-y-0.5 ${pathname === '/donate' ? 'bg-gray-100 shadow-md -translate-y-0.5' : ''}`}
          >
            DONATE
          </Link>
          <Link 
            href="/auth/signIn" 
            className={`text-black p-2 rounded-full ${pathname.startsWith('/auth') ? 'bg-[#FA9D9D]' : 'hover:bg-[#FA9D9D]'} transition-colors`}
            aria-label="User account"
          >
            <User className="h-7 w-7" />
          </Link>
        </div>
      </div>

      {/* Mobile Navigation - Conditional rendering based on state */}
      <div className={`md:hidden px-4 py-3 space-y-4 bg-[#FA9D9D] rounded-b-lg mt-4 transition-all duration-300 ${isMenuOpen ? 'block' : 'hidden'}`}>
        <Link href="/" className={`block font-medium py-2 px-3 rounded transition-colors ${pathname === '/' ? 'bg-[#FFB5B5] text-black font-semibold' : 'text-black hover:bg-[#FFB5B5]'}`}>HOME</Link>
        <Link href="/symptom-checker" className={`block font-medium py-2 px-3 rounded transition-colors ${pathname === '/symptom-checker' ? 'bg-[#FFB5B5] text-black font-semibold' : 'text-black hover:bg-[#FFB5B5]'}`}>SYMPTOM CHECKER</Link>
        <Link href="/first-aid-guide" className={`block font-medium py-2 px-3 rounded transition-colors ${pathname === '/first-aid-guide' ? 'bg-[#FFB5B5] text-black font-semibold' : 'text-black hover:bg-[#FFB5B5]'}`}>FIRST AID GUIDE</Link>
        <Link href="/contact" className={`block font-medium py-2 px-3 rounded transition-colors ${pathname === '/contact' ? 'bg-[#FFB5B5] text-black font-semibold' : 'text-black hover:bg-[#FFB5B5]'}`}>CONTACT US</Link>
        <Link href="/donate" className={`block font-medium py-2 px-3 mt-4 rounded-md transition-colors ${pathname === '/donate' ? 'bg-gray-800 text-white' : 'bg-black text-white hover:bg-gray-800'}`}>DONATE</Link>
        <Link href="/auth/signIn" className={`flex items-center font-medium py-2 px-3 rounded transition-colors ${pathname.startsWith('/auth') ? 'bg-[#FFB5B5] text-black font-semibold' : 'text-black hover:bg-[#FFB5B5]'}`}>
          <User className="h-5 w-5 mr-2" />
          <span>ACCOUNT</span>
        </Link>
      </div>
    </nav>
  )
}