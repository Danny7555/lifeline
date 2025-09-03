'use client';

import React from 'react';
import Link from 'next/link';
import NavBar from '../components/landingPage/navBar';
import Footer from '../components/landingPage/footer';

const EmergencyContactsPage = () => {
  // List of emergency contacts by African country
  const emergencyContacts = [
    {
      country: 'Ghana',
      police: '191 or 18555',
      medical: '193 or 112',
      fire: '192 or 112',
      notes: '112 is the general emergency number'
    },
    {
      country: 'Nigeria',
      police: '112 or 199',
      medical: '112 or 199',
      fire: '112 or 199',
      notes: '112 is the toll-free emergency number'
    },
    {
      country: 'South Africa',
      police: '10111',
      medical: '10177',
      fire: '10177',
      notes: 'Cellphone emergency: 112'
    },
    {
      country: 'Kenya',
      police: '999 or 112',
      medical: '999 or 112',
      fire: '999 or 112',
      notes: '999 is the main emergency number'
    },
    {
      country: 'Ethiopia',
      police: '911',
      medical: '907',
      fire: '939',
      notes: 'Different numbers for each service'
    }
  ];

  // Important numbers for Ghana and Africa
  const importantNumbers = [
    {
      name: 'Ghana Ambulance Service',
      number: '193 or 112',
      description: '24/7 emergency medical service'
    },
    {
      name: 'Ghana Police Service',
      number: '18555 or 191',
      description: '24/7 police emergency line'
    },
    {
      name: 'Ghana National Fire Service',
      number: '192 or 112',
      description: '24/7 fire and rescue service'
    },
    {
      name: 'Ghana Health Service',
      number: '+233 302 682 915',
      description: 'Health information and support'
    },
    {
      name: 'Africa CDC Emergency Operations Center',
      number: '+251 11 552 5840',
      description: 'Public health emergencies'
    },
    {
      name: 'Ghana Red Cross Society',
      number: '+233 302 774 960',
      description: 'Emergency and disaster response'
    }
  ];

  return (
    <div className="min-h-screen flex flex-col">
      <NavBar />
      <main className="flex-grow py-12 px-4 sm:px-6 lg:px-8">
      <div className="max-w-7xl mx-auto bg-white rounded-2xl border border-black shadow-sm p-6 sm:p-8">
        <div className="text-center mb-12">
          <h1 className="text-4xl font-extrabold text-gray-900 sm:text-5xl md:text-6xl">
            Emergency Contacts
          </h1>
          <p className="mt-3 max-w-2xl mx-auto text-xl text-gray-500 sm:mt-4">
            Important emergency numbers and resources
          </p>
        </div>

        <div className="mb-12">
          <h2 className="text-2xl font-bold text-gray-900 mb-6">Emergency Numbers by Country</h2>
          <div className="overflow-x-auto">
            <table className="min-w-full divide-y divide-gray-200">
              <thead className="bg-gray-50">
                <tr>
                  <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                    Country
                  </th>
                  <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                    Police
                  </th>
                  <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                    Medical
                  </th>
                  <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                    Fire
                  </th>
                  <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                    Notes
                  </th>
                </tr>
              </thead>
              <tbody className="bg-white divide-y divide-gray-200">
                {emergencyContacts.map((contact, index) => (
                  <tr key={index} className={index % 2 === 0 ? 'bg-white' : 'bg-gray-50'}>
                    <td className="px-6 py-4 whitespace-nowrap text-sm font-medium text-gray-900">
                      {contact.country}
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
                      {contact.police}
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
                      {contact.medical}
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
                      {contact.fire}
                    </td>
                    <td className="px-6 py-4 text-sm text-gray-500">
                      {contact.notes}
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>

        <div>
          <h2 className="text-2xl font-bold text-gray-900 mb-6">Additional Important Numbers</h2>
          <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
            {importantNumbers.map((item, index) => (
              <div key={index} className="border border-gray-200 rounded-lg p-6 hover:shadow-md transition-shadow">
                <h3 className="text-lg font-semibold text-gray-900">{item.name}</h3>
                <p className="mt-2 text-2xl font-bold text-[#FF7A7A]">{item.number}</p>
                <p className="mt-1 text-sm text-gray-600">{item.description}</p>
              </div>
            ))}
          </div>
        </div>

        <div className="mt-12 bg-blue-50 p-4 rounded-lg">
          <div className="flex">
            <div className="flex-shrink-0">
              <svg className="h-5 w-5 text-blue-400" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 20 20" fill="currentColor">
                <path fillRule="evenodd" d="M18 10a8 8 0 11-16 0 8 8 0 0116 0zm-7-4a1 1 0 11-2 0 1 1 0 012 0zM9 9a1 1 0 000 2v3a1 1 0 001 1h1a1 1 0 100-2v-3a1 1 0 00-1-1H9z" clipRule="evenodd" />
              </svg>
            </div>
            <div className="ml-3">
              <h3 className="text-sm font-medium text-blue-800">Important Note</h3>
              <div className="mt-2 text-sm text-blue-700">
                <p>
                  In case of emergency, always call your local emergency number immediately. The information provided here is for reference only and may not be up to date for your specific location.
                </p>
              </div>
            </div>
          </div>
          </div>
        </div>
      </main>
      <Footer />
    </div>
  );
};

export default EmergencyContactsPage;
