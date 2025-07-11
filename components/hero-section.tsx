'use client'

import { Button } from "@/components/ui/button"
import { InteractiveGrid } from "@/components/ui/interactive-grid"
import { ShineBorder } from "@/components/ui/shine-border"
import { Play } from "lucide-react"
import { PomodoroTimer } from "@/components/pomodoro-timer"
import { TaskList } from "@/components/TaskList"
import { TodaysProgress } from "@/components/TodaysProgress"
import { useRef, useEffect, useState } from "react"
import gsap from "gsap"
import { ScrollTrigger } from "gsap/ScrollTrigger"
gsap.registerPlugin(ScrollTrigger)

function splitText(text: string) {
  return text.split("").map((char, i) => (
    <span key={i} className="inline-block opacity-0 letter-flip">{char === " " ? "\u00A0" : char}</span>
  ))
}

export function HeroSection() {
  const cardRef = useRef<HTMLDivElement>(null)
  const headlineRef = useRef<HTMLHeadingElement>(null)
  const blobsRef = useRef<HTMLDivElement>(null)
  const [flipperIndex, setFlipperIndex] = useState(0)
  const flipperPhrases = [
    "One Pomodoro at a Time",
    "Distraction-Free Focus",
    "Achieve More, Stress Less",
    "Work. Break. Repeat."
  ]
  const flipperRef = useRef<HTMLSpanElement>(null)
  const [displayed, setDisplayed] = useState(flipperPhrases[0])

  useEffect(() => {
    if (cardRef.current) {
      gsap.fromTo(
        cardRef.current,
        { y: 80, opacity: 0 },
        {
          y: 0,
          opacity: 1,
          duration: 1.2,
          ease: "power3.out",
          scrollTrigger: {
            trigger: cardRef.current,
            start: "top 80%",
            toggleActions: "play none none none",
          },
        }
      )
    }
    if (headlineRef.current) {
      gsap.fromTo(
        headlineRef.current,
        { y: 40, opacity: 0 },
        {
          y: 0,
          opacity: 1,
          duration: 1.1,
          delay: 0.2,
          ease: "power3.out",
          scrollTrigger: {
            trigger: headlineRef.current,
            start: "top 85%",
            toggleActions: "play none none none",
          },
        }
      )
    }
    if (blobsRef.current) {
      gsap.fromTo(
        blobsRef.current.children,
        { scale: 0.8, opacity: 0.5 },
        {
          scale: 1,
          opacity: 1,
          duration: 1.4,
          stagger: 0.15,
          ease: "power2.out",
          scrollTrigger: {
            trigger: blobsRef.current,
            start: "top 90%",
            toggleActions: "play none none none",
          },
        }
      )
    }
    // Only update the phrase every 2.5s, no animation
    const interval = setInterval(() => {
      setFlipperIndex((prev) => (prev + 1) % flipperPhrases.length)
    }, 2500)
    return () => clearInterval(interval)
  }, [])

  return (
    <section className="relative min-h-screen pt-16 pb-16 overflow-hidden bg-black hero-gradient flex flex-col items-center justify-center">
      {/* Animated background blobs */}
      <div className="absolute inset-0 z-0 pointer-events-none" ref={blobsRef}>
        <div className="absolute top-[-10%] left-[-10%] w-[40vw] h-[40vw] bg-gradient-to-br from-pink-500/30 via-yellow-400/20 to-sky-400/30 rounded-full blur-3xl animate-pulse-slow" />
        <div className="absolute bottom-[-10%] right-[-10%] w-[32vw] h-[32vw] bg-gradient-to-tr from-orange-500/30 via-pink-500/20 to-yellow-400/30 rounded-full blur-3xl animate-pulse-slow" />
      </div>
      <div className="relative z-10 w-full max-w-4xl mx-auto flex flex-col items-center justify-center px-4 sm:px-6 md:px-8">
        <div ref={cardRef} className="w-full bg-white/5 backdrop-blur-xl rounded-3xl border border-white/10 shadow-2xl px-4 sm:px-8 py-8 sm:py-14 flex flex-col items-center text-center glass-card">
          <h1 ref={headlineRef} className="text-3xl xs:text-4xl md:text-6xl font-extrabold mb-4 tracking-tight leading-tight gradient-heading">
            <span className="block text-white drop-shadow-lg">Boost Your Productivity</span>
            <span className="block min-h-[40px] md:min-h-[56px]" style={{ display: 'inline-block', position: 'relative' }}>
              <span
                ref={flipperRef}
                aria-live="polite"
                className="inline-block font-extrabold text-2xl xs:text-3xl md:text-6xl text-orange-400 drop-shadow-[0_2px_16px_rgba(245,158,66,0.5)] transition-transform duration-500 gradient-heading"
                style={{ willChange: 'transform, opacity' }}
              >
                {flipperPhrases[flipperIndex]}
              </span>
            </span>
          </h1>
          <p className="text-gray-300 text-base xs:text-lg md:text-xl mb-8 max-w-xs xs:max-w-md md:max-w-2xl mx-auto font-medium drop-shadow">
            FocusTimer helps you stay productive with the proven Pomodoro technique.<br />
            Work in focused sprints, take regular breaks, and track your progress to achieve more every day.
          </p>
          {/* Animated divider instead of button */}
          <div className="w-24 xs:w-40 h-2 mx-auto my-4 rounded-full bg-gradient-to-r from-orange-500 via-pink-500 to-yellow-400 animate-glow" />
          <div className="mt-8 text-lg xs:text-xl font-bold bg-clip-text text-transparent bg-gradient-to-r from-red-500 via-orange-400 to-yellow-400 animate-glow hover:animate-gradient-x hover:shadow-[0_0_32px_#fbbf24,0_0_16px_#f43f5e] transition-all duration-300 cursor-pointer motivational-text gradient-heading">
            Stay focused. Achieve more. Enjoy your breaks.
          </div>
        </div>
        {/* Pomodoro, TaskList, Progress grid */}
        <div className="w-full mt-12 xs:mt-16 grid grid-cols-1 md:[grid-template-columns:1.2fr_1fr] gap-8 md:gap-10 items-start md:min-h-[min(600px,80vh)]" id="pomodoro-timer">
          <div className="flex justify-center w-full md:justify-end md:pr-4 h-full">
            <PomodoroTimer />
          </div>
          <div className="flex flex-col justify-center items-center gap-8 w-full h-full">
            <TodaysProgress />
            <TaskList />
          </div>
        </div>
        {/* Decorative floating Sparkle/Star SVGs at upper left and right */}
        <div className="absolute -top-8 -left-8 z-20 animate-float-slow">
          <svg width="44" height="44" viewBox="0 0 44 44" fill="none" xmlns="http://www.w3.org/2000/svg">
            <g filter="url(#glow1)">
              <path d="M22 6 L25 19 L38 22 L25 25 L22 38 L19 25 L6 22 L19 19 Z" fill="url(#star-gradient1)"/>
            </g>
            <defs>
              <radialGradient id="star-gradient1" cx="0.5" cy="0.5" r="0.5" fx="0.5" fy="0.5" gradientTransform="matrix(44 0 0 44 0 0)" gradientUnits="userSpaceOnUse">
                <stop stopColor="#fffbe6"/>
                <stop offset="0.5" stopColor="#fbbf24"/>
                <stop offset="1" stopColor="#f43f5e"/>
              </radialGradient>
              <filter id="glow1" x="-10" y="-10" width="64" height="64" filterUnits="userSpaceOnUse">
                <feGaussianBlur stdDeviation="4" result="blur"/>
                <feMerge>
                  <feMergeNode in="blur"/>
                  <feMergeNode in="SourceGraphic"/>
                </feMerge>
              </filter>
            </defs>
          </svg>
        </div>
        <div className="absolute -top-8 -right-8 z-20 animate-float-slow2">
          <svg width="32" height="32" viewBox="0 0 32 32" fill="none" xmlns="http://www.w3.org/2000/svg">
            <g filter="url(#glow2)">
              <path d="M16 4 L18 13 L28 16 L18 19 L16 28 L14 19 L4 16 L14 13 Z" fill="url(#star-gradient2)"/>
            </g>
            <defs>
              <radialGradient id="star-gradient2" cx="0.5" cy="0.5" r="0.5" fx="0.5" fy="0.5" gradientTransform="matrix(32 0 0 32 0 0)" gradientUnits="userSpaceOnUse">
                <stop stopColor="#fffbe6"/>
                <stop offset="0.5" stopColor="#fbbf24"/>
                <stop offset="1" stopColor="#f43f5e"/>
              </radialGradient>
              <filter id="glow2" x="-8" y="-8" width="48" height="48" filterUnits="userSpaceOnUse">
                <feGaussianBlur stdDeviation="3" result="blur"/>
                <feMerge>
                  <feMergeNode in="blur"/>
                  <feMergeNode in="SourceGraphic"/>
                </feMerge>
              </filter>
            </defs>
          </svg>
        </div>
      </div>
      <style jsx>{`
        .glass-card {
          box-shadow: 0 8px 40px 0 rgba(255, 115, 179, 0.08), 0 1.5px 8px 0 rgba(245, 158, 66, 0.08);
          backdrop-filter: blur(16px);
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
        .letter-flip {
          transition: opacity 0.4s, transform 0.4s;
        }
        .animate-glow {
          animation: glowPulse 1.2s infinite alternate;
        }
        @keyframes glowPulse {
          0% { box-shadow: 0 0 8px #f59e42, 0 0 2px #f43f5e; }
          100% { box-shadow: 0 0 24px #fbbf24, 0 0 8px #f43f5e; }
        }
        .motivational-text:hover {
          animation: gradientX 1.2s linear infinite;
          box-shadow: 0 0 32px #fbbf24, 0 0 16px #f43f5e;
        }
        .animate-float-slow {
          animation: floatSlow 4s ease-in-out infinite alternate;
        }
        .animate-float-slow2 {
          animation: floatSlow2 5s ease-in-out infinite alternate;
        }
        @keyframes floatSlow {
          0% { transform: translateY(0); }
          100% { transform: translateY(-24px); }
        }
        @keyframes floatSlow2 {
          0% { transform: translateY(0); }
          100% { transform: translateY(18px); }
        }
        .animate-pulse-slow {
          animation: pulseSlow 3s cubic-bezier(0.4,0,0.6,1) infinite;
        }
        @keyframes pulseSlow {
          0%, 100% { opacity: 1; }
          50% { opacity: 0.7; }
        }
        .gradient-heading {
          text-shadow: 0 2px 8px rgba(0,0,0,0.45), 0 0px 2px #fff8;
        }
      `}</style>
    </section>
  )
}
