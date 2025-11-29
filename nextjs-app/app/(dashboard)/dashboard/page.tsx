'use client'

import { useEffect, useState } from 'react'
import Link from 'next/link'
import { FiStar, FiCalendar, FiCheckSquare, FiHeart, FiMessageCircle, FiBook, FiWind } from 'react-icons/fi'

const thoughtsOfDay = [
  "You are stronger than you think. Every challenge is an opportunity to grow.",
  "Take a deep breath. You're exactly where you need to be.",
  "Progress, not perfection. Every small step counts.",
  "Be kind to yourself. You deserve the same compassion you give others.",
  "Your mental health is a priority, not a luxury.",
  "It's okay to not be okay. Healing isn't linear.",
  "You are worthy of peace, love, and happiness.",
  "One day at a time. You're doing better than you think.",
  "Your journey is unique. Don't compare it to anyone else's.",
  "Rest is not weakness. It's essential for growth."
]

export default function DashboardPage() {
  const [userName, setUserName] = useState('')
  const [todayThought, setTodayThought] = useState('')

  useEffect(() => {
    const saved = localStorage.getItem('userName')
    if (saved) {
      setUserName(saved)
    }
    
    // Get thought of the day based on date
    const dayOfYear = Math.floor((new Date().getTime() - new Date(new Date().getFullYear(), 0, 0).getTime()) / 86400000)
    setTodayThought(thoughtsOfDay[dayOfYear % thoughtsOfDay.length])
  }, [])

  return (
    <div className="min-h-screen bg-gradient-to-br from-pastel-peach-100 via-pastel-lavender-50 to-pastel-pink-100 p-6">
      <div className="max-w-6xl mx-auto space-y-8">
        
        {/* Welcome Hero */}
        <div className="relative bg-gradient-to-br from-pastel-peach-300 to-pastel-rose-300 rounded-4xl p-12 shadow-float overflow-hidden">
          <div className="relative z-10">
            <div className="flex items-center justify-between mb-8">
              <div>
                <h1 className="text-4xl font-bold text-slate-800 mb-2">Hi, {userName}</h1>
                <p className="text-lg text-slate-700 font-medium">What would you like to do today?</p>
              </div>
              <div className="hidden md:block">
                <div className="w-32 h-32 bg-white/30 rounded-full flex items-center justify-center backdrop-blur-sm">
                  <FiHeart className="text-6xl text-white" />
                </div>
              </div>
            </div>
            
            {/* Thought of the Day */}
            <div className="bg-white/90 backdrop-blur-md rounded-3xl p-6 shadow-soft">
              <div className="flex items-start gap-3">
                <FiStar className="text-2xl text-yellow-500 flex-shrink-0 mt-1" />
                <div>
                  <h3 className="font-bold text-slate-800 mb-2 text-lg">Thought of the Day</h3>
                  <p className="text-slate-700 leading-relaxed italic">"{todayThought}"</p>
                </div>
              </div>
            </div>
          </div>
          
          {/* Decorative Elements */}
          <div className="absolute -bottom-10 -right-10 w-40 h-40 bg-white/20 rounded-full blur-3xl"></div>
          <div className="absolute top-10 right-20 w-20 h-20 bg-white/20 rounded-full blur-2xl"></div>
        </div>

        {/* Quick Actions Grid */}
        <div>
          <div className="flex items-center gap-3 mb-4">
            <div className="w-1 h-6 bg-gradient-to-b from-pastel-lavender-500 to-pastel-pink-500 rounded-full"></div>
            <h2 className="text-2xl font-bold text-slate-800">Quick Actions</h2>
          </div>
          
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
            
            {/* Mood Card */}
            <Link href="/mood">
              <div className="group bg-gradient-to-br from-blue-100 to-blue-200 rounded-3xl p-8 shadow-soft hover:shadow-float transition-all duration-300 hover:-translate-y-2 cursor-pointer">
                <div className="w-16 h-16 bg-white/40 rounded-2xl flex items-center justify-center mb-4 group-hover:scale-110 transition-transform">
                  <FiHeart className="text-3xl text-blue-600" />
                </div>
                <h3 className="font-bold text-slate-800 text-lg mb-2">Track Mood</h3>
                <p className="text-slate-700 text-sm">Log how you're feeling today</p>
              </div>
            </Link>

            {/* Journal Card */}
            <Link href="/journal">
              <div className="group bg-gradient-to-br from-pink-100 to-pink-200 rounded-3xl p-8 shadow-soft hover:shadow-float transition-all duration-300 hover:-translate-y-2 cursor-pointer">
                <div className="w-16 h-16 bg-white/40 rounded-2xl flex items-center justify-center mb-4 group-hover:scale-110 transition-transform">
                  <FiBook className="text-3xl text-pink-600" />
                </div>
                <h3 className="font-bold text-slate-800 text-lg mb-2">Journal</h3>
                <p className="text-slate-700 text-sm">Write your thoughts</p>
              </div>
            </Link>

            {/* AI Chat Card */}
            <Link href="/chat">
              <div className="group bg-gradient-to-br from-purple-100 to-purple-200 rounded-3xl p-8 shadow-soft hover:shadow-float transition-all duration-300 hover:-translate-y-2 cursor-pointer">
                <div className="w-16 h-16 bg-white/40 rounded-2xl flex items-center justify-center mb-4 group-hover:scale-110 transition-transform">
                  <FiMessageCircle className="text-3xl text-purple-600" />
                </div>
                <h3 className="font-bold text-slate-800 text-lg mb-2">AI Support</h3>
                <p className="text-slate-700 text-sm">Chat with your AI companion</p>
              </div>
            </Link>

            {/* Breathing Card */}
            <Link href="/breathing">
              <div className="group bg-gradient-to-br from-green-100 to-green-200 rounded-3xl p-8 shadow-soft hover:shadow-float transition-all duration-300 hover:-translate-y-2 cursor-pointer">
                <div className="w-16 h-16 bg-white/40 rounded-2xl flex items-center justify-center mb-4 group-hover:scale-110 transition-transform">
                  <FiWind className="text-3xl text-green-600" />
                </div>
                <h3 className="font-bold text-slate-800 text-lg mb-2">Breathe</h3>
                <p className="text-slate-700 text-sm">Guided breathing exercises</p>
              </div>
            </Link>

          </div>
        </div>

        {/* Wellness Tools */}
        <div>
          <div className="flex items-center gap-3 mb-4">
            <div className="w-1 h-6 bg-gradient-to-b from-pastel-mint-500 to-pastel-sky-500 rounded-full"></div>
            <h2 className="text-2xl font-bold text-slate-800">Planning & Organization</h2>
          </div>
          
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            
            <Link href="/todo">
              <div className="group bg-white rounded-3xl p-6 shadow-soft hover:shadow-float transition-all duration-300 hover:-translate-y-2 cursor-pointer border-2 border-pastel-lavender-200">
                <div className="flex items-center gap-4 mb-3">
                  <div className="p-3 bg-gradient-to-br from-pastel-lavender-400 to-pastel-pink-400 rounded-xl">
                    <FiCheckSquare className="text-2xl text-white" />
                  </div>
                  <h3 className="font-bold text-slate-800 text-lg">To-Do List</h3>
                </div>
                <p className="text-slate-600 text-sm">Plan your day with tasks and priorities</p>
              </div>
            </Link>

            <Link href="/calendar">
              <div className="group bg-white rounded-3xl p-6 shadow-soft hover:shadow-float transition-all duration-300 hover:-translate-y-2 cursor-pointer border-2 border-pastel-peach-200">
                <div className="flex items-center gap-4 mb-3">
                  <div className="p-3 bg-gradient-to-br from-pastel-peach-400 to-pastel-rose-400 rounded-xl">
                    <FiCalendar className="text-2xl text-white" />
                  </div>
                  <h3 className="font-bold text-slate-800 text-lg">Calendar</h3>
                </div>
                <p className="text-slate-600 text-sm">Mark special days and events</p>
              </div>
            </Link>

            <Link href="/profile">
              <div className="group bg-white rounded-3xl p-6 shadow-soft hover:shadow-float transition-all duration-300 hover:-translate-y-2 cursor-pointer border-2 border-pastel-mint-200">
                <div className="flex items-center gap-4 mb-3">
                  <div className="p-3 bg-gradient-to-br from-pastel-mint-400 to-pastel-sky-400 rounded-xl">
                    <FiHeart className="text-2xl text-white" />
                  </div>
                  <h3 className="font-bold text-slate-800 text-lg">Your Profile</h3>
                </div>
                <p className="text-slate-600 text-sm">Manage your personal information</p>
              </div>
            </Link>

          </div>
        </div>

        {/* Motivational Quote */}
        <div className="text-center py-8">
          <p className="text-slate-600 text-lg italic">"Take care of your mind. It's the only place you have to live."</p>
        </div>

      </div>
    </div>
  )
}
