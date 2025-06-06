import en from './en'
import es from './es'
import fr from './fr'
import tw from './tw'
import ga from './ga'
import ar from './ar'
import ee from './ee'

// Create a function to handle missing translations
const createEmptyTranslation = () => {
  return en // Return English as fallback
}

export const translations = {
  English: en,
  French: fr,
  Spanish: es,
  Twi: tw,
  Ga: ga,
  Ewe: ee,
  Arabic: ar,
  Hausa: createEmptyTranslation(),
  Dagbani: createEmptyTranslation()
}

export type TranslationKey = keyof typeof en