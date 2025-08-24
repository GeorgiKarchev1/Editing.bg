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

// Подобрена Rate limiting функция
interface RateLimitEntry {
  count: number
  resetTime: number
  blockedUntil?: number
}

const rateLimitMap = new Map<string, RateLimitEntry>()

// Автоматично изчистване на стари записи (за да не се запълни паметта)
setInterval(() => {
  const now = Date.now()
  for (const [ip, entry] of rateLimitMap.entries()) {
    if (now > entry.resetTime && (!entry.blockedUntil || now > entry.blockedUntil)) {
      rateLimitMap.delete(ip)
    }
  }
}, 60 * 1000) // Изчистване на всяка минута

export function checkRateLimit(
  ip: string, 
  limit: number = 5, 
  windowMs: number = 15 * 60 * 1000, // 15 минути
  blockDuration: number = 60 * 60 * 1000 // 1 час блокиране
): boolean {
  const now = Date.now()
  const userData = rateLimitMap.get(ip)

  // Ако потребителят е блокиран
  if (userData?.blockedUntil && now < userData.blockedUntil) {
    return false
  }

  // Ако няма данни или времето е изтекло
  if (!userData || now > userData.resetTime) {
    rateLimitMap.set(ip, { 
      count: 1, 
      resetTime: now + windowMs 
    })
    return true
  }

  // Ако е достигнат лимитът
  if (userData.count >= limit) {
    // Блокиране на потребителя
    userData.blockedUntil = now + blockDuration
    return false
  }

  // Увеличаване на брояча
  userData.count++
  return true
}

// Функция за проверка на оставащите опити
export function getRemainingAttempts(ip: string, limit: number = 5): number {
  const userData = rateLimitMap.get(ip)
  if (!userData) return limit
  
  const now = Date.now()
  if (now > userData.resetTime) return limit
  
  return Math.max(0, limit - userData.count)
}

// Функция за проверка на блокиране
export function isBlocked(ip: string): boolean {
  const userData = rateLimitMap.get(ip)
  if (!userData?.blockedUntil) return false
  
  const now = Date.now()
  if (now < userData.blockedUntil) return true
  
  // Премахване на блокирането ако времето е изтекло
  delete userData.blockedUntil
  return false
}

// Sanitize функция за защита от XSS
export function sanitizeInput(input: string): string {
  return input
    .replace(/[<>]/g, '') // Премахване на < и >
    .replace(/javascript:/gi, '') // Премахване на javascript: протокол
    .replace(/on\w+=/gi, '') // Премахване на event handlers
    .replace(/data:/gi, '') // Премахване на data: протокол
    .trim()
}
