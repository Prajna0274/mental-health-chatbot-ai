# Mental Health AI Chatbot

A compassionate mental health support chatbot with a modern web interface and NestJS backend.

## Project Structure

```
mental-health-ai-chatbot/
├── backend/          # NestJS API server
│   ├── src/
│   │   ├── main.ts
│   │   ├── app.module.ts
│   │   ├── health.controller.ts
│   │   ├── rate-limit.middleware.ts
│   │   └── chat/
│   │       ├── chat.controller.ts
│   │       ├── chat.service.ts
│   │       └── chat.module.ts
│   ├── package.json
│   └── README.md
└── frontend/         # Web chat interface
    ├── index.html
    ├── styles.css
    ├── app.js
    └── README.md
```

## Quick Start

### 1. Backend Setup

```powershell
# Navigate to backend
Set-Location 'C:\Users\prasa\OneDrive\Desktop\mental-health-ai-chatbot\backend'

# Install dependencies
npm install

# Start dev server
$env:PORT=3333; npm run dev
```

The backend will run on `http://localhost:3333`

### 2. Frontend Setup

Simply open the frontend in your browser:

```powershell
Start-Process 'C:\Users\prasa\OneDrive\Desktop\mental-health-ai-chatbot\frontend\index.html'
```

Or use a local server:

```powershell
Set-Location 'C:\Users\prasa\OneDrive\Desktop\mental-health-ai-chatbot\frontend'
npx live-server
```

## Features

### Backend
- ✅ RESTful API with NestJS
- ✅ `/health` and `/health/details` endpoints
- ✅ `POST /api/chat` - chat endpoint
- ✅ Request validation and logging
- ✅ Rate limiting (30 req/min per IP)
- ✅ CORS enabled
- ✅ Safe fallback responses (works without OpenAI)
- ✅ Optional OpenAI integration

### Frontend
- ✅ Modern, responsive chat UI
- ✅ Real-time messaging
- ✅ Loading indicators
- ✅ Error handling
- ✅ Smooth animations
- ✅ Keyboard shortcuts

## Optional: OpenAI Integration

To enable AI-powered responses:

```powershell
# Set your API key before starting backend
$env:OPENAI_API_KEY='your-api-key-here'
$env:PORT=3333
npm run dev
```

Without an API key, the chatbot uses supportive fallback responses.

## Testing

### Backend Health Check
```powershell
Invoke-RestMethod -Uri "http://localhost:3333/health"
```

### Backend Details
```powershell
Invoke-RestMethod -Uri "http://localhost:3333/health/details"
```

### Chat Endpoint
```powershell
$body = @{ message = "I feel stressed" } | ConvertTo-Json
Invoke-RestMethod -Method POST -Uri "http://localhost:3333/api/chat" -Body $body -ContentType "application/json"
```

## Production Build

```powershell
# Build backend
Set-Location 'C:\Users\prasa\OneDrive\Desktop\mental-health-ai-chatbot\backend'
npm run build

# Run production server
node .\dist\main.js
```

## Notes

- Backend uses `gpt-4o-mini` model when OpenAI key is configured
- Rate limiting prevents abuse (30 requests/minute per IP)
- All chat requests are logged for debugging
- Frontend requires backend to be running on port 3333
- CORS is enabled for local development

## Support & Safety

⚠️ **Important**: This is a supportive companion, NOT a replacement for professional mental health care. If you're in crisis, please contact:
- Emergency Services: 911 (US)
- National Suicide Prevention Lifeline: 988
- Crisis Text Line: Text HOME to 741741

## License

MIT
