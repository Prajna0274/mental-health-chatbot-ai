export interface Profile {
  id: string
  email: string
  full_name: string | null
  avatar_url: string | null
  created_at: string
  updated_at: string
}

export interface Mood {
  id: string
  user_id: string
  mood_value: number
  notes: string | null
  created_at: string
}

export interface Journal {
  id: string
  user_id: string
  title: string | null
  content: string
  created_at: string
  updated_at: string
}

export interface ChatConversation {
  id: string
  user_id: string
  title: string
  created_at: string
  updated_at: string
}

export interface ChatMessage {
  id: string
  conversation_id: string
  user_id: string
  role: 'user' | 'assistant' | 'system'
  content: string
  created_at: string
}

export interface CheckIn {
  id: string
  user_id: string
  checked_in: boolean
  check_in_date: string
  created_at: string
}
