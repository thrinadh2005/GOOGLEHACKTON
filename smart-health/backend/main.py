from fastapi import FastAPI, HTTPException
from fastapi.middleware.cors import CORSMiddleware
from pydantic import BaseModel, Field
from typing import List, Optional
import pickle
import numpy as np
import os
from contextlib import asynccontextmanager

from database import patients_collection, db
from chatbot import get_triage_response
from motor.motor_asyncio import AsyncIOMotorGridFSBucket
import io
from fastapi.security import OAuth2PasswordRequestForm
from auth import Token, verify_password, create_access_token, ACCESS_TOKEN_EXPIRE_MINUTES, MOCK_USER_DB, get_current_user
from datetime import timedelta

# Load AI Model
model = None

@asynccontextmanager
async def lifespan(app: FastAPI):
    global model
    print("Fetching AI model from MongoDB GridFS...")
    try:
        fs = AsyncIOMotorGridFSBucket(db)
        # Find the model file
        cursor = fs.find({"filename": "disease_model.pkl"})
        grid_out = None
        async for f in cursor:
            grid_out = f
            break
            
        if grid_out:
            model_bytes = await grid_out.read()
            model = pickle.loads(model_bytes)
            print("AI Model loaded successfully from MongoDB.")
        else:
            print("WARNING: AI Model not found in MongoDB GridFS. Predictions will fail.")
    except Exception as e:
        print(f"Error loading model from MongoDB: {e}")
        
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
async def root():
    return {"message": "Welcome to Smart Health API"}

@app.post("/api/auth/login", response_model=Token)
async def login_for_access_token(form_data: OAuth2PasswordRequestForm = Depends()):
    user = MOCK_USER_DB.get(form_data.username)
    if not user or not verify_password(form_data.password, user["password_hash"]):
        raise HTTPException(
            status_code=status.HTTP_401_UNAUTHORIZED,
            detail="Incorrect username or password",
            headers={"WWW-Authenticate": "Bearer"},
        )
    access_token_expires = timedelta(minutes=ACCESS_TOKEN_EXPIRE_MINUTES)
    access_token = create_access_token(
        data={"sub": user["username"]}, expires_delta=access_token_expires
    )
    return {"access_token": access_token, "token_type": "bearer"}

# --- MongoDB Endpoints ---

@app.get("/api/patients")
async def get_patients(current_user: dict = Depends(get_current_user)):
    patients = await patients_collection.find().to_list(100)
    for p in patients:
        p["_id"] = str(p["_id"])
    return {"patients": patients}

@app.post("/api/patients")
async def create_patient(patient: PatientData, current_user: dict = Depends(get_current_user)):
    # Insert into MongoDB
    patient_dict = patient.model_dump()
    existing = await patients_collection.find_one({"patient_id": patient.patient_id})
    if existing:
        raise HTTPException(status_code=400, detail="Patient already exists")
    
    result = await patients_collection.insert_one(patient_dict)
    return {"status": "success", "id": str(result.inserted_id)}

@app.get("/api/patients/{patient_id}")
async def get_patient(patient_id: str, current_user: dict = Depends(get_current_user)):
    patient = await patients_collection.find_one({"patient_id": patient_id})
    if not patient:
        raise HTTPException(status_code=404, detail="Patient not found")
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
