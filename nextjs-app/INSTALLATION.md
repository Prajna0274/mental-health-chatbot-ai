# 🚀 INSTALLATION GUIDE

## Complete Mental Health AI Web App - Next.js Full Stack

This guide will walk you through setting up the complete application from scratch.

---

## 📋 Prerequisites

Before starting, make sure you have:
- ✅ Node.js 18 or higher installed
- ✅ A Supabase account (free tier works perfectly)
- ✅ An OpenAI API key

---

## 🎯 Step-by-Step Setup

### Step 1: Navigate to the Project Directory

```powershell
cd C:\Users\prasa\OneDrive\Desktop\mental-health-ai-chatbot\nextjs-app
```

### Step 2: Install Dependencies

```powershell
npm install
```

This will install all required packages:
- Next.js 14
- React 18
- Supabase client & auth helpers
- OpenAI SDK
- TailwindCSS
- Recharts (for mood graphs)
- Framer Motion (for animations)
- React Icons
- date-fns
- TypeScript
- And more...

**Estimated time:** 2-3 minutes

---

### Step 3: Set Up Supabase Database

#### 3.1 Create a Supabase Project
1. Go to [https://supabase.com](https://supabase.com)
2. Click "Start your project"
3. Sign in with GitHub (or create an account)
4. Click "New Project"
5. Choose an organization (or create one)
6. Fill in:
   - Project name: `mental-health-ai`
   - Database password: (generate a strong one - save it!)
   - Region: Choose closest to you
   - Pricing plan: Free tier is perfect
7. Click "Create new project"
8. Wait 2-3 minutes for setup to complete

#### 3.2 Get Your Supabase Credentials
1. In your Supabase project dashboard, click "Settings" (gear icon) in the sidebar
2. Click "API" under Project Settings
3. You'll see:
   - **Project URL** - copy this
   - **anon public** key - copy this

#### 3.3 Run the Database Schema
1. In Supabase, click "SQL Editor" in the sidebar
2. Click "New Query"
3. Open the file: `lib/supabase/schema.sql`
4. Copy ALL the SQL code
5. Paste it into the Supabase SQL Editor
6. Click "Run" (or press Ctrl + Enter)
7. You should see "Success. No rows returned"

**This creates:**
- ✅ 6 database tables (profiles, moods, journals, chat_conversations, chat_messages, check_ins)
- ✅ Row Level Security policies
- ✅ Indexes for performance
- ✅ Auto-triggers for timestamps
- ✅ Automatic profile creation on signup

---

### Step 4: Get OpenAI API Key

1. Go to [https://platform.openai.com](https://platform.openai.com)
2. Sign in or create account
3. Click your profile icon → "View API keys"
4. Click "Create new secret key"
5. Name it: `mental-health-app`
6. Copy the key (you can only see it once!)

**Note:** You'll need to add credits to your OpenAI account. $5-10 is plenty to start.

---

### Step 5: Configure Environment Variables

1. In the `nextjs-app` folder, create a new file named `.env` (NO extension)
2. Copy the contents from `.env.example`:

```env
# Supabase
NEXT_PUBLIC_SUPABASE_URL=paste_your_supabase_url_here
NEXT_PUBLIC_SUPABASE_ANON_KEY=paste_your_supabase_anon_key_here

# OpenAI
OPENAI_API_KEY=paste_your_openai_key_here
```

3. Replace the placeholder values with your actual credentials
4. Save the file

**⚠️ Important:** Never commit the `.env` file to git! It's already in `.gitignore`.

---

### Step 6: Run the Development Server

```powershell
npm run dev
```

You should see:
```
▲ Next.js 14.0.4
- Local:        http://localhost:3000
- Ready in 2.3s
```

---

### Step 7: Open in Browser

1. Open your browser
2. Go to: [http://localhost:3000](http://localhost:3000)
3. You should be redirected to the login page
4. Click "Sign up"
5. Create your account:
   - Full Name: Your name
   - Email: your email
   - Password: at least 6 characters
6. Click "Create Account"

**You're now in the app!** 🎉

---

## 🧪 Test All Features

### 1. Dashboard
- ✅ Should show welcome message with daily affirmation
- ✅ Streak counter (starts at 0)
- ✅ "Check In Today" button
- ✅ Average mood (will show 0 initially)

### 2. Mood Tracker
- ✅ Navigate to "Mood Tracker" from sidebar
- ✅ Move the slider (1-10)
- ✅ Emoji changes based on mood
- ✅ Add optional notes
- ✅ Click "Save Mood"
- ✅ Return to Dashboard - you should see mood on graph!

### 3. Journal
- ✅ Navigate to "Journal"
- ✅ Start typing in the editor
- ✅ Auto-saves after 3 seconds (watch for "Auto-saving..." message)
- ✅ Add a title
- ✅ Click "Save" manually
- ✅ Click "Export" to download as .txt file
- ✅ Create multiple journal entries

### 4. AI Chat
- ✅ Navigate to "AI Chat"
- ✅ Type a message: "I'm feeling stressed about work"
- ✅ Click Send
- ✅ AI responds with supportive advice
- ✅ Click speaker icon to enable Text-to-Speech
- ✅ AI will read responses aloud!

### 5. Breathing Exercise
- ✅ Navigate to "Breathing"
- ✅ Read the instructions
- ✅ Click "Start Breathing Exercise"
- ✅ Follow the animated circle
- ✅ Breathe: In (4s) → Hold (7s) → Out (8s)
- ✅ Calming experience!

### 6. Meditation
- ✅ Navigate to "Meditation"
- ✅ Select duration (5, 10, 15, 20, or 30 min)
- ✅ Click "Start"
- ✅ Watch timer countdown with animated progress circle
- ✅ Click "Pause" to pause
- ✅ Click "Reset" to restart

---

## 🎨 Features Included

### ✅ Authentication
- Secure signup and login
- Protected routes (can't access dashboard without login)
- Logout functionality
- Session management

### ✅ Dashboard
- Daily affirmations (changes each day)
- Mood trend graph (30 days)
- Check-in streak counter
- Average mood calculation
- Quick stats

### ✅ Mood Tracking
- 1-10 slider with emoji feedback
- Optional notes
- Historical data
- Visual graph representation

### ✅ Journaling
- Auto-save (every 3 seconds)
- Manual save option
- Export as .txt
- Title + content
- Journal history sidebar
- Timestamps

### ✅ AI Chat
- ChatGPT-like interface
- Conversation history saved
- Multiple conversations
- Typing indicators
- **Text-to-Speech** (AI reads responses aloud!)
- Mobile responsive

### ✅ Breathing Exercises
- 4-7-8 technique
- Animated breathing circle
- Visual guidance
- Color-coded phases
- Instructions included

### ✅ Meditation
- Timer (5/10/15/20/30 minutes)
- Progress circle animation
- Pause/resume
- Meditation tips
- Completion celebration

### ✅ Design
- Modern gradient UI
- Dark mode support
- Fully responsive
- Smooth animations
- Clean typography
- Accessible

---

## 🛠️ Troubleshooting

### Problem: "Module not found" errors

**Solution:**
```powershell
# Delete node_modules and reinstall
Remove-Item -Recurse -Force node_modules
npm install
```

### Problem: "Supabase connection failed"

**Solution:**
1. Check `.env` file has correct credentials
2. Make sure there are NO spaces around the `=` signs
3. Restart dev server: Stop (Ctrl+C) then `npm run dev`
4. Check Supabase project is not paused (free tier pauses after 7 days of inactivity)

### Problem: "OpenAI API error"

**Solution:**
1. Verify API key in `.env` is correct
2. Check OpenAI account has credits: [https://platform.openai.com/account/billing](https://platform.openai.com/account/billing)
3. API key might be rate-limited - wait a minute and try again

### Problem: TypeScript errors in VS Code

**Solution:**
- These are expected BEFORE running `npm install`
- After installation, VS Code should recognize all types
- Restart VS Code if needed
- Press Ctrl+Shift+P → "TypeScript: Restart TS Server"

### Problem: Can't see mood graph on dashboard

**Solution:**
- You need to add at least one mood entry first!
- Go to Mood Tracker → Set mood → Save
- Return to Dashboard → Graph should appear

### Problem: Chat not responding

**Solution:**
1. Open browser console (F12) → Check for errors
2. Verify OpenAI API key is set in `.env`
3. Check OpenAI account status
4. Try a simpler message first: "Hello"

---

## 📱 Mobile Testing

The app is fully responsive! Test on mobile:

### Option 1: Same Network
1. Find your computer's IP address:
   ```powershell
   ipconfig
   ```
   Look for "IPv4 Address"
2. On mobile browser: `http://YOUR_IP:3000`

### Option 2: Browser Dev Tools
1. In Chrome: F12 → Click device icon (top left)
2. Select iPhone/Android
3. Test responsive design

---

## 🚀 Deployment (Optional)

### Deploy to Vercel (Free, Recommended)

1. Create GitHub account if you don't have one
2. Create new repository
3. Push your code:
   ```powershell
   git init
   git add .
   git commit -m "Initial commit"
   git branch -M main
   git remote add origin https://github.com/yourusername/mental-health-app.git
   git push -u origin main
   ```
4. Go to [https://vercel.com](https://vercel.com)
5. Sign in with GitHub
6. Click "New Project"
7. Import your repository
8. Add environment variables:
   - `NEXT_PUBLIC_SUPABASE_URL`
   - `NEXT_PUBLIC_SUPABASE_ANON_KEY`
   - `OPENAI_API_KEY`
9. Click "Deploy"
10. Your app is live! 🎉

**You'll get a URL like:** `mental-health-app.vercel.app`

---

## 📂 File Structure Explanation

```
nextjs-app/
├── app/                          # Next.js App Router
│   ├── (dashboard)/              # Protected routes
│   │   ├── dashboard/page.tsx    # Main dashboard
│   │   ├── mood/page.tsx         # Mood tracker
│   │   ├── journal/page.tsx      # Journaling
│   │   ├── chat/page.tsx         # AI chat
│   │   ├── breathing/page.tsx    # Breathing exercises
│   │   ├── meditation/page.tsx   # Meditation timer
│   │   └── layout.tsx            # Dashboard layout + sidebar
│   ├── api/                      # API Routes
│   │   ├── moods/route.ts        # GET/POST moods
│   │   ├── journals/route.ts     # GET/POST/PUT journals
│   │   ├── chat/route.ts         # POST to OpenAI
│   │   └── check-ins/route.ts    # GET/POST check-ins
│   ├── login/page.tsx            # Login page
│   ├── signup/page.tsx           # Signup page
│   ├── layout.tsx                # Root layout
│   ├── page.tsx                  # Homepage (redirects)
│   └── globals.css               # Global styles
├── components/                   # Reusable components
│   └── Sidebar.tsx               # Navigation sidebar
├── lib/                          # Utilities
│   ├── supabase/
│   │   ├── client.ts             # Browser Supabase client
│   │   ├── server.ts             # Server Supabase client
│   │   └── schema.sql            # Database schema
│   ├── types.ts                  # TypeScript interfaces
│   └── affirmations.ts           # Affirmations data
├── .env                          # Your secrets (not in git)
├── .env.example                  # Template
├── package.json                  # Dependencies
├── tsconfig.json                 # TypeScript config
├── tailwind.config.ts            # Tailwind config
└── README.md                     # Documentation
```

---

## 💡 Tips & Best Practices

### Security
- ✅ Never share your `.env` file
- ✅ Never commit API keys to git
- ✅ Row Level Security (RLS) protects user data
- ✅ All database queries are user-scoped

### Performance
- ✅ Server components for static content
- ✅ Client components only where needed
- ✅ Database indexes for fast queries
- ✅ Optimized images and assets

### User Experience
- ✅ Auto-save in journal prevents data loss
- ✅ Loading states for all async operations
- ✅ Error messages are user-friendly
- ✅ Responsive design works on all devices

---

## 🎓 Learning Resources

### Next.js
- Official Docs: [https://nextjs.org/docs](https://nextjs.org/docs)
- App Router: [https://nextjs.org/docs/app](https://nextjs.org/docs/app)

### Supabase
- Docs: [https://supabase.com/docs](https://supabase.com/docs)
- Auth Guide: [https://supabase.com/docs/guides/auth](https://supabase.com/docs/guides/auth)

### OpenAI
- API Docs: [https://platform.openai.com/docs](https://platform.openai.com/docs)

### TailwindCSS
- Docs: [https://tailwindcss.com/docs](https://tailwindcss.com/docs)

---

## ✅ Checklist Before You're Done

- [ ] `npm install` completed successfully
- [ ] Supabase project created
- [ ] Database schema executed
- [ ] `.env` file created with all credentials
- [ ] Development server running (`npm run dev`)
- [ ] Can access app at `localhost:3000`
- [ ] Created test account
- [ ] Added a mood entry
- [ ] Tested AI chat
- [ ] All pages load without errors

---

## 🎉 Congratulations!

You now have a fully functional Mental Health AI Web App with:
- 🔐 Secure authentication
- 📊 Mood tracking & visualization
- 📝 Journaling with auto-save
- 💬 AI-powered support chat
- 🫁 Breathing exercises
- 🧘 Meditation timer
- 🌟 Daily affirmations

**The app is production-ready and can be deployed to Vercel immediately!**

---

## 📞 Support

If you encounter any issues:
1. Check the Troubleshooting section above
2. Look for error messages in browser console (F12)
3. Check Supabase logs in dashboard
4. Verify environment variables are set correctly

---

**Built with ❤️ for mental health awareness**

*Remember: This app provides supportive content but is NOT a replacement for professional mental health care.*

**Crisis Resources:**
- **988 Suicide & Crisis Lifeline** - Call or text 988
- **Crisis Text Line** - Text HOME to 741741
- **Emergency** - Call 911
