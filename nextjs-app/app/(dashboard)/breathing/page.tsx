'use client'

import { useState, useEffect } from 'react'

// ====== AGE-BASED BREATHING TIMINGS (Adjustable) ======
const AGE_BASED_TIMINGS = {
  '6-12': { inhale: 3, hold: 1, exhale: 3, rest: 2, targetCycles: 3 },
  '13-20': { inhale: 4, hold: 2, exhale: 4, rest: 2, targetCycles: 5 },
  '21-40': { inhale: 5, hold: 2, exhale: 5, rest: 2, targetCycles: 7 },
  '41-60': { inhale: 4, hold: 2, exhale: 4, rest: 2, targetCycles: 5 },
  '60+': { inhale: 3, hold: 1, exhale: 3, rest: 2, targetCycles: 3 },
}

// ====== PERFORMANCE COLOR THRESHOLDS (Adjustable) ======
const PERFORMANCE_COLORS = {
  excellent: { threshold: 80, color: '#BFDBFE', name: 'Baby Blue' }, // > 80%
  okay: { threshold: 40, color: '#F0ABFC', name: 'Fuchsia Pink' }, // 40-80%
  danger: { threshold: 0, color: '#FCA5A5', name: 'Red' }, // < 40%
}

export default function BreathingPage() {
  const [phase, setPhase] = useState<'inhale' | 'hold' | 'exhale' | 'rest'>('inhale')
  const [isActive, setIsActive] = useState(false)
  const [seconds, setSeconds] = useState(0)
  const [cyclesCompleted, setCyclesCompleted] = useState(0)
  const [pauseMessage, setPauseMessage] = useState('')
  
  // ====== NEW: Age-based timing states ======
  const [userAge, setUserAge] = useState<number | null>(null)
  const [showAgeInput, setShowAgeInput] = useState(true)
  const [ageInputValue, setAgeInputValue] = useState('')
  const [breathingTimings, setBreathingTimings] = useState({ inhale: 4, hold: 7, exhale: 8, rest: 2 })
  
  // ====== NEW: Performance tracking states ======
  const [targetCycles, setTargetCycles] = useState(5) // Default target
  const [sessionCompleted, setSessionCompleted] = useState(false)
  const [performanceColor, setPerformanceColor] = useState('')
  const [performanceText, setPerformanceText] = useState('')

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

  // ====== NEW: Function to get age-appropriate timings ======
  const getTimingsForAge = (age: number) => {
    if (age >= 6 && age <= 12) return AGE_BASED_TIMINGS['6-12']
    if (age >= 13 && age <= 20) return AGE_BASED_TIMINGS['13-20']
    if (age >= 21 && age <= 40) return AGE_BASED_TIMINGS['21-40']
    if (age >= 41 && age <= 60) return AGE_BASED_TIMINGS['41-60']
    if (age > 60) return AGE_BASED_TIMINGS['60+']
    return { inhale: 4, hold: 7, exhale: 8, rest: 2, targetCycles: 5 } // Default fallback
  }

  // ====== NEW: Function to calculate performance color ======
  const calculatePerformanceColor = (completed: number, target: number) => {
    const percentage = (completed / target) * 100
    
    if (percentage >= 100) {
      return {
        color: PERFORMANCE_COLORS.excellent.color,
        text: `Excellent! Target completed - ${PERFORMANCE_COLORS.excellent.name}`,
        name: PERFORMANCE_COLORS.excellent.name
      }
    } else if (percentage >= PERFORMANCE_COLORS.okay.threshold) {
      return {
        color: PERFORMANCE_COLORS.okay.color,
        text: `Good progress! ${percentage.toFixed(0)}% completed - ${PERFORMANCE_COLORS.okay.name}`,
        name: PERFORMANCE_COLORS.okay.name
      }
    } else {
      return {
        color: PERFORMANCE_COLORS.danger.color,
        text: `Keep going! ${percentage.toFixed(0)}% completed - ${PERFORMANCE_COLORS.danger.name}`,
        name: PERFORMANCE_COLORS.danger.name
      }
    }
  }

  // ====== Helper function to get current progress color ======
  const getCurrentProgressColor = () => {
    if (cyclesCompleted === 0) return '#E2E8F0' // gray for not started
    return calculatePerformanceColor(cyclesCompleted, targetCycles).color
  }

  // ====== NEW: Handle age submission ======
  const handleAgeSubmit = () => {
    const age = parseInt(ageInputValue)
    if (age && age >= 6 && age <= 120) {
      setUserAge(age)
      const timings = getTimingsForAge(age)
      setBreathingTimings(timings)
      // ====== Set age-appropriate target cycles ======
      setTargetCycles(timings.targetCycles)
      setShowAgeInput(false)
    } else {
      alert('Please enter a valid age between 6 and 120')
    }
  }

  useEffect(() => {
    if (!isActive) return

    // ====== Use age-based timings instead of hardcoded values ======
    const phases = {
      inhale: breathingTimings.inhale,
      hold: breathingTimings.hold,
      exhale: breathingTimings.exhale,
      rest: breathingTimings.rest,
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
            const newCycleCount = cyclesCompleted + 1
            setCyclesCompleted(newCycleCount)
            
            // ====== NEW: Check if target reached ======
            if (newCycleCount >= targetCycles && !sessionCompleted) {
              setSessionCompleted(true)
              setIsActive(false)
              const performance = calculatePerformanceColor(newCycleCount, targetCycles)
              setPerformanceColor(performance.color)
              setPerformanceText(performance.text)
            }
          }
          
          return 0
        }
        return newSeconds
      })
    }, 1000)

    return () => clearInterval(interval)
  }, [isActive, phase, seconds, breathingTimings, cyclesCompleted, targetCycles, sessionCompleted])

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
            {userAge ? `Personalized for Age ${userAge} 🌊` : '4-7-8 Technique for Deep Relaxation 🌊'}
          </p>
        </div>

        {/* ====== NEW: Age Input Screen ====== */}
        {showAgeInput && (
          <div className="flex flex-col items-center space-y-6 animate-fadeIn">
            <div className="gradient-sky rounded-3xl p-8 max-w-md shadow-soft border-2 border-pastel-sky-200">
              <h3 className="font-bold text-slate-800 mb-4 text-2xl text-center">
                Let's Personalize Your Breathing 🎯
              </h3>
              <p className="text-slate-700 mb-6 text-center">
                Enter your age to get breathing timings tailored just for you!
              </p>
              
              <div className="space-y-4">
                <input
                  type="number"
                  min="6"
                  max="120"
                  value={ageInputValue}
                  onChange={(e) => setAgeInputValue(e.target.value)}
                  onKeyPress={(e) => e.key === 'Enter' && handleAgeSubmit()}
                  placeholder="Enter your age (6-120)"
                  className="w-full px-4 py-3 rounded-2xl border-2 border-pastel-sky-300 focus:border-pastel-sky-500 focus:outline-none text-center text-lg font-semibold text-slate-800"
                />
                
                <button
                  onClick={handleAgeSubmit}
                  className="w-full px-6 py-3 bg-gradient-to-r from-pastel-sky-500 to-pastel-mint-500 hover:from-pastel-sky-600 hover:to-pastel-mint-600 text-white font-bold rounded-2xl shadow-soft hover:shadow-float transition-all duration-300"
                >
                  Get My Breathing Plan ✨
                </button>
              </div>

              <div className="mt-6 bg-white/70 rounded-2xl p-4 text-sm text-slate-600">
                <p className="font-semibold mb-2">Age-based timing groups:</p>
                <ul className="space-y-1">
                  <li>• Ages 6-12: Gentle pace</li>
                  <li>• Ages 13-20: Moderate pace</li>
                  <li>• Ages 21-40: Full capacity</li>
                  <li>• Ages 41-60: Moderate pace</li>
                  <li>• Ages 60+: Gentle pace</li>
                </ul>
              </div>
            </div>
          </div>
        )}

        {/* ====== Existing Breathing Exercise (Only show after age input) ====== */}
        {!showAgeInput && (
          <div className="flex flex-col items-center space-y-10">
            {/* ====== UPDATED: Breathing Circle with Performance Color ====== */}
            <div className="relative w-96 h-96 flex items-center justify-center">
              {/* ====== NEW: Performance color glow border ====== */}
              {sessionCompleted && performanceColor && (
                <div
                  className="absolute w-full h-full rounded-full animate-pulse"
                  style={{
                    boxShadow: `0 0 40px 10px ${performanceColor}, 0 0 60px 20px ${performanceColor}`,
                    backgroundColor: performanceColor,
                    opacity: 0.3,
                  }}
                ></div>
              )}
              
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
                style={
                  sessionCompleted && performanceColor
                    ? { backgroundColor: performanceColor, backgroundImage: 'none' }
                    : {}
                }
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

            {/* ====== NEW: Performance Result Display ====== */}
            {sessionCompleted && performanceText && (
              <div className="gradient-mint rounded-3xl p-8 max-w-md shadow-soft border-2 border-pastel-mint-300 animate-fadeIn">
                <div className="text-center">
                  <h3 className="font-bold text-slate-800 mb-4 text-2xl">
                    Session Complete! 🎉
                  </h3>
                  <div 
                    className="rounded-2xl p-6 mb-4"
                    style={{ backgroundColor: performanceColor }}
                  >
                    <p className="text-white text-lg font-bold drop-shadow-lg">
                      {performanceText}
                    </p>
                  </div>
                  <div className="bg-white/60 rounded-2xl p-4">
                    <p className="text-slate-700 font-semibold">
                      Cycles completed: {cyclesCompleted} / {targetCycles} 🎯
                    </p>
                    <p className="text-slate-600 text-sm mt-2">
                      Total time: {Math.floor((cyclesCompleted * (breathingTimings.inhale + breathingTimings.hold + breathingTimings.exhale + breathingTimings.rest)) / 60)} min {(cyclesCompleted * (breathingTimings.inhale + breathingTimings.hold + breathingTimings.exhale + breathingTimings.rest)) % 60} sec
                    </p>
                  </div>
                  <button
                    onClick={() => {
                      setCyclesCompleted(0)
                      setSessionCompleted(false)
                      setPerformanceColor('')
                      setPerformanceText('')
                      setPhase('inhale')
                      setSeconds(0)
                    }}
                    className="mt-4 px-6 py-3 bg-gradient-to-r from-pastel-sky-500 to-pastel-mint-500 hover:from-pastel-sky-600 hover:to-pastel-mint-600 text-white font-bold rounded-2xl shadow-soft hover:shadow-float transition-all duration-300"
                  >
                    Start New Session ✨
                  </button>
                </div>
              </div>
            )}

            {/* Instructions */}
            {!isActive && cyclesCompleted === 0 && !sessionCompleted && (
              <div className="gradient-sky rounded-3xl p-8 max-w-md shadow-soft border-2 border-pastel-sky-200 animate-fadeIn">
                <h3 className="font-bold text-slate-800 mb-4 text-xl flex items-center gap-2">
                  <span>💡</span> Your Personalized Breathing Plan:
                </h3>
                <ul className="space-y-3 text-slate-700">
                  <li className="flex items-center gap-3">
                    <span className="text-2xl">🌬️</span>
                    <span><strong>Inhale</strong> for {breathingTimings.inhale} seconds</span>
                  </li>
                  <li className="flex items-center gap-3">
                    <span className="text-2xl">⏸️</span>
                    <span><strong>Hold</strong> your breath for {breathingTimings.hold} seconds</span>
                  </li>
                  <li className="flex items-center gap-3">
                    <span className="text-2xl">🌊</span>
                    <span><strong>Exhale</strong> slowly for {breathingTimings.exhale} seconds</span>
                  </li>
                  <li className="flex items-center gap-3">
                    <span className="text-2xl">✨</span>
                    <span>Brief <strong>rest</strong> for {breathingTimings.rest} seconds, then repeat</span>
                  </li>
                </ul>
                <div className="mt-4 bg-white/70 rounded-2xl p-4">
                  <label className="text-slate-700 font-semibold text-sm block mb-2">
                    Target Cycles (Age-Based):
                  </label>
                  <div className="w-full px-4 py-3 rounded-xl border-2 border-pastel-sky-300 bg-gray-100 text-center font-bold text-lg text-slate-800">
                    {targetCycles}
                  </div>
                  <p className="text-xs text-slate-600 mt-2">
                    Automatically set based on your age group
                  </p>
                </div>
                <p className="mt-6 text-slate-700 text-sm bg-white/70 rounded-2xl p-4 font-medium">
                  This technique activates your parasympathetic nervous system, promoting calmness and reducing stress.
                </p>
              </div>
            )}

          {/* Pause Message with Color Indicator */}
          {!isActive && cyclesCompleted > 0 && pauseMessage && !sessionCompleted && (
            <div className="gradient-lavender rounded-3xl p-8 max-w-md shadow-soft border-2 border-pastel-lavender-200 animate-fadeIn">
              <div className="text-center">
                <h3 className="font-bold text-slate-800 mb-4 text-2xl">
                  Breathing Paused
                </h3>
                <p className="text-slate-700 text-lg leading-relaxed mb-4">
                  {pauseMessage}
                </p>
                
                {/* Performance Color Indicator */}
                <div 
                  className="rounded-2xl p-4 mb-4"
                  style={{ backgroundColor: getCurrentProgressColor() }}
                >
                  <p className="text-white font-bold text-lg drop-shadow-lg">
                    {calculatePerformanceColor(cyclesCompleted, targetCycles).text}
                  </p>
                </div>

                <div className="bg-white/60 rounded-2xl p-4">
                  <p className="text-pastel-lavender-700 font-semibold">
                    Cycles completed: {cyclesCompleted} / {targetCycles} 🎯
                  </p>
                  <p className="text-slate-600 text-sm mt-2">
                    Total breathing time: {Math.floor((cyclesCompleted * (breathingTimings.inhale + breathingTimings.hold + breathingTimings.exhale + breathingTimings.rest)) / 60)} min {(cyclesCompleted * (breathingTimings.inhale + breathingTimings.hold + breathingTimings.exhale + breathingTimings.rest)) % 60} sec
                  </p>
                </div>
              </div>
            </div>
          )}

          {/* Control Button (Only show when session not completed) */}
          {!sessionCompleted && (
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
          )}
        </div>
        )}
      </div>
    </div>
  )
}
