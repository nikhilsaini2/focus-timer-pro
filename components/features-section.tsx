'use client'

import { GradientCard } from "@/components/ui/gradient-card"
import { Button } from "@/components/ui/button"
import { useRef, useEffect } from "react"
import gsap from "gsap"
import { ScrollTrigger } from "gsap/ScrollTrigger"
gsap.registerPlugin(ScrollTrigger)

export function FeaturesSection() {
  const features = [
    {
      title: "Customizable Timers",
      description: "Set your own focus and break durations to match your personal productivity rhythm",
      icon: (
        <span className="inline-block">
          {/* Modern clock icon with gradient and glow */}
          <svg width="36" height="36" viewBox="0 0 36 36" fill="none" xmlns="http://www.w3.org/2000/svg">
            <circle cx="18" cy="18" r="16" fill="url(#timer-grad)" />
            <circle cx="18" cy="18" r="12" fill="#18181b" />
            <path d="M18 11v7l5 3" stroke="#fffbe6" strokeWidth="2.2" strokeLinecap="round" />
            <circle cx="18" cy="18" r="2.2" fill="#fbbf24" />
            <defs>
              <radialGradient id="timer-grad" cx="0.5" cy="0.5" r="0.5" gradientTransform="matrix(36 0 0 36 0 0)" gradientUnits="userSpaceOnUse">
                <stop stopColor="#fbbf24" />
                <stop offset="1" stopColor="#f43f5e" />
              </radialGradient>
            </defs>
          </svg>
        </span>
      ),
    },
    {
      title: "Productivity Analytics",
      description: "Track your focus sessions and productivity trends over time with detailed statistics",
      icon: (
        <span className="inline-block">
          {/* Modern analytics bar chart icon */}
          <svg width="36" height="36" viewBox="0 0 36 36" fill="none" xmlns="http://www.w3.org/2000/svg">
            <rect x="8" y="20" width="4" height="8" rx="2" fill="url(#analytics-grad)" />
            <rect x="16" y="12" width="4" height="16" rx="2" fill="url(#analytics-grad)" />
            <rect x="24" y="7" width="4" height="21" rx="2" fill="url(#analytics-grad)" />
            <circle cx="18" cy="18" r="16" stroke="url(#analytics-grad)" strokeWidth="1.5" fill="none" />
            <defs>
              <linearGradient id="analytics-grad" x1="0" y1="0" x2="36" y2="36" gradientUnits="userSpaceOnUse">
                <stop stopColor="#fbbf24" />
                <stop offset="1" stopColor="#f43f5e" />
              </linearGradient>
            </defs>
          </svg>
        </span>
      ),
    },
    {
      title: "Smart Notifications",
      description: "Get gentle reminders when it's time to focus or take a break",
      icon: (
        <span className="inline-block">
          {/* Modern bell/notification icon */}
          <svg width="36" height="36" viewBox="0 0 36 36" fill="none" xmlns="http://www.w3.org/2000/svg">
            <ellipse cx="18" cy="24" rx="10" ry="7" fill="url(#bell-grad)" />
            <path d="M18 10a7 7 0 00-7 7v4c0 1.2-1 2.2-2.2 2.2h18.4c-1.2 0-2.2-1-2.2-2.2v-4a7 7 0 00-7-7z" fill="#18181b" />
            <circle cx="18" cy="28" r="2.2" fill="#fbbf24" />
            <defs>
              <radialGradient id="bell-grad" cx="0.5" cy="0.5" r="0.5" gradientTransform="matrix(20 0 0 14 8 10)" gradientUnits="userSpaceOnUse">
                <stop stopColor="#fbbf24" />
                <stop offset="1" stopColor="#f43f5e" />
              </radialGradient>
            </defs>
          </svg>
        </span>
      ),
    },
    {
      title: "Task Management",
      description: "Organize your work with an integrated task list that syncs with your Pomodoro sessions",
      icon: (
        <span className="inline-block">
          {/* Modern checklist icon */}
          <svg width="36" height="36" viewBox="0 0 36 36" fill="none" xmlns="http://www.w3.org/2000/svg">
            <rect x="7" y="10" width="22" height="16" rx="5" fill="url(#task-grad)" />
            <rect x="13" y="15" width="10" height="2.2" rx="1.1" fill="#fffbe6" />
            <rect x="13" y="19" width="7" height="2.2" rx="1.1" fill="#fffbe6" />
            <circle cx="18" cy="18" r="16" stroke="url(#task-grad)" strokeWidth="1.5" fill="none" />
            <defs>
              <linearGradient id="task-grad" x1="0" y1="0" x2="36" y2="36" gradientUnits="userSpaceOnUse">
                <stop stopColor="#fbbf24" />
                <stop offset="1" stopColor="#f43f5e" />
              </linearGradient>
            </defs>
          </svg>
        </span>
      ),
    },
    {
      title: "Daily Goals",
      description: "Set daily focus goals and track your progress toward achieving them",
      icon: (
        <span className="inline-block">
          {/* Modern target/goal icon */}
          <svg width="36" height="36" viewBox="0 0 36 36" fill="none" xmlns="http://www.w3.org/2000/svg">
            <circle cx="18" cy="18" r="16" fill="url(#goal-grad)" />
            <circle cx="18" cy="18" r="10" fill="#18181b" />
            <circle cx="18" cy="18" r="4" fill="#fbbf24" fillOpacity="0.7" />
            <path d="M18 12v6l4 2" stroke="#fffbe6" strokeWidth="2.2" strokeLinecap="round" />
            <defs>
              <radialGradient id="goal-grad" cx="0.5" cy="0.5" r="0.5" gradientTransform="matrix(36 0 0 36 0 0)" gradientUnits="userSpaceOnUse">
                <stop stopColor="#fbbf24" />
                <stop offset="1" stopColor="#f43f5e" />
              </radialGradient>
            </defs>
          </svg>
        </span>
      ),
    },
    {
      title: "Distraction Blocker",
      description: "Optional website and app blocking during focus sessions to help you stay on track",
      icon: (
        <span className="inline-block">
          {/* Modern shield/eye blocker icon */}
          <svg width="36" height="36" viewBox="0 0 36 36" fill="none" xmlns="http://www.w3.org/2000/svg">
            <circle cx="18" cy="18" r="16" fill="url(#blocker-grad)" />
            <ellipse cx="18" cy="20" rx="7" ry="5" fill="#18181b" />
            <circle cx="18" cy="20" r="2.2" fill="#fbbf24" />
            <path d="M12 20c2-4 10-4 12 0" stroke="#fffbe6" strokeWidth="2" strokeLinecap="round" />
            <defs>
              <radialGradient id="blocker-grad" cx="0.5" cy="0.5" r="0.5" gradientTransform="matrix(36 0 0 36 0 0)" gradientUnits="userSpaceOnUse">
                <stop stopColor="#fbbf24" />
                <stop offset="1" stopColor="#f43f5e" />
              </radialGradient>
            </defs>
          </svg>
        </span>
      ),
    },
  ]

  const cardsRef = useRef<(HTMLDivElement | null)[]>([])

  useEffect(() => {
    if (cardsRef.current.length) {
      gsap.fromTo(
        cardsRef.current,
        { y: 60, opacity: 0 },
        {
          y: 0,
          opacity: 1,
          duration: 1.1,
          stagger: 0.15,
          ease: "power3.out",
          scrollTrigger: {
            trigger: "#features",
            start: "top 80%",
            toggleActions: "play none none none",
          },
        }
      )
    }
  }, [])

  return (
    <section id="features" className="py-16 px-6">
      <div className="max-w-4xl mx-auto">
        <h2 className="text-3xl font-bold mb-4 text-center bg-clip-text text-transparent bg-gradient-to-r from-red-500 to-orange-500">
          Features Designed for Focus
        </h2>
        <p className="text-gray-400 text-center mb-12 max-w-2xl mx-auto">
          FocusTimer combines the proven Pomodoro technique with modern features to help you achieve deep focus and
          maximize your productivity.
        </p>
        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-6 md:gap-8 items-stretch">
          {features.map((feature, i) => (
            <div
              key={feature.title}
              ref={el => (cardsRef.current[i] = el)}
              className="transition-all duration-200 hover:scale-105 hover:shadow-[0_0_32px_#f59e42,0_0_8px_#f43f5e] h-full flex flex-col"
            >
              <GradientCard className="h-full flex flex-col glass-card">
                <div className="flex flex-col items-center text-center flex-1">
                  <div className="mb-4 p-4 rounded-full bg-gradient-to-br from-yellow-400/30 via-pink-500/20 to-red-500/30 shadow-lg animate-pulse-slow">
                    {feature.icon}
                  </div>
                  <h3 className="text-xl font-extrabold mb-2 bg-clip-text text-transparent bg-gradient-to-r from-orange-400 to-yellow-400 drop-shadow animate-gradient-x">
                    {feature.title}
                  </h3>
                  <p className="text-gray-400 mb-4 min-h-[56px] font-medium">
                    {feature.description}
                  </p>
                </div>
              </GradientCard>
            </div>
          ))}
        </div>
      </div>
      <style jsx>{`
        .glass-card {
          box-shadow: 0 8px 40px 0 rgba(255, 115, 179, 0.08), 0 1.5px 8px 0 rgba(245, 158, 66, 0.08);
          backdrop-filter: blur(12px);
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
      `}</style>
    </section>
  )
}
