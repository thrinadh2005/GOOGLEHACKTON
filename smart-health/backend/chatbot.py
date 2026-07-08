def get_triage_response(message: str) -> str:
    message = message.lower()
    
    # Very simple keyword-based mock LLM for triage
    if "headache" in message and "fever" in message:
        return "Given you have a headache and a fever, this could be indicative of an infection. Please monitor your temperature. If it exceeds 103°F (39.4°C) or lasts more than 3 days, seek medical attention immediately."
    elif "chest pain" in message or "heart" in message:
        return "🚨 CRITICAL: Chest pain is a medical emergency. Please call emergency services (911) or go to the nearest emergency room immediately."
    elif "cough" in message:
        return "A cough can be caused by many factors including allergies, a cold, or respiratory infections. Are you experiencing any shortness of breath or fever?"
    else:
        return "I am the Smart Health AI Triage Assistant. I can help assess your symptoms. Please describe what you are feeling in more detail."
