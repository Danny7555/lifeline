import React from 'react';
import EmergencySection from './emergencySection';
import ContactForm from './contactForm';
import Navbar from '../components/landingPage/navBar';
import Footer from '../components/landingPage/footer';
import FirstAidCheck from './firstAidCheck';
export default function ContactPage() {
  return (
    <>
      <Navbar />
      <div className="min-h-screen bg-white py-8 px-4">
        <div className="max-w-5xl mx-auto">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
            <EmergencySection />
            <ContactForm />
          </div>
        </div>
      </div>
      <FirstAidCheck />
      <Footer />
    </>
  );
}