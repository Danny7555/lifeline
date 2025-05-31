"use client"
import { User, ChevronDown } from "lucide-react"
import { useSession } from "next-auth/react"
import { useState, useEffect } from "react"
import { useRouter } from "next/navigation"
import Image from "next/image"

export default function SettingsPage() {
  const { data: session, status } = useSession()
  const router = useRouter()
  const [loading, setLoading] = useState(false)
  const [message, setMessage] = useState({ type: "", text: "" })
  
  // Create profile form state
  const [formData, setFormData] = useState({
    name: "",
    age: "",
    gender: "",
    phone: "",
    location: "",
    medicalCondition: "",
    language: ""
  })

  // Load user data from session and database when component mounts
  useEffect(() => {
    const fetchUserProfile = async () => {
      if (session?.user?.id) {
        try {
          const response = await fetch(`/api/user/profile?userId=${session.user.id}`)
          
          if (response.ok) {
            const data = await response.json()
            
            // Populate form with existing data
            setFormData({
              name: data.name || session?.user?.name || "",
              age: data.age || "",
              gender: data.gender || "",
              phone: data.phone || "",
              location: data.location || "",
              medicalCondition: data.medicalCondition || "",
              language: data.language || ""
            })
          }
        } catch (error) {
          console.error("Error fetching user profile:", error)
        }
      }
    }

    if (status === "authenticated") {
      fetchUserProfile()
    }
  }, [session, status])

  // Handle form input changes
  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>) => {
    const { name, value } = e.target
    setFormData(prev => ({
      ...prev,
      [name]: value
    }))
  }

  // Handle form submission
  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault()
    setLoading(true)
    setMessage({ type: "", text: "" })

    // Add specific console logging for language field
    console.log("Submitting language:", formData.language);

    try {
      // Create a special version of the data that ensures language is properly included
      const dataToSubmit = {
        userId: session?.user?.id,
        name: formData.name,
        age: formData.age,
        gender: formData.gender,
        phone: formData.phone,
        location: formData.location,
        medicalCondition: formData.medicalCondition,
        language: formData.language, // Explicitly include language
      };

      const response = await fetch("/api/user/profile", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          "Cache-Control": "no-cache, no-store, must-revalidate"
        },
        body: JSON.stringify(dataToSubmit),
        cache: 'no-store'
      });

      if (response.ok) {
        // Log successful response
        const responseData = await response.json();
        console.log("Profile update response:", responseData);

        setMessage({ 
          type: "success", 
          text: "Profile updated successfully!" 
        })
        
        // Enhanced notification system for updates
        if (typeof window !== 'undefined') {
          // 1. Custom event with specific language data
          const updateEvent = new CustomEvent('profileUpdated', {
            detail: { language: formData.language }
          });
          window.dispatchEvent(updateEvent);
          
          // 2. Store specific language info in localStorage
          localStorage.setItem('profileLanguage', formData.language);
          localStorage.setItem('profileUpdatedAt', new Date().toISOString());
          
          // 3. Clear any session storage that might be caching profile data
          sessionStorage.removeItem('profileData');
        }
        
        // 4. Make direct API call to update any server-side cache
        await fetch('/api/clear-cache', { 
          method: 'POST',
          headers: {
            'Content-Type': 'application/json'
          },
          body: JSON.stringify({ 
            userId: session?.user?.id,
            field: 'language',
            value: formData.language
          })
        }).catch(console.error);
        
        // 5. Hard navigation to force complete refresh
        setTimeout(() => {
          // Use hard navigation for complete refresh
          window.location.href = '/dashboard/profile';
        }, 1500);
      } else {
        const error = await response.json()
        throw new Error(error.message || "Failed to update profile")
      }
    } catch (error) {
      console.error("Error updating profile:", error)
      const errorMessage = error instanceof Error 
        ? error.message 
        : "An error occurred while updating your profile"
      
      setMessage({ 
        type: "error", 
        text: errorMessage 
      })
    } finally {
      setLoading(false)
    }
  }

  return (
    <div className="bg-gray-50 min-h-screen">
      {/* Main Content */}
      <div className="flex-1 p-4 sm:p-6 lg:p-8 overflow-auto">
        <div className="pt-16 lg:pt-0 max-w-4xl mx-auto">
          {/* Enhanced Profile Header with shadow and better styling */}
          <div className="bg-white rounded-2xl shadow-md p-6 mb-8 sm:mb-12 flex flex-col sm:flex-row items-center gap-6">
            <div className="rounded-full bg-gradient-to-br from-[#F5A5A5] to-[#F08080] w-24 h-24 sm:w-28 sm:h-28 flex items-center justify-center overflow-hidden shadow-md border-4 border-white">
              {session?.user?.image ? (
                <Image
                  src={session.user.image}
                  alt={session.user.name || "User"}
                  className="w-full h-full object-cover"
                  width={112}
                  height={112}
                />
              ) : (
                <User className="text-white w-12 h-12 sm:w-14 sm:h-14" />
              )}
            </div>
            <div className="text-center sm:text-left">
              <h1 className="text-xl sm:text-2xl font-bold text-black mb-1">
                {session?.user?.name || formData.name || "LIFELINER"}
              </h1>
              <p className="text-gray-600 flex items-center justify-center sm:justify-start gap-1 mb-3">
                <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                  <path d="M21 10c0 7-9 13-9 13s-9-6-9-13a9 9 0 0 1 18 0z"></path>
                  <circle cx="12" cy="10" r="3"></circle>
                </svg>
                {formData.location || "Update your location"}
              </p>
              <p className="text-xs text-gray-500">Last updated: {new Date().toLocaleDateString()}</p>
            </div>
          </div>

          {/* Status Message with Icon */}
          {message.text && (
            <div className={`mb-6 p-4 rounded-lg flex items-center gap-3 ${
              message.type === "success" ? "bg-green-100 text-green-800" : "bg-red-100 text-red-800"
            }`}>
              {message.type === "success" ? (
                <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                  <path d="M22 11.08V12a10 10 0 1 1-5.93-9.14"></path>
                  <polyline points="22 4 12 14.01 9 11.01"></polyline>
                </svg>
              ) : (
                <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                  <circle cx="12" cy="12" r="10"></circle>
                  <line x1="12" y1="8" x2="12" y2="12"></line>
                  <line x1="12" y1="16" x2="12.01" y2="16"></line>
                </svg>
              )}
              {message.text}
            </div>
          )}

          {/* Profile Form Card */}
          <div className="bg-white rounded-2xl shadow-md p-6 sm:p-8">
            <h2 className="text-xl font-bold text-black mb-6 flex items-center gap-2">
              <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                <path d="M12 20h9"></path>
                <path d="M16.5 3.5a2.121 2.121 0 0 1 3 3L7 19l-4 1 1-4L16.5 3.5z"></path>
              </svg>
              Edit Profile Information
            </h2>
            
            <form className="space-y-6 sm:space-y-8" onSubmit={handleSubmit}>
              {/* First Row */}
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6 sm:gap-8">
                {/* Name Field with Icon */}
                <div>
                  <label htmlFor="name" className="flex items-center gap-2 text-base sm:text-lg font-medium text-black mb-2 sm:mb-3">
                    <svg xmlns="http://www.w3.org/2000/svg" width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                      <path d="M20 21v-2a4 4 0 0 0-4-4H8a4 4 0 0 0-4 4v2"></path>
                      <circle cx="12" cy="7" r="4"></circle>
                    </svg>
                    Name
                  </label>
                  <div className="relative">
                    <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                      <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="#9CA3AF" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                        <path d="M20 21v-2a4 4 0 0 0-4-4H8a4 4 0 0 0-4 4v2"></path>
                        <circle cx="12" cy="7" r="4"></circle>
                      </svg>
                    </div>
                    <input
                      id="name"
                      name="name"
                      type="text"
                      placeholder="e.g, Surname, Firstname"
                      value={formData.name}
                      onChange={handleChange}
                      className="w-full pl-10 pr-4 py-3 border-2 border-gray-300 rounded-lg focus:border-[#F5A5A5] focus:outline-none text-gray-700 text-sm sm:text-base"
                    />
                  </div>
                </div>

                {/* Age Field with Icon */}
                <div>
                  <label htmlFor="age" className="flex items-center gap-2 text-base sm:text-lg font-medium text-black mb-2 sm:mb-3">
                    <svg xmlns="http://www.w3.org/2000/svg" width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                      <circle cx="12" cy="12" r="10"></circle>
                      <polyline points="12 6 12 12 16 14"></polyline>
                    </svg>
                    Age
                  </label>
                  <div className="relative">
                    <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                      <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="#9CA3AF" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                        <rect x="3" y="4" width="18" height="18" rx="2" ry="2"></rect>
                        <line x1="16" y1="2" x2="16" y2="6"></line>
                        <line x1="8" y1="2" x2="8" y2="6"></line>
                        <line x1="3" y1="10" x2="21" y2="10"></line>
                      </svg>
                    </div>
                    <select 
                      id="age"
                      name="age"
                      value={formData.age}
                      onChange={handleChange}
                      className="w-full pl-10 pr-10 py-3 border-2 border-gray-300 rounded-lg focus:border-[#F5A5A5] focus:outline-none text-gray-700 appearance-none bg-white text-sm sm:text-base"
                    >
                      <option value="">Select Age</option>
                      <option value="18-25">18-25</option>
                      <option value="26-35">26-35</option>
                      <option value="36-45">36-45</option>
                      <option value="46-55">46-55</option>
                      <option value="56-65">56-65</option>
                      <option value="65+">65+</option>
                    </select>
                    <ChevronDown className="absolute right-3 top-1/2 transform -translate-y-1/2 w-4 h-4 sm:w-5 sm:h-5 text-gray-400 pointer-events-none" />
                  </div>
                </div>
              </div>

              {/* Second Row */}
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6 sm:gap-8">
                {/* Gender Field with Icon */}
                <div>
                  <label htmlFor="gender" className="flex items-center gap-2 text-base sm:text-lg font-medium text-black mb-2 sm:mb-3">
                    <svg xmlns="http://www.w3.org/2000/svg" width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                      <circle cx="12" cy="12" r="10"></circle>
                      <path d="M8 14.5a4 4 0 1 0 8 0a4 4 0 1 0 -8 0"></path>
                      <path d="M12 10v8"></path>
                      <path d="M9 7h6"></path>
                    </svg>
                    Gender
                  </label>
                  <div className="relative">
                    <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                      <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="#9CA3AF" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                        <circle cx="12" cy="12" r="10"></circle>
                        <path d="M12 8v8"></path>
                        <path d="M8 12h8"></path>
                      </svg>
                    </div>
                    <select 
                      id="gender"
                      name="gender"
                      value={formData.gender}
                      onChange={handleChange}
                      className="w-full pl-10 pr-10 py-3 border-2 border-gray-300 rounded-lg focus:border-[#F5A5A5] focus:outline-none text-gray-700 appearance-none bg-white text-sm sm:text-base"
                    >
                      <option value="">Select Gender</option>
                      <option value="male">Male</option>
                      <option value="female">Female</option>
                      <option value="other">Other</option>
                      <option value="prefer-not-to-say">Prefer not to say</option>
                    </select>
                    <ChevronDown className="absolute right-3 top-1/2 transform -translate-y-1/2 w-4 h-4 sm:w-5 sm:h-5 text-gray-400 pointer-events-none" />
                  </div>
                </div>

                {/* Phone Number Field with Icon */}
                <div>
                  <label htmlFor="phone" className="flex items-center gap-2 text-base sm:text-lg font-medium text-black mb-2 sm:mb-3">
                    <svg xmlns="http://www.w3.org/2000/svg" width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                      <path d="M22 16.92v3a2 2 0 0 1-2.18 2 19.79 19.79 0 0 1-8.63-3.07 19.5 19.5 0 0 1-6-6 19.79 19.79 0 0 1-3.07-8.67A2 2 0 0 1 4.11 2h3a2 2 0 0 1 2 1.72 12.84 12.84 0 0 0 .7 2.81 2 2 0 0 1-.45 2.11L8.09 9.91a16 16 0 0 0 6 6l1.27-1.27a2 2 0 0 1 2.11-.45 12.84 12.84 0 0 0 2.81.7A2 2 0 0 1 22 16.92z"></path>
                    </svg>
                    Phone Number
                  </label>
                  <div className="relative">
                    <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                      <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="#9CA3AF" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                        <path d="M22 16.92v3a2 2 0 0 1-2.18 2 19.79 19.79 0 0 1-8.63-3.07 19.5 19.5 0 0 1-6-6 19.79 19.79 0 0 1-3.07-8.67A2 2 0 0 1 4.11 2h3a2 2 0 0 1 2 1.72 12.84 12.84 0 0 0 .7 2.81 2 2 0 0 1-.45 2.11L8.09 9.91a16 16 0 0 0 6 6l1.27-1.27a2 2 0 0 1 2.11-.45 12.84 12.84 0 0 0 2.81.7A2 2 0 0 1 22 16.92z"></path>
                      </svg>
                    </div>
                    <input
                      id="phone"
                      name="phone"
                      type="tel"
                      placeholder="e.g, (+233) 020 343 787"
                      value={formData.phone}
                      onChange={handleChange}
                      className="w-full pl-10 pr-4 py-3 border-2 border-gray-300 rounded-lg focus:border-[#F5A5A5] focus:outline-none text-gray-700 text-sm sm:text-base"
                    />
                  </div>
                </div>
              </div>

              {/* Third Row */}
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6 sm:gap-8">
                {/* Location Field with Icon */}
                <div>
                  <label htmlFor="location" className="flex items-center gap-2 text-base sm:text-lg font-medium text-black mb-2 sm:mb-3">
                    <svg xmlns="http://www.w3.org/2000/svg" width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                      <path d="M21 10c0 7-9 13-9 13s-9-6-9-13a9 9 0 0 1 18 0z"></path>
                      <circle cx="12" cy="10" r="3"></circle>
                    </svg>
                    Location
                  </label>
                  <div className="relative">
                    <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                      <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="#9CA3AF" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                        <path d="M21 10c0 7-9 13-9 13s-9-6-9-13a9 9 0 0 1 18 0z"></path>
                        <circle cx="12" cy="10" r="3"></circle>
                      </svg>
                    </div>
                    <input
                      id="location"
                      name="location"
                      type="text"
                      placeholder="e.g, Nowhere, Bahamas"
                      value={formData.location}
                      onChange={handleChange}
                      className="w-full pl-10 pr-4 py-3 border-2 border-gray-300 rounded-lg focus:border-[#F5A5A5] focus:outline-none text-gray-700 text-sm sm:text-base"
                    />
                  </div>
                </div>

                {/* Medical Condition Field with Icon */}
                <div>
                  <label htmlFor="medicalCondition" className="flex items-center gap-2 text-base sm:text-lg font-medium text-black mb-2 sm:mb-3">
                    <svg xmlns="http://www.w3.org/2000/svg" width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                      <path d="M20.42 4.58a5.4 5.4 0 0 0-7.65 0l-.77.78-.77-.78a5.4 5.4 0 0 0-7.65 0C1.46 6.7 1.33 10.28 4 13l8 8 8-8c2.67-2.72 2.54-6.3.42-8.42z"></path>
                    </svg>
                    Medical Condition
                  </label>
                  <div className="relative">
                    <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                      <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="#9CA3AF" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                        <path d="M22 12h-4l-3 9L9 3l-3 9H2"></path>
                      </svg>
                    </div>
                    <input
                      id="medicalCondition"
                      name="medicalCondition"
                      type="text"
                      placeholder="e.g, Diabetes"
                      value={formData.medicalCondition}
                      onChange={handleChange}
                      className="w-full pl-10 pr-4 py-3 border-2 border-gray-300 rounded-lg focus:border-[#F5A5A5] focus:outline-none text-gray-700 text-sm sm:text-base"
                    />
                  </div>
                </div>
              </div>

              {/* Fourth Row - Language with Icon */}
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6 sm:gap-8">
                <div>
                  <label htmlFor="language" className="flex items-center gap-2 text-base sm:text-lg font-medium text-black mb-2 sm:mb-3">
                    <svg xmlns="http://www.w3.org/2000/svg" width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                      <circle cx="12" cy="12" r="10"></circle>
                      <path d="M2 12h20"></path>
                      <path d="M12 2a15.3 15.3 0 0 1 4 10 15.3 15.3 0 0 1-4 10 15.3 15.3 0 0 1-4-10 15.3 15.3 0 0 1 4-10z"></path>
                    </svg>
                    Language
                  </label>
                  <div className="relative">
                    <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                      <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="#9CA3AF" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                        <path d="M5 8h12M5 12h12M5 16h12M19 8h2M19 12h2M19 16h2"></path>
                      </svg>
                    </div>
                    <select 
                      id="language"
                      name="language"
                      value={formData.language}
                      onChange={handleChange}
                      className="w-full pl-10 pr-10 py-3 border-2 border-gray-300 rounded-lg focus:border-[#F5A5A5] focus:outline-none text-gray-700 appearance-none bg-white text-sm sm:text-base"
                    >
                      <option value="">Select Language</option>
                      <option value="English">English</option>
                      <option value="Frafra">Frafra</option>
                      <option value="Twi">Twi</option>
                      <option value="Ga">Ga</option>
                      <option value="Ewe">Ewe</option>
                      <option value="Hausa">Hausa</option>
                      <option value="Dagbani">Dagbani</option>
                      <option value="French">French</option>
                      <option value="Spanish">Spanish</option>
                      <option value="Arabic">Arabic</option>
                      <option value="Other">Other</option>
                    </select>
                    <ChevronDown className="absolute right-3 top-1/2 transform -translate-y-1/2 w-4 h-4 sm:w-5 sm:h-5 text-gray-400 pointer-events-none" />
                  </div>
                </div>

                <div className="hidden md:block"></div>
              </div>

              {/* Save Button with Icon */}
              <div className="flex justify-center pt-6 sm:pt-8">
                <button
                  type="submit"
                  disabled={loading}
                  className={`
                    bg-[#F5A5A5] text-black px-8 sm:px-12 py-3 sm:py-4 rounded-full 
                    text-base sm:text-lg font-medium hover:bg-[#F08080] transition-colors 
                    flex items-center justify-center gap-2 shadow-md
                    ${loading ? 'opacity-70 cursor-not-allowed' : ''}
                  `}
                >
                  {loading ? (
                    <>
                      <svg className="animate-spin h-5 w-5 text-black" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24">
                        <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle>
                        <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
                      </svg>
                      Saving...
                    </>
                  ) : (
                    <>
                      <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                        <path d="M19 21H5a2 2 0 0 1-2-2V5a2 2 0 0 1 2-2h11l5 5v11a2 2 0 0 1-2 2z"></path>
                        <polyline points="17 21 17 13 7 13 7 21"></polyline>
                        <polyline points="7 3 7 8 15 8"></polyline>
                      </svg>
                      Save Changes
                    </>
                  )}
                </button>
              </div>
            </form>
          </div>
        </div>
      </div>
    </div>
  )
}
