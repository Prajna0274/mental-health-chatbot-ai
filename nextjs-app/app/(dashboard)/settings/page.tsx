'use client'

import { useState } from 'react'
import { FiBell, FiMoon, FiGlobe, FiLock, FiTrash2 } from 'react-icons/fi'

export default function SettingsPage() {
  const [notifications, setNotifications] = useState(true)
  const [darkMode, setDarkMode] = useState(false)
  const [language, setLanguage] = useState('en')
  const [dailyReminder, setDailyReminder] = useState(true)
  const [reminderTime, setReminderTime] = useState('09:00')

  return (
    <div className="max-w-4xl mx-auto p-6">
      <div className="bg-white rounded-4xl shadow-float p-10 animate-scaleIn">
        <h1 className="text-3xl font-bold bg-gradient-to-r from-pastel-lavender-600 to-pastel-pink-600 bg-clip-text text-transparent mb-8">
          Settings
        </h1>

        <div className="space-y-6">
          {/* Notifications */}
          <div className="bg-gradient-to-br from-pastel-lavender-50 to-white p-6 rounded-2xl border-2 border-pastel-lavender-200">
            <div className="flex items-center justify-between">
              <div className="flex items-center gap-3">
                <div className="p-3 bg-gradient-to-br from-pastel-lavender-500 to-pastel-pink-500 rounded-xl text-white">
                  <FiBell className="text-xl" />
                </div>
                <div>
                  <h3 className="font-semibold text-slate-800">Push Notifications</h3>
                  <p className="text-sm text-slate-600">Receive mental health reminders</p>
                </div>
              </div>
              <button
                onClick={() => setNotifications(!notifications)}
                className={`relative w-14 h-8 rounded-full transition-all ${
                  notifications
                    ? 'bg-gradient-to-r from-pastel-lavender-500 to-pastel-pink-500'
                    : 'bg-slate-300'
                }`}
              >
                <div
                  className={`absolute top-1 left-1 w-6 h-6 bg-white rounded-full shadow-soft transition-transform ${
                    notifications ? 'translate-x-6' : 'translate-x-0'
                  }`}
                />
              </button>
            </div>
          </div>

          {/* Daily Reminder */}
          <div className="bg-gradient-to-br from-pastel-peach-50 to-white p-6 rounded-2xl border-2 border-pastel-peach-200">
            <div className="flex items-center justify-between mb-4">
              <div className="flex items-center gap-3">
                <div className="p-3 bg-gradient-to-br from-pastel-peach-500 to-pastel-rose-500 rounded-xl text-white">
                  <FiBell className="text-xl" />
                </div>
                <div>
                  <h3 className="font-semibold text-slate-800">Daily Check-in Reminder</h3>
                  <p className="text-sm text-slate-600">Get reminded to log your mood</p>
                </div>
              </div>
              <button
                onClick={() => setDailyReminder(!dailyReminder)}
                className={`relative w-14 h-8 rounded-full transition-all ${
                  dailyReminder
                    ? 'bg-gradient-to-r from-pastel-peach-500 to-pastel-rose-500'
                    : 'bg-slate-300'
                }`}
              >
                <div
                  className={`absolute top-1 left-1 w-6 h-6 bg-white rounded-full shadow-soft transition-transform ${
                    dailyReminder ? 'translate-x-6' : 'translate-x-0'
                  }`}
                />
              </button>
            </div>
            {dailyReminder && (
              <div className="ml-12">
                <label className="block text-sm font-medium text-slate-700 mb-2">
                  Reminder Time
                </label>
                <input
                  type="time"
                  value={reminderTime}
                  onChange={(e) => setReminderTime(e.target.value)}
                  className="px-4 py-2 rounded-xl border-2 border-pastel-peach-200 bg-white text-slate-800 focus:ring-4 focus:ring-pastel-peach-200 focus:border-pastel-peach-300"
                />
              </div>
            )}
          </div>

          {/* Dark Mode */}
          <div className="bg-gradient-to-br from-pastel-sky-50 to-white p-6 rounded-2xl border-2 border-pastel-sky-200">
            <div className="flex items-center justify-between">
              <div className="flex items-center gap-3">
                <div className="p-3 bg-gradient-to-br from-pastel-sky-500 to-pastel-mint-500 rounded-xl text-white">
                  <FiMoon className="text-xl" />
                </div>
                <div>
                  <h3 className="font-semibold text-slate-800">Dark Mode</h3>
                  <p className="text-sm text-slate-600">Coming soon!</p>
                </div>
              </div>
              <button
                onClick={() => setDarkMode(!darkMode)}
                className={`relative w-14 h-8 rounded-full transition-all bg-slate-300 opacity-50 cursor-not-allowed`}
              >
                <div className="absolute top-1 left-1 w-6 h-6 bg-white rounded-full shadow-soft" />
              </button>
            </div>
          </div>

          {/* Language */}
          <div className="bg-gradient-to-br from-pastel-mint-50 to-white p-6 rounded-2xl border-2 border-pastel-mint-200">
            <div className="flex items-center gap-3 mb-4">
              <div className="p-3 bg-gradient-to-br from-pastel-mint-500 to-pastel-sky-500 rounded-xl text-white">
                <FiGlobe className="text-xl" />
              </div>
              <div>
                <h3 className="font-semibold text-slate-800">Language</h3>
                <p className="text-sm text-slate-600">Choose your preferred language</p>
              </div>
            </div>
            <select
              value={language}
              onChange={(e) => setLanguage(e.target.value)}
              className="w-full px-4 py-3 rounded-xl border-2 border-pastel-mint-200 bg-white text-slate-800 focus:ring-4 focus:ring-pastel-mint-200 focus:border-pastel-mint-300"
            >
              <option value="en">English</option>
              <option value="es">Spanish</option>
              <option value="fr">French</option>
              <option value="de">German</option>
              <option value="hi">Hindi</option>
            </select>
          </div>

          {/* Privacy */}
          <div className="bg-gradient-to-br from-pastel-rose-50 to-white p-6 rounded-2xl border-2 border-pastel-rose-200">
            <div className="flex items-center gap-3">
              <div className="p-3 bg-gradient-to-br from-pastel-rose-500 to-pastel-pink-500 rounded-xl text-white">
                <FiLock className="text-xl" />
              </div>
              <div>
                <h3 className="font-semibold text-slate-800">Privacy & Security</h3>
                <p className="text-sm text-slate-600">Your data is encrypted and secure</p>
              </div>
            </div>
          </div>

          {/* Danger Zone */}
          <div className="bg-gradient-to-br from-red-50 to-white p-6 rounded-2xl border-2 border-red-200">
            <div className="flex items-center gap-3 mb-4">
              <div className="p-3 bg-gradient-to-br from-red-500 to-red-600 rounded-xl text-white">
                <FiTrash2 className="text-xl" />
              </div>
              <div>
                <h3 className="font-semibold text-slate-800">Danger Zone</h3>
                <p className="text-sm text-slate-600">Permanently delete your data</p>
              </div>
            </div>
            <button className="px-6 py-3 bg-white border-2 border-red-400 text-red-600 font-semibold rounded-xl hover:bg-red-50 transition-all">
              Clear All Data
            </button>
          </div>
        </div>
      </div>
    </div>
  )
}
