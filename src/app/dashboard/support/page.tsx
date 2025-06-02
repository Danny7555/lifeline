"use client";
import Image from "next/image"
import React, { useState, useEffect, useRef } from "react"

export default function SupportHelpPage() {
  const [isChatOpen, setIsChatOpen] = useState(false)
  const [isMinimized, setIsMinimized] = useState(false)
  const [isTyping, setIsTyping] = useState(false)
  const messagesEndRef = useRef<HTMLDivElement>(null)
  const [messages, setMessages] = useState([
    { text: "Hello! How can I help you today?", isUser: false, time: new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' }) }
  ])
  const [newMessage, setNewMessage] = useState("")

  // Auto-scroll to bottom of messages
  useEffect(() => {
    messagesEndRef.current?.scrollIntoView({ behavior: "smooth" })
  }, [messages])

  const handleSendMessage = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault()
    if (!newMessage.trim()) return

    // Add user message
    const userMessage = { 
      text: newMessage, 
      isUser: true,
      time: new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })
    }
    
    setMessages([...messages, userMessage])
    setNewMessage("")
    
    // Show typing indicator
    setIsTyping(true)
    
    // Simulate response (in a real app, this would connect to a backend)
    setTimeout(() => {
      setIsTyping(false)
      const responseMessage = { 
        text: "Thanks for your message. Our support team will get back to you shortly.", 
        isUser: false,
        time: new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })
      }
      setMessages(prev => [...prev, responseMessage])
    }, 2000)
  }

  const toggleChat = () => {
    if (isMinimized) {
      setIsMinimized(false)
    } else if (isChatOpen) {
      setIsMinimized(true)
    } else {
      setIsChatOpen(true)
    }
  }

  const closeChat = () => {
    setIsChatOpen(false)
    setIsMinimized(false)
  }

  return (
    <div className="flex-1 p-4 sm:p-6 lg:p-8 overflow-auto">
      <div className="max-w-4xl mx-auto">
        <div className="flex flex-col items-center text-center">
          {/* Illustration */}
          <div className="mb-8">
            <Image
              src="/images/nurse.png" 
              alt="Nurse on mobile phone" 
              width={250} 
              height={250}
              className="object-contain"
              priority
            />
          </div>

          {/* Main Heading */}
          <h1 className="text-2xl md:text-3xl font-bold text-gray-800 mb-4">
            Are you facing any problem or want to give a compliment?
          </h1>

          {/* Subtext */}
          <p className="text-gray-600 max-w-2xl mb-10 text-center">
            We&apos;re here to help! Whether you have a question about our services, need to
            schedule an appointment, or simply want to share your feedback, we&apos;re happy
            to hear from you.
          </p>

          {/* Action Buttons */}
          <div className="flex flex-col sm:flex-row gap-4 mb-12 w-full max-w-md mx-auto">
            <button className="flex-1 py-3 px-6 bg-[#FA9D9D] text-black rounded-full font-medium hover:bg-[#FFAEBB] transition-colors">
              Donate?
            </button>
            <button 
              className="flex-1 py-3 px-6 bg-[#FA9D9D] text-black rounded-full font-medium hover:bg-[#FFAEBB] transition-colors flex items-center justify-center gap-2"
              onClick={() => setIsChatOpen(true)}
            >
              <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" fill="currentColor" viewBox="0 0 16 16">
                <path d="M16 8c0 3.866-3.582 7-8 7a9 9 0 0 1-2.347-.306c-.584.296-1.925.864-4.181 1.234-.2.032-.352-.176-.273-.362.354-.836.674-1.95.77-2.966C.744 11.37 0 9.76 0 8c0-3.866 3.582-7 8-7s8 3.134 8 7zM5 8a1 1 0 1 0-2 0 1 1 0 0 0 2 0zm4 0a1 1 0 1 0-2 0 1 1 0 0 0 2 0zm3 1a1 1 0 1 0 0-2 1 1 0 0 0 0 2z"/>
              </svg>
              Start Live Chat
            </button>
          </div>

          {/* Divider text */}
          <p className="text-gray-500 mb-6">Or you can contact us at</p>

          {/* Contact Information */}
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 w-full max-w-2xl mx-auto mb-12">
            <div className="border border-[#FFAEBB] rounded-md p-4 bg-[#FFF5F7] text-center flex items-center justify-center gap-2">
              <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" fill="#FA9D9D" viewBox="0 0 16 16">
                <path d="M0 4a2 2 0 0 1 2-2h12a2 2 0 0 1 2 2v8a2 2 0 0 1-2 2H2a2 2 0 0 1-2-2V4zm2-1a1 1 0 0 0-1 1v.217l7 4.2 7-4.2V4a1 1 0 0 0-1-1H2zm13 2.383-4.758 2.855L15 11.114v-5.73zm-.034 6.878L9.271 8.82 8 9.583 6.728 8.82l-5.694 3.44A1 1 0 0 0 2 13h12a1 1 0 0 0 .966-.739zM1 11.114l4.758-2.876L1 5.383v5.73z"/>
              </svg>
              <p className="text-gray-700">Email: support@gmail.com</p>
            </div>
            <div className="border border-[#FFAEBB] rounded-md p-4 bg-[#FFF5F7] text-center flex items-center justify-center gap-2">
              <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" fill="#FA9D9D" viewBox="0 0 16 16">
                <path fillRule="evenodd" d="M1.885.511a1.745 1.745 0 0 1 2.61.163L6.29 2.98c.329.423.445.974.315 1.494l-.547 2.19a.678.678 0 0 0 .178.643l2.457 2.457a.678.678 0 0 0 .644.178l2.189-.547a1.745 1.745 0 0 1 1.494.315l2.306 1.794c.829.645.905 1.87.163 2.611l-1.034 1.034c-.74.74-1.846 1.065-2.877.702a18.634 18.634 0 0 1-7.01-4.42 18.634 18.634 0 0 1-4.42-7.009c-.362-1.03-.037-2.137.703-2.877L1.885.511z"/>
              </svg>
              <p className="text-gray-700">Phone: 0201346530</p>
            </div>
          </div>

          {/* Bold Message */}
          <div className="mt-4">
            <h2 className="text-xl font-bold uppercase text-gray-800">WE HAVE THE SOLUTION!</h2>
          </div>
          
          {/* Chat button (visible when minimized) */}
          {!isChatOpen && (
            <button
              onClick={toggleChat}
              className="fixed bottom-6 right-6 bg-[#FA9D9D] text-black p-4 rounded-full shadow-lg hover:bg-[#FFAEBB] transition-colors z-50 flex items-center justify-center"
            >
              <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" fill="currentColor" viewBox="0 0 16 16">
                <path d="M16 8c0 3.866-3.582 7-8 7a9 9 0 0 1-2.347-.306c-.584.296-1.925.864-4.181 1.234-.2.032-.352-.176-.273-.362.354-.836.674-1.95.77-2.966C.744 11.37 0 9.76 0 8c0-3.866 3.582-7 8-7s8 3.134 8 7zM5 8a1 1 0 1 0-2 0 1 1 0 0 0 2 0zm4 0a1 1 0 1 0-2 0 1 1 0 0 0 2 0zm3 1a1 1 0 1 0 0-2 1 1 0 0 0 0 2z"/>
              </svg>
            </button>
          )}
          
          {/* Minimized Chat Header */}
          {isChatOpen && isMinimized && (
            <div 
              className="fixed bottom-6 right-6 bg-[#FA9D9D] text-black px-4 py-3 rounded-t-lg shadow-lg z-50 cursor-pointer flex items-center justify-between"
              style={{ width: '320px' }}
              onClick={() => setIsMinimized(false)}
            >
              <div className="flex items-center gap-2">
                <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" fill="currentColor" viewBox="0 0 16 16">
                  <path d="M16 8c0 3.866-3.582 7-8 7a9 9 0 0 1-2.347-.306c-.584.296-1.925.864-4.181 1.234-.2.032-.352-.176-.273-.362.354-.836.674-1.95.77-2.966C.744 11.37 0 9.76 0 8c0-3.866 3.582-7 8-7s8 3.134 8 7z"/>
                </svg>
                <h3 className="font-medium">Live Support Chat</h3>
              </div>
              <div className="flex items-center gap-2">
                <button onClick={(e) => {
                  e.stopPropagation();
                  setIsMinimized(false);
                }}>
                  <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" fill="currentColor" viewBox="0 0 16 16">
                    <path fillRule="evenodd" d="M.172 15.828a.5.5 0 0 0 .707 0l4.096-4.096V14.5a.5.5 0 1 0 1 0v-3.975a.5.5 0 0 0-.5-.5H1.5a.5.5 0 0 0 0 1h2.768L.172 15.121a.5.5 0 0 0 0 .707zM15.828.172a.5.5 0 0 0-.707 0l-4.096 4.096V1.5a.5.5 0 1 0-1 0v3.975a.5.5 0 0 0 .5.5H14.5a.5.5 0 0 0 0-1h-2.768L15.828.879a.5.5 0 0 0 0-.707z"/>
                  </svg>
                </button>
                <button onClick={(e) => {
                  e.stopPropagation();
                  closeChat();
                }}>
                  <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" fill="currentColor" viewBox="0 0 16 16">
                    <path d="M4.646 4.646a.5.5 0 0 1 .708 0L8 7.293l2.646-2.647a.5.5 0 0 1 .708.708L8.707 8l2.647 2.646a.5.5 0 0 1-.708.708L8 8.707l-2.646 2.647a.5.5 0 0 1-.708-.708L7.293 8 4.646 5.354a.5.5 0 0 1 0-.708z"/>
                  </svg>
                </button>
              </div>
            </div>
          )}
          
          {/* Live Chat Interface */}
          {isChatOpen && !isMinimized && (
            <div className="fixed bottom-6 right-6 w-full max-w-sm bg-white rounded-lg shadow-xl border border-[#FFAEBB] overflow-hidden z-50">
              {/* Chat Header */}
              <div className="bg-[#FA9D9D] px-4 py-3 flex justify-between items-center">
                <div className="flex items-center gap-2">
                  <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" fill="currentColor" viewBox="0 0 16 16">
                    <path d="M16 8c0 3.866-3.582 7-8 7a9 9 0 0 1-2.347-.306c-.584.296-1.925.864-4.181 1.234-.2.032-.352-.176-.273-.362.354-.836.674-1.95.77-2.966C.744 11.37 0 9.76 0 8c0-3.866 3.582-7 8-7s8 3.134 8 7z"/>
                  </svg>
                  <h3 className="font-medium text-black">Live Support Chat</h3>
                </div>
                <div className="flex items-center gap-2">
                  <button 
                    onClick={() => setIsMinimized(true)}
                    className="text-black hover:text-gray-700"
                  >
                    <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" fill="currentColor" viewBox="0 0 16 16">
                      <path d="M2 8a.5.5 0 0 1 .5-.5h11a.5.5 0 0 1 0 1h-11A.5.5 0 0 1 2 8Z"/>
                    </svg>
                  </button>
                  <button 
                    onClick={closeChat}
                    className="text-black hover:text-gray-700"
                  >
                    <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" fill="currentColor" viewBox="0 0 16 16">
                      <path d="M4.646 4.646a.5.5 0 0 1 .708 0L8 7.293l2.646-2.647a.5.5 0 0 1 .708.708L8.707 8l2.647 2.646a.5.5 0 0 1-.708.708L8 8.707l-2.646 2.647a.5.5 0 0 1-.708-.708L7.293 8 4.646 5.354a.5.5 0 0 1 0-.708z"/>
                    </svg>
                  </button>
                </div>
              </div>
              
              {/* Chat Messages */}
              <div className="h-80 overflow-y-auto p-4 bg-[#FFF5F7]">
                {messages.map((message, index) => (
                  <div 
                    key={index} 
                    className={`mb-3 max-w-[80%] ${message.isUser ? 'ml-auto' : 'mr-auto'}`}
                  >
                    <div className="flex items-start gap-2">
                      {!message.isUser && (
                        <div className="w-8 h-8 rounded-full bg-[#FA9D9D] flex items-center justify-center flex-shrink-0">
                          <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" fill="currentColor" viewBox="0 0 16 16">
                            <path d="M3 14s-1 0-1-1 1-4 6-4 6 3 6 4-1 1-1 1H3Zm5-6a3 3 0 1 0 0-6 3 3 0 0 0 0 6Z"/>
                          </svg>
                        </div>
                      )}
                      <div>
                        <div className={`p-3 rounded-lg ${
                          message.isUser 
                            ? 'bg-[#FA9D9D] text-black rounded-tr-none' 
                            : 'bg-white border border-[#FFAEBB] text-gray-800 rounded-tl-none'
                        }`}>
                          {message.text}
                        </div>
                        <div className={`text-xs text-gray-500 mt-1 ${message.isUser ? 'text-right' : 'text-left'}`}>
                          {message.time}
                        </div>
                      </div>
                      {message.isUser && (
                        <div className="w-8 h-8 rounded-full bg-[#FFAEBB] flex items-center justify-center flex-shrink-0">
                          <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" fill="currentColor" viewBox="0 0 16 16">
                            <path d="M3 14s-1 0-1-1 1-4 6-4 6 3 6 4-1 1-1 1H3Zm5-6a3 3 0 1 0 0-6 3 3 0 0 0 0 6Z"/>
                          </svg>
                        </div>
                      )}
                    </div>
                  </div>
                ))}
                
                {/* Typing indicator */}
                {isTyping && (
                  <div className="flex items-center gap-2 mb-3 max-w-[80%] mr-auto">
                    <div className="w-8 h-8 rounded-full bg-[#FA9D9D] flex items-center justify-center flex-shrink-0">
                      <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" fill="currentColor" viewBox="0 0 16 16">
                        <path d="M3 14s-1 0-1-1 1-4 6-4 6 3 6 4-1 1-1 1H3Zm5-6a3 3 0 1 0 0-6 3 3 0 0 0 0 6Z"/>
                      </svg>
                    </div>
                    <div className="bg-white border border-[#FFAEBB] text-gray-800 p-3 rounded-lg rounded-tl-none">
                      <div className="flex space-x-1">
                        <div className="w-2 h-2 bg-gray-400 rounded-full animate-bounce" style={{ animationDelay: '0ms' }}></div>
                        <div className="w-2 h-2 bg-gray-400 rounded-full animate-bounce" style={{ animationDelay: '300ms' }}></div>
                        <div className="w-2 h-2 bg-gray-400 rounded-full animate-bounce" style={{ animationDelay: '600ms' }}></div>
                      </div>
                    </div>
                  </div>
                )}
                
                <div ref={messagesEndRef} />
              </div>
              
              {/* Chat Input */}
              <form onSubmit={handleSendMessage} className="border-t border-gray-200 p-3 flex">
                <input
                  type="text"
                  value={newMessage}
                  onChange={(e) => setNewMessage(e.target.value)}
                  placeholder="Type your message..."
                  className="flex-1 border border-gray-300 rounded-l-md px-3 py-2 focus:outline-none focus:ring-1 focus:ring-[#FA9D9D]"
                />
                <button 
                  type="submit"
                  className="bg-[#FA9D9D] text-black px-4 py-2 rounded-r-md hover:bg-[#FFAEBB] transition-colors flex items-center justify-center"
                >
                  <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" fill="currentColor" viewBox="0 0 16 16">
                    <path d="M15.964.686a.5.5 0 0 0-.65-.65L.767 5.855H.766l-.452.18a.5.5 0 0 0-.082.887l.41.26.001.002 4.995 3.178 3.178 4.995.002.002.26.41a.5.5 0 0 0 .886-.083l6-15Zm-1.833 1.89L6.637 10.07l-.215-.338a.5.5 0 0 0-.154-.154l-.338-.215 7.494-7.494 1.178-.471-.47 1.178Z"/>
                  </svg>
                </button>
              </form>
            </div>
          )}
        </div>
      </div>
    </div>
  )
}
