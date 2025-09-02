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
    <div className="relative bg-white">
      {/* Header Section */}
      <div className="bg-white shadow-sm">
        <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8 py-12 sm:py-16">
          <div className="text-center">
            <h1 className="text-3xl sm:text-4xl md:text-5xl font-bold text-gray-900 mb-4 leading-tight">
              Your Trusted Health & Safety
              <span className="block text-[#FF5E5E] mt-1">Companion</span>
            </h1>
            <p className="text-base sm:text-lg text-gray-600 max-w-2xl mx-auto mt-4 leading-relaxed">
              Quick, reliable access to essential health resources and emergency assistance when you need it most.
            </p>
          </div>
        </div>
      </div>
      
      {/* Main Content */}
      <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8 -mt-6 sm:-mt-8 pb-16">
        <div className="grid grid-cols-2 gap-3 sm:gap-4 md:gap-6 lg:grid-cols-4">
          {features.map((feature, index) => (
            <div
              key={index}
              onClick={feature.onClick}
              className="group relative bg-white p-3 sm:p-4 md:p-5 rounded-xl border border-gray-800 hover:shadow-md transition-all duration-200 cursor-pointer flex flex-col items-center text-center h-full"
            >
              <div className="w-12 h-12 xs:w-14 xs:h-14 sm:w-16 sm:h-16 md:w-20 md:h-20 flex items-center justify-center mb-2 sm:mb-3">
                <Image
                  src={feature.image}
                  alt={feature.alt}
                  width={140}
                  height={140}
                  className="object-contain w-full h-full"
                  priority={index < 4}
                />
              </div>
              <h3 className="text-xs xs:text-sm sm:text-base font-medium text-gray-900 group-hover:text-[#FF5E5E] transition-colors mb-1">
                {feature.title}
              </h3>
              <p className="text-[10px] xs:text-xs sm:text-sm text-gray-600 leading-tight sm:leading-normal">
                {feature.description}
              </p>
            </div>
          ))}
        </div>

        <div className="mt-12 sm:mt-16 bg-red-50 border border-red-200 rounded-2xl p-5 sm:p-6 md:p-8 text-center">
          <div className="flex flex-col sm:flex-row items-center justify-center gap-3 sm:gap-4 mb-4 sm:mb-5">
            <div className="bg-red-100 p-2 rounded-full">
              <svg className="h-5 w-5 sm:h-6 sm:w-6 text-red-600" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 9v2m0 4h.01m-6.938 4h13.856c1.54 0 2.502-1.667 1.732-3L13.732 4c-.77-1.333-2.694-1.333-3.464 0L3.34 16c-.77 1.333.192 3 1.732 3z" />
              </svg>
            </div>
            <h2 className="text-lg sm:text-xl md:text-2xl font-bold text-red-900">Emergency?</h2>
          </div>
          <p className="text-red-800 mb-5 sm:mb-6 text-sm sm:text-base max-w-2xl mx-auto">
            Call your local emergency number immediately for life-threatening situations.
          </p>
          <button 
            onClick={() => router.push('/emergency')}
            className="bg-red-600 hover:bg-red-700 text-white font-bold py-2.5 px-6 rounded-full text-sm sm:text-base transition-colors shadow-sm hover:shadow"
          >
            Emergency Help
          </button>
        </div>
      </div>
    </div>
  );
};

export default SymptomCheckerPage;
