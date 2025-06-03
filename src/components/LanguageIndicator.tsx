"use client";
import { useTranslation } from "@/context/TranslationContext";

export default function LanguageIndicator() {
  const { currentLanguage } = useTranslation();
  
  return (
    <div className="fixed bottom-4 right-4 bg-gray-800 text-white px-3 py-1 rounded-full text-xs opacity-60 hover:opacity-100 transition-opacity">
      {currentLanguage}
    </div>
  );
}