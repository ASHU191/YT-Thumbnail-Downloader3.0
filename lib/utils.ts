import { type ClassValue, clsx } from "clsx"
import { twMerge } from "tailwind-merge"

export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs))
}

export function validateYouTubeUrl(url: string): boolean {
  if (!url || typeof url !== "string") return false

  const youtubeRegex = /^(https?:\/\/)?(www\.)?(youtube\.com\/(watch\?v=|embed\/|v\/)|youtu\.be\/)([a-zA-Z0-9_-]{11})/
  return youtubeRegex.test(url.trim())
}

export function extractVideoId(url: string): string | null {
  if (!url || typeof url !== "string") return null

  try {
    const regex = /(?:youtube\.com\/(?:[^/]+\/.+\/|(?:v|e(?:mbed)?)\/|.*[?&]v=)|youtu\.be\/)([^"&?/\s]{11})/
    const match = url.trim().match(regex)
    return match ? match[1] : null
  } catch (error) {
    console.error("Error extracting video ID:", error)
    return null
  }
}
