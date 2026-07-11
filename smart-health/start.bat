@echo off
echo ==========================================
echo    Starting SmartCare Enterprise Prototype
echo ==========================================

echo Starting Python Backend (FastAPI)...
start cmd /k "cd backend && call venv\Scripts\activate && uvicorn main:app --reload --port 8000"

echo Starting Next.js Frontend...
start cmd /k "cd frontend && npm install && npm run dev"

echo ==========================================
echo  Backend running on: http://localhost:8000
echo  Frontend running on: http://localhost:3000
echo ==========================================
pause
