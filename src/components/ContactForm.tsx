'use client'

import { useState } from 'react'
import { motion } from 'framer-motion'
import { Check, AlertCircle, Send } from 'lucide-react'

interface ContactFormData {
  name: string
  email: string
  message: string
  projectType: string
}

interface ContactFormProps {
  onSuccess?: () => void
  onError?: (error: string) => void
}

export default function ContactForm({ onSuccess, onError }: ContactFormProps) {
  const [formData, setFormData] = useState<ContactFormData>({
    name: '',
    email: '',
    message: '',
    projectType: 'YouTube Video'
  })
  const [isSubmitting, setIsSubmitting] = useState(false)
  const [isSubmitted, setIsSubmitted] = useState(false)
  const [error, setError] = useState<string | null>(null)

  const projectTypes = [
    'YouTube Video',
    'Shorts/Reels',
    'TikTok',
    'Instagram',
    'Commercial',
    'Other'
  ]

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    setIsSubmitting(true)
    setError(null)
    
    try {
      const response = await fetch('/api/send-email', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(formData)
      })

      const result = await response.json()

      if (!response.ok) {
        throw new Error(result.error || 'Възникна грешка при изпращането')
      }
      
      // Успешно изпращане
      setIsSubmitted(true)
      onSuccess?.()
      
      // Reset форма след 3 секунди
      setTimeout(() => {
        setIsSubmitted(false)
        setFormData({ name: '', email: '', message: '', projectType: 'YouTube Video' })
      }, 3000)
      
    } catch (error) {
      const errorMessage = error instanceof Error ? error.message : 'Възникна грешка при изпращането на съобщението. Моля опитайте отново.'
      setError(errorMessage)
      onError?.(errorMessage)
      console.error('Error sending email:', error)
    } finally {
      setIsSubmitting(false)
    }
  }

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>) => {
    setFormData(prev => ({
      ...prev,
      [e.target.name]: e.target.value
    }))
    // Изчистване на грешката при промяна на полетата
    if (error) setError(null)
  }

  if (isSubmitted) {
    return (
      <motion.div
        initial={{ opacity: 0, scale: 0.8 }}
        animate={{ opacity: 1, scale: 1 }}
        className="text-center py-12"
      >
        <div className="w-16 h-16 bg-green-600 rounded-full flex items-center justify-center mx-auto mb-4">
          <Check className="w-8 h-8 text-white" />
        </div>
        <h3 className="text-xl font-semibold text-white mb-2">Съобщението е изпратено!</h3>
        <p className="text-gray-400">Ще се свържем с вас в рамките на 24 часа.</p>
      </motion.div>
    )
  }

  return (
    <form onSubmit={handleSubmit} className="space-y-6">
      {/* Error Message */}
      {error && (
        <motion.div
          initial={{ opacity: 0, y: -10 }}
          animate={{ opacity: 1, y: 0 }}
          className="bg-red-500/10 border border-red-500/20 rounded-lg p-4 flex items-center gap-3"
        >
          <AlertCircle className="w-5 h-5 text-red-400 flex-shrink-0" />
          <p className="text-red-400 text-sm">{error}</p>
        </motion.div>
      )}

      {/* Name Field */}
      <div>
        <label className="block text-sm font-medium text-gray-300 mb-2">
          Вашето име *
        </label>
        <input
          type="text"
          name="name"
          value={formData.name}
          onChange={handleChange}
          required
          minLength={2}
          maxLength={100}
          className="w-full px-4 py-3 bg-dark-bg border border-dark-border rounded-xl text-white placeholder-gray-500 focus:border-primary-blue focus:outline-none transition-colors"
          placeholder="Въведете вашето име"
          disabled={isSubmitting}
        />
      </div>

      {/* Email Field */}
      <div>
        <label className="block text-sm font-medium text-gray-300 mb-2">
          Имейл адрес *
        </label>
        <input
          type="email"
          name="email"
          value={formData.email}
          onChange={handleChange}
          required
          className="w-full px-4 py-3 bg-dark-bg border border-dark-border rounded-xl text-white placeholder-gray-500 focus:border-primary-blue focus:outline-none transition-colors"
          placeholder="вашия@имейл.com"
          disabled={isSubmitting}
        />
      </div>

      {/* Project Type Field */}
      <div>
        <label className="block text-sm font-medium text-gray-300 mb-2">
          Тип проект *
        </label>
        <select
          name="projectType"
          value={formData.projectType}
          onChange={handleChange}
          required
          className="w-full px-4 py-3 bg-dark-bg border border-dark-border rounded-xl text-white focus:border-primary-blue focus:outline-none transition-colors"
          disabled={isSubmitting}
        >
          {projectTypes.map((type) => (
            <option key={type} value={type}>
              {type}
            </option>
          ))}
        </select>
      </div>

      {/* Message Field */}
      <div>
        <label className="block text-sm font-medium text-gray-300 mb-2">
          Съобщение *
        </label>
        <textarea
          name="message"
          value={formData.message}
          onChange={handleChange}
          required
          minLength={10}
          maxLength={2000}
          rows={5}
          className="w-full px-4 py-3 bg-dark-bg border border-dark-border rounded-xl text-white placeholder-gray-500 focus:border-primary-blue focus:outline-none transition-colors resize-none"
          placeholder="Опишете вашия проект и изисквания..."
          disabled={isSubmitting}
        />
        <div className="text-xs text-gray-500 mt-1 text-right">
          {formData.message.length}/2000 символа
        </div>
      </div>

      {/* Submit Button */}
      <motion.button
        type="submit"
        disabled={isSubmitting}
        whileHover={{ scale: isSubmitting ? 1 : 1.02 }}
        whileTap={{ scale: isSubmitting ? 1 : 0.98 }}
        className={`w-full py-4 px-6 rounded-xl font-semibold text-lg transition-all duration-300 flex items-center justify-center gap-2 ${
          isSubmitting
            ? 'bg-gray-600 text-gray-400 cursor-not-allowed'
            : 'bg-gradient-primary text-white hover:shadow-lg hover:shadow-primary-blue/20 cursor-glow'
        }`}
      >
        {isSubmitting ? (
          <>
            <div className="w-5 h-5 border-2 border-white/30 border-t-white rounded-full animate-spin" />
            Изпращане...
          </>
        ) : (
          <>
            <Send className="w-5 h-5" />
            Изпрати запитване
          </>
        )}
      </motion.button>

      {/* Privacy Notice */}
      <p className="text-xs text-gray-500 text-center">
        С изпращането на този формуляр, вие се съгласявате с нашата{' '}
        <a href="/privacy" className="text-primary-blue hover:underline">
          политика за поверителност
        </a>
        .
      </p>
    </form>
  )
}
