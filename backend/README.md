# Mental Health Backend

A minimal NestJS backend exposing:
- `GET /health` – health check
- `POST /api/chat` – returns a supportive reply; uses OpenAI if `OPENAI_API_KEY` is set, otherwise a safe fallback

## Prerequisites
- Node.js 18+
- PowerShell (Windows) or Bash (macOS/Linux)

## Install
```powershell
Set-Location 'C:\\Users\\prasa\\OneDrive\\Desktop\\mental-health-ai-chatbot\\backend'
npm install
```

## Run (dev)
```powershell
Set-Location 'C:\\Users\\prasa\\OneDrive\\Desktop\\mental-health-ai-chatbot\\backend'
$env:PORT=3333; npm run dev
```

## Run (build + start)
```powershell
Set-Location 'C:\\Users\\prasa\\OneDrive\\Desktop\\mental-health-ai-chatbot\\backend'
npm run build
node .\\dist\\main.js
```

## Test endpoints
Health:
```powershell
Invoke-RestMethod -Method GET -Uri "http://localhost:3333/health" | ConvertTo-Json -Depth 5
```

Chat:
```powershell
$uri = "http://localhost:3333/api/chat"
$bodyObj = @{ message = "I feel stressed" }
$body = $bodyObj | ConvertTo-Json
Invoke-RestMethod -Method POST -Uri $uri -Body $body -ContentType "application/json" | ConvertTo-Json -Depth 5
```

## OpenAI (optional)
Set your API key before starting the server to enable AI-generated replies:
```powershell
$env:OPENAI_API_KEY = 'your-api-key-here'
$env:PORT = 3333
npm run dev
```

## Notes
- Validation is enabled and expects payload `{ "message": "..." }` as a string.
- Logging in `ChatController` prints incoming messages and reply length.
- CORS is enabled.
# Mental Health Chatbot — Backend

This is a minimal NestJS + TypeScript backend scaffold for a mental-health companion chatbot.

Quick start (PowerShell):

```powershell
cd backend
npm install
# development
npm run dev
# build
npm run build
npm start
```

Notes:
- Add your `OPENAI_API_KEY` (or other provider keys) in environment variables — see `.env.example`.
- This scaffold returns a mocked supportive reply; integrate your LLM provider in `src/chat/chat.service.ts`.
- Follow the hardening checklist in the project docs before production.
