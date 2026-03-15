// Test webhook deployment - 2025-07-05 00:59
'use client'

import dynamic from 'next/dynamic'

// Dynamic import of the main content to prevent SSR issues with localStorage
const HomeContent = dynamic(() => import('./HomeContent'), {
  ssr: false,
  loading: () => (
    <div className="min-h-screen bg-[#0a0a0f] flex items-center justify-center">
      <div className="w-12 h-12 border-4 border-[#4F46E5] border-t-transparent rounded-full animate-spin"></div>
    </div>
  ),
})

export default function Home() {
  return <HomeContent />
}
