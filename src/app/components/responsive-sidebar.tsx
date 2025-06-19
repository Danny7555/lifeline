"use client"
import { User, Clock, LifeBuoy, Settings, LogOut, Menu, X, AlertTriangle, Shield } from "lucide-react"
import { useState, useEffect, useCallback } from "react"
import Link from "next/link"
import { usePathname, useRouter } from "next/navigation"
import { signOut, useSession } from "next-auth/react"
import Image from "next/image"
import { useTranslation } from "@/context/TranslationContext" 

export function ResponsiveSidebar() {
  const [sidebarOpen, setSidebarOpen] = useState(false)
  const [showLogoutModal, setShowLogoutModal] = useState(false)
  const pathname = usePathname()
  const router = useRouter()
  const { data: session } = useSession()
  const [userName, setUserName] = useState("")
  const { t } = useTranslation() // Add translation hook

  // Fetch user profile data
  const fetchUserProfile = useCallback(async () => {
    if (session?.user?.id) {
      try {
        const response = await fetch(`/api/user/profile?userId=${session.user.id}`, {
          cache: 'no-store',
          headers: {
            'Cache-Control': 'no-cache, no-store, must-revalidate'
          }
        });
        if (response.ok) {
          const data = await response.json();
          setUserName(data.name || session?.user?.name || "");
        }
      } catch (error) {
        console.error("Error fetching user profile:", error);
        // Fallback to session name if fetch fails
        setUserName(session?.user?.name || "");
      }
    }
  }, [session]);

  // Fetch profile on mount and when session changes
  useEffect(() => {
    if (session?.user?.id) {
      fetchUserProfile();
    } else {
      setUserName(session?.user?.name || "");
    }
    
    // Listen for profile updates
    const handleProfileUpdate = () => {
      fetchUserProfile();
    };
    
    window.addEventListener('profileUpdated', handleProfileUpdate);
    
    return () => {
      window.removeEventListener('profileUpdated', handleProfileUpdate);
    };
  }, [session, fetchUserProfile]);

  // Handle logout modal open
  const openLogoutModal = () => {
    setShowLogoutModal(true)
  }

  // Handle logout with NextAuth
  const handleLogout = async () => {
    try {
      // Use signOut with callbackUrl to redirect to landing page
      await signOut({ 
        callbackUrl: '/',
        redirect: true 
      })
    } catch (error) {
      console.error("Logout failed:", error)
      // Fallback redirect if signOut fails
      window.location.href = '/'
    } finally {
      setShowLogoutModal(false)
    }
  }

  const navigation = [
    { 
      name: t("sidebar.userProfile"), 
      href: "/dashboard/profile", 
      icon: User 
    },
    { 
      name: t("sidebar.lifelineHistory"), 
      href: "/dashboard/history", 
      icon: Clock 
    },
    { 
      name: t("sidebar.supportHelp"), 
      href: "/dashboard/support", 
      icon: LifeBuoy 
    },
    { 
      name: t("sidebar.settings"), 
      href: "/dashboard/settings", 
      icon: Settings 
    },
    { 
      name: t("sidebar.account"), 
      href: "/dashboard/account", 
      icon: Shield 
    },
  ]

  return (
    <>
      {/* Mobile Menu Button */}
      <button
        onClick={() => setSidebarOpen(!sidebarOpen)}
        className="lg:hidden fixed top-1 left-1 z-50 bg-[#FA9D9D] p-2 rounded-lg shadow-lg"
      >
        {sidebarOpen ? <X className="w-6 h-6" /> : <Menu className="w-4 h-4" />}
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
                alt={userName || "User"} 
                width={80}
                height={80}
                className="rounded-full w-full h-full object-cover"
              />
            ) : (
              <User className="text-black w-10 h-10" />
            )}
          </div>
          <p className="text-center text-black text-sm leading-tight">
            {t("sidebar.welcome")}<br />
            <span className="font-bold text-base">
              {userName || t("sidebar.lifeliner")}
            </span>
          </p>
        </div>

        {/* Navigation Menu */}
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
            <span className="text-sm font-medium">{t("sidebar.logout")}</span>
          </button>
        </div>
      </div>

      {/* Overlay for mobile */}
      {sidebarOpen && (
        <div className="lg:hidden fixed inset-0 bg-black bg-opacity-50 z-30" onClick={() => setSidebarOpen(false)} />
      )}

      {/* Logout Confirmation Modal - Dashboard Style */}
      {showLogoutModal && (
        <div className="fixed inset-0 flex items-center justify-center z-50">
          <div 
            className="absolute inset-0 bg-black bg-opacity-40"
            onClick={() => setShowLogoutModal(false)}
          />
          
          <div className="bg-white rounded-lg shadow-lg w-full max-w-md mx-4 z-10">
            <div className="px-6 py-4 border-b">
              <div className="flex items-center">
                <AlertTriangle className="h-5 w-5 text-red-500 mr-3" />
                <h3 className="text-lg font-medium text-gray-900">{t("sidebar.signOutConfirmation")}</h3>
              </div>
            </div>
            
            <div className="px-6 py-4">
              <p className="text-gray-600 mb-6">
                {t("sidebar.signOutConfirmationMessage")}
              </p>
            </div>
            
            <div className="px-6 py-3 bg-gray-50 flex justify-end space-x-3 rounded-b-lg">
              <button
                onClick={() => setShowLogoutModal(false)}
                className="px-4 py-2 bg-white border border-gray-300 text-gray-700 rounded hover:bg-gray-50 transition-colors"
              >
                {t("sidebar.cancel")}
              </button>
              <button
                onClick={handleLogout}
                className="px-4 py-2 bg-red-500 hover:bg-red-600 text-white rounded transition-colors flex items-center"
              >
                <LogOut className="w-4 h-4 mr-2" />
                {t("sidebar.signOut")}
              </button>
            </div>
          </div>
        </div>
      )}
    </>
  )
}
