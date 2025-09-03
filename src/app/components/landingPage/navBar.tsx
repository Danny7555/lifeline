"use client"

import Image from "next/image"
import Link from "next/link"
import { User } from "lucide-react"
import { useState, useEffect } from "react"
import { usePathname } from "next/navigation"

export default function NavBar() {
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);
  const [imageLoaded, setImageLoaded] = useState(false);
  const pathname = usePathname();

  // Handle scroll effect
  useEffect(() => {
    const handleScroll = () => {
      setScrolled(window.scrollY > 10);
    };
    
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  // Close mobile menu when pathname changes
  useEffect(() => {
    setIsMenuOpen(false);
  }, [pathname]);

  useEffect(() => {
    const style = document.createElement('style');
    style.innerHTML = `
      html {
        scroll-behavior: smooth;
      }
      [id] {
        scroll-margin-top: 80px; /* Adjust this value based on your navbar height */
      }
    `;
    document.head.appendChild(style);
    
    return () => {
      document.head.removeChild(style);
    };
  }, []);

  return (
    <nav className={`w-full bg-[#FFB5B5] px-4 sm:px-6 py-3 sm:py-4 shadow-md sticky top-0 z-50 transition-all duration-300 ${scrolled ? 'shadow-lg' : 'shadow-md'}`}>
      <div className="container mx-auto max-w-6xl flex justify-between items-center">
        {/* Logo with improved handling */}
        <Link href="/" className="flex items-center group relative">
          <div className="relative h-11 w-11 sm:h-12 sm:w-12 md:h-14 md:w-14 overflow-hidden rounded-full border-2 border-white shadow-md transition-transform duration-200 group-hover:scale-110">
            <Image
              src="/images/logo.png" 
              alt="Lifeline Logo"
              fill
              priority={true}
              sizes="(max-width: 640px) 44px, (max-width: 768px) 48px, 56px"
              className={`object-contain ${imageLoaded ? 'opacity-100' : 'opacity-0'} transition-opacity duration-300`}
              onLoad={() => setImageLoaded(true)}
              onError={() => console.error("Logo image failed to load")}
            />
            {/* Fallback while image loads */}
            {!imageLoaded && (
              <div className="absolute inset-0 bg-[#FA9D9D] flex items-center justify-center">
                <span className="font-bold text-white text-lg">L</span>
              </div>
            )}
          </div>
        </Link>

        {/* Navigation Links - Desktop */}
        <div className="hidden md:flex items-center justify-center space-x-6 lg:space-x-8 flex-1 mx-6 lg:mx-12">
          <Link 
            href="/" 
            className={`text-black font-medium text-sm lg:text-base ${pathname === '/' ? 'border-b-2 border-black pb-1' : 'hover:text-gray-800 transition-colors group'}`}
          >
            <span className={pathname !== '/' ? "group-hover:border-b-2 group-hover:border-black group-hover:pb-1" : ""}>HOME</span>
          </Link>
          <Link 
            href="/symptom-checker" 
            className={`text-black font-medium text-sm lg:text-base ${pathname.startsWith('/symptom-checker') ? 'border-b-2 border-black pb-1' : 'hover:text-gray-800 transition-colors group'}`}
          >
            <span className={!pathname.startsWith('/symptom-checker') ? "group-hover:border-b-2 group-hover:border-black group-hover:pb-1" : ""}>SYMPTOM CHECKER</span>
          </Link>
          <Link 
            href="/first-aid" 
            className={`text-black font-medium text-sm lg:text-base ${pathname.startsWith('/first-aid') ? 'border-b-2 border-black pb-1' : 'hover:text-gray-800 transition-colors group'}`}
          >
            <span className={!pathname.startsWith('/first-aid') ? "group-hover:border-b-2 group-hover:border-black group-hover:pb-1" : ""}>FIRST AID GUIDES</span>
          </Link>
          
          <Link 
            href="/contact" 
            className={`text-black font-medium text-sm lg:text-base ${pathname === '/contact' ? 'border-b-2 border-black pb-1' : 'hover:text-gray-800 transition-colors group'}`}
          >
            <span className={pathname !== '/contact' ? "group-hover:border-b-2 group-hover:border-black group-hover:pb-1" : ""}>CONTACT US</span>
          </Link>
        </div>

        {/* Mobile menu button */}
        <div className="md:hidden flex items-center">
          <Link 
            href="/auth/signIn" 
            className={`mr-3 text-black p-1.5 rounded-full ${pathname.startsWith('/auth') ? 'bg-[#FA9D9D]' : 'hover:bg-[#FA9D9D]'} transition-colors`}
            aria-label="User account"
          >
            <User className="h-5 w-5" />
          </Link>
          
          <button 
            className="text-black focus:outline-none p-1.5 rounded-md hover:bg-[#FA9D9D] transition-colors"
            onClick={() => setIsMenuOpen(!isMenuOpen)}
            aria-label="Toggle menu"
          >
            {!isMenuOpen ? (
              <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 6h16M4 12h16M4 18h16" />
              </svg>
            ) : (
              <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
              </svg>
            )}
          </button>
        </div>

        {/* Right Side - Donate Button & User Icon */}
        <div className="hidden md:flex items-center space-x-3 lg:space-x-4">
          <Link 
            href="/donate" 
            className={`bg-white text-black font-bold py-1.5 px-4 lg:py-2 lg:px-6 border-2 border-black rounded-md hover:bg-gray-100 transition-all duration-200 hover:shadow-md transform hover:-translate-y-0.5 text-sm lg:text-base ${pathname === '/donate' ? 'bg-gray-100 shadow-md -translate-y-0.5' : ''}`}
          >
            DONATE
          </Link>
          <Link 
            href="/auth/signIn" 
            className={`text-black p-1.5 rounded-full ${pathname.startsWith('/auth') ? 'bg-[#FA9D9D]' : 'hover:bg-[#FA9D9D]'} transition-colors`}
            aria-label="User account"
          >
            <User className="h-6 w-6" />
          </Link>
        </div>
      </div>

      {/* Mobile Navigation - Slide down animation */}
      <div 
        className={`md:hidden overflow-hidden transition-all duration-300 ease-in-out ${
          isMenuOpen 
            ? 'max-h-96 opacity-100 mt-3' 
            : 'max-h-0 opacity-0 mt-0'
        }`}
      >
        <div className="bg-[#FA9D9D] rounded-lg shadow-lg border border-[#FF9A9A]">
          <div className="py-2">
            <Link href="/" className={`block font-medium py-3 px-4 transition-colors ${pathname === '/' ? 'bg-[#FFB5B5] text-black font-semibold' : 'text-black hover:bg-[#FFB5B5]'}`}>HOME</Link>
            <Link href="/symptom-checker" className={`block font-medium py-3 px-4 transition-colors ${pathname.startsWith('/symptom-checker') ? 'bg-[#FFB5B5] text-black font-semibold' : 'text-black hover:bg-[#FFB5B5]'}`}>SYMPTOM CHECKER</Link>
            <Link href="/first-aid" className={`block font-medium py-3 px-4 transition-colors ${pathname.startsWith('/first-aid') ? 'bg-[#FFB5B5] text-black font-semibold' : 'text-black hover:bg-[#FFB5B5]'}`}>FIRST AID GUIDES</Link>
            <Link href="/donate" className={`block font-medium py-3 px-4 transition-colors ${pathname.startsWith('/donate') ? 'bg-[#FFB5B5] text-black font-semibold' : 'text-black hover:bg-[#FFB5B5]'}`}>DONATE</Link>
            <Link href="/contact" className={`block font-medium py-3 px-4 transition-colors ${pathname === '/contact' ? 'bg-[#FFB5B5] text-black font-semibold' : 'text-black hover:bg-[#FFB5B5]'}`}>CONTACT US</Link>
            
            <div className="px-4 py-3 mt-1 border-t border-[#FF9A9A]">
              <Link 
                href="/donate" 
                className={`block w-full text-center font-bold py-2.5 rounded-md transition-colors bg-white text-black border-2 border-black hover:bg-gray-100 shadow-sm`}
              >
                DONATE NOW
              </Link>
            </div>
          </div>
        </div>
      </div>
    </nav>
  )
}