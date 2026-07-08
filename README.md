# 🏥 Smart Health – AI-Driven Health Center & Supply Chain Management

![Smart Health Banner](https://via.placeholder.com/1200x400.png?text=Smart+Health+-+AI-Driven+Healthcare+Platform)

> **Enterprise-Grade Prototype built for the Google Hackathon.**
> An end-to-end, highly secure telemedicine, predictive AI, and healthcare management platform.

---

## 🌟 Overview

**Smart Health** is a comprehensive, next-generation healthcare platform that bridges the gap between remote patients and medical professionals. By integrating **Machine Learning**, **WebRTC Telemedicine**, **IoT Data Pipelines**, and **Secure Authentication**, the platform provides a complete ecosystem for predictive health monitoring and real-time consulting.

## 🚀 Key Features

### 1. 🤖 Predictive AI Diagnostics (Scikit-Learn)
- **Machine Learning Inference:** A Random Forest model evaluates patient vitals (Blood Pressure, Age, Heart Rate, Cholesterol) to instantly predict disease risk levels.
- **Dynamic Model Loading:** The ML model (`.pkl`) is stored securely in **MongoDB GridFS** and streamed into memory on backend startup, allowing for seamless updates without API downtime.

### 2. 🔐 Enterprise Security (JWT Authentication)
- **FastAPI OAuth2:** The entire backend is protected via secure JSON Web Tokens (JWT). 
- **Bcrypt Hashing:** Passwords are cryptographically hashed.
- **Protected Routes:** All patient records and AI prediction endpoints are strictly locked down to authorized medical professionals.

### 3. 📹 Real-Time Telemedicine (WebRTC)
- **Peer-to-Peer Video:** A high-end WebRTC implementation using `PeerJS` allows doctors and patients to connect instantly via low-latency, encrypted video streams directly in the browser.

### 4. 💬 AI Symptom Triage Chatbot (Groq/LLM)
- **NLP Triage:** A floating chatbot powered by the `Groq LLaMA3-8b` model acts as a first-line triage assistant, analyzing patient symptoms and offering immediate guidance before consulting a doctor.

### 5. 🗄️ Cloud-Native Database (MongoDB Atlas)
- **Asynchronous Data:** Built on `motor` (Async MongoDB Driver) for high-concurrency non-blocking database queries.

---

## 🏗️ Architecture Stack

| Component | Technology | Description |
|-----------|------------|-------------|
| **Frontend** | **Next.js 14** (App Router) | Server-Side Rendering, TailwindCSS, Glassmorphism UI |
| **Backend** | **FastAPI** (Python 3.11) | Async API, Dependency Injection, Swagger Documentation |
| **Database** | **MongoDB Atlas** | Distributed NoSQL Cloud Database |
| **AI / ML** | **Scikit-Learn / Pandas** | Random Forest Classifier, Groq LLM |
| **WebRTC** | **PeerJS** | Signaling and Peer-to-Peer Video streaming |
| **Security** | **PyJWT / Passlib** | OAuth2 Bearer Token Authentication |

---

## 🚀 Deployment Guide

This project is built for zero-downtime deployment on modern serverless infrastructure.

### 1. Database (MongoDB Atlas)
1. Create a free cluster on MongoDB Atlas.
2. Obtain the connection string.

### 2. Backend (Render.com / Google Cloud Run)
1. Link this repository to Render as a **Web Service**.
2. Select the `smart-health/backend` directory.
3. Add Environment Variables:
   - `DATABASE_URL`: `mongodb://<user>:<password>@<atlas-cluster-url>/smarthealth`
   - `GROQ_API_KEY`: Your LLM API Key
   - `SECRET_KEY`: A random secure string for JWT encoding.

### 3. Frontend (Vercel)
1. Link this repository to **Vercel**.
2. Select the `smart-health/frontend` directory.
3. Framework Preset: **Next.js**.
4. Add Environment Variables:
   - `NEXT_PUBLIC_API_URL`: The URL of your live Render backend.

---

## 💻 Local Development

### Prerequisites
- Node.js (v18+)
- Python (v3.10+)
- Docker (Optional)

### Running the Backend
```bash
cd backend
python -m venv venv
source venv/Scripts/activate # (Windows)
pip install -r requirements.txt
uvicorn main:app --reload --port 8000
```

### Running the Frontend
```bash
cd frontend
npm install
npm run dev
```

### Testing Credentials
To access the secure dashboard locally, use the mock doctor credentials:
- **Email:** `admin@smarthealth.com`
- **Password:** `password123`

---
*Built with ❤️ for the Google Hackathon.*
