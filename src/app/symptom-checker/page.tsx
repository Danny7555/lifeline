'use client';

import React from 'react';
import { useRouter } from 'next/navigation';
import Image from 'next/image';

const SymptomCheckerPage = () => {
  const router = useRouter();

  const features = [
    {
      title: 'Symptom Checker',
      description: 'Identify potential medical conditions based on your symptoms.',
      buttonText: 'Check Symptoms',
      image: '/images/back.png',
      alt: 'Person holding their neck in pain',
      onClick: () => router.push('/symptom-checker/assessment')
    },
    {
      title: 'First Aid Guides',
      description: 'Step-by-step instructions for various medical emergencies.',
      buttonText: 'View Guides',
      image: '/images/care.png',
      alt: 'First aid kit',
      onClick: () => router.push('/first-aid')
    },
    {
      title: 'Emergency Contacts',
      description: 'Quick access to emergency services and important contacts.',
      buttonText: 'View Contacts',
      image: '/images/ambulance.png',
      alt: 'Ambulance',
      onClick: () => router.push('/emergency-contacts')
    }
  ];

  return (
    <div className="min-h-screen bg-white">
      {/* Header Section */}
      <div className="bg-white shadow-sm">
        <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8 py-12 sm:py-16">
          <div className="text-center">
            <h1 className="text-3xl sm:text-4xl md:text-5xl font-bold text-gray-900 mb-4 leading-tight">
              Symptom Checker & Health
              <span className="block text-[#FF5E5E] mt-1">Assessment Tool</span>
            </h1>
            <p className="text-base sm:text-lg text-gray-600 max-w-3xl mx-auto mt-4 leading-relaxed">
              Access essential health tools and resources when you need them most.
            </p>
          </div>
        </div>
      </div>

      {/* Main Content */}
      <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8 pb-16">
        {/* Features Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {features.map((feature, index) => (
            <div 
              key={index} 
              className="border border-gray-800 rounded-[2rem] p-6 sm:p-8 relative overflow-hidden bg-white hover:shadow-lg transition-all duration-300 h-full flex flex-col group"
            >
              <div className="flex-1">
                <h2 className="text-xl sm:text-2xl font-bold text-gray-900 mb-3 group-hover:text-[#FF5E5E] transition-colors">
                  {feature.title}
                </h2>
                <p className="text-gray-700 mb-6 text-sm sm:text-base">
                  {feature.description}
                </p>
              </div>
              <button
                onClick={feature.onClick}
                className="mt-auto bg-[#FF7A7A] hover:bg-[#ff5e5e] text-white px-6 py-2.5 rounded-full text-sm font-bold transition-colors w-full sm:w-auto shadow-sm hover:shadow"
              >
                {feature.buttonText}
              </button>
              <div className="absolute right-0 top-1/2 -translate-y-1/2 opacity-20 sm:opacity-100 group-hover:opacity-100 transition-opacity">
                <Image
                  src={feature.image}
                  alt={feature.alt}
                  width={120}
                  height={120}
                  className="object-contain w-20 h-20 sm:w-28 sm:h-28 md:w-32 md:h-32"
                  priority={index < 3}
                />
              </div>
            </div>
          ))}
        </div>

        {/* Emergency Banner */}
        <div className="mt-16 bg-red-50 border border-red-200 rounded-2xl p-6 sm:p-8">
          <div className="max-w-4xl mx-auto">
            <div className="flex flex-col sm:flex-row items-center justify-between gap-6">
              <div className="flex items-center">
                <div className="bg-red-100 p-2 rounded-full flex-shrink-0">
                  <svg className="h-6 w-6 text-red-600" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 9v2m0 4h.01m-6.938 4h13.856c1.54 0 2.502-1.667 1.732-3L13.732 4c-.77-1.333-2.694-1.333-3.464 0L3.34 16c-.77 1.333.192 3 1.732 3z" />
                  </svg>
                </div>
                <div className="ml-4">
                  <h3 className="text-lg sm:text-xl font-bold text-gray-900">Medical Emergency?</h3>
                  <p className="text-sm sm:text-base text-gray-700 mt-1">
                    Call your local emergency number immediately for life-threatening situations.
                  </p>
                </div>
              </div>
              <button 
                onClick={() => router.push('/emergency')}
                className="bg-red-600 hover:bg-red-700 text-white px-6 py-3 rounded-full text-sm sm:text-base font-bold transition-colors whitespace-nowrap shadow-sm hover:shadow w-full sm:w-auto"
              >
                Emergency Help
              </button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default SymptomCheckerPage;
