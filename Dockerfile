FROM python:3.11-slim

WORKDIR /app

# Copy requirements from the backend folder
COPY smart-health/backend/requirements.txt .
RUN pip install --no-cache-dir -r requirements.txt

# Copy the rest of the backend code
COPY smart-health/backend/ .

CMD ["uvicorn", "main:app", "--host", "0.0.0.0", "--port", "8000"]
