# Mental Health AI Web App - Full Stack Next.js

A comprehensive mental health support application built with Next.js 14, Supabase, TailwindCSS, and OpenAI.

## 🚀 Quick Start

### Prerequisites
- Node.js 18+ installed
- A Supabase account ([supabase.com](https://supabase.com))
- An OpenAI API key ([platform.openai.com](https://platform.openai.com))

### Installation

1. **Navigate to the project folder:**
   ```bash
   cd nextjs-app
   ```

2. **Install dependencies:**
   ```bash
   npm install
   ```

3. **Set up environment variables:**
   - Copy `.env.example` to `.env`:
     ```bash
     copy .env.example .env
     ```
   - Fill in your Supabase and OpenAI credentials in `.env`

4. **Set up Supabase database:**
   - Go to your Supabase project dashboard
   - Navigate to the SQL Editor
   - Copy and run the SQL from `lib/supabase/schema.sql`
   - This creates all necessary tables, indexes, and RLS policies

5. **Run the development server:**
   ```bash
   npm run dev
   ```

6. **Open your browser:**
   - Visit [http://localhost:3000](http://localhost:3000)
   - Create an account and start using the app!

## 📁 Project Structure

```
nextjs-app/
├── app/
│   ├── (dashboard)/          # Protected dashboard routes
│   │   ├── dashboard/        # Main dashboard page
│   │   ├── mood/            # Mood tracker
│   │   ├── journal/         # Journaling page
│   │   ├── chat/            # AI chat interface
│   │   ├── breathing/       # Breathing exercises
│   │   ├── meditation/      # Meditation timer
│   │   └── layout.tsx       # Dashboard layout with sidebar
│   ├── api/                 # API routes
│   │   ├── moods/           # Mood tracking endpoints
│   │   ├── journals/        # Journal endpoints
│   │   ├── chat/            # OpenAI chat endpoints
│   │   └── check-ins/       # Daily check-in endpoints
│   ├── login/               # Login page
│   ├── signup/              # Signup page
│   ├── layout.tsx           # Root layout
│   ├── page.tsx             # Home redirect
│   └── globals.css          # Global styles
├── components/
│   ├── Sidebar.tsx          # Navigation sidebar
│   ├── MoodChart.tsx        # Mood visualization
│   ├── MoodSlider.tsx       # Mood input slider
│   ├── JournalEditor.tsx    # Rich text editor
│   ├── ChatInterface.tsx    # ChatGPT-like chat UI
│   ├── BreathingCircle.tsx  # Breathing animation
│   ├── MeditationTimer.tsx  # Meditation timer
│   └── AffirmationCard.tsx  # Daily affirmations
├── lib/
│   ├── supabase/
│   │   ├── client.ts        # Client-side Supabase
│   │   ├── server.ts        # Server-side Supabase
│   │   └── schema.sql       # Database schema
│   ├── types.ts             # TypeScript types
│   └── affirmations.ts      # Affirmations data
├── package.json
├── tsconfig.json
├── tailwind.config.ts
└── next.config.js
```

## ✨ Features

### 🔐 Authentication
- Secure signup/login with Supabase Auth
- Email + password authentication
- Protected routes with middleware
- Auto-redirect based on auth state

### 📊 Dashboard
- Mood trend visualization (30-day graph)
- Daily check-in streak counter
- Quick stats overview
- Daily affirmation display

### 😊 Mood Tracker
- 1-10 mood slider with emoji indicators
- Optional notes for each entry
- Historical mood data view
- Line chart visualization

### 📝 Journaling
- Rich text editor
- Auto-save functionality (saves every 3 seconds)
- Export journal entries as text/PDF
- Search and filter entries
- Timestamps for all entries

### 💬 AI Chat
- ChatGPT-like interface
- Conversation history saved in database
- Multiple conversations support
- Typing indicators
- Text-to-Speech for AI responses
- Empathetic mental health support

### 🫁 Breathing Exercises
- Animated breathing circle
- 4-7-8 breathing technique
- Box breathing
- Visual and text guidance
- Adjustable duration

### 🧘 Meditation
- Customizable timer (5, 10, 15, 20, 30 min)
- Ambient background music
- Progress visualization
- Pause/resume functionality
- Completion tracking

### 🌟 Positive Affirmations
- Daily rotating affirmations
- Random affirmation generator
- Shareable cards
- Save favorites

## 🛠️ Tech Stack

- **Framework:** Next.js 14 (App Router)
- **Language:** TypeScript
- **Styling:** TailwindCSS
- **Database:** Supabase (PostgreSQL)
- **Authentication:** Supabase Auth
- **AI:** OpenAI GPT-4
- **Charts:** Recharts
- **Animations:** Framer Motion
- **Icons:** React Icons
- **State:** Zustand (for client state)

## 🔒 Security Features

- Row Level Security (RLS) on all database tables
- Server-side auth verification
- Protected API routes
- HTTPS only in production
- Secure cookie handling
- Input validation and sanitization

## 📱 Responsive Design

- Mobile-first approach
- Hamburger menu for mobile
- Touch-friendly interfaces
- Optimized for all screen sizes
- Progressive Web App ready

## 🚀 Deployment

### Vercel (Recommended)
1. Push code to GitHub
2. Import project to Vercel
3. Add environment variables
4. Deploy!

### Other Platforms
- Can deploy to Netlify, Railway, or any Node.js host
- Ensure environment variables are set
- Build command: `npm run build`
- Start command: `npm start`

## 🔧 Environment Variables

```env
# Supabase
NEXT_PUBLIC_SUPABASE_URL=your_supabase_project_url
NEXT_PUBLIC_SUPABASE_ANON_KEY=your_supabase_anon_key

# OpenAI
OPENAI_API_KEY=your_openai_api_key
```

## 📚 API Routes

### Moods
- `GET /api/moods` - Fetch mood history
- `POST /api/moods` - Create new mood entry

### Journals
- `GET /api/journals` - Fetch all journals
- `POST /api/journals` - Create new journal
- `PUT /api/journals` - Update existing journal

### Chat
- `GET /api/chat?conversationId=xxx` - Get conversation messages
- `GET /api/chat` - Get all conversations
- `POST /api/chat` - Send message and get AI response

### Check-ins
- `GET /api/check-ins` - Get check-in history and streak
- `POST /api/check-ins` - Record daily check-in

## 🎨 Customization

### Colors
Edit `tailwind.config.ts` to change the color scheme:
```typescript
colors: {
  primary: { ... },    // Main brand color
  secondary: { ... },  // Secondary accent
}
```

### Affirmations
Add/edit affirmations in `lib/affirmations.ts`

### AI Personality
Modify the system prompt in `app/api/chat/route.ts`

## 🐛 Troubleshooting

**Build errors:**
- Run `npm install` to ensure all dependencies are installed
- Check that Node.js version is 18+

**Supabase connection issues:**
- Verify environment variables are set correctly
- Check Supabase project status
- Ensure RLS policies are created

**OpenAI errors:**
- Verify API key is valid and has credits
- Check API rate limits

## 📝 License

MIT License - feel free to use this project for personal or commercial purposes!

## 🤝 Contributing

This is a starter template. Feel free to fork and customize for your needs!

## ⚠️ Disclaimer

This app provides supportive content but is NOT a replacement for professional mental health care. If you're experiencing a mental health crisis, please contact:
- **988 Suicide & Crisis Lifeline** - Call or text 988
- **Crisis Text Line** - Text HOME to 741741
- **Emergency Services** - Call 911

## 📧 Support

For issues or questions about setup, check the inline code comments or create an issue in the repository.

---

Built with ❤️ for mental health awareness
