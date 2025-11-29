'use client'

import { useState } from 'react'
import { supabase } from '@/lib/supabase/client'

export default function AdminSetupPage() {
  const [email, setEmail] = useState('2004prajna@gmail.com')
  const [password, setPassword] = useState('Password123!')
  const [message, setMessage] = useState('')
  const [loading, setLoading] = useState(false)

  const createAccount = async () => {
    setLoading(true)
    setMessage('Attempting to create account...')

    try {
      // Generate a unique email to avoid conflicts
      const uniqueEmail = email.includes('+') ? email : email.replace('@', `+${Date.now()}@`)
      
      setMessage(`Creating account with: ${uniqueEmail}`)
      
      // Sign up with unique email
      const { data: signupData, error: signupError } = await supabase.auth.signUp({
        email: uniqueEmail,
        password,
        options: {
          data: {
            full_name: 'Prajna',
          },
          emailRedirectTo: `${window.location.origin}/dashboard`,
        },
      })

      if (signupError) {
        throw signupError
      }

      if (signupData.session) {
        setMessage(`✅ SUCCESS! Account created with ${uniqueEmail} | Password: ${password} | Redirecting to dashboard...`)
        setTimeout(() => {
          window.location.href = '/dashboard'
        }, 2000)
      } else if (signupData.user && !signupData.session) {
        setMessage(`⚠️ Account created but needs email confirmation. Please go to Supabase Dashboard → Authentication → Providers → Email and TURN OFF "Confirm email". Then delete this user and try again.`)
      }
    } catch (err: any) {
      setMessage('❌ Error: ' + err.message + ' | Try: 1) Go to Supabase Dashboard 2) Authentication → Providers → Email 3) Turn OFF "Confirm email" 4) Save 5) Click button again')
    } finally {
      setLoading(false)
    }
  }

  const deleteAllUsers = async () => {
    setMessage('⚠️ Cannot delete users from client side. Please delete from Supabase Dashboard → Authentication → Users')
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-pastel-lavender-100 via-pastel-pink-50 to-pastel-mint-100 p-8">
      <div className="max-w-2xl mx-auto bg-white rounded-4xl shadow-float p-10">
        <h1 className="text-4xl font-bold text-slate-800 mb-8 text-center">
          🔧 Admin Setup Page
        </h1>

        <div className="space-y-6">
          <div>
            <label className="block text-sm font-semibold text-slate-700 mb-2">
              Email
            </label>
            <input
              type="email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              className="w-full px-4 py-3 rounded-2xl border-2 border-pastel-lavender-200 focus:border-pastel-lavender-400 focus:ring-4 focus:ring-pastel-lavender-100 transition-all"
            />
          </div>

          <div>
            <label className="block text-sm font-semibold text-slate-700 mb-2">
              Password
            </label>
            <input
              type="text"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              className="w-full px-4 py-3 rounded-2xl border-2 border-pastel-lavender-200 focus:border-pastel-lavender-400 focus:ring-4 focus:ring-pastel-lavender-100 transition-all"
            />
            <p className="text-sm text-slate-600 mt-1">Default: Password123!</p>
          </div>

          <button
            onClick={createAccount}
            disabled={loading}
            className="w-full bg-gradient-to-r from-pastel-lavender-500 to-pastel-pink-500 hover:from-pastel-lavender-600 hover:to-pastel-pink-600 text-white font-bold py-4 px-6 rounded-2xl shadow-soft hover:shadow-float transition-all duration-300 disabled:opacity-50"
          >
            {loading ? 'Processing...' : 'Create Account & Login'}
          </button>

          {message && (
            <div className={`p-4 rounded-2xl text-center font-semibold ${
              message.includes('✅') 
                ? 'bg-pastel-mint-100 text-pastel-mint-700 border-2 border-pastel-mint-300'
                : message.includes('⚠️')
                ? 'bg-pastel-peach-100 text-pastel-peach-700 border-2 border-pastel-peach-300'
                : 'bg-pastel-rose-100 text-pastel-rose-700 border-2 border-pastel-rose-300'
            }`}>
              {message}
            </div>
          )}

          <div className="pt-6 border-t-2 border-slate-200">
            <h2 className="text-lg font-bold text-slate-700 mb-4">Instructions:</h2>
            <ol className="list-decimal list-inside space-y-2 text-slate-600">
              <li>Make sure email confirmation is disabled in Supabase (Authentication → Providers → Email)</li>
              <li>Click "Create Account & Login" button above</li>
              <li>If successful, you'll be redirected to the dashboard</li>
              <li>If you get "email already exists", it will try to log you in</li>
            </ol>
          </div>

          <div className="text-center pt-4">
            <a 
              href="/login"
              className="text-pastel-lavender-600 hover:text-pastel-lavender-700 font-semibold"
            >
              ← Go to Login Page
            </a>
          </div>
        </div>
      </div>
    </div>
  )
}
