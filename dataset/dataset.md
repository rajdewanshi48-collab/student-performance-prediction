# Dataset Documentation

## 📌 Overview
This dataset is used for analyzing and developing features in the *Student Success Predictor* project.  
It contains structured data that supports:

- Model training  
- Analysis  
- Reporting  
- Feature development  

---

## 📁 Dataset Structure

### **1. raw/**
Contains original, unmodified student data.  
Used only as input for cleaning.

Example:  
- `students_raw.csv`

---

### **2. processed/**
Contains cleaned and transformed datasets.

Includes:  
- Null value handling  
- Duplicate removal  
- Feature standardization  
- Label encoding  

Example:  
- `students_clean.csv`

---

### **3. metadata/**
Contains detailed descriptions of each field/column in the dataset.

Example:  
- `metadata.md`

---

## 📊 Data Dictionary

| Field Name | Type | Description |
|-----------|------|-------------|
| student_name | String | Name of the student |
| attendance_percentage | Integer | % of classes attended |
| study_hours_per_week | Integer | Weekly study time |
| internal_marks | Integer | Internal exam marks |
| assignments_submitted | Integer | Number of assignments submitted |
| extracurricular_participation | Integer (0/1) | 1 = Yes, 0 = No |
| result | Pass/Fail | Target output label |

---

## 🧪 Usage
The dataset is used for:

- Predicting student performance  
- Training ML models  
- Analytics and visualizations  

---

## ⚠️ Data Handling Rules
- Never edit files in **raw/**  
- Store cleaned files only in **processed/**  
- Keep metadata updated  
- Use versioning if dataset changes

---

## ✔ Versioning
**v1.0** — Initial dataset created.
