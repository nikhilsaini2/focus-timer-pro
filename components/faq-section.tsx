"use client"

import { useRef, useEffect, useState } from "react"
import { ChevronDown } from "lucide-react"
import gsap from "gsap"
import { ScrollTrigger } from "gsap/ScrollTrigger"
gsap.registerPlugin(ScrollTrigger)

export function FaqSection() {
  const faqs = [
    {
      question: "What is the Pomodoro Technique?",
      answer:
        "The Pomodoro Technique is a time management method developed by Francesco Cirillo in the late 1980s. It uses a timer to break work into intervals, traditionally 25 minutes in length, separated by short breaks. These intervals are known as 'pomodoros'.",
    },
    {
      question: "How does FocusTimer help with productivity?",
      answer:
        "FocusTimer implements the Pomodoro Technique with additional features like task management, productivity analytics, and customizable timers. By working in focused sprints and taking regular breaks, you can maintain high concentration levels and avoid burnout.",
    },
    {
      question: "Can I customize the timer durations?",
      answer:
        "Yes! With the Pro version, you can fully customize both your focus session and break durations to match your personal productivity rhythm.",
    },
    {
      question: "Is FocusTimer available on mobile devices?",
      answer:
        "Yes, FocusTimer is available for iOS and Android, as well as desktop applications for Windows and macOS. Your data syncs across all your devices.",
    },
    {
      question: "How does the website blocker work?",
      answer:
        "The website blocker (available in Pro) allows you to create a list of distracting websites that will be automatically blocked during your focus sessions, helping you stay on task.",
    },
    {
      question: "Can I export my productivity data?",
      answer: "Yes, Pro users can export their productivity data in CSV format for further analysis or record-keeping.",
    },
  ]

  const [openIndex, setOpenIndex] = useState<number | null>(null)
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
          stagger: 0.13,
          ease: "power3.out",
          scrollTrigger: {
            trigger: "#faq",
            start: "top 80%",
            toggleActions: "play none none none",
          },
        }
      )
    }
  }, [])

  const toggleFaq = (index: number) => {
    setOpenIndex(openIndex === index ? null : index)
  }

  return (
    <section id="faq" className="py-16 px-6 bg-black/50 relative overflow-hidden">
      {/* Decorative sparkles */}
      <div className="absolute left-8 top-8 z-0 animate-float-slow">
        <svg width="32" height="32" viewBox="0 0 32 32" fill="none"><g filter="url(#faq-glow1)"><path d="M16 4 L18 13 L28 16 L18 19 L16 28 L14 19 L4 16 L14 13 Z" fill="url(#faq-star1)"/></g><defs><radialGradient id="faq-star1" cx="0.5" cy="0.5" r="0.5" gradientTransform="matrix(32 0 0 32 0 0)" gradientUnits="userSpaceOnUse"><stop stopColor="#fffbe6"/><stop offset="0.5" stopColor="#fbbf24"/><stop offset="1" stopColor="#f43f5e"/></radialGradient><filter id="faq-glow1" x="-8" y="-8" width="48" height="48" filterUnits="userSpaceOnUse"><feGaussianBlur stdDeviation="3" result="blur"/><feMerge><feMergeNode in="blur"/><feMergeNode in="SourceGraphic"/></feMerge></filter></defs></svg>
      </div>
      <div className="absolute right-8 top-16 z-0 animate-float-slow2">
        <svg width="24" height="24" viewBox="0 0 24 24" fill="none"><g filter="url(#faq-glow2)"><path d="M12 2 L13 8 L20 12 L13 16 L12 22 L11 16 L4 12 L11 8 Z" fill="url(#faq-star2)"/></g><defs><radialGradient id="faq-star2" cx="0.5" cy="0.5" r="0.5" gradientTransform="matrix(24 0 0 24 0 0)" gradientUnits="userSpaceOnUse"><stop stopColor="#fffbe6"/><stop offset="0.5" stopColor="#fbbf24"/><stop offset="1" stopColor="#f43f5e"/></radialGradient><filter id="faq-glow2" x="-6" y="-6" width="36" height="36" filterUnits="userSpaceOnUse"><feGaussianBlur stdDeviation="2" result="blur"/><feMerge><feMergeNode in="blur"/><feMergeNode in="SourceGraphic"/></feMerge></filter></defs></svg>
      </div>
      <div className="max-w-4xl mx-auto relative z-10 w-full px-2 xs:px-4">
        <h2 className="text-2xl xs:text-3xl md:text-4xl font-extrabold mb-4 text-center bg-clip-text text-transparent bg-gradient-to-r from-red-500 via-orange-400 to-yellow-400 animate-gradient-x drop-shadow-lg">
          Frequently Asked Questions
        </h2>
        <p className="text-gray-400 text-center mb-8 xs:mb-12 max-w-xs xs:max-w-2xl mx-auto text-base xs:text-lg">
          Have questions about FocusTimer? Find answers to common questions below.
        </p>
        <div className="space-y-4">
          {faqs.map((faq, index) => (
            <div
              key={index}
              ref={el => (cardsRef.current[index] = el)}
              className={`border border-white/10 rounded-xl overflow-hidden glass-card transition-all duration-300 ${openIndex === index ? 'shadow-[0_0_32px_#f59e42,0_0_8px_#f43f5e] border-orange-400/40' : ''}`}
            >
              <button
                className="flex justify-between items-center w-full p-6 text-left group"
                onClick={() => toggleFaq(index)}
              >
                <span className="flex items-center gap-3 text-lg md:text-xl font-bold bg-clip-text text-transparent bg-gradient-to-r from-orange-400 to-yellow-400 drop-shadow animate-gradient-x">
                  <span className="inline-block animate-pulse-slow">
                    <svg width="22" height="22" viewBox="0 0 22 22" fill="none"><circle cx="11" cy="11" r="11" fill="url(#qmark-bg)"/><text x="11" y="16" textAnchor="middle" fontSize="16" fontWeight="bold" fill="#fff">?</text><defs><radialGradient id="qmark-bg" cx="0.5" cy="0.5" r="0.5" gradientTransform="matrix(22 0 0 22 0 0)" gradientUnits="userSpaceOnUse"><stop stopColor="#fbbf24"/><stop offset="1" stopColor="#f43f5e"/></radialGradient></defs></svg>
                  </span>
                  {faq.question}
                </span>
                <ChevronDown className={`h-5 w-5 transition-transform duration-300 ${openIndex === index ? "rotate-180 text-orange-400" : "text-white"}`} />
              </button>
              <div className={`transition-all duration-300 ${openIndex === index ? 'max-h-96 opacity-100' : 'max-h-0 opacity-0'} overflow-hidden`}> 
                <div className="p-6 pt-0 text-gray-300 animate-fade-in">
                  {faq.answer}
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
      <style jsx>{`
        .glass-card {
          background: rgba(24, 24, 27, 0.7);
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
        .animate-fade-in {
          animation: fadeInUp 0.7s cubic-bezier(0.4,0,0.2,1);
        }
        @keyframes fadeInUp {
          from { opacity: 0; transform: translateY(16px); }
          to { opacity: 1; transform: translateY(0); }
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
    </section>
  )
}
