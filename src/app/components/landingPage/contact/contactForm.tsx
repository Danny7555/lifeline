"use client";
import React, { useState } from 'react';
import Map from './map';
import Image from 'next/image';

const ContactForm: React.FC = () => {
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    message: '',
  });
  const [showModal, setShowModal] = useState(false);

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    const { name, value } = e.target;
    setFormData(prev => ({
      ...prev,
      [name]: value
    }));
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    console.log('Form submitted:', formData);
    setShowModal(true);
  };

  const closeModal = () => {
    setShowModal(false);
    setFormData({ name: '', email: '', message: '' });
  };

  return (
    <div className="bg-white rounded-2xl shadow-sm border border-gray-800 overflow-hidden">
      <div className="p-8">
        <h2 className="text-3xl font-extrabold mb-4">Contact Us</h2>
        
        <div className="grid grid-cols-1 gap-8">
          {/* Form Section */}
          <div>
            <p className="mb-4 text-gray-600">
              Feel free to contact us anytime. We will get back to you as soon as we can!
            </p>
            
            <form onSubmit={handleSubmit} className="space-y-5">
              <div>
                <input
                  type="text"
                  name="name"
                  value={formData.name}
                  onChange={handleChange}
                  placeholder="Your Name"
                  className="w-full pb-2 border-b-2 border-gray-600 focus:outline-none focus:border-red-600 bg-transparent"
                  required
                />
              </div>
              <div>
                <input
                  type="email"
                  name="email"
                  value={formData.email}
                  onChange={handleChange}
                  placeholder="Your Email"
                  className="w-full pb-2 border-b-2 border-gray-600 focus:outline-none focus:border-red-600 bg-transparent"
                  required
                />
              </div>
              <div>
                <textarea
                  name="message"
                  value={formData.message}
                  onChange={handleChange}
                  placeholder="Your Message"
                  rows={4}
                  className="w-full pb-2 border-b-2 border-gray-600 focus:outline-none focus:border-red-600 bg-transparent resize-none"
                  required
                />
              </div>
              
              <button 
                type="submit" 
                className="w-full py-3 bg-red-100 text-gray-900 font-semibold rounded-xl border-t border-2 border-gray-900 hover:bg-red-200 transition-colors mt-3"
              >
                SEND
              </button>
            </form>
          </div>

          {/* Modal */}
          {showModal && (
            <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50">
              <div className="bg-white rounded-2xl p-8 max-w-md w-full mx-4 shadow-xl">
                <div className="flex justify-center mb-4">
                  <div className="bg-green-100 rounded-full p-3">
                    <svg xmlns="http://www.w3.org/2000/svg" className="h-10 w-10 text-green-600" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
                    </svg>
                  </div>
                </div>
                <h3 className="text-2xl font-bold text-center mb-2">Thank You!</h3>
                <p className="text-gray-600 text-center mb-6">
                  Your message has been received. We&apos;ll get back to you as soon as possible.
                </p>
                <button
                  onClick={closeModal}
                  className="w-full py-3 bg-red-100 text-gray-900 font-semibold rounded-xl hover:bg-red-200 transition-colors"
                >
                  Close
                </button>
              </div>
            </div>
          )}
          
          {/* Info Section */}
          <div
            className="p-4 rounded-xl border border-gray-200 bg-cover bg-center relative overflow-hidden"
            style={{ backgroundImage: "url('/images/info.jpg')" }} 
          >
            {/* Overlay for better readability */}
            <div className="absolute inset-0 bg-white bg-opacity-80 rounded-xl"></div>

            {/* Content */}
            <div className="relative z-10">
                <h3 className="text-xl font-bold mb-4">Info</h3>
                
                <ul className="space-y-3">
                <li className="flex items-center gap-3">
                    <Image
                    src="/images/mail.png"
                    alt="Email"
                    width={20}
                    height={20}
                    />
                    <span className="text-gray-900">danielleoasiedu755@gmail.com</span>
                </li>
                <li className="flex items-center gap-3">
                    <Image
                    src="/images/phone.png"
                    alt="Phone"
                    width={20}
                    height={20}
                    />
                    <span className="text-gray-900">0203430787</span>
                </li>
                <li className="flex items-center gap-3">
                    <Image
                    src="/images/building.png"
                    alt="Location"
                    width={20}
                    height={20}
                    />
                    <span className="text-gray-900">University of Ghana, Legon</span>
                </li>
                <li className="flex items-center gap-3">
                    <Image
                    src="/images/time.png"
                    alt="Clock"
                    width={20}
                    height={20}
                    />
                    <span className="text-gray-900">06:00AM - 05:00PM</span>
                </li>
                </ul>
            </div>
          </div>
        </div>
      </div>
      
      <Map />
    </div>
  );
};

export default ContactForm;