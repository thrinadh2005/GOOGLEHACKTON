import os
from motor.motor_asyncio import AsyncIOMotorClient

# Fallback for local testing if running outside docker
MONGO_URL = os.getenv("DATABASE_URL", "mongodb://localhost:27017/smarthealth")

client = AsyncIOMotorClient(MONGO_URL)
db = client.get_database("smarthealth")

# Collections
patients_collection = db.get_collection("patients")
