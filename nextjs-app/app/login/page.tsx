'use client'

import { useState } from 'react'
import { useRouter } from 'next/navigation'
import Link from 'next/link'
import { supabase } from '@/lib/supabase/client'

export default function LoginPage() {
  const router = useRouter()
  const [email, setEmail] = useState('')
  const [password, setPassword] = useState('')
  const [loading, setLoading] = useState(false)
  const [error, setError] = useState<string | null>(null)

  const handleLogin = async (e: React.FormEvent) => {
    e.preventDefault()
    setLoading(true)
    setError(null)

    try {
      const { data, error } = await supabase.auth.signInWithPassword({
        email,
        password,
      })

      if (error) {
        if (error.message.includes('Email not confirmed')) {
          throw new Error('Please confirm your email address before logging in. Check your inbox for the confirmation link.')
        }
        throw error
      }

      if (data.user) {
        // Force a hard refresh to update server-side cookies
        window.location.href = '/dashboard'
      }
    } catch (err: any) {
      setError(err.message || 'Failed to login')
    } finally {
      setLoading(false)
    }
  }

  return (
    <div className="min-h-screen flex items-center justify-center bg-gradient-to-br from-pastel-lavender-100 via-pastel-pink-50 to-pastel-sky-100 p-4">
      <div className="max-w-md w-full bg-white rounded-4xl shadow-float p-10 card-float animate-scaleIn">
        <div className="text-center mb-8">
          <div className="inline-block p-4 bg-gradient-to-br from-pastel-lavender-400 to-pastel-pink-400 rounded-3xl shadow-soft mb-4 animate-float">
            <span className="text-4xl">💜</span>
          </div>
          <h1 className="text-4xl font-bold text-slate-800 mb-2">
            Welcome Back
          </h1>
          <p className="text-slate-600">
            Continue your wellness journey
          </p>
        </div>

        <form onSubmit={handleLogin} className="space-y-6">
          {error && (
            <div className="bg-pastel-rose-50 border-2 border-pastel-rose-300 text-pastel-rose-700 px-5 py-4 rounded-2xl shadow-soft">
              {error}
            </div>
          )}

          <div>
            <label className="block text-sm font-semibold text-slate-700 mb-3">
              📧 Email Address
            </label>
            <input
              type="email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              required
              className="w-full px-5 py-4 rounded-2xl border-2 border-pastel-lavender-200 bg-gradient-to-br from-white to-pastel-lavender-50 text-slate-800 placeholder-slate-400 focus:ring-4 focus:ring-pastel-lavender-200 focus:border-pastel-lavender-300 transition-all duration-300 shadow-inner-soft"
              placeholder="you@example.com"
            />
          </div>

          <div>
            <label className="block text-sm font-semibold text-slate-700 mb-3">
              🔒 Password
            </label>
            <input
              type="password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              required
              className="w-full px-5 py-4 rounded-2xl border-2 border-pastel-lavender-200 bg-gradient-to-br from-white to-pastel-lavender-50 text-slate-800 placeholder-slate-400 focus:ring-4 focus:ring-pastel-lavender-200 focus:border-pastel-lavender-300 transition-all duration-300 shadow-inner-soft"
              placeholder="••••••••"
            />
          </div>

          <button
            type="submit"
            disabled={loading}
            className="w-full bg-gradient-to-r from-pastel-lavender-500 to-pastel-pink-500 hover:from-pastel-lavender-600 hover:to-pastel-pink-600 text-white font-bold py-4 px-6 rounded-2xl shadow-soft hover:shadow-float transition-all duration-300 disabled:opacity-50 disabled:cursor-not-allowed hover:-translate-y-1"
          >
            {loading ? (
              <span className="flex items-center justify-center gap-2">
                <div className="w-5 h-5 border-3 border-white border-t-transparent rounded-full animate-spin"></div>
                Signing in...
              </span>
            ) : (
              'Sign In ✨'
            )}
          </button>
        </form>

        <div className="mt-8 text-center">
          <p className="text-slate-600">
            Don't have an account?{' '}
            <Link
              href="/signup"
              className="text-pastel-lavender-600 hover:text-pastel-lavender-700 font-bold"
            >
              Sign up
            </Link>
          </p>
        </div>
      </div>
    </div>
  )
}
