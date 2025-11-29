'use client'

import { useEffect, useState } from 'react'
import { LineChart, Line, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer } from 'recharts'
import { format } from 'date-fns'
import { FiTrendingUp, FiCalendar, FiHeart, FiStar } from 'react-icons/fi'
import { getDailyAffirmation } from '@/lib/affirmations'

interface MoodData {
  id: string
  mood_value: number
  notes: string | null
  created_at: string
}

export default function DashboardPage() {
  const [moods, setMoods] = useState<MoodData[]>([])
  const [streak, setStreak] = useState(0)
  const [loading, setLoading] = useState(true)
  const [checkedInToday, setCheckedInToday] = useState(false)

  useEffect(() => {
    fetchData()
  }, [])

  const fetchData = async () => {
    try {
      // Fetch moods
      const moodsRes = await fetch('/api/moods')
      const moodsData = await moodsRes.json()
      setMoods(moodsData.moods || [])

      // Fetch check-ins and streak
      const checkInsRes = await fetch('/api/check-ins')
      const checkInsData = await checkInsRes.json()
      setStreak(checkInsData.streak || 0)

      const today = new Date().toISOString().split('T')[0]
      const todayCheckIn = checkInsData.checkIns?.find(
        (ci: any) => ci.check_in_date === today
      )
      setCheckedInToday(!!todayCheckIn)
    } catch (error) {
      console.error('Error fetching dashboard data:', error)
    } finally {
      setLoading(false)
    }
  }

  const handleCheckIn = async () => {
    try {
      await fetch('/api/check-ins', { method: 'POST' })
      setCheckedInToday(true)
      setStreak(prev => prev + 1)
    } catch (error) {
      console.error('Error checking in:', error)
    }
  }

  const chartData = moods.map(mood => ({
    date: format(new Date(mood.created_at), 'MMM dd'),
    mood: mood.mood_value,
  }))

  const averageMood = moods.length > 0
    ? (moods.reduce((sum, m) => sum + m.mood_value, 0) / moods.length).toFixed(1)
    : '0'

  if (loading) {
    return (
      <div className="flex items-center justify-center h-64">
        <div className="w-12 h-12 rounded-full border-4 border-pastel-lavender-200 border-t-pastel-pink-400 animate-spin"></div>
      </div>
    )
  }

  return (
    <div className="max-w-7xl mx-auto space-y-8 p-6 animate-fadeIn">
      {/* Affirmation Card - Full Width */}
      <div className="gradient-lavender rounded-3xl p-8 shadow-soft-lg card-float">
        <div className="flex items-start gap-4">
          <div className="p-3 bg-white/50 rounded-2xl backdrop-blur-sm">
            <FiStar className="text-pastel-lavender-500 text-3xl" />
          </div>
          <div>
            <h1 className="text-2xl font-bold text-slate-800 mb-2">Your Daily Affirmation</h1>
            <p className="text-slate-700 text-lg leading-relaxed italic">"{getDailyAffirmation()}"</p>
          </div>
        </div>
      </div>

      {/* Masonry Grid - Stats Cards */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        
        {/* Streak Card */}
        <div className="gradient-peach rounded-3xl p-6 shadow-soft card-float animate-slideUp">
          <div className="flex items-center gap-4 mb-4">
            <div className="p-4 bg-white/60 rounded-2xl backdrop-blur-sm">
              <FiCalendar className="text-pastel-peach-500 text-3xl" />
            </div>
            <div>
              <p className="text-slate-600 text-sm font-medium">Current Streak</p>
              <p className="text-4xl font-bold text-slate-800">
                {streak}
              </p>
              <p className="text-slate-700 text-sm">days strong</p>
            </div>
          </div>
          {!checkedInToday && (
            <button
              onClick={handleCheckIn}
              className="w-full bg-gradient-to-r from-pastel-peach-400 to-pastel-rose-400 hover:from-pastel-peach-500 hover:to-pastel-rose-500 text-white font-semibold py-3 px-4 rounded-2xl transition-all duration-300 shadow-soft hover:shadow-float"
            >
              Check In Today ✨
            </button>
          )}
          {checkedInToday && (
            <div className="text-center py-3 bg-white/60 rounded-2xl backdrop-blur-sm">
              <span className="text-pastel-mint-600 font-semibold">✓ Checked in today!</span>
            </div>
          )}
        </div>

        {/* Average Mood Card */}
        <div className="gradient-sky rounded-3xl p-6 shadow-soft card-float animate-slideUp" style={{animationDelay: '0.1s'}}>
          <div className="flex items-center gap-4">
            <div className="p-4 bg-white/60 rounded-2xl backdrop-blur-sm">
              <FiTrendingUp className="text-pastel-sky-500 text-3xl" />
            </div>
            <div>
              <p className="text-slate-600 text-sm font-medium">30-Day Average</p>
              <p className="text-4xl font-bold text-slate-800">
                {averageMood}
              </p>
              <p className="text-slate-700 text-sm">out of 10</p>
            </div>
          </div>
        </div>

        {/* Total Entries Card */}
        <div className="gradient-pink rounded-3xl p-6 shadow-soft card-float animate-slideUp" style={{animationDelay: '0.2s'}}>
          <div className="flex items-center gap-4">
            <div className="p-4 bg-white/60 rounded-2xl backdrop-blur-sm">
              <FiHeart className="text-pastel-pink-500 text-3xl" />
            </div>
            <div>
              <p className="text-slate-600 text-sm font-medium">Mood Entries</p>
              <p className="text-4xl font-bold text-slate-800">
                {moods.length}
              </p>
              <p className="text-slate-700 text-sm">logged so far</p>
            </div>
          </div>
        </div>
      </div>

      {/* Mood Chart - Large Card */}
      <div className="bg-white rounded-3xl p-8 shadow-soft-lg card-float animate-scaleIn">
        <h2 className="text-2xl font-bold text-slate-800 mb-6 flex items-center gap-2">
          <span className="text-pastel-lavender-500">📊</span> Mood Trend
        </h2>
        {chartData.length > 0 ? (
          <ResponsiveContainer width="100%" height={320}>
            <LineChart data={chartData}>
              <CartesianGrid strokeDasharray="3 3" stroke="#f0f0f0" />
              <XAxis 
                dataKey="date" 
                stroke="#a0a0a0" 
                style={{ fontSize: '12px' }}
              />
              <YAxis 
                domain={[0, 10]} 
                stroke="#a0a0a0"
                style={{ fontSize: '12px' }}
              />
              <Tooltip 
                contentStyle={{ 
                  backgroundColor: '#ffffff', 
                  border: 'none', 
                  borderRadius: '16px',
                  boxShadow: '0 10px 40px -10px rgba(0, 0, 0, 0.1)',
                  padding: '12px 16px'
                }}
                labelStyle={{ color: '#64748b', fontWeight: 600 }}
              />
              <Line 
                type="monotone" 
                dataKey="mood" 
                stroke="url(#moodGradient)" 
                strokeWidth={4}
                dot={{ fill: '#a78bfa', r: 6, strokeWidth: 2, stroke: '#fff' }}
                activeDot={{ r: 8, fill: '#8b5cf6' }}
              />
              <defs>
                <linearGradient id="moodGradient" x1="0" y1="0" x2="1" y2="0">
                  <stop offset="0%" stopColor="#ffa3cc" />
                  <stop offset="50%" stopColor="#a78bfa" />
                  <stop offset="100%" stopColor="#5eead4" />
                </linearGradient>
              </defs>
            </LineChart>
          </ResponsiveContainer>
        ) : (
          <div className="text-center py-16">
            <div className="inline-block p-6 bg-gradient-to-br from-pastel-lavender-100 to-pastel-pink-100 rounded-full mb-4">
              <FiHeart className="text-pastel-lavender-400 text-4xl" />
            </div>
            <p className="text-slate-600 text-lg">Start tracking your mood to see beautiful trends</p>
          </div>
        )}
      </div>
    </div>
  )
}
