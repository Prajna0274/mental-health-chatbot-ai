'use client'

import Link from 'next/link'
import { usePathname, useRouter } from 'next/navigation'
import { useState } from 'react'
import { 
  FiHome, 
  FiSmile, 
  FiBook, 
  FiMessageCircle, 
  FiWind,
  FiHeart,
  FiLogOut,
  FiMenu,
  FiX
} from 'react-icons/fi'
import { supabase } from '@/lib/supabase/client'

const navigation = [
  { name: 'Dashboard', href: '/dashboard', icon: FiHome },
  { name: 'Mood Tracker', href: '/mood', icon: FiSmile },
  { name: 'Journal', href: '/journal', icon: FiBook },
  { name: 'AI Chat', href: '/chat', icon: FiMessageCircle },
  { name: 'Breathing', href: '/breathing', icon: FiWind },
  { name: 'Meditation', href: '/meditation', icon: FiHeart },
]

export default function Sidebar() {
  const pathname = usePathname()
  const router = useRouter()
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false)

  const handleLogout = async () => {
    try {
      await supabase.auth.signOut()
    } catch (error) {
      console.log('Logout error (ignored):', error)
    }
    router.push('/login')
  }

  return (
    <>
      {/* Mobile menu button */}
      <button
        onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
        className="lg:hidden fixed top-4 left-4 z-50 p-2 rounded-lg bg-white dark:bg-slate-800 shadow-lg"
      >
        {mobileMenuOpen ? <FiX size={24} /> : <FiMenu size={24} />}
      </button>

      {/* Sidebar */}
      <aside
        className={`fixed inset-y-0 left-0 z-40 w-72 bg-gradient-to-br from-white via-pastel-lavender-50 to-pastel-pink-50 backdrop-blur-xl shadow-float transform transition-transform duration-300 lg:translate-x-0 ${
          mobileMenuOpen ? 'translate-x-0' : '-translate-x-full'
        }`}
      >
        <div className="flex flex-col h-full p-6">
          {/* Logo */}
          <div className="mb-8">
            <div className="inline-block p-3 bg-gradient-to-br from-pastel-lavender-400 to-pastel-pink-400 rounded-3xl shadow-soft mb-3">
              <FiHeart className="text-white text-2xl" />
            </div>
            <h1 className="text-2xl font-bold text-slate-800">
              MindCare AI
            </h1>
            <p className="text-slate-600 text-sm mt-1 font-medium">Your wellness companion</p>
          </div>

          {/* Navigation */}
          <nav className="flex-1 space-y-3 overflow-y-auto">
            {navigation.map((item, index) => {
              const isActive = pathname === item.href
              return (
                <Link
                  key={item.name}
                  href={item.href}
                  onClick={() => setMobileMenuOpen(false)}
                  className={`flex items-center gap-4 px-5 py-4 rounded-2xl transition-all duration-300 group ${
                    isActive
                      ? 'bg-gradient-to-r from-pastel-lavender-400 to-pastel-pink-400 shadow-soft'
                      : 'text-slate-700 hover:bg-white/70 hover:shadow-soft backdrop-blur-sm'
                  }`}
                  style={{animationDelay: `${index * 0.05}s`}}
                >
                  <div className={`p-2 rounded-xl transition-all ${
                    isActive 
                      ? 'bg-white/20' 
                      : 'bg-pastel-lavender-100 group-hover:bg-pastel-lavender-200'
                  }`}>
                    <item.icon size={20} className={isActive ? 'text-white' : 'text-slate-700'} />
                  </div>
                  <span className={`font-semibold ${isActive ? 'text-white' : 'text-slate-700'}`}>{item.name}</span>
                </Link>
              )
            })}
          </nav>

          {/* Logout button */}
          <div className="pt-6 mt-6 border-t border-pastel-lavender-200">
            <button
              onClick={handleLogout}
              className="flex items-center gap-4 w-full px-5 py-4 text-slate-700 hover:bg-pastel-rose-50 hover:text-pastel-rose-700 rounded-2xl transition-all duration-300 group"
            >
              <div className="p-2 rounded-xl bg-pastel-rose-100 group-hover:bg-pastel-rose-200 transition-all">
                <FiLogOut size={20} className="text-slate-700 group-hover:text-pastel-rose-700" />
              </div>
              <span className="font-semibold">Logout</span>
            </button>
          </div>
        </div>
      </aside>

      {/* Overlay for mobile */}
      {mobileMenuOpen && (
        <div
          className="lg:hidden fixed inset-0 bg-black/50 z-30"
          onClick={() => setMobileMenuOpen(false)}
        />
      )}
    </>
  )
}
