"use client"

import { useState, useEffect } from "react"
import FeedbackModal, { type FeedbackData } from "./feedback-modal"
import SuccessModal from "./success-modal"

// Define the component first
function FeedbackButton() {
  const [isModalOpen, setIsModalOpen] = useState(false)
  const [isSuccessModalOpen, setIsSuccessModalOpen] = useState(false)
  const [hasFeedbackBeenSubmitted, setHasFeedbackBeenSubmitted] = useState(false)

  // Check if feedback has been submitted before and if 30 days have passed
  useEffect(() => {
    const feedbackSubmittedAt = localStorage.getItem("feedbackSubmittedAt")
    
    if (feedbackSubmittedAt) {
      const submissionDate = new Date(parseInt(feedbackSubmittedAt))
      const currentDate = new Date()
      const daysSinceSubmission = (currentDate.getTime() - submissionDate.getTime()) / (1000 * 60 * 60 * 24)
      
      setHasFeedbackBeenSubmitted(daysSinceSubmission < 30)
    }
  }, [])

  const handleFeedbackSubmit = (data: FeedbackData) => {
    console.log("Feedback submitted:", data)

    // Close feedback modal first
    setIsModalOpen(false)

    // Show success modal immediately
    setIsSuccessModalOpen(true)

    // Save submission timestamp to localStorage
    localStorage.setItem("feedbackSubmittedAt", Date.now().toString())
    setHasFeedbackBeenSubmitted(true)
  }

  const handleSuccessModalClose = () => {
    setIsSuccessModalOpen(false)
  }

  // If feedback has been submitted, don't render the button
  if (hasFeedbackBeenSubmitted && !isSuccessModalOpen) {
    return null
  }

  return (
    <>
      {!hasFeedbackBeenSubmitted && (
        <button
          onClick={() => setIsModalOpen(true)}
          className="fixed bottom-6 right-6 md:bottom-8 md:right-8 z-40 bg-white rounded-full w-10 h-10 flex items-center justify-center shadow-md hover:shadow-lg transition-all duration-200 border border-gray-200"
          aria-label="Provide feedback"
        >
          <div className="w-5 h-5 relative flex items-center justify-center">
            <svg
              width="24"
              height="24"
              viewBox="0 0 24 24"
              fill="none"
              xmlns="http://www.w3.org/2000/svg"
              role="img"
              aria-hidden="true"
              preserveAspectRatio="xMidYMid meet"
            >
              <path
                d="M14.06 9.02L14.98 9.94L5.92 19H5V18.08L14.06 9.02ZM17.66 3C17.41 3 17.15 3.1 16.96 3.29L15.13 5.12L18.88 8.87L20.71 7.04C21.1 6.65 21.1 6.02 20.71 5.63L18.37 3.29C18.17 3.09 17.92 3 17.66 3ZM14.06 6.19L3 17.25V21H6.75L17.81 9.94L14.06 6.19Z"
                fill="currentColor"
              />
            </svg>
          </div>
        </button>
      )}

      <FeedbackModal isOpen={isModalOpen} onClose={() => setIsModalOpen(false)} onSubmit={handleFeedbackSubmit} />

      <SuccessModal isOpen={isSuccessModalOpen} onClose={handleSuccessModalClose} />
    </>
  )
}

// Export separately with explicit export
export default FeedbackButton
