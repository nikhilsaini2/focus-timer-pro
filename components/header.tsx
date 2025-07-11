"use client"

import Link from "next/link"
import { Button } from "@/components/ui/button"
import { useTheme } from "next-themes"
import { Moon, Sun } from "lucide-react"

export function Header() {
  const { theme, setTheme } = useTheme()
  return (
    <header className="fixed top-0 left-0 right-0 z-50">
      <div className="flex items-center justify-between px-8 py-5 md:py-6 backdrop-blur-xl bg-gradient-to-b from-black/80 via-black/60 to-black/30 shadow-lg border-b-0 relative">
        <div className="flex items-center gap-3">
          <Link href="/" className="flex items-center gap-3 group">
            {/* Logo with soft shadow/glow */}
            <div className="w-10 h-10 rounded-full bg-gradient-to-br from-red-500 to-orange-500 flex items-center justify-center shadow-[0_0_16px_#f43f5e,0_0_8px_#f59e42] group-hover:shadow-[0_0_32px_#f43f5e,0_0_16px_#f59e42] transition-all">
              <svg width="20" height="20" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
                <path d="M12 6V12L16 14" stroke="white" strokeWidth="2" strokeLinecap="round" />
                <circle cx="12" cy="12" r="10" stroke="white" strokeWidth="2" />
              </svg>
            </div>
            <span className="font-bold text-xl md:text-2xl text-white drop-shadow-lg">FocusTimer</span>
          </Link>
        </div>
        <nav className="hidden md:flex items-center gap-14">
          <Link href="/#features" className="text-lg font-semibold text-gray-200 hover:text-white transition-colors relative group">
            <span>Features</span>
            <span className="absolute left-0 -bottom-1 w-0 group-hover:w-full h-0.5 bg-gradient-to-r from-orange-400 via-yellow-400 to-pink-500 rounded-full transition-all duration-300" />
          </Link>
          <Link href="/#how-it-works" className="text-lg font-semibold text-gray-200 hover:text-white transition-colors relative group">
            <span>How It Works</span>
            <span className="absolute left-0 -bottom-1 w-0 group-hover:w-full h-0.5 bg-gradient-to-r from-orange-400 via-yellow-400 to-pink-500 rounded-full transition-all duration-300" />
          </Link>
          <Link href="/#testimonials" className="text-lg font-semibold text-gray-200 hover:text-white transition-colors relative group">
            <span>Testimonials</span>
            <span className="absolute left-0 -bottom-1 w-0 group-hover:w-full h-0.5 bg-gradient-to-r from-orange-400 via-yellow-400 to-pink-500 rounded-full transition-all duration-300" />
          </Link>
          <Link href="/#faq" className="text-lg font-semibold text-gray-200 hover:text-white transition-colors relative group">
            <span>FAQ</span>
            <span className="absolute left-0 -bottom-1 w-0 group-hover:w-full h-0.5 bg-gradient-to-r from-orange-400 via-yellow-400 to-pink-500 rounded-full transition-all duration-300" />
          </Link>
        </nav>
        {/* Trophy icon with glow */}
        <span className="ml-6 flex items-center gap-4">
          <svg width="38" height="38" viewBox="0 0 38 38" fill="none" xmlns="http://www.w3.org/2000/svg" className="drop-shadow-[0_0_8px_#f59e42]">
            <defs>
              <linearGradient id="trophy-gradient" x1="0" y1="0" x2="38" y2="38" gradientUnits="userSpaceOnUse">
                <stop stopColor="#f43f5e" />
                <stop offset="1" stopColor="#f59e42" />
              </linearGradient>
            </defs>
            <path d="M11 6h16v4a8 8 0 01-16 0V6z" stroke="url(#trophy-gradient)" strokeWidth="2" fill="none"/>
            <path d="M19 26v6" stroke="url(#trophy-gradient)" strokeWidth="2" strokeLinecap="round"/>
            <circle cx="19" cy="34" r="2" fill="url(#trophy-gradient)"/>
            <path d="M5 10v2a6 6 0 006 6" stroke="url(#trophy-gradient)" strokeWidth="2" fill="none"/>
            <path d="M33 10v2a6 6 0 01-6 6" stroke="url(#trophy-gradient)" strokeWidth="2" fill="none"/>
          </svg>
        </span>
      </div>
      <style jsx>{`
        .animate-glow {
          animation: glowPulse 1.2s infinite alternate;
        }
        @keyframes glowPulse {
          0% { box-shadow: 0 0 8px #f59e42, 0 0 2px #f43f5e; }
          100% { box-shadow: 0 0 24px #f59e42, 0 0 8px #f43f5e; }
        }
      `}</style>
    </header>
  )
}
