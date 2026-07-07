# TalentFlow 🚀

[![CI/CD Pipeline](https://img.shields.io/badge/CI%2FCD-GitHub%20Actions-blue?style=flat-square&logo=github-actions)](https://github.com)
[![Frontend](https://img.shields.io/badge/Frontend-Vite%20%2B%20React-61dafb?style=flat-square&logo=react)](https://vercel.com)
[![Backend](https://img.shields.io/badge/Backend-Express%20%2B%20Node.js-339933?style=flat-square&logo=node.js)](https://render.com)
[![Database](https://img.shields.io/badge/Database-MongoDB-47a248?style=flat-square&logo=mongodb)](https://www.mongodb.com)

TalentFlow is an enterprise-grade, modern MERN stack job board ecosystem engineered to automate the modern recruitment lifecycle. Designed with a decoupled architecture, automated deployment pipelines, real-time synchronization systems, and intelligence modules, it bridges the gap between top-tier candidates and high-velocity engineering teams.

---

#output 

<img width="2834" height="1344" alt="Screenshot 2026-07-08 011949" src="https://github.com/user-attachments/assets/eea6cb31-a299-4820-b6ee-cac95fe8df51" />


Live Demo https://job-board-tu9p.vercel.app/


## 📂 Project Directory Structure

```text
├── .github/
│   └── workflows/
│       └── ci-cd.yml         # GitHub Actions CI/CD automation pipeline
├── api/
│   └── index.js              # Serverless API proxy / gateway integration
├── backend/
│   ├── node_modules/
│   ├── package.json          # Backend dependencies and scripts
│   └── server.js             # Express application entrypoint
├── frontend/
│   ├── public/               # Static public assets
│   ├── src/
│   │   ├── assets/           # Application images and stylesheets
│   │   ├── components/       # Reusable UI primitives (Buttons, Modals, Inputs)
│   │   ├── context/          # State providers (AuthContext, ThemeContext)
│   │   ├── hooks/            # Custom React hooks (useAuth, useFetch)
│   │   ├── pages/            # Core application views (Dashboard, Jobs, Profile)
│   │   ├── App.jsx           # Client-side React Router mappings
│   │   ├── main.jsx          # DOM rendering entrypoint
│   │   └── styles.css        # Global CSS stylesheet
│   ├── dist/                 # Optimized local production build artifacts
│   ├── node_modules/
│   ├── index.html            # Single-page application HTML shell
│   ├── package.json          # Frontend dependencies and Vite scripts
│   ├── vercel.json           # Localized single-page routing configuration
│   └── vite.config.js        # Vite bundler configuration
├── .gitignore                # Untracked Git files and directories
├── package.json              # Monorepo root workspace orchestration scripts
└── README.md                 # System documentation and setup guide
🛠️ Local Development Quick Start
1. Prerequisites
Ensure you have Node.js (v20+) installed and a functional MongoDB Atlas cluster or local database instance running.

2. Install Workspace Dependencies
Install dependencies seamlessly across the monorepo root, frontend, and backend scopes using a single chained command:

Bash
npm install && npm --prefix frontend install && npm --prefix backend install
3. Environment Variable Configuration
Create a .env file directly inside your backend/ directory to power the API server layer:

Code snippet
PORT=5001
MONGO_URI=your_mongodb_connection_string
JWT_SECRET=your_jwt_signing_and_validation_key
NODE_ENV=development
4. Fire Up the Development Servers
Boot up both the Vite development interface and the Express API server concurrently from the project root:

Bash
npm run dev
Frontend Web Application: http://localhost:5173 (Fails over to 5174 automatically if port conflicts occur)

Backend REST API Server: http://localhost:5001

🚀 Production Infrastructure Deployment Blueprints
Frontend Deployment (Vercel Integration via CI/CD)
TalentFlow isolates testing and distribution layers using a decoupled deployment framework:

Vercel Dashboard Alignment: Go to Project Settings -> General -> Set Root Directory exactly to frontend. Ensure your framework preset is set to Vite.

Clear Dashboard Overrides: Ensure the Build, Install, and Output overrides inside the Vercel Dashboard are turned OFF to allow standard CLI stream behaviors.

Set Up GitHub Repository Vault Secrets: Navigate to your repo's Settings > Secrets and variables > Actions and populate your secure infrastructure tokens:

VERCEL_TOKEN: Your global account access key.

VERCEL_ORG_ID: Your target Vercel account or team identifier.

VERCEL_PROJECT_ID: The unified deployment project token.

Automated Pipeline Strategy: Every code synchronization targeting main or master branches prompts .github/workflows/ci-cd.yml to compile raw code, execute system health sweeps, package structural files, and push directly to production servers.

Backend Deployment (Render Ecosystem)
Register and deploy a new Web Service on Render.

Set the service Root Directory field explicitly to backend.

Configure your build and runtime commands:

Build Command: npm install

Start Command: node server.js

Provide your production backend environment keys via the Render dashboard configuration tab.

Update your frontend/vercel.json rewrites parameter with your live production backend URL string to handle request proxying cleanly without CORS complications:

JSON
{
  "version": 2,
  "cleanUrls": true,
  "rewrites": [
    {
      "source": "/api/(.*)",
      "destination": "[https://your-live-backend.onrender.com/api/$1](https://your-live-backend.onrender.com/api/$1)"
    },
    {
      "source": "/(.*)",
      "destination": "/index.html"
    }
  ]
}
📡 Core API Endpoint Documentation
Authentication Mappings
POST /api/auth/register - Registers a new candidate or recruiter account.

POST /api/auth/login - Validates credentials and returns a secure JWT bearer token.

GET /api/auth/profile - Retrieves the currently authenticated user's session metadata.

Job Marketplace Board
GET /api/jobs - Fetches job postings with multi-faceted search matching.

POST /api/jobs - Publishes a new opening (Protected: Recruiter authorization required).

DELETE /api/jobs/:id - Purges an opening from the system database.

Application Transactions
POST /api/applications/apply/:jobId - Encapsulates and registers a job application.

GET /api/applications/candidate - Compiles a timeline of applications submitted by the active candidate.

PUT /api/applications/status/:id - Updates candidate progress along the ATS board pipeline.
