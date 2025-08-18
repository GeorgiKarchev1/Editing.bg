import { validateContactForm, sanitizeInput, checkRateLimit } from './validate'

// Тестове за валидация
describe('Contact Form Validation', () => {
  test('валидни данни', () => {
    const validData = {
      name: 'Иван Иванов',
      email: 'ivan@example.com',
      message: 'Това е тестово съобщение с повече от 10 символа',
      projectType: 'YouTube Video'
    }

    const result = validateContactForm(validData)
    expect(result.isValid).toBe(true)
    expect(result.errors).toHaveLength(0)
  })

  test('невалидно име', () => {
    const invalidData = {
      name: 'А',
      email: 'ivan@example.com',
      message: 'Това е тестово съобщение',
      projectType: 'YouTube Video'
    }

    const result = validateContactForm(invalidData)
    expect(result.isValid).toBe(false)
    expect(result.errors).toContain('Името трябва да е поне 2 символа')
  })

  test('невалиден имейл', () => {
    const invalidData = {
      name: 'Иван Иванов',
      email: 'invalid-email',
      message: 'Това е тестово съобщение',
      projectType: 'YouTube Video'
    }

    const result = validateContactForm(invalidData)
    expect(result.isValid).toBe(false)
    expect(result.errors).toContain('Моля въведете валиден имейл адрес')
  })

  test('кратко съобщение', () => {
    const invalidData = {
      name: 'Иван Иванов',
      email: 'ivan@example.com',
      message: 'Кратко',
      projectType: 'YouTube Video'
    }

    const result = validateContactForm(invalidData)
    expect(result.isValid).toBe(false)
    expect(result.errors).toContain('Съобщението трябва да е поне 10 символа')
  })
})

// Тестове за sanitize
describe('Input Sanitization', () => {
  test('премахване на HTML тагове', () => {
    const input = '<script>alert("xss")</script>Hello'
    const result = sanitizeInput(input)
    expect(result).toBe('scriptalert("xss")/scriptHello')
  })

  test('премахване на javascript протокол', () => {
    const input = 'javascript:alert("xss")'
    const result = sanitizeInput(input)
    expect(result).toBe('alert("xss")')
  })

  test('trim на whitespace', () => {
    const input = '  Hello World  '
    const result = sanitizeInput(input)
    expect(result).toBe('Hello World')
  })
})

// Тестове за rate limiting
describe('Rate Limiting', () => {
  test('първо запитване', () => {
    const result = checkRateLimit('test-ip-1')
    expect(result).toBe(true)
  })

  test('множествени запитвания', () => {
    const ip = 'test-ip-2'
    
    // Първите 5 запитвания трябва да са успешни
    for (let i = 0; i < 5; i++) {
      expect(checkRateLimit(ip)).toBe(true)
    }
    
    // 6-тото запитване трябва да бъде блокирано
    expect(checkRateLimit(ip)).toBe(false)
  })
})
