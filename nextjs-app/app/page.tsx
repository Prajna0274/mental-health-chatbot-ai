import { redirect } from 'next/navigation'

export default async function Home() {
  // Temporarily bypass auth to show the app
  redirect('/dashboard')
}
