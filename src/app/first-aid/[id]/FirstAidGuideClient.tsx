'use client';

import React from 'react';
import { useRouter } from 'next/navigation';

// -----------------
// Types
// -----------------
export type FirstAidGuide = {
  id: string;
  title: string;
  description: string;
  icon: string;
  steps: string[];
  do: string[];
  dont: string[];
  whenToSeekHelp: string[];
};

interface Props {
  guide: FirstAidGuide | undefined;
}

export default function FirstAidGuideClient({ guide }: Props) {
  const router = useRouter();

  if (!guide) {
    return (
      <div className="min-h-screen bg-gray-50 flex items-center justify-center p-4">
        <div className="text-center">
          <h1 className="text-2xl font-bold text-gray-900 mb-4">Guide not found</h1>
          <button
            onClick={() => router.push('/first-aid')}
            className="mt-4 bg-[#FF7A7A] hover:bg-[#ff5e5e] text-white px-6 py-2 rounded-full text-sm font-bold transition-colors"
          >
            Back to First Aid Guides
          </button>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-white">
      {/* Navbar */}
      <nav className="bg-white border-b border-gray-200">
        <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8 py-3 flex items-center justify-between">
          <button
            onClick={() => router.push('/')}
            className="flex items-center gap-2 text-gray-900 font-semibold hover:opacity-80"
          >
            <span className="text-[#FF7A7A]">Lifeline</span>
          </button>
          <div className="flex items-center gap-4">
            <button
              onClick={() => router.push('/first-aid')}
              className="text-sm text-gray-700 hover:text-gray-900"
            >
              All Guides
            </button>
          </div>
        </div>
      </nav>
      {/* Header */}
      <div className="bg-white border-b border-gray-200">
        <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
          <div className="flex items-center">
            <button
              onClick={() => router.back()}
              className="mr-4 p-2 rounded-full hover:bg-gray-100"
            >
              <svg className="h-5 w-5 text-gray-500" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 19l-7-7 7-7" />
              </svg>
            </button>
            <div>
              <h1 className="text-2xl sm:text-3xl font-bold text-gray-900">{guide.title}</h1>
              <p className="text-gray-600 mt-1">{guide.description}</p>
            </div>
          </div>
        </div>
      </div>

      {/* Main Content */}
      <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        <div className="bg-white rounded-xl shadow-sm overflow-hidden">
          {/* Steps Section */}
          <div className="p-6 border-b border-gray-200">
            <h2 className="text-xl font-semibold text-gray-900 mb-4">Step-by-Step Instructions</h2>
            <ol className="space-y-3">
              {guide.steps.map((step, index) => (
                <li key={index} className="flex items-start">
                  <span className="flex-shrink-0 flex items-center justify-center bg-[#FF7A7A] text-white rounded-full w-6 h-6 text-sm font-medium mr-3">
                    {index + 1}
                  </span>
                  <span className="text-gray-700">{step}</span>
                </li>
              ))}
            </ol>
          </div>

          {/* Do's and Don'ts */}
          <div className="grid md:grid-cols-2 divide-x divide-gray-200">
            <div className="p-6">
              <h3 className="text-lg font-medium text-green-700 mb-3">Do</h3>
              <ul className="space-y-2">
                {guide.do.map((item, index) => (
                  <li key={index} className="flex">
                    <span className="text-green-500 mr-2">•</span>
                    <span className="text-gray-700">{item}</span>
                  </li>
                ))}
              </ul>
            </div>
            <div className="p-6">
              <h3 className="text-lg font-medium text-red-700 mb-3">Don&apos;t</h3>
              <ul className="space-y-2">
                {guide.dont.map((item, index) => (
                  <li key={index} className="flex">
                    <span className="text-red-500 mr-2">•</span>
                    <span className="text-gray-700">{item}</span>
                  </li>
                ))}
              </ul>
            </div>
          </div>

          {/* When to Seek Help */}
          <div className="bg-amber-50 p-6">
            <h3 className="text-lg font-medium text-amber-800 mb-3">When to Seek Medical Help</h3>
            <ul className="space-y-2">
              {guide.whenToSeekHelp.map((item, index) => (
                <li key={index} className="flex">
                  <span className="text-amber-700 mr-2">•</span>
                  <span className="text-amber-800">{item}</span>
                </li>
              ))}
            </ul>
          </div>
        </div>
      </div>
      {/* Footer */}
      <footer className="bg-gray-50 border-t border-gray-200">
        <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8 py-6 text-sm text-gray-600 flex items-center justify-between">
          <span>© {new Date().getFullYear()} Lifeline. All rights reserved.</span>
          <div className="flex items-center gap-4">
            <a href="/about" className="hover:text-gray-900">About</a>
            <a href="/contact" className="hover:text-gray-900">Contact</a>
          </div>
        </div>
      </footer>
    </div>
  );
}
