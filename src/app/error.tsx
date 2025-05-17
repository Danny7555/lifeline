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
    // Log the error to an error reporting service
    console.error(error);
  }, [error]);

  return (
    <div className="min-h-screen flex flex-col bg-gradient-to-br from-blue-50 via-white to-blue-50">
      {/* Header - Similar to what might be on landing page */}
      <header className="w-full py-4 px-6 flex items-center border-b border-blue-100">
        <Link href="/" className="flex items-center">
          <div className="font-bold text-xl text-blue-600">Lifeline</div>
        </Link>
      </header>

      <div className="flex-1 flex items-center justify-center p-4">
        <div className="max-w-lg w-full bg-white rounded-2xl shadow-xl overflow-hidden">
          {/* Decorative top banner */}
          <div className="h-2 bg-gradient-to-r from-blue-600 to-indigo-600"></div>
          
          <div className="p-8">
            <div className="flex flex-col items-center mb-6">
              <div className="relative w-40 h-40 mb-6">
                {/* You can replace this with your own illustration */}
                <div className="absolute inset-0 flex items-center justify-center bg-blue-100 rounded-full">
                  <FaExclamationTriangle className="text-blue-600 text-4xl" />
                </div>
              </div>
              
              <h2 className="text-2xl font-bold text-gray-800 mb-2">We hit a snag</h2>
              
              <p className="text-gray-600 text-center mb-6">
                Don&apos;t worry! We&apos;re here to help you get back on track.
              </p>
            </div>
            
            {error.message && (
              <div className="bg-blue-50 border-l-4 border-blue-500 text-blue-700 p-4 mb-6 rounded">
                <p className="text-sm font-medium">Error details:</p>
                <p className="text-sm">{error.message}</p>
                {error.digest && (
                  <p className="text-xs mt-1 text-gray-500">Reference: {error.digest}</p>
                )}
              </div>
            )}
            
            <div className="grid grid-cols-1 gap-3 sm:grid-cols-2">
              <button
                onClick={() => reset()}
                className="flex items-center justify-center px-4 py-3 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition-colors focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-opacity-50"
              >
                <FaArrowLeft className="mr-2" /> Try again
              </button>
              
              <Link href="/"
                className="flex items-center justify-center px-4 py-3 border border-blue-600 text-blue-600 rounded-lg hover:bg-blue-50 transition-colors focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-opacity-50"
              >
                <FaHome className="mr-2" /> Return to Home
              </Link>
              
              <button
                onClick={() => router.back()}
                className="col-span-1 sm:col-span-2 flex items-center justify-center px-4 py-3 bg-gray-100 text-gray-800 rounded-lg hover:bg-gray-200 transition-colors focus:outline-none focus:ring-2 focus:ring-gray-500 focus:ring-opacity-50"
              >
                Go back
              </button>
            </div>
          </div>
          
          <div className="bg-gray-50 p-4 text-center border-t border-gray-100">
            <p className="text-sm text-gray-600">
              Need assistance? <Link href="/contact" className="text-blue-600 hover:underline font-medium">Contact our support team</Link>
            </p>
          </div>
        </div>
      </div>
    </div>
  );
}