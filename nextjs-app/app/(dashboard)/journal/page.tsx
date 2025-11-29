'use client'

import { useState, useEffect } from 'react'
import { FiSave, FiDownload, FiPlus } from 'react-icons/fi'
import { format } from 'date-fns'

interface Journal {
  id: string
  title: string | null
  content: string
  created_at: string
  updated_at: string
}

export default function JournalPage() {
  const [journals, setJournals] = useState<Journal[]>([])
  const [currentJournal, setCurrentJournal] = useState<Journal | null>(null)
  const [title, setTitle] = useState('')
  const [content, setContent] = useState('')
  const [autoSaveTimeout, setAutoSaveTimeout] = useState<NodeJS.Timeout | null>(null)
  const [saving, setSaving] = useState(false)
  const [lastSaved, setLastSaved] = useState<Date | null>(null)

  useEffect(() => {
    fetchJournals()
  }, [])

  useEffect(() => {
    // Auto-save after 3 seconds of inactivity
    if (autoSaveTimeout) clearTimeout(autoSaveTimeout)

    if (content && currentJournal) {
      const timeout = setTimeout(() => {
        handleSave()
      }, 3000)
      setAutoSaveTimeout(timeout)
    }

    return () => {
      if (autoSaveTimeout) clearTimeout(autoSaveTimeout)
    }
  }, [content, title])

  const fetchJournals = async () => {
    try {
      const res = await fetch('/api/journals')
      const data = await res.json()
      setJournals(data.journals || [])
    } catch (error) {
      console.error('Error fetching journals:', error)
    }
  }

  const handleSave = async () => {
    if (!content.trim()) return

    setSaving(true)
    try {
      const method = currentJournal ? 'PUT' : 'POST'
      const body = currentJournal
        ? { id: currentJournal.id, title, content }
        : { title, content }

      const res = await fetch('/api/journals', {
        method,
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(body),
      })

      if (!res.ok) throw new Error('Failed to save journal')

      const data = await res.json()
      setCurrentJournal(data.journal)
      setLastSaved(new Date())
      fetchJournals()
    } catch (error) {
      console.error('Error saving journal:', error)
    } finally {
      setSaving(false)
    }
  }

  const handleNewJournal = () => {
    setCurrentJournal(null)
    setTitle('')
    setContent('')
  }

  const handleLoadJournal = (journal: Journal) => {
    setCurrentJournal(journal)
    setTitle(journal.title || '')
    setContent(journal.content)
  }

  const handleExport = () => {
    if (!content) return

    const blob = new Blob([`${title}\n\n${content}`], { type: 'text/plain' })
    const url = URL.createObjectURL(blob)
    const a = document.createElement('a')
    a.href = url
    a.download = `journal-${format(new Date(), 'yyyy-MM-dd')}.txt`
    a.click()
    URL.revokeObjectURL(url)
  }

  return (
    <div className="max-w-7xl mx-auto p-6">
      {/* Header with New Journal Button */}
      <div className="flex items-center justify-between mb-8 animate-fadeIn">
        <div>
          <h1 className="text-3xl font-bold text-slate-800 mb-2">
            My Journal
          </h1>
          <p className="text-slate-600">Express yourself freely</p>
        </div>
        <button
          onClick={handleNewJournal}
          className="flex items-center gap-2 px-6 py-3 bg-gradient-to-r from-pastel-lavender-500 to-pastel-pink-500 hover:from-pastel-lavender-600 hover:to-pastel-pink-600 text-white font-semibold rounded-2xl shadow-soft hover:shadow-float transition-all duration-300 hover:-translate-y-1"
        >
          <FiPlus size={20} />
          New Entry
        </button>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        {/* Sidebar - Journal Cards in Masonry Style */}
        <div className="lg:col-span-1 space-y-4 animate-slideUp">
          <div className="gradient-lavender rounded-3xl p-6 shadow-soft-lg">
            <h2 className="text-xl font-bold text-slate-800 mb-4 flex items-center gap-2">
              <span>📚</span> Past Entries
            </h2>

            <div className="space-y-3 max-h-[700px] overflow-y-auto pr-2">
              {journals.map((journal, index) => (
                <button
                  key={journal.id}
                  onClick={() => handleLoadJournal(journal)}
                  className={`w-full text-left p-4 rounded-2xl transition-all duration-300 card-float ${
                    currentJournal?.id === journal.id
                      ? 'bg-white shadow-soft-lg scale-105 border-2 border-pastel-lavender-400'
                      : 'bg-white/60 hover:bg-white hover:shadow-soft backdrop-blur-sm'
                  }`}
                  style={{animationDelay: `${index * 0.05}s`}}
                >
                  <p className="font-bold text-slate-900 truncate mb-1">
                    {journal.title || 'Untitled Entry'}
                  </p>
                  <p className="text-sm text-slate-600 mb-2">
                    {format(new Date(journal.created_at), 'MMM dd, yyyy')}
                  </p>
                  <p className="text-xs text-slate-600 line-clamp-2">
                    {journal.content.substring(0, 80)}...
                  </p>
                </button>
              ))}
              
              {journals.length === 0 && (
                <div className="text-center py-12">
                  <div className="text-6xl mb-3">📝</div>
                  <p className="text-slate-600">No entries yet</p>
                  <p className="text-sm text-slate-600">Start journaling!</p>
                </div>
              )}
            </div>
          </div>
        </div>

        {/* Main Editor - Large Card */}
        <div className="lg:col-span-2 animate-scaleIn">
          <div className="bg-white rounded-4xl shadow-float p-8 card-float">
            {/* Toolbar */}
            <div className="flex items-center justify-between mb-6 pb-6 border-b-2 border-pastel-lavender-100">
              <div className="flex items-center gap-3">
                <button
                  onClick={handleSave}
                  disabled={saving || !content}
                  className="flex items-center gap-2 px-5 py-3 bg-gradient-to-r from-pastel-mint-400 to-pastel-sky-400 hover:from-pastel-mint-500 hover:to-pastel-sky-500 disabled:from-slate-300 disabled:to-slate-400 text-white font-semibold rounded-2xl shadow-soft hover:shadow-float transition-all duration-300"
                >
                  <FiSave size={18} />
                  {saving ? 'Saving...' : 'Save'}
                </button>
                <button
                  onClick={handleExport}
                  disabled={!content}
                  className="flex items-center gap-2 px-5 py-3 bg-gradient-to-r from-pastel-lavender-400 to-pastel-pink-400 hover:from-pastel-lavender-500 hover:to-pastel-pink-500 disabled:from-slate-300 disabled:to-slate-400 text-white font-semibold rounded-2xl shadow-soft hover:shadow-float transition-all duration-300"
                >
                  <FiDownload size={18} />
                  Export
                </button>
              </div>
              {lastSaved && (
                <div className="flex items-center gap-2 px-4 py-2 bg-pastel-mint-100 rounded-xl">
                  <span className="text-pastel-mint-700 text-sm font-medium">
                    ✓ Saved {format(lastSaved, 'HH:mm')}
                  </span>
                </div>
              )}
            </div>

            {/* Title Input */}
            <input
              type="text"
              value={title}
              onChange={(e) => setTitle(e.target.value)}
              placeholder="Give your entry a title..."
              className="w-full px-6 py-4 mb-6 rounded-2xl border-2 border-pastel-lavender-200 bg-gradient-to-br from-white to-pastel-lavender-50 text-slate-900 text-2xl font-bold placeholder-slate-400 focus:ring-4 focus:ring-pastel-lavender-200 focus:border-pastel-lavender-300 transition-all duration-300 shadow-inner-soft"
            />

            {/* Content Textarea */}
            <textarea
              value={content}
              onChange={(e) => setContent(e.target.value)}
              placeholder="Pour your heart out... ✨"
              className="w-full h-[550px] px-6 py-5 rounded-2xl border-2 border-pastel-lavender-200 bg-gradient-to-br from-white to-pastel-lavender-50 text-slate-800 text-lg leading-relaxed placeholder-slate-400 focus:ring-4 focus:ring-pastel-lavender-200 focus:border-pastel-lavender-300 transition-all duration-300 resize-none shadow-inner-soft"
              style={{ fontFamily: 'ui-serif, Georgia, Cambria, "Times New Roman", Times, serif' }}
            />

            {/* Auto-save Indicator */}
            {saving && (
              <div className="mt-4 flex items-center gap-2 text-pastel-sky-600">
                <div className="w-4 h-4 border-2 border-pastel-sky-600 border-t-transparent rounded-full animate-spin"></div>
                <p className="text-sm font-medium">Auto-saving your thoughts...</p>
              </div>
            )}
          </div>
        </div>
      </div>
    </div>
  )
}
