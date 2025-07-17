// Test webhook deployment - 2025-07-05 00:59
'use client'

import { motion, useScroll, useTransform } from 'framer-motion'
import { useInView } from 'react-intersection-observer'
import { Star, Video, Youtube, Instagram, MessageCircle, Check, Send } from 'lucide-react'

// TikTok SVG Icon Component
const TikTokIcon = ({ className }: { className?: string }) => (
  <svg
    className={className}
    viewBox="0 0 24 24"
    fill="currentColor"
    xmlns="http://www.w3.org/2000/svg"
  >
    <path d="M19.321 5.562a5.124 5.124 0 0 1-.443-.258 6.228 6.228 0 0 1-1.137-.966c-.849-1.04-1.3-2.446-1.3-3.838v-.364c0-.033-.024-.06-.055-.067C16.335.068 16.284.068 16.232.068h-3.204c-.068 0-.123.055-.123.122v11.335c0 .033 0 .065-.005.098-.005.033-.012.065-.019.098a3.076 3.076 0 0 1-1.482 2.072c-.43.258-.93.401-1.463.401-1.615 0-2.927-1.312-2.927-2.927 0-1.615 1.312-2.927 2.927-2.927.344 0 .674.06.98.169.068.024.143-.019.143-.091V5.562c0-.055-.036-.103-.088-.12a6.685 6.685 0 0 0-1.035-.081c-3.682 0-6.67 2.988-6.67 6.67 0 1.731.66 3.307 1.744 4.493.024.026.05.05.077.074 1.186 1.084 2.762 1.744 4.493 1.744 3.682 0 6.67-2.988 6.67-6.67V7.721c1.2.674 2.633 1.061 4.193 1.061.068 0 .123-.055.123-.122V5.684c0-.043-.022-.081-.057-.104-.43-.289-.817-.637-1.137-1.018Z"/>
  </svg>
)
import { useState, lazy, Suspense, useEffect, useRef } from 'react'
import Link from 'next/link'
import emailjs from '@emailjs/browser'

// Lazy load heavy components
const LazyTestimonialsSection = lazy(() => Promise.resolve({ default: TestimonialsSection }))
const LazyAboutSection = lazy(() => Promise.resolve({ default: AboutSection }))
const LazyContactSection = lazy(() => Promise.resolve({ default: ContactSection }))
const LazyFooter = lazy(() => Promise.resolve({ default: Footer }))

function ParallaxBackground() {
  const { scrollYProgress } = useScroll()
  
  const y1 = useTransform(scrollYProgress, [0, 1], [0, -50])
  const y2 = useTransform(scrollYProgress, [0, 1], [0, -100])
  const y3 = useTransform(scrollYProgress, [0, 1], [0, -200])
  const rotate1 = useTransform(scrollYProgress, [0, 1], [0, 360])
  const rotate2 = useTransform(scrollYProgress, [0, 1], [0, -180])
  
  return (
    <div className="fixed inset-0 pointer-events-none overflow-hidden">
      {/* Floating circles with parallax */}
      <motion.div 
        style={{ y: y1, rotate: rotate1 }}
        className="absolute top-20 left-10 w-32 h-32 bg-primary-blue/5 rounded-full blur-xl"
      />
      <motion.div 
        style={{ y: y2, rotate: rotate2 }}
        className="absolute top-40 right-20 w-24 h-24 bg-primary-purple/10 rounded-full blur-lg"
      />
      <motion.div 
        style={{ y: y3 }}
        className="absolute bottom-40 left-1/4 w-40 h-40 bg-primary-teal/3 rounded-full blur-2xl"
      />
      <motion.div 
        style={{ y: y1, rotate: rotate1 }}
        className="absolute bottom-20 right-10 w-20 h-20 bg-primary-blue/8 rounded-full blur-md"
      />
      <motion.div 
        style={{ y: y2 }}
        className="absolute top-1/2 left-1/2 w-16 h-16 bg-primary-purple/6 rounded-full blur-sm"
      />
      
      {/* Geometric shapes */}
      <motion.div 
        style={{ y: y2, rotate: rotate1 }}
        className="absolute top-60 right-1/4 w-12 h-12 border border-primary-teal/20 rotate-45"
      />
      <motion.div 
        style={{ y: y3, rotate: rotate2 }}
        className="absolute bottom-60 left-1/3 w-8 h-8 bg-primary-blue/15 transform rotate-12"
      />
    </div>
  )
}

export default function Home() {
  return (
    <main className="min-h-screen bg-dark-bg text-white overflow-x-hidden relative">
      <ParallaxBackground />
      <NavigationBar />
      <HeroSection />
      <Suspense fallback={<div className="h-20"></div>}>
        <LazyTestimonialsSection />
      </Suspense>
      <Suspense fallback={<div className="h-20"></div>}>
        <LazyAboutSection />
      </Suspense>
      <Suspense fallback={<div className="h-20"></div>}>
        <LazyContactSection />
      </Suspense>
      <Suspense fallback={<div className="h-20"></div>}>
        <LazyFooter />
      </Suspense>
      <FloatingCTA />
    </main>
  )
}

function NavigationBar() {
  const [isMenuOpen, setIsMenuOpen] = useState(false)
  const menuRef = useRef<HTMLDivElement>(null)

  const menuItems = [
    { name: 'Портфолио', href: '/portfolio' },
    { name: 'За нас', href: '#about' },
    { name: 'Отзиви', href: '#testimonials' },
    { name: 'Свържи се', href: '#contact' }
  ]

  // Close menu when clicking outside
  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (menuRef.current && !menuRef.current.contains(event.target as Node)) {
        setIsMenuOpen(false)
      }
    }

    const handleKeyDown = (event: KeyboardEvent) => {
      if (event.key === 'Escape') {
        setIsMenuOpen(false)
      }
    }

    const handleResize = () => {
      if (window.innerWidth >= 768) {
        setIsMenuOpen(false)
      }
    }

    const handleScroll = () => {
      setIsMenuOpen(false)
    }

    if (isMenuOpen) {
      document.addEventListener('mousedown', handleClickOutside)
      document.addEventListener('keydown', handleKeyDown)
      document.addEventListener('scroll', handleScroll)
      document.body.style.overflow = 'hidden'
    } else {
      document.body.style.overflow = 'unset'
    }

    window.addEventListener('resize', handleResize)

    return () => {
      document.removeEventListener('mousedown', handleClickOutside)
      document.removeEventListener('keydown', handleKeyDown)
      document.removeEventListener('scroll', handleScroll)
      window.removeEventListener('resize', handleResize)
      document.body.style.overflow = 'unset'
    }
  }, [isMenuOpen])

  // Close menu when route changes and on initial load
  useEffect(() => {
    setIsMenuOpen(false)
    document.body.style.overflow = 'unset'
    
    // Cleanup on page unload
    const handleBeforeUnload = () => {
      document.body.style.overflow = 'unset'
    }
    
    window.addEventListener('beforeunload', handleBeforeUnload)
    
    return () => {
      window.removeEventListener('beforeunload', handleBeforeUnload)
      document.body.style.overflow = 'unset'
    }
  }, [])

  return (
    <motion.nav 
      ref={menuRef}
      initial={{ y: -100 }}
      animate={{ y: 0 }}
      className="fixed top-0 left-0 right-0 z-50 bg-dark-bg/95 backdrop-blur-lg border-b border-dark-border shadow-lg"
    >
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex justify-between items-center h-16 sm:h-20">
          <motion.a
            href="#hero"
            whileHover={{ scale: 1.05 }}
            className="cursor-pointer"
          >
            <img 
              src="/Editing.png" 
              alt="Editing.bg" 
              className="h-12 sm:h-16 w-auto drop-shadow-lg hover:drop-shadow-xl transition-all duration-300"
              style={{ filter: 'drop-shadow(0 0 8px rgba(79, 70, 229, 0.3))' }}
            />
          </motion.a>
          
          {/* Desktop Menu */}
          <div className="hidden md:flex space-x-10">
            {menuItems.map((item) => (
              <Link key={item.name} href={item.href}>
                <motion.div
                  whileHover={{ scale: 1.1, color: '#4F46E5' }}
                  className="text-gray-200 hover:text-primary-blue transition-colors cursor-glow font-medium text-lg"
                >
                  {item.name}
                </motion.div>
              </Link>
            ))}
          </div>

          {/* Mobile Menu Button */}
          <button 
            onClick={(e) => {
              e.stopPropagation()
              setIsMenuOpen(!isMenuOpen)
            }}
            className="md:hidden p-2 rounded-md text-gray-200 hover:text-primary-blue transition-colors focus:outline-none"
            aria-expanded={isMenuOpen}
            aria-label="Toggle navigation menu"
          >
            <svg className="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
              {isMenuOpen ? (
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
              ) : (
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 6h16M4 12h16M4 18h16" />
              )}
            </svg>
          </button>
        </div>

        {/* Mobile Menu */}
        {isMenuOpen && (
          <motion.div 
            initial={{ opacity: 0, y: -20 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -20 }}
            className="md:hidden py-4 border-t border-dark-border bg-dark-bg/98 backdrop-blur-lg shadow-xl"
            role="menu"
            aria-orientation="vertical"
          >
            {menuItems.map((item) => (
              <Link key={item.name} href={item.href}>
                <div
                  onClick={() => {
                    setIsMenuOpen(false)
                    document.body.style.overflow = 'unset'
                  }}
                  className="block px-4 py-3 text-gray-200 hover:text-primary-blue hover:bg-dark-card transition-colors font-medium cursor-pointer"
                >
                  {item.name}
                </div>
              </Link>
            ))}
          </motion.div>
        )}
      </div>
    </motion.nav>
  )
}

function HeroSection() {
  const [ref, inView] = useInView({ triggerOnce: true, threshold: 0.1 })
  const { scrollYProgress } = useScroll()
  
  const heroY = useTransform(scrollYProgress, [0, 1], [0, -300])
  const heroOpacity = useTransform(scrollYProgress, [0, 0.5], [1, 0])
  const floatingY1 = useTransform(scrollYProgress, [0, 1], [0, -150])
  const floatingY2 = useTransform(scrollYProgress, [0, 1], [0, -250])
  
  return (
    <section id="hero" ref={ref} className="min-h-[100dvh] xs:min-h-[90vh] sm:min-h-screen flex items-center justify-center relative overflow-hidden bg-noise pt-16 sm:pt-24 pb-8 xs:pb-10 sm:pb-16">
      {/* Background Video Placeholder */}
      <div className="absolute inset-0 bg-gradient-to-br from-dark-bg via-dark-card to-dark-bg opacity-90"></div>
      
      {/* Parallax Floating Elements */}
      <motion.div 
        style={{ y: floatingY1 }}
        animate={{ y: [-20, 20, -20], rotate: [0, 180, 360] }}
        className="absolute top-32 left-10 w-16 h-16 bg-primary-blue/20 rounded-full blur-sm"
      />
      <motion.div 
        style={{ y: floatingY2 }}
        animate={{ y: [20, -20, 20], rotate: [360, 180, 0] }}
        className="absolute bottom-20 right-10 w-24 h-24 bg-primary-purple/10 rounded-full blur-md"
      />
      
      {/* Additional parallax elements */}
      <motion.div 
        style={{ y: floatingY1 }}
        animate={{ x: [-30, 30, -30], rotate: [0, 45, 0] }}
        className="absolute top-1/4 right-1/4 w-12 h-12 border-2 border-primary-teal/30 rotate-45"
      />
      <motion.div 
        style={{ y: floatingY2 }}
        animate={{ x: [40, -40, 40], scale: [1, 1.2, 1] }}
        className="absolute bottom-1/3 left-1/5 w-8 h-8 bg-primary-blue/25 transform rotate-12"
      />
      
      <motion.div 
        style={{ y: heroY, opacity: heroOpacity }}
        className="relative z-10 text-center max-w-4xl md:max-w-5xl lg:max-w-6xl mx-auto px-4 sm:px-6 flex flex-col justify-center min-h-[70vh] xs:min-h-[60vh] sm:min-h-[70vh] md:min-h-[80vh] lg:min-h-[85vh]"
      >
        <motion.h1 
          initial={{ opacity: 0, y: 50 }}
          animate={inView ? { opacity: 1, y: 0 } : {}}
          className="font-display text-2xl xs:text-3xl sm:text-4xl md:text-5xl lg:text-6xl xl:text-7xl font-bold mb-3 xs:mb-4 sm:mb-6 leading-tight xs:leading-snug sm:leading-relaxed tracking-wide"
        >
          Превърни видеата си в{' '}
          <motion.span 
            animate={{ textShadow: ['0 0 20px #4F46E5', '0 0 40px #7C3AED', '0 0 20px #4F46E5'] }}
            className="gradient-text"
          >
            завладяващо
          </motion.span>
          <br className="hidden xs:block" />
          съдържание
        </motion.h1>
        
        <motion.p 
          initial={{ opacity: 0, y: 30 }}
          animate={inView ? { opacity: 1, y: 0 } : {}}
          className="text-sm xs:text-base sm:text-lg md:text-xl lg:text-2xl text-gray-300 mb-6 xs:mb-8 sm:mb-10 md:mb-12 max-w-2xl mx-auto px-2 sm:px-0 leading-relaxed"
        >
          Професионално видео монтиране, което прави съдържанието ти да блести. От суров материал до готови за вайръл шедьоври.
        </motion.p>
        
        <motion.div 
          initial={{ opacity: 0, y: 20 }}
          animate={inView ? { opacity: 1, y: 0 } : {}}
          className="flex flex-col xs:flex-row gap-3 xs:gap-4 sm:gap-4 justify-center items-stretch px-4 sm:px-0 max-w-sm xs:max-w-lg sm:max-w-none mx-auto mb-6 xs:mb-8 sm:mb-10 md:mb-12 lg:mb-16"
        >
          <Link href="/portfolio" className="flex-1 xs:flex-none">
            <motion.button
              whileHover={{ scale: 1.05, boxShadow: '0 0 30px #4F46E5' }}
              whileTap={{ scale: 0.95 }}
              className="w-full xs:w-auto bg-gradient-primary text-white px-4 xs:px-6 sm:px-8 py-3 xs:py-3 sm:py-4 rounded-full font-semibold text-sm xs:text-base sm:text-lg flex items-center justify-center gap-2 cursor-glow animate-glow min-w-[180px] xs:min-w-[200px]"
            >
              <img src="/32x32logo.png" alt="Play" className="w-4 h-4 xs:w-5 xs:h-5 sm:w-6 sm:h-6" />
              Виж работата ни
            </motion.button>
          </Link>
          
          <motion.button
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.95 }}
            onClick={() => {
              document.getElementById('contact')?.scrollIntoView({ 
                behavior: 'smooth',
                block: 'start'
              });
            }}
            className="w-full xs:w-auto border-2 border-primary-blue text-primary-blue px-4 xs:px-6 sm:px-8 py-3 xs:py-3 sm:py-4 rounded-full font-semibold text-sm xs:text-base sm:text-lg hover:bg-primary-blue hover:text-white transition-all cursor-glow min-w-[180px] xs:min-w-[200px]"
          >
            Да работим заедно
          </motion.button>
        </motion.div>
        
        {/* Video Demo Trailer */}
        <motion.div 
          initial={{ opacity: 0, scale: 0.8 }}
          animate={inView ? { opacity: 1, scale: 1 } : {}}
          className="relative w-full max-w-xs xs:max-w-sm sm:max-w-2xl md:max-w-4xl lg:max-w-5xl xl:max-w-6xl mx-auto px-4 sm:px-2 md:px-8 lg:px-12"
        >
          <div className="aspect-video bg-dark-card rounded-lg xs:rounded-xl sm:rounded-2xl glow-border overflow-hidden relative">
            <iframe
              src="https://www.youtube.com/embed/dIxYtz-Xln8?autoplay=1&mute=0&controls=1&showinfo=0&rel=0&modestbranding=1&loop=1&playlist=dIxYtz-Xln8&start=0"
              title="Editing.bg Demo Reel"
              className="w-full h-full rounded-lg xs:rounded-xl sm:rounded-2xl"
              allow="autoplay; fullscreen; encrypted-media; picture-in-picture; accelerometer; gyroscope"
              allowFullScreen
            ></iframe>
          </div>
        </motion.div>
      </motion.div>
    </section>
  )
}



function TestimonialsSection() {
  const [ref, inView] = useInView({ triggerOnce: true, threshold: 0.1 })
  
  const testimonials = [
    {
      id: 1,
      name: 'Dan4o',
      role: 'Създател на съдържание',
      avatar: '/dan4opfp.jpg',
      content: 'Казвах какво искам, те го правеха още по-добре! Това ми стига.',
      rating: 5,
      platform: 'YouTube'
    },
    {
      id: 2,
      name: 'Vonster',
      role: 'Създател на съдържание',
      avatar: '/vonsterpfp.jpg',
      content: 'Брутален монтажист с уникално виждане над нещата и бързо работно време! Препоръчвам го с две ръце, много е талантлив! ',
      rating: 5,
      platform: 'YouTube'
    },
    {
      id: 3,
      name: 'GB Hustle',
      role: 'Бизнес собственик',
      avatar: '/gbpfp.jpg',
      content: 'Работил съм с бая едитори – тези определено са машини! Оправяли са ми всякакви поръчки – от компилации до реклами, винаги с уникален стил.',
      rating: 5,
      platform: 'Instagram'
    }
  ]
  
  return (
    <section id="testimonials" ref={ref} className="py-20 px-4 sm:px-6 lg:px-8 bg-dark-card/30">
      <div className="max-w-7xl mx-auto">
        <motion.div
          initial={{ opacity: 0, y: 50 }}
          animate={inView ? { opacity: 1, y: 0 } : {}}
          className="text-center mb-16"
        >
          <h2 className="font-display text-4xl md:text-6xl font-bold mb-6">
            Какво Казват <span className="gradient-text">Клиентите</span>
          </h2>
          <p className="text-xl text-gray-300 max-w-2xl mx-auto">
            Не се доверявайте само на думите ни - ето какво казват създателите за работата ни
          </p>
        </motion.div>
        
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8 items-start">
          {testimonials.map((testimonial) => (
            <div key={testimonial.id} className="bg-dark-card p-8 rounded-2xl border border-dark-border hover:border-primary-blue/50 transition-all h-full flex flex-col">
              {/* Stars */}
              <div className="flex gap-1 mb-4">
                {[...Array(testimonial.rating)].map((_, i) => (
                  <Star key={i} className="w-5 h-5 fill-primary-blue text-primary-blue" />
                ))}
              </div>
              
              {/* Content */}
              <p className="text-gray-300 mb-6 italic flex-1">
{testimonial.content}
              </p>
              
              {/* Author */}
              <div className="flex items-center gap-4 mt-auto">
                <div className="w-16 h-16 rounded-full overflow-hidden flex-shrink-0 bg-gradient-to-br from-primary-blue/20 to-primary-purple/20">
                  <img 
                    src={testimonial.avatar} 
                    alt={testimonial.name}
                    className="w-full h-full object-cover object-center"
                    onError={(e) => {
                      const target = e.target as HTMLImageElement;
                      target.src = 'data:image/svg+xml;base64,PHN2ZyB3aWR0aD0iNjQiIGhlaWdodD0iNjQiIHZpZXdCb3g9IjAgMCA2NCA2NCIgZmlsbD0ibm9uZSIgeG1sbnM9Imh0dHA6Ly93d3cudzMub3JnLzIwMDAvc3ZnIj4KPHJlY3Qgd2lkdGg9IjY0IiBoZWlnaHQ9IjY0IiBmaWxsPSIjNEY0NkU1IiByeD0iMzIiLz4KPHN2ZyB4PSIxNiIgeT0iMTYiIHdpZHRoPSIzMiIgaGVpZ2h0PSIzMiIgdmlld0JveD0iMCAwIDI0IDI0IiBmaWxsPSJub25lIiBzdHJva2U9IiNmZmZmZmYiIHN0cm9rZS13aWR0aD0iMiIgc3Ryb2tlLWxpbmVjYXA9InJvdW5kIiBzdHJva2UtbGluZWpvaW49InJvdW5kIj4KPHBhdGggZD0iTTIwIDIxdi0yYTQgNCAwIDAgMC00LTRIOGE0IDQgMCAwIDAtNCA0djIiLz4KPGNpcmNsZSBjeD0iMTIiIGN5PSI3IiByPSI0Ii8+Cjwvc3ZnPgo8L3N2Zz4K';
                    }}
                  />
                </div>
                <div className="flex-1">
                  <h4 className="font-semibold text-white text-lg">{testimonial.name}</h4>
                  <p className="text-sm text-gray-400">{testimonial.role} • {testimonial.platform}</p>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  )
}

function AboutSection() {
  const [ref, inView] = useInView({ triggerOnce: true, threshold: 0.1 })
  
  return (
    <section id="about" ref={ref} className="py-32 px-4 sm:px-6 lg:px-8 max-w-7xl mx-auto">
      <motion.div
        initial={{ opacity: 0, y: 50 }}
        animate={inView ? { opacity: 1, y: 0 } : {}}
        className="text-center mb-24"
      >
        <h2 className="font-display text-5xl md:text-7xl font-bold mb-8">
          За <span className="gradient-text">Екипа</span>
        </h2>
        <p className="text-2xl text-gray-300 max-w-3xl mx-auto">
          Креативните умове зад Editing.bg
        </p>
      </motion.div>
      
      {/* Team Members Grid */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-20">
        {/* Team Member 1 - Left Side */}
        <motion.div
          initial={{ opacity: 0, x: -50 }}
          animate={inView ? { opacity: 1, x: 0 } : {}}
          className="text-center"
        >
          {/* Tsvetan Georgiev Photo */}
          <div className="relative mb-10">
            <div className="w-80 h-80 mx-auto bg-gradient-to-br from-primary-blue/20 via-primary-purple/20 to-primary-teal/20 rounded-3xl glow-border overflow-hidden">
              <img 
                src="/Editing.bg photo.jpg" 
                alt="Tsvetan Georgiev"
                className="w-full h-full object-cover"
                onError={(e) => {
                  const target = e.target as HTMLImageElement;
                  target.src = 'data:image/svg+xml;base64,PHN2ZyB3aWR0aD0iMzIwIiBoZWlnaHQ9IjMyMCIgdmlld0JveD0iMCAwIDMyMCAzMjAiIGZpbGw9Im5vbmUiIHhtbG5zPSJodHRwOi8vd3d3LnczLm9yZy8yMDAwL3N2ZyI+CjxyZWN0IHdpZHRoPSIzMjAiIGhlaWdodD0iMzIwIiBmaWxsPSIjMUYyOTM3Ii8+CjxjaXJjbGUgY3g9IjE2MCIgY3k9IjEzMCIgcj0iNDAiIGZpbGw9IiM0RjQ2RTUiLz4KPHBhdGggZD0iTTk1IDI0MEMxNzUgMTAwIDI0NSAxMTAgMzA1IDI0MEg5NVoiIGZpbGw9IiM0RjQ2RTUiLz4KPHRleHQgeD0iMTYwIiB5PSIyODUiIHRleHQtYW5jaG9yPSJtaWRkbGUiIGZvbnQtZmFtaWx5PSJBcmlhbCIgZm9udC1zaXplPSIxOCIgZmlsbD0iIzRGNDZFNSI+VHN2ZXRhbiBHZW9yZ2lldmjwvc3ZnPg==';
                }}
              />
            </div>
            {/* Decorative Icon */}
            <motion.div 
              animate={{ rotate: 360 }}
              className="absolute -top-3 -right-3 w-16 h-16 bg-gradient-primary rounded-full flex items-center justify-center"
            >
              <Video className="w-8 h-8 text-white" />
            </motion.div>
          </div>
          
          {/* Tsvetan Georgiev Info */}
          <div>
            <h3 className="font-display text-3xl font-bold mb-4 text-white">
              Tsvetan Georgiev
            </h3>
            <p className="text-primary-blue font-semibold mb-6 text-xl">
              CEO
            </p>
            <p className="text-gray-300 text-lg mb-8 max-w-lg mx-auto leading-relaxed">
              Основател и CEO на Editing.bg, водещ креативната визия и бизнес стратегия. 
              Експерт във видео монтиране с години опит в трансформирането на съдържание за създатели по целия свят.
            </p>
            
            {/* Skills/Specialties */}
            <div className="flex flex-wrap gap-3 justify-center">
              {['Лидерство', 'Креативна визия', 'Бизнес стратегия'].map((skill) => (
                <span key={skill} className="bg-primary-blue/20 text-primary-blue px-4 py-2 rounded-full text-sm font-semibold">
                  {skill}
                </span>
              ))}
            </div>
          </div>
        </motion.div>
        
        {/* Team Member 2 - Right Side */}
        <motion.div
          initial={{ opacity: 0, x: 50 }}
          animate={inView ? { opacity: 1, x: 0 } : {}}
          className="text-center"
        >
          {/* Team Member 2 Photo */}
          <div className="relative mb-10">
            <div className="w-80 h-80 mx-auto bg-gradient-to-br from-primary-purple/20 via-primary-teal/20 to-primary-blue/20 rounded-3xl glow-border overflow-hidden">
              <img 
                src="/azusmihnat.jpg" 
                alt="Team Member 2"
                className="w-full h-full object-cover"
                onError={(e) => {
                  const target = e.target as HTMLImageElement;
                  target.src = 'data:image/svg+xml;base64,PHN2ZyB3aWR0aD0iMzIwIiBoZWlnaHQ9IjMyMCIgdmlld0JveD0iMCAwIDMyMCAzMjAiIGZpbGw9Im5vbmUiIHhtbG5zPSJodHRwOi8vd3d3LnczLm9yZy8yMDAwL3N2ZyI+CjxyZWN0IHdpZHRoPSIzMjAiIGhlaWdodD0iMzIwIiBmaWxsPSIjMUYyOTM3Ii8+CjxjaXJjbGUgY3g9IjE2MCIgY3k9IjEzMCIgcj0iNDAiIGZpbGw9IiM3QzNBRUQiLz4KPHBhdGggZD0iTTk1IDI0MEMxNzUgMTAwIDI0NSAxMTAgMzA1IDI0MEg5NVoiIGZpbGw9IiM3QzNBRUQiLz4KPHRleHQgeD0iMTYwIiB5PSIyODUiIHRleHQtYW5jaG9yPSJtaWRkbGUiIGZvbnQtZmFtaWx5PSJBcmlhbCIgZm9udC1zaXplPSIxOCIgZmlsbD0iIzdDM0FFRCI+VGVhbSBNZW1iZXIgMjwvdGV4dD4KPC9zdmc+';
                }}
              />
            </div>
            {/* Decorative Icon */}
              <motion.div
              animate={{ rotate: -360 }}
              className="absolute -top-3 -right-3 w-16 h-16 bg-gradient-primary rounded-full flex items-center justify-center"
            >
              <Video className="w-8 h-8 text-white" />
              </motion.div>
          </div>
          
          {/* Team Member 2 Info */}
          <div>
            <h3 className="font-display text-3xl font-bold mb-4 text-white">
              Georgi Karchev
            </h3>
            <p className="text-primary-purple font-semibold mb-6 text-xl">
              CTO/COO
            </p>
            <p className="text-gray-300 text-lg mb-8 max-w-lg mx-auto leading-relaxed">
              Технически лидер и директор по операциите на Editing.bg, комбиниращ най-съвременните технологии с творческо съвършенство за постигане на максимална ефективност.
            </p>
            
            {/* Skills/Specialties */}
            <div className="flex flex-wrap gap-3 justify-center">
              {['Технологии', 'Операции', 'Качество'].map((skill) => (
                <span key={skill} className="bg-primary-purple/20 text-primary-purple px-4 py-2 rounded-full text-sm font-semibold">
                  {skill}
                </span>
              ))}
            </div>
          </div>
        </motion.div>
      </div>
    </section>
  )
}

function ContactSection() {
  const [ref, inView] = useInView({ triggerOnce: true, threshold: 0.1 })
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    message: '',
    projectType: 'YouTube Video'
  })
  const [isSubmitting, setIsSubmitting] = useState(false)
  const [isSubmitted, setIsSubmitted] = useState(false)

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    setIsSubmitting(true)
    
    try {
      // EmailJS configuration
      const serviceID = 'service_jq0e74u'
      const templateID = 'template_x61try6'
      const publicKey = '_p5yL0fV4S2zKjK4c'
      
      // Prepare template params
      const templateParams = {
        from_name: formData.name,
        from_email: formData.email,
        project_type: formData.projectType,
        message: formData.message,
        to_email: 'editing.bg.official@gmail.com'
      }
      
      // Send email using EmailJS
      await emailjs.send(serviceID, templateID, templateParams, publicKey)
      
      // Show success message
      setIsSubmitted(true)
      
      // Reset form after success message
      setTimeout(() => {
        setIsSubmitted(false)
        setFormData({ name: '', email: '', message: '', projectType: 'YouTube Video' })
      }, 3000)
      
    } catch (error) {
      console.error('Error sending email:', error)
      alert('Възникна грешка при изпращането на съобщението. Моля опитайте отново.')
    } finally {
      setIsSubmitting(false)
    }
  }

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>) => {
    setFormData(prev => ({
      ...prev,
      [e.target.name]: e.target.value
    }))
  }
  
  return (
    <section id="contact" ref={ref} className="py-20 px-4 sm:px-6 lg:px-8 bg-dark-card/30">
      <div className="max-w-4xl mx-auto">
        <motion.div
          initial={{ opacity: 0, y: 50 }}
          animate={inView ? { opacity: 1, y: 0 } : {}}
          className="text-center mb-16"
        >
          <h2 className="font-display text-4xl md:text-6xl font-bold mb-6">
            Свържете се <span className="gradient-text">с нас</span>
          </h2>
          <p className="text-xl text-gray-300 max-w-2xl mx-auto">
            Готови сте да трансформирате съдържанието си? Да обсъдим проекта ви и да въплътим визията ви в живот.
          </p>
        </motion.div>
        
        {/* Contact Form */}
            <motion.div
          initial={{ opacity: 0, y: 50 }}
              animate={inView ? { opacity: 1, y: 0 } : {}}
          className="max-w-3xl mx-auto"
        >
          <div className="bg-dark-card p-12 rounded-2xl border border-dark-border">
              {isSubmitted ? (
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
              ) : (
                <form onSubmit={handleSubmit} className="space-y-6">
                  <div>
                    <label className="block text-sm font-medium text-gray-300 mb-2">
                      Вашето име
                    </label>
                    <input
                      type="text"
                      name="name"
                      value={formData.name}
                      onChange={handleChange}
                      required
                      className="w-full px-4 py-3 bg-dark-bg border border-dark-border rounded-xl text-white placeholder-gray-500 focus:border-primary-blue focus:outline-none transition-colors"
                      placeholder="Въведете вашето име"
                    />
                  </div>

                  <div>
                    <label className="block text-sm font-medium text-gray-300 mb-2">
                      Имейл адрес
                    </label>
                    <input
                      type="email"
                      name="email"
                      value={formData.email}
                      onChange={handleChange}
                      required
                      className="w-full px-4 py-3 bg-dark-bg border border-dark-border rounded-xl text-white placeholder-gray-500 focus:border-primary-blue focus:outline-none transition-colors"
                      placeholder="вашия@имейл.com"
                    />
                  </div>

                  <div>
                    <label className="block text-sm font-medium text-gray-300 mb-2">
                      Тип проект
                    </label>
                    <select
                      name="projectType"
                      value={formData.projectType}
                      onChange={handleChange}
                      className="w-full px-4 py-3 bg-dark-bg border border-dark-border rounded-xl text-white focus:border-primary-blue focus:outline-none transition-colors"
                    >
                      <option value="YouTube Video">YouTube видео</option>
                      <option value="Short Form Content">Кратко съдържание</option>
                      <option value="Social Media">Социални медии</option>
                      <option value="Commercial">Реклама</option>
                      <option value="Other">Друго</option>
                    </select>
                  </div>

                  <div>
                    <label className="block text-sm font-medium text-gray-300 mb-2">
                      Детайли за проекта
                    </label>
                    <textarea
                      name="message"
                      value={formData.message}
                      onChange={handleChange}
                      required
                      rows={5}
                      className="w-full px-4 py-3 bg-dark-bg border border-dark-border rounded-xl text-white placeholder-gray-500 focus:border-primary-blue focus:outline-none transition-colors resize-none"
                      placeholder="Разкажете ни за вашия проект, график и специфични изисквания..."
                    />
                  </div>

                  <motion.button
                    type="submit"
                    disabled={isSubmitting}
                    whileHover={{ scale: 1.02 }}
                    whileTap={{ scale: 0.98 }}
                    className="w-full bg-gradient-primary text-white py-4 rounded-xl font-semibold hover:bg-gradient-to-r hover:from-primary-blue-dark hover:to-primary-purple-dark transition-colors disabled:opacity-50 disabled:cursor-not-allowed flex items-center justify-center gap-2"
                  >
                    {isSubmitting ? (
                      <>
                        <div className="w-5 h-5 border-2 border-black border-t-transparent rounded-full animate-spin" />
                        Изпращане...
                      </>
                    ) : (
                      <>
                        <Send className="w-5 h-5" />
                        Изпрати съобщение
                      </>
                    )}
              </motion.button>
                </form>
              )}
            </div>
              
            {/* Direct Contact Info */}
              <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={inView ? { opacity: 1, y: 0 } : {}}
              className="mt-8 text-center"
            >
              <p className="text-gray-400 mb-4">Или се свържете директно:</p>
              <div className="flex justify-center gap-8">
                <a 
                  href="https://instagram.com/editing.bg_" 
                  target="_blank" 
                  rel="noopener noreferrer"
                  className="flex items-center gap-2 text-gray-300 hover:text-primary-blue transition-colors cursor-pointer"
                >
                  <Instagram className="w-5 h-5 text-primary-blue" />
                  <span>@editing.bg_</span>
                </a>
                <a 
                  href="https://tiktok.com/@editing.bg_" 
                  target="_blank" 
                  rel="noopener noreferrer"
                  className="flex items-center gap-2 text-gray-300 hover:text-primary-purple transition-colors cursor-pointer"
                >
                  <TikTokIcon className="w-5 h-5 text-primary-purple" />
                  <span>TikTok: @editing.bg_</span>
                </a>
              </div>
            </motion.div>
          </motion.div>
      </div>
    </section>
  )
}

function Footer() {
  return (
    <footer className="bg-dark-bg border-t border-dark-border py-16 px-4 sm:px-6 lg:px-8">
      <div className="max-w-7xl mx-auto">
        <div className="grid grid-cols-1 md:grid-cols-3 gap-12 mb-12">
          {/* Brand */}
          <div className="text-left">
            <img src="/Editing.png" alt="Editing.bg" className="h-16 mb-4 block" />
            <p className="text-gray-300 mb-6">
              Професионални услуги за видео монтиране, които трансформират съдържанието ви и увеличават ангажираността.
            </p>
            <div className="flex space-x-4">
              <motion.a 
                whileHover={{ scale: 1.1, color: '#4F46E5' }}
                href="#" 
                className="text-gray-400 hover:text-primary-blue cursor-glow"
              >
                <Youtube className="w-6 h-6" />
              </motion.a>
              <motion.a 
                whileHover={{ scale: 1.1, color: '#7C3AED' }}
                href="#" 
                className="text-gray-400 hover:text-primary-purple cursor-glow"
              >
                <Instagram className="w-6 h-6" />
              </motion.a>
              <motion.a 
                whileHover={{ scale: 1.1, color: '#0D9488' }}
                href="#" 
                className="text-gray-400 hover:text-primary-teal cursor-glow"
              >
                <MessageCircle className="w-6 h-6" />
              </motion.a>
            </div>
          </div>
          
          {/* Services */}
          <div>
            <h4 className="font-semibold text-white mb-4">Услуги</h4>
            <ul className="space-y-2 text-gray-300">
              <li><a href="#" className="hover:text-primary-blue transition-colors cursor-glow">YouTube монтиране</a></li>
              <li><a href="#" className="hover:text-primary-purple transition-colors cursor-glow">Кратко съдържание</a></li>
              <li><a href="#" className="hover:text-primary-teal transition-colors cursor-glow">Анимации</a></li>
              <li><a href="#" className="hover:text-primary-blue transition-colors cursor-glow">Цветна корекция</a></li>
            </ul>
          </div>
          
          {/* Contact */}
          <div>
            <h4 className="font-semibold text-white mb-4">Свържете се с нас</h4>
            <p className="text-gray-300 mb-4">
              Готови сте да подобрите съдържанието си? Да обсъдим проекта ви!
            </p>
            <motion.button
              whileHover={{ scale: 1.05, boxShadow: '0 0 20px #4F46E5' }}
              whileTap={{ scale: 0.95 }}
              onClick={() => {
                document.getElementById('contact')?.scrollIntoView({ 
                  behavior: 'smooth',
                  block: 'start'
                });
              }}
              className="bg-gradient-primary text-white px-6 py-3 rounded-full font-semibold cursor-glow"
            >
              Свържете се с нас
            </motion.button>
          </div>
        </div>
        
        <div className="border-t border-dark-border pt-8 text-center text-gray-400">
          <p>&copy; 2025 Editing.bg. Всички права запазени.</p>
        </div>
      </div>
    </footer>
  )
}

function FloatingCTA() {
  return (
    <motion.div
      initial={{ opacity: 0, y: 100 }}
      animate={{ opacity: 1, y: 0 }}
      className="fixed bottom-8 right-8 z-40"
    >
      <motion.button
        whileHover={{ scale: 1.1, rotate: 5 }}
        whileTap={{ scale: 0.9 }}
        animate={{ y: [0, -10, 0] }}
        onClick={() => {
          document.getElementById('contact')?.scrollIntoView({ 
            behavior: 'smooth',
            block: 'start'
          });
        }}
        className="bg-gradient-primary text-white p-4 rounded-full shadow-lg cursor-glow animate-glow"
      >
        <MessageCircle className="w-6 h-6" />
      </motion.button>
    </motion.div>
  )
}
