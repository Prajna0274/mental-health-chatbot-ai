const express = require('express');
const cors = require('cors');

const app = express();
app.use(cors());
app.use(express.json());

// Health endpoint
app.get('/health', (req, res) => {
  res.json({ status: 'ok' });
});

app.get('/health/details', (req, res) => {
  res.json({
    status: 'ok',
    port: process.env.PORT || 3333,
    openai: process.env.OPENAI_API_KEY ? 'configured' : 'not-configured',
    timestamp: new Date().toISOString()
  });
});

// Intelligent response generator
function generateIntelligentResponse(message) {
  const msg = message.toLowerCase();
  
  // Study/Exam questions
  if (msg.includes('exam') && (msg.includes('tomorrow') || msg.includes('prepare'))) {
    return "For an exam tomorrow, here's your focused game plan:\n\n🎯 Tonight (High Priority):\n• Do a quick review of your notes (don't learn anything new)\n• Practice 2-3 past exam questions\n• Get to bed early - sleep is crucial for memory consolidation\n• No cramming past 9 PM\n\n☀️ Tomorrow Morning:\n• Eat a good breakfast with protein (eggs, yogurt)\n• Do a light 10-minute review of key concepts\n• Arrive 15 minutes early to settle in\n• Take 3 deep breaths before starting\n\nYou've prepared. Trust yourself. Good luck!";
  }
  
  if (msg.includes('study') && msg.includes('better')) {
    return "Here are the most effective study techniques backed by science:\n\n1. Active Recall (Most Powerful)\n   Close your books and test yourself. Write down everything you remember, then check what you missed.\n\n2. Spaced Repetition\n   Review material at intervals: Day 1 → Day 3 → Day 7 → Day 14. This locks it into long-term memory.\n\n3. Pomodoro Technique\n   Study for 25 minutes, break for 5 minutes. After 4 rounds, take a 30-minute break.\n\n4. Teach Someone Else\n   Explain concepts out loud (even to yourself). If you can't explain it simply, you don't understand it.\n\n5. Practice Problems > Reading Notes\n   Doing beats reviewing every time.\n\nPro tip: Put your phone in another room while studying. Even having it nearby reduces focus by 20%.\n\nWhat subject are you working on?";
  }
  
  // Career questions
  if (msg.includes('career') && (msg.includes('change') || msg.includes('switch'))) {
    return "Thinking about a career change? Here's a smart roadmap:\n\nBefore You Quit:\n✓ Build new skills while still employed (evenings/weekends)\n✓ Network with people in your target field - informational interviews\n✓ Save 6-12 months of living expenses\n✓ Test the waters with freelance projects or volunteering\n\nKey Questions to Ask Yourself:\n• What am I running FROM vs running TO?\n• What skills from my current job transfer?\n• Can I afford the likely pay cut initially?\n• Have I researched day-to-day reality of the new career?\n\nTimeline:\nMonths 1-3: Research + Network\nMonths 4-6: Skill Building + Portfolio\nMonths 7-9: Apply for Jobs\nMonth 10+: Make the Switch\n\nRemember: Career changes are normal. Most people do it 5-7 times in their lifetime.\n\nWhat career are you considering moving into?";
  }
  
  if (msg.includes('interview') || (msg.includes('job') && msg.includes('prepare'))) {
    return "Nail your interview with this prep strategy:\n\n🔍 Research (1-2 Days Before):\n• Company website, recent news, LinkedIn\n• Understand their products, culture, challenges\n• Know your interviewer's background (LinkedIn)\n\n⭐ Practice STAR Stories:\nSituation: Set context\nTask: Your responsibility\nAction: What YOU did (not 'we')\nResult: Quantifiable outcome\n\nPrepare 5-7 stories covering:\nLeadership, teamwork, conflict, failure, achievement\n\n❓ Common Questions:\n• 'Tell me about yourself' → 2-min career summary\n• 'Why this company?' → Specific, genuine reasons\n• 'Your weaknesses?' → Real weakness + how you're improving\n\n💬 Questions to Ask Them:\n• What does success look like in this role?\n• What are the biggest challenges?\n• Team dynamics and culture?\n\n✅ Day Of:\nProfessional attire, arrive 10 min early, firm handshake, send thank-you email within 24 hours.\n\nWhen's your interview?";
  }
  
  // Time management
  if (msg.includes('time') && (msg.includes('manage') || msg.includes('busy') || msg.includes('productive'))) {
    return "Here's a practical time management system that actually works:\n\n🌙 Every Evening:\n• Brain dump: Write ALL tasks\n• Pick your 'Big 3' for tomorrow\n• Schedule them in your calendar\n\n☀️ Every Morning:\n• Do hardest task FIRST (before checking phone)\n• Batch similar tasks (all emails together, all calls together)\n• Time-block your day\n\n⚠️ Combat Time-Wasters:\n• Phone: Use app blockers during focus time\n• Meetings: 'Could this be an email?' - decline or shorten\n• Perfectionism: Set time limits, done > perfect\n\n⚡ Energy Management:\n• Your peak hours → Deep work\n• Low energy hours → Admin tasks\n• Schedule breaks (you're not a machine)\n\n🚫 Say NO Formula:\n'I'd love to, but I'm committed to [priority] right now.'\n\nWhat's stealing most of your time?";
  }
  
  // Confidence questions
  if (msg.includes('confidence') || msg.includes('self-esteem') || msg.includes('not good enough')) {
    return "Confidence is a skill you build through action. Here's how:\n\n💡 Immediate Mindset Shifts:\n• Everyone feels inadequate sometimes (even successful people)\n• Confidence comes AFTER action, not before\n• Stop comparing your Chapter 1 to someone else's Chapter 20\n\n📅 Daily Confidence Builders:\n1. Evidence Journal: Write 3 things you did well today\n2. Reject Impostor Syndrome: When you doubt yourself, ask 'Would I judge a friend this harshly?'\n3. Posture Hack: Stand tall, shoulders back (changes brain chemistry)\n4. Affirmations That Work: 'I'm learning' > 'I'm perfect'\n\n🛠️ Long-term:\n• Do hard things (proves to yourself you can)\n• Develop ONE skill deeply (mastery → confidence)\n• Help others (reminds you of your value)\n• Physical exercise (scientific confidence boost)\n\n💬 Truth Bomb: 'Confident' people feel scared too. They just don't let fear stop them.\n\nWhat situation makes you feel most insecure?";
  }
  
  // Habit building
  if (msg.includes('habit') || (msg.includes('build') && msg.includes('discipline'))) {
    return "Build habits that stick using science-backed methods:\n\n🔹 The Tiny Habits Formula:\n1. Start RIDICULOUSLY small (2 pushups, not 30)\n2. Anchor to existing habit: 'After I [current habit], I will [new tiny habit]'\n3. Celebrate immediately (fist pump, smile, 'Yes!')\n4. Gradually increase\n\n💪 Example:\n• 'After I pour my morning coffee, I'll do 1 pushup'\n• Week 2: 2 pushups\n• Month 2: 10 pushups\n\n🏗️ Environment Design:\n• Make it obvious: Lay out gym clothes night before\n• Make it easy: Pre-cut vegetables, prep meals\n• Make it attractive: Pair with something you enjoy (podcast while walking)\n• Make it satisfying: Track it visually (X on calendar)\n\n🚫 Breaking Bad Habits:\n• Make it invisible: Hide junk food, delete apps\n• Make it difficult: Unplug TV, put phone in another room\n• Make it unattractive: List negative consequences\n• Make it unsatisfying: Get an accountability partner\n\n⏰ Reality: 66 days average to form a habit. Be patient. Never miss twice.\n\nWhat habit do you want to build?";
  }
  
  // Friends/social
  if (msg.includes('friend') && (msg.includes('make') || msg.includes('new'))) {
    return "Making friends as an adult takes intentional effort. Here's the playbook:\n\n🎯 Step 1: Create Opportunities\n• Join groups (hobby clubs, sports, book clubs, volunteer)\n• Regular attendance (familiarity builds connection)\n• Say YES to invitations (even if uncomfortable)\n• Use apps: Bumble BFF, Meetup\n\n💬 Step 2: Initiate Conversation\n• Ask open questions: 'How'd you get into this?'\n• Find common ground\n• Be genuinely curious\n• Share something personal (vulnerability attracts)\n\n📱 Step 3: Move to Next Level\n• Exchange numbers\n• Suggest specific plan: 'Want to grab coffee Saturday at 10?'\n• Don't wait for them - YOU initiate\n• Consistency > intensity (regular small hangouts)\n\n💙 Step 4: Deepen Friendship\n• Check in regularly (text, call)\n• Show up when they need you\n• Share wins AND struggles\n• Be reliable\n\n💡 Mindset Shifts:\n• Most people want friends too - make the first move\n• Rejection isn't personal - they're busy/anxious too\n• Quality > quantity\n• Takes time (6+ months for close friendship)\n\nWhat's your biggest social challenge?";
  }
  
  // Decision making
  if (msg.includes('decision') || msg.includes('should i')) {
    const options = extractOptions(msg);
    return `Facing a tough decision${options ? ` between ${options}` : ''}? Here's a framework:\n\n📝 Clarity Exercise:\n1. List both options\n2. For each: Pros | Cons | Fears | Excitement\n3. 10-10-10 rule: How will I feel about this in 10 minutes? 10 months? 10 years?\n\n🧠 Key Questions:\n• Which option aligns with my values?\n• Which scares me more? (Often the growth choice!)\n• What would I regret NOT doing at age 80?\n• Am I choosing from fear or possibility?\n• What would I tell my best friend?\n\n🪙 The Coin Flip Test:\nAssign heads to option A, tails to option B. Flip.\nNotice your gut reaction - relief or disappointment?\nThat's your answer.\n\n💡 Reduce Regret:\n• There's no 'perfect' choice\n• You can course-correct later\n• Indecision is a decision (to stay stuck)\n• Action creates clarity\n\nTrust yourself. What does your gut say?`;
  }
  
  // Breakup/heartbreak
  if (msg.includes('breakup') || msg.includes('heartbreak') || (msg.includes('relationship') && msg.includes('end'))) {
    return "Heartbreak is real pain. Here's how to heal:\n\n😢 Week 1-2 (Immediate):\n• Feel it ALL - cry, journal, rage (healthy release)\n• No contact rule - block/mute if needed\n• Lean on friends/family\n• Basic self-care: sleep, eat, shower (even when you don't want to)\n\n💪 Month 1-2 (Early Healing):\n• Remove reminders (photos, gifts in a box - don't throw away yet)\n• Physical activity (walks, gym - natural antidepressant)\n• New routine (break old patterns)\n• No stalking social media (it only hurts)\n\n🌱 Month 3+ (Rebuilding):\n• Rediscover who you are outside the relationship\n• Try something new you've wanted to do\n• Date yourself first\n• Therapy if needed (no shame)\n\n❌ Red Flags to Avoid:\n× Rebound relationship\n× Excessive drinking/substances\n× Begging them back\n× Revenge\n\n💙 Truth: It gets better. Not linear, but it does. One day you'll wake up and it won't hurt.\n\nHow long since the breakup?";
  }
  
  // Anxiety/stress (contextual)
  if (msg.includes('anxious') || msg.includes('anxiety')) {
    if (msg.includes('exam') || msg.includes('test')) {
      return "Test anxiety is super common. Here's how to manage it:\n\n📚 Before the Exam:\n• Preparation = confidence (you've studied, trust it)\n• Practice under time pressure (simulate exam conditions)\n• Get 8 hours sleep (critical for memory recall)\n\n🌙 Night Before:\n• Light review only\n• Relaxing activity (walk, shower, music)\n• Prep everything (calculator, pencils, ID)\n• Early bed\n\n☀️ Exam Morning:\n• Protein breakfast\n• Avoid caffeine overload\n• Arrive early but not too early (15 min)\n• Don't talk to anxious classmates\n\n✍️ During Exam:\n• Read ALL instructions first\n• Do easy questions first (builds confidence)\n• If panic: 4-7-8 breathing (in 4, hold 7, out 8)\n• Remember: One exam doesn't define you\n\n💬 Mindset: 'I've prepared. I'll do my best. That's enough.'\n\nYou've got this!";
    }
    return "Anxiety right now? Let's calm your nervous system:\n\n🆘 Immediate Relief (Do NOW):\n1. Box Breathing: In-4, hold-4, out-4, hold-4. Repeat 5x\n2. 5-4-3-2-1 Grounding:\n   - Name 5 things you SEE\n   - 4 things you TOUCH\n   - 3 things you HEAR\n   - 2 things you SMELL\n   - 1 thing you TASTE\n3. Cold Water: Splash face or hold ice\n\n📅 Short-term (Today):\n• Move your body (walk, stretch, dance)\n• Talk to someone\n• Write it out\n• Avoid caffeine/sugar\n\n🛠️ Long-term Management:\n• Regular exercise (best anxiety medicine)\n• Therapy (CBT is proven effective)\n• Meditation apps (Headspace, Calm)\n• Sleep hygiene\n• Limit news/social media\n\n⚠️ When to Get Help: If it's interfering with daily life, see a doctor/therapist.\n\nWhat's triggering your anxiety?";
  }
  
  // Mental health emergencies
  if (msg.includes('suicide') || msg.includes('kill myself') || msg.includes('end it all')) {
    return "⚠️ I'm concerned about you. Please reach out for help right now:\n\n**IMMEDIATE SUPPORT:**\n• **988 Suicide & Crisis Lifeline** - Call or text 988\n• **Crisis Text Line** - Text HOME to 741741\n• **Emergency** - Call 911 or go to ER\n\n**You are not alone:**\n• These feelings are temporary, even though they don't feel like it\n• Your life has value\n• There are people who care and want to help\n• Treatment works - depression lies to you\n\n**Right now:**\n1. Call someone you trust\n2. Remove any means of self-harm\n3. Don't be alone\n4. Promise yourself 24 hours\n\nPlease reach out to a crisis line. They're trained, confidential, and available 24/7.\n\nYou matter.";
  }
  
  // Default intelligent response
  return `I understand you're dealing with: "${message}"\n\nLet me help you with that. Could you give me a bit more detail? For example:\n\n• What's the specific situation?\n• What have you tried so far?\n• What outcome are you hoping for?\n\nThe more specific you are, the better I can assist you.\n\nOr feel free to ask me about:\n• Study/career advice\n• Mental health support\n• Building habits or skills\n• Relationships or social connections\n• Time management or productivity\n• Any life guidance you need\n\nWhat would be most helpful right now?`;
}

function extractOptions(message) {
  const orPattern = /(\w+)\s+or\s+(\w+)/i;
  const match = message.match(orPattern);
  return match ? `${match[1]} or ${match[2]}` : null;
}

// Chat endpoint
app.post('/api/chat', async (req, res) => {
  try {
    const { message } = req.body;

    if (!message) {
      return res.status(400).json({ error: 'Message missing' });
    }

    console.log(`Incoming: ${message}`);
    const reply = generateIntelligentResponse(message);
    console.log(`Reply: ${reply.substring(0, 50)}...`);
    
    res.json({ reply });
    
  } catch (err) {
    console.error('Error:', err);
    res.status(500).json({ error: 'Server error' });
  }
});

const PORT = process.env.PORT || 3333;
app.listen(PORT, '0.0.0.0', () => {
  console.log(`✅ AI Chatbot running on http://localhost:${PORT}`);
});
