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
- **Protected Routes:** All patient records and AI prediction endpoints are strictly locked down to authorized medical professionals. The frontend features a secure Glassmorphic Login portal that guards all Dashboard access.

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
| **Database** | **MongoDB Atlas** | Distributed NoSQL Cloud Database & GridFS Binary Storage |
| **AI / ML** | **Scikit-Learn / Pandas** | Random Forest Classifier, Groq LLM |
| **WebRTC** | **PeerJS** | Signaling and Peer-to-Peer Video streaming |
| **Security** | **PyJWT / Passlib** | OAuth2 Bearer Token Authentication |

---

## 🚀 1-Click Deployment (Render.com)

This project features true **Infrastructure as Code (IaC)**. The entire stack (Backend + Frontend) can be deployed simultaneously with a single click using the included `render.yaml` Blueprint.

### How to Deploy:
1. Create a free cluster on **MongoDB Atlas** and get your connection string.
2. Go to your [Render Dashboard](https://dashboard.render.com/).
3. Click **"New +" -> "Blueprint"**.
4. Connect this GitHub repository.
5. Render will automatically detect `render.yaml` and queue both the `smart-health-backend` (Docker) and `smart-health-frontend` (Node) for deployment.
6. Click **Apply**.
7. In the Render Dashboard, navigate to the **Backend Service -> Environment Variables** and enter:
   - `DATABASE_URL`: `mongodb://<user>:<password>@<atlas-cluster-url>/smarthealth`
   - `SECRET_KEY`: Your secure JWT secret (e.g., `super-secret-key-for-hackathon-only`)
8. Render will automatically link the Backend URL to the Frontend!

---

## 💻 Local Development

### Prerequisites
- Node.js (v18+)
- Python (v3.10+)

### Running the Backend
```bash
cd smart-health/backend
python -m venv venv
source venv/Scripts/activate # (Windows)
pip install -r requirements.txt
uvicorn main:app --reload --port 8000
```

### Running the Frontend
```bash
cd smart-health/frontend
npm install
npm run dev
```

### Testing Credentials
To access the secure dashboard locally or on the live deployment, use the mock doctor credentials:
- **Email:** `admin@smarthealth.com`
- **Password:** `password123`

---
*Built with ❤️ for the Google Hackathon.*
