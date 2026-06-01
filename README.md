#  SigmaGPT — Production-Ready AI Chat Application

[![Live Demo](https://img.shields.io/badge/Live%20Demo-Online-brightgreen?style=for-the-badge&logo=render)](https://sigmagpt-1-jktt.onrender.com/login)
[![MERN Stack](https://img.shields.io/badge/MERN-Stack-61DAFB?style=for-the-badge&logo=react&logoColor=black)](https://reactjs.org)
[![MongoDB](https://img.shields.io/badge/MongoDB-Database-47A248?style=for-the-badge&logo=mongodb&logoColor=white)](https://mongodb.com)
[![CI/CD](https://img.shields.io/badge/CI%2FCD-GitHub%20Actions-2088FF?style=for-the-badge&logo=github-actions&logoColor=white)](https://github.com/features/actions)

> A full-stack ChatGPT-like AI chat application built with the MERN stack — featuring JWT authentication, persistent chat history, CI/CD pipeline, and production deployment on Render.com.

🔗 **[View Live Demo](https://sigmagpt-1-jktt.onrender.com/login)**

---

## 📸 Preview

> *(Add screenshots here — Login page, Chat interface, Dark/Light mode)*

---

## ✨ Key Features

| Feature | Description |
|---|---|
| 🧠 **AI Chat** | Powered by Groq LLaMA 3.3 70B — fast, intelligent responses |
| 🔐 **JWT Auth** | Secure login/register with JSON Web Token authentication |
| 💬 **Chat History** | Thread-based persistent conversation history in MongoDB |
| 🎙️ **Voice Input** | Web Speech API for hands-free voice-to-text messaging |
| 📝 **Markdown Rendering** | Full markdown + syntax highlighting in AI responses |
| 🌙 **Dark / Light Mode** | Toggle between themes, preference saved across sessions |
| ⚡ **CI/CD Pipeline** | Automated build testing & deployment via GitHub Actions |
| 🏗️ **Modular Architecture** | Clean separation of routes, controllers, and middleware |
| 🛡️ **Input Validation** | Server-side validation and structured error handling |
| 📱 **Responsive UI** | Mobile-friendly React frontend |

---

## 🛠️ Tech Stack

### Frontend
- **React.js** — Component-based UI with hooks
- **Vite** — Fast development build tool
- **Tailwind CSS** — Utility-first styling
- **Marked.js + Highlight.js** — Markdown & syntax highlighting
- **Web Speech API** — Browser-native voice input

### Backend
- **Node.js** + **Express.js** — RESTful API server
- **JWT (jsonwebtoken)** — Stateless authentication
- **bcrypt** — Password hashing
- **Groq SDK** — LLaMA 3.3 70B AI model integration
- **Mongoose** — MongoDB ODM

### Database & DevOps
- **MongoDB Atlas** — Cloud database
- **GitHub Actions** — CI/CD pipeline (build + test + deploy)
- **Render.com** — Production deployment

---

## 🏗️ Project Architecture

```
SigmaGPT/
├── client/                  # React frontend (Vite)
│   ├── src/
│   │   ├── components/      # Reusable UI components
│   │   ├── pages/           # Login, Register, Chat
│   │   ├── context/         # Auth context (global state)
│   │   └── utils/           # API helper functions
│   └── vite.config.js
│
├── server/                  # Node.js + Express backend
│   ├── controllers/         # Business logic
│   │   ├── authController.js
│   │   └── chatController.js
│   ├── models/              # Mongoose schemas
│   │   ├── User.js
│   │   └── Chat.js
│   ├── routes/              # Express route definitions
│   │   ├── authRoutes.js
│   │   └── chatRoutes.js
│   ├── middleware/          # JWT auth middleware
│   └── index.js             # Server entry point
│
├── .github/
│   └── workflows/
│       └── deploy.yml       # GitHub Actions CI/CD pipeline
└── package.json
```

---

## 🚀 Getting Started

### Prerequisites
- Node.js v18+
- MongoDB Atlas account
- Groq API key (free at [console.groq.com](https://console.groq.com))

### Installation

```bash
# 1. Clone the repository
git clone https://github.com/mohdnazam123/SigmaGPT.git
cd SigmaGPT

# 2. Install server dependencies
cd server && npm install

# 3. Install client dependencies
cd ../client && npm install

# 4. Set up environment variables
# In /server, create .env file (see below)

# 5. Run development servers (in separate terminals)
# Terminal 1 — Backend
cd server && nodemon index.js

# Terminal 2 — Frontend
cd client && npm run dev
```

### Environment Variables

Create a `.env` file inside the `server/` directory:

```env
# Database
MONGODB_URI=your_mongodb_atlas_connection_string

# Authentication
JWT_SECRET=your_jwt_secret_key

# AI
GROQ_API_KEY=your_groq_api_key

# Server
PORT=5000
NODE_ENV=development
```

---

## 📡 API Routes

### Auth Routes — `/api/auth`

| Method | Route | Description | Auth |
|--------|-------|-------------|:----:|
| POST | `/register` | Register new user | ❌ |
| POST | `/login` | Login & receive JWT token | ❌ |
| GET | `/me` | Get current user profile | ✅ |

### Chat Routes — `/api/chat`

| Method | Route | Description | Auth |
|--------|-------|-------------|:----:|
| POST | `/message` | Send message, get AI response | ✅ |
| GET | `/history` | Get all chat threads | ✅ |
| GET | `/history/:threadId` | Get messages in a thread | ✅ |
| DELETE | `/history/:threadId` | Delete a chat thread | ✅ |

---

## ⚙️ CI/CD Pipeline

This project uses **GitHub Actions** for automated testing and deployment.

```yaml
# .github/workflows/deploy.yml — Pipeline stages:

1. Trigger     → Push to main branch
2. Install     → npm install (server + client)
3. Build       → npm run build (React Vite build)
4. Test        → Run test suite
5. Deploy      → Auto-deploy to Render.com
```

Every push to `main` automatically builds and deploys — zero manual deployment needed.

---

## 🔐 Authentication Flow

```
User registers / logs in
        ↓
Server validates credentials
        ↓
bcrypt verifies hashed password
        ↓
JWT token generated (expires in 7d)
        ↓
Token stored in client (localStorage)
        ↓
All protected routes verify token via middleware
        ↓
Expired / invalid token → 401 Unauthorized
```

---

## 🌐 Deployment

- **Frontend:** Built with Vite → served as static files
- **Backend:** Node.js server on Render.com
- **Database:** MongoDB Atlas (M0 free cluster)
- **CI/CD:** GitHub Actions triggers on every push to `main`
- **Live URL:** https://sigmagpt-1-jktt.onrender.com/login

> ⚠️ Note: Free Render instance may spin down after inactivity — first load can take ~30 seconds.

---

## 🧠 What I Learned

- Building a **complete MERN stack** application from scratch to production
- Implementing **JWT-based stateless authentication** with secure password hashing
- Integrating **LLM APIs** (Groq) with streaming and error handling
- Setting up a real **CI/CD pipeline** with GitHub Actions
- Managing **async/await patterns** across frontend and backend
- **React state management** with Context API for global auth state
- **Production deployment** with environment variable management

---

## 👤 Author

**Mohd Nazam**
- GitHub: [@mohdnazam123](https://github.com/mohdnazam123)
- LinkedIn: [mohd-nazam-4a1365327](https://linkedin.com/in/mohd-nazam-4a1365327)
- Email: monazam78692@gmail.com

---

## 📄 License

This project is open source and available under the [MIT License](LICENSE).

---

<p align="center">Built with ❤️ by Mohd Nazam</p>
