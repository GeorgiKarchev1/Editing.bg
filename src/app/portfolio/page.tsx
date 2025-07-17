'use client'

import { motion, useScroll, useTransform } from 'framer-motion'

import { Video, Youtube, ArrowLeft } from 'lucide-react'
import Link from 'next/link'
import { useState, useEffect, useRef } from 'react'

function ParallaxBackground() {
  const { scrollYProgress } = useScroll()
  
  const y1 = useTransform(scrollYProgress, [0, 1], [0, -50])
  const y2 = useTransform(scrollYProgress, [0, 1], [0, -100])
  const y3 = useTransform(scrollYProgress, [0, 1], [0, -200])
  const rotate1 = useTransform(scrollYProgress, [0, 1], [0, 360])
  const rotate2 = useTransform(scrollYProgress, [0, 1], [0, -180])
  
  return (
    <div className="fixed inset-0 pointer-events-none overflow-hidden">
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
    </div>
  )
}

function NavigationBar() {
  const [isMenuOpen, setIsMenuOpen] = useState(false)
  const menuRef = useRef<HTMLDivElement>(null)

  const menuItems = [
    { name: 'Портфолио', href: '/portfolio' },
    { name: 'За нас', href: '/#about' },
    { name: 'Отзиви', href: '/#testimonials' },
    { name: 'Свържи се', href: '/#contact' }
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
          <Link href="/">
            <motion.div
              whileHover={{ scale: 1.05 }}
              className="cursor-pointer"
            >
              <img 
                src="/Editing.png" 
                alt="Editing.bg" 
                className="h-12 sm:h-16 w-auto drop-shadow-lg hover:drop-shadow-xl transition-all duration-300"
                style={{ filter: 'drop-shadow(0 0 8px rgba(79, 70, 229, 0.3))' }}
              />
            </motion.div>
          </Link>
          
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

function PortfolioSection() {
  const { scrollYProgress } = useScroll()
  const [activeFilter, setActiveFilter] = useState<'all' | 'YouTube' | 'Shorts'>('all')
  
  const portfolioY = useTransform(scrollYProgress, [0.2, 0.8], [50, -50])
  
  const portfolioItems = [
    { 
      id: 1, 
      title: 'Опитах да Изям и После да Изгоря 10,000 Калории!', 
      category: 'YouTube', 
      thumbnail: 'https://img.youtube.com/vi/74TqZqnJeLQ/maxresdefault.jpg', 
      type: 'video',
      link: 'https://www.youtube.com/watch?v=74TqZqnJeLQ&t=407s'
    },
    {
      id: 7,
      title: 'ВОЗИХ ЕМРАХ В 1,300 КОНЯ КОЛА! (BMW M5)',
      category: 'YouTube',
      link: "https://youtu.be/HiCvLrjSm84",
      thumbnail: "https://img.youtube.com/vi/HiCvLrjSm84/maxresdefault.jpg",
      type: "video",
    },
    {
      id: 8,
      title: 'Ден в Живота на 18-годишен!',
      category: 'YouTube',
      link: "https://youtu.be/Cnu8hwkXTsk?si=WuRPBjuWCVAfYhtM",
      thumbnail: "https://img.youtube.com/vi/Cnu8hwkXTsk/maxresdefault.jpg",
      type: "video",
    },
    { 
      id: 2, 
      title: 'ПОБЕДИХ без да Слизам от ВЛАКА нито за Секунда!', 
      category: 'YouTube', 
      thumbnail: 'https://img.youtube.com/vi/W0gkVildfsM/maxresdefault.jpg', 
      type: 'video',
      link: 'https://youtu.be/W0gkVildfsM'
    },
    { 
      id: 3, 
      title: 'Играем RANKED, но Всеки Има Различна РОЛЯ Спрямо Оръжията!', 
      category: 'YouTube', 
      thumbnail: 'https://img.youtube.com/vi/a0dCq9KwouM/maxresdefault.jpg', 
      type: 'video',
      link: 'https://youtu.be/a0dCq9KwouM'
    },
    { 
      id: 4, 
      title: '4-ма Куитнали Играят 2v2 (Пълна Лудница)', 
      category: 'YouTube', 
      thumbnail: 'https://img.youtube.com/vi/qVTic6OSJnc/maxresdefault.jpg', 
      type: 'video',
      link: 'https://youtu.be/qVTic6OSJnc'
    },
    { 
      id: 5, 
      title: 'ПОБЕДИХ В UNREAL НА ВСЕКИ ЕДИН РЕГИОН!', 
      category: 'YouTube', 
      thumbnail: 'https://img.youtube.com/vi/u0ajh-PXGhk/maxresdefault.jpg', 
      type: 'video',
      link: 'https://youtu.be/u0ajh-PXGhk'
    },
    { 
      id: 6, 
      title: '1лв vs 70,000лв Fortnite Акаунт!', 
      category: 'YouTube', 
      thumbnail: 'https://img.youtube.com/vi/KxUdZGz1M88/maxresdefault.jpg', 
      type: 'video',
      link: 'https://www.youtube.com/watch?v=KxUdZGz1M88&t=289s'
    },
    {
      id: 9,
      title: 'Предизвикателство от Mr.Airpods',
      category: 'Shorts',
      link: "https://www.youtube.com/shorts/hugGeMt_ulM",
      thumbnail: "/giathumb.jpg",
      type: "video",
    },
        {
      id: 10,
      title: 'Слушалки Mr.Airpods',
      category: 'Shorts',
      link: "https://youtube.com/shorts/u78CmloPs10?feature=share",
      thumbnail: "/pachathumb.jpg",
      type: "video",
    },
    {
      id: 11,
      title: 'Компилация на Mr.Airpods',
      category: 'Shorts',
      link: "https://www.youtube.com/shorts/4CPj10aKisY",
      thumbnail: "/gabrielakurva.jpg",
      type: "video",
    },
    {
      id: 12,
      title: 'Каравана ArteByGeisera',
      category: 'Shorts',
      link: "https://www.youtube.com/shorts/PbrRZJ_Thj8",
      thumbnail: "/elenkothumb.jpg",
      type: "video",
    },
    {
        id: 13,
        title: 'Компилация на Mr.Airpods',
        category: 'Shorts',
        link: "https://www.youtube.com/shorts/FBQjo9bEfFw",
        thumbnail: "/zikothumb.jpg",
        type: "video",
      },
      {
        id: 14,
        title: 'Боксова Круша Playpunch',
        category: 'Shorts',
        link: "https://youtube.com/shorts/4q67M0avJe8",
        thumbnail: "/dan4otumb.jpg",
        type: "video",
      },
      {
        id: 15,
        title: 'Гейминг зала GB Gaming Hub',
        category: 'Shorts',
        link: "https://youtube.com/shorts/lis9su0HGCM",
        thumbnail: "/cenkosenkort.jpg",
        type: "video",
      },
      {
        id: 16,
        title: 'CloudPour',
        category: 'Shorts',
        link: "https://youtube.com/shorts/7zqHpWVe_0Q",
        thumbnail: "/sandrothumb.jpg",
        type: "video",
      },
      {
        id: 17,
        title: 'Боксова круша Playpunch',
        category: 'Shorts',
        link: "https://youtube.com/shorts/xwe41qvm_8E",
        thumbnail: "/borovinki.jpg",
        type: "video",
      },
  ]
  
  // Filter logic
  const filteredItems = activeFilter === 'all' 
    ? portfolioItems 
    : portfolioItems.filter(item => item.category === activeFilter)
  
  const filterButtons = [
    { key: 'all', label: 'Всички', count: portfolioItems.length },
    { key: 'YouTube', label: 'YouTube ', count: portfolioItems.filter(item => item.category === 'YouTube').length },
    { key: 'Shorts', label: 'Shorts', count: portfolioItems.filter(item => item.category === 'Shorts').length }
  ] as const
  
  return (
    <section id="portfolio" className="py-8 xs:py-12 sm:py-16 md:py-20 px-4 sm:px-6 lg:px-8 max-w-7xl mx-auto">
      <motion.div
        initial={{ opacity: 0, y: 50 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.6, delay: 0.2 }}
        className="text-center mb-8 xs:mb-12 sm:mb-16"
      >
        <h2 className="font-display text-2xl xs:text-3xl sm:text-4xl md:text-5xl lg:text-6xl font-bold mb-3 xs:mb-4 sm:mb-6">
           <span className="gradient-text">Портфолио</span>
        </h2>
        <p className="text-base xs:text-lg sm:text-xl text-gray-300 max-w-2xl mx-auto px-2 sm:px-0 leading-relaxed">
          Виж някои от последните ни работи, които генерират гледания и ангажираност
        </p>
      </motion.div>
      
      {/* Filter Menu */}
      <motion.div
        initial={{ opacity: 0, y: 30 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.6, delay: 0.4 }}
        className="flex flex-wrap justify-center gap-2 xs:gap-3 sm:gap-4 mb-6 xs:mb-8 sm:mb-12 px-2 sm:px-0"
      >
        {filterButtons.map((button) => (
          <motion.button
            key={button.key}
            onClick={() => setActiveFilter(button.key)}
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.95 }}
            className={`px-3 xs:px-4 sm:px-6 py-2 xs:py-2 sm:py-3 rounded-full font-semibold transition-all duration-300 flex items-center gap-1 xs:gap-1 sm:gap-2 text-xs xs:text-sm sm:text-base ${
              activeFilter === button.key
                ? 'bg-gradient-primary text-white shadow-lg shadow-primary-blue/20'
                : 'bg-dark-card text-gray-300 hover:bg-dark-border hover:text-white border border-dark-border'
            }`}
          >
            {button.label}
            <span className={`text-xs px-1 xs:px-1.5 sm:px-2 py-0.5 xs:py-0.5 sm:py-1 rounded-full ${
              activeFilter === button.key
                ? 'bg-white/20 text-white'
                : 'bg-gray-600 text-gray-300'
            }`}>
              {button.count}
            </span>
          </motion.button>
        ))}
      </motion.div>
      
      {/* Portfolio Grid */}
      <motion.div 
        style={{ y: portfolioY }}
        layout
        className="grid grid-cols-1 xs:grid-cols-2 lg:grid-cols-3 gap-3 xs:gap-4 sm:gap-6 lg:gap-8"
      >
        {filteredItems.map((item) => (
          <motion.div
            key={`${activeFilter}-${item.id}`}
            layout
            initial={{ opacity: 0, scale: 0.9 }}
            animate={{ opacity: 1, scale: 1 }}
            exit={{ opacity: 0, scale: 0.9 }}
            transition={{ duration: 0.3 }}
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.98 }}
            className="group relative bg-dark-card rounded-lg xs:rounded-2xl overflow-hidden border border-dark-border hover:border-primary-blue hover:shadow-lg hover:shadow-primary-blue/20 transition-all duration-300 ease-out"
          >
            {/* Thumbnail */}
            <div 
              className="aspect-video bg-gradient-to-br from-primary-blue/20 via-primary-purple/20 to-primary-teal/20 relative overflow-hidden cursor-pointer"
              onClick={() => {
                if (item.link) {
                  window.open(item.link, '_blank');
                }
              }}
            >
              <img 
                src={item.thumbnail} 
                alt={item.title}
                className="w-full h-full object-cover"
                onError={(e) => {
                  e.currentTarget.src = '/api/placeholder/400/300'
                }}
              />
              
              <div className="absolute inset-0 bg-black/30 group-hover:bg-black/10 transition-all duration-300"></div>
              
              {/* Play Button Overlay */}
              <div className="absolute inset-0 flex items-center justify-center">
                <motion.div 
                  whileHover={{ scale: 1.15, rotate: 5 }}
                  transition={{ type: "spring", stiffness: 400, damping: 25 }}
                  className="w-12 h-12 xs:w-16 xs:h-16 bg-primary-blue/90 group-hover:bg-gradient-primary rounded-full flex items-center justify-center backdrop-blur-sm transition-colors duration-300"
                >
                  <img src="/32x32logo.png" alt="Play" className="w-6 h-6 xs:w-8 xs:h-8" />
                </motion.div>
              </div>
              
              {/* Video Type Badge */}
              <div className={`absolute top-2 left-2 xs:top-4 xs:left-4 px-2 xs:px-3 py-1 rounded-full text-xs xs:text-sm font-semibold flex items-center gap-1 ${
                item.category === 'Shorts' 
                  ? 'bg-purple-600 text-white' 
                  : 'bg-red-600 text-white'
              }`}>
                {item.category === 'Shorts' ? (
                  <>
                    <Video className="w-3 h-3 xs:w-4 xs:h-4" />
                    Short
                  </>
                ) : (
                  <>
                    <Youtube className="w-3 h-3 xs:w-4 xs:h-4" />
                    YouTube
                  </>
                )}
              </div>
            </div>
            
            {/* Content */}
            <div className="p-4 xs:p-6">
              <h3 className="font-display text-base xs:text-lg font-semibold mb-2 xs:mb-3 group-hover:text-primary-blue transition-colors leading-tight line-clamp-2 min-h-[3rem] xs:min-h-[3.5rem]">
                {item.title}
              </h3>
              <p className="text-gray-400 text-xs xs:text-sm mb-3 xs:mb-4">
                Професионален видео монтаж • Цветна корекция • Анимации
              </p>
              <a 
                href={item.link} 
                target="_blank" 
                rel="noopener noreferrer"
                className="inline-flex items-center gap-2 text-primary-blue hover:text-primary-purple transition-colors text-xs xs:text-sm font-medium"
              >
                <Youtube className="w-3 h-3 xs:w-4 xs:h-4" />
                Виж видеото
              </a>
            </div>
          </motion.div>
        ))}
      </motion.div>
      
      {/* Back to Home Button */}
      <motion.div
        initial={{ opacity: 0, y: 50 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.6, delay: 0.8 }}
        className="text-center mt-8 xs:mt-12 sm:mt-16"
      >
        <Link href="/">
          <motion.button
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.95 }}
            className="bg-gradient-primary text-white px-6 xs:px-8 py-3 xs:py-4 rounded-full font-semibold text-base xs:text-lg flex items-center gap-2 mx-auto cursor-glow"
          >
            <ArrowLeft className="w-4 h-4 xs:w-5 xs:h-5" />
            Обратно към началото
          </motion.button>
        </Link>
      </motion.div>
    </section>
  )
}

export default function Portfolio() {
  return (
    <main className="min-h-screen bg-dark-bg text-white overflow-x-hidden relative">
      <ParallaxBackground />
      <NavigationBar />
      <div className="pt-16 sm:pt-24">
        <PortfolioSection />
      </div>
    </main>
  )
} 