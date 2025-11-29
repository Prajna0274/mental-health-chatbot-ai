import { Controller, Post, Body, Logger, Res, HttpStatus } from '@nestjs/common';
import { ChatService } from './chat.service';
import { Response } from 'express';

@Controller('api/chat')
export class ChatController {
  private readonly logger = new Logger('ChatController');

  constructor(private readonly chatService: ChatService) {}

  @Post()
  async chat(@Body() body: any, @Res() res: Response) {
    try {
      const { message } = body;

      if (!message) {
        return res.status(400).json({ error: "Message missing" });
      }

      this.logger.log(`Incoming message: ${message}`);
      const reply = await this.chatService.generateReply(message);
      this.logger.log(`Reply generated (${reply.length} chars)`);
      
      return res.json({ reply });
    } catch (err) {
      this.logger.error("Error in /api/chat:", err);
      return res.status(500).json({ error: "Server crashed, check logs" });
    }
  }
}
