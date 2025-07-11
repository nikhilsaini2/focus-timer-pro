'use client'

import Link from "next/link"
import { Github, Instagram, Linkedin, HelpCircle, Sparkles } from "lucide-react"
import { useRef, useEffect } from "react"
import gsap from "gsap"
import { ScrollTrigger } from "gsap/ScrollTrigger"
gsap.registerPlugin(ScrollTrigger)

export function Footer() {
  const footerRef = useRef<HTMLDivElement>(null)

  useEffect(() => {
    if (footerRef.current) {
      gsap.fromTo(
        footerRef.current,
        { y: 60, opacity: 0 },
        {
          y: 0,
          opacity: 1,
          duration: 1.2,
          ease: "power3.out",
          scrollTrigger: {
            trigger: footerRef.current,
            start: "top 90%",
            toggleActions: "play none none none",
          },
        }
      )
    }
  }, [])

  return (
    <footer ref={footerRef} className="relative py-14 px-6 bg-gradient-to-br from-black via-zinc-900 to-black overflow-hidden">
      {/* Subtle animated background accent */}
      <div className="absolute inset-0 pointer-events-none z-0">
        <div className="absolute top-[-10%] left-[-10%] w-[40vw] h-[40vw] bg-gradient-to-br from-pink-500/10 via-yellow-400/6 to-sky-400/10 rounded-full blur-3xl" />
        <div className="absolute bottom-[-10%] right-[-10%] w-[32vw] h-[32vw] bg-gradient-to-tr from-orange-500/10 via-pink-500/6 to-yellow-400/10 rounded-full blur-3xl" />
      </div>
      {/* Softer Divider */}
      <div className="absolute top-0 left-1/2 -translate-x-1/2 w-[80vw] h-1 bg-gradient-to-r from-red-500/30 via-orange-400/20 to-yellow-400/30 blur-[2px] opacity-30 rounded-full" />
      {/* Decorative floating sparkles (less bright) */}
      <div className="absolute left-8 top-8 z-0">
        <svg width="32" height="32" viewBox="0 0 32 32" fill="none"><g filter="url(#footer-glow1)"><path d="M16 4 L18 13 L28 16 L18 19 L16 28 L14 19 L4 16 L14 13 Z" fill="url(#footer-star1)" opacity="0.5"/></g><defs><radialGradient id="footer-star1" cx="0.5" cy="0.5" r="0.5" gradientTransform="matrix(32 0 0 32 0 0)" gradientUnits="userSpaceOnUse"><stop stopColor="#fffbe6"/><stop offset="0.5" stopColor="#fbbf24"/><stop offset="1" stopColor="#f43f5e"/></radialGradient><filter id="footer-glow1" x="-8" y="-8" width="48" height="48" filterUnits="userSpaceOnUse"><feGaussianBlur stdDeviation="3" result="blur"/><feMerge><feMergeNode in="blur"/><feMergeNode in="SourceGraphic"/></feMerge></filter></defs></svg>
      </div>
      <div className="absolute right-8 top-16 z-0">
        <svg width="24" height="24" viewBox="0 0 24 24" fill="none"><g filter="url(#footer-glow2)"><path d="M12 2 L13 8 L20 12 L13 16 L12 22 L11 16 L4 12 L11 8 Z" fill="url(#footer-star2)" opacity="0.4"/></g><defs><radialGradient id="footer-star2" cx="0.5" cy="0.5" r="0.5" gradientTransform="matrix(24 0 0 24 0 0)" gradientUnits="userSpaceOnUse"><stop stopColor="#fffbe6"/><stop offset="0.5" stopColor="#fbbf24"/><stop offset="1" stopColor="#f43f5e"/></radialGradient><filter id="footer-glow2" x="-6" y="-6" width="36" height="36" filterUnits="userSpaceOnUse"><feGaussianBlur stdDeviation="2" result="blur"/><feMerge><feMergeNode in="blur"/><feMergeNode in="SourceGraphic"/></feMerge></filter></defs></svg>
      </div>
      <div className="relative max-w-6xl mx-auto z-10">
        <div className="grid grid-cols-1 md:grid-cols-4 gap-10 items-center">
          <div className="md:col-span-2">
            <div className="flex items-center gap-3 mb-4">
              <div className="w-10 h-10 rounded-full bg-gradient-to-br from-red-500 to-orange-500 flex items-center justify-center shadow-lg">
                {/* Animated Pomodoro SVG Logo */}
                <svg width="22" height="22" viewBox="0 0 38 38" fill="none" xmlns="http://www.w3.org/2000/svg">
                  <ellipse cx="19" cy="22" rx="14" ry="13" fill="url(#pomodoro-footer)" />
                  <ellipse cx="19" cy="22" rx="12" ry="11" fill="url(#pomodoro-footer-inner)" />
                  <ellipse cx="19" cy="10" rx="5" ry="3" fill="url(#pomodoro-footer-leaf)" />
                  <defs>
                    <linearGradient id="pomodoro-footer" x1="5" y1="9" x2="33" y2="35" gradientUnits="userSpaceOnUse">
                      <stop stopColor="#f43f5e" />
                      <stop offset="1" stopColor="#f59e42" />
                    </linearGradient>
                    <linearGradient id="pomodoro-footer-inner" x1="7" y1="13" x2="31" y2="31" gradientUnits="userSpaceOnUse">
                      <stop stopColor="#fbbf24" />
                      <stop offset="1" stopColor="#f43f5e" />
                    </linearGradient>
                    <linearGradient id="pomodoro-footer-leaf" x1="14" y1="7" x2="24" y2="13" gradientUnits="userSpaceOnUse">
                      <stop stopColor="#22c55e" />
                      <stop offset="1" stopColor="#16a34a" />
                    </linearGradient>
                  </defs>
                </svg>
              </div>
              <span className="font-bold text-lg text-white tracking-wide drop-shadow bg-clip-text text-transparent bg-gradient-to-r from-orange-400 via-yellow-300 to-pink-500">FocusTimer</span>
            </div>
            <p className="text-gray-300 mb-5 max-w-md text-base">
              FocusTimer helps you stay productive with the proven Pomodoro technique. Work in focused sprints, take
              regular breaks, and track your progress to achieve more every day.
            </p>
            <div className="flex gap-4 mt-2">
              <a
                href="https://www.linkedin.com/in/nikhilsaini2/"
                target="_blank"
                rel="noopener noreferrer"
                className="rounded-full bg-white/10 hover:bg-gradient-to-br hover:from-red-500 hover:to-orange-400 p-2 transition-all duration-200 shadow-md hover:shadow-orange-400/40 group"
                aria-label="LinkedIn"
              >
                <Linkedin className="h-5 w-5 text-gray-200 group-hover:text-white transition-colors" />
              </a>
              <a
                href="https://github.com/nikhilsaini2"
                target="_blank"
                rel="noopener noreferrer"
                className="rounded-full bg-white/10 hover:bg-gradient-to-br hover:from-red-500 hover:to-orange-400 p-2 transition-all duration-200 shadow-md hover:shadow-orange-400/40 group"
                aria-label="GitHub"
              >
                <Github className="h-5 w-5 text-gray-200 group-hover:text-white transition-colors" />
              </a>
              <a
                href="https://www.instagram.com/nikhilsaini_07/"
                target="_blank"
                rel="noopener noreferrer"
                className="rounded-full bg-white/10 hover:bg-gradient-to-br hover:from-red-500 hover:to-orange-400 p-2 transition-all duration-200 shadow-md hover:shadow-orange-400/40 group"
                aria-label="Instagram"
              >
                <Instagram className="h-5 w-5 text-gray-200 group-hover:text-white transition-colors" />
              </a>
            </div>
          </div>

          <div>
            <h3 className="font-semibold text-white mb-2 tracking-wide text-lg flex items-center gap-2">
              Product
              <span className="block w-16 h-1 bg-gradient-to-r from-orange-400 to-yellow-400 rounded-full ml-2" />
            </h3>
            <ul className="space-y-3 mt-4">
              <li>
                <Link href="#features" className="flex items-center gap-2 text-gray-300 hover:text-orange-400 transition-colors font-medium">
                  <span className="inline-block">
                    <svg width="18" height="18" viewBox="0 0 24 24" fill="none"><g filter="url(#sparkle-glow)"><path d="M12 2 L13 8 L20 12 L13 16 L12 22 L11 16 L4 12 L11 8 Z" fill="url(#sparkle-gradient)" opacity="0.6"/></g><defs><radialGradient id="sparkle-gradient" cx="0.5" cy="0.5" r="0.5" gradientTransform="matrix(24 0 0 24 0 0)" gradientUnits="userSpaceOnUse"><stop stopColor="#fffbe6"/><stop offset="0.5" stopColor="#fbbf24"/><stop offset="1" stopColor="#f43f5e"/></radialGradient><filter id="sparkle-glow" x="-6" y="-6" width="36" height="36" filterUnits="userSpaceOnUse"><feGaussianBlur stdDeviation="2" result="blur"/><feMerge><feMergeNode in="blur"/><feMergeNode in="SourceGraphic"/></feMerge></filter></defs></svg>
                  </span>
                  Features
                </Link>
              </li>
              <li>
                <Link href="#faq" className="flex items-center gap-2 text-gray-300 hover:text-orange-400 transition-colors font-medium">
                  <span className="inline-block">
                    <svg width="18" height="18" viewBox="0 0 22 22" fill="none"><circle cx="11" cy="11" r="11" fill="url(#qmark-bg-footer)" opacity="0.7"/><text x="11" y="16" textAnchor="middle" fontSize="16" fontWeight="bold" fill="#fff">?</text><defs><radialGradient id="qmark-bg-footer" cx="0.5" cy="0.5" r="0.5" gradientTransform="matrix(22 0 0 22 0 0)" gradientUnits="userSpaceOnUse"><stop stopColor="#fbbf24"/><stop offset="1" stopColor="#f43f5e"/></radialGradient></defs></svg>
                  </span>
                  FAQ
                </Link>
              </li>
            </ul>
          </div>

          {/* Motivational Trophy with soft glow */}
          <div className="flex justify-center md:justify-end mt-8 md:mt-0">
            <div
              className="rounded-xl shadow-lg border-2 border-orange-400/20 bg-gradient-to-br from-black via-zinc-900 to-black flex items-center justify-center"
              style={{ width: 360, height: 360, boxShadow: '0 0 32px 0 #fbbf2422, 0 0 8px 0 #f59e4222' }}
            >
              {/* OpenMoji Trophy SVG with custom soft glow */}
              <svg width="220" height="220" viewBox="0 0 72 72" fill="none" xmlns="http://www.w3.org/2000/svg" className="drop-shadow-xl">
                <g filter="url(#footer-trophy-glow)">
                  <ellipse cx="36" cy="36" rx="34" ry="34" fill="url(#footer-trophy-bg)" opacity="0.08" />
                  <path d="M36 12c-6.627 0-12 5.373-12 12v8c0 8.837 7.163 16 16 16s16-7.163 16-16v-8c0-6.627-5.373-12-12-12z" fill="#FCEA2B" stroke="#F1B31C" strokeWidth="2"/>
                  <path d="M24 20v8c0 6.627 5.373 12 12 12s12-5.373 12-12v-8" fill="#F1B31C"/>
                  <ellipse cx="36" cy="56" rx="10" ry="6" fill="#F1B31C" stroke="#F1B31C" strokeWidth="2"/>
                  <ellipse cx="36" cy="56" rx="7" ry="4" fill="#FCEA2B"/>
                  <rect x="30" y="44" width="12" height="8" rx="4" fill="#F1B31C"/>
                  <rect x="32" y="46" width="8" height="4" rx="2" fill="#FCEA2B"/>
                  <path d="M16 24c0 6.627 5.373 12 12 12" stroke="#F1B31C" strokeWidth="2"/>
                  <path d="M56 24c0 6.627-5.373 12-12 12" stroke="#F1B31C" strokeWidth="2"/>
                  <path d="M12 28c0 8 8 14 16 14" stroke="#F1B31C" strokeWidth="2"/>
                  <path d="M60 28c0 8-8 14-16 14" stroke="#F1B31C" strokeWidth="2"/>
                </g>
                <defs>
                  <radialGradient id="footer-trophy-bg" cx="0.5" cy="0.5" r="0.5" gradientTransform="matrix(72 0 0 72 0 0)" gradientUnits="userSpaceOnUse">
                    <stop stopColor="#fffbe6"/>
                    <stop offset="0.5" stopColor="#fbbf24"/>
                    <stop offset="1" stopColor="#f43f5e"/>
                  </radialGradient>
                  <filter id="footer-trophy-glow" x="-8" y="-8" width="88" height="88" filterUnits="userSpaceOnUse">
                    <feGaussianBlur stdDeviation="4" result="blur"/>
                    <feMerge>
                      <feMergeNode in="blur"/>
                      <feMergeNode in="SourceGraphic"/>
                    </feMerge>
                  </filter>
                </defs>
              </svg>
            </div>
          </div>
        </div>

        {/* Motivational Quote */}
        <div className="mt-12 mb-4 text-center">
          <span className="inline-block text-lg font-semibold bg-gradient-to-r from-red-400 via-orange-400 to-yellow-400 bg-clip-text text-transparent drop-shadow-md">
            "Stay focused. Achieve greatness, one Pomodoro at a time!"
          </span>
        </div>

        <div className="border-t border-white/10 pt-6 text-center text-gray-400 text-sm">
          <p>© {new Date().getFullYear()} FocusTimer. All rights reserved.</p>
        </div>
      </div>
      <style jsx>{`
        .animate-glow {
          animation: glowPulse 1.2s infinite alternate;
        }
        @keyframes glowPulse {
          0% { box-shadow: 0 0 8px #f59e42, 0 0 2px #f43f5e; }
          100% { box-shadow: 0 0 32px #fbbf24, 0 0 12px #f43f5e; }
        }
        .animate-gradient-x {
          background-size: 200% 200%;
          animation: gradientX 3s ease-in-out infinite;
        }
        @keyframes gradientX {
          0% { background-position: 0% 50%; }
          50% { background-position: 100% 50%; }
          100% { background-position: 0% 50%; }
        }
        .animate-pulse-slow {
          animation: pulseSlow 3s cubic-bezier(0.4,0,0.6,1) infinite;
        }
        @keyframes pulseSlow {
          0%, 100% { opacity: 1; }
          50% { opacity: 0.7; }
        }
        .animate-float-slow {
          animation: floatSlow 4s ease-in-out infinite alternate;
        }
        .animate-float-slow2 {
          animation: floatSlow2 5s ease-in-out infinite alternate;
        }
        @keyframes floatSlow {
          0% { transform: translateY(0); }
          100% { transform: translateY(-18px); }
        }
        @keyframes floatSlow2 {
          0% { transform: translateY(0); }
          100% { transform: translateY(12px); }
        }
      `}</style>
    </footer>
  )
}
