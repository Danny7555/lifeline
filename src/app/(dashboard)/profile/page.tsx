"use client";
import { User, ChevronRight } from "lucide-react"
import { useState, useEffect } from "react"

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

export default function ProfilePage() {
  const [currentTip, setCurrentTip] = useState(allTips[0])
  const [lastUpdated, setLastUpdated] = useState("")

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

  // Set initial tip on component mount
  useEffect(() => {
    getDailyTip()
  }, [])

  return (
    <div className="flex-1 p-4 sm:p-6 lg:p-8 overflow-auto">
      <h1 className="text-2xl font-bold mb-6 text-black">Profile</h1>

      {/* Profile Card - Centered with better spacing */}
      <div className="bg-white border border-gray-700 rounded-2xl p-6 mb-8 max-w-4xl mx-auto">
        <div className="flex items-start gap-6">
          <div className="rounded-full bg-white border-2 border-black w-20 h-20 flex items-center justify-center shrink-0">
            <User className="text-black w-10 h-10" />
          </div>

          <div className="flex-1">
            <h2 className="text-xl font-bold text-black mb-4">LIFELINER</h2>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-x-16 gap-y-2">
              <div>
                <p className="text-black text-base">Age: 45</p>
                <p className="text-black text-base">Gender: Female</p>
                <p className="text-black text-base">Location: Nowhere</p>
              </div>
              <div>
                <p className="text-black text-base">Medical Condition: Asthma</p>
                <p className="text-black text-base">Emergency Contact: 0203430787</p>
                <p className="text-black text-base">Language: Frafra</p>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Content Grid */}
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
        {/* Lifeline History */}
        <div className="lg:col-span-2">
          <div className="flex justify-between items-center mb-4">
            <h2 className="text-xl font-bold text-black">Lifeline History</h2>
            <button className="bg-[#FFAEBB] text-black px-6 py-2 rounded-full text-sm hover:bg-[#FFD3DB] transition-colors">
              View All
            </button>
          </div>

          {/* Timeline */}
          <div className="bg-white border border-gray-700 rounded-2xl p-6">
            <h3 className="font-bold mb-6 text-black">Timeline</h3>
            <div className="relative">
              {/* Timeline line */}
              <div className="absolute left-3 top-0 bottom-0 w-0.5 bg-gray-300"></div>

              {/* Timeline items */}
              <div className="space-y-6">
                {[
                  { title: "Fracture", date: "02, May, 2025" },
                  { title: "Cough", date: "02, May, 2025" },
                  { title: "Burns", date: "02, May, 2025" }
                ].map((item, index) => (
                  <div key={index} className="relative flex items-center">
                    <div className="absolute left-0 w-6 h-6 bg-gray-300 rounded-full z-10"></div>
                    <div className="ml-12 flex-1 bg-white border border-gray-700 rounded-lg p-4 flex justify-between items-center">
                      <div>
                        <h4 className="font-medium text-black text-base">{item.title}</h4>
                        <p className="text-gray-600 text-sm">Last Visited: {item.date}</p>
                      </div>
                      <button className="text-[#FFAEBB] rounded-full border border-[#FFAEBB] w-8 h-8 flex items-center justify-center hover:bg-[#FFD3DB] transition-colors">
                        <ChevronRight className="w-4 h-4" />
                      </button>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </div>

        {/* Improved Daily Tip Card */}
        <div className="lg:col-span-1">
          <div className="bg-white border border-gray-700 rounded-2xl overflow-hidden">
            {/* Header with accent color */}
            <div className="bg-white px-6 py-4">
              <h2 className="text-xl font-bold text-black text-center">DAILY TIP</h2>
            </div>

            {/* Tip Content */}
            <div className="p-6">
              {/* Date indicator */}
              <div className="text-sm text-gray-500 text-center mb-4">
                {lastUpdated}
              </div>

              {/* Tip text */}
              <div className="bg-gray-50 rounded-xl p-5 mb-6">
                <p className="text-black text-base leading-relaxed text-center">
                  {currentTip.tip}
                </p>
              </div>

              {/* Category button */}
              <div className="flex flex-col items-center gap-2">
                <button 
                  className="bg-[#FFAEBB] text-black px-8 py-2 rounded-full text-sm font-medium hover:bg-[#FFD3DB] transition-colors"
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
