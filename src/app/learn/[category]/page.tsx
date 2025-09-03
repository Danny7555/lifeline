'use client';

import React from 'react';
import Link from 'next/link';
import NavBar from '../../components/landingPage/navBar';
import Footer from '../../components/landingPage/footer';
import { useParams, useRouter } from 'next/navigation';

const learningContent = {
  'first-aid': {
    title: 'First Aid Basics',
    icon: '🩹',
    sections: [
      {
        title: 'Introduction to First Aid',
        content: 'First aid is the immediate care given to someone who is injured or suddenly becomes ill. It can help reduce the severity of injuries and improve the chances of recovery.'
      },
      {
        title: 'The Primary Survey',
        content: 'Follow the DR ABC approach: Danger, Response, Airway, Breathing, Circulation. This helps you assess the situation and prioritize care.'
      },
      {
        title: 'Common First Aid Skills',
        content: 'Learn how to treat cuts, burns, sprains, and other common injuries. Always remember to protect yourself first.'
      }
    ]
  },
  'cpr': {
    title: 'CPR & AED',
    icon: '💓',
    sections: [
      {
        title: 'When to Perform CPR',
        content: 'CPR is needed when someone is unresponsive and not breathing normally. Always call for emergency help first.'
      },
      {
        title: 'CPR Steps',
        content: '30 chest compressions followed by 2 rescue breaths. Push hard and fast in the center of the chest.'
      },
      {
        title: 'Using an AED',
        content: 'Turn on the AED and follow the voice prompts. Attach the pads as shown and deliver a shock if advised.'
      }
    ]
  },
  'emergency': {
    title: 'Emergency Response',
    icon: '🚨',
    sections: [
      {
        title: 'Assessing the Situation',
        content: 'Check for danger to yourself and others. Ensure the scene is safe before approaching.'
      },
      {
        title: 'Calling for Help',
        content: 'Know your local emergency number. Be ready to provide clear information about the emergency.'
      },
      {
        title: 'Basic Life Support',
        content: 'Learn how to maintain an open airway, support breathing, and maintain circulation until help arrives.'
      }
    ]
  },
  'safety': {
    title: 'Safety & Prevention',
    icon: '🛡️',
    sections: [
      {
        title: 'Home Safety',
        content: 'Identify and eliminate potential hazards in your home to prevent accidents.'
      },
      {
        title: 'First Aid Kit',
        content: 'Keep a well-stocked first aid kit at home, in your car, and at work.'
      },
      {
        title: 'Prevention Tips',
        content: 'Learn basic safety measures to prevent common injuries and illnesses.'
      }
    ]
  },
  'children': {
    title: 'For Children',
    icon: '👶',
    sections: [
      {
        title: 'Child CPR',
        content: 'Modified techniques for performing CPR on infants and children.'
      },
      {
        title: 'Common Childhood Emergencies',
        content: 'How to handle choking, fever, and other common childhood emergencies.'
      },
      {
        title: 'Prevention',
        content: 'Childproofing your home and preventing common childhood injuries.'
      }
    ]
  },
  'travel': {
    title: 'Travel First Aid',
    icon: '✈️',
    sections: [
      {
        title: 'Travel Health Kit',
        content: 'Essential items to include in your travel first aid kit.'
      },
      {
        title: 'Common Travel Health Issues',
        content: 'How to prevent and treat common travel-related health problems.'
      },
      {
        title: 'Emergency Planning',
        content: 'What to do in case of a medical emergency while traveling.'
      }
    ]
  }
} as const;

type Category = keyof typeof learningContent;

export default function LearnCategoryPage() {
  const params = useParams();
  const router = useRouter();
  const category = params.category as Category;
  const content = learningContent[category];

  if (!content) {
    return (
      <div className="min-h-screen bg-gray-50 flex items-center justify-center p-4">
        <div className="text-center">
          <h1 className="text-2xl font-bold text-gray-900 mb-4">Category not found</h1>
          <button
            onClick={() => router.push('/learn')}
            className="mt-4 bg-[#FF7A7A] hover:bg-[#ff5e5e] text-white px-6 py-2 rounded-full text-sm font-bold transition-colors"
          >
            Back to Learning Center
          </button>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen flex flex-col">
      <NavBar />
      <main className="flex-grow py-12 px-4 sm:px-6 lg:px-8">
        <div className="max-w-4xl mx-auto">
          <div className="mb-8">
            <Link 
              href="/learn" 
              className="inline-flex items-center text-[#FF7A7A] hover:text-[#ff5e5e] mb-4 transition-colors"
            >
              <svg className="w-4 h-4 mr-1 rotate-180" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M14 5l7 7m0 0l-7 7m7-7H3" />
              </svg>
              Back to Learning Center
            </Link>
            <div className="flex items-center mb-6">
              <span className="text-4xl mr-4">{content.icon}</span>
              <h1 className="text-3xl font-bold text-gray-900">{content.title}</h1>
            </div>
          </div>

          <div className="space-y-8">
            {content.sections.map((section, index) => (
              <div key={index} className="bg-white border border-gray-200 rounded-xl p-6 shadow-sm">
                <h2 className="text-xl font-semibold text-gray-900 mb-3">{section.title}</h2>
                <p className="text-gray-600">{section.content}</p>
              </div>
            ))}
          </div>

          <div className="mt-12 bg-gradient-to-r from-blue-50 to-cyan-50 border border-gray-200 rounded-2xl p-8 text-center">
            <h2 className="text-2xl font-bold text-gray-900 mb-4">Ready to test your knowledge?</h2>
            <p className="text-gray-600 mb-6">Take our quiz to see how much you&apos;ve learned about {content.title.toLowerCase()}.</p>
            <Link 
              href="/quiz"
              className="inline-flex items-center justify-center px-6 py-3 border border-transparent text-base font-medium rounded-full text-white bg-[#FF7A7A] hover:bg-[#ff5e5e] shadow-sm transition-colors duration-200"
            >
              Take Quiz
            </Link>
          </div>
        </div>
      </main>
      <Footer />
    </div>
  );
}
