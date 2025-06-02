"use client"

import { useEffect, useState } from "react"
import { X } from "lucide-react"

interface SuccessModalProps {
  isOpen: boolean
  onClose: () => void
}

export default function SuccessModal({ isOpen, onClose }: SuccessModalProps) {
  const [animateIn, setAnimateIn] = useState(false)

  useEffect(() => {
    if (isOpen) {
      document.body.style.overflow = "hidden"
      setTimeout(() => setAnimateIn(true), 10)
    } else {
      document.body.style.overflow = "auto"
      setAnimateIn(false)
    }

    return () => {
      document.body.style.overflow = "auto"
    }
  }, [isOpen])

  if (!isOpen) return null

  const handleClose = () => {
    setAnimateIn(false)
    setTimeout(() => onClose(), 300)
  }

  return (
    <div
      className="fixed inset-0 bg-black/50 flex items-center justify-center z-50 p-4 transition-opacity duration-300"
      style={{ opacity: animateIn ? 1 : 0 }}
      onClick={(e) => {
        if (e.target === e.currentTarget) handleClose()
      }}
    >
      <div
        className="bg-white rounded-lg w-full max-w-md shadow-xl transition-transform duration-300"
        style={{ transform: animateIn ? "translateY(0)" : "translateY(20px)" }}
      >
        <div className="p-6 relative">
          <button
            onClick={handleClose}
            className="absolute right-4 top-4 text-gray-500 hover:text-gray-700"
            aria-label="Close success modal"
          >
            <X size={20} />
          </button>

          <div className="flex flex-col items-center text-center space-y-4">
            <div className="w-16 h-16 bg-green-100 rounded-full flex items-center justify-center">
              <svg
                xmlns="http://www.w3.org/2000/svg"
                className="h-8 w-8 text-green-500"
                fill="none"
                viewBox="0 0 24 24"
                stroke="currentColor"
              >
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
              </svg>
            </div>
            <h3 className="text-xl font-medium">Thank You!</h3>
            <p className="text-gray-600">
              Your feedback has been received. We appreciate your input and will use it to improve our service.
            </p>
            <button
              onClick={handleClose}
              className="mt-4 bg-gray-100 text-gray-800 px-6 py-2 rounded-md hover:bg-gray-200 transition-colors"
            >
              Close
            </button>
          </div>
        </div>
      </div>
    </div>
  )
}
