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
    icon: (
      <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
        <circle cx="6" cy="6" r="3"></circle>
        <circle cx="18" cy="18" r="3"></circle>
        <path d="M20 4L8.12 15.88"></path>
        <path d="M14.47 14.48L20 20"></path>
        <path d="M8.12 8.12L12 12"></path>
      </svg>
    ),
    tip: "Handle sharp objects with care: This seems obvious, but it's the most important rule. Pay close attention when using knives, scissors, razors, box cutters, and tools. Don't rush!",
  },
  {
    category: "BURN",
    icon: (
      <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
        <path d="M8.5 14.5A2.5 2.5 0 0 0 11 12c0-1.38-.5-2-1-3-1.072-2.143-.224-4.054 2-6 .5 2.5 2 4.9 4 6.5 2 1.6 3 3.5 3 5.5a7 7 0 1 1-14 0c0-1.153.433-2.294 1-3a2.5 2.5 0 0 0 2.5 2.5z"></path>
      </svg>
    ),
    tip: "For minor burns, hold the area under cool running water for 10-15 minutes. Never use ice, butter, or oils on burns as they can make the injury worse.",
  },
  {
    category: "FRACTURE",
    icon: (
      <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
        <path d="M18 4.5l3.5 2-3.5 2M18 17.5l3.5 2-3.5 2M6.5 4.5L3 6.5l3.5 2M6.5 19.5L3 17.5l3.5-2"></path>
        <path d="M14 5l-4 14"></path>
      </svg>
    ),
    tip: "If you suspect a broken bone, immobilize the area with a splint. Don't try to realign the bone or push a bone back in if it's sticking out.",
  },
  {
    category: "BLEEDING",
    icon: (
      <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
        <path d="M12 2v10M12 22v-3M4.93 10.93l1.41 1.41M19.07 10.93l-1.41 1.41M2 17h2M20 17h2M6.26 17h11.48M11 14l1 1v3"></path>
      </svg>
    ),
    tip: "Apply direct pressure to stop bleeding. If blood soaks through, add another layer of gauze or cloth without removing the first layer.",
  },
  {
    category: "ASTHMA",
    icon: (
      <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
        <path d="M8 12h8M8 18h8M8 6h8M18 2v20M4 6l2-2M4 12h.01M4 18l2 2"></path>
      </svg>
    ),
    tip: "If someone is having an asthma attack, help them sit upright, stay calm, and use their inhaler. If symptoms don't improve after 5-10 minutes, seek emergency help.",
  },
  {
    category: "CHOKING",
    icon: (
      <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
        <path d="M12 22a8 8 0 0 0 0-16 8 8 0 0 0 0 16z"></path>
        <path d="M12 8v4l2 2"></path>
      </svg>
    ),
    tip: "For a conscious person who's choking, perform the Heimlich maneuver by standing behind them and giving abdominal thrusts until the object is expelled.",
  },
  {
    category: "SNAKE BITE",
    icon: (
      <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
        <path d="m21.73 18-8-14a2 2 0 0 0-3.48 0l-8 14A2 2 0 0 0 4 21h16a2 2 0 0 0 1.73-3Z"></path>
        <path d="M12 9v4"></path>
        <path d="M12 17h.01"></path>
      </svg>
    ),
    tip: "Keep the bite victim calm and still. Remove jewelry and constrictive clothing. Keep the affected area below heart level if possible and seek medical help immediately.",
  },
]

// Define medical condition icons mapping
const medicalIcons = {
  "Fracture": (
    <svg xmlns="http://www.w3.org/2000/svg" width="12" height="12" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
      <path d="M18 4.5l3.5 2-3.5 2M18 17.5l3.5 2-3.5 2M6.5 4.5L3 6.5l3.5 2M6.5 19.5L3 17.5l3.5-2"></path>
      <path d="M14 5l-4 14"></path>
    </svg>
  ),
  "Cough": (
    <svg xmlns="http://www.w3.org/2000/svg" width="12" height="12" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
      <path d="M8 12h8M8 18h8M8 6h8M18 2v20M4 6l2-2M4 12h.01M4 18l2 2"></path>
    </svg>
  ),
  "Burns": (
    <svg xmlns="http://www.w3.org/2000/svg" width="12" height="12" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
      <path d="M8.5 14.5A2.5 2.5 0 0 0 11 12c0-1.38-.5-2-1-3-1.072-2.143-.224-4.054 2-6 .5 2.5 2 4.9 4 6.5 2 1.6 3 3.5 3 5.5a7 7 0 1 1-14 0c0-1.153.433-2.294 1-3a2.5 2.5 0 0 0 2.5 2.5z"></path>
    </svg>
  )
};

export default function ProfileContent() {
  const { data: session } = useSession();
  const [currentTip, setCurrentTip] = useState(allTips[0])
  const [lastUpdated, setLastUpdated] = useState("")
  const [profileData, setProfileData] = useState({
    name: "", // Add name field
    age: "",
    gender: "",
    location: "",
    medicalCondition: "",
    phone: "",
    language: "" 
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
        const response = await fetch(`/api/user/profile?userId=${session.user.id}`, {
          cache: 'no-store', // Prevent caching
          headers: {
            'Cache-Control': 'no-cache, no-store, must-revalidate'
          }
        });
        if (response.ok) {
          const data = await response.json();
          setProfileData({
            name: data.name || session?.user?.name || "", // Include name in the update
            age: data.age || "",
            gender: data.gender || "",
            location: data.location || "",
            medicalCondition: data.medicalCondition || "",
            phone: data.phone || "",
            language: data.language || ""
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
    
    // Listen for profile updates
    const handleProfileUpdate = () => {
      fetchUserProfile();
    };
    
    window.addEventListener('profileUpdated', handleProfileUpdate);
    
    return () => {
      window.removeEventListener('profileUpdated', handleProfileUpdate);
    };
  }, [session, fetchUserProfile])

  // Also add useEffect to refetch when component becomes visible
  useEffect(() => {
    const handleVisibilityChange = () => {
      if (!document.hidden && session?.user?.id) {
        fetchUserProfile();
      }
    };
    
    document.addEventListener('visibilitychange', handleVisibilityChange);
    
    return () => {
      document.removeEventListener('visibilitychange', handleVisibilityChange);
    };
  }, [session, fetchUserProfile]);

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
                {profileData.name || session?.user?.name || "LIFELINER"}
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
                <p className="text-black text-sm sm:text-base flex items-center justify-center sm:justify-start gap-2">
                  <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="#666666" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                    <rect x="3" y="4" width="18" height="18" rx="2" ry="2"></rect>
                    <line x1="16" y1="2" x2="16" y2="6"></line>
                    <line x1="8" y1="2" x2="8" y2="6"></line>
                    <line x1="3" y1="10" x2="21" y2="10"></line>
                  </svg>
                  Age: {profileData.age || "Not set"}
                </p>
                <p className="text-black text-sm sm:text-base flex items-center justify-center sm:justify-start gap-2">
                  <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="#666666" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                    <path d="M20 21v-2a4 4 0 0 0-4-4H8a4 4 0 0 0-4 4v2"></path>
                    <circle cx="12" cy="7" r="4"></circle>
                  </svg>
                  Gender: {profileData.gender || "Not set"}
                </p>
                <p className="text-black text-sm sm:text-base flex items-center justify-center sm:justify-start gap-2">
                  <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="#666666" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                    <path d="M21 10c0 7-9 13-9 13s-9-6-9-13a9 9 0 0 1 18 0z"></path>
                    <circle cx="12" cy="10" r="3"></circle>
                  </svg>
                  Location: {profileData.location || "Not set"}
                </p>
              </div>
              <div className="mt-2 sm:mt-0">
                <p className="text-black text-sm sm:text-base flex items-center justify-center sm:justify-start gap-2">
                  <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="#666666" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                    <path d="M20.42 4.58a5.4 5.4 0 0 0-7.65 0l-.77.78-.77-.78a5.4 5.4 0 0 0-7.65 0C1.46 6.7 1.33 10.28 4 13l8 8 8-8c2.67-2.72 2.54-6.3.42-8.42z"></path>
                  </svg>
                  Medical Condition: {profileData.medicalCondition || "None"}
                </p>
                <p className="text-black text-sm sm:text-base flex items-center justify-center sm:justify-start gap-2">
                  <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="#666666" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                    <path d="M22 16.92v3a2 2 0 0 1-2.18 2 19.79 19.79 0 0 1-8.63-3.07 19.5 19.5 0 0 1-6-6 19.79 19.79 0 0 1-3.07-8.67A2 2 0 0 1 4.11 2h3a2 2 0 0 1 2 1.72 12.84 12.84 0 0 0 .7 2.81 2 2 0 0 1-.45 2.11L8.09 9.91a16 16 0 0 0 6 6l1.27-1.27a2 2 0 0 1 2.11-.45 12.84 12.84 0 0 0 2.81.7A2 2 0 0 1 22 16.92z"></path>
                  </svg>
                  Contact: {profileData.phone || "Not set"}
                </p>
                <p className="text-black text-sm sm:text-base flex items-center justify-center sm:justify-start gap-2">
                  <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="#666666" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                    <path d="M5 8l6 6M9.45 5c1.81.56 3.48 1.48 4.99 2.7M16.54 8.46c.38-.38.83-.69 1.33-.92"></path>
                    <path d="M2 12.88V12a10 10 0 0 1 10-10v1a9 9 0 0 0-9 9Z"></path>
                    <path d="M14 10.25c0 .41-.13.8-.35 1.12"></path>
                    <path d="M6 12v.01C6 17 10 19 12 19c1.6 0 3.91-.38 5.21-3M20 20v.01"></path>
                  </svg>
                  Language: {profileData.language || "Not set"}
                </p>
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
            <h2 className="text-lg sm:text-xl font-bold text-black flex items-center gap-2">
              <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                <path d="M3 12h4l3 8 4-16 3 8h4"></path>
              </svg>
              Lifeline History
            </h2>
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
                    <div className="absolute left-0 w-4 sm:w-6 h-4 sm:h-6 bg-gray-300 rounded-full z-10 flex items-center justify-center">
                      {medicalIcons[item.title as keyof typeof medicalIcons] && 
                        <div className="text-gray-600">
                          {medicalIcons[item.title as keyof typeof medicalIcons]}
                        </div>
                      }
                    </div>
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
            <div className="bg-white px-4 sm:px-6 py-3 sm:py-4 flex items-center justify-center gap-2">
              <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                <circle cx="12" cy="12" r="10"></circle>
                <line x1="12" y1="16" x2="12" y2="12"></line>
                <line x1="12" y1="8" x2="12.01" y2="8"></line>
              </svg>
              <h2 className="text-lg sm:text-xl font-bold text-black text-center">DAILY TIP</h2>
            </div>

            {/* Tip Content */}
            <div className="p-4 sm:p-6">
              {/* Date indicator */}
              <div className="text-xs sm:text-sm text-gray-500 text-center mb-3 sm:mb-4 flex items-center justify-center gap-1">
                <svg xmlns="http://www.w3.org/2000/svg" width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                  <rect x="3" y="4" width="18" height="18" rx="2" ry="2"></rect>
                  <line x1="16" y1="2" x2="16" y2="6"></line>
                  <line x1="8" y1="2" x2="8" y2="6"></line>
                  <line x1="3" y1="10" x2="21" y2="10"></line>
                </svg>
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
                  className="bg-[#FFAEBB] text-black px-6 sm:px-8 py-1.5 sm:py-2 rounded-full text-xs sm:text-sm font-medium hover:bg-[#FFD3DB] transition-colors flex items-center gap-2"
                >
                  {currentTip.icon}
                  {currentTip.category}
                  <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                    <path d="M21 12a9 9 0 0 0-9-9 9.75 9.75 0 0 0-6.74 2.74L3 8"></path>
                    <path d="M3 3v5h5"></path>
                    <path d="M3 12a9 9 0 0 0 9 9 9.75 9.75 0 0 0 6.74-2.74L21 16"></path>
                    <path d="M16 21h5v-5"></path>
                  </svg>
                </button>
                <p className="text-xs text-gray-500 flex items-center gap-1">
                  <svg xmlns="http://www.w3.org/2000/svg" width="12" height="12" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                    <path d="M3 12h4l3 8 4-16 3 8h4"></path>
                  </svg>
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
