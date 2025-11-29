import { Controller, Get } from '@nestjs/common';

@Controller('health')
export class HealthController {
  @Get()
  getHealth() {
    return { status: 'ok' };
  }

  @Get('details')
  getDetails() {
    const port = process.env.PORT || 3333;
    const openai = process.env.OPENAI_API_KEY ? 'configured' : 'not-configured';
    return {
      status: 'ok',
      port,
      openai,
      timestamp: new Date().toISOString(),
    };
  }
}
