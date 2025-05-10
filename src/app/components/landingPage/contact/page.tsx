import React from 'react';
import EmergencySection from './emergencySection';
import ContactForm from './contactForm';

export default function contactUS() {
  return (
    <div className="min-h-screen bg-white py-8 px-4">
      <div className="max-w-5xl mx-auto">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
          <EmergencySection />
          <ContactForm />
        </div>
      </div>
    </div>
  );
}

