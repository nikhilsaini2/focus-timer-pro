import { Button } from "@/components/ui/button"
import Link from "next/link"
import { useRef, useEffect } from "react"
import gsap from "gsap"
import { ScrollTrigger } from "gsap/ScrollTrigger"
gsap.registerPlugin(ScrollTrigger)

export function Navbar() {
  const navRef = useRef<HTMLElement>(null)
  const linksRef = useRef<(HTMLAnchorElement | null)[]>([])

  useEffect(() => {
    if (navRef.current) {
      gsap.fromTo(
        navRef.current,
        { y: -40, opacity: 0 },
        {
          y: 0,
          opacity: 1,
          duration: 1.1,
          ease: "power3.out",
          scrollTrigger: {
            trigger: navRef.current,
            start: "top top",
            toggleActions: "play none none none",
          },
        }
      )
    }
    if (linksRef.current.length) {
      gsap.set(linksRef.current, { opacity: 0, y: -16 })
      gsap.to(linksRef.current, {
        opacity: 1,
        y: 0,
        duration: 0.8,
        stagger: 0.12,
        delay: 0.2,
        ease: "power2.out",
      })
    }
  }, [])

  return (
    <nav ref={navRef} className="sticky top-0 z-50 w-full bg-black/70 backdrop-blur-lg shadow-lg border-b-0">
      <div className="mx-auto flex h-20 max-w-7xl items-center justify-between px-6">
        {/* Logo and Brand */}
        <Link href="/" className="flex items-center gap-3 group">
          {/* Pomodoro SVG Logo */}
          <span className="inline-block">
            <svg width="38" height="38" viewBox="0 0 38 38" fill="none" xmlns="http://www.w3.org/2000/svg">
              <ellipse cx="19" cy="22" rx="14" ry="13" fill="url(#pomodoro-gradient)" />
              <ellipse cx="19" cy="22" rx="12" ry="11" fill="url(#pomodoro-inner)" />
              <ellipse cx="19" cy="10" rx="5" ry="3" fill="url(#pomodoro-leaf)" />
              <defs>
                <linearGradient id="pomodoro-gradient" x1="5" y1="9" x2="33" y2="35" gradientUnits="userSpaceOnUse">
                  <stop stopColor="#f43f5e" />
                  <stop offset="1" stopColor="#f59e42" />
                </linearGradient>
                <linearGradient id="pomodoro-inner" x1="7" y1="13" x2="31" y2="31" gradientUnits="userSpaceOnUse">
                  <stop stopColor="#fbbf24" />
                  <stop offset="1" stopColor="#f43f5e" />
                </linearGradient>
                <linearGradient id="pomodoro-leaf" x1="14" y1="7" x2="24" y2="13" gradientUnits="userSpaceOnUse">
                  <stop stopColor="#22c55e" />
                  <stop offset="1" stopColor="#16a34a" />
                </linearGradient>
              </defs>
            </svg>
          </span>
          <span className="text-2xl font-extrabold bg-clip-text text-transparent bg-gradient-to-r from-orange-400 via-yellow-300 to-pink-500 drop-shadow-lg tracking-tight group-hover:drop-shadow-[0_0_12px_#f59e42] transition-all">FocusTimer</span>
        </Link>
        {/* Nav Links */}
        <div className="hidden md:flex items-center gap-10">
          {[
            { href: "#features", label: "Features" },
            { href: "#how-it-works", label: "How It Works" },
            { href: "#testimonials", label: "Testimonials" },
            { href: "#faq", label: "FAQ" },
          ].map((link, i) => (
            <Link
              key={link.href}
              href={link.href}
              ref={el => (linksRef.current[i] = el)}
              className="relative text-lg font-semibold text-gray-200 hover:text-white transition group nav-link"
            >
              <span className="bg-clip-text text-transparent bg-gradient-to-r from-orange-400 via-yellow-300 to-pink-500 group-hover:text-white">
                {link.label}
              </span>
              <span className="absolute left-0 -bottom-1 w-0 h-0.5 bg-gradient-to-r from-orange-400 via-yellow-300 to-pink-500 rounded-full transition-all duration-300 group-hover:w-full nav-underline" />
            </Link>
          ))}
        </div>
        {/* Trophy/Icon Button */}
        <div className="flex items-center gap-4">
          <span className="hidden md:inline-block animate-bounce-slow">
            <svg width="32" height="32" viewBox="0 0 32 32" fill="none" xmlns="http://www.w3.org/2000/svg">
              <path d="M8 6h16v4a8 8 0 01-16 0V6z" fill="url(#trophy-gradient)" />
              <path d="M12 26h8v-2a4 4 0 00-8 0v2z" fill="#f59e42" />
              <circle cx="16" cy="28" r="2" fill="#fbbf24" />
              <defs>
                <linearGradient id="trophy-gradient" x1="8" y1="6" x2="24" y2="14" gradientUnits="userSpaceOnUse">
                  <stop stopColor="#f43f5e" />
                  <stop offset="1" stopColor="#f59e42" />
                </linearGradient>
              </defs>
            </svg>
          </span>
        </div>
      </div>
      {/* Glowing Divider */}
      <div className="h-1 w-full bg-gradient-to-r from-orange-500 via-yellow-400 to-pink-500 blur-[2px] opacity-70 shadow-lg" />
      <style jsx global>{`
        .nav-link .nav-underline {
          transition: width 0.4s cubic-bezier(0.4,0,0.2,1);
        }
        .nav-link:hover .nav-underline {
          width: 100% !important;
        }
      `}</style>
    </nav>
  )
}
