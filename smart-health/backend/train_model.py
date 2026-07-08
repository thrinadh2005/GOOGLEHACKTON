import pandas as pd
import numpy as np
from sklearn.ensemble import RandomForestClassifier
from sklearn.model_selection import train_test_split
import pickle
import os

def generate_synthetic_data(num_samples=1000):
    np.random.seed(42)
    
    # Generate synthetic patient data
    age = np.random.randint(20, 90, size=num_samples)
    sys_bp = np.random.randint(90, 180, size=num_samples)
    dia_bp = np.random.randint(60, 120, size=num_samples)
    heart_rate = np.random.randint(50, 110, size=num_samples)
    cholesterol = np.random.randint(150, 300, size=num_samples)
    
    # Calculate a synthetic "risk score" to train against
    # High age, high BP, high cholesterol -> Higher risk
    risk_score = (age / 100) * 0.3 + (sys_bp / 200) * 0.3 + (cholesterol / 300) * 0.4
    
    # Convert score to categorical classes: 0 (Low), 1 (Medium), 2 (High)
    risk_class = np.zeros(num_samples, dtype=int)
    risk_class[risk_score > 0.6] = 1
    risk_class[risk_score > 0.75] = 2
    
    df = pd.DataFrame({
        'age': age,
        'sys_bp': sys_bp,
        'dia_bp': dia_bp,
        'heart_rate': heart_rate,
        'cholesterol': cholesterol,
        'target': risk_class
    })
    
    return df

def train_and_save_model():
    print("Generating synthetic dataset...")
    df = generate_synthetic_data(2000)
    
    X = df[['age', 'sys_bp', 'dia_bp', 'heart_rate', 'cholesterol']]
    y = df['target']
    
    X_train, X_test, y_train, y_test = train_test_split(X, y, test_size=0.2, random_state=42)
    
    print("Training RandomForest model...")
    model = RandomForestClassifier(n_estimators=100, max_depth=5, random_state=42)
    model.fit(X_train, y_train)
    
    accuracy = model.score(X_test, y_test)
    print(f"Model trained with accuracy: {accuracy:.2f}")
    
    # Save the model
    os.makedirs(os.path.dirname("model/disease_model.pkl") or ".", exist_ok=True)
    with open("model/disease_model.pkl", "wb") as f:
        pickle.dump(model, f)
    
    print("Model saved to model/disease_model.pkl")

if __name__ == "__main__":
    train_and_save_model()
