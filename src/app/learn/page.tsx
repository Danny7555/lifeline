'use client';

import React from 'react';
import Link from 'next/link';
import NavBar from '../components/landingPage/navBar';
import Footer from '../components/landingPage/footer';
import { FaFirstAid, FaHeartbeat, FaExclamationTriangle, FaShieldAlt, FaBaby, FaPlane } from 'react-icons/fa';
import { GiMedicines } from 'react-icons/gi';

const LearnPage = () => {

const categories = [
  {
    id: 'first-aid',
    title: 'First Aid Basics',
    description: 'Learn essential first aid skills for common emergencies',
    icon: <FaFirstAid className="w-8 h-8" />,
    color: 'bg-red-50 border-red-100 hover:border-red-300 text-red-600',
    gradient: 'from-red-50 to-red-50/50'
  },
  {
    id: 'cpr',
    title: 'CPR & AED',
    description: 'Master life-saving CPR techniques and AED usage',
    icon: <FaHeartbeat className="w-8 h-8" />,
    color: 'bg-blue-50 border-blue-100 hover:border-blue-300 text-blue-600',
    gradient: 'from-blue-50 to-blue-50/50'
  },
  {
    id: 'emergency',
    title: 'Emergency Response',
    description: 'How to respond to different emergency situations',
    icon: <FaExclamationTriangle className="w-8 h-8" />,
    color: 'bg-yellow-50 border-yellow-100 hover:border-yellow-300 text-yellow-600',
    gradient: 'from-yellow-50 to-yellow-50/50'
  },
  {
    id: 'safety',
    title: 'Safety & Prevention',
    description: 'Tips for preventing accidents and injuries',
    icon: <FaShieldAlt className="w-8 h-8" />,
    color: 'bg-green-50 border-green-100 hover:border-green-300 text-green-600',
    gradient: 'from-green-50 to-green-50/50'
  },
  {
    id: 'children',
    title: 'For Children',
    description: 'First aid specifically for infants and children',
    icon: <FaBaby className="w-8 h-8" />,
    color: 'bg-purple-50 border-purple-100 hover:border-purple-300 text-purple-600',
    gradient: 'from-purple-50 to-purple-50/50'
  },
  {
    id: 'travel',
    title: 'Travel First Aid',
    description: 'Essential first aid knowledge for travelers',
    icon: <FaPlane className="w-8 h-8" />,
    color: 'bg-indigo-50 border-indigo-100 hover:border-indigo-300 text-indigo-600',
    gradient: 'from-indigo-50 to-indigo-50/50'
  },
  {
    id: 'medication',
    title: 'Medication Safety',
    description: 'Proper use and storage of medications',
    icon: <GiMedicines className="w-8 h-8" />,
    color: 'bg-cyan-50 border-cyan-100 hover:border-cyan-300 text-cyan-600',
    gradient: 'from-cyan-50 to-cyan-50/50'
  }
  ];

  return (
    <div className="min-h-screen flex flex-col">
      <NavBar />
      <main className="flex-grow py-12 px-4 sm:px-6 lg:px-8">
        <div className="max-w-7xl mx-auto bg-white rounded-2xl border border-black shadow-sm p-6 sm:p-8">
          <div className="text-center mb-12">
            <h1 className="text-4xl font-bold text-gray-900 sm:text-5xl md:text-6xl font-sans tracking-tight">
              Learn First Aid
            </h1>
            <p className="mt-3 max-w-2xl mx-auto text-xl text-gray-600">
              Interactive learning modules to build your first aid knowledge
            </p>
          </div>

          <div className="grid grid-cols-1 gap-6 sm:grid-cols-2 lg:grid-cols-3">
            {categories.map((category) => (
              <Link 
                href={`/learn/${category.id}`} 
                key={category.id}
                className="group block transform transition-all duration-300 hover:-translate-y-1"
              >
                <div className={`relative h-full rounded-2xl border bg-gradient-to-br ${category.gradient} overflow-hidden transition-all duration-300 hover:shadow-lg`}>
                  <div className="absolute -right-6 -top-6 h-24 w-24 rounded-full bg-white/20 transition-all duration-300 group-hover:scale-150" />
                  <div className="relative z-10 h-full p-6">
                    <div className={`mb-6 inline-flex h-16 w-16 items-center justify-center rounded-2xl bg-white shadow-sm ${category.color.split(' ')[0]}`}>
                      <span className={`${category.color.split(' ')[3]}`}>
                        {category.icon}
                      </span>
                    </div>
                    <h2 className="mb-3 text-xl font-bold text-gray-900">{category.title}</h2>
                    <p className="mb-6 text-gray-600">{category.description}</p>
                    <div className="mt-auto">
                      <span className="inline-flex items-center font-medium text-[#FF7A7A] transition-all duration-200 group-hover:underline">
                        Start Learning
                        <svg 
                          className="ml-2 h-4 w-4 transition-transform duration-200 group-hover:translate-x-1" 
                          fill="none" 
                          stroke="currentColor" 
                          viewBox="0 0 24 24" 
                          xmlns="http://www.w3.org/2000/svg"
                        >
                          <path 
                            strokeLinecap="round" 
                            strokeLinejoin="round" 
                            strokeWidth={2} 
                            d="M14 5l7 7m0 0l-7 7m7-7H3" 
                          />
                        </svg>
                      </span>
                    </div>
                  </div>
                </div>
              </Link>
            ))}
          </div>

          <div className="mt-16 bg-gradient-to-r from-blue-50 to-cyan-50 border border-black rounded-2xl p-8">
            <div className="max-w-4xl mx-auto text-center">
              <h2 className="text-2xl font-bold text-gray-900">Test Your Knowledge</h2>
              <p className="mt-2 text-gray-600 max-w-2xl mx-auto">
                Take our interactive quiz to see how much you&apos;ve learned and identify areas for improvement.
              </p>
              <Link 
                href="/quiz"
                className="mt-6 inline-flex items-center justify-center px-6 py-3 border border-transparent text-base font-medium rounded-full text-white bg-[#FF7A7A] hover:bg-[#ff5e5e] shadow-sm transition-colors duration-200"
              >
                Start Quiz
              </Link>
            </div>
          </div>
        </div>
      </main>
      <Footer />
    </div>
  );
};

export default LearnPage;
