'use client';

import React from 'react';
import { useRouter } from 'next/navigation';
import Image from 'next/image';

const HealthTipsPage = () => {
  const router = useRouter();

  const tipsByCategory = [
    {
      id: 'general',
      title: 'General Health Tips',
      icon: '💊',
      tips: [
        'Drink at least 8 glasses of water daily to stay hydrated.',
        'Aim for 7-9 hours of quality sleep each night.',
        'Wash your hands frequently with soap for at least 20 seconds.',
        'Take regular breaks from screens to rest your eyes.',
        'Practice good posture to prevent back and neck pain.'
      ]
    },
    {
      id: 'nutrition',
      title: 'Nutrition & Diet',
      icon: '🥗',
      tips: [
        'Eat a rainbow of fruits and vegetables daily.',
        'Choose whole grains over refined carbohydrates.',
        'Limit processed foods and added sugars.',
        'Include lean protein in every meal.',
        'Stay hydrated with water instead of sugary drinks.'
      ]
    },
    {
      id: 'exercise',
      title: 'Fitness & Activity',
      icon: '🏃',
      tips: [
        'Aim for at least 150 minutes of moderate exercise weekly.',
        'Take the stairs instead of the elevator when possible.',
        'Stretch daily to improve flexibility.',
        'Stand up and move for a few minutes every hour.',
        'Find an activity you enjoy to stay motivated.'
      ]
    },
    {
      id: 'mental',
      title: 'Mental Wellbeing',
      icon: '🧠',
      tips: [
        'Practice mindfulness or meditation daily.',
        'Take regular breaks to reduce stress.',
        'Stay connected with friends and family.',
        'Set aside time for hobbies and relaxation.',
        'Don\'t hesitate to seek professional help when needed.'
      ]
    },
    {
      id: 'first-aid',
      title: 'First Aid Basics',
      icon: '🩹',
      tips: [
        'Learn basic CPR and first aid techniques.',
        'Keep a well-stocked first aid kit at home.',
        'Know the signs of common medical emergencies.',
        'Keep emergency numbers easily accessible.',
        'Learn how to recognize allergic reactions.'
      ]
    },
    {
      id: 'prevention',
      title: 'Preventive Care',
      icon: '🩺',
      tips: [
        'Schedule regular health check-ups.',
        'Keep vaccinations up to date.',
        'Use sunscreen daily to protect your skin.',
        'Practice safe food handling and preparation.',
        'Get recommended health screenings for your age group.'
      ]
    }
  ];

  return (
    <div className="min-h-screen bg-white">
      {/* Header Section */}
      <div className="bg-white">
        <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8 py-12 sm:py-16">
          <div className="text-center">
            <h1 className="text-3xl sm:text-4xl md:text-5xl font-bold text-gray-900 mb-4 leading-tight">
              Health & Wellness
              <span className="block text-[#FF5E5E] mt-1">Tips & Advice</span>
            </h1>
            <p className="text-base sm:text-lg text-gray-600 max-w-3xl mx-auto mt-4 leading-relaxed">
              Expert-recommended tips to help you maintain a healthy lifestyle and prevent illness.
            </p>
          </div>
        </div>
      </div>

      {/* Main Content */}
      <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8 pb-16">
        {/* Tips Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {tipsByCategory.map((category) => (
            <div 
              key={category.id}
              className="bg-white border border-gray-200 rounded-2xl p-6 hover:shadow-lg transition-all duration-300 transform hover:-translate-y-1"
            >
              <div className="flex items-center mb-4">
                <span className="text-3xl mr-3">{category.icon}</span>
                <h2 className="text-xl font-bold text-gray-900">{category.title}</h2>
              </div>
              <ul className="space-y-3">
                {category.tips.map((tip, index) => (
                  <li key={index} className="flex items-start">
                    <span className="text-[#FF7A7A] mr-2 mt-1">•</span>
                    <span className="text-gray-700">{tip}</span>
                  </li>
                ))}
              </ul>
            </div>
          ))}
        </div>

        {/* Call to Action */}
        <div className="mt-16 bg-blue-50 border border-blue-200 rounded-2xl p-8 text-center">
          <h3 className="text-2xl font-bold text-gray-900 mb-4">Need Personalized Health Advice?</h3>
          <p className="text-gray-700 mb-6 max-w-2xl mx-auto">
            Consult with a healthcare professional for personalized medical advice tailored to your specific needs.
          </p>
          <button
            onClick={() => router.push('/find-doctor')}
            className="bg-[#FF7A7A] hover:bg-[#ff5e5e] text-white px-6 py-3 rounded-full text-sm font-bold transition-colors inline-flex items-center shadow-sm hover:shadow"
          >
            Find a Healthcare Provider
            <svg className="w-4 h-4 ml-2" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M14 5l7 7m0 0l-7 7m7-7H3" />
            </svg>
          </button>
        </div>
      </div>
    </div>
  );
};

export default HealthTipsPage;
