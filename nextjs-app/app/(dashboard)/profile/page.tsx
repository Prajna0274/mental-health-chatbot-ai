'use client'

import { useState } from 'react'
import { FiCamera, FiUser, FiMail, FiPhone, FiCalendar } from 'react-icons/fi'

export default function ProfilePage() {
  const [profileImage, setProfileImage] = useState<string | null>(null)
  const [name, setName] = useState('Susan')
  const [email, setEmail] = useState('')
  const [phone, setPhone] = useState('')
  const [birthdate, setBirthdate] = useState('')
  const [bio, setBio] = useState('')
  const [saving, setSaving] = useState(false)

  const handleImageUpload = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0]
    if (file) {
      const reader = new FileReader()
      reader.onloadend = () => {
        setProfileImage(reader.result as string)
        localStorage.setItem('profileImage', reader.result as string)
      }
      reader.readAsDataURL(file)
    }
  }

  const handleSave = () => {
    setSaving(true)
    // Save to localStorage
    localStorage.setItem('userName', name)
    localStorage.setItem('userEmail', email)
    localStorage.setItem('userPhone', phone)
    localStorage.setItem('userBirthdate', birthdate)
    localStorage.setItem('userBio', bio)
    
    setTimeout(() => {
      setSaving(false)
      alert('Profile saved successfully!')
    }, 1000)
  }

  return (
    <div className="max-w-4xl mx-auto p-6">
      <div className="bg-white rounded-4xl shadow-float p-10 animate-scaleIn">
        <h1 className="text-3xl font-bold bg-gradient-to-r from-pastel-lavender-600 to-pastel-pink-600 bg-clip-text text-transparent mb-8">
          Your Profile
        </h1>

        {/* Profile Photo Upload */}
        <div className="flex justify-center mb-8">
          <div className="relative">
            <div className="w-32 h-32 rounded-full bg-gradient-to-br from-pastel-lavender-300 to-pastel-pink-300 flex items-center justify-center overflow-hidden shadow-soft">
              {profileImage ? (
                <img src={profileImage} alt="Profile" className="w-full h-full object-cover" />
              ) : (
                <FiUser className="text-6xl text-white" />
              )}
            </div>
            <label className="absolute bottom-0 right-0 bg-gradient-to-r from-pastel-lavender-500 to-pastel-pink-500 text-white p-3 rounded-full cursor-pointer shadow-float hover:shadow-soft transition-all hover:-translate-y-1">
              <FiCamera className="text-lg" />
              <input
                type="file"
                accept="image/*"
                onChange={handleImageUpload}
                className="hidden"
              />
            </label>
          </div>
        </div>

        {/* Profile Form */}
        <div className="space-y-6">
          <div>
            <label className="block text-sm font-semibold text-slate-700 mb-2">
              <FiUser className="inline mr-2" />
              Name
            </label>
            <input
              type="text"
              value={name}
              onChange={(e) => setName(e.target.value)}
              className="w-full px-5 py-4 rounded-2xl border-2 border-pastel-lavender-200 bg-gradient-to-br from-white to-pastel-lavender-50 text-slate-800 placeholder-slate-400 focus:ring-4 focus:ring-pastel-lavender-200 focus:border-pastel-lavender-300 transition-all"
              placeholder="Enter your name"
            />
          </div>

          <div>
            <label className="block text-sm font-semibold text-slate-700 mb-2">
              <FiMail className="inline mr-2" />
              Email
            </label>
            <input
              type="email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              className="w-full px-5 py-4 rounded-2xl border-2 border-pastel-lavender-200 bg-gradient-to-br from-white to-pastel-lavender-50 text-slate-800 placeholder-slate-400 focus:ring-4 focus:ring-pastel-lavender-200 focus:border-pastel-lavender-300 transition-all"
              placeholder="your.email@example.com"
            />
          </div>

          <div>
            <label className="block text-sm font-semibold text-slate-700 mb-2">
              <FiPhone className="inline mr-2" />
              Phone
            </label>
            <input
              type="tel"
              value={phone}
              onChange={(e) => setPhone(e.target.value)}
              className="w-full px-5 py-4 rounded-2xl border-2 border-pastel-lavender-200 bg-gradient-to-br from-white to-pastel-lavender-50 text-slate-800 placeholder-slate-400 focus:ring-4 focus:ring-pastel-lavender-200 focus:border-pastel-lavender-300 transition-all"
              placeholder="+1 (555) 000-0000"
            />
          </div>

          <div>
            <label className="block text-sm font-semibold text-slate-700 mb-2">
              <FiCalendar className="inline mr-2" />
              Birthdate
            </label>
            <input
              type="date"
              value={birthdate}
              onChange={(e) => setBirthdate(e.target.value)}
              className="w-full px-5 py-4 rounded-2xl border-2 border-pastel-lavender-200 bg-gradient-to-br from-white to-pastel-lavender-50 text-slate-800 focus:ring-4 focus:ring-pastel-lavender-200 focus:border-pastel-lavender-300 transition-all"
            />
          </div>

          <div>
            <label className="block text-sm font-semibold text-slate-700 mb-2">
              💭 About You
            </label>
            <textarea
              value={bio}
              onChange={(e) => setBio(e.target.value)}
              rows={4}
              className="w-full px-5 py-4 rounded-2xl border-2 border-pastel-lavender-200 bg-gradient-to-br from-white to-pastel-lavender-50 text-slate-800 placeholder-slate-400 focus:ring-4 focus:ring-pastel-lavender-200 focus:border-pastel-lavender-300 transition-all resize-none"
              placeholder="Tell us about yourself, your goals, what brings you peace..."
            />
          </div>

          <button
            onClick={handleSave}
            disabled={saving}
            className="w-full bg-gradient-to-r from-pastel-lavender-500 to-pastel-pink-500 hover:from-pastel-lavender-600 hover:to-pastel-pink-600 text-white font-bold py-5 px-6 rounded-2xl transition-all duration-300 disabled:opacity-50 text-lg shadow-soft hover:shadow-float hover:-translate-y-1"
          >
            {saving ? (
              <span className="flex items-center justify-center gap-2">
                <div className="w-5 h-5 border-3 border-white border-t-transparent rounded-full animate-spin"></div>
                Saving...
              </span>
            ) : (
              'Save Profile ✨'
            )}
          </button>
        </div>
      </div>
    </div>
  )
}
