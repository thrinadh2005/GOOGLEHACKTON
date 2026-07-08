# Smart Health – AI-Driven Health Center & Supply Chain Management 🏥✨

Welcome to the **Smart Health** platform! This is a state-of-the-art, cloud-native Proof of Concept (POC) demonstrating an enterprise-level healthcare intelligence system. It seamlessly integrates IoT edge devices, AI predictive analytics, federated learning concepts, and an immutable supply chain.

---

## 🌟 Project Overview

Traditional healthcare systems are siloed, reactive, and slow. **Smart Health** revolutionizes this by introducing a proactive, AI-driven ecosystem designed for scalability and real-time responsiveness. 

### Core Features

- **Predictive AI Engine**: Uses machine learning to analyze patient vitals and predict disease risks before they escalate.
- **IoT Edge Integration (Mocked)**: Designed to process vital signs locally with sub-millisecond latency using Edge AI, reducing cloud dependency.
- **Secure Microservices**: A Python/FastAPI backend acting as the API gateway to disparate services.
- **High-End User Portals**: A Next.js 14 frontend utilizing TailwindCSS, glassmorphism, and responsive design for an unparalleled user experience.
- **Supply Chain & Blockchain Ready**: Architecture supports smart contracts for transparent medical supply tracking.

---

## 🏗️ Architecture

The system follows a modern microservices approach:

1. **Frontend (Next.js)**: Client-facing applications (Patient Portal & Doctor Dashboard).
2. **Backend API (FastAPI)**: Python-based high-performance API for routing and authentication.
3. **AI Service**: Dedicated machine learning inference nodes (mocked in the POC).
4. **Data Layer**: MongoDB for unstructured EHR (Electronic Health Records).

*(See the `smart_health_architecture.md` artifact for a detailed Mermaid diagram).*

---

## 🚀 Getting Started

### Prerequisites
- [Docker & Docker Compose](https://www.docker.com/) (Recommended)
- Node.js 18+ (If running locally)
- Python 3.11+ (If running locally)

### Option 1: Running with Docker (Easiest)

1. Navigate to the project root:
   ```bash
   cd smart-health
   ```
2. Start the services:
   ```bash
   docker-compose up --build
   ```
3. Access the applications:
   - **Frontend Portal**: `http://localhost:3000`
   - **Backend API Docs**: `http://localhost:8000/docs`

### Option 2: Running Locally (Development)

**1. Start the Backend:**
```bash
cd backend
python -m venv venv
source venv/bin/activate  # On Windows: venv\Scripts\activate
pip install -r requirements.txt
uvicorn main:app --reload --port 8000
```

**2. Start the Frontend:**
```bash
cd frontend
npm install
npm run dev
```

---

## 🛠️ Tech Stack Used

- **Frontend**: Next.js 14, React, TailwindCSS, TypeScript
- **Backend**: Python, FastAPI, Uvicorn, Pydantic
- **AI/ML**: Scikit-Learn, Pandas, NumPy
- **Database**: MongoDB (via Motor async driver)
- **Deployment**: Docker, Docker Compose

---

## 🔮 Future Enhancements

- **Federated Learning Implementation**: Real cross-hospital collaboration without sharing raw data.
- **Blockchain Smart Contracts**: Full integration with Hyperledger Fabric for the supply chain.
- **Telemedicine Integration**: WebRTC video consulting directly within the portal.
- **Wearable API**: Apple Watch and Fitbit direct integration.

---
*Built for the Google Hackathon.*
