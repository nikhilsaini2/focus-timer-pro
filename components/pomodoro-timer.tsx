"use client"

import { useState, useEffect, useRef } from "react"
import { Button } from "@/components/ui/button"
import { Play, Pause, RotateCcw, Settings, Palette } from "lucide-react"

// Add framer-motion for animation
import { motion, AnimatePresence } from "framer-motion"
import confetti from "canvas-confetti"
import gsap from "gsap"
import { ScrollTrigger } from "gsap/ScrollTrigger"
gsap.registerPlugin(ScrollTrigger)

const COLOR_PRESETS = [
  { name: "Red", color: "#ef4444", gradient: "from-red-500 to-pink-500" },
  { name: "Yellow", color: "#facc15", gradient: "from-yellow-400 to-yellow-600" },
  { name: "Green", color: "#22c55e", gradient: "from-green-400 to-green-600" },
  { name: "Sky Blue", color: "#38bdf8", gradient: "from-sky-400 to-blue-500" },
  { name: "Purple", color: "#a78bfa", gradient: "from-purple-400 to-fuchsia-500" },
  { name: "Orange", color: "#f97316", gradient: "from-orange-400 to-orange-600" },
]

export function PomodoroTimer() {
  const [mode, setMode] = useState<"focus" | "break">("focus")
  const [customFocus, setCustomFocus] = useState(25)
  const [customBreak, setCustomBreak] = useState(5)
  const [totalTime, setTotalTime] = useState(25 * 60)
  const [time, setTime] = useState(25 * 60)
  const [isActive, setIsActive] = useState(false)
  const [progress, setProgress] = useState(100)
  const [showSettings, setShowSettings] = useState(false)
  const [focusColor, setFocusColor] = useState(COLOR_PRESETS[0].color)
  const [breakColor, setBreakColor] = useState(COLOR_PRESETS[5].color)
  const [showThemePicker, setShowThemePicker] = useState(false)

  const timerRef = useRef<HTMLDivElement>(null)
  const controlsRef = useRef<HTMLDivElement>(null)

  // Load presets from localStorage
  useEffect(() => {
    // Always reset to 25 min on mount
    setCustomFocus(25)
    setTotalTime(25 * 60)
    setTime(25 * 60)
    setIsActive(false)
    // Load break duration and colors from localStorage
    const savedBreak = localStorage.getItem("breakDuration")
    if (savedBreak) setCustomBreak(Number(savedBreak))
    const savedFocusColor = localStorage.getItem("focusColor")
    const savedBreakColor = localStorage.getItem("breakColor")
    if (savedFocusColor) setFocusColor(savedFocusColor)
    if (savedBreakColor) setBreakColor(savedBreakColor)
  }, [])

  // Update totalTime when mode or custom durations change
  useEffect(() => {
    const t = mode === "focus" ? customFocus * 60 : customBreak * 60
    setTotalTime(t)
    setTime(t)
    setIsActive(false)
  }, [mode, customFocus, customBreak])

  // Calculate minutes and seconds
  const minutes = Math.floor(time / 60)
  const seconds = time % 60

  // Calculate progress for the circle
  useEffect(() => {
    setProgress((time / totalTime) * 100)
  }, [time, totalTime])

  // Timer logic
  useEffect(() => {
    let interval: NodeJS.Timeout | null = null
    if (isActive && time > 0) {
      interval = setInterval(() => {
        setTime((prevTime) => prevTime - 1)
      }, 1000)
    } else if (time === 0) {
      // Switch modes when timer ends
      if (mode === "focus") {
        setMode("break")
      } else {
        setMode("focus")
      }
      setIsActive(false)
    }
    return () => {
      if (interval) clearInterval(interval)
    }
  }, [isActive, time, mode])

  // Toggle timer
  const toggleTimer = () => {
    setIsActive(!isActive)
  }

  // Reset timer
  const resetTimer = () => {
    setIsActive(false)
    setTime(totalTime)
  }

  // Switch mode
  const switchMode = (newMode: "focus" | "break") => {
    setMode(newMode)
    // totalTime and time will update via useEffect
  }

  // Calculate stroke-dashoffset for the progress circle
  const circumference = 2 * Math.PI * 45
  const strokeDashoffset = circumference - (progress / 100) * circumference

  // Timer ring color
  const ringColor = mode === "focus" ? focusColor : breakColor

  // Responsive/touch-friendly controls and transitions
  useEffect(() => {
    if (timerRef.current) {
      gsap.fromTo(
        timerRef.current,
        { y: 60, opacity: 0 },
        {
          y: 0,
          opacity: 1,
          duration: 1.2,
          ease: "power3.out",
          scrollTrigger: {
            trigger: timerRef.current,
            start: "top 85%",
            toggleActions: "play none none none",
          },
        }
      )
    }
    if (controlsRef.current) {
      gsap.fromTo(
        controlsRef.current,
        { y: 40, opacity: 0 },
        {
          y: 0,
          opacity: 1,
          duration: 1.1,
          delay: 0.2,
          ease: "power2.out",
          scrollTrigger: {
            trigger: controlsRef.current,
            start: "top 90%",
            toggleActions: "play none none none",
          },
        }
      )
    }
  }, [])

  return (
    <div className="flex flex-col items-center w-full">
        <div ref={timerRef} className="relative w-full max-w-xs xs:max-w-sm md:max-w-md aspect-square transition-all duration-300 mb-6">
          {/* Animated radial gradient background */}
          <div className="absolute inset-0 z-0 pointer-events-none">
            <div
              className="w-full h-full rounded-full bg-gradient-radial from-sky-400/20 via-blue-500/10 to-transparent blur-2xl"
            />
          </div>
          {/* Background circle */}
          <svg className="w-full h-full relative z-10" viewBox="0 0 100 100">
            <defs>
              <linearGradient id="timer-gradient" x1="0" y1="0" x2="100" y2="100">
                <stop offset="0%" stopColor={ringColor} />
                <stop offset="100%" stopColor="#6366f1" />
              </linearGradient>
              <filter id="glow" x="-20%" y="-20%" width="140%" height="140%">
                <feDropShadow dx="0" dy="0" stdDeviation="3" floodColor={ringColor} floodOpacity="0.7" />
              </filter>
            </defs>
            {/* Animated progress circle with glow */}
            <motion.circle
              cx="50" cy="50" r="45" fill="none"
              stroke="url(#timer-gradient)"
              strokeWidth="4"
              strokeDasharray={circumference}
              strokeDashoffset={strokeDashoffset}
              strokeLinecap="round"
              className="timer-progress"
              style={{ filter: "url(#glow)" }}
              animate={{
                strokeDashoffset,
                filter: [
                  "drop-shadow(0 0 16px " + ringColor + ") drop-shadow(0 0 32px #0ea5e9)",
                  "drop-shadow(0 0 24px #6366f1) drop-shadow(0 0 48px #38bdf8)"
                ]
              }}
              transition={{ duration: 0.5 }}
            />
          </svg>
          {/* Timer display */}
          <div className="absolute inset-0 flex flex-col items-center justify-center">
            {/* Animated timer text with pulse and aria-live for accessibility */}
            <motion.div
              aria-live="polite"
              aria-atomic="true"
              className="text-6xl font-extrabold drop-shadow-lg text-white mb-2 tracking-widest timer-accessible-text"
              animate={isActive ? { scale: [1, 1.04, 1] } : { scale: 1 }}
              transition={isActive ? { duration: 1, repeat: Infinity, repeatType: "reverse" } : {}}
            >
              {minutes.toString().padStart(2, "0")}:{seconds.toString().padStart(2, "0")}
            </motion.div>
            <div className="text-lg text-sky-300 mt-2 capitalize font-semibold tracking-wide drop-shadow">
              {mode} Time
            </div>
          </div>
        </div>
        {/* Controls */}
        <div ref={controlsRef} className="flex gap-6 mb-8 flex-wrap justify-center">
          <button
            className="w-14 h-14 rounded-full bg-black/40 border border-white/10 backdrop-blur-md shadow-lg flex items-center justify-center transition-all duration-200 hover:border-orange-400 hover:shadow-[0_0_16px_#fbbf24] group focus-visible:ring-2 focus-visible:ring-orange-400"
            onClick={toggleTimer}
            aria-label={isActive ? 'Pause' : 'Play'}
            type="button"
          >
            <span className="group-hover:scale-110 group-hover:text-orange-400 transition-transform transition-colors duration-200 flex items-center justify-center">
              {isActive ? <Pause className="h-6 w-6" /> : <Play className="h-6 w-6" />}
            </span>
          </button>
          <button
            className="w-14 h-14 rounded-full bg-black/40 border border-white/10 backdrop-blur-md shadow-lg flex items-center justify-center transition-all duration-200 hover:border-orange-400 hover:shadow-[0_0_16px_#fbbf24] group focus-visible:ring-2 focus-visible:ring-orange-400"
            onClick={resetTimer}
            aria-label="Reset"
            type="button"
          >
            <span className="group-hover:scale-110 group-hover:text-orange-400 transition-transform transition-colors duration-200 flex items-center justify-center">
              <RotateCcw className="h-6 w-6" />
            </span>
          </button>
          <button
            className="w-14 h-14 rounded-full bg-black/40 border border-white/10 backdrop-blur-md shadow-lg flex items-center justify-center transition-all duration-200 hover:border-orange-400 hover:shadow-[0_0_16px_#fbbf24] group focus-visible:ring-2 focus-visible:ring-orange-400"
            onClick={() => setShowSettings(true)}
            aria-label="Settings"
            type="button"
          >
            <span className="group-hover:scale-110 group-hover:text-orange-400 transition-transform transition-colors duration-200 flex items-center justify-center">
              <Settings className="h-6 w-6" />
            </span>
          </button>
          <button
            className="w-14 h-14 rounded-full bg-black/40 border border-white/10 backdrop-blur-md shadow-lg flex items-center justify-center transition-all duration-200 hover:border-orange-400 hover:shadow-[0_0_16px_#fbbf24] group focus-visible:ring-2 focus-visible:ring-orange-400"
            onClick={() => setShowThemePicker(v => !v)}
            aria-label="Pick timer color"
            type="button"
          >
            <span className="group-hover:scale-110 group-hover:text-yellow-300 transition-transform transition-colors duration-200 flex items-center justify-center">
              <Palette className="h-6 w-6 text-yellow-300" />
            </span>
          </button>
        </div>
        {/* Mode selector */}
        <div className="flex justify-center gap-2 mb-2 flex-wrap">
          <button
            className={`px-8 py-3 rounded-lg font-bold text-lg transition-all duration-200 focus:outline-none focus-visible:ring-2 focus-visible:ring-orange-400
              ${mode === 'focus'
                ? 'bg-gradient-to-r from-red-500 via-orange-400 to-yellow-400 text-white border-0 shadow-lg'
                : 'bg-black/40 border border-white/10 text-white hover:border-orange-400 backdrop-blur-md'}
            `}
            onClick={() => switchMode('focus')}
            aria-pressed={mode === 'focus'}
            type="button"
            style={mode === 'focus' ? { boxShadow: '0 0 16px 4px rgba(251,191,36,0.35), 0 2px 12px 0 rgba(0,0,0,0.10)' } : {}}
          >
            Focus
          </button>
          <button
            className={`px-8 py-3 rounded-lg font-bold text-lg transition-all duration-200 focus:outline-none focus-visible:ring-2 focus-visible:ring-pink-400
              ${mode === 'break'
                ? 'bg-gradient-to-r from-yellow-400 via-pink-500 to-red-500 text-white border-0 shadow-lg'
                : 'bg-black/40 border border-white/10 text-white hover:border-pink-400 backdrop-blur-md'}
            `}
            onClick={() => switchMode('break')}
            aria-pressed={mode === 'break'}
            type="button"
            style={mode === 'break' ? { boxShadow: '0 0 16px 4px rgba(244,63,94,0.32), 0 2px 12px 0 rgba(0,0,0,0.10)' } : {}}
          >
            Break
          </button>
        </div>
        <style jsx>{`
          .glass-btn {
            background: rgba(24, 24, 27, 0.4);
            border: 1.5px solid rgba(255,255,255,0.08);
            box-shadow: 0 4px 24px 0 rgba(245, 158, 66, 0.08), 0 1.5px 8px 0 rgba(245, 158, 66, 0.08);
            backdrop-filter: blur(12px);
          }
          .timer-accessible-text {
            text-shadow: 0 2px 8px rgba(0,0,0,0.45), 0 0px 2px #fff8;
          }
        `}</style>
        {showSettings && (
          <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/70">
            <div className="bg-zinc-900 rounded-xl p-8 w-full max-w-xs shadow-2xl border border-white/10">
              <h2 className="text-xl font-bold mb-4 text-center">Timer Settings</h2>
              <form
                onSubmit={e => {
                  e.preventDefault()
                  localStorage.setItem("focusDuration", String(customFocus))
                  localStorage.setItem("breakDuration", String(customBreak))
                  setShowSettings(false)
                  setMode("focus")
                  setTime(customFocus * 60)
                }}
                className="flex flex-col gap-4"
              >
                <label className="flex flex-col gap-1">
                  <span className="text-sm">Focus Duration (minutes)</span>
                  <input
                    type="number"
                    min={1}
                    max={120}
                    value={customFocus}
                    onChange={e => setCustomFocus(Number(e.target.value))}
                    className="rounded-md px-3 py-2 bg-zinc-800 border border-white/10 text-white focus:outline-none focus:ring-2 focus:ring-orange-400"
                  />
                </label>
                <label className="flex flex-col gap-1">
                  <span className="text-sm">Break Duration (minutes)</span>
                  <input
                    type="number"
                    min={1}
                    max={60}
                    value={customBreak}
                    onChange={e => setCustomBreak(Number(e.target.value))}
                    className="rounded-md px-3 py-2 bg-zinc-800 border border-white/10 text-white focus:outline-none focus:ring-2 focus:ring-orange-400"
                  />
                </label>
                <div className="flex gap-2 mt-4">
                  <Button type="submit" className="flex-1 bg-orange-500 hover:bg-orange-600">Save</Button>
                  <Button type="button" variant="outline" className="flex-1" onClick={() => setShowSettings(false)}>Cancel</Button>
                </div>
              </form>
            </div>
          </div>
        )}
        {showThemePicker && (
          <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/70">
            <div className="bg-zinc-900 rounded-xl p-8 w-full max-w-xs shadow-2xl border border-white/10">
              <h2 className="text-xl font-bold mb-4 text-center flex items-center justify-center gap-2">
                <Palette className="w-6 h-6 text-yellow-300" /> Timer Theme
              </h2>
              <div className="mb-6">
                <div className="font-semibold text-white mb-2">Focus Color</div>
                <div className="flex gap-2 flex-wrap">
                  {COLOR_PRESETS.map(preset => (
                    <button
                      key={preset.name}
                      className={`w-8 h-8 rounded-full border-2 ${focusColor === preset.color ? "border-yellow-300 scale-110" : "border-white/10"}`}
                      style={{ background: `linear-gradient(to bottom right, var(--tw-gradient-stops))`, backgroundImage: `linear-gradient(to bottom right, ${preset.gradient.replace('from-', '').replace('to-', '')})`, backgroundColor: preset.color }}
                      onClick={() => {
                        setFocusColor(preset.color)
                        localStorage.setItem("focusColor", preset.color)
                      }}
                      aria-label={preset.name}
                    />
                  ))}
                </div>
              </div>
              <div className="mb-6">
                <div className="font-semibold text-white mb-2">Break Color</div>
                <div className="flex gap-2 flex-wrap">
                  {COLOR_PRESETS.map(preset => (
                    <button
                      key={preset.name}
                      className={`w-8 h-8 rounded-full border-2 ${breakColor === preset.color ? "border-yellow-300 scale-110" : "border-white/10"}`}
                      style={{ background: `linear-gradient(to bottom right, var(--tw-gradient-stops))`, backgroundImage: `linear-gradient(to bottom right, ${preset.gradient.replace('from-', '').replace('to-', '')})`, backgroundColor: preset.color }}
                      onClick={() => {
                        setBreakColor(preset.color)
                        localStorage.setItem("breakColor", preset.color)
                      }}
                      aria-label={preset.name}
                    />
                  ))}
                </div>
              </div>
              <Button type="button" variant="outline" className="w-full mt-2" onClick={() => setShowThemePicker(false)}>
                Close
              </Button>
            </div>
          </div>
        )}
    </div>
  )
} 