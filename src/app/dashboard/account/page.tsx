"use client"

import { useState } from "react"
import { useRouter } from "next/navigation"
import { useSession, signOut } from "next-auth/react"
import { AlertTriangle, Info, ArrowLeft } from "lucide-react"
import { useTranslation } from "@/context/TranslationContext"

export default function AccountPage() {
  const router = useRouter()
  const { data: session } = useSession()
  const { t } = useTranslation()
  const [showDeactivateModal, setShowDeactivateModal] = useState(false)
  const [showDeleteModal, setShowDeleteModal] = useState(false)
  const [isLoading, setIsLoading] = useState(false)
  const [error, setError] = useState("")

  // Handle account deactivation
  const handleDeactivateAccount = async () => {
    if (!session?.user?.id) return
    
    setIsLoading(true)
    setError("")
    
    try {
      const response = await fetch("/api/user/deactivate", {
        method: "POST",
        headers: {
          "Content-Type": "application/json"
        },
        body: JSON.stringify({ userId: session.user.id })
      })
      
      if (response.ok) {
        // Sign out user after successful deactivation
        await signOut({ callbackUrl: "/" })
      } else {
        const data = await response.json()
        setError(data.message || "Failed to deactivate account")
        setShowDeactivateModal(false)
      }
    } catch (err) {
      console.error("Error deactivating account:", err)
      setError("An unexpected error occurred")
      setShowDeactivateModal(false)
    } finally {
      setIsLoading(false)
    }
  }

  // Handle account deletion
  const handleDeleteAccount = async () => {
    if (!session?.user?.id) return
    
    setIsLoading(true)
    setError("")
    
    try {
      const response = await fetch("/api/user/delete", {
        method: "DELETE",
        headers: {
          "Content-Type": "application/json"
        },
        body: JSON.stringify({ userId: session.user.id })
      })
      
      if (response.ok) {
        // Sign out user after successful deletion
        await signOut({ callbackUrl: "/" })
      } else {
        const data = await response.json()
        setError(data.message || "Failed to delete account")
        setShowDeleteModal(false)
      }
    } catch (err) {
      console.error("Error deleting account:", err)
      setError("An unexpected error occurred")
      setShowDeleteModal(false)
    } finally {
      setIsLoading(false)
    }
  }

  return (
    <div className="container mx-auto px-4 py-8 max-w-4xl">
      <div className="flex items-center mb-6">
        <button 
          onClick={() => router.back()}
          className="mr-4 text-gray-600 hover:text-gray-900"
        >
          <ArrowLeft className="h-5 w-5" />
        </button>
        <h1 className="text-2xl font-bold">{t("account.title")}</h1>
      </div>
      
      {error && (
        <div className="bg-red-100 border-l-4 border-red-500 text-red-700 p-4 mb-6">
          <div className="flex items-center">
            <AlertTriangle className="h-5 w-5 mr-2" />
            <p>{error}</p>
          </div>
        </div>
      )}
      
      <div className="bg-white rounded-xl shadow-md p-6 mb-8">
        <h2 className="text-xl font-semibold mb-4">{t("account.manageAccount")}</h2>
        <p className="text-gray-600 mb-6">{t("account.manageAccountDescription")}</p>
        
        <div className="space-y-6">
          {/* Deactivate Account Section */}
          <div className="border-t pt-6">
            <h3 className="text-lg font-medium text-gray-900 mb-2">{t("account.deactivateAccount")}</h3>
            <p className="text-gray-600 mb-4">{t("account.deactivateAccountDescription")}</p>
            <button
              onClick={() => setShowDeactivateModal(true)}
              className="px-4 py-2 bg-amber-500 hover:bg-amber-600 text-white rounded-lg transition-colors"
              disabled={isLoading}
            >
              {isLoading ? t("common.processing") : t("account.deactivateAccount")}
            </button>
          </div>
          
          {/* Delete Account Section */}
          <div className="border-t pt-6">
            <h3 className="text-lg font-medium text-red-600 mb-2">{t("account.deleteAccount")}</h3>
            <p className="text-gray-600 mb-4">{t("account.deleteAccountDescription")}</p>
            <div className="bg-red-50 border-l-4 border-red-500 p-4 mb-4">
              <div className="flex">
                <Info className="h-5 w-5 text-red-500 mr-3" />
                <p className="text-sm text-red-700">{t("account.deleteAccountWarning")}</p>
              </div>
            </div>
            <button
              onClick={() => setShowDeleteModal(true)}
              className="px-4 py-2 bg-red-500 hover:bg-red-600 text-white rounded-lg transition-colors flex items-center"
              disabled={isLoading}
            >
              {isLoading ? (
                t("common.processing")
              ) : (
                <>
                  <AlertTriangle className="h-4 w-4 mr-2" />
                  {t("account.deleteAccount")}
                </>
              )}
            </button>
          </div>
        </div>
      </div>
      
      {/* Deactivate Account Modal - Dashboard style */}
      {showDeactivateModal && (
        <div className="fixed inset-0 flex items-center justify-center z-50">
          <div 
            className="absolute inset-0 bg-black bg-opacity-40"
            onClick={() => !isLoading && setShowDeactivateModal(false)}
          />
          
          <div className="bg-white rounded-lg shadow-lg w-full max-w-md mx-4 z-10">
            <div className="px-6 py-4 border-b">
              <div className="flex items-center">
                <AlertTriangle className="h-5 w-5 text-amber-500 mr-3" />
                <h3 className="text-lg font-medium text-gray-900">{t("account.deactivateConfirmation")}</h3>
              </div>
            </div>
            
            <div className="px-6 py-4">
              <p className="text-gray-600 mb-6">
                {t("account.deactivateConfirmationMessage")}
              </p>
            </div>
            
            <div className="px-6 py-3 bg-gray-50 flex justify-end space-x-3 rounded-b-lg">
              <button
                onClick={() => !isLoading && setShowDeactivateModal(false)}
                className="px-4 py-2 bg-white border border-gray-300 text-gray-700 rounded hover:bg-gray-50 transition-colors"
                disabled={isLoading}
              >
                {t("common.cancel")}
              </button>
              <button
                onClick={handleDeactivateAccount}
                className="px-4 py-2 bg-amber-500 hover:bg-amber-600 text-white rounded transition-colors"
                disabled={isLoading}
              >
                {isLoading ? t("common.processing") : t("account.deactivate")}
              </button>
            </div>
          </div>
        </div>
      )}
      
      {/* Delete Account Modal - Dashboard style */}
      {showDeleteModal && (
        <div className="fixed inset-0 flex items-center justify-center z-50">
          <div 
            className="absolute inset-0 bg-black bg-opacity-40"
            onClick={() => !isLoading && setShowDeleteModal(false)}
          />
          
          <div className="bg-white rounded-lg shadow-lg w-full max-w-md mx-4 z-10">
            <div className="px-6 py-4 border-b">
              <div className="flex items-center">
                <AlertTriangle className="h-5 w-5 text-red-500 mr-3" />
                <h3 className="text-lg font-medium text-gray-900">{t("account.deleteConfirmation")}</h3>
              </div>
            </div>
            
            <div className="px-6 py-4">
              <div className="bg-red-50 border-l-4 border-red-500 p-3 mb-4">
                <div className="flex">
                  <Info className="h-5 w-5 text-red-500 mr-2 flex-shrink-0" />
                  <p className="text-sm text-red-700">{t("account.deleteAccountWarning")}</p>
                </div>
              </div>
              
              <p className="text-gray-600">
                {t("account.deleteConfirmationMessage")}
              </p>
            </div>
            
            <div className="px-6 py-3 bg-gray-50 flex justify-end space-x-3 rounded-b-lg">
              <button
                onClick={() => !isLoading && setShowDeleteModal(false)}
                className="px-4 py-2 bg-white border border-gray-300 text-gray-700 rounded hover:bg-gray-50 transition-colors"
                disabled={isLoading}
              >
                {t("common.cancel")}
              </button>
              <button
                onClick={handleDeleteAccount}
                className="px-4 py-2 bg-red-500 hover:bg-red-600 text-white rounded transition-colors"
                disabled={isLoading}
              >
                {isLoading ? t("common.processing") : t("account.delete")}
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  )
}