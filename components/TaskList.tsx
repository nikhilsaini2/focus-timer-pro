"use client"
import { useState, useEffect, useRef } from "react"
import gsap from "gsap"
import { ScrollTrigger } from "gsap/ScrollTrigger"
gsap.registerPlugin(ScrollTrigger)
import { CheckCircle, Circle, Trash2, Plus, Edit2, XCircle } from "lucide-react"
import { Button } from "@/components/ui/button"

interface Task {
  id: string
  text: string
  done: boolean
}

export function TaskList() {
  const [tasks, setTasks] = useState<Task[]>([])
  const [input, setInput] = useState("")
  const [editingId, setEditingId] = useState<string | null>(null)
  const [editingText, setEditingText] = useState("")
  const inputRef = useRef<HTMLInputElement>(null)
  const editInputRef = useRef<HTMLInputElement>(null)
  const containerRef = useRef<HTMLDivElement>(null)
  const tasksRef = useRef<(HTMLLIElement | null)[]>([])

  // Load tasks from localStorage
  useEffect(() => {
    const saved = localStorage.getItem("tasks")
    if (saved) setTasks(JSON.parse(saved))
  }, [])

  // Save tasks to localStorage
  useEffect(() => {
    localStorage.setItem("tasks", JSON.stringify(tasks))
  }, [tasks])

  // Focus edit input when editing
  useEffect(() => {
    if (editingId) editInputRef.current?.focus()
  }, [editingId])

  useEffect(() => {
    if (containerRef.current) {
      gsap.fromTo(
        containerRef.current,
        { y: 40, opacity: 0 },
        {
          y: 0,
          opacity: 1,
          duration: 1.1,
          ease: "power3.out",
          scrollTrigger: {
            trigger: containerRef.current,
            start: "top 85%",
            toggleActions: "play none none none",
          },
        }
      )
    }
  }, [])

  useEffect(() => {
    if (tasksRef.current.length) {
      gsap.fromTo(
        tasksRef.current,
        { y: 24, opacity: 0 },
        {
          y: 0,
          opacity: 1,
          duration: 0.7,
          stagger: 0.08,
          ease: "power2.out",
        }
      )
    }
  }, [tasks.length])

  const addTask = (e?: React.FormEvent) => {
    if (e) e.preventDefault()
    if (!input.trim()) return
    setTasks([{ id: Date.now().toString(), text: input.trim(), done: false }, ...tasks])
    setInput("")
    inputRef.current?.focus()
  }

  const toggleTask = (id: string) => {
    setTasks(tasks => tasks.map(t => t.id === id ? { ...t, done: !t.done } : t))
  }

  const deleteTask = (id: string) => {
    setTasks(tasks => tasks.filter(t => t.id !== id))
  }

  const startEdit = (id: string, text: string) => {
    setEditingId(id)
    setEditingText(text)
  }

  const saveEdit = (id: string) => {
    if (!editingText.trim()) return
    setTasks(tasks => tasks.map(t => t.id === id ? { ...t, text: editingText.trim() } : t))
    setEditingId(null)
    setEditingText("")
  }

  const cancelEdit = () => {
    setEditingId(null)
    setEditingText("")
  }

  const clearCompleted = () => {
    setTasks(tasks => tasks.filter(t => !t.done))
  }

  const total = tasks.length
  const completed = tasks.filter(t => t.done).length
  const remaining = total - completed

  return (
    <div ref={containerRef} className="relative bg-gradient-to-br from-[#23243a]/80 via-[#18181b]/90 to-[#23243a]/80 p-6 xs:p-8 rounded-3xl border border-white/10 shadow-xl overflow-hidden w-full backdrop-blur-2xl transition-all duration-300 hover:shadow-[0_0_48px_12px_rgba(245,158,66,0.18)] hover:border-yellow-400/60">
      {/* Decorative floating blob */}
      <div className="absolute -bottom-8 -right-8 w-24 h-24 bg-gradient-to-br from-orange-400/30 via-pink-400/20 to-yellow-400/30 rounded-full blur-2xl opacity-40 pointer-events-none animate-pulse-slow" />
      <h3 className="text-2xl font-bold mb-4 flex items-center gap-2 text-white bg-clip-text text-transparent bg-gradient-to-r from-orange-400 via-yellow-400 to-pink-400 animate-gradient-x drop-shadow-lg">
        <span className="relative">
          <Plus className="w-7 h-7 text-orange-400 animate-pulse-slow drop-shadow-glow" />
          <span className="absolute -top-2 -left-2 w-5 h-5 rounded-full bg-gradient-to-tr from-yellow-400 via-pink-400 to-sky-400 blur-md opacity-60 animate-pulse-slow" />
        </span>
        Task List
      </h3>
      <form onSubmit={addTask} className="flex flex-col xs:flex-row gap-2 mb-4 w-full">
        <input
          ref={inputRef}
          type="text"
          value={input}
          onChange={e => setInput(e.target.value)}
          placeholder="Add a new task..."
          className="flex-1 rounded-md px-3 py-2 bg-zinc-800 border border-white/10 text-white focus:outline-none focus:ring-2 focus:ring-orange-400 text-base xs:text-lg focus:shadow-[0_0_0_3px_rgba(251,191,36,0.18)] transition-shadow"
        />
        <Button type="submit" className="w-full xs:w-auto bg-gradient-to-r from-orange-500 via-yellow-400 to-pink-500 hover:from-orange-600 hover:to-pink-600 px-5 text-base xs:text-lg font-semibold shadow-md transition-all duration-200 animate-gradient-x">
          Add
        </Button>
      </form>
      <div className="flex items-center justify-between mb-2 text-sm text-gray-400">
        <span>Total: <span className="text-white font-bold">{total}</span></span>
        <span>Done: <span className="text-green-400 font-bold">{completed}</span></span>
        <span>Left: <span className="text-orange-400 font-bold">{remaining}</span></span>
        <Button variant="ghost" size="sm" className="text-xs text-red-400 hover:text-red-600 px-2 py-1" onClick={clearCompleted} disabled={completed === 0}>
          <XCircle className="w-4 h-4 mr-1" /> Clear Done
        </Button>
      </div>
      <ul className="space-y-2 max-h-52 overflow-y-auto pr-1 transition-all hide-scrollbar" aria-live="polite">
        {tasks.length === 0 && (
          <li className="text-gray-400 text-center py-8 select-none">
            <span className="block text-3xl mb-2">📝</span>
            <span>No tasks yet. Add one!</span>
          </li>
        )}
        {tasks.map((task, i) => (
          <li
            key={task.id}
            ref={el => (tasksRef.current[i] = el)}
            className={`flex items-center gap-2 group bg-zinc-800/60 rounded-lg px-3 py-2 transition-all duration-200 shadow-sm hover:scale-[1.03] hover:bg-zinc-700/80 ${task.done ? "opacity-70" : ""}`}
          >
            <button
              aria-label={task.done ? "Mark as incomplete" : "Mark as complete"}
              onClick={() => toggleTask(task.id)}
              className="focus:outline-none cursor-pointer ripple-effect"
            >
              {task.done ? (
                <CheckCircle className="w-6 h-6 text-green-400" />
              ) : (
                <Circle className="w-6 h-6 text-orange-400 group-hover:text-orange-300" />
              )}
            </button>
            {editingId === task.id ? (
              <input
                ref={editInputRef}
                type="text"
                value={editingText}
                onChange={e => setEditingText(e.target.value)}
                onBlur={() => saveEdit(task.id)}
                onKeyDown={e => {
                  if (e.key === "Enter") saveEdit(task.id)
                  if (e.key === "Escape") cancelEdit()
                }}
                className="flex-1 rounded-md px-2 py-1 bg-zinc-900 border border-white/10 text-white focus:outline-none focus:ring-2 focus:ring-orange-400 text-lg focus:shadow-[0_0_0_3px_rgba(251,191,36,0.18)] transition-shadow"
              />
            ) : (
              <span
                className={`flex-1 text-lg font-medium cursor-pointer select-text ${task.done ? "line-through text-gray-500" : "text-white"}`}
                onDoubleClick={() => startEdit(task.id, task.text)}
                title="Double-click to edit"
              >
                {task.text}
              </span>
            )}
            <button
              aria-label="Edit task"
              onClick={() => startEdit(task.id, task.text)}
              className="opacity-0 group-hover:opacity-100 transition text-blue-400 hover:text-blue-600"
              tabIndex={-1}
            >
              <Edit2 className="w-4 h-4" />
            </button>
            <button
              aria-label="Delete task"
              onClick={() => deleteTask(task.id)}
              className="opacity-60 hover:opacity-100 transition text-red-400 hover:text-red-600"
            >
              <Trash2 className="w-5 h-5" />
            </button>
          </li>
        ))}
      </ul>
      <style jsx>{`
        @keyframes fadeInUp {
          from { opacity: 0; transform: translateY(16px); }
          to { opacity: 1; transform: translateY(0); }
        }
        .hide-scrollbar {
          scrollbar-width: none; /* Firefox */
          -ms-overflow-style: none; /* IE and Edge */
        }
        .hide-scrollbar::-webkit-scrollbar {
          display: none; /* Chrome, Safari, Opera */
        }
        .ripple-effect:active::after {
          content: '';
          position: absolute;
          left: 50%;
          top: 50%;
          width: 120%;
          height: 120%;
          background: rgba(251,191,36,0.18);
          border-radius: 50%;
          transform: translate(-50%, -50%) scale(0.8);
          animation: ripple 0.4s linear;
          pointer-events: none;
        }
        @keyframes ripple {
          0% { opacity: 0.6; transform: translate(-50%, -50%) scale(0.8); }
          100% { opacity: 0; transform: translate(-50%, -50%) scale(1.6); }
        }
      `}</style>
    </div>
  )
} 