# Mental Health AI - Quick Start Guide

## ⚡ Get Started in 5 Minutes

### 1. Install Dependencies
```powershell
npm install
```

### 2. Set Up Environment
1. Copy `.env.example` to `.env`
2. Add your credentials:
   - Supabase URL & Key (get from supabase.com)
   - OpenAI API Key (get from platform.openai.com)

### 3. Set Up Database
1. Go to Supabase SQL Editor
2. Copy & run all SQL from `lib/supabase/schema.sql`

### 4. Run Development Server
```powershell
npm run dev
```

### 5. Open Browser
Visit: http://localhost:3000

---

## 📁 What's Included

✅ **Full-Stack Next.js 14 App** with TypeScript
✅ **Supabase Auth** - Secure login/signup
✅ **PostgreSQL Database** - All user data
✅ **OpenAI GPT-4 Integration** - AI mental health support
✅ **TailwindCSS** - Modern responsive design
✅ **6 Complete Pages:**
- Dashboard with mood graphs & streaks
- Mood Tracker with emoji slider
- Journal with auto-save & export
- AI Chat with text-to-speech
- Breathing Exercises (4-7-8 technique)
- Meditation Timer

---

## 🎯 Features

### Dashboard
- Daily affirmation
- 30-day mood trend graph (Recharts)
- Check-in streak counter
- Average mood calculation

### Mood Tracker
- 1-10 slider with emoji feedback
- Optional notes
- Historical data visualization

### Journal
- Rich text editor
- Auto-save every 3 seconds
- Export as .txt
- Full history

### AI Chat
- ChatGPT-like interface
- Conversation history
- Typing indicators
- **Text-to-Speech** (AI reads responses!)

### Breathing & Meditation
- Animated breathing circle (4-7-8 technique)
- Meditation timer (5/10/15/20/30 min)
- Visual progress indicators

---

## 🛠️ Tech Stack

- **Framework:** Next.js 14 (App Router)
- **Language:** TypeScript
- **Database:** Supabase (PostgreSQL)
- **Auth:** Supabase Auth
- **AI:** OpenAI GPT-4
- **Styling:** TailwindCSS
- **Charts:** Recharts
- **Animations:** Framer Motion
- **Icons:** React Icons

---

## 📂 Project Structure

```
nextjs-app/
├── app/                    # Pages & routes
│   ├── (dashboard)/        # Protected pages
│   │   ├── dashboard/      # Main dashboard
│   │   ├── mood/           # Mood tracker
│   │   ├── journal/        # Journaling
│   │   ├── chat/           # AI chat
│   │   ├── breathing/      # Breathing exercises
│   │   └── meditation/     # Meditation timer
│   ├── api/                # API routes
│   │   ├── moods/          # Mood endpoints
│   │   ├── journals/       # Journal endpoints
│   │   ├── chat/           # OpenAI chat
│   │   └── check-ins/      # Check-in endpoints
│   ├── login/              # Login page
│   └── signup/             # Signup page
├── components/             # Reusable components
│   └── Sidebar.tsx         # Navigation
├── lib/                    # Utilities
│   ├── supabase/
│   │   ├── client.ts       # Browser client
│   │   ├── server.ts       # Server client
│   │   └── schema.sql      # DB schema
│   ├── types.ts            # TypeScript types
│   └── affirmations.ts     # Daily affirmations
└── ...config files
```

---

## 🔒 Security Features

✅ Row Level Security (RLS) on all tables
✅ Server-side auth verification
✅ Protected API routes
✅ User-scoped database queries
✅ Secure cookie handling
✅ Input validation

---

## 🚀 Deployment

### Deploy to Vercel (Free)

1. Push to GitHub
2. Import to Vercel
3. Add environment variables
4. Deploy! 🎉

Your app will be live at: `yourapp.vercel.app`

---

## 📚 Documentation

- **Full Installation Guide:** See `INSTALLATION.md`
- **README:** See `README.md`
- **API Documentation:** Check inline code comments

---

## ⚠️ Important Disclaimer

This app provides supportive content but is **NOT a replacement** for professional mental health care.

### Crisis Resources:
- **988 Suicide & Crisis Lifeline** - Call or text 988
- **Crisis Text Line** - Text HOME to 741741
- **Emergency Services** - Call 911

---

## 💡 Quick Tips

1. **First Time?** Create account → Add mood → Check dashboard
2. **Testing Chat?** Enable text-to-speech icon to hear AI responses
3. **No Mood Graph?** Add at least one mood entry first
4. **Auto-save Not Working?** Wait 3 seconds after typing
5. **Deployment?** Vercel is easiest and free

---

## 🎓 Learn More

- Next.js: [nextjs.org/docs](https://nextjs.org/docs)
- Supabase: [supabase.com/docs](https://supabase.com/docs)
- OpenAI: [platform.openai.com/docs](https://platform.openai.com/docs)
- TailwindCSS: [tailwindcss.com](https://tailwindcss.com)

---

**Ready to start? Run `npm install` and follow the 5 steps above!** 🚀

Built with ❤️ for mental health awareness
