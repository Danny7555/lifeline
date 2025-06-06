"use client"
import { useState, useEffect } from "react"
import { useSession } from "next-auth/react"
import { useRouter } from "next/navigation"
import { Globe } from "lucide-react"

const languages = [
  { code: "en", name: "English", nativeName: "English" },
  { code: "fr", name: "French", nativeName: "Français" },
  { code: "es", name: "Spanish", nativeName: "Español" },
  { code: "ar", name: "Arabic", nativeName: "العربية" },
  { code: "tw", name: "Twi", nativeName: "Twi" },
  { code: "ga", name: "Ga", nativeName: "Ga" },
  { code: "ee", name: "Ewe", nativeName: "Eʋegbe" },
  { code: "ha", name: "Hausa", nativeName: "Hausa" },
  { code: "da", name: "Dagbani", nativeName: "Dagbani" }
]

export default function LanguageSettings() {
  const { data: session } = useSession()
  const router = useRouter()
  const [selectedLanguage, setSelectedLanguage] = useState("en")
  const [loading, setLoading] = useState(false)
  const [message, setMessage] = useState({ type: "", text: "" })

  useEffect(() => {
    // Get saved language preference
    const savedLang = localStorage.getItem("userLanguage") || "en"
    setSelectedLanguage(savedLang)
  }, [])

  const handleLanguageChange = async (langCode: string) => {
    setLoading(true)
    setMessage({ type: "", text: "" })

    try {
      // Update language preference in the database
      const response = await fetch("/api/user/language", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          userId: session?.user?.id,
          language: langCode,
        }),
      })

      if (!response.ok) {
        throw new Error("Failed to update language preference")
      }

      // Save language preference locally
      localStorage.setItem("userLanguage", langCode)
      setSelectedLanguage(langCode)

      setMessage({
        type: "success",
        text: "Language preference updated successfully!",
      })

      // Refresh the page after a short delay to apply new language
      setTimeout(() => {
        window.location.reload()
      }, 1500)
    } catch (error) {
      setMessage({
        type: "error",
        text: "Failed to update language preference",
      })
    } finally {
      setLoading(false)
    }
  }

  return (
    <div className="bg-gray-50 min-h-screen">
      <div className="flex-1 p-4 sm:p-6 lg:p-8">
        <div className="max-w-4xl mx-auto pt-16 lg:pt-0">
          {/* Header */}
          <div className="bg-white rounded-2xl shadow-md p-6 mb-8">
            <h1 className="text-2xl font-bold flex items-center gap-2">
              <Globe className="w-6 h-6" />
              Language Settings
            </h1>
            <p className="text-gray-600 mt-2">
              Choose your preferred language for the dashboard
            </p>
          </div>

          {/* Message Alert */}
          {message.text && (
            <div
              className={`mb-6 p-4 rounded-lg ${
                message.type === "success"
                  ? "bg-green-100 text-green-800"
                  : "bg-red-100 text-red-800"
              }`}
            >
              {message.text}
            </div>
          )}

          {/* Language Grid */}
          <div className="bg-white rounded-2xl shadow-md p-6">
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
              {languages.map((lang) => (
                <button
                  key={lang.code}
                  onClick={() => handleLanguageChange(lang.code)}
                  className={`p-4 rounded-lg border-2 transition-all ${
                    selectedLanguage === lang.code
                      ? "border-[#F5A5A5] bg-[#F5A5A5]/10"
                      : "border-gray-200 hover:border-[#F5A5A5] hover:bg-[#F5A5A5]/5"
                  }`}
                  disabled={loading}
                >
                  <div className="font-medium text-lg">{lang.name}</div>
                  <div className="text-gray-600 text-sm">{lang.nativeName}</div>
                </button>
              ))}
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}