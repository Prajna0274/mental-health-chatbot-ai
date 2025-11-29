import { NextResponse } from 'next/server'
import { createClient } from '@/lib/supabase/server'

export async function GET() {
  try {
    const supabase = await createClient()

    const thirtyDaysAgo = new Date()
    thirtyDaysAgo.setDate(thirtyDaysAgo.getDate() - 30)

    const { data: checkIns, error } = await supabase
      .from('check_ins')
      .select('*')
      .gte('check_in_date', thirtyDaysAgo.toISOString().split('T')[0])
      .order('check_in_date', { ascending: false })

    if (error) throw error

    // Calculate streak
    const sortedCheckIns = (checkIns || []).sort((a, b) => 
      new Date(b.check_in_date).getTime() - new Date(a.check_in_date).getTime()
    )

    let streak = 0
    const today = new Date().toISOString().split('T')[0]
    const yesterday = new Date()
    yesterday.setDate(yesterday.getDate() - 1)
    const yesterdayStr = yesterday.toISOString().split('T')[0]

    if (sortedCheckIns.length > 0) {
      const lastCheckIn = sortedCheckIns[0].check_in_date

      if (lastCheckIn === today || lastCheckIn === yesterdayStr) {
        let currentDate = new Date(lastCheckIn)
        let i = 0

        while (i < sortedCheckIns.length) {
          const checkInDate = sortedCheckIns[i].check_in_date
          const expectedDate = currentDate.toISOString().split('T')[0]

          if (checkInDate === expectedDate) {
            streak++
            currentDate.setDate(currentDate.getDate() - 1)
            i++
          } else {
            break
          }
        }
      }
    }

    return NextResponse.json({ checkIns, streak })
  } catch (error: any) {
    console.error('Error fetching check-ins:', error)
    return NextResponse.json(
      { error: error.message || 'Failed to fetch check-ins' },
      { status: 500 }
    )
  }
}

export async function POST() {
  try {
    const supabase = await createClient()

    const today = new Date().toISOString().split('T')[0]

    const { data: checkIn, error } = await supabase
      .from('check_ins')
      .upsert([
        {
          check_in_date: today,
          checked_in: true,
        },
      ], {
        onConflict: 'check_in_date'
      })
      .select()
      .single()

    if (error) throw error

    return NextResponse.json({ checkIn }, { status: 201 })
  } catch (error: any) {
    console.error('Error creating check-in:', error)
    return NextResponse.json(
      { error: error.message || 'Failed to create check-in' },
      { status: 500 }
    )
  }
}
