'use client'

import { useState, useEffect } from 'react'
import { FiPlay, FiPause, FiRotateCcw } from 'react-icons/fi'

export default function MeditationPage() {
  const [duration, setDuration] = useState(5) // minutes
  const [timeLeft, setTimeLeft] = useState(duration * 60) // seconds
  const [isActive, setIsActive] = useState(false)
  const [isCompleted, setIsCompleted] = useState(false)

  useEffect(() => {
    setTimeLeft(duration * 60)
  }, [duration])

  useEffect(() => {
    let interval: NodeJS.Timeout | null = null

    if (isActive && timeLeft > 0) {
      interval = setInterval(() => {
        setTimeLeft(prev => {
          if (prev <= 1) {
            setIsActive(false)
            setIsCompleted(true)
            return 0
          }
          return prev - 1
        })
      }, 1000)
    }

    return () => {
      if (interval) clearInterval(interval)
    }
  }, [isActive, timeLeft])

  const formatTime = (seconds: number) => {
    const mins = Math.floor(seconds / 60)
    const secs = seconds % 60
    return `${mins.toString().padStart(2, '0')}:${secs.toString().padStart(2, '0')}`
  }

  const progress = ((duration * 60 - timeLeft) / (duration * 60)) * 100

  const handleReset = () => {
    setIsActive(false)
    setTimeLeft(duration * 60)
    setIsCompleted(false)
  }

  return (
    <div className="max-w-4xl mx-auto p-6">
      <div className="bg-white rounded-4xl shadow-float p-10 card-float animate-scaleIn">
        <div className="text-center mb-8">
          <h1 className="text-4xl font-bold bg-gradient-to-r from-pastel-lavender-600 to-pastel-pink-600 bg-clip-text text-transparent mb-2">
            Meditation Timer
          </h1>
          <p className="text-slate-500 text-lg">
            Find your inner peace 🧘‍♀️
          </p>
        </div>

        <div className="flex flex-col items-center space-y-10">
          {/* Timer Display */}
          <div className="relative w-96 h-96 flex items-center justify-center">
            {/* Progress Circle */}
            <svg className="absolute w-full h-full transform -rotate-90">
              <circle
                cx="192"
                cy="192"
                r="160"
                stroke="#f0f0f0"
                strokeWidth="20"
                fill="none"
              />
              <circle
                cx="192"
                cy="192"
                r="160"
                stroke="url(#meditationGradient)"
                strokeWidth="20"
                fill="none"
                strokeDasharray={2 * Math.PI * 160}
                strokeDashoffset={2 * Math.PI * 160 * (1 - progress / 100)}
                strokeLinecap="round"
                className="transition-all duration-1000 drop-shadow-lg"
              />
              <defs>
                <linearGradient id="meditationGradient" x1="0%" y1="0%" x2="100%" y2="100%">
                  <stop offset="0%" stopColor="#a78bfa" />
                  <stop offset="50%" stopColor="#fb3d8e" />
                  <stop offset="100%" stopColor="#2dd4bf" />
                </linearGradient>
              </defs>
            </svg>

            {/* Time Display */}
            <div className="relative z-10 text-center">
              {isCompleted ? (
                <div className="animate-scaleIn">
                  <p className="text-8xl mb-4">🎉</p>
                  <p className="text-3xl font-bold text-slate-800">
                    Well Done!
                  </p>
                </div>
              ) : (
                <p className="text-7xl font-bold text-slate-800">
                  {formatTime(timeLeft)}
                </p>
              )}
            </div>
          </div>

          {/* Duration Selector */}
          {!isActive && !isCompleted && (
            <div className="w-full max-w-md animate-fadeIn">
              <label className="block text-sm font-semibold text-slate-700 mb-4 text-center">
                ⏱️ Select Duration
              </label>
              <div className="grid grid-cols-5 gap-3">
                {[5, 10, 15, 20, 30].map(min => (
                  <button
                    key={min}
                    onClick={() => setDuration(min)}
                    className={`py-4 rounded-2xl font-bold transition-all duration-300 shadow-soft hover:shadow-soft-lg ${
                      duration === min
                        ? 'bg-gradient-to-br from-pastel-lavender-500 to-pastel-pink-500 text-white scale-105'
                        : 'bg-white text-slate-600 hover:bg-pastel-lavender-50'
                    }`}
                  >
                    {min}m
                  </button>
                ))}
              </div>
            </div>
          )}

          {/* Control Buttons */}
          <div className="flex gap-4">
            {!isCompleted && (
              <button
                onClick={() => setIsActive(!isActive)}
                className="flex items-center gap-3 px-10 py-5 bg-gradient-to-r from-pastel-lavender-500 to-pastel-pink-500 hover:from-pastel-lavender-600 hover:to-pastel-pink-600 text-white rounded-3xl font-bold text-lg shadow-soft hover:shadow-float transition-all duration-300 hover:-translate-y-1"
              >
                {isActive ? <FiPause size={24} /> : <FiPlay size={24} />}
                {isActive ? 'Pause' : 'Start'}
              </button>
            )}
            {(isActive || isCompleted || timeLeft < duration * 60) && (
              <button
                onClick={handleReset}
                className="flex items-center gap-3 px-10 py-5 bg-white hover:bg-pastel-lavender-50 text-slate-700 rounded-3xl font-bold text-lg shadow-soft hover:shadow-soft-lg transition-all duration-300"
              >
                <FiRotateCcw size={24} />
                Reset
              </button>
            )}
          </div>

          {/* Meditation Tips */}
          {!isActive && !isCompleted && (
            <div className="gradient-lavender rounded-3xl p-8 max-w-md shadow-soft border-2 border-pastel-lavender-200 animate-fadeIn">
              <h3 className="font-bold text-slate-800 mb-4 text-xl flex items-center gap-2">
                <span>🌸</span> Meditation Tips
              </h3>
              <ul className="space-y-3 text-slate-700">
                <li className="flex items-start gap-3">
                  <span className="text-xl">🏡</span>
                  <span>Find a quiet, comfortable space</span>
                </li>
                <li className="flex items-start gap-3">
                  <span className="text-xl">🪑</span>
                  <span>Sit with your back straight</span>
                </li>
                <li className="flex items-start gap-3">
                  <span className="text-xl">👁️</span>
                  <span>Close your eyes or soften your gaze</span>
                </li>
                <li className="flex items-start gap-3">
                  <span className="text-xl">🌬️</span>
                  <span>Focus on your breath</span>
                </li>
                <li className="flex items-start gap-3">
                  <span className="text-xl">☁️</span>
                  <span>Let thoughts pass without judgment</span>
                </li>
                <li className="flex items-start gap-3">
                  <span className="text-xl">🎯</span>
                  <span>Return your focus to your breath</span>
                </li>
              </ul>
            </div>
          )}
        </div>
      </div>
    </div>
  )
}
