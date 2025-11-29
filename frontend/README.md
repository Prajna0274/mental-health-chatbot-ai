# Mental Health AI Chatbot - Frontend

A simple, compassionate chat interface for mental health support.

## Setup

1. Make sure the backend is running on `http://localhost:3333`

2. Open `index.html` in your browser:
   ```powershell
   # Option 1: Open directly
   Start-Process 'C:\Users\prasa\OneDrive\Desktop\mental-health-ai-chatbot\frontend\index.html'
   
   # Option 2: Use a local server (recommended for development)
   # Install live-server globally if you don't have it:
   npm install -g live-server
   
   # Then run from frontend folder:
   Set-Location 'C:\Users\prasa\OneDrive\Desktop\mental-health-ai-chatbot\frontend'
   live-server
   ```

## Features

- Clean, modern chat interface
- Real-time messaging with the backend
- Loading indicators
- Error handling
- Keyboard shortcuts (Enter to send, Shift+Enter for new line)
- Responsive design
- Smooth animations

## Files

- `index.html` - Main HTML structure
- `styles.css` - Styling and animations
- `app.js` - Chat logic and API calls
