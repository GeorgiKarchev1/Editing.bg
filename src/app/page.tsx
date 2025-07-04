'use client'

import { motion, useScroll, useTransform } from 'framer-motion'
import { useInView } from 'react-intersection-observer'
import { PlayCircle, Star, Clock, Video, Zap, CheckCircle, ChevronDown, Mail, Github, Youtube, Instagram, MessageCircle, Check, Send } from 'lucide-react'
import { useState } from 'react'

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
        className="absolute top-20 left-10 w-32 h-32 bg-primary-yellow/5 rounded-full blur-xl"
      />
      <motion.div 
        style={{ y: y2, rotate: rotate2 }}
        className="absolute top-40 right-20 w-24 h-24 bg-primary-yellow/10 rounded-full blur-lg"
      />
      <motion.div 
        style={{ y: y3 }}
        className="absolute bottom-40 left-1/4 w-40 h-40 bg-primary-yellow/3 rounded-full blur-2xl"
      />
      <motion.div 
        style={{ y: y1, rotate: rotate1 }}
        className="absolute bottom-20 right-10 w-20 h-20 bg-primary-yellow/8 rounded-full blur-md"
      />
      <motion.div 
        style={{ y: y2 }}
        className="absolute top-1/2 left-1/2 w-16 h-16 bg-primary-yellow/6 rounded-full blur-sm"
      />
      
      {/* Geometric shapes */}
      <motion.div 
        style={{ y: y2, rotate: rotate1 }}
        className="absolute top-60 right-1/4 w-12 h-12 border border-primary-yellow/20 rotate-45"
      />
      <motion.div 
        style={{ y: y3, rotate: rotate2 }}
        className="absolute bottom-60 left-1/3 w-8 h-8 bg-primary-yellow/15 transform rotate-12"
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
      <PortfolioSection />
      <TestimonialsSection />
      <AboutSection />
      <ContactSection />
      <Footer />
      <FloatingCTA />
    </main>
  )
}

function NavigationBar() {
  return (
    <motion.nav 
      initial={{ y: -100 }}
      animate={{ y: 0 }}
      className="fixed top-0 left-0 right-0 z-50 bg-dark-bg/80 backdrop-blur-lg border-b border-dark-border"
    >
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex justify-between items-center h-16">
          <motion.a
            href="#hero"
            whileHover={{ scale: 1.05 }}
            className="font-display font-bold text-xl text-primary-yellow cursor-pointer"
          >
            Editing.bg
          </motion.a>
          
          <div className="hidden md:flex space-x-8">
            {[
              { name: 'Портфолио', href: 'portfolio' },
              { name: 'За нас', href: 'about' },
              { name: 'Отзиви', href: 'testimonials' },
              { name: 'Свържи се', href: 'contact' }
            ].map((item) => (
              <motion.a
                key={item.name}
                href={`#${item.href}`}
                whileHover={{ scale: 1.1, color: '#FFD700' }}
                className="text-gray-300 hover:text-primary-yellow transition-colors cursor-glow"
              >
                {item.name}
              </motion.a>
            ))}
          </div>
        </div>
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
    <section id="hero" ref={ref} className="min-h-screen flex items-center justify-center relative overflow-hidden bg-noise pt-20">
      {/* Background Video Placeholder */}
      <div className="absolute inset-0 bg-gradient-to-br from-dark-bg via-dark-card to-dark-bg opacity-90"></div>
      
      {/* Parallax Floating Elements */}
      <motion.div 
        style={{ y: floatingY1 }}
        animate={{ y: [-20, 20, -20], rotate: [0, 180, 360] }}
        className="absolute top-32 left-10 w-16 h-16 bg-primary-yellow/20 rounded-full blur-sm"
      />
      <motion.div 
        style={{ y: floatingY2 }}
        animate={{ y: [20, -20, 20], rotate: [360, 180, 0] }}
        className="absolute bottom-20 right-10 w-24 h-24 bg-primary-yellow/10 rounded-full blur-md"
      />
      
      {/* Additional parallax elements */}
      <motion.div 
        style={{ y: floatingY1 }}
        animate={{ x: [-30, 30, -30], rotate: [0, 45, 0] }}
        className="absolute top-1/4 right-1/4 w-12 h-12 border-2 border-primary-yellow/30 rotate-45"
      />
      <motion.div 
        style={{ y: floatingY2 }}
        animate={{ x: [40, -40, 40], scale: [1, 1.2, 1] }}
        className="absolute bottom-1/3 left-1/5 w-8 h-8 bg-primary-yellow/25 transform rotate-12"
      />
      
      <motion.div 
        style={{ y: heroY, opacity: heroOpacity }}
        className="relative z-10 text-center max-w-4xl mx-auto px-4"
      >
        <motion.h1 
          initial={{ opacity: 0, y: 50 }}
          animate={inView ? { opacity: 1, y: 0 } : {}}
          className="font-display text-4xl sm:text-5xl md:text-6xl lg:text-7xl font-bold mb-6 leading-relaxed tracking-wide"
        >
          Превърни видеата си в{' '}
          <br className="hidden sm:block" />
          <motion.span 
            animate={{ textShadow: ['0 0 20px #FFD700', '0 0 40px #FFD700', '0 0 20px #FFD700'] }}
            className="text-primary-yellow"
          >
            завладяващо
          </motion.span>{' '}
          съдържание
        </motion.h1>
        
        <motion.p 
          initial={{ opacity: 0, y: 30 }}
          animate={inView ? { opacity: 1, y: 0 } : {}}
          className="text-xl md:text-2xl text-gray-300 mb-12 max-w-2xl mx-auto"
        >
          Професионално видео монтиране, което прави съдържанието ти да блести. От суров материал до готови за вайръл шедьоври.
        </motion.p>
        
        <motion.div 
          initial={{ opacity: 0, y: 20 }}
          animate={inView ? { opacity: 1, y: 0 } : {}}
          className="flex flex-col sm:flex-row gap-4 justify-center items-center"
        >
          <motion.button
            whileHover={{ scale: 1.05, boxShadow: '0 0 30px #FFD700' }}
            whileTap={{ scale: 0.95 }}
            className="bg-primary-yellow text-black px-8 py-4 rounded-full font-semibold text-lg flex items-center gap-2 cursor-glow animate-glow"
          >
            <PlayCircle className="w-6 h-6" />
            Виж работата ни
          </motion.button>
          
          <motion.button
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.95 }}
            className="border-2 border-primary-yellow text-primary-yellow px-8 py-4 rounded-full font-semibold text-lg hover:bg-primary-yellow hover:text-black transition-all cursor-glow"
          >
            Да работим заедно
          </motion.button>
        </motion.div>
        
        {/* Video Demo Placeholder */}
        <motion.div 
          initial={{ opacity: 0, scale: 0.8 }}
          animate={inView ? { opacity: 1, scale: 1 } : {}}
          className="mt-16 relative max-w-4xl mx-auto"
        >
          <div className="aspect-video bg-dark-card rounded-2xl border-2 border-primary-yellow/30 overflow-hidden relative">
            <div className="absolute inset-0 bg-gradient-to-br from-primary-yellow/20 to-transparent"></div>
            <div className="absolute inset-0 flex items-center justify-center">
              <motion.div 
                whileHover={{ scale: 1.1 }}
                className="w-20 h-20 bg-primary-yellow rounded-full flex items-center justify-center cursor-pointer"
              >
                <PlayCircle className="w-10 h-10 text-black" />
              </motion.div>
            </div>
            <div className="absolute bottom-4 left-4 text-sm text-gray-400">
              Демо ролка - Най-доброто от 2024
            </div>
          </div>
        </motion.div>
      </motion.div>
    </section>
  )
}

function PortfolioSection() {
  const [ref, inView] = useInView({ triggerOnce: true, threshold: 0.1 })
  const { scrollYProgress } = useScroll()
  
  const portfolioY = useTransform(scrollYProgress, [0.2, 0.8], [50, -50])
  const portfolioOpacity = useTransform(scrollYProgress, [0.1, 0.3, 0.7, 0.9], [0, 1, 1, 0])
  
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
      id: 7,
      title: 'Работа Преди и След Трансформацията',
      category: 'Shorts',
      link: "https://youtube.com/shorts/KtpY-yzXTCk?feature=share",
      thumbnail: "https://img.youtube.com/vi/KtpY-yzXTCk/maxresdefault.jpg",
      type: "video",
    },
    {
      id: 8,
      title: 'Mr. Airpod Компилация V2',
      category: 'Shorts',
      link: "https://youtube.com/shorts/cs9b2SemtA0?feature=share",
      thumbnail: "https://img.youtube.com/vi/cs9b2SemtA0/maxresdefault.jpg",
      type: "video",
    },
    {
      id: 9,
      title: 'Vonster Кратки Акценти',
      category: 'Shorts',
      link: "https://youtube.com/shorts/I6njVaxRkf8?feature=share",
      thumbnail: "https://img.youtube.com/vi/I6njVaxRkf8/maxresdefault.jpg",
      type: "video",
    },
  ]
  
  return (
    <section id="portfolio" ref={ref} className="py-20 px-4 sm:px-6 lg:px-8 max-w-7xl mx-auto">
      <motion.div
        initial={{ opacity: 0, y: 50 }}
        animate={inView ? { opacity: 1, y: 0 } : {}}
        className="text-center mb-16"
      >
        <h2 className="font-display text-4xl md:text-6xl font-bold mb-6">
           <span className="text-primary-yellow">Портфолио</span>
        </h2>
        <p className="text-xl text-gray-300 max-w-2xl mx-auto">
          Виж някои от последните ни работи, които генерират гледания и ангажираност
        </p>
      </motion.div>
      

      
      {/* Portfolio Grid */}
      <motion.div 
        style={{ y: portfolioY }}
        layout
        className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8"
      >
        {portfolioItems.map((item, index) => (
          <motion.div
            key={item.id}
            layout
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.98 }}
            className="group relative bg-dark-card rounded-2xl overflow-hidden border border-dark-border hover:border-primary-yellow hover:shadow-lg hover:shadow-primary-yellow/20 transition-all duration-300 ease-out"
          >
            {/* Thumbnail */}
            <div 
              className="aspect-video bg-gradient-to-br from-primary-yellow/20 to-dark-bg relative overflow-hidden cursor-pointer"
              onClick={() => {
                if (item.link) {
                  window.open(item.link, '_blank');
                }
              }}
            >
                            {false ? (
                /* Local Video Thumbnail */
                <img 
                  src={item.thumbnail} 
                  alt={item.title}
                  className={`w-full h-full ${
                    item.title === 'Vonster Short Highlights' || item.title === 'Mr. Airpod Compilation V2' 
                      ? 'object-cover object-center' 
                      : 'object-cover'
                  }`}
                  style={
                    item.title === 'Vonster Short Highlights' || item.title === 'Mr. Airpod Compilation V2'
                      ? { objectPosition: 'center center' }
                      : {}
                  }
                  onError={(e) => {
                    e.currentTarget.src = '/api/placeholder/400/300'
                  }}
                />
              ) : (
                /* YouTube Thumbnail */
                <img 
                  src={item.thumbnail} 
                  alt={item.title}
                  className="w-full h-full object-cover"
                  onError={(e) => {
                    e.currentTarget.src = '/api/placeholder/400/300'
                  }}
                />
              )}
              
              <div className="absolute inset-0 bg-black/30 group-hover:bg-black/10 transition-all duration-300"></div>
              
              {/* Play Button Overlay */}
              <div className="absolute inset-0 flex items-center justify-center">
                <motion.div 
                  whileHover={{ scale: 1.15, rotate: 5 }}
                  transition={{ type: "spring", stiffness: 400, damping: 25 }}
                  className="w-16 h-16 bg-primary-yellow/90 group-hover:bg-primary-yellow rounded-full flex items-center justify-center backdrop-blur-sm transition-colors duration-300"
                >
                  <PlayCircle className="w-8 h-8 text-black" />
                </motion.div>
              </div>
              

              
              {/* Video Type Badge */}
              <div className={`absolute top-4 left-4 px-3 py-1 rounded-full text-sm font-semibold flex items-center gap-1 ${
                false 
                  ? 'bg-purple-600 text-white' 
                  : 'bg-red-600 text-white'
              }`}>
                {false ? (
                  <>
                    <Video className="w-4 h-4" />
                    Short
                  </>
                ) : (
                  <>
                    <Youtube className="w-4 h-4" />
                    YouTube
                  </>
                )}
              </div>
            </div>
            
            {/* Content */}
            <div className="p-6">
              <h3 className="font-display text-lg font-semibold mb-3 group-hover:text-primary-yellow transition-colors leading-tight line-clamp-2 min-h-[3.5rem]">
                {item.title}
              </h3>
              <p className="text-gray-400 text-sm mb-4">
                Професионален видео монтаж • Цветна корекция • Анимации
              </p>
              {false ? (
                                  <div className="inline-flex items-center gap-2 text-primary-yellow text-sm font-medium">
                    <Video className="w-4 h-4" />
                    Кликни за да изгледаш шорта
                  </div>
              ) : (
                <a 
                  href={item.link} 
                  target="_blank" 
                  rel="noopener noreferrer"
                  className="inline-flex items-center gap-2 text-primary-yellow hover:text-yellow-300 transition-colors text-sm font-medium"
                >
                  <Youtube className="w-4 h-4" />
                  YouTube
                </a>
              )}
            </div>
          </motion.div>
        ))}
      </motion.div>
    </section>
  )
}

function TestimonialsSection() {
  const [ref, inView] = useInView({ triggerOnce: true, threshold: 0.1 })
  
  const testimonials = [
    {
      id: 1,
      name: 'Алекс Джонсън',
      role: 'Създател на съдържание',
      avatar: '/api/placeholder/60/60',
      content: 'Editing.bg превърнаха суровия ми материал в нещо невероятно. Видеата ми сега получават 10 пъти повече ангажираност!',
      rating: 5,
      platform: 'YouTube'
    },
    {
      id: 2,
      name: 'Мария Гарсия',
      role: 'Инфлуенсър',
      avatar: '/api/placeholder/60/60',
      content: 'Стилът на монтиране е точно това, от което се нуждаех за бранда ми. Професионално, креативно и винаги навреме.',
      rating: 5,
      platform: 'Instagram'
    },
    {
      id: 3,
      name: 'Давид Чен',
      role: 'Бизнес собственик',
      avatar: '/api/placeholder/60/60',
      content: 'Видеата ми за продукти станаха вайръл след като Editing.bg ги монтираха. Възвръщаемостта на инвестицията е невероятна.',
      rating: 5,
      platform: 'TikTok'
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
            Какво Казват <span className="text-primary-yellow">Клиентите</span>
          </h2>
          <p className="text-xl text-gray-300 max-w-2xl mx-auto">
            Не се доверявайте само на думите ни - ето какво казват създателите за работата ни
          </p>
        </motion.div>
        
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          {testimonials.map((testimonial, index) => (
            <div key={testimonial.id} className="bg-dark-card p-8 rounded-2xl border border-dark-border hover:border-primary-yellow/50 transition-all">
              {/* Stars */}
              <div className="flex gap-1 mb-4">
                {[...Array(testimonial.rating)].map((_, i) => (
                  <Star key={i} className="w-5 h-5 fill-primary-yellow text-primary-yellow" />
                ))}
              </div>
              
              {/* Content */}
              <p className="text-gray-300 mb-6 italic">
                "{testimonial.content}"
              </p>
              
              {/* Author */}
              <div className="flex items-center gap-4">
                <div className="w-12 h-12 bg-gradient-to-br from-primary-yellow to-primary-yellow-dark rounded-full flex items-center justify-center text-black font-bold">
                  {testimonial.name.charAt(0)}
                </div>
                <div>
                  <h4 className="font-semibold text-white">{testimonial.name}</h4>
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
          За <span className="text-primary-yellow">Екипа</span>
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
            <div className="w-80 h-80 mx-auto bg-gradient-to-br from-primary-yellow/20 to-dark-card rounded-3xl border-4 border-primary-yellow/30 overflow-hidden">
              <img 
                src="/Editing.bg photo.jpg" 
                alt="Tsvetan Georgiev"
                className="w-full h-full object-cover"
                onError={(e) => {
                  const target = e.target as HTMLImageElement;
                  target.src = 'data:image/svg+xml;base64,PHN2ZyB3aWR0aD0iMzIwIiBoZWlnaHQ9IjMyMCIgdmlld0JveD0iMCAwIDMyMCAzMjAiIGZpbGw9Im5vbmUiIHhtbG5zPSJodHRwOi8vd3d3LnczLm9yZy8yMDAwL3N2ZyI+CjxyZWN0IHdpZHRoPSIzMjAiIGhlaWdodD0iMzIwIiBmaWxsPSIjMUYyOTM3Ii8+CjxjaXJjbGUgY3g9IjE2MCIgY3k9IjEzMCIgcj0iNDAiIGZpbGw9IiNGRkQ3MDAiLz4KPHBhdGggZD0iTTk1IDI0MEMxNzUgMTAwIDI0NSAxMTAgMzA1IDI0MEg5NVoiIGZpbGw9IiNGRkQ3MDAiLz4KPHRleHQgeD0iMTYwIiB5PSIyODUiIHRleHQtYW5jaG9yPSJtaWRkbGUiIGZvbnQtZmFtaWx5PSJBcmlhbCIgZm9udC1zaXplPSIxOCIgZmlsbD0iI0ZGRDcwMCI+VHN2ZXRhbiBHZW9yZ2lldmjwvc3ZnPg==';
                }}
              />
            </div>
            {/* Decorative Icon */}
            <motion.div 
              animate={{ rotate: 360 }}
              className="absolute -top-3 -right-3 w-16 h-16 bg-primary-yellow rounded-full flex items-center justify-center"
            >
              <Video className="w-8 h-8 text-black" />
            </motion.div>
          </div>
          
          {/* Tsvetan Georgiev Info */}
          <div>
            <h3 className="font-display text-3xl font-bold mb-4 text-white">
              Tsvetan Georgiev
            </h3>
            <p className="text-primary-yellow font-semibold mb-6 text-xl">
              CEO
            </p>
            <p className="text-gray-300 text-lg mb-8 max-w-lg mx-auto leading-relaxed">
              Основател и CEO на Editing.bg, водещ креативната визия и бизнес стратегията. 
              Експерт във видео монтиране с години опит в трансформирането на съдържание за създатели по целия свят.
            </p>
            
            {/* Skills/Specialties */}
            <div className="flex flex-wrap gap-3 justify-center">
              {['Лидерство', 'Креативна визия', 'Бизнес стратегия'].map((skill) => (
                <span key={skill} className="bg-primary-yellow/20 text-primary-yellow px-4 py-2 rounded-full text-sm font-semibold">
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
            <div className="w-80 h-80 mx-auto bg-gradient-to-br from-primary-yellow/20 to-dark-card rounded-3xl border-4 border-primary-yellow/30 overflow-hidden">
              <img 
                src="/azusmihnat.JPG" 
                alt="Team Member 2"
                className="w-full h-full object-cover"
                onError={(e) => {
                  const target = e.target as HTMLImageElement;
                  target.src = 'data:image/svg+xml;base64,PHN2ZyB3aWR0aD0iMzIwIiBoZWlnaHQ9IjMyMCIgdmlld0JveD0iMCAwIDMyMCAzMjAiIGZpbGw9Im5vbmUiIHhtbG5zPSJodHRwOi8vd3d3LnczLm9yZy8yMDAwL3N2ZyI+CjxyZWN0IHdpZHRoPSIzMjAiIGhlaWdodD0iMzIwIiBmaWxsPSIjMUYyOTM3Ii8+CjxjaXJjbGUgY3g9IjE2MCIgY3k9IjEzMCIgcj0iNDAiIGZpbGw9IiNGRkQ3MDAiLz4KPHBhdGggZD0iTTk1IDI0MEMxNzUgMTAwIDI0NSAxMTAgMzA1IDI0MEg5NVoiIGZpbGw9IiNGRkQ3MDAiLz4KPHRleHQgeD0iMTYwIiB5PSIyODUiIHRleHQtYW5jaG9yPSJtaWRkbGUiIGZvbnQtZmFtaWx5PSJBcmlhbCIgZm9udC1zaXplPSIxOCIgZmlsbD0iI0ZGRDcwMCI+VGVhbSBNZW1iZXIgMjwvdGV4dD4KPC9zdmc+';
                }}
              />
            </div>
            {/* Decorative Icon */}
              <motion.div
              animate={{ rotate: -360 }}
              className="absolute -top-3 -right-3 w-16 h-16 bg-primary-yellow rounded-full flex items-center justify-center"
            >
              <Video className="w-8 h-8 text-black" />
              </motion.div>
          </div>
          
          {/* Team Member 2 Info */}
          <div>
            <h3 className="font-display text-3xl font-bold mb-4 text-white">
              Georgi Karchev
            </h3>
            <p className="text-primary-yellow font-semibold mb-6 text-xl">
              CTO/COO
            </p>
            <p className="text-gray-300 text-lg mb-8 max-w-lg mx-auto leading-relaxed">
              Технически лидер и директор по операциите на Editing.bg, комбиниращ най-съвременните технологии с творческо съвършенство. 
              Експерт в техническите иновации и оптимизиране на работните процеси за максимална ефективност и качество.
            </p>
            
            {/* Skills/Specialties */}
            <div className="flex flex-wrap gap-3 justify-center">
              {['Технически иновации', 'Операции', 'Осигуряване на качеството'].map((skill) => (
                <span key={skill} className="bg-primary-yellow/20 text-primary-yellow px-4 py-2 rounded-full text-sm font-semibold">
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
    
    // Simulate form submission
    await new Promise(resolve => setTimeout(resolve, 2000))
    
    setIsSubmitting(false)
    setIsSubmitted(true)
    
    // Reset form after success message
    setTimeout(() => {
      setIsSubmitted(false)
      setFormData({ name: '', email: '', message: '', projectType: 'YouTube Video' })
    }, 3000)
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
            Свържете се <span className="text-primary-yellow">с нас</span>
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
                      className="w-full px-4 py-3 bg-dark-bg border border-dark-border rounded-xl text-white placeholder-gray-500 focus:border-primary-yellow focus:outline-none transition-colors"
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
                      className="w-full px-4 py-3 bg-dark-bg border border-dark-border rounded-xl text-white placeholder-gray-500 focus:border-primary-yellow focus:outline-none transition-colors"
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
                      className="w-full px-4 py-3 bg-dark-bg border border-dark-border rounded-xl text-white focus:border-primary-yellow focus:outline-none transition-colors"
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
                      className="w-full px-4 py-3 bg-dark-bg border border-dark-border rounded-xl text-white placeholder-gray-500 focus:border-primary-yellow focus:outline-none transition-colors resize-none"
                      placeholder="Разкажете ни за вашия проект, график и специфични изисквания..."
                    />
                  </div>

                  <motion.button
                    type="submit"
                    disabled={isSubmitting}
                    whileHover={{ scale: 1.02 }}
                    whileTap={{ scale: 0.98 }}
                    className="w-full bg-primary-yellow text-black py-4 rounded-xl font-semibold hover:bg-yellow-400 transition-colors disabled:opacity-50 disabled:cursor-not-allowed flex items-center justify-center gap-2"
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
                <div className="flex items-center gap-2 text-gray-300">
                  <Mail className="w-5 h-5 text-primary-yellow" />
                  <span>hello@editing.bg</span>
                </div>
                <div className="flex items-center gap-2 text-gray-300">
                  <MessageCircle className="w-5 h-5 text-primary-yellow" />
                  <span>Telegram: @editingbg</span>
                </div>
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
          <div>
            <h3 className="font-display text-2xl font-bold text-primary-yellow mb-4">Editing.bg</h3>
            <p className="text-gray-300 mb-6">
              Професионални услуги за видео монтиране, които трансформират съдържанието ви и увеличават ангажираността.
            </p>
            <div className="flex space-x-4">
              <motion.a 
                whileHover={{ scale: 1.1, color: '#FFD700' }}
                href="#" 
                className="text-gray-400 hover:text-primary-yellow cursor-glow"
              >
                <Youtube className="w-6 h-6" />
              </motion.a>
              <motion.a 
                whileHover={{ scale: 1.1, color: '#FFD700' }}
                href="#" 
                className="text-gray-400 hover:text-primary-yellow cursor-glow"
              >
                <Instagram className="w-6 h-6" />
              </motion.a>
              <motion.a 
                whileHover={{ scale: 1.1, color: '#FFD700' }}
                href="#" 
                className="text-gray-400 hover:text-primary-yellow cursor-glow"
              >
                <Mail className="w-6 h-6" />
              </motion.a>
            </div>
          </div>
          
          {/* Services */}
          <div>
            <h4 className="font-semibold text-white mb-4">Услуги</h4>
            <ul className="space-y-2 text-gray-300">
              <li><a href="#" className="hover:text-primary-yellow transition-colors cursor-glow">YouTube монтиране</a></li>
              <li><a href="#" className="hover:text-primary-yellow transition-colors cursor-glow">Кратко съдържание</a></li>
              <li><a href="#" className="hover:text-primary-yellow transition-colors cursor-glow">Анимации</a></li>
              <li><a href="#" className="hover:text-primary-yellow transition-colors cursor-glow">Цветна корекция</a></li>
            </ul>
          </div>
          
          {/* Contact */}
          <div>
            <h4 className="font-semibold text-white mb-4">Свържете се с нас</h4>
            <p className="text-gray-300 mb-4">
              Готови сте да подобрите съдържанието си? Да обсъдим проекта ви!
            </p>
            <motion.button
              whileHover={{ scale: 1.05, boxShadow: '0 0 20px #FFD700' }}
              whileTap={{ scale: 0.95 }}
              className="bg-primary-yellow text-black px-6 py-3 rounded-full font-semibold cursor-glow"
            >
              Свържете се с нас
            </motion.button>
          </div>
        </div>
        
        <div className="border-t border-dark-border pt-8 text-center text-gray-400">
          <p>&copy; 2024 Editing.bg. Всички права запазени.</p>
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
        className="bg-primary-yellow text-black p-4 rounded-full shadow-lg cursor-glow animate-glow"
      >
        <Mail className="w-6 h-6" />
      </motion.button>
    </motion.div>
  )
}
