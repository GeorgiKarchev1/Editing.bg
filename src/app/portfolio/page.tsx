'use client'

import dynamic from 'next/dynamic'

// Dynamic import of the portfolio content to prevent SSR issues with localStorage
const PortfolioContent = dynamic(() => import('./PortfolioContent'), {
  ssr: false,
  loading: () => (
    <div className="min-h-screen bg-[#0a0a0f] flex items-center justify-center">
      <div className="w-12 h-12 border-4 border-[#4F46E5] border-t-transparent rounded-full animate-spin"></div>
    </div>
  ),
})

export default function Portfolio() {
  return <PortfolioContent />
}
