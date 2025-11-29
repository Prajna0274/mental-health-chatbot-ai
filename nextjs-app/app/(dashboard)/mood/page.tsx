'use client'

import { useState } from 'react'

export default function MoodPage() {
  const [moodValue, setMoodValue] = useState(5)
  const [notes, setNotes] = useState('')
  const [submitting, setSubmitting] = useState(false)
  const [success, setSuccess] = useState(false)

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    setSubmitting(true)
    setSuccess(false)

    try {
      const res = await fetch('/api/moods', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ mood_value: moodValue, notes }),
      })

      if (!res.ok) throw new Error('Failed to save mood')

      setSuccess(true)
      setNotes('')
      setTimeout(() => setSuccess(false), 3000)
    } catch (error) {
      console.error('Error saving mood:', error)
      alert('Failed to save mood. Please try again.')
    } finally {
      setSubmitting(false)
    }
  }

  const getMoodEmoji = () => {
    if (moodValue <= 2) return '😭'
    if (moodValue <= 4) return '😢'
    if (moodValue <= 6) return '😐'
    if (moodValue <= 8) return '🙂'
    return '😊'
  }

  const getMoodLabel = () => {
    if (moodValue <= 2) return 'Very low'
    if (moodValue <= 4) return 'Not great'
    if (moodValue <= 6) return 'Okay'
    if (moodValue <= 8) return 'Good'
    return 'Excellent'
  }

  const getGradientColors = () => {
    if (moodValue <= 3) return 'from-pastel-rose-300 to-pastel-pink-300'
    if (moodValue <= 6) return 'from-pastel-peach-300 to-pastel-lavender-300'
    return 'from-pastel-mint-300 to-pastel-sky-300'
  }

  return (
    <div className="max-w-2xl mx-auto p-6">
      <div className="bg-white rounded-4xl shadow-float p-10 card-float animate-scaleIn">
        <div className="text-center mb-8">
          <h1 className="text-3xl font-bold bg-gradient-to-r from-pastel-lavender-600 to-pastel-pink-600 bg-clip-text text-transparent mb-2">
            How are you feeling?
          </h1>
          <p className="text-slate-500">Track your emotional well-being</p>
        </div>

        <form onSubmit={handleSubmit} className="space-y-8">
          {/* Mood Emoji Display */}
          <div className={`bg-gradient-to-br ${getGradientColors()} rounded-3xl p-12 transition-all duration-500 shadow-soft`}>
            <div className="text-center">
              <div className="text-9xl mb-6 transition-all duration-300 animate-float">
                {getMoodEmoji()}
              </div>
              <p className="text-3xl font-bold text-slate-800 mb-2">
                {getMoodLabel()}
              </p>
              <p className="text-6xl font-bold text-slate-800">
                {moodValue}<span className="text-3xl">/10</span>
              </p>
            </div>
          </div>

          {/* Mood Slider */}
          <div className="relative">
            <div className="bg-gradient-to-r from-pastel-rose-200 via-pastel-peach-200 to-pastel-mint-200 h-4 rounded-full shadow-inner-soft overflow-hidden">
              <div 
                className="bg-gradient-to-r from-pastel-pink-500 to-pastel-lavender-500 h-full rounded-full transition-all duration-300 shadow-soft"
                style={{ width: `${(moodValue / 10) * 100}%` }}
              />
            </div>
            <input
              type="range"
              min="1"
              max="10"
              value={moodValue}
              onChange={(e) => setMoodValue(parseInt(e.target.value))}
              className="absolute inset-0 w-full h-4 opacity-0 cursor-pointer"
            />

            <div className="flex justify-between mt-4 px-2">
              {[1, 2, 3, 4, 5, 6, 7, 8, 9, 10].map((num) => (
                <button
                  key={num}
                  type="button"
                  onClick={() => setMoodValue(num)}
                  className={`w-8 h-8 rounded-full font-semibold text-sm transition-all duration-300 ${
                    moodValue === num
                      ? 'bg-gradient-to-br from-pastel-lavender-500 to-pastel-pink-500 text-white shadow-soft scale-110'
                      : 'bg-white text-slate-700 hover:bg-pastel-lavender-100 hover:text-slate-800'
                  }`}
                >
                  {num}
                </button>
              ))}
            </div>
          </div>

          {/* Notes */}
          <div>
            <label className="block text-sm font-semibold text-slate-700 mb-3">
              💭 What's on your mind? <span className="text-slate-600 font-normal">(optional)</span>
            </label>
            <textarea
              value={notes}
              onChange={(e) => setNotes(e.target.value)}
              rows={5}
              className="w-full px-5 py-4 rounded-2xl border-2 border-pastel-lavender-200 bg-gradient-to-br from-white to-pastel-lavender-50 text-slate-800 placeholder-slate-400 focus:ring-4 focus:ring-pastel-lavender-200 focus:border-pastel-lavender-300 transition-all duration-300 resize-none shadow-inner-soft"
              placeholder="Share any thoughts, feelings, or what made your day special..."
            />
          </div>

          {/* Submit Button */}
          <button
            type="submit"
            disabled={submitting}
            className="w-full bg-gradient-to-r from-pastel-lavender-500 to-pastel-pink-500 hover:from-pastel-lavender-600 hover:to-pastel-pink-600 text-white font-bold py-5 px-6 rounded-2xl transition-all duration-300 disabled:opacity-50 disabled:cursor-not-allowed text-lg shadow-soft hover:shadow-float hover:-translate-y-1"
          >
            {submitting ? (
              <span className="flex items-center justify-center gap-2">
                <div className="w-5 h-5 border-3 border-white border-t-transparent rounded-full animate-spin"></div>
                Saving...
              </span>
            ) : (
              'Save Mood ✨'
            )}
          </button>

          {success && (
            <div className="bg-gradient-to-r from-pastel-mint-100 to-pastel-sky-100 rounded-2xl border-2 border-pastel-mint-300 text-slate-800 px-6 py-4 text-center font-semibold shadow-soft animate-slideUp">
              ✓ Mood saved successfully! Keep going 💚
            </div>
          )}
        </form>
      </div>
    </div>
  )
}
