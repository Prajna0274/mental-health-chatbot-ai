'use client'

import { useState } from 'react'
import { useRouter } from 'next/navigation'
import Link from 'next/link'
import { supabase } from '@/lib/supabase/client'

export default function SignupPage() {
  const router = useRouter()
  const [fullName, setFullName] = useState('')
  const [email, setEmail] = useState('')
  const [password, setPassword] = useState('')
  const [loading, setLoading] = useState(false)
  const [error, setError] = useState<string | null>(null)

  const handleSignup = async (e: React.FormEvent) => {
    e.preventDefault()
    setLoading(true)
    setError(null)

    try {
      const { data, error } = await supabase.auth.signUp({
        email,
        password,
        options: {
          data: {
            full_name: fullName,
          },
          emailRedirectTo: `${window.location.origin}/dashboard`,
        },
      })

      if (error) throw error

      // Check if email confirmation is disabled (session exists immediately)
      if (data.session) {
        // User is logged in immediately - force a hard refresh to update cookies
        window.location.href = '/dashboard'
      } else if (data.user && !data.session) {
        // Email confirmation required
        setError('Please check your email to confirm your account before logging in.')
      }
    } catch (err: any) {
      setError(err.message || 'Failed to create account')
    } finally {
      setLoading(false)
    }
  }

  return (
    <div className="min-h-screen flex items-center justify-center bg-gradient-to-br from-pastel-mint-100 via-pastel-sky-50 to-pastel-lavender-100 p-4">
      <div className="max-w-md w-full bg-white rounded-4xl shadow-float p-10 card-float animate-scaleIn">
        <div className="text-center mb-8">
          <div className="inline-block p-4 bg-gradient-to-br from-pastel-mint-400 to-pastel-sky-400 rounded-3xl shadow-soft mb-4 animate-float">
            <span className="text-4xl">✨</span>
          </div>
          <h1 className="text-4xl font-bold text-slate-800 mb-2">
            Start Your Journey
          </h1>
          <p className="text-slate-600">
            Create your wellness account
          </p>
        </div>

        <form onSubmit={handleSignup} className="space-y-6">
          {error && (
            <div className="bg-pastel-rose-50 border-2 border-pastel-rose-300 text-pastel-rose-700 px-5 py-4 rounded-2xl shadow-soft">
              {error}
            </div>
          )}

          <div>
            <label className="block text-sm font-semibold text-slate-700 mb-3">
              👤 Full Name
            </label>
            <input
              type="text"
              value={fullName}
              onChange={(e) => setFullName(e.target.value)}
              required
              className="w-full px-5 py-4 rounded-2xl border-2 border-pastel-mint-200 bg-gradient-to-br from-white to-pastel-mint-50 text-slate-800 placeholder-slate-400 focus:ring-4 focus:ring-pastel-mint-200 focus:border-pastel-mint-300 transition-all duration-300 shadow-inner-soft"
              placeholder="John Doe"
            />
          </div>

          <div>
            <label className="block text-sm font-semibold text-slate-700 mb-3">
              📧 Email Address
            </label>
            <input
              type="email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              required
              className="w-full px-5 py-4 rounded-2xl border-2 border-pastel-mint-200 bg-gradient-to-br from-white to-pastel-mint-50 text-slate-800 placeholder-slate-400 focus:ring-4 focus:ring-pastel-mint-200 focus:border-pastel-mint-300 transition-all duration-300 shadow-inner-soft"
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
              minLength={6}
              className="w-full px-5 py-4 rounded-2xl border-2 border-pastel-mint-200 bg-gradient-to-br from-white to-pastel-mint-50 text-slate-800 placeholder-slate-400 focus:ring-4 focus:ring-pastel-mint-200 focus:border-pastel-mint-300 transition-all duration-300 shadow-inner-soft"
              placeholder="••••••••"
            />
            <p className="text-sm text-slate-600 mt-2">
              Minimum 6 characters
            </p>
          </div>

          <button
            type="submit"
            disabled={loading}
            className="w-full bg-gradient-to-r from-pastel-mint-500 to-pastel-sky-500 hover:from-pastel-mint-600 hover:to-pastel-sky-600 text-white font-bold py-4 px-6 rounded-2xl shadow-soft hover:shadow-float transition-all duration-300 disabled:opacity-50 disabled:cursor-not-allowed hover:-translate-y-1"
          >
            {loading ? (
              <span className="flex items-center justify-center gap-2">
                <div className="w-5 h-5 border-3 border-white border-t-transparent rounded-full animate-spin"></div>
                Creating account...
              </span>
            ) : (
              'Create Account 🚀'
            )}
          </button>
        </form>

        <div className="mt-8 text-center">
          <p className="text-slate-600">
            Already have an account?{' '}
            <Link
              href="/login"
              className="text-pastel-mint-600 hover:text-pastel-mint-700 font-bold"
            >
              Sign in
            </Link>
          </p>
        </div>
      </div>
    </div>
  )
}
