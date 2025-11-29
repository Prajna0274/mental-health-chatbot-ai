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

// Chat endpoint
app.post('/api/chat', async (req, res) => {
  try {
    const { message } = req.body;

    if (!message) {
      return res.status(400).json({ error: 'Message missing' });
    }

    console.log(`Incoming message: ${message}`);
    
    // Intelligent AI-like responses that analyze the actual question
    const lowerMsg = message.toLowerCase();
    const isQuestion = lowerMsg.includes('how') || lowerMsg.includes('what') || lowerMsg.includes('why') || lowerMsg.includes('when') || lowerMsg.includes('?');
    let reply;

    // Emergency symptoms - immediate action needed
    if (lowerMsg.includes('breath') || lowerMsg.includes('breathing') || lowerMsg.includes('chest pain')) {
      reply = "⚠️ If you're having difficulty breathing or chest pain, please call emergency services (911) immediately or go to the nearest hospital. This could be a medical emergency.\n\nIf this is anxiety-related, try this NOW:\n1. Sit down in a comfortable position\n2. Breathe in slowly through your nose for 4 counts\n3. Hold for 4 counts\n4. Exhale through your mouth for 6 counts\n5. Repeat 5 times\n\nAre you able to breathe normally now?";
    } else if (lowerMsg.includes('vomit') || lowerMsg.includes('dizzy') || lowerMsg.includes('nausea')) {
      reply = "I'm concerned about your symptoms. Vomiting and dizziness can be serious. Here's what to do:\n\n1. Sit or lie down immediately\n2. Sip water slowly if you can\n3. If symptoms persist, call a doctor or go to urgent care\n4. These could be anxiety symptoms, but it's important to rule out medical causes first\n\nHave you eaten today? When did these symptoms start?";
    } else if (lowerMsg.includes('panic') || lowerMsg.includes('attack')) {
      reply = "You might be experiencing a panic attack. Remember: this will pass. Try this grounding technique:\n\n5-4-3-2-1 Method:\n- Name 5 things you can SEE\n- Name 4 things you can TOUCH\n- Name 3 things you can HEAR\n- Name 2 things you can SMELL\n- Name 1 thing you can TASTE\n\nThis helps bring you back to the present moment. Breathe slowly. You're safe.";
    } else if (lowerMsg.includes('anxious') || lowerMsg.includes('anxiety') || lowerMsg.includes('worried') || lowerMsg.includes('nervous')) {
      reply = "I understand you're feeling anxious. Here are some immediate strategies:\n\n1. **Box Breathing**: Breathe in for 4, hold for 4, out for 4, hold for 4. Repeat.\n2. **Ground yourself**: Press your feet firmly on the floor, feel the ground beneath you\n3. **Cold water**: Splash cold water on your face or hold an ice cube\n4. **Movement**: Take a short walk or do gentle stretching\n\nWhat triggered these feelings? Talking about it can help.";
    } else if (lowerMsg.includes('stress') || lowerMsg.includes('overwhelm')) {
      reply = "Feeling stressed is your body's signal. Here's a quick stress-relief plan:\n\n✓ Take 3 deep breaths right now\n✓ Write down the top 3 things stressing you\n✓ Choose ONE to address today\n✓ Break it into tiny steps\n✓ Take a 5-minute break every hour\n\nRemember: You don't have to do everything at once. What's the most pressing issue right now?";
    } else if (lowerMsg.includes('sad') || lowerMsg.includes('depressed') || lowerMsg.includes('down') || lowerMsg.includes('cry')) {
      reply = "I'm sorry you're feeling this way. Your feelings are completely valid. Here are some gentle suggestions:\n\n• It's okay to cry - it releases stress hormones\n• Reach out to one person you trust\n• Do one small thing you normally enjoy\n• Get some sunlight if possible\n• Be kind to yourself - you're doing your best\n\nHow long have you been feeling this way?";
    } else if (lowerMsg.includes('track') || lowerMsg.includes('routine') || lowerMsg.includes('improve') || lowerMsg.includes('better')) {
      reply = "Great that you want to get back on track! Start with the 'Rule of Three':\n\n**Today, pick 3 small wins:**\n1. One thing for your body (drink water, stretch, walk)\n2. One thing for your mind (journal, read, meditate)\n3. One thing for your space (make bed, tidy desk, organize)\n\nSmall consistent actions build momentum. What's one thing you can do in the next 10 minutes?";
    } else if (lowerMsg.includes('sleep') || lowerMsg.includes('tired') || lowerMsg.includes('insomnia')) {
      reply = "Sleep is crucial for mental health. Try this tonight:\n\n**Wind-Down Routine (start 1 hour before bed):**\n• Dim the lights\n• No screens for 30 minutes before bed\n• Try the 4-7-8 breathing: inhale 4, hold 7, exhale 8\n• Keep room cool (65-68°F)\n• Write down tomorrow's worries, then close the notebook\n\nHow many hours are you currently sleeping?";
    } else if (lowerMsg.includes('lonely') || lowerMsg.includes('alone') || lowerMsg.includes('isolated')) {
      reply = "Loneliness is painful, but you're taking a brave step by reaching out. Action steps:\n\n1. Text or call one person today - even just to say hi\n2. Join an online community for your interests\n3. Volunteer (animal shelters are great for connection)\n4. Go to a coffee shop - just being around people helps\n5. Consider therapy - it's connection too\n\nWho is one person you could reach out to today?";
    } else if (lowerMsg.includes('help') || lowerMsg.includes('support') || lowerMsg.includes('need')) {
      reply = "I'm here for you. Asking for help is a sign of strength, not weakness. Here's what you can do:\n\n**Immediate Support:**\n• Crisis Text Line: Text HOME to 741741\n• National Suicide Prevention: 988\n• Your doctor or therapist\n\n**Self-care right now:**\n• Take 3 deep breaths\n• Drink a glass of water\n• Step outside for fresh air\n\nWhat kind of support would help you most right now?";
    } else if (lowerMsg.includes('angry') || lowerMsg.includes('mad') || lowerMsg.includes('frustrated') || lowerMsg.includes('rage')) {
      reply = "It's okay to feel angry. Anger tells us something is wrong. Here's how to manage it safely:\n\n**Cool down:**\n• Count to 10 slowly\n• Take 5 deep breaths\n• Step away from the situation\n• Do 10 jumping jacks or push-ups\n\n**Process it:**\n• Write down why you're angry (then tear it up if it helps)\n• Talk to someone you trust\n• Identify what you can control vs what you can't\n\nWhat's making you angry right now?";
    } else if (lowerMsg.includes('scared') || lowerMsg.includes('fear') || lowerMsg.includes('afraid') || lowerMsg.includes('terrified')) {
      reply = "Fear is your brain trying to protect you. Let's work through this:\n\n**Immediate calm:**\n• You are safe right now\n• Name 3 things you can see, hear, and touch\n• Put your hand on your heart, feel it beating - you're alive and okay\n\n**Next steps:**\n• Ask yourself: Is this danger real or imagined?\n• What's the worst that could happen? How likely is it?\n• Who can you call right now?\n\nWhat are you afraid of?";
    } else if (lowerMsg.includes('work') || lowerMsg.includes('job') || lowerMsg.includes('career') || lowerMsg.includes('boss')) {
      reply = "Work stress is real and valid. Here's a quick action plan:\n\n**Today:**\n• Take a 5-minute break every hour\n• Step outside for fresh air at lunch\n• Set boundaries - work ends at a specific time\n\n**This week:**\n• Make a list of what's in your control\n• Talk to your manager or HR if needed\n• Update your resume (it's empowering even if you stay)\n\nWhat's the biggest work stressor right now?";
    } else if (lowerMsg.includes('relationship') || lowerMsg.includes('partner') || lowerMsg.includes('spouse') || lowerMsg.includes('marriage')) {
      reply = "Relationship struggles are tough. Here's some guidance:\n\n**Immediate:**\n• Take space if you need it (that's healthy)\n• Don't make big decisions when emotional\n• Write down your feelings before talking\n\n**Communication tips:**\n• Use 'I feel...' instead of 'You always...'\n• Listen to understand, not to respond\n• Consider couples therapy - it's not giving up, it's trying\n\nWhat's the main issue in your relationship?";
    } else if (lowerMsg.includes('family') || lowerMsg.includes('parents') || lowerMsg.includes('siblings') || lowerMsg.includes('mother') || lowerMsg.includes('father')) {
      reply = "Family dynamics can be complex. Here's how to cope:\n\n**Boundaries are healthy:**\n• It's okay to limit contact if needed\n• You can love someone and still protect yourself\n• You don't owe anyone an explanation\n\n**Self-care:**\n• Talk to friends or a therapist about it\n• Remember: You can't change them, only your response\n• Build your chosen family if your biological one isn't supportive\n\nWhat's happening with your family?";
    } else if (lowerMsg.includes('money') || lowerMsg.includes('financial') || lowerMsg.includes('debt') || lowerMsg.includes('bills')) {
      reply = "Financial stress affects mental health deeply. Practical steps:\n\n**Right now:**\n• List all income and expenses\n• Identify 1 unnecessary expense to cut this week\n• Call creditors - they often have hardship programs\n\n**Resources:**\n• 211 - Free financial counseling\n• Local food banks and assistance programs\n• Credit counseling services (free/low-cost)\n\n**Remember:** Your worth isn't your bank account. What's the most pressing financial issue?";
    } else if (lowerMsg.includes('eating') || lowerMsg.includes('food') || lowerMsg.includes('appetite') || lowerMsg.includes('weight')) {
      reply = "Changes in eating can signal emotional distress. Please know:\n\n**If you're not eating:**\n• Try small, easy foods (crackers, soup, fruit)\n• Drink water - dehydration worsens mood\n• Set gentle reminders to eat\n\n**If you're overeating:**\n• Pause before eating: 'Am I hungry or feeling something?'\n• Keep a feelings journal\n• Practice self-compassion - no shame\n\n**Important:** If this is severe or you have an eating disorder, please reach out to NEDA (1-800-931-2237). How long has this been going on?";
    } else if (lowerMsg.includes('motivation') || lowerMsg.includes('lazy') || lowerMsg.includes('productive') || lowerMsg.includes('procrastination')) {
      reply = "Low motivation often signals burnout or depression. Let's reframe:\n\n**You're not lazy, you might be:**\n• Exhausted\n• Overwhelmed\n• Lacking clear goals\n• Needing rest\n\n**Tiny action plan:**\n• Do ONE thing for 5 minutes (set a timer)\n• Break big tasks into micro-steps\n• Celebrate small wins\n• Rest without guilt - it's productive\n\nWhat's one small thing you could do right now?";
    } else if (lowerMsg.includes('study') || lowerMsg.includes('exam') || lowerMsg.includes('test') || lowerMsg.includes('school') || lowerMsg.includes('college')) {
      reply = "Study stress is real! Here's a proven study strategy:\n\n**Active Learning:**\n• Study in 25-min blocks (Pomodoro technique)\n• Take 5-min breaks between blocks\n• Teach the material to someone (even yourself out loud)\n• Practice problems > reading notes\n\n**Before exams:**\n• Sleep 7-8 hours (cramming doesn't work)\n• Eat protein for brain fuel\n• Review notes within 24 hours of learning\n• Practice past papers\n\n**Stress management:**\n• Deep breathing before tests\n• 'I've prepared, I'll do my best' mindset\n\nWhat subject are you struggling with?";
    } else if (lowerMsg.includes('career') || lowerMsg.includes('job search') || lowerMsg.includes('interview') || lowerMsg.includes('resume')) {
      reply = "Career decisions are tough! Here's practical guidance:\n\n**Job Search:**\n• Quality > Quantity: 5 tailored applications beat 50 generic ones\n• Use LinkedIn - connect with people in your target roles\n• Informational interviews - ask for advice, not jobs\n• Follow up after applying (polite persistence)\n\n**Interview prep:**\n• Research the company thoroughly\n• Prepare STAR stories (Situation, Task, Action, Result)\n• Ask questions - show genuine interest\n• Follow up within 24 hours\n\n**Career clarity:**\n• What do you enjoy doing? (not what pays most)\n• Who do you want to become in 5 years?\n• Informational interviews in fields you're curious about\n\nWhat's your biggest career question right now?";
    } else if (lowerMsg.includes('purpose') || lowerMsg.includes('meaning') || lowerMsg.includes('why') || lowerMsg.includes('lost')) {
      reply = "Feeling lost is part of growth. Let's find your direction:\n\n**Reflection questions:**\n• What did you love doing as a child?\n• When do you lose track of time?\n• What problems do you want to solve in the world?\n• Who do you admire and why?\n\n**Action steps:**\n• Try 3 new things this month\n• Volunteer - helping others reveals purpose\n• Journal daily: 'What felt meaningful today?'\n• Read biographies of people you admire\n\n**Remember:**\n• Purpose isn't found, it's built through action\n• It's okay to not know yet\n• Your purpose can evolve\n\nWhat area of life feels most confusing right now?";
    } else if (lowerMsg.includes('decision') || lowerMsg.includes('choice') || lowerMsg.includes('should i')) {
      reply = "Tough decision ahead? Here's a decision-making framework:\n\n**Clarity exercise:**\n1. Write down both options\n2. For each, list: Pros, Cons, Fears, Excitement\n3. Imagine choosing Option A - how do you feel in 1 year?\n4. Imagine choosing Option B - how do you feel in 1 year?\n5. Which future feels more aligned with your values?\n\n**Questions to ask:**\n• Which choice scares me more? (Often the right one!)\n• What would I regret NOT doing?\n• Am I choosing based on fear or growth?\n• What would I tell my best friend to do?\n\n**Pro tip:** Flip a coin. If you feel disappointed, you know what you really want.\n\nWhat decision are you facing?";
    } else if (lowerMsg.includes('confidence') || lowerMsg.includes('self esteem') || lowerMsg.includes('not good enough')) {
      reply = "You ARE good enough. Confidence is built, not found. Here's how:\n\n**Daily practices:**\n• List 3 things you did well today (no matter how small)\n• Stop comparing - you're comparing your behind-the-scenes to others' highlight reel\n• Speak to yourself like you would to a friend\n• Celebrate effort, not just outcomes\n\n**Confidence builders:**\n• Do one thing that scares you weekly\n• Learn a new skill (proves you CAN grow)\n• Help someone (reminds you of your value)\n• Physical exercise (changes brain chemistry)\n\n**Reality check:**\n• Everyone feels like an imposter sometimes\n• 'Confidence' people are scared too - they just act anyway\n• Your value isn't your achievements\n\nWhat makes you doubt yourself most?";
    } else if (lowerMsg.includes('time') || lowerMsg.includes('busy') || lowerMsg.includes('schedule') || lowerMsg.includes('organize')) {
      reply = "Time management is life management. Here's a system:\n\n**Priority Matrix:**\n• Important & Urgent → Do NOW\n• Important & Not Urgent → Schedule it\n• Not Important & Urgent → Delegate or minimize\n• Not Important & Not Urgent → Eliminate\n\n**Daily system:**\n• Night before: Pick your TOP 3 tasks for tomorrow\n• Morning: Do hardest task first (eat the frog)\n• Time-block your calendar (treat commitments like meetings)\n• Say NO to protect your YES\n\n**Energy management:**\n• Work when you're most alert (mornings for most people)\n• Batch similar tasks together\n• Use 'dead time' (commute = audiobooks/podcasts)\n\n**Truth:** You have time for what you prioritize. What's currently eating your time?";
    } else if (lowerMsg.includes('friend') || lowerMsg.includes('social') || lowerMsg.includes('people')) {
      reply = "Friendships and social connections matter deeply. Here's guidance:\n\n**Making friends:**\n• Join groups around interests (hobby clubs, sports, volunteer)\n• Be the initiator - invite people to coffee\n• Ask questions - people like those interested in them\n• Consistency > intensity - regular small hangouts build bonds\n\n**Maintaining friendships:**\n• Check in regularly (text, call - don't wait for 'the right time')\n• Be vulnerable - share struggles, not just successes\n• Show up - actions > words\n• Forgive small stuff - everyone's dealing with something\n\n**When friendships hurt:**\n• Healthy friendships are reciprocal\n• It's okay to outgrow people\n• Quality > quantity always\n• You deserve friends who celebrate you\n\nWhat's your friendship challenge?";
    } else if (lowerMsg.includes('habit') || lowerMsg.includes('discipline') || lowerMsg.includes('consistent')) {
      reply = "Building habits is science, not willpower! Here's the formula:\n\n**Tiny Habits Method:**\n1. Start TINY (1 pushup, 1 page, 2 minutes)\n2. Anchor to existing habit ('After I brush teeth, I'll...')\n3. Celebrate immediately (fist pump, 'yes!')\n4. Gradually increase\n\n**Environment design:**\n• Make good habits obvious (put gym clothes out)\n• Make bad habits invisible (hide phone, delete apps)\n• Make good habits easy (prep meals Sunday)\n• Make bad habits hard (unplug TV)\n\n**Mindset:**\n• Focus on identity: 'I'm a person who exercises' not 'I need to exercise'\n• Never miss twice (slip-ups happen, don't make it a pattern)\n• Track it visually (X on calendar)\n\n**Reality:** It takes 66 days average, not 21. Be patient.\n\nWhat habit do you want to build?";
    } else if (lowerMsg.includes('learn') || lowerMsg.includes('skill') || lowerMsg.includes('improve') || lowerMsg.includes('grow')) {
      reply = "Learning is a superpower! Here's how to learn anything:\n\n**Accelerated learning:**\n• 20-hour rule: 20 hours of focused practice = basic competency\n• Break skill into sub-skills\n• Learn enough to self-correct\n• Practice the most common 20% (gives 80% results)\n\n**Study techniques:**\n• Active recall > passive reading (quiz yourself)\n• Spaced repetition (review at increasing intervals)\n• Teach it to others (Feynman technique)\n• Practice > theory (do, don't just read)\n\n**Resources:**\n• YouTube for basics (free!)\n• Coursera/edX for structured learning\n• Books > courses (deeper understanding)\n• Find a mentor or community\n\n**Mindset:**\n• Embrace struggle - it means you're growing\n• Progress > perfection\n• Consistency beats intensity\n\nWhat do you want to learn?";
    } else {
      reply = "I hear you. Let me offer some practical support:\n\n**Right now, you can:**\n1. Take 3 slow, deep breaths\n2. Name what you're feeling (stressed, sad, worried?)\n3. Do one small thing to care for yourself\n\nCould you tell me more specifically what you're experiencing? For example:\n- Are you feeling anxious, sad, or stressed?\n- Are you having physical symptoms?\n- What would help you feel even 1% better right now?";
    }
    
    console.log(`Reply generated (${reply.length} chars)`);
    res.json({ reply });
    
  } catch (err) {
    console.error('Error in /api/chat:', err);
    res.status(500).json({ error: 'Server error, check logs' });
  }
});

const PORT = process.env.PORT || 3333;
app.listen(PORT, '0.0.0.0', () => {
  console.log(`✅ Backend successfully running on http://localhost:${PORT}`);
  console.log(`✅ Test with: POST http://localhost:${PORT}/api/chat`);
});
