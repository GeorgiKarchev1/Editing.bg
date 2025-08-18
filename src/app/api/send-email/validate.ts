// Валидация на контакт формата
export interface ContactFormData {
  name: string
  email: string
  message: string
  projectType: string
}

export function validateContactForm(data: ContactFormData): { isValid: boolean; errors: string[] } {
  const errors: string[] = []

  // Валидация на името
  if (!data.name || data.name.trim().length < 2) {
    errors.push('Името трябва да е поне 2 символа')
  }

  if (data.name.length > 100) {
    errors.push('Името не може да бъде по-дълго от 100 символа')
  }

  // Валидация на имейла
  const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/
  if (!data.email || !emailRegex.test(data.email)) {
    errors.push('Моля въведете валиден имейл адрес')
  }

  // Валидация на съобщението
  if (!data.message || data.message.trim().length < 10) {
    errors.push('Съобщението трябва да е поне 10 символа')
  }

  if (data.message.length > 2000) {
    errors.push('Съобщението не може да бъде по-дълго от 2000 символа')
  }

  // Валидация на типа проект
  const validProjectTypes = [
    'YouTube Video',
    'Shorts/Reels',
    'TikTok',
    'Instagram',
    'Commercial',
    'Other'
  ]

  if (!validProjectTypes.includes(data.projectType)) {
    errors.push('Моля изберете валиден тип проект')
  }

  return {
    isValid: errors.length === 0,
    errors
  }
}

// Rate limiting функция (проста имплементация)
const rateLimitMap = new Map<string, { count: number; resetTime: number }>()

export function checkRateLimit(ip: string, limit: number = 5, windowMs: number = 15 * 60 * 1000): boolean {
  const now = Date.now()
  const userData = rateLimitMap.get(ip)

  if (!userData || now > userData.resetTime) {
    rateLimitMap.set(ip, { count: 1, resetTime: now + windowMs })
    return true
  }

  if (userData.count >= limit) {
    return false
  }

  userData.count++
  return true
}

// Sanitize функция за защита от XSS
export function sanitizeInput(input: string): string {
  return input
    .replace(/[<>]/g, '') // Премахване на < и >
    .replace(/javascript:/gi, '') // Премахване на javascript: протокол
    .trim()
}
