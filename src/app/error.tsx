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
    <div className="min-h-screen flex items-center justify-center bg-gradient-to-b from-blue-50 to-white p-4">
      <div className="max-w-md w-full bg-white rounded-xl shadow-lg p-8 border-t-4 border-blue-600">
        <div className="flex items-center justify-center mb-6">
          <div className="bg-red-100 p-3 rounded-full">
            <FaExclamationTriangle className="text-red-600 text-2xl" />
          </div>
        </div>
        
        <h2 className="text-2xl font-bold text-center text-gray-800 mb-2">Oops! Something went wrong</h2>
        
        <p className="text-gray-600 text-center mb-6">
          We apologize for the inconvenience. The system encountered an unexpected issue.
        </p>
        
        <div className="bg-blue-50 border-l-4 border-blue-500 text-blue-700 p-4 mb-6 rounded">
          <p className="text-sm font-medium">Error details:</p>
          <p className="text-sm">{error.message || 'An unexpected error occurred'}</p>
          {error.digest && (
            <p className="text-xs mt-1 text-gray-500">Reference: {error.digest}</p>
          )}
        </div>
        
        <div className="flex flex-col space-y-3">
          <button
            onClick={() => reset()}
            className="w-full flex items-center justify-center px-4 py-3 bg-blue-600 text-white rounded-md hover:bg-blue-700 transition-colors focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-opacity-50"
          >
            <FaArrowLeft className="mr-2" /> Try again
          </button>
          
          <button
            onClick={() => router.back()}
            className="w-full flex items-center justify-center px-4 py-3 bg-gray-100 text-gray-800 rounded-md hover:bg-gray-200 transition-colors focus:outline-none focus:ring-2 focus:ring-gray-500 focus:ring-opacity-50"
          >
            Go back
          </button>
          
          <Link href="/"
            className="w-full flex items-center justify-center px-4 py-3 border border-blue-600 text-blue-600 rounded-md hover:bg-blue-50 transition-colors focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-opacity-50"
          >
            <FaHome className="mr-2" /> Return to Home
          </Link>
        </div>
        
        <p className="text-center text-sm text-gray-500 mt-6">
          If this problem persists, please 
          <Link href="/contact" className="text-blue-600 hover:underline"> contact us</Link>.
        </p>
      </div>
    </div>
  );
}