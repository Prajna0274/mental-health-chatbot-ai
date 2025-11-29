import { Injectable, Logger } from '@nestjs/common';
import OpenAI from 'openai';

const logger = new Logger('ChatService');

@Injectable()
export class ChatService {
  private client: OpenAI | null = null;

  constructor() {
    const key = process.env.OPENAI_API_KEY;
    if (key) {
      this.client = new OpenAI({ apiKey: key });
      logger.log('OpenAI client initialized');
    } else {
      logger.warn('OPENAI_API_KEY not set — using fallback responses');
    }
  }

  async generateReply(message: string): Promise<string> {
    if (!this.client) {
      // Fallback supportive reply when no API key provided
      return `Thanks for sharing. I'm here to listen — you said: "${message}". How can I support you right now?`;
    }

    try {
      // Basic system prompt to instruct the assistant to be a supportive companion
      const systemPrompt = `You are a compassionate, non-judgmental mental health support companion. Provide supportive, empathetic, non-clinical responses. If the user expresses imminent self-harm or danger, respond with a crisis escalation message and provide emergency resources without providing instructions for self-harm.`;

      const resp = await this.client.chat.completions.create({
        model: 'gpt-4o-mini',
        messages: [
          { role: 'system', content: systemPrompt },
          { role: 'user', content: message },
        ],
        max_tokens: 300,
        temperature: 0.7,
      });

      const content = resp.choices?.[0]?.message?.content;
      if (!content) return "I'm here to listen, but I couldn't form a reply — can you tell me more?";
      return content;
    } catch (err) {
      logger.error('OpenAI request failed', err as any);
      // Fallback to safe reply
      return `Thanks for sharing. I'm here to listen — you said: "${message}". How can I support you right now?`;
    }
  }
}
