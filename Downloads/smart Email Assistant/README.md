# 🚀 Smart Email Assistant - AI-Powered Email Reply Generator

[![GitHub](https://img.shields.io/badge/GitHub-AiEmailReplyGenerator-blue?logo=github)](https://github.com/Swagat-190/AiEmailReplyGenerator)
[![License](https://img.shields.io/badge/License-MIT-green)](LICENSE)
[![Java](https://img.shields.io/badge/Java-21-red?logo=java)](https://www.java.com/)
[![Spring Boot](https://img.shields.io/badge/Spring%20Boot-3.x-green?logo=spring)](https://spring.io/projects/spring-boot)
[![React](https://img.shields.io/badge/React-18-blue?logo=react)](https://react.dev/)
[![Chrome Extension](https://img.shields.io/badge/Chrome%20Extension-Manifest%20V3-yellow?logo=googlechrome)](https://developer.chrome.com/docs/extensions/)

An intelligent email assistant that uses **Google's Gemini AI** to automatically generate professional email replies. Choose from multiple email tones and integrate seamlessly with Gmail via a Chrome extension.

---

## 📋 Table of Contents

- [Features](#features)
- [Project Architecture](#project-architecture)
- [Prerequisites](#prerequisites)
- [Installation](#installation)
- [Configuration](#configuration)
- [Usage](#usage)
- [API Documentation](#api-documentation)
- [Project Structure](#project-structure)
- [Technologies Used](#technologies-used)
- [Contributing](#contributing)
- [Troubleshooting](#troubleshooting)
- [License](#license)

---

## ✨ Features

### Backend Features
- 🤖 **AI-Powered Replies** - Uses Google Gemini 3 Flash API for intelligent email generation
- 📝 **Multiple Tone Support** - Generate emails in Professional, Formal, Casual, Friendly, or Apologetic tones
- 🔄 **RESTful API** - Clean REST endpoints for email generation
- 🛡️ **CORS Enabled** - Cross-origin support for frontend and extension integration
- ⚡ **Reactive Web Client** - Non-blocking HTTP calls using Spring WebClient

### Frontend (React Web App)
- 🎨 **Modern UI** - Material-UI components with gradient styling
- 📱 **Responsive Design** - Works on desktop and tablet devices
- 💾 **Real-time Processing** - Instant feedback with loading states
- 📋 **Text Editing** - Easy-to-use text areas for input and output
- 🎯 **Tone Selection** - Dropdown to choose email tone

### Chrome Extension
- 🧩 **Gmail Integration** - Native integration with Gmail inbox
- 🔘 **One-Click Generation** - Generate replies directly from email view
- 📧 **Auto-Injection** - Automatically inserts generated replies into compose box
- 🎨 **Native Styling** - Matches Gmail's design language seamlessly
- 🔔 **User Notifications** - Toast notifications for success/error states

---

## 🏗️ Project Architecture

```
┌─────────────────────────────────────────────────────────┐
│                    Gmail (Browser)                      │
│                                                         │
│  ┌──────────────────────────────────────────────────┐  │
│  │      Chrome Extension (Manifest V3)              │  │
│  │  • content-script.js                             │  │
│  │  • Injects "Generate with AI" button             │  │
│  │  • Captures email content                        │  │
│  │  • Auto-fills reply box                          │  │
│  └──────────────────────────────────────────────────┘  │
└─────────────────────────────────────────────────────────┘
                          │
                          │ HTTP POST
                          │ /api/email/generate
                          ▼
┌─────────────────────────────────────────────────────────┐
│          Spring Boot Backend (Port 8080)                │
│                                                         │
│  ┌──────────────────────────────────────────────────┐  │
│  │         EmailController                          │  │
│  │  @PostMapping("/api/email/generate")             │  │
│  │  • Receives email text & tone                    │  │
│  │  • Validates request                             │  │
│  │  • Returns generated reply                       │  │
│  └──────────────────────────────────────────────────┘  │
│                          │                              │
│                          ▼                              │
│  ┌──────────────────────────────────────────────────┐  │
│  │         EmailService                             │  │
│  │  • generateEmail(EmailRequest)                   │  │
│  │  • Builds AI prompt                              │  │
│  │  • Calls Gemini API                              │  │
│  │  • Parses AI response                            │  │
│  └──────────────────────────────────────────────────┘  │
└─────────────────────────────────────────────────────────┘
                          │
                          │ HTTPS
                          │ api.gemini.google.com
                          ▼
┌─────────────────────────────────────────────────────────┐
│      Google Gemini 3 Flash API (Cloud)                  │
│  • Processes natural language                           │
│  • Generates intelligent replies                        │
│  • Supports custom tones                                │
└─────────────────────────────────────────────────────────┘
```

---

## 📦 Prerequisites

### System Requirements
- **Windows 10/11** or **macOS/Linux**
- **Java 21+** (JDK)
- **Node.js 16+** and **npm**
- **Google Chrome** (for extension)
- **Git**

### API Requirements
- **Google Gemini API Key** - [Get it here](https://ai.google.dev/)

---

## 🛠️ Installation

### 1️⃣ Clone the Repository

```bash
git clone https://github.com/Swagat-190/AiEmailReplyGenerator.git
cd "smart Email Assistant"
```

### 2️⃣ Setup Backend (Spring Boot)

```bash
cd Email-Assistant

# Windows
mvnw.cmd spring-boot:run

# macOS/Linux
./mvnw spring-boot:run
```

The backend will start on **http://localhost:8080**

### 3️⃣ Setup Frontend (React)

```bash
cd ../Email-Assistant-Frontend

# Install dependencies
npm install

# Start development server
npm run dev
```

The frontend will be available at **http://localhost:5173**

### 4️⃣ Install Chrome Extension

1. Open **chrome://extensions/**
2. Enable **Developer Mode** (top-right toggle)
3. Click **Load unpacked**
4. Navigate to `EmailWriter-Extension/` folder
5. Extension will be installed and active

---

## ⚙️ Configuration

### Backend Configuration

Edit `Email-Assistant/src/main/resources/application.properties`:

```properties
# Gemini API Configuration
gemini.api.url=https://generativelanguage.googleapis.com
gemini.api.key=YOUR_GOOGLE_GEMINI_API_KEY

# Server Configuration
server.port=8080

# Logging
logging.level.root=INFO
logging.level.com.example.Email.Assistant=DEBUG
```

### Get Your Gemini API Key

1. Go to [Google AI Studio](https://ai.google.dev/)
2. Click **Create API Key**
3. Copy the key
4. Paste in `application.properties`

### Frontend Configuration

The frontend is pre-configured to call `http://localhost:8080/api/email/generate`

To change the backend URL, edit `Email-Assistant-Frontend/src/App.jsx`:

```javascript
const res = await fetch('http://localhost:8080/api/email/generate', {
  // ... rest of the request
});
```

---

## 📖 Usage

### 🌐 Using the Web Frontend

1. **Start Backend & Frontend** (see Installation)
2. **Open** http://localhost:5173
3. **Paste** the email you want to reply to
4. **Select** email tone (Optional)
5. **Click** "Generate Reply"
6. **Edit** the generated reply as needed
7. **Copy** and use in your email client

### 📧 Using Chrome Extension (Gmail)

1. **Open Gmail** in Chrome
2. **Click** on any email to open it
3. **Look for** "Generate with AI" button (left of Reply button)
4. **Click** the button
5. **Wait** for the AI to generate a reply
6. **Click** Reply button on the email
7. **AI reply appears** automatically in compose box
8. **Edit & Send** as needed

#### Extension Workflow Diagram
```
┌─────────────────┐
│  Open Email     │
│  in Gmail       │
└────────┬────────┘
         │
         ▼
┌─────────────────────────────────┐
│ "Generate with AI" Button       │
│ (appears next to Reply button)   │
└────────┬────────────────────────┘
         │ Click
         ▼
┌─────────────────────────────────┐
│ Button Shows "⏳ Generating..."   │
│ Sends email content to backend   │
└────────┬────────────────────────┘
         │
         ▼ (Response received)
┌─────────────────────────────────┐
│ "✅ Reply generated!"            │
│ (Toast notification)             │
└────────┬────────────────────────┘
         │ Click Reply button
         ▼
┌─────────────────────────────────┐
│ Compose Window Opens             │
│ AI reply auto-fills in textbox   │
└────────┬────────────────────────┘
         │
         ▼
┌─────────────────────────────────┐
│ Edit & Customize Reply           │
│ Click Send                       │
└─────────────────────────────────┘
```

---

## 🔌 API Documentation

### POST `/api/email/generate`

**Generate an AI-powered email reply**

#### Request

```bash
curl -X POST http://localhost:8080/api/email/generate \
  -H "Content-Type: application/json" \
  -d '{
    "text": "Hi, I wanted to check on the project status...",
    "type": "professional"
  }'
```

#### Request Body

```json
{
  "text": "string",    // Original email content (required)
  "type": "string"    // Email tone (optional)
}
```

**Supported Tones:**
- `professional` - Professional business tone
- `formal` - Formal and respectful
- `casual` - Casual and friendly
- `friendly` - Warm and personable
- `apologetic` - Apologetic and understanding
- Leave empty for default tone

#### Response

```json
"Dear [Name],\n\nThank you for reaching out. We are currently working on the project and will provide an update soon...\n\nBest regards"
```

**Status Codes:**
- `200 OK` - Successfully generated reply
- `400 Bad Request` - Invalid request body
- `500 Internal Server Error` - API or backend error

#### Example Usage

**JavaScript/Fetch:**
```javascript
const response = await fetch('http://localhost:8080/api/email/generate', {
  method: 'POST',
  headers: {
    'Content-Type': 'application/json',
  },
  body: JSON.stringify({
    text: "How are you doing? Let's catch up...",
    type: "friendly"
  })
});

const reply = await response.text();
console.log(reply);
```

**Python:**
```python
import requests

response = requests.post(
    'http://localhost:8080/api/email/generate',
    json={
        'text': 'How are you doing? Let\'s catch up...',
        'type': 'friendly'
    }
)

print(response.text)
```

---

## 📁 Project Structure

```
smart Email Assistant/
│
├── Email-Assistant/                          # Spring Boot Backend
│   ├── src/
│   │   ├── main/
│   │   │   ├── java/com/example/Email/Assistant/
│   │   │   │   ├── EmailAssistantApplication.java
│   │   │   │   ├── EmailController.java        # REST endpoint
│   │   │   │   ├── EmailService.java           # Business logic
│   │   │   │   ├── EmailRequest.java           # Request DTO
│   │   │   │   └── EmailResponse.java
│   │   │   └── resources/
│   │   │       └── application.properties      # Configuration
│   │   └── test/                              # Unit tests
│   ├── pom.xml                                # Maven dependencies
│   ├── mvnw                                   # Maven wrapper (Unix)
│   └── mvnw.cmd                               # Maven wrapper (Windows)
│
├── Email-Assistant-Frontend/                 # React Web Application
│   ├── src/
│   │   ├── App.jsx                           # Main component
│   │   ├── App.css                           # Styling
│   │   ├── index.css                         # Global styles
│   │   ├── main.jsx                          # Entry point
│   │   └── assets/                           # Images & resources
│   ├── package.json                          # Dependencies
│   ├── vite.config.js                        # Vite configuration
│   ├── index.html                            # HTML template
│   └── eslint.config.js                      # Linting config
│
├── EmailWriter-Extension/                   # Chrome Extension
│   ├── manifest.json                        # Extension configuration
│   ├── content-script.js                    # Gmail integration script
│   ├── icons.png                            # Extension icon
│   └── HELP.md                              # Extension help
│
└── README.md                                 # This file
```

---

## 🛠️ Technologies Used

### Backend
| Technology | Version | Purpose |
|-----------|---------|---------|
| Java | 21 | Primary language |
| Spring Boot | 3.x | Web framework |
| Spring Web | 3.x | REST API |
| Spring WebClient | 3.x | HTTP client |
| Jackson | 2.x | JSON processing |
| Maven | 3.8+ | Build tool |

### Frontend
| Technology | Version | Purpose |
|-----------|---------|---------|
| React | 18.x | UI framework |
| Vite | 5.x | Build tool |
| Material-UI (MUI) | 5.x | Component library |
| Emotion | - | CSS-in-JS styling |

### Extension
| Technology | Version | Purpose |
|-----------|---------|---------|
| Chrome Manifest V3 | 3 | Extension standard |
| JavaScript (ES6+) | - | Extension logic |
| Content Script API | - | Gmail integration |

### External APIs
| Service | Purpose |
|---------|---------|
| Google Gemini API | AI email generation |
| Gmail API (via extension) | Email integration |

---

## 🎯 Features Breakdown

### AI Capabilities
- ✅ Multi-tone email generation
- ✅ Context-aware replies
- ✅ Professional formatting
- ✅ Grammar and punctuation handling
- ✅ Length optimization

### User Experience
- ✅ One-click generation
- ✅ Real-time processing
- ✅ Error handling and notifications
- ✅ Loading states
- ✅ Auto-fill functionality

### Integration
- ✅ Gmail native integration
- ✅ Web app access
- ✅ CORS support
- ✅ Cross-origin requests

---

## 🐛 Troubleshooting

### Backend Issues

#### Port 8080 Already in Use
```bash
# Windows: Find and kill process using port 8080
netstat -ano | findstr :8080
taskkill /PID <PID> /F

# macOS/Linux
lsof -ti:8080 | xargs kill -9
```

#### Gemini API Key Error
```
Error: API key not valid. Please pass a valid API key.
```

**Solution:**
1. Verify API key in `application.properties`
2. Check API key is active in [Google AI Studio](https://ai.google.dev/)
3. Ensure quota is not exceeded

#### CORS Error
```
Error: Access to XMLHttpRequest blocked by CORS policy
```

**Solution:** Backend already has `@CrossOrigin(origins = "*")` enabled. Make sure to restart after changes.

### Frontend Issues

#### Dependencies Not Installing
```bash
# Clear cache and reinstall
rm -rf node_modules package-lock.json
npm install
```

#### Port 5173 Already in Use
```bash
npm run dev -- --port 3000
```

### Chrome Extension Issues

#### Button Not Appearing
1. **Reload Extension:** chrome://extensions/ → Click refresh ↻
2. **Reload Gmail:** F5
3. **Check Console:** F12 → Look for errors
4. **Clear Cache:** Settings → Clear browsing data → All time

#### API Call Failing
1. Ensure backend is running on port 8080
2. Check CORS is enabled on backend
3. Verify Gemini API key is valid
4. Check browser console for detailed error

#### Generated Reply Not Auto-Inserting
1. Make sure you clicked the Reply button
2. Wait for compose box to fully load
3. Check console for JavaScript errors
4. Try refreshing the page

---

## 🚀 Performance Optimization

### Backend
- Uses **reactive WebClient** for non-blocking I/O
- Implements **connection pooling**
- Caches API responses when applicable

### Frontend
- **Lazy loading** of components
- **Debounced** API calls
- **Optimized renders** with React.memo

### Extension
- **Minimal DOM manipulation**
- **Event delegation** for efficiency
- **Minimal memory footprint**

---

## 📊 API Rate Limiting

Google Gemini API has rate limits:
- **Free Tier:** 60 requests per minute
- **Paid Plan:** Higher limits based on subscription

Monitor usage in [Google AI Studio Dashboard](https://ai.google.dev/)

---

## 🔒 Security Considerations

### API Key Protection
- ⚠️ **Never commit API key** to version control
- Use environment variables for production
- Rotate keys regularly

### CORS
- Currently allows `*` origins for development
- In production, specify exact origins

### Data Privacy
- Email content is sent to Google Gemini API
- No data is stored on our servers
- Review [Google Privacy Policy](https://policies.google.com/privacy)

---

## 🤝 Contributing

### How to Contribute

1. **Fork** the repository
2. **Create** a feature branch
   ```bash
   git checkout -b feature/amazing-feature
   ```
3. **Make** your changes
4. **Commit** with clear messages
   ```bash
   git commit -m 'Add amazing feature'
   ```
5. **Push** to branch
   ```bash
   git push origin feature/amazing-feature
   ```
6. **Open** a Pull Request

### Code Style
- **Java:** Follow [Google Java Style Guide](https://google.github.io/styleguide/javaguide.html)
- **JavaScript:** Use ESLint configuration
- **React:** Follow React best practices

---

## 📝 License

This project is licensed under the **MIT License** - see LICENSE file for details.

```
MIT License

Copyright (c) 2026 Smart Email Assistant

Permission is hereby granted, free of charge, to any person obtaining a copy
of this software and associated documentation files (the "Software"), to deal
in the Software without restriction, including without limitation the rights
to use, copy, modify, merge, publish, distribute, sublicense, and/or sell
copies of the Software, and to permit persons to whom the Software is
furnished to do so, subject to the following conditions:

The above copyright notice and this permission notice shall be included in all
copies or substantial portions of the Software.
```

---

## 📧 Support & Contact

- **GitHub Issues:** [Report bugs here](https://github.com/Swagat-190/AiEmailReplyGenerator/issues)
- **Email:** contact@emailassistant.dev
- **Documentation:** Check HELP.md in each folder

---

## 🎓 Learning Resources

- [Spring Boot Documentation](https://spring.io/projects/spring-boot)
- [React Documentation](https://react.dev/)
- [Chrome Extension Documentation](https://developer.chrome.com/docs/extensions/)
- [Google Gemini API Guide](https://ai.google.dev/docs)

---

## 🎉 Acknowledgments

- Google Gemini API for AI capabilities
- Spring Boot community for excellent framework
- React team for UI library
- Chrome team for extension platform

---

## 🗺️ Roadmap

- [ ] Database integration for reply history
- [ ] User authentication and profiles
- [ ] Custom prompt templates
- [ ] Batch email processing
- [ ] Integration with other email clients (Outlook, Yahoo)
- [ ] Machine learning-based tone detection
- [ ] Advanced reply analytics
- [ ] Mobile app version

---

## ⭐ Show Your Support

If this project helps you, please give it a ⭐ on GitHub!

```
https://github.com/Swagat-190/AiEmailReplyGenerator
```

---

**Made with ❤️ by the Email Assistant Team**

*Last Updated: January 15, 2026*
