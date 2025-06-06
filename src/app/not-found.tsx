'use client';

import Link from 'next/link';
import { usePathname } from 'next/navigation';
import { useState, useEffect } from 'react';

export default function NotFound() {
  const pathname = usePathname();
  const [countdown, setCountdown] = useState<number | null>(null);

  useEffect(() => {
    if (typeof window === 'undefined') return;
    setCountdown(10);
  }, []);

  useEffect(() => {
    if (countdown === null) return;
    
    if (countdown <= 0) {
      window.location.href = '/';
      return;
    }
    
    const timer = setTimeout(() => {
      setCountdown(countdown - 1);
    }, 1000);
    
    return () => clearTimeout(timer);
  }, [countdown]);
  
  return (
    <div className="min-h-screen bg-gray-50 flex flex-col">
      {/* 404 Content */}
      <main className="flex-grow flex items-center justify-center px-4 sm:px-6 lg:px-8">
        <div className="max-w-md w-full text-center">
          <div className="my-8">
            <div className="text-9xl font-extrabold text-[#FC7A7A]">404</div>
            <div className="mt-4 text-3xl font-extrabold text-gray-900 tracking-tight">
              Page not found
            </div>
            <p className="mt-4 text-gray-500">
              Sorry, we couldn&apos;t find the page you&apos;re looking for.
              <br />
              <span className="font-medium">{pathname}</span> doesn&apos;t exist.
            </p>
            <div className="mt-10 space-y-4">
              <button 
                onClick={() => window.history.back()} 
                className="w-full flex items-center justify-center px-4 py-2 border border-transparent rounded-md shadow-sm text-sm font-medium text-white bg-[#cf9393] hover:bg-[#FC7A7A] focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-[#FC7A7A]"
              >
                <span>Go back</span>
              </button>
              <Link 
                href="/" 
                className="w-full flex items-center justify-center px-4 py-2 border border-gray-300 rounded-md shadow-sm text-sm font-medium text-gray-700 bg-white hover:bg-gray-50 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-[#FC7A7A]"
              >
                Return to homepage {countdown !== null && `(auto-redirect in ${countdown}s)`}
              </Link>
            </div>
          </div>
        </div>
      </main>
      
      {/* Footer */}
      <footer className='bg-gray-50 border-t border-gray-200'>
        <div className="max-w-7xl mx-auto py-6 px-4 sm:px-6 lg:px-8">
          <div className="text-center text-sm text-gray-500">
           &copy; {new Date().getFullYear()} Lifeliner. All rights reserved. Daniella Asiedu
          </div>
        </div>
      </footer>
    </div>
  );
}