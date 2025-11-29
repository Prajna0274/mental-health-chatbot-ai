import { NextResponse } from 'next/server'
import { createClient } from '@/lib/supabase/server'

export async function GET() {
  try {
    const supabase = await createClient()

    const { data: journals, error } = await supabase
      .from('journals')
      .select('*')
      .order('created_at', { ascending: false })

    if (error) throw error

    return NextResponse.json({ journals })
  } catch (error: any) {
    console.error('Error fetching journals:', error)
    return NextResponse.json(
      { error: error.message || 'Failed to fetch journals' },
      { status: 500 }
    )
  }
}

export async function POST(request: Request) {
  try {
    const supabase = await createClient()

    const { title, content } = await request.json()

    if (!content) {
      return NextResponse.json(
        { error: 'Content is required' },
        { status: 400 }
      )
    }

    // Insert journal directly without user validation (demo mode)
    const { data: journal, error } = await supabase
      .from('journals')
      .insert([
        {
          title: title || null,
          content,
        },
      ])
      .select()
      .single()

    if (error) throw error

    return NextResponse.json({ journal }, { status: 201 })
  } catch (error: any) {
    console.error('Error creating journal:', error)
    return NextResponse.json(
      { error: error.message || 'Failed to create journal' },
      { status: 500 }
    )
  }
}
