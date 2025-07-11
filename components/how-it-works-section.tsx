import { ShineBorder } from "@/components/ui/shine-border"

const STEP_EMOJIS = ["⏰", "🎯", "☕", "📈"]

export function HowItWorksSection() {
  const steps = [
    {
      number: "01",
      title: "Set Your Timer",
      description: "Choose a task and set the timer for 25 minutes (a standard Pomodoro)",
      color: "from-red-500 to-red-600",
      emoji: STEP_EMOJIS[0],
    },
    {
      number: "02",
      title: "Focus Deeply",
      description: "Work on your task with complete focus until the timer rings",
      color: "from-orange-500 to-orange-600",
      emoji: STEP_EMOJIS[1],
    },
    {
      number: "03",
      title: "Take a Break",
      description: "Take a short 5-minute break to rest your mind",
      color: "from-yellow-500 to-yellow-600",
      emoji: STEP_EMOJIS[2],
    },
    {
      number: "04",
      title: "Repeat & Track",
      description: "Repeat the cycle and track your productivity over time",
      color: "from-red-500 to-red-600",
      emoji: STEP_EMOJIS[3],
    },
  ]

  return (
    <section id="how-it-works" className="py-16 px-6 bg-black/50 relative overflow-hidden">
      {/* Animated background */}
      <div className="absolute inset-0 pointer-events-none z-0">
        <div className="w-2/3 h-2/3 absolute top-1/4 left-1/4 bg-gradient-to-br from-orange-400/10 via-pink-500/10 to-sky-400/10 rounded-full blur-3xl animate-pulse-slow" />
      </div>
      <div className="max-w-4xl mx-auto relative z-10">
        <h2 className="text-3xl font-bold mb-4 text-center bg-clip-text text-transparent bg-gradient-to-r from-red-500 via-orange-400 to-yellow-400 drop-shadow-lg">
          How the Pomodoro Technique Works
        </h2>
        <p className="text-gray-400 text-center mb-12 max-w-2xl mx-auto">
          The Pomodoro Technique is a time management method developed by Francesco Cirillo that uses a timer to break
          work into intervals, traditionally 25 minutes in length, separated by short breaks.
        </p>
        <div className="grid md:grid-cols-2 gap-8">
          {steps.map((step, index) => (
            <div
              key={step.number}
              className="relative group transition-all duration-200 hover:scale-105 hover:shadow-[0_0_32px_#f59e42,0_0_8px_#f43f5e]"
            >
              <div className="rounded-2xl bg-gradient-to-br from-white/5 via-zinc-900/60 to-black/80 border border-white/10 shadow-xl p-8 h-full backdrop-blur-xl flex flex-col items-center text-center">
                {/* Animated gradient/glow step number */}
                <div className={`text-4xl font-extrabold mb-2 bg-clip-text text-transparent bg-gradient-to-r ${step.color} animate-glow`}>{step.number}</div>
                {/* Fun emoji */}
                <div className="text-3xl mb-4 animate-bounce-slow select-none">{step.emoji}</div>
                <h3 className="text-xl font-bold mb-2 bg-clip-text text-transparent bg-gradient-to-r from-orange-400 to-yellow-400 drop-shadow">
                  {step.title}
                </h3>
                <p className="text-gray-400 mb-2">{step.description}</p>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  )
}
