import random
import pickle

def create_model_stub():
    # A fake model just for POC
    model = {"type": "mock_model", "version": "1.0"}
    with open("model_stub.pkl", "wb") as f:
        pickle.dump(model, f)
    print("Mock model created.")

if __name__ == "__main__":
    create_model_stub()
