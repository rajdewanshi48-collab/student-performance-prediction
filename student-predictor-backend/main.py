import os
import pickle
import pandas as pd
from typing import Literal
from contextlib import asynccontextmanager 
from fastapi import FastAPI, HTTPException
from pydantic import BaseModel
import uvicorn
# === NEW IMPORT: REQUIRED FOR CORS ===
from fastapi.middleware.cors import CORSMiddleware 
# ====================================

# --- Configuration ---
MODEL_PATH = "model.pkl"

# --- Pydantic Schema for Input Features ---
class StudentFeatures(BaseModel):
    attendance_percentage: float
    study_hours: float
    internal_marks: float
    assignments_submitted: int
    participation_in_activities: Literal[0, 1]

# --- Model Storage ---
model = None

# --- LIFESPAN CONTEXT: Load Model on Startup (Best Practice) ---
@asynccontextmanager
async def lifespan(app: FastAPI):
    """Load the pickled model from disk upon application startup."""
    global model
    print("⏳ Attempting to load model...")
    
    # 1. Load Model Logic
    if not os.path.exists(MODEL_PATH):
        print(f"FATAL ERROR: Model file not found at {MODEL_PATH}. Please run the simulation script first.")
        yield # Proceeding with model=None
        return

    try:
        with open(MODEL_PATH, 'rb') as file:
            model = pickle.load(file)
        print("✅ Model loaded successfully!")
        
        # 2. Yield to start the application
        yield
        
    except Exception as e:
        print(f"CRITICAL ERROR loading model: {e}")
        yield # Proceeding with model=None
        
    # Code below runs on application shutdown
    print("🛑 Application shutdown complete.")


# --- FastAPI Application Initialization ---
app = FastAPI(
    title="Student Performance Predictor API",
    description="Backend for the Student Performance Predictor Hackathon Project.",
    lifespan=lifespan # Pass the startup/shutdown handler here
)

# === START OF CORS PERMISSION SLIP ===
# 1. Define the allowed frontend origins (your Vite server)
origins = [
    "http://localhost:5173",  # Your frontend address
    "http://127.0.0.1:5173", # The 127.0.0.1 version
]

# 2. Add the CORS middleware to the application
app.add_middleware(
    CORSMiddleware,
    allow_origins=origins,          # List of allowed origins
    allow_credentials=True,         # Allows cookies/auth headers
    allow_methods=["*"],            # Allows all HTTP methods (POST, GET, etc.)
    allow_headers=["*"],            # Allows all headers
)
# === END OF CORS PERMISSION SLIP ===

# --- Health Check Endpoint ---
@app.get("/")
def read_root():
    """Simple health check."""
    return {"status": "ok", "model_loaded": model is not None, "message": "Predictor API is running."}

# --- Prediction Endpoint ---
@app.post("/predict")
def predict_performance(features: StudentFeatures):
    """
    Accepts student features and returns a performance prediction (Pass/Fail)
    and a confidence score.
    """
    if model is None:
        # If model failed to load in lifespan, return service unavailable
        raise HTTPException(status_code=503, detail="Model is not loaded. Service unavailable.")

    try:
        input_data = features.dict()
        
        # Feature order MUST match model training order
        feature_order = [
            'attendance_percentage', 
            'study_hours', 
            'internal_marks', 
            'assignments_submitted', 
            'participation_in_activities'
        ]
        
        # Create a DataFrame for prediction
        input_df = pd.DataFrame([input_data], columns=feature_order)
        
        # Predict the class (0 or 1)
        prediction_class = model.predict(input_df)[0]
        
        # Calculate the confidence score 
        prediction_probas = model.predict_proba(input_df)[0]
        confidence_score = prediction_probas[prediction_class]
        
        # Map the numeric prediction to a string
        performance_label: str = 'Pass' if prediction_class == 1 else 'Fail'

        # Return the JSON response
        return {
            "predicted_performance": performance_label,
            "confidence_level": round(confidence_score, 4) 
        }

    except Exception as e:
        print(f"Prediction error: {e}")
        raise HTTPException(status_code=500, detail=f"An error occurred during prediction: {str(e)}")