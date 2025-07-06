"use client"

import Link from "next/link"
import { useRouter } from "next/navigation"
import { Youtube, User, ImageIcon, Home } from "lucide-react"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { translations, type Language, supportedLanguages } from "@/lib/translations"
import { setStoredLanguage } from "@/lib/language-utils"
import Image from "next/image"

interface NavigationStripeProps {
  currentLang: Language
  currentTool?: "thumbnail" | "profile" | "banner" | "home"
  onLanguageChange?: (lang: Language) => void
}

export default function NavigationStripe({
  currentLang,
  currentTool = "home",
  onLanguageChange,
}: NavigationStripeProps) {
  const router = useRouter()
  const t = translations[currentLang] || translations.en

  const handleLanguageChange = (newLang: Language) => {
    // Store the language preference
    setStoredLanguage(newLang)

    if (onLanguageChange) {
      onLanguageChange(newLang)
      return
    }

    try {
      const toolPaths = {
        thumbnail: "/youtube-thumbnail-downloader",
        profile: "/youtube-profile-picture-downloader",
        banner: "/youtube-banner-downloader",
        home: "/",
      }

      const basePath = toolPaths[currentTool]

      // For home page, just call onLanguageChange if available, otherwise stay on home
      if (currentTool === "home") {
        router.push("/")
        return
      }

      // For other tools, always add language path
      const newPath = `${basePath}/${newLang}`
      router.push(newPath)
    } catch (error) {
      console.error("Navigation error:", error)
      router.push("/")
    }
  }

  const getNavigationHref = (tool: string) => {
    if (tool === "home") return "/"

    const toolPaths = {
      thumbnail: "/youtube-thumbnail-downloader",
      profile: "/youtube-profile-picture-downloader",
      banner: "/youtube-banner-downloader",
    }

    const basePath = toolPaths[tool as keyof typeof toolPaths]
    return `${basePath}/${currentLang}`
  }

  const navigationItems = [
    {
      href: getNavigationHref("home"),
      icon: Home,
      label: t.nav.home || "Home",
      color: "bg-gray-500 hover:bg-gray-600",
      isActive: currentTool === "home",
    },
    {
      href: getNavigationHref("thumbnail"),
      icon: Youtube,
      label: t.nav.thumbnailDownloader,
      color: "bg-red-500 hover:bg-red-600",
      isActive: currentTool === "thumbnail",
    },
    {
      href: getNavigationHref("profile"),
      icon: User,
      label: t.nav.profilePicDownloader,
      color: "bg-blue-500 hover:bg-blue-600",
      isActive: currentTool === "profile",
    },
    {
      href: getNavigationHref("banner"),
      icon: ImageIcon,
      label: t.nav.bannerDownloader,
      color: "bg-purple-500 hover:bg-purple-600",
      isActive: currentTool === "banner",
    },
  ]

  return (
    <div className="bg-white border-b-2 border-gray-200 shadow-sm sticky top-0 z-50">
      <div className="container mx-auto px-4">
        <div className="flex items-center justify-between h-14">
          {/* Logo */}
          <div className="flex items-center space-x-2 flex-shrink-0">
            <Link href="/">
              <div className="w-28 h-8 relative overflow-hidden">
                <Image
                  src="/placeholder.svg?height=32&width=112"
                  alt="Logo"
                  fill
                  className="object-contain object-left"
                />
              </div>
            </Link>
          </div>

          {/* Navigation Items */}
          <div className="flex items-center space-x-1 flex-1 justify-center">
            {navigationItems.map((item) => {
              const IconComponent = item.icon
              return (
                <Link
                  key={item.href}
                  href={item.href}
                  className={`
                    flex items-center space-x-2 px-3 py-2 rounded-md text-sm font-medium transition-all
                    ${
                      item.isActive
                        ? `${item.color} text-white shadow-md`
                        : "text-gray-600 hover:text-gray-900 hover:bg-gray-100"
                    }
                  `}
                >
                  <IconComponent className="h-4 w-4" />
                  <span className="hidden sm:inline">{item.label}</span>
                </Link>
              )
            })}
          </div>

          {/* Language Selector */}
          <div className="flex items-center flex-shrink-0">
            <Select value={currentLang} onValueChange={handleLanguageChange}>
              <SelectTrigger className="w-32 border-2 hover:border-red-300 transition-colors">
                <SelectValue />
              </SelectTrigger>
              <SelectContent className="w-32">
                {supportedLanguages.map((lang) => (
                  <SelectItem key={lang.code} value={lang.code} className="cursor-pointer">
                    <div className="flex items-center gap-2">
                      <span className="text-sm">{lang.flag}</span>
                      <span className="font-medium text-sm">{lang.shortName}</span>
                    </div>
                  </SelectItem>
                ))}
              </SelectContent>
            </Select>
          </div>
        </div>
      </div>
    </div>
  )
}
