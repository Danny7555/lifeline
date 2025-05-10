import React from 'react'
import Image from "next/image"
import { Star } from "lucide-react"
import HalfStar from "../halfStar"

export default function Testimonials() {
  return (
    <div className="w-full bg-white py-12">
      <h1 className="text-5xl font-extrabold text-center mb-20">Testimonials</h1>
      
      <div className="flex flex-col md:flex-row justify-center gap-8 px-4 max-w-6xl mx-auto">
        {/* First Testimonial */}
        <div className="flex-1 border border-gray-600 rounded-3xl p-6 flex flex-col items-center relative">
          <div className="absolute -top-12">
            <div className="w-24 h-24 rounded-full overflow-hidden border-4 border-white shadow-sm bg-gray-100">
              <Image
                src="/images/akua.png"
                alt="Akua Donkor"
                width={96}
                height={96}
                className="object-cover"
              />
            </div>
          </div>
          
          <div className="pt-12 flex flex-col items-center">
            <h3 className="text-xl font-bold">Akua Donkor</h3>
            <p className="text-gray-600 mb-4">Physician</p>
            
            <p className="text-center text-sm mb-4">
              &ldquo;Lifeline is an invaluable tool for anyone wanting to be prepared for the unexpected.&ldquo; - Dr. John Smith, Emergency Physician
            </p>
            
            <div className="flex mt-auto">
              {[...Array(5)].map((_, i) => (
                <Star key={i} className="w-5 h-5 fill-yellow-400 text-yellow-400" />
              ))}
            </div>
          </div>
        </div>
        
        {/* Second Testimonial */}
        <div className="flex-1 border border-gray-600 rounded-3xl p-6 flex flex-col items-center relative">
          <div className="absolute -top-12">
            <div className="w-24 h-24 rounded-full overflow-hidden border-4 border-white shadow-sm bg-gray-100">
              <Image
                src="/images/ataa.png"
                alt="Ataa Ayi"
                width={96}
                height={96}
                className="object-cover"
              />
            </div>
          </div>
          
        <div className="pt-12 flex flex-col items-center">
        <h3 className="text-xl font-bold">Ataa Ayi</h3>
        <p className="text-gray-600 mb-4">Student</p>

        <p className="text-center text-sm mb-4">
            &ldquo; I woke up with a bad headache and wasn&lsquo;t sure if I should go to the doctor. Lifeline&lsquo;s symptom checker
            helped me figure out it was likely a migraine and gave me some home remedies to try. It saved me a trip to
            the clinic! &ldquo;
        </p>

        <div className="flex mt-auto text-yellow-400">
            {[...Array(4)].map((_, i) => (
            <Star key={i} className="w-5 h-5 fill-current" />
            ))}
            <HalfStar className="w-5 h-5" />
        </div>
        </div>
        </div>

        
        {/* Third Testimonial */}
        <div className="flex-1 border border-gray-600 rounded-3xl p-6 flex flex-col items-center relative">
          <div className="absolute -top-12">
            <div className="w-24 h-24 rounded-full overflow-hidden border-4 border-white shadow-sm bg-gray-100">
              <Image
                src="/images/diana.png"
                alt="Diana Asamoah"
                width={96}
                height={96}
                className="object-cover"
              />
            </div>
          </div>
          
          <div className="pt-12 flex flex-col items-center">
            <h3 className="text-xl font-bold">Diana Asamoah</h3>
            <p className="text-gray-600 mb-4">Hiker</p>
            
            <p className="text-center text-sm mb-4">
              &ldquo; I was hiking in a remote area when a friend twisted his ankle. I had no signal, but Lifeline&lsquo;s offline guide
              helped me stabilize him until we could get help. This app is a lifesaver! &ldquo;
            </p>
            
            <div className="flex mt-auto">
              {[...Array(5)].map((_, i) => (
                i < 4 ? (
                  <Star key={i} className="w-5 h-5 fill-yellow-400 text-yellow-400" />
                ) : (
                  <Star 
                    key={i}
                    className="w-5 h-5 text-yellow-400" 
                    fill="none" 
                    strokeWidth={1.5}
                    style={{
                      background: 'linear-gradient(90deg, #FBBF24 50%, transparent 50%)',
                      WebkitBackgroundClip: 'text',
                      WebkitTextFillColor: 'transparent',
                      backgroundClip: 'text'
                    }}
                  />
                )
              ))}
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}