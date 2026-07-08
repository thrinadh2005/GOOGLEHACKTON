from fastapi import FastAPI, HTTPException
from fastapi.middleware.cors import CORSMiddleware
from pydantic import BaseModel, Field
from typing import List, Optional
import pickle
import numpy as np
import os
from contextlib import asynccontextmanager

from database import patients_collection
from chatbot import get_triage_response

# Load AI Model
model = None

@asynccontextmanager
async def lifespan(app: FastAPI):
    global model
    model_path = "model/disease_model.pkl"
    if os.path.exists(model_path):
        with open(model_path, "rb") as f:
            model = pickle.load(f)
        print("AI Model loaded successfully.")
    else:
        print("WARNING: AI Model not found. Run train_model.py first.")
    yield
    # Cleanup if needed
    model = None

app = FastAPI(title="Smart Health API - Phase 2", version="2.0.0", lifespan=lifespan)

app.add_middleware(
    CORSMiddleware,
    allow_origins=["*"],
    allow_credentials=True,
    allow_methods=["*"],
    allow_headers=["*"],
)

class PatientData(BaseModel):
    patient_id: str
    name: str
    age: int
    sys_bp: int
    dia_bp: int
    heart_rate: int
    cholesterol: int

class ChatMessage(BaseModel):
    message: str

@app.get("/")
def read_root():
    return {"status": "ok", "message": "Smart Health API Phase 2 is running"}

# --- MongoDB Endpoints ---

@app.post("/api/patients")
async def create_patient(patient: PatientData):
    # Insert into MongoDB
    patient_dict = patient.model_dump()
    existing = await patients_collection.find_one({"patient_id": patient.patient_id})
    if existing:
        raise HTTPException(status_code=400, detail="Patient already exists")
    
    result = await patients_collection.insert_one(patient_dict)
    return {"status": "success", "id": str(result.inserted_id)}

@app.get("/api/patients/{patient_id}")
async def get_patient(patient_id: str):
    patient = await patients_collection.find_one({"patient_id": patient_id})
    if not patient:
        # Fallback to mock for POC if not found in DB
        if patient_id == "error":
            raise HTTPException(status_code=404, detail="Patient not found")
        return {
            "patient_id": patient_id,
            "name": f"Mock Patient {patient_id}",
            "age": 45,
            "sys_bp": 120,
            "dia_bp": 80,
            "heart_rate": 72,
            "cholesterol": 190
        }
    
    # Remove MongoDB internal _id before returning
    patient.pop("_id", None)
    return patient

# --- AI Prediction Endpoint ---

@app.post("/api/ai/predict-disease")
async def predict_disease(data: PatientData):
    global model
    if model is None:
        raise HTTPException(status_code=503, detail="AI Model not loaded")
    
    # Prepare features: ['age', 'sys_bp', 'dia_bp', 'heart_rate', 'cholesterol']
    features = np.array([[data.age, data.sys_bp, data.dia_bp, data.heart_rate, data.cholesterol]])
    
    try:
        # Run inference
        risk_class = model.predict(features)[0] # 0: Low, 1: Medium, 2: High
        probabilities = model.predict_proba(features)[0]
        confidence = probabilities[risk_class]
        
        classes = ["Low", "Medium", "High"]
        risk_level = classes[risk_class]
        
        return {
            "prediction": {
                "risk_level": risk_level,
                "confidence_score": float(round(confidence, 2)),
                "recommendations": [
                    "Schedule immediate follow-up",
                    "Monitor vitals hourly"
                ] if risk_level == "High" else ["Standard annual checkup"]
            }
        }
    except Exception as e:
        raise HTTPException(status_code=500, detail=str(e))

# --- Chatbot Endpoint ---

@app.post("/api/chat/triage")
def triage_chat(chat: ChatMessage):
    response = get_triage_response(chat.message)
    return {"reply": response}
