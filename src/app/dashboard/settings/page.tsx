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
    medicalCondition: ""
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
              medicalCondition: data.medicalCondition || ""
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

    try {
      const response = await fetch("/api/user/profile", {
        method: "POST",
        headers: {
          "Content-Type": "application/json"
        },
        body: JSON.stringify({
          userId: session?.user?.id,
          ...formData
        })
      })

      if (response.ok) {
        setMessage({ 
          type: "success", 
          text: "Profile updated successfully!" 
        })
        
        // Refresh session to update displayed name if it changed
        // Note: This will depend on your NextAuth configuration
        setTimeout(() => {
          router.refresh()
        }, 1000)
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
      
      // Clear success message after a few seconds
      if (message.type === "success") {
        setTimeout(() => {
          setMessage({ type: "", text: "" })
        }, 3000)
      }
    }
  }

  return (
    <div className="bg-gray-50">
      {/* Main Content */}
      <div className="flex-1 p-4 sm:p-6 lg:p-8 overflow-auto">
        <div className="pt-16 lg:pt-0 max-w-4xl mx-auto">
          {/* Profile Header */}
          <div className="flex flex-col sm:flex-row items-center gap-4 sm:gap-6 mb-8 sm:mb-12">
            <div className="rounded-full bg-black w-20 h-20 sm:w-24 sm:h-24 flex items-center justify-center overflow-hidden">
              {session?.user?.image ? (
                <Image
                  src={session.user.image}
                  alt={session.user.name || "User"}
                  className="w-full h-full object-cover"
                />
              ) : (
                <User className="text-white w-10 h-10 sm:w-12 sm:h-12" />
              )}
            </div>
            <div className="text-center sm:text-left">
              <h1 className="text-xl sm:text-2xl font-bold text-black">
                {session?.user?.name || formData.name || "LIFELINER"}
              </h1>
              <p className="text-gray-600">{formData.location || "Update your location"}</p>
            </div>
          </div>

          {/* Status Message */}
          {message.text && (
            <div className={`mb-6 p-3 rounded-lg ${
              message.type === "success" ? "bg-green-100 text-green-800" : "bg-red-100 text-red-800"
            }`}>
              {message.text}
            </div>
          )}

          {/* Profile Form */}
          <form className="space-y-6 sm:space-y-8" onSubmit={handleSubmit}>
            {/* First Row */}
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6 sm:gap-8">
              {/* Name Field */}
              <div>
                <label htmlFor="name" className="block text-base sm:text-lg font-medium text-black mb-2 sm:mb-3">Name</label>
                <input
                  id="name"
                  name="name"
                  type="text"
                  placeholder="e.g, Surname, Firstname"
                  value={formData.name}
                  onChange={handleChange}
                  className="w-full px-3 sm:px-4 py-2.5 sm:py-3 border-2 border-gray-300 rounded-lg focus:border-[#F5A5A5] focus:outline-none text-gray-700 text-sm sm:text-base"
                />
              </div>

              {/* Age Field */}
              <div>
                <label htmlFor="age" className="block text-base sm:text-lg font-medium text-black mb-2 sm:mb-3">Age</label>
                <div className="relative">
                  <select 
                    id="age"
                    name="age"
                    value={formData.age}
                    onChange={handleChange}
                    className="w-full px-3 sm:px-4 py-2.5 sm:py-3 border-2 border-gray-300 rounded-lg focus:border-[#F5A5A5] focus:outline-none text-gray-700 appearance-none bg-white text-sm sm:text-base"
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
              {/* Gender Field */}
              <div>
                <label htmlFor="gender" className="block text-base sm:text-lg font-medium text-black mb-2 sm:mb-3">Gender</label>
                <div className="relative">
                  <select 
                    id="gender"
                    name="gender"
                    value={formData.gender}
                    onChange={handleChange}
                    className="w-full px-3 sm:px-4 py-2.5 sm:py-3 border-2 border-gray-300 rounded-lg focus:border-[#F5A5A5] focus:outline-none text-gray-700 appearance-none bg-white text-sm sm:text-base"
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

              {/* Phone Number Field */}
              <div>
                <label htmlFor="phone" className="block text-base sm:text-lg font-medium text-black mb-2 sm:mb-3">Phone Number</label>
                <input
                  id="phone"
                  name="phone"
                  type="tel"
                  placeholder="e.g, (+233) 020 343 787"
                  value={formData.phone}
                  onChange={handleChange}
                  className="w-full px-3 sm:px-4 py-2.5 sm:py-3 border-2 border-gray-300 rounded-lg focus:border-[#F5A5A5] focus:outline-none text-gray-700 text-sm sm:text-base"
                />
              </div>
            </div>

            {/* Third Row */}
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6 sm:gap-8">
              {/* Location Field */}
              <div>
                <label htmlFor="location" className="block text-base sm:text-lg font-medium text-black mb-2 sm:mb-3">Location</label>
                <input
                  id="location"
                  name="location"
                  type="text"
                  placeholder="e.g, Nowhere, Bahamas"
                  value={formData.location}
                  onChange={handleChange}
                  className="w-full px-3 sm:px-4 py-2.5 sm:py-3 border-2 border-gray-300 rounded-lg focus:border-[#F5A5A5] focus:outline-none text-gray-700 text-sm sm:text-base"
                />
              </div>

              {/* Medical Condition Field */}
              <div>
                <label htmlFor="medicalCondition" className="block text-base sm:text-lg font-medium text-black mb-2 sm:mb-3">
                  Medical Condition
                </label>
                <input
                  id="medicalCondition"
                  name="medicalCondition"
                  type="text"
                  placeholder="e.g, Diabetes"
                  value={formData.medicalCondition}
                  onChange={handleChange}
                  className="w-full px-3 sm:px-4 py-2.5 sm:py-3 border-2 border-gray-300 rounded-lg focus:border-[#F5A5A5] focus:outline-none text-gray-700 text-sm sm:text-base"
                />
              </div>
            </div>

            {/* Save Button */}
            <div className="flex justify-center pt-6 sm:pt-8">
              <button
                type="submit"
                disabled={loading}
                className={`
                  bg-[#F5A5A5] text-black px-8 sm:px-12 py-3 sm:py-4 rounded-full 
                  text-base sm:text-lg font-medium hover:bg-[#F08080] transition-colors 
                  w-full sm:w-auto flex items-center justify-center
                  ${loading ? 'opacity-70 cursor-not-allowed' : ''}
                `}
              >
                {loading ? 'Saving...' : 'Save Changes'}
              </button>
            </div>
          </form>
        </div>
      </div>
    </div>
  )
}
