'use client';

import React, { useState } from 'react';
import Link from 'next/link';
import NavBar from '../components/landingPage/navBar';
import Footer from '../components/landingPage/footer';

type Question = {
  id: number;
  question: string;
  options: string[];
  correctAnswer: number;
  explanation: string;
};

const quizQuestions: Question[] = [
  {
    id: 1,
    question: 'What is the first thing you should do when you encounter an emergency situation?',
    options: [
      'Start CPR immediately',
      'Check for danger to yourself and others',
      'Call emergency services',
      'Move the injured person'
    ],
    correctAnswer: 1,
    explanation: 'Your safety comes first. Always check for danger to yourself and others before approaching an emergency situation.'
  },
  {
    id: 2,
    question: 'How many chest compressions and rescue breaths make up one cycle of adult CPR?',
    options: [
      '15 compressions, 2 breaths',
      '30 compressions, 2 breaths',
      '5 compressions, 1 breath',
      '30 compressions, 1 breath'
    ],
    correctAnswer: 1,
    explanation: 'The correct ratio for adult CPR is 30 chest compressions followed by 2 rescue breaths.'
  },
  {
    id: 3,
    question: 'What is the correct first aid treatment for a minor burn?',
    options: [
      'Apply butter or oil',
      'Pop any blisters',
      'Run under cool water for 10-15 minutes',
      'Apply ice directly to the burn'
    ],
    correctAnswer: 2,
    explanation: 'For minor burns, cool the burn under cool (not cold) running water for 10-15 minutes. Do not use ice, butter, or pop blisters.'
  },
  {
    id: 4,
    question: 'What should you do if someone is choking but can still speak or cough?',
    options: [
      'Perform abdominal thrusts immediately',
      'Slap them on the back',
      'Encourage them to keep coughing',
      'Give them water to drink'
    ],
    correctAnswer: 2,
    explanation: 'If someone can speak, cough, or breathe, encourage them to keep coughing. Only intervene if they stop making noise or have difficulty breathing.'
  },
  {
    id: 5,
    question: 'What is the correct way to treat a nosebleed?',
    options: [
      'Lean forward and pinch the soft part of the nose',
      'Lean back and pinch the bridge of the nose',
      'Lie down and apply ice to the forehead',
      'Tilt the head back and apply pressure'
    ],
    correctAnswer: 0,
    explanation: 'For a nosebleed, have the person lean slightly forward and pinch the soft part of the nose for 10-15 minutes. Do not tilt the head back as this can cause blood to go down the throat.'
  }
];

export default function QuizPage() {
  const [currentQuestion, setCurrentQuestion] = useState(0);
  const [selectedAnswer, setSelectedAnswer] = useState<number | null>(null);
  const [score, setScore] = useState(0);
  const [showResult, setShowResult] = useState(false);
  const [quizCompleted, setQuizCompleted] = useState(false);

  const handleAnswerSelect = (answerIndex: number) => {
    if (selectedAnswer !== null) return; // Prevent changing answer after submission
    
    setSelectedAnswer(answerIndex);
    
    if (answerIndex === quizQuestions[currentQuestion].correctAnswer) {
      setScore(prevScore => prevScore + 1);
    }
    
    // Show explanation for a moment before moving to next question
    setTimeout(() => {
      if (currentQuestion < quizQuestions.length - 1) {
        setCurrentQuestion(prev => prev + 1);
        setSelectedAnswer(null);
      } else {
        setQuizCompleted(true);
      }
    }, 2000);
  };

  const resetQuiz = () => {
    setCurrentQuestion(0);
    setSelectedAnswer(null);
    setScore(0);
    setShowResult(false);
    setQuizCompleted(false);
  };

  if (quizCompleted) {
    return (
      <div className="min-h-screen flex flex-col">
        <NavBar />
        <main className="flex-grow py-12 px-4 sm:px-6 lg:px-8">
          <div className="max-w-3xl mx-auto bg-white rounded-2xl border border-black shadow-sm p-8 text-center">
            <h1 className="text-3xl font-bold text-gray-900 mb-6">Quiz Complete!</h1>
            <div className="text-6xl mb-6">🎉</div>
            <p className="text-xl text-gray-700 mb-2">Your score:</p>
            <p className="text-5xl font-bold text-[#FF7A7A] mb-8">{score} / {quizQuestions.length}</p>
            <p className="text-gray-600 mb-8">
              {score === quizQuestions.length 
                ? 'Perfect! You\'re a first aid expert!'
                : score >= quizQuestions.length / 2 
                  ? 'Good job! You know quite a bit about first aid.'
                  : 'Keep learning! Review the materials and try again.'}
            </p>
            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <button
                onClick={resetQuiz}
                className="bg-[#FF7A7A] hover:bg-[#ff5e5e] text-white px-6 py-3 rounded-full text-center text-sm font-bold transition-all shadow-sm hover:shadow"
              >
                Retake Quiz
              </button>
              <Link 
                href="/learn"
                className="bg-white hover:bg-gray-50 border border-gray-200 text-gray-700 px-6 py-3 rounded-full text-center text-sm font-bold transition-all shadow-sm hover:shadow"
              >
                Back to Learning Center
              </Link>
            </div>
          </div>
        </main>
        <Footer />
      </div>
    );
  }

  const currentQ = quizQuestions[currentQuestion];

  return (
    <div className="min-h-screen flex flex-col">
      <NavBar />
      <main className="flex-grow py-12 px-4 sm:px-6 lg:px-8">
        <div className="max-w-3xl mx-auto">
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
            <div className="flex justify-between items-center mb-6">
              <h1 className="text-2xl font-bold text-gray-900">First Aid Quiz</h1>
              <span className="text-sm text-gray-500">
                Question {currentQuestion + 1} of {quizQuestions.length}
              </span>
            </div>
            <div className="w-full bg-gray-200 rounded-full h-2.5">
              <div 
                className="bg-[#FF7A7A] h-2.5 rounded-full transition-all duration-500" 
                style={{ width: `${((currentQuestion) / quizQuestions.length) * 100}%` }}
              ></div>
            </div>
          </div>

          <div className="bg-white border border-gray-200 rounded-xl p-6 shadow-sm mb-8">
            <h2 className="text-xl font-semibold text-gray-900 mb-6">{currentQ.question}</h2>
            
            <div className="space-y-3">
              {currentQ.options.map((option, index) => {
                const isSelected = selectedAnswer === index;
                const isCorrect = index === currentQ.correctAnswer;
                let buttonClass = 'w-full text-left p-4 rounded-lg border border-gray-200 hover:border-[#FF7A7A] transition-colors';
                
                if (selectedAnswer !== null) {
                  if (isSelected && isCorrect) {
                    buttonClass += ' bg-green-50 border-green-200';
                  } else if (isSelected) {
                    buttonClass += ' bg-red-50 border-red-200';
                  } else if (isCorrect) {
                    buttonClass += ' bg-green-50 border-green-200';
                  }
                } else {
                  buttonClass += ' hover:bg-gray-50';
                }
                
                return (
                  <button
                    key={index}
                    className={buttonClass}
                    onClick={() => handleAnswerSelect(index)}
                    disabled={selectedAnswer !== null}
                  >
                    <div className="flex items-center">
                      <div className={`w-5 h-5 rounded-full border-2 mr-3 flex-shrink-0 flex items-center justify-center ${
                        selectedAnswer !== null 
                          ? isCorrect 
                            ? 'border-green-500 bg-green-500 text-white' 
                            : isSelected 
                              ? 'border-red-500 bg-red-500 text-white' 
                              : 'border-gray-300'
                          : 'border-gray-300'
                      }`}>
                        {selectedAnswer !== null && isCorrect && '✓'}
                        {selectedAnswer === index && !isCorrect && '✗'}
                      </div>
                      <span>{option}</span>
                    </div>
                  </button>
                );
              })}
            </div>
            
            {selectedAnswer !== null && (
              <div className="mt-6 p-4 bg-blue-50 border border-blue-200 rounded-lg">
                <p className="text-sm text-blue-800">
                  <span className="font-semibold">Explanation:</span> {currentQ.explanation}
                </p>
              </div>
            )}
          </div>
          
          <div className="text-center text-sm text-gray-500">
            <p>Select an answer to continue. You&apos;ll see the correct answer after each question.</p>
          </div>
        </div>
      </main>
      <Footer />
    </div>
  );
}
