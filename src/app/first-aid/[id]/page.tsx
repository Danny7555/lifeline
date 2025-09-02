'use client';

import React from 'react';
import { useRouter } from 'next/navigation';

// Type for first aid guide
type FirstAidGuide = {
  id: string;
  title: string;
  description: string;
  icon: string;
  steps: string[];
  do: string[];
  dont: string[];
  whenToSeekHelp: string[];
};

// First aid guide data
const firstAidGuides: Record<string, FirstAidGuide> = {
  'cpr': {
    id: 'cpr',
    title: 'CPR (Cardiopulmonary Resuscitation)',
    description: 'Life-saving technique used in emergencies when someone is not breathing or their heart has stopped.',
    icon: '🫀',
    steps: [
      'Check for responsiveness',
      'Call emergency services',
      'Place hands on chest center',
      'Perform 30 chest compressions',
      'Give 2 rescue breaths',
      'Continue until help arrives'
    ],
    do: [
      'Use an AED if available',
      'Continue until medical help arrives'
    ],
    dont: [
      'Don\'t stop unless person starts breathing',
      'Don\'t delay calling for help'
    ],
    whenToSeekHelp: [
      'Immediately call emergency services',
      'If you\'re alone, perform CPR for 2 minutes first'
    ]
  },
  'choking': {
    id: 'choking',
    title: 'Choking',
    description: 'First aid for someone who cannot breathe, cough, or speak.',
    icon: '🤢',
    steps: [
      'Ask "Are you choking?"',
      'Deliver 5 back blows',
      'Perform abdominal thrusts',
      'Continue until object is dislodged'
    ],
    do: [
      'Call emergency services if needed',
      'Be prepared to perform CPR'
    ],
    dont: [
      'Don\'t give anything to drink',
      'Don\'t slap if they can cough'
    ],
    whenToSeekHelp: [
      'If person is unconscious',
      'If object is not dislodged'
    ]
  }
};

export default function FirstAidGuidePage({ params }: { params: { id: string } }) {
  const guide = firstAidGuides[params.id as keyof typeof firstAidGuides];
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
            <h2 className="text-xl font-semibold text-gray-900 mb-4">
              Step-by-Step Instructions
            </h2>
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
              <h3 className="text-lg font-medium text-red-700 mb-3">Don't</h3>
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
            <h3 className="text-lg font-medium text-amber-800 mb-3">
              When to Seek Medical Help
            </h3>
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
    </div>
  );
}
