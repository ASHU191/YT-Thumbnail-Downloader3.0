import type { Language } from "./translations"

export const getStoredLanguage = (): Language => {
  if (typeof window === "undefined") return "en"

  try {
    const stored = localStorage.getItem("preferred-language")
    if (stored && ["en", "es", "fr", "de", "pt"].includes(stored)) {
      return stored as Language
    }
  } catch (error) {
    console.error("Error reading language from localStorage:", error)
  }

  return "en"
}

export const setStoredLanguage = (language: Language): void => {
  if (typeof window === "undefined") return

  try {
    localStorage.setItem("preferred-language", language)
  } catch (error) {
    console.error("Error storing language in localStorage:", error)
  }
}

export const getBrowserLanguage = (): Language => {
  if (typeof window === "undefined") return "en"

  try {
    const browserLang = navigator.language.split("-")[0]
    if (["en", "es", "fr", "de", "pt"].includes(browserLang)) {
      return browserLang as Language
    }
  } catch (error) {
    console.error("Error detecting browser language:", error)
  }

  return "en"
}
