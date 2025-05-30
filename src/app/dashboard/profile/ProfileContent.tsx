"use client";
import { User, ChevronRight } from "lucide-react"
import { useState, useEffect, useCallback } from "react"
import { useSession } from "next-auth/react";
import Image from "next/image"
import Link from "next/link";

// Array of tips with categories
const allTips = [
  {
    category: "CUT",
    tip: "Handle sharp objects with care: This seems obvious, but it's the most important rule. Pay close attention when using knives, scissors, razors, box cutters, and tools. Don't rush!",
  },
  {
    category: "BURN",
    tip: "For minor burns, hold the area under cool running water for 10-15 minutes. Never use ice, butter, or oils on burns as they can make the injury worse.",
  },
  {
    category: "FRACTURE",
    tip: "If you suspect a broken bone, immobilize the area with a splint. Don't try to realign the bone or push a bone back in if it's sticking out.",
  },
  {
    category: "BLEEDING",
    tip: "Apply direct pressure to stop bleeding. If blood soaks through, add another layer of gauze or cloth without removing the first layer.",
  },
  {
    category: "ASTHMA",
    tip: "If someone is having an asthma attack, help them sit upright, stay calm, and use their inhaler. If symptoms don't improve after 5-10 minutes, seek emergency help.",
  },
  {
    category: "CHOKING",
    tip: "For a conscious person who's choking, perform the Heimlich maneuver by standing behind them and giving abdominal thrusts until the object is expelled.",
  },
  {
    category: "SNAKE BITE",
    tip: "Keep the bite victim calm and still. Remove jewelry and constrictive clothing. Keep the affected area below heart level if possible and seek medical help immediately.",
  },
]

export default function ProfileContent() {
  const { data: session } = useSession();
  const [currentTip, setCurrentTip] = useState(allTips[0])
  const [lastUpdated, setLastUpdated] = useState("")
  const [profileData, setProfileData] = useState({
    age: "",
    gender: "",
    location: "",
    medicalCondition: "",
    phone: "",
    language: "" // Add language field
  });

  // Modified getDailyTip function to ensure it updates daily
  const getDailyTip = () => {
    const today = new Date()
    const lastChecked = localStorage.getItem('lastTipDate')
    const currentDate = today.toDateString()

    // Check if we need to update the tip (new day or no previous tip)
    if (!lastChecked || lastChecked !== currentDate) {
      const dayOfYear = Math.floor((today.getTime() - new Date(today.getFullYear(), 0, 0).getTime()) / (24 * 60 * 60 * 1000))
      const tipIndex = dayOfYear % allTips.length
      setCurrentTip(allTips[tipIndex])
      localStorage.setItem('lastTipDate', currentDate)
      
      const formattedDate = today.toLocaleDateString('en-US', {
        weekday: 'long',
        month: 'long',
        day: 'numeric'
      })
      setLastUpdated(formattedDate)
    }
  }

  // Get a new tip when user clicks refresh
  const getRandomTip = () => {
    const randomIndex = Math.floor(Math.random() * allTips.length)
    setCurrentTip(allTips[randomIndex])

    // Update the last updated timestamp
    const now = new Date()
    const formattedTime = now.toLocaleTimeString("en-US", {
      hour: "2-digit",
      minute: "2-digit",
    })
    setLastUpdated(`Today at ${formattedTime}`)
  }

  // Fetch user profile data
  const fetchUserProfile = useCallback(async () => {
    if (session?.user?.id) {
      try {
        const response = await fetch(`/api/user/profile?userId=${session.user.id}`);
        
        if (response.ok) {
          const data = await response.json();
          setProfileData({
            age: data.age || "",
            gender: data.gender || "",
            location: data.location || "",
            medicalCondition: data.medicalCondition || "",
            phone: data.phone || "",
            language: data.language || "" // Include language
          });
        }
      } catch (error) {
        console.error("Error fetching user profile:", error);
      }
    }
  }, [session]);

  // Set initial tip on component mount
  useEffect(() => {
    getDailyTip()
    if (session?.user?.id) {
      fetchUserProfile();
    }
  }, [session, fetchUserProfile])

  return (
    <div className="flex-1 p-3 sm:p-6 lg:p-8 overflow-auto">
      <h1 className="text-xl sm:text-2xl font-bold mb-4 sm:mb-6 text-black">Profile</h1>

      {/* Profile Card - Responsive adjustments */}
      <div className="bg-white border border-gray-700 rounded-2xl p-4 sm:p-6 mb-6 sm:mb-8 max-w-3xl mx-auto">
        <div className="flex flex-col sm:flex-row items-center sm:items-start gap-4 sm:gap-6">
          <div className="rounded-full bg-white border-2 border-black w-20 h-20 flex items-center justify-center shrink-0 overflow-hidden">
            {session?.user?.image ? (
              <Image
                src={session.user.image} 
                alt={session.user.name || "User"} 
                width={80}
                height={80}
                className="w-full h-full object-cover"
              />
            ) : (
              <User className="text-black w-10 h-10" />
            )}
          </div>

          <div className="flex-1 w-full">
            <div className="flex flex-col sm:flex-row justify-between items-center sm:items-start">
              <h2 className="text-lg sm:text-xl font-bold text-black mb-2 sm:mb-4 text-center sm:text-left">
                {session?.user?.name || "LIFELINER"}
              </h2>
              <Link 
                href="/dashboard/settings" 
                className="text-sm text-red-500 hover:text-red-600 mb-3 sm:mb-0"
              >
                Edit Profile
              </Link>
            </div>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-y-2 gap-x-4 sm:gap-x-16 text-center sm:text-left">
              <div>
                <p className="text-black text-sm sm:text-base">Age: {profileData.age || "Not set"}</p>
                <p className="text-black text-sm sm:text-base">Gender: {profileData.gender || "Not set"}</p>
                <p className="text-black text-sm sm:text-base">Location: {profileData.location || "Not set"}</p>
              </div>
              <div className="mt-2 sm:mt-0">
                <p className="text-black text-sm sm:text-base">Medical Condition: {profileData.medicalCondition || "None"}</p>
                <p className="text-black text-sm sm:text-base">Emergency Contact: {profileData.phone || "Not set"}</p>
                <p className="text-black text-sm sm:text-base">Language: {profileData.language || "Not set"}</p>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Content Grid - Responsive adjustments */}
      <div className="grid grid-cols-1 gap-6 lg:grid-cols-3 lg:gap-8">
        {/* Lifeline History */}
        <div className="lg:col-span-2">
          <div className="flex justify-between items-center mb-3 sm:mb-4">
            <h2 className="text-lg sm:text-xl font-bold text-black">Lifeline History</h2>
            <button className="bg-[#FFAEBB] text-black px-4 sm:px-6 py-1.5 sm:py-2 rounded-full text-xs sm:text-sm hover:bg-[#FFD3DB] transition-colors">
              View All
            </button>
          </div>

          {/* Timeline - Responsive adjustments */}
          <div className="bg-white border border-gray-700 rounded-2xl p-4 sm:p-6">
            <h3 className="font-bold mb-4 sm:mb-6 text-black">Timeline</h3>
            <div className="relative">
              {/* Timeline line */}
              <div className="absolute left-2 sm:left-3 top-0 bottom-0 w-0.5 bg-gray-300"></div>

              {/* Timeline items */}
              <div className="space-y-4 sm:space-y-6">
                {[
                  { title: "Fracture", date: "02, May, 2025" },
                  { title: "Cough", date: "02, May, 2025" },
                  { title: "Burns", date: "02, May, 2025" }
                ].map((item, index) => (
                  <div key={index} className="relative flex items-center">
                    <div className="absolute left-0 w-4 sm:w-6 h-4 sm:h-6 bg-gray-300 rounded-full z-10"></div>
                    <div className="ml-8 sm:ml-12 flex-1 bg-white border border-gray-700 rounded-lg p-3 sm:p-4 flex justify-between items-center">
                      <div>
                        <h4 className="font-medium text-black text-sm sm:text-base">{item.title}</h4>
                        <p className="text-gray-600 text-xs sm:text-sm">Last Visited: {item.date}</p>
                      </div>
                      <button className="text-[#FFAEBB] rounded-full border border-[#FFAEBB] w-6 h-6 sm:w-8 sm:h-8 flex items-center justify-center hover:bg-[#FFD3DB] transition-colors">
                        <ChevronRight className="w-3 h-3 sm:w-4 sm:h-4" />
                      </button>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </div>

        {/* Improved Daily Tip Card - Responsive adjustments */}
        <div className="lg:col-span-1">
          <div className="bg-white border border-gray-700 rounded-2xl overflow-hidden">
            {/* Header with accent color */}
            <div className="bg-white px-4 sm:px-6 py-3 sm:py-4">
              <h2 className="text-lg sm:text-xl font-bold text-black text-center">DAILY TIP</h2>
            </div>

            {/* Tip Content */}
            <div className="p-4 sm:p-6">
              {/* Date indicator */}
              <div className="text-xs sm:text-sm text-gray-500 text-center mb-3 sm:mb-4">
                {lastUpdated}
              </div>

              {/* Tip text */}
              <div className="bg-gray-50 rounded-xl p-3 sm:p-5 mb-4 sm:mb-6">
                <p className="text-black text-sm sm:text-base leading-relaxed text-center">
                  {currentTip.tip}
                </p>
              </div>

              {/* Category button */}
              <div className="flex flex-col items-center gap-1 sm:gap-2">
                <button 
                  onClick={getRandomTip}
                  className="bg-[#FFAEBB] text-black px-6 sm:px-8 py-1.5 sm:py-2 rounded-full text-xs sm:text-sm font-medium hover:bg-[#FFD3DB] transition-colors"
                >
                  {currentTip.category}
                </button>
                <p className="text-xs text-gray-500">
                  New tip every day
                </p>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}
