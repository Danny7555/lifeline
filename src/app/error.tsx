'use client';

import { useEffect } from 'react';
import Link from 'next/link';
import { FaHome, FaExclamationTriangle, FaArrowLeft } from 'react-icons/fa';
import { useRouter } from 'next/navigation';

export default function Error({
  error,
  reset,
}: {
  error: Error & { digest?: string };
  reset: () => void;
}) {
  const router = useRouter();
  
  useEffect(() => {
    console.error(error);
  }, [error]);

  return (
    <div className="min-h-screen flex flex-col bg-gradient-to-br from-orange-50 via-white to-orange-50">
      {/* Responsive header */}
      <header className="w-full py-3 md:py-4 px-4 md:px-6 flex items-center justify-between border-b border-orange-100">
        <Link href="/" className="flex items-center">
          <div className="font-bold text-lg md:text-xl text-orange-600">Lifeline</div>
        </Link>
      </header>

      <div className="flex-1 flex items-center justify-center p-3 md:p-4">
        <div className="w-full max-w-xs sm:max-w-sm md:max-w-lg mx-auto bg-white rounded-xl md:rounded-2xl shadow-lg md:shadow-xl overflow-hidden">
          {/* Decorative top banner */}
          <div className="h-1.5 md:h-2 bg-gradient-to-r from-orange-600 to-amber-600"></div>
          
          <div className="p-4 sm:p-6 md:p-8">
            <div className="flex flex-col items-center mb-4 md:mb-6">
              <div className="relative w-24 h-24 sm:w-32 sm:h-32 md:w-40 md:h-40 mb-4 md:mb-6">
                {/* You can replace this with your own illustration */}
                <div className="absolute inset-0 flex items-center justify-center bg-orange-100 rounded-full">
                  <FaExclamationTriangle className="text-orange-600 text-2xl sm:text-3xl md:text-4xl" />
                </div>
              </div>
              
              <h2 className="text-xl sm:text-2xl font-bold text-gray-800 mb-2">We hit a snag</h2>
              
              <p className="text-sm md:text-base text-gray-600 text-center mb-4 md:mb-6">
                Don&apos;t worry! We&apos;re here to help you get back on track.
              </p>
            </div>
            
            {error.message && (
              <div className="bg-orange-50 border-l-4 border-orange-500 text-orange-700 p-3 md:p-4 mb-4 md:mb-6 rounded text-xs md:text-sm">
                <p className="font-medium">Error details:</p>
                <p>{error.message}</p>
                {error.digest && (
                  <p className="text-xs mt-1 text-gray-500">Reference: {error.digest}</p>
                )}
              </div>
            )}
            
            <div className="grid grid-cols-1 gap-2 sm:gap-3 sm:grid-cols-2">
              <button
                onClick={() => reset()}
                className="flex items-center justify-center px-3 md:px-4 py-2 md:py-3 bg-orange-600 text-white text-sm md:text-base rounded-lg hover:bg-orange-700 transition-colors focus:outline-none focus:ring-2 focus:ring-orange-500 focus:ring-opacity-50"
              >
                <FaArrowLeft className="mr-2" /> Try again
              </button>
              
              <Link href="/"
                className="flex items-center justify-center px-3 md:px-4 py-2 md:py-3 border border-orange-600 text-orange-600 text-sm md:text-base rounded-lg hover:bg-orange-50 transition-colors focus:outline-none focus:ring-2 focus:ring-orange-500 focus:ring-opacity-50"
              >
                <FaHome className="mr-2" /> Return to Home
              </Link>
              
              <button
                onClick={() => router.back()}
                className="col-span-1 sm:col-span-2 flex items-center justify-center px-3 md:px-4 py-2 md:py-3 bg-gray-100 text-gray-800 text-sm md:text-base rounded-lg hover:bg-gray-200 transition-colors focus:outline-none focus:ring-2 focus:ring-gray-500 focus:ring-opacity-50 mt-1"
              >
                Go back
              </button>
            </div>
          </div>
          
          <div className="bg-gray-50 p-3 md:p-4 text-center border-t border-gray-100">
            <p className="text-xs md:text-sm text-gray-600">
              Need assistance? <Link href="/contact" className="text-orange-600 hover:underline font-medium">Contact our support team</Link>
            </p>
          </div>
        </div>
      </div>
    </div>
  );
}