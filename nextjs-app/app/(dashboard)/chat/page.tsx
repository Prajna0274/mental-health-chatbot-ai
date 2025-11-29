'use client'

import { useState, useEffect, useRef } from 'react'
import { FiSend, FiVolume2, FiVolumeX } from 'react-icons/fi'

interface Message {
  id: string
  role: 'user' | 'assistant'
  content: string
  created_at: string
}

export default function ChatPage() {
  const [messages, setMessages] = useState<Message[]>([])
  const [input, setInput] = useState('')
  const [loading, setLoading] = useState(false)
  const [conversationId, setConversationId] = useState<string | null>(null)
  const [ttsEnabled, setTtsEnabled] = useState(false)
  const messagesEndRef = useRef<HTMLDivElement>(null)

  const scrollToBottom = () => {
    messagesEndRef.current?.scrollIntoView({ behavior: 'smooth' })
  }

  useEffect(() => {
    scrollToBottom()
  }, [messages])

  const speak = (text: string) => {
    if (!ttsEnabled || !window.speechSynthesis) return

    const utterance = new SpeechSynthesisUtterance(text)
    utterance.rate = 0.9
    utterance.pitch = 1
    utterance.volume = 1
    window.speechSynthesis.speak(utterance)
  }

  const handleSend = async (e: React.FormEvent) => {
    e.preventDefault()
    if (!input.trim() || loading) return

    const userMessage = input.trim()
    setInput('')
    setLoading(true)

    // Add user message immediately
    const tempUserMsg: Message = {
      id: Date.now().toString(),
      role: 'user',
      content: userMessage,
      created_at: new Date().toISOString(),
    }
    setMessages(prev => [...prev, tempUserMsg])

    try {
      const res = await fetch('/api/chat', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          message: userMessage,
          conversationId,
        }),
      })

      const data = await res.json()

      if (!res.ok) {
        // Show the error message from the API
        const errorMsg: Message = {
          id: (Date.now() + 1).toString(),
          role: 'assistant',
          content: `❌ ${data.error || 'Failed to get response. Please try again.'}`,
          created_at: new Date().toISOString(),
        }
        setMessages(prev => [...prev, errorMsg])
        setLoading(false)
        return
      }
      
      if (!conversationId) {
        setConversationId(data.conversationId)
      }

      // Add assistant message
      const assistantMsg: Message = {
        id: (Date.now() + 1).toString(),
        role: 'assistant',
        content: data.message,
        created_at: new Date().toISOString(),
      }
      setMessages(prev => [...prev, assistantMsg])

      // Speak the response if TTS is enabled
      speak(data.message)
    } catch (error) {
      console.error('Error sending message:', error)
      alert('Failed to send message. Please try again.')
    } finally {
      setLoading(false)
    }
  }

  return (
    <div className="max-w-5xl mx-auto h-[calc(100vh-8rem)] p-6">
      <div className="bg-white rounded-4xl shadow-float h-full flex flex-col overflow-hidden animate-scaleIn">
        {/* Header */}
        <div className="gradient-lavender p-6 flex items-center justify-between border-b-2 border-white/50">
          <div>
            <h1 className="text-2xl font-bold text-slate-800 flex items-center gap-2">
              <span>💬</span> AI Support
            </h1>
            <p className="text-sm text-slate-600 mt-1">
              I'm here to listen and support you
            </p>
          </div>
          <button
            onClick={() => setTtsEnabled(!ttsEnabled)}
            className={`p-4 rounded-2xl transition-all duration-300 shadow-soft ${
              ttsEnabled
                ? 'bg-gradient-to-br from-pastel-lavender-400 to-pastel-pink-400 text-white'
                : 'bg-white/70 text-slate-600 hover:bg-white'
            }`}
            title={ttsEnabled ? 'Disable text-to-speech' : 'Enable text-to-speech'}
          >
            {ttsEnabled ? <FiVolume2 size={22} /> : <FiVolumeX size={22} />}
          </button>
        </div>

        {/* Messages */}
        <div className="flex-1 overflow-y-auto p-6 space-y-5 bg-gradient-to-b from-pastel-lavender-50/30 to-white">
          {messages.length === 0 && (
            <div className="text-center py-20 animate-fadeIn">
              <div className="inline-block p-6 bg-gradient-to-br from-pastel-lavender-100 to-pastel-pink-100 rounded-full mb-4 animate-float">
                <span className="text-6xl">👋</span>
              </div>
              <p className="text-xl font-semibold text-slate-700 mb-2">Hello! How can I support you today?</p>
              <p className="text-slate-600">
                Share what's on your mind, and I'll do my best to help
              </p>
            </div>
          )}

          {messages.map((message, index) => (
            <div
              key={message.id}
              className={`flex ${message.role === 'user' ? 'justify-end' : 'justify-start'} animate-slideUp`}
              style={{animationDelay: `${index * 0.05}s`}}
            >
              <div
                className={`max-w-[75%] rounded-3xl px-6 py-4 shadow-soft transition-all duration-300 hover:shadow-soft-lg ${
                  message.role === 'user'
                    ? 'bg-gradient-to-br from-pastel-lavender-400 to-pastel-pink-400 text-white ml-auto'
                    : 'bg-white text-slate-800 border-2 border-pastel-lavender-100'
                }`}
              >
                <p className="whitespace-pre-wrap leading-relaxed">{message.content}</p>
                <span className={`text-xs mt-2 block ${
                  message.role === 'user' ? 'text-slate-600' : 'text-slate-500'
                }`}>
                  {new Date(message.created_at).toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })}
                </span>
              </div>
            </div>
          ))}

          {loading && (
            <div className="flex justify-start animate-fadeIn">
              <div className="bg-white border-2 border-pastel-lavender-100 rounded-3xl px-6 py-4 shadow-soft">
                <div className="flex gap-2">
                  <div className="w-3 h-3 bg-pastel-lavender-400 rounded-full animate-bounce typing-dot"></div>
                  <div className="w-3 h-3 bg-pastel-pink-400 rounded-full animate-bounce typing-dot"></div>
                  <div className="w-3 h-3 bg-pastel-mint-400 rounded-full animate-bounce typing-dot"></div>
                </div>
              </div>
            </div>
          )}

          <div ref={messagesEndRef} />
        </div>

        {/* Input */}
        <form onSubmit={handleSend} className="p-6 bg-white border-t-2 border-pastel-lavender-100">
          <div className="flex gap-3">
            <input
              type="text"
              value={input}
              onChange={(e) => setInput(e.target.value)}
              placeholder="Type your message..."
              className="flex-1 px-6 py-4 rounded-3xl border-2 border-pastel-lavender-200 bg-gradient-to-br from-white to-pastel-lavender-50 text-slate-800 placeholder-slate-400 focus:ring-4 focus:ring-pastel-lavender-200 focus:border-pastel-lavender-300 transition-all duration-300 shadow-inner-soft"
              disabled={loading}
            />
            <button
              type="submit"
              disabled={loading || !input.trim()}
              className="px-8 py-4 bg-gradient-to-r from-pastel-lavender-500 to-pastel-pink-500 hover:from-pastel-lavender-600 hover:to-pastel-pink-600 text-white font-bold rounded-3xl shadow-soft hover:shadow-float transition-all duration-300 disabled:opacity-50 disabled:cursor-not-allowed flex items-center gap-2 hover:-translate-y-1"
            >
              <FiSend size={20} />
              <span className="hidden sm:inline">Send</span>
            </button>
          </div>
        </form>
      </div>
    </div>
  )
}
