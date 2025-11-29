import { NextResponse } from 'next/server'
import { createClient } from '@/lib/supabase/server'

export async function GET() {
  try {
    const supabase = await createClient()
    
    // Temporarily bypass auth - get all moods
    const thirtyDaysAgo = new Date()
    thirtyDaysAgo.setDate(thirtyDaysAgo.getDate() - 30)

    const { data: moods, error } = await supabase
      .from('moods')
      .select('*')
      .gte('created_at', thirtyDaysAgo.toISOString())
      .order('created_at', { ascending: true })

    if (error) throw error

    return NextResponse.json({ moods: moods || [] })
  } catch (error: any) {
    console.error('Error fetching moods:', error)
    return NextResponse.json(
      { error: error.message || 'Failed to fetch moods' },
      { status: 500 }
    )
  }
}

export async function POST(request: Request) {
  try {
    const supabase = await createClient()

    const { mood_value, notes } = await request.json()

    if (!mood_value || mood_value < 1 || mood_value > 10) {
      return NextResponse.json(
        { error: 'Mood value must be between 1 and 10' },
        { status: 400 }
      )
    }

    // Insert mood directly without user validation (demo mode)
    const { data: mood, error } = await supabase
      .from('moods')
      .insert([
        {
          mood_value,
          notes: notes || null,
        },
      ])
      .select()
      .single()

    if (error) {
      console.error('Supabase error:', error)
      throw error
    }

    return NextResponse.json({ mood }, { status: 201 })
  } catch (error: any) {
    console.error('Error creating mood:', error)
    return NextResponse.json(
      { error: error.message || 'Failed to create mood' },
      { status: 500 }
    )
  }
}
