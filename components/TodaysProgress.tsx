"use client"
import { useEffect, useState, useRef } from "react"
import gsap from "gsap"
import { ScrollTrigger } from "gsap/ScrollTrigger"
import { Clock, CheckCircle, Flame } from "lucide-react"

function useAnimatedNumber(target: number, duration = 800) {
  const [value, setValue] = useState(0)
  useEffect(() => {
    let start = 0
    let startTime: number | null = null
    function animate(ts: number) {
      if (!startTime) startTime = ts
      const progress = Math.min((ts - startTime) / duration, 1)
      setValue(Math.floor(start + (target - start) * progress))
      if (progress < 1) requestAnimationFrame(animate)
    }
    animate(performance.now())
    // eslint-disable-next-line
  }, [target])
  return value
}

function getTodayKey() {
  const d = new Date()
  return `${d.getFullYear()}-${d.getMonth() + 1}-${d.getDate()}`
}

export function TodaysProgress() {
  const [pomodoros, setPomodoros] = useState(0)
  const [focusMinutes, setFocusMinutes] = useState(0)
  const [tasksDone, setTasksDone] = useState(0)

  // Animated numbers
  const animatedPomodoros = useAnimatedNumber(pomodoros)
  const animatedFocus = useAnimatedNumber(focusMinutes)
  const animatedTasks = useAnimatedNumber(tasksDone)

  const cardRef = useRef<HTMLDivElement>(null)
  const numberRefs = [useRef<HTMLSpanElement>(null), useRef<HTMLSpanElement>(null), useRef<HTMLSpanElement>(null)]

  // Load stats from localStorage (simulate real data for now)
  useEffect(() => {
    const todayKey = getTodayKey()
    // Pomodoros and Focus Time
    const stats = JSON.parse(localStorage.getItem("pomodoroStats") || "{}")
    setPomodoros(stats[todayKey]?.pomodoros || 0)
    setFocusMinutes(stats[todayKey]?.focusMinutes || 0)
    // Tasks Done
    const tasks = JSON.parse(localStorage.getItem("tasks") || "[]")
    setTasksDone(tasks.filter((t: any) => t.done).length)
  }, [])

  // Listen for changes in localStorage (for live updates)
  useEffect(() => {
    function handleStorage() {
      const todayKey = getTodayKey()
      const stats = JSON.parse(localStorage.getItem("pomodoroStats") || "{}")
      setPomodoros(stats[todayKey]?.pomodoros || 0)
      setFocusMinutes(stats[todayKey]?.focusMinutes || 0)
      const tasks = JSON.parse(localStorage.getItem("tasks") || "[]")
      setTasksDone(tasks.filter((t: any) => t.done).length)
    }
    window.addEventListener("storage", handleStorage)
    return () => window.removeEventListener("storage", handleStorage)
  }, [])

  useEffect(() => {
    if (cardRef.current) {
      gsap.fromTo(
        cardRef.current,
        { y: 40, opacity: 0 },
        {
          y: 0,
          opacity: 1,
          duration: 1.1,
          ease: "power3.out",
          scrollTrigger: {
            trigger: cardRef.current,
            start: "top 85%",
            toggleActions: "play none none none",
          },
        }
      )
    }
    numberRefs.forEach((ref, i) => {
      if (ref.current) {
        gsap.fromTo(
          ref.current,
          { y: 24, opacity: 0 },
          {
            y: 0,
            opacity: 1,
            duration: 0.7,
            delay: 0.2 + i * 0.15,
            ease: "power2.out",
            scrollTrigger: {
              trigger: cardRef.current,
              start: "top 85%",
            },
          }
        )
      }
    })
  }, [animatedPomodoros, animatedFocus, animatedTasks])

  return (
    <div ref={cardRef} className="relative bg-gradient-to-br from-[#23243a]/80 via-[#18181b]/90 to-[#23243a]/80 p-6 xs:p-8 rounded-3xl border border-white/10 shadow-xl flex flex-col items-center mb-4 xs:mb-6 w-full backdrop-blur-2xl transition-all duration-300 hover:shadow-[0_0_48px_12px_rgba(245,158,66,0.18)] hover:border-yellow-400/60">
      {/* Decorative floating blob */}
      <div className="absolute -top-8 -left-8 w-24 h-24 bg-gradient-to-br from-yellow-400/30 via-pink-400/20 to-sky-400/30 rounded-full blur-2xl opacity-40 pointer-events-none animate-pulse-slow" />
      <h3 className="text-2xl font-bold mb-6 text-white bg-clip-text text-transparent bg-gradient-to-r from-yellow-400 via-pink-400 to-sky-400 animate-gradient-x drop-shadow-lg">Today's Progress</h3>
      <div className="grid grid-cols-1 xs:grid-cols-1 md:grid-cols-3 gap-4 xs:gap-8 w-full max-w-xs xs:max-w-md md:max-w-2xl">
        <div className="flex flex-col items-center">
          <Flame className="w-10 h-10 text-red-500 mb-1 animate-pulse-slow drop-shadow-glow" />
          <span ref={numberRefs[0]} className="text-4xl font-extrabold bg-clip-text text-transparent bg-gradient-to-r from-red-500 via-orange-400 to-yellow-400 animate-gradient-x drop-shadow-lg">
            {animatedPomodoros}
          </span>
          <span className="text-sm text-gray-400 mt-1">Pomodoros</span>
        </div>
        <div className="flex flex-col items-center">
          <Clock className="w-10 h-10 text-orange-400 mb-1 animate-pulse-slow drop-shadow-glow" />
          <span ref={numberRefs[1]} className="text-4xl font-extrabold bg-clip-text text-transparent bg-gradient-to-r from-orange-400 via-yellow-400 to-yellow-300 animate-gradient-x drop-shadow-lg">
            {animatedFocus > 59 ? `${Math.floor(animatedFocus / 60)}h` : `${animatedFocus}m`}
          </span>
          <span className="text-sm text-gray-400 mt-1">Focus Time</span>
        </div>
        <div className="flex flex-col items-center">
          <CheckCircle className="w-10 h-10 text-yellow-400 mb-1 animate-pulse-slow drop-shadow-glow" />
          <span ref={numberRefs[2]} className="text-4xl font-extrabold bg-clip-text text-transparent bg-gradient-to-r from-yellow-400 via-pink-400 to-red-400 animate-gradient-x drop-shadow-lg">
            {animatedTasks}
          </span>
          <span className="text-sm text-gray-400 mt-1">Tasks Done</span>
        </div>
      </div>
    </div>
  )
} 