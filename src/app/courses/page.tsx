'use client';

import React from 'react';
import Link from 'next/link';
import NavBar from '../components/landingPage/navBar';
import Footer from '../components/landingPage/footer';

const CoursesPage = () => {
  return (
    <div className="min-h-screen flex flex-col">
      <NavBar />
      <main className="flex-grow py-12 px-4 sm:px-6 lg:px-8">
      <div className="max-w-5xl mx-auto bg-white rounded-2xl border border-black shadow-sm p-8 sm:p-10">
        <div className="text-center mb-14 space-y-4">
          <h1 className="text-4xl font-bold text-gray-900 sm:text-5xl md:text-6xl font-sans tracking-tight">
            First Aid & CPR Courses
          </h1>
          <p className="text-xl text-gray-600 max-w-2xl mx-auto leading-relaxed">
            Find certified training courses near you
          </p>
        </div>

        <div className="max-w-4xl mx-auto">
          <div className="bg-blue-50 p-5 rounded-xl mb-10 border border-blue-100">
            <div className="flex items-start">
              <div className="flex-shrink-0 mt-0.5">
                <svg className="h-6 w-6 text-blue-500" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 20 20" fill="currentColor">
                  <path fillRule="evenodd" d="M18 10a8 8 0 11-16 0 8 8 0 0116 0zm-7-4a1 1 0 11-2 0 1 1 0 012 0zM9 9a1 1 0 000 2v3a1 1 0 001 1h1a1 1 0 100-2v-3a1 1 0 00-1-1H9z" clipRule="evenodd" />
                </svg>
              </div>
              <div className="ml-4">
                <p className="text-base text-blue-800 leading-relaxed">
                  For local training in Ghana and across Africa, please contact your nearest Red Cross or St. John Ambulance branch. Many organizations offer both in-person and online training options.
                </p>
              </div>
            </div>
          </div>

          <div className="grid gap-8 md:grid-cols-2">
            <div className="border border-gray-200 rounded-xl p-7 hover:shadow-lg transition-all duration-200">
              <h2 className="text-2xl font-bold text-gray-900 mb-5 font-sans">Basic First Aid</h2>
              <p className="text-gray-600 mb-5 leading-relaxed">
                Learn essential first aid skills for common emergencies including cuts, burns, and fractures.
              </p>
              <div className="mt-5">
                <h3 className="font-semibold text-gray-900 text-lg mb-3">Course Covers:</h3>
                <ul className="list-disc pl-5 space-y-2 text-gray-700">
                  <li>Wound care and bandaging</li>
                  <li>Burns and scalds</li>
                  <li>Fractures and sprains</li>
                  <li>Choking and breathing emergencies</li>
                </ul>
              </div>
            </div>

            <div className="border border-gray-200 rounded-xl p-7 hover:shadow-lg transition-all duration-200">
              <h2 className="text-2xl font-bold text-gray-900 mb-5 font-sans">CPR & AED</h2>
              <p className="text-gray-600 mb-5 leading-relaxed">
                Learn life-saving CPR techniques and how to use an Automated External Defibrillator (AED).
              </p>
              <div className="mt-5">
                <h3 className="font-semibold text-gray-900 text-lg mb-3">Course Covers:</h3>
                <ul className="list-disc pl-5 space-y-2 text-gray-700">
                  <li>Adult, child, and infant CPR</li>
                  <li>Relief of choking</li>
                  <li>AED operation</li>
                  <li>Rescue breathing</li>
                </ul>
              </div>
            </div>
          </div>

          <div className="mt-16 pt-10 border-t border-gray-100">
            <h2 className="text-3xl font-bold text-gray-900 mb-8 text-center font-sans">Local Training Providers</h2>
            <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
              <a href="https://www.ghanaredcross.org/" target="_blank" rel="noopener noreferrer" className="group block p-6 border-2 border-gray-100 rounded-xl hover:border-[#FF7A7A] hover:shadow-lg transition-all duration-200">
                <h3 className="text-lg font-semibold text-gray-900 group-hover:text-[#FF7A7A] transition-colors">Ghana Red Cross Society</h3>
                <p className="mt-2 text-gray-600">First aid and emergency response training</p>
                <p className="mt-1 text-sm text-gray-500">Accra, Ghana</p>
              </a>
              <a href="https://www.ifrc.org/africa" target="_blank" rel="noopener noreferrer" className="group block p-6 border-2 border-gray-100 rounded-xl hover:border-[#FF7A7A] hover:shadow-lg transition-all duration-200">
                <h3 className="text-lg font-semibold text-gray-900 group-hover:text-[#FF7A7A] transition-colors">IFRC Africa</h3>
                <p className="mt-2 text-gray-600">First aid training across Africa</p>
                <p className="mt-1 text-sm text-gray-500">Nairobi, Kenya</p>
              </a>
              <a href="https://www.southafricaredcross.org.za/" target="_blank" rel="noopener noreferrer" className="group block p-6 border-2 border-gray-100 rounded-xl hover:border-[#FF7A7A] hover:shadow-lg transition-all duration-200">
                <h3 className="text-lg font-semibold text-gray-900 group-hover:text-[#FF7A7A] transition-colors">South African Red Cross</h3>
                <p className="mt-2 text-gray-600">CPR and first aid courses</p>
                <p className="mt-1 text-sm text-gray-500">Johannesburg, South Africa</p>
              </a>
              <a href="https://www.stjohnghana.org/" target="_blank" rel="noopener noreferrer" className="group block p-6 border-2 border-gray-100 rounded-xl hover:border-[#FF7A7A] hover:shadow-lg transition-all duration-200">
                <h3 className="text-lg font-semibold text-gray-900 group-hover:text-[#FF7A7A] transition-colors">St. John Ghana</h3>
                <p className="mt-2 text-gray-600">First aid and ambulance services</p>
                <p className="mt-1 text-sm text-gray-500">Accra, Ghana</p>
              </a>
              <a href="https://www.kenyaredcross.org/" target="_blank" rel="noopener noreferrer" className="group block p-6 border-2 border-gray-100 rounded-xl hover:border-[#FF7A7A] hover:shadow-lg transition-all duration-200">
                <h3 className="text-lg font-semibold text-gray-900 group-hover:text-[#FF7A7A] transition-colors">Kenya Red Cross</h3>
                <p className="mt-2 text-gray-600">First aid and emergency response</p>
                <p className="mt-1 text-sm text-gray-500">Nairobi, Kenya</p>
              </a>
              <a href="https://www.redcrossnigeria.org/" target="_blank" rel="noopener noreferrer" className="group block p-6 border-2 border-gray-100 rounded-xl hover:border-[#FF7A7A] hover:shadow-lg transition-all duration-200">
                <h3 className="text-lg font-semibold text-gray-900 group-hover:text-[#FF7A7A] transition-colors">Nigerian Red Cross</h3>
                <p className="mt-2 text-gray-600">First aid training and certification</p>
                <p className="mt-1 text-sm text-gray-500">Abuja, Nigeria</p>
              </a>
            </div>
          </div>
        </div>
        </div>
      </main>
      <Footer />
    </div>
  );
};

export default CoursesPage;
