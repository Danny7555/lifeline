"use client"
import React, { createContext, useContext, useState, useEffect } from "react"
import { translations } from "@/translations"

type TranslationContextType = {
  t: (key: string) => string
  currentLanguage: string
  setLanguage: (lang: string) => void
}

const TranslationContext = createContext<TranslationContextType>({
  t: () => "",
  currentLanguage: "English",
  setLanguage: () => {},
})

export function TranslationProvider({ children }: { children: React.ReactNode }) {
  const [currentLanguage, setCurrentLanguage] = useState("English")
  const [translationObj, setTranslationObj] = useState(translations.English || {})

  useEffect(() => {
    // Get language from localStorage on initial load
    try {
      const savedLang = localStorage.getItem("profileLanguage") || "English"
      console.log("Loading language:", savedLang)
      setCurrentLanguage(savedLang)
      setTranslationObj(translations[savedLang as keyof typeof translations] || translations.English)
    } catch (error) {
      console.error("Error loading language:", error)
    }
    
    // Listen for storage events (changes from other tabs)
    const handleStorageChange = (e: StorageEvent) => {
      if (e.key === "profileLanguage" && e.newValue) {
        console.log("Language changed in another tab:", e.newValue)
        setCurrentLanguage(e.newValue)
        setTranslationObj(translations[e.newValue as keyof typeof translations] || translations.English)
      }
    }
    
    window.addEventListener("storage", handleStorageChange)
    return () => window.removeEventListener("storage", handleStorageChange)
  }, [])

  const setLanguage = (lang: string) => {
    console.log("Setting language to:", lang)
    try {
      setCurrentLanguage(lang)
      const newTranslations = translations[lang as keyof typeof translations] || translations.English
      setTranslationObj(newTranslations)
      localStorage.setItem("profileLanguage", lang)
    } catch (error) {
      console.error("Error setting language:", error)
    }
  }

  const t = (key: string): string => {
    if (!key) return ""
    
    try {
      const keys = key.split(".")
      let result: any = translationObj
      
      for (const k of keys) {
        result = result?.[k]
        if (result === undefined) {
          // Try to fallback to English
          let fallback: any = translations.English
          for (const fk of keys) {
            fallback = fallback?.[fk]
            if (fallback === undefined) {
              console.warn(`Translation key not found: ${key}`)
              return key
            }
          }
          return fallback
        }
      }
      
      return result
    } catch (error) {
      console.error("Translation error for key:", key, error)
      return key
    }
  }

  return (
    <TranslationContext.Provider value={{ t, currentLanguage, setLanguage }}>
      {children}
    </TranslationContext.Provider>
  )
}

export const useTranslation = () => useContext(TranslationContext)