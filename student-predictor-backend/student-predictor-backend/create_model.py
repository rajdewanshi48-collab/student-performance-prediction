import pandas as pd
from sklearn.linear_model import LogisticRegression
import pickle
import numpy as np
import sys # Added for error handling

try:
    # --- 1. Simulate Dummy Data ---
    np.random.seed(42)
    data = {
        'attendance_percentage': np.random.uniform(50, 100, 100),
        'study_hours': np.random.uniform(1, 10, 100),
        'internal_marks': np.random.uniform(20, 50, 100),
        'assignments_submitted': np.random.randint(0, 15, 100),
        'participation_in_activities': np.random.randint(0, 2, 100),
    }
    df = pd.DataFrame(data)

    # Simple logic for target calculation
    df['Performance'] = (
        0.3 * df['attendance_percentage'] +
        2.0 * df['study_hours'] +
        1.5 * df['internal_marks'] +
        0.5 * df['assignments_submitted'] +
        10 * df['participation_in_activities'] +
        np.random.normal(0, 5, 100)
    )
    # Define Pass (1) or Fail (0) based on a threshold
    df['Performance'] = np.where(df['Performance'] > 100, 1, 0)

    X = df.drop('Performance', axis=1)
    y = df['Performance']

    # --- 2. Train a Simple Model ---
    model = LogisticRegression(solver='liblinear', random_state=42)
    model.fit(X, y)

    # --- 3. Save the Model to model.pkl ---
    with open('model.pkl', 'wb') as file:
        pickle.dump(model, file)

    # --- SUCCESS MESSAGE ---
    print("✅ model.pkl created successfully with a dummy Logistic Regression model.")
    
except Exception as e:
    # --- ERROR MESSAGE ---
    print("-------------------------------------------------------")
    print("FATAL ERROR: Could not create model.pkl due to an error:")
    print(f"Error Type: {type(e).__name__}")
    print(f"Details: {e}")
    print("-------------------------------------------------------")
    sys.exit(1) # Exit with an error code