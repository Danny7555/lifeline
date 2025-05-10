"use client";
import { useState, FC, FormEvent, ChangeEvent, useRef, useEffect } from 'react';
import Head from 'next/head';
import Image from 'next/image';

interface FAQ {
  id: number;
  question: string;
  answer: string;
}

const LifelineFAQ: FC = () => {
  const [question, setQuestion] = useState<string>('');
  const [expandedFaq, setExpandedFaq] = useState<number | null>(null);
  const [isModalOpen, setIsModalOpen] = useState<boolean>(false);
  const modalRef = useRef<HTMLDivElement>(null);

  const faqs: FAQ[] = [
    {
      id: 1,
      question: "Is Lifeline a substitute for professional medical help?",
      answer: "No, Lifeline is not a substitute for professional medical help. It provides basic guidance for common health concerns, but you should always consult healthcare professionals for medical emergencies or serious conditions."
    },
    {
      id: 2,
      question: "How does the Symptom Checker work",
      answer: "The Symptom Checker uses an algorithm to assess your symptoms based on your inputs. It asks a series of questions about your symptoms and provides general guidance based on your responses."
    },
    {
      id: 3,
      question: "Can the Symptom Checker diagnose my medical condition?",
      answer: "No, the Symptom Checker cannot diagnose medical conditions. It can only provide general guidance based on the symptoms you report. For accurate diagnosis, please consult a healthcare professional."
    },
    {
      id: 4,
      question: "Are the first-aid guides easy to follow?",
      answer: "Yes, our first-aid guides are designed to be clear and easy to follow, with step-by-step instructions and illustrations to help you during emergency situations."
    },
    {
      id: 5,
      question: "How do I update Lifeline?",
      answer: "Lifeline updates automatically when connected to the internet with our offline mode on the webApp which allows you to access the app without an internet connection."
    },
    {
      id: 6,
      question: "Do I need to create an account to use Lifeline?",
      answer: "No, you don't need to create an account to use the basic features of Lifeline. However, creating an account allows you to save your medical information, preferences, and access additional features."
    },
  ];

  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (modalRef.current && !modalRef.current.contains(event.target as Node)) {
        setIsModalOpen(false);
      }
    };

    if (isModalOpen) {
      document.addEventListener('mousedown', handleClickOutside);
    }
    return () => {
      document.removeEventListener('mousedown', handleClickOutside);
    };
  }, [isModalOpen]);

  const toggleFaq = (id: number): void => {
    setExpandedFaq(expandedFaq === id ? null : id);
  };

  const handleQuestionChange = (e: ChangeEvent<HTMLInputElement>): void => {
    setQuestion(e.target.value);
  };

  const handleSubmit = (e: FormEvent<HTMLFormElement>): void => {
    e.preventDefault();
    console.log('Question submitted:', question);
    // Show the modal
    setIsModalOpen(true);
    // Clear the input field
    setQuestion('');
    
    // Automatically close the modal after 3 seconds
    setTimeout(() => {
      setIsModalOpen(false);
    }, 3000);
  };

  return (
    <div className="min-h-screen bg-white border-t border-b border-2 border-gray-900">
      <Head>
        <title>Lifeline FAQ</title>
        <meta name="description" content="Frequently Asked Questions about Lifeline" />
      </Head>

      <main className="max-w-5xl mx-auto py-8 px-4">
        <h1 className="text-5xl font-extrabold text-center text-gray-800 mb-16">
          Frequently Asked Questions
        </h1>
        
        <div className="flex flex-col md:flex-row md:space-x-32">
          {/* FAQ Section */}
          <div className="md:w-3/5">
            <div className="space-y-0">
              {faqs.map((faq: FAQ) => (
                <div key={faq.id}
                  className="border-b border-dotted border-gray-300"
                  style={{ borderBottomWidth: '2px', borderStyle: 'dotted' }}
                >
                  <button
                    className="flex items-center justify-between w-full py-4 text-left"
                    onClick={() => toggleFaq(faq.id)}
                    aria-expanded={expandedFaq === faq.id}
                    aria-controls={`faq-answer-${faq.id}`}
                  >
                    <span className="font-medium text-gray-800">{faq.question}</span>
                    <svg
                      className={`w-5 h-5 text-gray-500 transition-transform ${
                        expandedFaq === faq.id ? 'transform rotate-180' : ''
                      }`}
                      fill="none"
                      stroke="currentColor"
                      viewBox="0 0 24 24"
                      xmlns="http://www.w3.org/2000/svg"
                    >
                      <path
                        strokeLinecap="round"
                        strokeLinejoin="round"
                        strokeWidth="2"
                        d="M19 9l-7 7-7-7"
                      ></path>
                    </svg>
                  </button>
                  
                  {expandedFaq === faq.id && (
                    <div 
                      id={`faq-answer-${faq.id}`}
                      className="pb-4 text-gray-600"
                    >
                      <p>{faq.answer}</p>
                    </div>
                  )}
                </div>
              ))}
            </div>
          </div>

          {/* Question Section */}
          <div className="md:w-2/5 mt-16 md:mt-0">
            {/* Ask Question Section */}
            <div className="bg-white p-6 rounded-lg border border-gray-600 relative">
              <div className="flex items-center justify-center mb-4">
                <div className="p-3 rounded-lg w-[107px] h-[80px]">
                  <Image 
                    src="/images/question.png"
                    alt="Question mark icon"
                    width={107}
                    height={80}
                    className="text-gray-800 w-full h-full object-contain"
                  />
                  <span className="sr-only">Question mark icon</span>
                </div>
              </div>
              <h2 className="text-xl font-bold text-center mb-2">
                Do you have more questions?
              </h2>
              <p className="text-center text-gray-600 mb-6">
                You can ask me anything you want<br/>
                to know about Lifeline
              </p>
              <form onSubmit={handleSubmit}>
                <div className="mb-4">
                  <label htmlFor="question" className="block text-sm font-medium text-gray-700 mb-1">
                    Let me know
                  </label>
                  <input
                    type="text"
                    id="question"
                    className="w-full p-2 border border-gray-800 rounded"
                    value={question}
                    onChange={handleQuestionChange}
                    aria-label="Enter your question"
                    required
                  />
                </div>
                <button
                  type="submit"
                  className="w-full py-2 px-4 bg-red-300 hover:bg-red-400 text-center rounded-full  border-t border-2 border-gray-900 font-bold transition-colors"
                >
                  Send
                </button>
              </form>

              {/* Success Modal */}
              {isModalOpen && (
                <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50">
                  <div 
                    ref={modalRef}
                    className="bg-white rounded-lg p-8 max-w-md w-full mx-4 shadow-xl transform transition-all animate-fadeIn"
                    style={{ animation: 'fadeIn 0.3s ease-out' }}
                  >
                    <div className="text-center">
                      <div className="mx-auto flex items-center justify-center h-16 w-16 rounded-full bg-green-100 mb-4">
                        <svg 
                          className="h-10 w-10 text-green-600" 
                          fill="none" 
                          stroke="currentColor" 
                          viewBox="0 0 24 24" 
                          xmlns="http://www.w3.org/2000/svg"
                        >
                          <path 
                            strokeLinecap="round" 
                            strokeLinejoin="round" 
                            strokeWidth="2" 
                            d="M5 13l4 4L19 7"
                          ></path>
                        </svg>
                      </div>
                      <h3 className="text-lg leading-6 font-medium text-gray-900 mb-2">Question Sent!</h3>
                      <p className="text-sm text-gray-600">
                        Thank you for your question. We&apos;ll get back to you soon.
                      </p>
                      <div className="mt-5">
                        <button
                          type="button"
                          className="inline-flex justify-center rounded-md border border-transparent shadow-sm px-4 py-2 bg-red-300 text-base font-medium text-white hover:bg-red-400 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-red-500"
                          onClick={() => setIsModalOpen(false)}
                        >
                          OK
                        </button>
                      </div>
                    </div>
                  </div>
                </div>
              )}
            </div>
          </div>
        </div>
      </main>

      {/* Add this keyframe animation to your global CSS or style tag */}
      <style jsx>{`
        @keyframes fadeIn {
          from { opacity: 0; transform: scale(0.95); }
          to { opacity: 1; transform: scale(1); }
        }
        .animate-fadeIn {
          animation: fadeIn 0.3s ease-out;
        }
      `}</style>
    </div>
  );
};

export default LifelineFAQ;