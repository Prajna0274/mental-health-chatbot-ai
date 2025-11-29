import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';

async function bootstrap() {
  try {
    const app = await NestFactory.create(AppModule, { 
      logger: ['error', 'warn', 'log'],
      cors: true
    });
    
    const port = process.env.PORT || 3333;
    await app.listen(port, '0.0.0.0');
    console.log(`✅ Backend successfully running on http://localhost:${port}`);
    console.log(`✅ Test with: POST http://localhost:${port}/api/chat`);
  } catch (error) {
    console.error('❌ Failed to start server:', error);
    process.exit(1);
  }
}

bootstrap();
