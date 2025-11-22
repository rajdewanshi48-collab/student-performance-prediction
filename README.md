# 🎓 Student Performance Predictor – Backend

This is the backend service for the **Student Performance Predictor** project.  
It handles data processing, model training, and provides prediction APIs.

---

## 🚀 Features

- Preprocesses student dataset  
- Trains a Machine Learning model  
- Saves the trained model (`model.pkl`)  
- Exposes API endpoints for prediction  
- Organized folder structure for easy deployment  

---

## Action,Command,Location,Notes
Clone Repo,git clone [YOUR-GITHUB-REPO-LINK],Terminal (Anywhere),
Project Dir,cd student-predictor-project,Terminal,
Backend Dir,cd backend/,Terminal,
Create VENV,python -m venv venv,Terminal,
Activate VENV (Win),.\venv\Scripts\activate,Terminal (Windows),
Frontend Dir,cd ../frontend/,Terminal,
Install Node Deps,npm install,Terminal (frontend/),

Generate Model,python backend/scripts/create_model.py,Terminal (Project Root),Creates model/model.pkl
Install Python Deps,pip install uvicorn fastapi pandas scikit-learn,Terminal (backend/),
Run Backend API,uvicorn main:app --reload,Terminal (backend/ with VENV active),Runs the API on port 8000 
Example API Call,"curl -X 'POST' 'http://127.0.0.1:8000/api/predict' -H 'accept: application/json' -H 'Content-Type: application/json' -d '{""study_hours"": 8, ""attendance"": 0.95, ""assignments_completed"": 15, ""past_marks_avg"": 85.5, ""engagement_metrics"": 0.7}'",Terminal (Anywhere),Test the prediction endpoint

## demo video

https://drive.google.com/file/d/1cikugw69H94uu23AI0PS6uUaDJQslzwO/view?usp=drive_link

