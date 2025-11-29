import { NextResponse } from 'next/server'

async function getChatResponse(userMessage: string): Promise<string> {
  try {
    // Use Groq AI - super fast and free
    const response = await fetch('https://api.groq.com/openai/v1/chat/completions', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        'Authorization': `Bearer ${process.env.GROQ_API_KEY}`,
      },
      body: JSON.stringify({
        model: 'llama-3.3-70b-versatile',
        messages: [
          {
            role: 'system',
            content: 'You are a helpful, friendly AI assistant. Answer questions accurately and conversationally. Be supportive when discussing mental health topics.'
          },
          {
            role: 'user',
            content: userMessage
          }
        ],
        temperature: 0.7,
        max_tokens: 500,
      }),
    })

    const data = await response.json()
    
    console.log('Groq API response:', JSON.stringify(data, null, 2))
    
    if (!response.ok) {
      console.error('Groq API error:', data)
      throw new Error(`Groq API error: ${data.error?.message || 'Unknown error'}`)
    }
    
    if (data.choices && data.choices[0] && data.choices[0].message) {
      return data.choices[0].message.content.trim()
    }

    throw new Error('No response from AI')
  } catch (error: any) {
    console.error('AI error:', error)
    console.error('Error details:', error.message)
    return "I'm having trouble connecting to the AI service. Please try again!"
  }
}

export async function POST(request: Request) {
  try {
    const { message } = await request.json()

    if (!message) {
      return NextResponse.json(
        { error: 'Message is required' },
        { status: 400 }
      )
    }

    // Get AI response
    const aiResponse = await getChatResponse(message)

    return NextResponse.json({
      message: aiResponse,
      conversationId: 'local-' + Date.now(),
    })
  } catch (error: any) {
    console.error('Error in chat API:', error)
    return NextResponse.json(
      { error: error.message || 'Failed to process chat message' },
      { status: 500 }
    )
  }
}

export async function GET() {
  return NextResponse.json({ error: 'Method not allowed' }, { status: 405 })
}
