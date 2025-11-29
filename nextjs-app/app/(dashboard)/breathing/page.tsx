'use client'

import { useState, useEffect } from 'react'

export default function BreathingPage() {
  const [phase, setPhase] = useState<'inhale' | 'hold' | 'exhale' | 'rest'>('inhale')
  const [isActive, setIsActive] = useState(false)
  const [seconds, setSeconds] = useState(0)
  const [cyclesCompleted, setCyclesCompleted] = useState(0)
  const [pauseMessage, setPauseMessage] = useState('')

  const encouragingMessages = [
    "Great work! You're doing amazing. Take a moment to feel your body relax. 🌟",
    "You're taking important steps toward calmness. Every breath counts! 💙",
    "Excellent! Notice how your body feels more relaxed with each cycle. ✨",
    "Well done! You're building a wonderful habit of mindfulness. 🌸",
    "Beautiful breathing! You're giving your body the gift of relaxation. 🌊",
    "Keep it up! Your nervous system is thanking you right now. 💫",
    "Fantastic! You're mastering the art of calm breathing. 🦋",
    "You're doing great! Feel the stress melting away with each breath. 🌺",
  ]

  useEffect(() => {
    if (!isActive) return

    const phases = {
      inhale: 4,
      hold: 7,
      exhale: 8,
      rest: 2,
    }

    const nextPhase = {
      inhale: 'hold',
      hold: 'exhale',
      exhale: 'rest',
      rest: 'inhale',
    } as const

    const interval = setInterval(() => {
      setSeconds(prev => {
        const newSeconds = prev + 1
        const phaseLimit = phases[phase]

        if (newSeconds >= phaseLimit) {
          const newPhase = nextPhase[phase]
          setPhase(newPhase)
          
          // Count completed cycles (when returning to inhale)
          if (newPhase === 'inhale') {
            setCyclesCompleted(c => c + 1)
          }
          
          return 0
        }
        return newSeconds
      })
    }, 1000)

    return () => clearInterval(interval)
  }, [isActive, phase, seconds])

  const getInstructions = () => {
    switch (phase) {
      case 'inhale':
        return 'Breathe In'
      case 'hold':
        return 'Hold'
      case 'exhale':
        return 'Breathe Out'
      case 'rest':
        return 'Rest'
    }
  }

  const getPhaseColor = () => {
    switch (phase) {
      case 'inhale':
        return 'from-pastel-sky-400 to-pastel-mint-400'
      case 'hold':
        return 'from-pastel-lavender-400 to-pastel-pink-400'
      case 'exhale':
        return 'from-pastel-mint-400 to-pastel-sky-400'
      case 'rest':
        return 'from-pastel-lavender-300 to-pastel-pink-300'
    }
  }

  return (
    <div className="max-w-4xl mx-auto p-6">
      <div className="bg-white rounded-4xl shadow-float p-10 card-float animate-scaleIn">
        <div className="text-center mb-8">
          <h1 className="text-4xl font-bold text-slate-800 mb-2">
            Breathing Exercise
          </h1>
          <p className="text-slate-600 text-lg">
            4-7-8 Technique for Deep Relaxation 🌊
          </p>
        </div>

        <div className="flex flex-col items-center space-y-10">
          {/* Breathing Circle */}
          <div className="relative w-96 h-96 flex items-center justify-center">
            <div
              className={`absolute w-full h-full rounded-full bg-gradient-to-br ${getPhaseColor()} transition-all duration-1000 shadow-float ${
                isActive && phase === 'inhale'
                  ? 'scale-110 opacity-100'
                  : isActive && phase === 'hold'
                  ? 'scale-110 opacity-95'
                  : isActive && phase === 'exhale'
                  ? 'scale-75 opacity-85'
                  : 'scale-90 opacity-90'
              } ${isActive ? 'animate-breathe' : ''}`}
            ></div>
            <div className="relative z-10 text-center">
              <p className="text-white text-4xl font-bold mb-3 drop-shadow-lg">{getInstructions()}</p>
              {isActive && (
                <p className="text-white text-7xl font-bold drop-shadow-lg">
                  {seconds + 1}
                </p>
              )}
            </div>
          </div>

          {/* Instructions */}
          {!isActive && cyclesCompleted === 0 && (
            <div className="gradient-sky rounded-3xl p-8 max-w-md shadow-soft border-2 border-pastel-sky-200 animate-fadeIn">
              <h3 className="font-bold text-slate-800 mb-4 text-xl flex items-center gap-2">
                <span>💡</span> How it works:
              </h3>
              <ul className="space-y-3 text-slate-700">
                <li className="flex items-center gap-3">
                  <span className="text-2xl">🌬️</span>
                  <span><strong>Inhale</strong> for 4 seconds</span>
                </li>
                <li className="flex items-center gap-3">
                  <span className="text-2xl">⏸️</span>
                  <span><strong>Hold</strong> your breath for 7 seconds</span>
                </li>
                <li className="flex items-center gap-3">
                  <span className="text-2xl">🌊</span>
                  <span><strong>Exhale</strong> slowly for 8 seconds</span>
                </li>
                <li className="flex items-center gap-3">
                  <span className="text-2xl">✨</span>
                  <span>Brief <strong>rest</strong>, then repeat</span>
                </li>
              </ul>
              <p className="mt-6 text-slate-700 text-sm bg-white/70 rounded-2xl p-4 font-medium">
                This technique activates your parasympathetic nervous system, promoting calmness and reducing stress.
              </p>
            </div>
          )}

          {/* Pause Message */}
          {!isActive && cyclesCompleted > 0 && pauseMessage && (
            <div className="gradient-lavender rounded-3xl p-8 max-w-md shadow-soft border-2 border-pastel-lavender-200 animate-fadeIn">
              <div className="text-center">
                <h3 className="font-bold text-slate-800 mb-4 text-2xl">
                  Breathing Paused
                </h3>
                <p className="text-slate-700 text-lg leading-relaxed mb-4">
                  {pauseMessage}
                </p>
                <div className="bg-white/60 rounded-2xl p-4 mt-4">
                  <p className="text-pastel-lavender-700 font-semibold">
                    Cycles completed: {cyclesCompleted} 🎯
                  </p>
                  <p className="text-slate-600 text-sm mt-2">
                    Total breathing time: {Math.floor(cyclesCompleted * 21 / 60)} min {(cyclesCompleted * 21) % 60} sec
                  </p>
                </div>
              </div>
            </div>
          )}

          {/* Control Button */}
          <button
            onClick={() => {
              if (isActive) {
                // Pausing - show encouraging message
                const randomMessage = encouragingMessages[Math.floor(Math.random() * encouragingMessages.length)]
                setPauseMessage(randomMessage)
              } else {
                // Starting/resuming
                setPauseMessage('')
                if (cyclesCompleted === 0) {
                  setPhase('inhale')
                  setSeconds(0)
                }
              }
              setIsActive(!isActive)
            }}
            className={`px-10 py-5 rounded-3xl font-bold text-lg shadow-soft hover:shadow-float transition-all duration-300 ${
              isActive
                ? 'bg-gradient-to-r from-pastel-rose-500 to-pastel-pink-500 hover:from-pastel-rose-600 hover:to-pastel-pink-600 text-white'
                : 'bg-gradient-to-r from-pastel-sky-500 to-pastel-mint-500 hover:from-pastel-sky-600 hover:to-pastel-mint-600 text-white hover:-translate-y-1'
            }`}
          >
            {isActive ? '⏸️ Pause' : cyclesCompleted > 0 ? '▶️ Resume' : '▶️ Start Breathing'}
          </button>
        </div>
      </div>
    </div>
  )
}
