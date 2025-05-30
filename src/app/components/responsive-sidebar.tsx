"use client"
import { User, Clock, LifeBuoy, Settings, LogOut, Menu, X, AlertTriangle } from "lucide-react"
import { useState } from "react"
import Link from "next/link"
import { usePathname, useRouter } from "next/navigation"
import { signOut, useSession } from "next-auth/react"
import Image from "next/image"

export function ResponsiveSidebar() {
  const [sidebarOpen, setSidebarOpen] = useState(false)
  const [showLogoutModal, setShowLogoutModal] = useState(false)
  const pathname = usePathname()
  const router = useRouter()
  const { data: session } = useSession()

  // Handle logout modal open
  const openLogoutModal = () => {
    setShowLogoutModal(true)
  }

  // Handle logout with NextAuth
  const handleLogout = async () => {
    try {
      await signOut({ redirect: false })
      router.push('/auth/signIn') // Redirect to sign in page after logout
    } catch (error) {
      console.error("Logout failed:", error)
    } finally {
      setShowLogoutModal(false)
    }
  }

  const navigation = [
    { 
      name: "User Profile", 
      href: "/dashboard/profile", 
      icon: User 
    },
    { 
      name: "Lifeline History", 
      href: "/dashboard/history", 
      icon: Clock 
    },
    { 
      name: "Support/Help", 
      href: "/dashboard/support", 
      icon: LifeBuoy 
    },
    { 
      name: "Settings", 
      href: "/dashboard/settings", 
      icon: Settings 
    },
  ]

  return (
    <>
      {/* Mobile Menu Button */}
      <button
        onClick={() => setSidebarOpen(!sidebarOpen)}
        className="lg:hidden fixed top-4 left-4 z-50 bg-[#FA9D9D] p-2 rounded-lg shadow-lg"
      >
        {sidebarOpen ? <X className="w-6 h-6" /> : <Menu className="w-6 h-6" />}
      </button>

      {/* Sidebar with increased width on desktop */}
      <div
        className={`
          ${sidebarOpen ? "translate-x-0" : "-translate-x-full"} 
          lg:translate-x-0 transition-transform duration-300 ease-in-out
          fixed lg:static inset-y-0 left-0 z-40
          w-64 lg:w-72 bg-[#FA9D9D] flex flex-col shadow-xl lg:shadow-none
          border-r-2 border-black/20
        `}
      >
        {/* User Profile Section */}
        <div className="flex flex-col items-center pt-10 pb-8 px-6">
          <div className="rounded-full bg-white border-2 border-black w-20 h-20 flex items-center justify-center mb-4 overflow-hidden">
            {session?.user?.image ? (
              <Image
                src={session.user.image} 
                alt={session.user.name || "User"} 
                width={80}
                height={80}
                className="rounded-full w-full h-full object-cover"
              />
            ) : (
              <User className="text-black w-10 h-10" />
            )}
          </div>
          <p className="text-center text-black text-sm leading-tight">
            Welcome,<br />
            <span className="font-bold text-base">
              {session?.user?.name || "LIFELINER"}
            </span>
          </p>
        </div>

        {/* Navigation Menu - Remove right padding from nav */}
        <nav className="flex-1 pl-6">
          <div className="space-y-6">
            {navigation.map((item) => {
              const isActive = pathname === item.href || pathname.startsWith(item.href)
              return (
                <div key={item.name} className="relative">
                  <Link
                    href={item.href}
                    onClick={() => setSidebarOpen(false)}
                    className={`flex items-center w-full px-4 py-3 text-left text-black rounded-lg transition-colors ${
                      isActive ? "bg-gray-200" : "hover:bg-[#FFD3DB]"
                    }`}
                  >
                    <item.icon className="mr-4 h-5 w-5" />
                    <span className="text-sm font-medium">{item.name}</span>
                  </Link>
                  {/* Active indicator at the absolute edge */}
                  {isActive && (
                    <div className="absolute right-0 top-1/2 -translate-y-1/2 w-1 h-12 bg-black" />
                  )}
                </div>
              )
            })}
          </div>
        </nav>

        {/* Logout Section with modal trigger button */}
        <div className="p-6 mt-auto">
          <button 
            onClick={openLogoutModal}
            className="flex items-center text-[#FF3B3B] px-4 py-3 hover:bg-[#FFD3DB] rounded-lg transition-colors w-full"
          >
            <LogOut className="mr-4 h-5 w-5" />
            <span className="text-sm font-medium">Log Out</span>
          </button>
        </div>
      </div>

      {/* Overlay for mobile */}
      {sidebarOpen && (
        <div className="lg:hidden fixed inset-0 bg-black bg-opacity-50 z-30" onClick={() => setSidebarOpen(false)} />
      )}

      {/* Logout Confirmation Modal */}
      {showLogoutModal && (
        <div className="fixed inset-0 flex items-center justify-center z-50">
          {/* Modal Backdrop */}
          <div 
            className="absolute inset-0 bg-black bg-opacity-50"
            onClick={() => setShowLogoutModal(false)}
          />
          
          {/* Modal Content */}
          <div className="bg-white rounded-xl shadow-2xl w-full max-w-md mx-4 z-10 overflow-hidden transform transition-all animate-fadeIn">
            {/* Modal Header with red gradient */}
            <div className="bg-gradient-to-r from-red-300 to-red-500 p-6">
              <div className="mx-auto w-16 h-16 bg-white rounded-full flex items-center justify-center mb-4">
                <AlertTriangle className="h-8 w-8 text-red-500" />
              </div>
              <h3 className="text-xl font-bold text-white text-center">Sign Out Confirmation</h3>
            </div>
            
            {/* Modal Body */}
            <div className="px-6 py-4">
              <p className="text-gray-600 text-center mb-6">
                Are you sure you want to sign out of your Lifeliner account?
              </p>
              
              {/* Modal Actions */}
              <div className="flex flex-col sm:flex-row gap-3 sm:gap-4">
                <button
                  onClick={() => setShowLogoutModal(false)}
                  className="flex-1 px-4 py-3 bg-gray-100 hover:bg-gray-200 text-gray-800 rounded-lg font-medium transition-colors"
                >
                  Cancel
                </button>
                <button
                  onClick={handleLogout}
                  className="flex-1 px-4 py-3 bg-red-500 hover:bg-red-600 text-white rounded-lg font-medium transition-colors flex items-center justify-center"
                >
                  <LogOut className="w-4 h-4 mr-2" />
                  Sign Out
                </button>
              </div>
            </div>
          </div>
        </div>
      )}
    </>
  )
}
