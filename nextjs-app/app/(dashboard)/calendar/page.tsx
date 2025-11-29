'use client'

import { useState, useEffect } from 'react'
import { FiCalendar, FiStar, FiHeart, FiGift } from 'react-icons/fi'

interface SpecialDay {
  date: string
  title: string
  type: 'birthday' | 'anniversary' | 'goal' | 'other'
  color: string
}

export default function CalendarPage() {
  const [currentDate, setCurrentDate] = useState(new Date())
  const [specialDays, setSpecialDays] = useState<SpecialDay[]>([])
  const [showAddForm, setShowAddForm] = useState(false)
  const [newDay, setNewDay] = useState({ date: '', title: '', type: 'other' as const })

  useEffect(() => {
    const saved = localStorage.getItem('specialDays')
    if (saved) setSpecialDays(JSON.parse(saved))
  }, [])

  const saveSpecialDay = () => {
    const colors = {
      birthday: 'bg-pastel-pink-300',
      anniversary: 'bg-pastel-lavender-300',
      goal: 'bg-pastel-mint-300',
      other: 'bg-pastel-peach-300'
    }
    
    const day: SpecialDay = {
      ...newDay,
      color: colors[newDay.type]
    }
    
    const updated = [...specialDays, day]
    setSpecialDays(updated)
    localStorage.setItem('specialDays', JSON.stringify(updated))
    setShowAddForm(false)
    setNewDay({ date: '', title: '', type: 'other' })
  }

  const getDaysInMonth = () => {
    const year = currentDate.getFullYear()
    const month = currentDate.getMonth()
    const firstDay = new Date(year, month, 1).getDay()
    const daysInMonth = new Date(year, month + 1, 0).getDate()
    
    const days = []
    for (let i = 0; i < firstDay; i++) {
      days.push(null)
    }
    for (let i = 1; i <= daysInMonth; i++) {
      days.push(i)
    }
    return days
  }

  const hasSpecialDay = (day: number) => {
    const dateStr = `${currentDate.getFullYear()}-${String(currentDate.getMonth() + 1).padStart(2, '0')}-${String(day).padStart(2, '0')}`
    return specialDays.find(sd => sd.date === dateStr)
  }

  const monthNames = ['January', 'February', 'March', 'April', 'May', 'June', 'July', 'August', 'September', 'October', 'November', 'December']

  return (
    <div className="max-w-5xl mx-auto p-6">
      <div className="bg-white rounded-4xl shadow-float p-10 animate-scaleIn">
        <div className="flex items-center justify-between mb-8">
          <h1 className="text-3xl font-bold bg-gradient-to-r from-pastel-lavender-600 to-pastel-pink-600 bg-clip-text text-transparent">
            <FiCalendar className="inline mr-3 text-pastel-lavender-600" />
            Special Days Calendar
          </h1>
          <button
            onClick={() => setShowAddForm(true)}
            className="px-6 py-3 bg-gradient-to-r from-pastel-lavender-500 to-pastel-pink-500 text-white font-semibold rounded-2xl shadow-soft hover:shadow-float hover:-translate-y-1 transition-all"
          >
            + Add Special Day
          </button>
        </div>

        {/* Month Navigator */}
        <div className="flex items-center justify-between mb-6 bg-gradient-to-r from-pastel-lavender-100 to-pastel-pink-100 p-4 rounded-2xl">
          <button
            onClick={() => setCurrentDate(new Date(currentDate.getFullYear(), currentDate.getMonth() - 1))}
            className="px-4 py-2 bg-white text-slate-700 font-semibold rounded-xl shadow-soft hover:shadow-float transition-all"
          >
            ←
          </button>
          <h2 className="text-2xl font-bold text-slate-800">
            {monthNames[currentDate.getMonth()]} {currentDate.getFullYear()}
          </h2>
          <button
            onClick={() => setCurrentDate(new Date(currentDate.getFullYear(), currentDate.getMonth() + 1))}
            className="px-4 py-2 bg-white text-slate-700 font-semibold rounded-xl shadow-soft hover:shadow-float transition-all"
          >
            →
          </button>
        </div>

        {/* Calendar Grid */}
        <div className="grid grid-cols-7 gap-2 mb-8">
          {['Sun', 'Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat'].map(day => (
            <div key={day} className="text-center font-bold text-slate-700 p-3">
              {day}
            </div>
          ))}
          {getDaysInMonth().map((day, index) => {
            const special = day ? hasSpecialDay(day) : null
            return (
              <div
                key={index}
                className={`relative aspect-square p-2 rounded-2xl border-2 transition-all ${
                  day
                    ? special
                      ? `${special.color} border-slate-300 shadow-soft`
                      : 'bg-white border-pastel-lavender-200 hover:border-pastel-lavender-400'
                    : 'bg-transparent border-transparent'
                }`}
              >
                {day && (
                  <>
                    <span className="text-lg font-semibold text-slate-800">{day}</span>
                    {special && (
                      <div className="absolute bottom-1 left-1 right-1">
                        <div className="text-xs font-medium text-slate-700 truncate bg-white/80 rounded px-1">
                          {special.title}
                        </div>
                      </div>
                    )}
                  </>
                )}
              </div>
            )
          })}
        </div>

        {/* Legend */}
        <div className="flex flex-wrap gap-4 justify-center">
          <div className="flex items-center gap-2">
            <div className="w-6 h-6 rounded-lg bg-pastel-pink-300"></div>
            <span className="text-sm text-slate-700">Birthday</span>
          </div>
          <div className="flex items-center gap-2">
            <div className="w-6 h-6 rounded-lg bg-pastel-lavender-300"></div>
            <span className="text-sm text-slate-700">Anniversary</span>
          </div>
          <div className="flex items-center gap-2">
            <div className="w-6 h-6 rounded-lg bg-pastel-mint-300"></div>
            <span className="text-sm text-slate-700">Goal</span>
          </div>
          <div className="flex items-center gap-2">
            <div className="w-6 h-6 rounded-lg bg-pastel-peach-300"></div>
            <span className="text-sm text-slate-700">Other</span>
          </div>
        </div>
      </div>

      {/* Add Special Day Modal */}
      {showAddForm && (
        <div className="fixed inset-0 bg-black/50 flex items-center justify-center z-50 p-4">
          <div className="bg-white rounded-4xl p-8 max-w-md w-full shadow-float animate-scaleIn">
            <h3 className="text-2xl font-bold text-slate-800 mb-6">Add Special Day</h3>
            <div className="space-y-4">
              <div>
                <label className="block text-sm font-semibold text-slate-700 mb-2">Date</label>
                <input
                  type="date"
                  value={newDay.date}
                  onChange={(e) => setNewDay({ ...newDay, date: e.target.value })}
                  className="w-full px-4 py-3 rounded-xl border-2 border-pastel-lavender-200 focus:border-pastel-lavender-400 focus:ring-4 focus:ring-pastel-lavender-200"
                />
              </div>
              <div>
                <label className="block text-sm font-semibold text-slate-700 mb-2">Title</label>
                <input
                  type="text"
                  value={newDay.title}
                  onChange={(e) => setNewDay({ ...newDay, title: e.target.value })}
                  placeholder="e.g., Mom's Birthday"
                  className="w-full px-4 py-3 rounded-xl border-2 border-pastel-lavender-200 focus:border-pastel-lavender-400 focus:ring-4 focus:ring-pastel-lavender-200"
                />
              </div>
              <div>
                <label className="block text-sm font-semibold text-slate-700 mb-2">Type</label>
                <select
                  value={newDay.type}
                  onChange={(e) => setNewDay({ ...newDay, type: e.target.value as any })}
                  className="w-full px-4 py-3 rounded-xl border-2 border-pastel-lavender-200 focus:border-pastel-lavender-400 focus:ring-4 focus:ring-pastel-lavender-200"
                >
                  <option value="birthday">Birthday</option>
                  <option value="anniversary">Anniversary</option>
                  <option value="goal">Goal</option>
                  <option value="other">Other</option>
                </select>
              </div>
              <div className="flex gap-3 mt-6">
                <button
                  onClick={() => setShowAddForm(false)}
                  className="flex-1 px-4 py-3 bg-slate-200 text-slate-700 font-semibold rounded-xl hover:bg-slate-300 transition-all"
                >
                  Cancel
                </button>
                <button
                  onClick={saveSpecialDay}
                  className="flex-1 px-4 py-3 bg-gradient-to-r from-pastel-lavender-500 to-pastel-pink-500 text-white font-semibold rounded-xl shadow-soft hover:shadow-float transition-all"
                >
                  Save
                </button>
              </div>
            </div>
          </div>
        </div>
      )}
    </div>
  )
}
