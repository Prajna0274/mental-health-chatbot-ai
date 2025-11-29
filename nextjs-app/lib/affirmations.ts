export const affirmations = [
  "You are worthy of love and happiness.",
  "Your feelings are valid and important.",
  "You have the strength to overcome challenges.",
  "Every day is a fresh start and a new opportunity.",
  "You are doing better than you think.",
  "It's okay to take things one step at a time.",
  "You deserve rest and self-care.",
  "Your mental health matters.",
  "You are not alone in your journey.",
  "Progress, not perfection, is what matters.",
  "You are capable of amazing things.",
  "It's okay to ask for help when you need it.",
  "You are enough, just as you are.",
  "Your story is still being written.",
  "You have survived 100% of your worst days.",
  "Small steps forward are still progress.",
  "You deserve compassion, especially from yourself.",
  "Your mental health is just as important as your physical health.",
  "You are brave for facing each day.",
  "Healing is not linear, and that's okay.",
  "You are allowed to take up space.",
  "Your presence in this world makes a difference.",
  "It's okay to not be okay sometimes.",
  "You have the power to create positive change.",
  "You are stronger than you know.",
]

export function getRandomAffirmation(): string {
  return affirmations[Math.floor(Math.random() * affirmations.length)]
}

export function getDailyAffirmation(date: Date = new Date()): string {
  // Get consistent affirmation for the day based on date
  const dayIndex = date.getDate() % affirmations.length
  return affirmations[dayIndex]
}
