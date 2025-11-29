# Deploy Your Mental Health AI Chatbot to Vercel

## Quick Deploy Steps (5 minutes):

### 1. Go to Vercel
Visit: https://vercel.com

### 2. Sign In
Click "Sign Up" → Choose "Continue with GitHub"

### 3. Import Project
- Click "Add New..." → "Project"
- Find and select: `mental-health-chatbot-ai`
- Click "Import"

### 4. Configure Settings
- **Root Directory:** `nextjs-app` (Important!)
- **Framework Preset:** Next.js
- **Build Command:** (leave default)
- **Output Directory:** (leave default)

### 5. Add Environment Variables
Click "Environment Variables" and add these 3 variables:

**Variable 1:**
- Name: `NEXT_PUBLIC_SUPABASE_URL`
- Value: `https://nccviplqmnnqfmgsuwru.supabase.co`

**Variable 2:**
- Name: `NEXT_PUBLIC_SUPABASE_ANON_KEY`
- Value: (Copy from your .env file in nextjs-app folder)

**Variable 3:**
- Name: `GROQ_API_KEY`
- Value: (Copy from your .env file in nextjs-app folder)

### 6. Deploy
Click "Deploy" button and wait 2-3 minutes

### 7. Get Your Link
Once deployed, Vercel will show your live URL like:
`https://mental-health-chatbot-ai.vercel.app`

Share this link with anyone! 🎉

---

## Your Environment Variables (for reference):

Copy these values from your `.env` file in the `nextjs-app` folder:

```
NEXT_PUBLIC_SUPABASE_URL=https://nccviplqmnnqfmgsuwru.supabase.co
NEXT_PUBLIC_SUPABASE_ANON_KEY=[your key here]
GROQ_API_KEY=[your key here]
```

**Note:** All values can be found in your local `.env` file.

---

## Troubleshooting:

**If deployment fails:**
- Make sure Root Directory is set to `nextjs-app`
- Check all 3 environment variables are added correctly
- Verify your GitHub repository is connected

**If pages don't load:**
- Check browser console for errors
- Verify environment variables are correct
- Check Vercel deployment logs

**Need help?**
Contact Vercel support or check: https://vercel.com/docs
