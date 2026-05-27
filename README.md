<img width="534" height="584" alt="image" src="https://github.com/user-attachments/assets/40658d31-3947-46ea-84d6-d6a003ee29bb" />

# SigmaGPT 

A full-stack AI Chat Application built with MERN stack, 
powered by Groq's LLaMA 3.3 70B model.

## 🔗 Live Demo
[Click Here](https://sigmagpt-1-jktt.onrender.com)

## ✨ Features
- 🔐 JWT Authentication (Signup/Login)
- 💬 Real-time AI responses
- 🗂️ Chat history with threads
- 🎤 Voice input support
- 🌙 Dark/Light mode toggle
- 🗑️ Delete chat threads

## 🛠️ Tech Stack
| Frontend | Backend | Database | AI |
|----------|---------|----------|----|
| React.js | Node.js | MongoDB  | Groq API |
| Vite     | Express |          | LLaMA 3.3 70B |

## ⚙️ Setup

### Backend
```bash
cd Backend
npm install
node server.js
```

### Frontend
```bash
cd Frontend
npm install
npm run dev
```

### .env (Backend)
```
MONGODB_URI=your_mongodb_uri
JWT_SECRET=your_secret
GROQ_API_KEY=your_groq_key
```

### .env (Frontend)
```
VITE_BACKEND_URL=http://localhost:8080
```

## 📁 Folder Structure
```
SigmaGPT/
├── Backend/
│   ├── models/
│   ├── routes/
│   ├── middleware/
│   ├── utils/
│   └── server.js
└── Frontend/
    └── src/
        ├── pages/
        └── components/
```
