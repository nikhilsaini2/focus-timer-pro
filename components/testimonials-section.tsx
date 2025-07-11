"use client"

import Image from "next/image"
import { useEffect, useRef } from "react"
import gsap from "gsap"
import { ScrollTrigger } from "gsap/ScrollTrigger"
gsap.registerPlugin(ScrollTrigger)

const CARD_EMOJIS = ["💡", "🚀", "🌟", "🔥"]

export function TestimonialsSection() {
  const testimonials = [
    {
      name: "Aarav Sharma",
      role: "UX Designer",
      quote:
        "FocusTimer has completely transformed my workday. I'm getting more done in less time and feeling less stressed.",
      avatar: "https://ui-avatars.com/api/?name=Aarav+Sharma&background=0D8ABC&color=fff&size=128&rounded=true&format=png",
      emoji: CARD_EMOJIS[0],
    },
    {
      name: "Nikhil Saini",
      role: "Software Developer",
      quote:
        "As a developer, staying in flow state is crucial. The Pomodoro technique with FocusTimer helps me maintain deep focus when coding.",
      avatar: "https://ui-avatars.com/api/?name=Nikhil+Saini&background=0D8ABC&color=fff&size=128&rounded=true&format=png",
      emoji: CARD_EMOJIS[1],
    },
    {
      name: "Priya Patel",
      role: "Content Writer",
      quote:
        "I've tried many productivity apps, but FocusTimer is the only one that's stuck. The simple interface and powerful analytics keep me motivated.",
      avatar: "https://ui-avatars.com/api/?name=Priya+Patel&background=0D8ABC&color=fff&size=128&rounded=true&format=png",
      emoji: CARD_EMOJIS[2],
    },
    // Removed David Kim
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
          stagger: 0.18,
          ease: "power3.out",
          scrollTrigger: {
            trigger: "#testimonials",
            start: "top 80%",
            toggleActions: "play none none none",
          },
        }
      )
    }
  }, [])

  return (
    <section id="testimonials" className="py-16 relative overflow-hidden">
      {/* Animated gradient background */}
      <div className="absolute inset-0 z-0 pointer-events-none">
        <div className="w-3/4 h-3/4 absolute top-1/4 left-1/4 bg-gradient-to-br from-pink-500/20 via-yellow-400/10 to-sky-400/20 rounded-full blur-3xl animate-pulse-slow" />
      </div>
      <div className="max-w-4xl mx-auto px-6 mb-8 relative z-10">
        <div className="text-center mb-2">
          <span className="inline-block text-2xl font-bold bg-clip-text text-transparent bg-gradient-to-r from-pink-500 via-yellow-400 to-sky-400 drop-shadow-[0_2px_12px_rgba(255,255,255,0.25)]">
            Real Stories. Real Results. Real Focus.
          </span>
        </div>
        <h2 className="text-3xl font-bold mb-4 text-center bg-clip-text text-transparent bg-gradient-to-r from-pink-500 via-yellow-400 to-sky-400 drop-shadow-lg">
          Loved by Productive People
        </h2>
        <p className="text-gray-400 text-center mb-8 max-w-2xl mx-auto">
          Join thousands of professionals who have boosted their productivity with FocusTimer
        </p>
      </div>
      <div className="w-full max-w-6xl mx-auto relative z-10 grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 md:gap-8 py-6 md:py-8 px-2 xs:px-4 overflow-visible scrollbar-hide">
        {testimonials.map((testimonial, idx) => (
          <div
            key={testimonial.name}
            ref={el => (cardsRef.current[idx] = el)}
            className={`testimonial-card relative bg-gradient-to-br from-[#23243a]/80 via-[#18181b]/90 to-[#23243a]/80 border border-white/10 p-6 lg:p-8 rounded-3xl flex-1 min-w-[320px] max-w-lg md:min-h-[320px] lg:min-h-[360px] shadow-xl transition-all duration-300 hover:scale-105 hover:shadow-[0_0_48px_12px_rgba(245,158,66,0.25)] hover:border-yellow-400/60 backdrop-blur-2xl flex flex-col animate-fade-in overflow-hidden group`}
          >
            {/* Faint quote icon background */}
            <svg className="absolute top-6 left-6 w-16 h-16 opacity-10 text-yellow-300 pointer-events-none select-none" fill="none" viewBox="0 0 64 64"><text x="0" y="48" fontSize="64" fontWeight="bold" fill="currentColor">“</text></svg>
            {/* Avatar with animated glow */}
            <div className="flex items-center gap-4 mb-4">
              <span className="relative inline-block">
                <span className="absolute inset-0 rounded-full bg-gradient-to-tr from-yellow-400 via-pink-400 to-sky-400 blur-md opacity-60 group-hover:opacity-90 transition-all animate-pulse-slow"></span>
                <Image
                  src={testimonial.avatar}
                  alt={testimonial.name}
                  width={64}
                  height={64}
                  className="relative rounded-full bg-white/10 border-4 border-yellow-300 shadow-lg z-10"
                />
              </span>
              <div>
                <h3 className="font-semibold text-lg lg:text-xl bg-clip-text text-transparent bg-gradient-to-r from-yellow-400 via-pink-400 to-sky-400 drop-shadow animate-gradient-x flex items-center gap-2">
                  {testimonial.name}
                  <span className="text-2xl animate-bounce-slow select-none">{testimonial.emoji}</span>
                </h3>
                <p className="text-sm text-gray-300 lg:text-base">{testimonial.role}</p>
              </div>
            </div>
            <p className="text-gray-100 italic mb-6 text-base lg:text-lg font-medium z-10 relative">"{testimonial.quote}"</p>
            <div className="flex mt-auto z-10 relative">
              {[1, 2, 3, 4, 5].map((star) => (
                <svg key={star} className="w-6 h-6 text-yellow-400 drop-shadow transition-transform duration-200 group-hover:scale-125 group-hover:rotate-6" fill="currentColor" viewBox="0 0 20 20">
                  <path d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.07 3.292a1 1 0 00.95.69h3.462c.969 0 1.371 1.24.588 1.81l-2.8 2.034a1 1 0 00-.364 1.118l1.07 3.292c.3.921-.755 1.688-1.54 1.118l-2.8-2.034a1 1 0 00-1.175 0l-2.8 2.034c-.784.57-1.838-.197-1.539-1.118l1.07-3.292a1 1 0 00-.364-1.118L2.98 8.72c-.783-.57-.38-1.81.588-1.81h3.461a1 1 0 00.951-.69l1.07-3.292z" />
                </svg>
              ))}
            </div>
          </div>
        ))}
      </div>
      <style jsx global>{`
        .animate-fade-in {
          animation: fadeInUp 0.7s cubic-bezier(0.4,0,0.2,1);
        }
        @keyframes fadeInUp {
          from { opacity: 0; transform: translateY(32px); }
          to { opacity: 1; transform: translateY(0); }
        }
        .animate-bounce-slow {
          animation: bounceSlow 2.2s infinite alternate;
        }
        @keyframes bounceSlow {
          0% { transform: translateY(0); }
          100% { transform: translateY(-8px); }
        }
        .animate-pulse-slow {
          animation: pulseSlow 3s cubic-bezier(0.4,0,0.6,1) infinite;
        }
        @keyframes pulseSlow {
          0%, 100% { opacity: 1; }
          50% { opacity: 0.7; }
        }
        /* Hide scrollbar for all browsers */
        .scrollbar-hide {
          -ms-overflow-style: none; /* IE and Edge */
          scrollbar-width: none; /* Firefox */
        }
        .scrollbar-hide::-webkit-scrollbar {
          display: none; /* Chrome, Safari, Opera */
        }
      `}</style>
    </section>
  )
}
