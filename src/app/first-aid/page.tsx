'use client';

import React from 'react';
import Link from 'next/link';

const FirstAidPage = () => {
  const guides = [
    {
      id: 'cpr',
      title: 'CPR (Cardiopulmonary Resuscitation)',
      description: 'Step-by-step guide to performing CPR on adults, children, and infants.',
      icon: '🫀',
    },
    {
      id: 'choking',
      title: 'Choking',
      description: 'How to help someone who is choking using back blows and abdominal thrusts.',
      icon: '🤢',
    },
    {
      id: 'bleeding',
      title: 'Severe Bleeding',
      description: 'How to control bleeding and apply pressure dressings.',
      icon: '🩸',
    },
    {
      id: 'fractures',
      title: 'Fractures & Sprains',
      description: 'How to immobilize injuries and when to seek medical attention.',
      icon: '🦴',
    },
    {
      id: 'allergic-reaction',
      title: 'Allergic Reactions',
      description: 'Recognizing and treating severe allergic reactions (anaphylaxis).',
      icon: '⚠️',
    },
    {
      id: 'heat-stroke',
      title: 'Heat Stroke',
      description: 'Emergency response for heat-related illnesses and heat stroke.',
      icon: '🌡️',
    },
  ];

  return (
    <div className="min-h-screen bg-gray-50 py-12 px-4 sm:px-6 lg:px-8">
      <div className="max-w-7xl mx-auto bg-white rounded-2xl border border-black shadow-sm p-6 sm:p-8">
        <div className="text-center mb-12">
          <h1 className="text-4xl font-extrabold text-gray-900 sm:text-5xl md:text-6xl">
            First Aid Guides
          </h1>
          <p className="mt-3 max-w-2xl mx-auto text-xl text-gray-500 sm:mt-4">
            Essential first aid information for common emergencies
          </p>
        </div>

        <div className="grid grid-cols-1 gap-6 sm:grid-cols-2 lg:grid-cols-3 mt-10">
          {guides.map((guide) => (
            <Link 
              href={`/first-aid/${guide.id}`} 
              key={guide.id}
              className="block"
            >
              <div className="bg-white border border-black rounded-2xl p-6 hover:shadow-md transition-all duration-300 flex flex-col h-full hover:border-[#FF7A7A]">
                <div className="text-4xl mb-4">{guide.icon}</div>
                <h2 className="text-xl font-bold text-gray-900 mb-2">{guide.title}</h2>
                <p className="text-gray-600 flex-grow">{guide.description}</p>
                <div className="mt-4">
                  <span className="inline-flex items-center text-[#FF7A7A] font-medium group">
                    View Guide
                    <svg className="w-4 h-4 ml-1 transition-transform group-hover:translate-x-1" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M14 5l7 7m0 0l-7 7m7-7H3" />
                    </svg>
                  </span>
                </div>
              </div>
            </Link>
          ))}
        </div>

        <div className="mt-16 bg-gradient-to-r from-red-50 to-pink-50 border border-black rounded-2xl p-8 shadow-sm">
          <div className="max-w-4xl mx-auto">
            <div className="flex flex-col md:flex-row items-center justify-between">
              <div className="text-center md:text-left mb-6 md:mb-0">
                <h2 className="text-2xl font-bold text-gray-900">Get Certified in First Aid</h2>
                <p className="mt-2 text-gray-600 max-w-md">
                  Learn life-saving skills from certified instructors in your area
                </p>
              </div>
              <div className="flex flex-col sm:flex-row gap-4 w-full sm:w-auto">
                <Link 
                  href="/courses"
                  className="bg-[#FF7A7A] hover:bg-[#ff5e5e] text-white px-6 py-3 rounded-full text-center text-sm font-bold transition-all shadow-sm hover:shadow"
                >
                  Find a Course
                </Link>
                <Link 
                  href="/emergency-contacts"
                  className="bg-white hover:bg-gray-50 border border-gray-200 text-gray-700 px-6 py-3 rounded-full text-center text-sm font-bold transition-all shadow-sm hover:shadow"
                >
                  Emergency Contacts
                </Link>
              </div>
            </div>
            <div className="mt-6 pt-6 border-t border-black">
              <div className="text-center">
                <h3 className="text-lg font-medium text-gray-900 mb-4">Looking for in-person training?</h3>
                <div className="flex flex-col sm:flex-row gap-4 justify-center">
                  <Link 
                    href="/courses"
                    className="bg-[#FF7A7A] hover:bg-[#ff5e5e] text-white px-6 py-3 rounded-full text-center text-sm font-bold transition-all shadow-sm hover:shadow"
                  >
                    Find a Course Near You
                  </Link>
                  <Link 
                    href="/learn"
                    className="bg-white hover:bg-gray-50 border border-gray-200 text-gray-700 px-6 py-3 rounded-full text-center text-sm font-bold transition-all shadow-sm hover:shadow"
                  >
                    Learn More
                  </Link>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default FirstAidPage;
