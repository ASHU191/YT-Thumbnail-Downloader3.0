"use client"

import Link from "next/link"
import { useState, useEffect } from "react"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Youtube, User, ImageIcon, ArrowRight, Star, Zap, Shield, Download, Play } from "lucide-react"
import { translations, type Language, supportedLanguages } from "@/lib/translations"
import { getStoredLanguage, setStoredLanguage, getBrowserLanguage } from "@/lib/language-utils"
import NavigationStripe from "@/components/navigation-stripe"

export default function HomePage() {
  const [currentLang, setCurrentLang] = useState<Language>("en")
  const [isLoaded, setIsLoaded] = useState(false)

  useEffect(() => {
    // Get language from localStorage or browser
    const storedLang = getStoredLanguage()
    const browserLang = getBrowserLanguage()
    const preferredLang = storedLang !== "en" ? storedLang : browserLang

    setCurrentLang(preferredLang)
    setIsLoaded(true)
  }, [])

  const handleLanguageChange = (newLang: Language) => {
    setCurrentLang(newLang)
    setStoredLanguage(newLang)
  }

  // Don't render until language is loaded to prevent flash
  if (!isLoaded) {
    return (
      <div className="min-h-screen bg-gradient-to-br from-slate-50 via-white to-slate-100">
        <div className="flex items-center justify-center min-h-screen">
          <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-red-600"></div>
        </div>
      </div>
    )
  }

  const t = translations[currentLang]

  const tools = [
    {
      title: t.nav.thumbnailDownloader,
      description: t.description,
      href: `/youtube-thumbnail-downloader/${currentLang}`,
      icon: Youtube,
      gradient: "from-red-500 to-red-600",
      hoverGradient: "hover:from-red-600 hover:to-red-700",
      bgColor: "bg-red-50",
      iconColor: "text-red-600",
      stats: t.home.stats.hdThumbnail,
    },
    {
      title: t.nav.profilePicDownloader,
      description: t.profilePic.description,
      href: `/youtube-profile-picture-downloader/${currentLang}`,
      icon: User,
      gradient: "from-blue-500 to-blue-600",
      hoverGradient: "hover:from-blue-600 hover:to-blue-700",
      bgColor: "bg-blue-50",
      iconColor: "text-blue-600",
      stats: t.home.stats.profileOptimized,
    },
    {
      title: t.nav.bannerDownloader,
      description: t.banner.description,
      href: `/youtube-banner-downloader/${currentLang}`,
      icon: ImageIcon,
      gradient: "from-purple-500 to-purple-600",
      hoverGradient: "hover:from-purple-600 hover:to-purple-700",
      bgColor: "bg-purple-50",
      iconColor: "text-purple-600",
      stats: t.home.stats.bannerReady,
    },
  ]

  const features = [
    {
      icon: Zap,
      title: t.home.features.lightningFast,
      description: t.home.features.lightningFastDesc,
      color: "text-yellow-600",
      bg: "bg-yellow-50",
    },
    {
      icon: Shield,
      title: t.home.features.free,
      description: t.home.features.freeDesc,
      color: "text-green-600",
      bg: "bg-green-50",
    },
    {
      icon: Star,
      title: t.home.features.hdQuality,
      description: t.home.features.hdQualityDesc,
      color: "text-purple-600",
      bg: "bg-purple-50",
    },
  ]

  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-50 via-white to-slate-100">
      {/* Navigation Stripe */}
      <NavigationStripe currentLang={currentLang} currentTool="home" onLanguageChange={handleLanguageChange} />

      {/* Hero Section */}
      <section className="py-12 md:py-20 px-4">
        <div className="container mx-auto text-center">
          <div className="max-w-4xl mx-auto">
            <h1 className="text-4xl md:text-6xl lg:text-7xl font-bold mb-6">
              <span className="bg-gradient-to-r from-red-600 via-purple-600 to-blue-600 bg-clip-text text-transparent">
                {t.home.heroTitle}
              </span>
              <br />
              <span className="text-gray-900">{t.home.heroSubtitle}</span>
            </h1>
            <p className="text-lg md:text-xl text-gray-600 mb-8 max-w-2xl mx-auto leading-relaxed">
              {t.home.heroDescription}
            </p>

            {/* Quick Stats */}
            <div className="flex flex-wrap justify-center gap-4 md:gap-8 mb-12">
              <div className="flex items-center gap-2 bg-white/60 backdrop-blur-sm rounded-full px-4 py-2 border border-gray-200/50">
                <Download className="h-4 w-4 text-green-600" />
                <span className="text-sm font-medium text-gray-700">{t.home.features.instantDownload}</span>
              </div>
              <div className="flex items-center gap-2 bg-white/60 backdrop-blur-sm rounded-full px-4 py-2 border border-gray-200/50">
                <Shield className="h-4 w-4 text-blue-600" />
                <span className="text-sm font-medium text-gray-700">{t.home.features.free}</span>
              </div>
              <div className="flex items-center gap-2 bg-white/60 backdrop-blur-sm rounded-full px-4 py-2 border border-gray-200/50">
                <Star className="h-4 w-4 text-purple-600" />
                <span className="text-sm font-medium text-gray-700">{t.home.features.hdQuality}</span>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Tools Section */}
      <section className="py-12 px-4">
        <div className="container mx-auto">
          <div className="text-center mb-12">
            <h2 className="text-3xl md:text-4xl font-bold text-gray-900 mb-4">{t.home.chooseToolTitle}</h2>
            <p className="text-lg text-gray-600 max-w-2xl mx-auto">{t.home.chooseToolDescription}</p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-6 lg:gap-8 max-w-6xl mx-auto">
            {tools.map((tool, index) => {
              const IconComponent = tool.icon
              return (
                <Card
                  key={index}
                  className="group relative overflow-hidden border-0 shadow-lg hover:shadow-2xl transition-all duration-500 transform hover:-translate-y-2"
                >
                  <div
                    className={`absolute inset-0 bg-gradient-to-br ${tool.gradient} opacity-0 group-hover:opacity-5 transition-opacity duration-500`}
                  />

                  <CardHeader className="text-center pb-4 relative">
                    <div
                      className={`inline-flex items-center justify-center w-16 h-16 ${tool.bgColor} rounded-2xl mb-4 mx-auto group-hover:scale-110 transition-transform duration-300`}
                    >
                      <IconComponent className={`h-8 w-8 ${tool.iconColor}`} />
                    </div>
                    <CardTitle className="text-xl font-bold text-gray-900 mb-2 group-hover:text-gray-800">
                      {tool.title}
                    </CardTitle>
                    <CardDescription className="text-gray-600 text-sm leading-relaxed">
                      {tool.description}
                    </CardDescription>
                  </CardHeader>

                  <CardContent className="pt-0 pb-6">
                    <div className="text-center mb-6">
                      <span
                        className={`inline-block ${tool.bgColor} ${tool.iconColor} text-xs font-semibold px-3 py-1 rounded-full`}
                      >
                        {tool.stats}
                      </span>
                    </div>

                    <Link href={tool.href}>
                      <Button
                        className={`w-full bg-gradient-to-r ${tool.gradient} ${tool.hoverGradient} text-white border-0 shadow-lg hover:shadow-xl transition-all duration-300 group-hover:scale-105`}
                      >
                        {t.thumbnails.download}
                        <ArrowRight className="h-4 w-4 ml-2 group-hover:translate-x-1 transition-transform" />
                      </Button>
                    </Link>
                  </CardContent>
                </Card>
              )
            })}
          </div>
        </div>
      </section>

      {/* Features Section */}
      <section className="py-12 px-4 bg-gradient-to-r from-gray-50 to-white">
        <div className="container mx-auto">
          <div className="text-center mb-12">
            <h2 className="text-3xl md:text-4xl font-bold text-gray-900 mb-4">{t.home.whyChooseTitle}</h2>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-8 max-w-4xl mx-auto">
            {features.map((feature, index) => {
              const IconComponent = feature.icon
              return (
                <div key={index} className="text-center group">
                  <div
                    className={`inline-flex items-center justify-center w-16 h-16 ${feature.bg} rounded-2xl mb-4 group-hover:scale-110 transition-transform duration-300`}
                  >
                    <IconComponent className={`h-8 w-8 ${feature.color}`} />
                  </div>
                  <h3 className="text-xl font-semibold text-gray-900 mb-2">{feature.title}</h3>
                  <p className="text-gray-600 text-sm leading-relaxed">{feature.description}</p>
                </div>
              )
            })}
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="py-16 px-4 bg-gradient-to-r from-red-500 via-purple-500 to-blue-500">
        <div className="container mx-auto text-center">
          <div className="max-w-3xl mx-auto">
            <h2 className="text-3xl md:text-4xl font-bold text-white mb-4">{t.home.readyTitle}</h2>
            <p className="text-lg text-white/90 mb-8">{t.home.readyDescription}</p>
            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <Link href={`/youtube-thumbnail-downloader/${currentLang}`}>
                <Button
                  size="lg"
                  className="bg-white text-gray-900 hover:bg-gray-100 shadow-xl hover:shadow-2xl transition-all duration-300"
                >
                  <Youtube className="h-5 w-5 mr-2" />
                  {t.home.downloadThumbnails}
                </Button>
              </Link>
              <Link href={`/youtube-profile-picture-downloader/${currentLang}`}>
                <Button
                  size="lg"
                  variant="outline"
                  className="border-white text-white hover:bg-white hover:text-gray-900 transition-all duration-300 bg-transparent"
                >
                  <User className="h-5 w-5 mr-2" />
                  {t.home.getProfilePics}
                </Button>
              </Link>
            </div>
          </div>
        </div>
      </section>

      {/* Footer */}
      <footer className="bg-gray-900 text-white py-12 px-4">
        <div className="container mx-auto">
          <div className="grid grid-cols-1 md:grid-cols-4 gap-8">
            <div className="md:col-span-2">
              <div className="flex items-center space-x-3 mb-4">
                <div className="w-8 h-8 bg-gradient-to-br from-red-500 to-purple-600 rounded-lg flex items-center justify-center">
                  <Play className="h-4 w-4 text-white" />
                </div>
                <span className="text-xl font-bold">YT Tools</span>
              </div>
              <p className="text-gray-400 mb-4 max-w-md">{t.home.footer.description}</p>
            </div>
            <div>
              <h4 className="text-lg font-semibold mb-4">{t.home.footer.tools}</h4>
              <ul className="space-y-2">
                <li>
                  <Link
                    href={`/youtube-thumbnail-downloader/${currentLang}`}
                    className="text-gray-400 hover:text-white transition-colors text-sm"
                  >
                    {t.nav.thumbnailDownloader}
                  </Link>
                </li>
                <li>
                  <Link
                    href={`/youtube-profile-picture-downloader/${currentLang}`}
                    className="text-gray-400 hover:text-white transition-colors text-sm"
                  >
                    {t.nav.profilePicDownloader}
                  </Link>
                </li>
                <li>
                  <Link
                    href={`/youtube-banner-downloader/${currentLang}`}
                    className="text-gray-400 hover:text-white transition-colors text-sm"
                  >
                    {t.nav.bannerDownloader}
                  </Link>
                </li>
              </ul>
            </div>
            <div>
              <h4 className="text-lg font-semibold mb-4">{t.home.footer.languages}</h4>
              <div className="flex flex-wrap gap-2">
                {supportedLanguages.slice(0, 3).map((lang) => (
                  <button
                    key={lang.code}
                    onClick={() => handleLanguageChange(lang.code)}
                    className={`text-xs px-2 py-1 rounded transition-colors ${
                      currentLang === lang.code
                        ? "bg-red-600 text-white"
                        : "bg-gray-800 hover:bg-gray-700 text-gray-300"
                    }`}
                  >
                    {lang.flag} {lang.shortName}
                  </button>
                ))}
              </div>
            </div>
          </div>
          <div className="border-t border-gray-800 mt-8 pt-8 text-center">
            <p className="text-gray-400 text-sm">{t.footer.copyright}</p>
            <p className="text-gray-500 text-xs mt-2">{t.footer.disclaimer}</p>
          </div>
        </div>
      </footer>
    </div>
  )
}
