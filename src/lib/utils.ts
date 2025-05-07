import { clsx, type ClassValue } from 'clsx'
import { twMerge } from 'tailwind-merge'

export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs))
}

export function getSiteTitle(text: string) {
  const title = text ? `Da/net - ${text}` : 'Da/net'
  return title
}
