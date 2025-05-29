"use client"

import { User, Clock, LifeBuoy, Settings, LogOut, Menu, X } from "lucide-react"
import { useState } from "react"

interface SidebarProps {
  className?: string
  onNavigate?: (page: string) => void
}

export function Sidebar({ className = "", onNavigate }: SidebarProps) {
  const [sidebarOpen, setSidebarOpen] = useState(false)

  const handleNavigation = (page: string) => {
    onNavigate?.(page)
    setSidebarOpen(false)
  }

  return (
    <>
      {/* Mobile Menu Button */}
      <button
        onClick={() => setSidebarOpen(!sidebarOpen)}
        className="lg:hidden fixed top-4 left-4 z-50 bg-[#F5A5A5] p-2 rounded-lg shadow-lg"
      >
        {sidebarOpen ? <X className="w-6 h-6" /> : <Menu className="w-6 h-6" />}
      </button>

      {/* Sidebar */}
      <div
        className={`
          ${sidebarOpen ? "translate-x-0" : "-translate-x-full"} 
          lg:translate-x-0 transition-transform duration-300 ease-in-out
          fixed lg:static inset-y-0 left-0 z-40
          w-64 bg-[#F5A5A5] flex flex-col shadow-xl
          ${className}
        `}
      >
        <div className="flex flex-col items-center pt-8 pb-6">
          <div className="rounded-full bg-black w-16 h-16 flex items-center justify-center">
            <User className="text-white w-8 h-8" />
          </div>
          <p className="mt-4 text-center text-black px-4">
            Welcome, <span className="font-bold">LIFELINER!</span>
          </p>
        </div>

        <nav className="flex-1 px-4">
          <div className="space-y-2">
            <button
              onClick={() => handleNavigation("profile")}
              className="flex items-center w-full px-4 py-3 text-left text-black hover:bg-black/10 rounded transition-colors"
            >
              <User className="mr-3 h-5 w-5" />
              <span>User Profile</span>
            </button>

            <button
              onClick={() => handleNavigation("history")}
              className="flex items-center w-full px-4 py-3 text-left text-black hover:bg-black/10 rounded transition-colors"
            >
              <Clock className="mr-3 h-5 w-5" />
              <span>Lifeline History</span>
            </button>

            <button
              onClick={() => handleNavigation("support")}
              className="flex items-center w-full px-4 py-3 text-left text-black hover:bg-black/10 rounded transition-colors"
            >
              <LifeBuoy className="mr-3 h-5 w-5" />
              <span>Support/Help</span>
            </button>

            <button
              onClick={() => handleNavigation("settings")}
              className="flex items-center w-full px-4 py-3 text-left text-black hover:bg-black/10 rounded transition-colors"
            >
              <Settings className="mr-3 h-5 w-5" />
              <span>Settings</span>
            </button>
          </div>
        </nav>

        <div className="p-4 mt-auto">
          <button
            onClick={() => handleNavigation("logout")}
            className="flex items-center text-red-700 px-4 py-3 hover:bg-red-100 rounded transition-colors"
          >
            <LogOut className="mr-3 h-5 w-5" />
            <span>Log Out</span>
          </button>
        </div>
      </div>

      {/* Overlay for mobile */}
      {sidebarOpen && (
        <div className="lg:hidden fixed inset-0 bg-black bg-opacity-50 z-30" onClick={() => setSidebarOpen(false)} />
      )}
    </>
  )
}
