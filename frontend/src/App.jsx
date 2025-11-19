import React, { useState, useMemo } from 'react';
import { ArrowRight, Clock, Award, CheckCircle, XCircle, FileText, BarChart2, Star, User, Lock, Users, AlertTriangle, Download, UserCheck } from 'lucide-react'; 

// =================================================================
// 1. LOGIN SCREEN COMPONENT (No changes needed)
// =================================================================

const LoginScreen = ({ onLoginSuccess }) => {
    const [username, setUsername] = useState('');
    const [password, setPassword] = useState('');
    const [error, setError] = useState('');

    const handleLogin = (e) => {
        e.preventDefault();
        setError('');

        if (username === 'student' && password === 'pass') {
            onLoginSuccess('student');
        } else if (username === 'faculty' && password === 'pass') {
            onLoginSuccess('faculty');
        } else {
            setError('Invalid username or password. Try student/pass or faculty/pass.');
        }
    };

    return (
        <div className="absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 w-full max-w-sm">
            <div className="bg-white p-8 rounded-xl shadow-2xl border-t-8 border-indigo-600">
                <h2 className="text-3xl font-bold mb-2 text-center text-gray-800 flex items-center justify-center">
                    <Lock className="w-7 h-7 mr-3 text-indigo-600" />
                    Portal Login
                </h2>
                <p className="text-center text-sm mb-6 text-gray-500 border-b pb-4">
                    Use 'student/pass' or 'faculty/pass'
                </p>

                <form onSubmit={handleLogin}>
                    
                    <div className="mb-4">
                        <label htmlFor="username" className="block text-sm font-medium text-gray-700 mb-1">Username</label>
                        <div className="relative">
                            <User className="absolute left-3 top-1/2 transform -translate-y-1/2 w-5 h-5 text-gray-400" />
                            <input 
                                type="text" 
                                id="username" 
                                name="username" 
                                required 
                                value={username}
                                onChange={(e) => setUsername(e.target.value)}
                                className="w-full pl-10 px-3 py-2 border border-gray-300 rounded-lg focus:ring-indigo-500 focus:border-indigo-500 transition duration-150 shadow-sm"
                            />
                        </div>
                    </div>

                    <div className="mb-6">
                        <label htmlFor="password" class="block text-sm font-medium text-gray-700 mb-1">Password</label>
                        <div className="relative">
                            <Lock className="absolute left-3 top-1/2 transform -translate-y-1/2 w-5 h-5 text-gray-400" />
                            <input 
                                type="password" 
                                id="password" 
                                name="password" 
                                required 
                                value={password}
                                onChange={(e) => setPassword(e.target.value)}
                                className="w-full pl-10 px-3 py-2 border border-gray-300 rounded-lg focus:ring-indigo-500 focus:border-indigo-500 transition duration-150 shadow-sm"
                            />
                        </div>
                    </div>
                    
                    {error && (
                        <p className="text-sm text-center text-red-600 mb-4 font-medium">{error}</p>
                    )}

                    <button type="submit" className="w-full bg-indigo-600 text-white font-semibold py-3 rounded-xl hover:bg-indigo-700 transition duration-200 shadow-lg flex items-center justify-center">
                        <ArrowRight className="w-5 h-5 mr-2" /> Log In
                    </button>
                    
                </form>
            </div>
        </div>
    );
};


// =================================================================
// 2. FACULTY DASHBOARD (DYNAMIC DATA)
// =================================================================

const FacultyDashboard = ({ predictions, onLogout }) => {
    const combinedData = predictions;
    
    const atRiskCount = combinedData.filter(s => s.prediction === 'Fail').length;

    return (
        <div className="w-full max-w-4xl p-8 rounded-3xl shadow-xl bg-white border border-gray-200 mx-auto">
            <div className="flex justify-between items-center border-b pb-4 mb-6">
                <h1 className="text-3xl font-extrabold text-gray-900 flex items-center">
                    <Users className="w-7 h-7 mr-3 text-indigo-600" />
                    Faculty Dashboard
                </h1>
                <button 
                    onClick={onLogout} 
                    className="text-sm font-medium text-gray-500 hover:text-indigo-600 transition"
                >
                    Logout
                </button>
            </div>
            
            <div className="flex justify-between items-center mb-6">
                <div className="flex items-center text-xl font-bold">
                    {atRiskCount > 0 ? (
                        <AlertTriangle className="w-6 h-6 mr-2 text-red-600 animate-pulse-slow" />
                    ) : (
                        <UserCheck className="w-6 h-6 mr-2 text-green-600" />
                    )}
                    <span className="text-gray-700">
                        {atRiskCount} Student{atRiskCount !== 1 ? 's' : ''} At Risk (Total: {combinedData.length})
                    </span>
                </div>
                <button className="bg-green-600 text-white py-2 px-4 rounded-lg shadow-md hover:bg-green-700 transition flex items-center">
                    <Download className="w-5 h-5 mr-2" /> Download Report
                </button>
            </div>
            
            {/* --- Student Data Table --- */}
            <div className="overflow-x-auto rounded-lg border border-gray-300 shadow-inner">
                <table className="min-w-full divide-y divide-gray-200">
                    <thead className="bg-gray-100">
                        <tr>
                            <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Name</th>
                            <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Attendance (%)</th>
                            <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Study Hrs</th>
                            <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Internal Marks</th>
                            <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Prediction</th>
                            <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Confidence</th>
                        </tr>
                    </thead>
                    <tbody className="bg-white divide-y divide-gray-200">
                        {combinedData.length === 0 ? (
                            <tr>
                                <td colSpan="6" className="px-6 py-4 text-center text-gray-500 italic">
                                    No predictions have been recorded yet in this session.
                                </td>
                            </tr>
                        ) : (
                            combinedData.map((student, index) => {
                                const isRisk = student.prediction === 'Fail';
                                return (
                                    <tr 
                                        key={index} 
                                        className={isRisk ? 'bg-red-50 hover:bg-red-100 transition' : 'hover:bg-gray-50 transition'}
                                    >
                                        <td className="px-6 py-4 whitespace-nowrap text-sm font-medium text-gray-900 flex items-center">
                                            {isRisk && <AlertTriangle className="w-4 h-4 mr-2 text-red-500" />}
                                            {student.name}
                                        </td>
                                        <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">{student.attendance}%</td>
                                        <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">{student.study_hrs}</td>
                                        <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">{student.internal_marks}</td>
                                        <td className="px-6 py-4 whitespace-nowrap">
                                            <span className={`px-2 inline-flex text-xs leading-5 font-semibold rounded-full 
                                                ${isRisk ? 'bg-red-200 text-red-800' : 'bg-green-200 text-green-800'}`}>
                                                {student.prediction}
                                            </span>
                                        </td>
                                        <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-900">
                                            {(student.confidence * 100).toFixed(2)}%
                                        </td>
                                    </tr>
                                );
                            })
                        )}
                    </tbody>
                </table>
            </div>

            <p className="mt-8 text-sm text-gray-500 text-center">
                This table shows predictions made by students during the current application session.
            </p>
        </div>
    );
};


// =================================================================
// 3. STUDENT PREDICTOR TOOL (FIXED INPUT FOCUS/TYPING)
// =================================================================

const StudentPredictorTool = ({ onLogout, onSavePrediction }) => {
    const [inputs, setInputs] = useState({
        student_name: 'New Student',
        attendance_percentage: 90.0,
        study_hours: 15.0,
        internal_marks: 85.0,
        assignments_submitted: 5,
        participation_in_activities: 1,
    });
    
    const [prediction, setPrediction] = useState(null); 
    const [predictionMessage, setPredictionMessage] = useState("Enter data and press 'Predict' to see the outcome.");
    const [loading, setLoading] = useState(false);

    const isFormValid = useMemo(() => {
        return (
            inputs.student_name.trim() !== '' &&
            inputs.attendance_percentage !== null && !isNaN(inputs.attendance_percentage) &&
            inputs.study_hours !== null && !isNaN(inputs.study_hours) &&
            inputs.internal_marks !== null && !isNaN(inputs.internal_marks) &&
            inputs.assignments_submitted !== null && !isNaN(inputs.assignments_submitted)
        );
    }, [inputs]);

    const handleChange = (e) => {
        const { name, value } = e.target;
        let processedValue;
        
        if (name === 'student_name') {
            processedValue = value; 
        } else if (value === '') {
            processedValue = null; 
        } else if (name === 'assignments_submitted' || name === 'participation_in_activities') {
            processedValue = parseInt(value, 10);
        } else {
            processedValue = parseFloat(value);
        }
        
        setInputs(prev => ({ ...prev, [name]: processedValue }));
    };

    const sendDataToBackend = async () => {
        if (!isFormValid) {
            setPredictionMessage("Please fill the student name and all numerical fields.");
            return;
        }
        setLoading(true);
        setPrediction(null);
        setPredictionMessage("Model is calculating performance...");

        const dataToApi = {
            attendance_percentage: parseFloat(inputs.attendance_percentage),
            study_hours: parseFloat(inputs.study_hours),
            internal_marks: parseFloat(inputs.internal_marks),
            assignments_submitted: parseInt(inputs.assignments_submitted, 10),
            participation_in_activities: parseInt(inputs.participation_in_activities, 10),
        };

        try {
            const response = await fetch("http://localhost:8000/predict", {
                method: 'POST',
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify(dataToApi),
            });

            if (!response.ok) {
                const errorDetail = await response.json().catch(() => ({ detail: `Status ${response.status}` }));
                throw new Error(`Backend Error: ${errorDetail.detail || response.statusText}`);
            }

            const result = await response.json();
            
            const newPrediction = {
                name: inputs.student_name,
                attendance: inputs.attendance_percentage,
                study_hrs: inputs.study_hours,
                internal_marks: inputs.internal_marks,
                prediction: result.predicted_performance,
                confidence: result.confidence_level,
            };
            onSavePrediction(newPrediction); 

            setPrediction(result);
            setPredictionMessage("Prediction complete!");

        } catch (error) {
            console.error("Connection Failed:", error);
            setPredictionMessage(`🚨 Error: Could not get prediction. Check if the backend (Terminal 2) is running.`);
            setPrediction(null);
        } finally {
            setLoading(false);
        }
    };

    const InputField = ({ label, name, min, max, unit, icon: Icon, step = '0.1', type = 'number' }) => (
        <div className="mb-4">
            <label htmlFor={name} className="block text-sm font-semibold text-gray-700 mb-1 capitalize">
                {label.replace('_', ' ')}
            </label>
            <div className="relative input-group">
                {Icon && <Icon className="absolute left-3 top-1/2 transform -translate-y-1/2 w-5 h-5 text-indigo-400" />}
                <input
                    id={name}
                    type={type}
                    name={name}
                    value={inputs[name] === null ? '' : inputs[name]}
                    onChange={handleChange}
                    min={min}
                    max={max}
                    step={step}
                    className={`w-full ${Icon ? 'pl-10' : 'pl-4'} pr-12 py-2 border border-gray-300 rounded-xl focus:ring-indigo-500 focus:border-indigo-500 transition duration-150 shadow-inner bg-white`}
                />
                {unit && (
                    <span className="absolute right-3 top-1/2 transform -translate-y-1/2 text-gray-500 text-sm font-medium">
                        {unit}
                    </span>
                )}
            </div>
        </div>
    );

    const ResultCard = ({ result }) => {
        if (!result) return null;

        const isPass = result.predicted_performance === 'Pass';
        const Icon = isPass ? Star : XCircle;

        const bgColor = isPass ? 'bg-green-50' : 'bg-red-50';
        const textColor = isPass ? 'text-green-700' : 'text-red-700';
        const borderColor = isPass ? 'border-green-500' : 'border-red-500';

        return (
            <div 
                className={`mt-8 p-6 rounded-2xl shadow-xl border-t-4 ${borderColor} ${bgColor} 
                           transition duration-300 transform scale-100 animate-fadeIn border-l border-r`}
            >
                <div className="flex items-center justify-between">
                    <h2 className={`text-3xl font-extrabold ${textColor} flex items-center`}>
                        <Icon className={`w-8 h-8 mr-3 ${isPass ? 'text-green-600' : 'text-red-600'} animate-pulse-slow`} />
                        {isPass ? 'Success Predicted' : 'At Risk'}
                    </h2>
                    <span className={`text-sm font-bold px-4 py-1 rounded-full ${isPass ? 'bg-green-600 text-white shadow-md' : 'bg-red-600 text-white shadow-md'}`}>
                        {result.predicted_performance}
                    </span>
                </div>
                
                <div className="mt-4 border-t pt-4 insights-section">
                    <div className="mt-3 flex justify-between items-center bg-white p-3 rounded-lg border border-gray-200 shadow-inner">
                        <span className="text-gray-700 font-medium">Model Confidence:</span>
                        <span className={`text-xl font-extrabold ${isPass ? 'text-green-600' : 'text-red-600'}`}>
                            {(result.confidence_level * 100).toFixed(2)}%
                        </span>
                    </div>
                </div>
            </div>
        );
    };

    return (
        <div className="w-full max-w-xl p-8 rounded-3xl shadow-xl bg-white border border-gray-200 mx-auto">
            <div className="flex justify-between items-center border-b pb-4 mb-4">
                <h1 className="text-3xl font-extrabold text-gray-900 flex items-center">
                    <BarChart2 className="w-7 h-7 mr-3 text-indigo-600" />
                    Student Predictor
                </h1>
                <button 
                    onClick={onLogout} 
                    className="text-sm font-medium text-gray-500 hover:text-indigo-600 transition"
                >
                    Logout
                </button>
            </div>
            
            <p className="text-md text-gray-600 mb-8 pb-4">
                Analyze student outcome by entering their key performance metrics below.
            </p>

            {/* --- Input Form for Student Features --- */}
            <div className="grid grid-cols-2 gap-x-6 gap-y-4 mb-8">
                {/* *** FIX IMPLEMENTED HERE: Direct Student Name Input ***
                    We define this input directly to prevent external component conflicts.
                */}
                <div className="col-span-2 mb-4">
                    <label htmlFor="student_name" className="block text-sm font-semibold text-gray-700 mb-1 capitalize">
                        Student Name
                    </label>
                    <div className="relative input-group">
                        <User className="absolute left-3 top-1/2 transform -translate-y-1/2 w-5 h-5 text-indigo-400" />
                        <input
                            id="student_name"
                            type="text"
                            name="student_name"
                            value={inputs.student_name} 
                            onChange={handleChange}
                            className="w-full pl-10 pr-12 py-2 border border-gray-300 rounded-xl focus:ring-indigo-500 focus:border-indigo-500 transition duration-150 shadow-inner bg-white"
                        />
                    </div>
                </div>
                
                {/* The rest of the inputs use the InputField component for numbers */}
                <InputField label="attendance_percentage" name="attendance_percentage" min="0" max="100" unit="%" icon={CheckCircle} />
                <InputField label="study_hours" name="study_hours" min="0" unit="Hrs" icon={Clock} />
                <InputField label="internal_marks" name="internal_marks" min="0" max="100" unit="Marks" icon={Award} />
                <InputField label="assignments_submitted" name="assignments_submitted" min="0" step="1" unit="Count" icon={FileText} />
                
                {/* Participation Select Field */}
                <div className="col-span-2">
                    <label htmlFor="participation_in_activities" className="block text-sm font-semibold text-gray-700 mb-1">
                        Participates in Extracurriculars?
                    </label>
                    <div className="relative input-group">
                        <select
                            id="participation_in_activities"
                            name="participation_in_activities"
                            value={inputs.participation_in_activities}
                            onChange={handleChange}
                            className="w-full p-2 pl-4 border border-gray-300 rounded-xl focus:ring-indigo-600 focus:border-indigo-600 transition duration-150 shadow-inner bg-white appearance-none"
                        >
                            <option value={1}>Yes (1)</option>
                            <option value={0}>No (0)</option>
                        </select>
                    </div>
                </div>
            </div>

            {/* --- Submit Button --- */}
            <button
                onClick={sendDataToBackend}
                disabled={loading || !isFormValid} 
                className={`w-full flex items-center justify-center px-6 py-3 border-4 border-transparent text-xl font-extrabold rounded-xl shadow-lg text-white transition duration-300 transform active:scale-[0.98]
                            ${loading || !isFormValid 
                                ? 'bg-gray-400 cursor-not-allowed' 
                                : 'bg-indigo-600 hover:bg-indigo-700 hover:shadow-2xl hover:border-indigo-700'}`}
            >
                {loading ? (
                    <svg className="animate-spin -ml-1 mr-3 h-6 w-6 text-white" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24">
                        <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle>
                        <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
                    </svg>
                ) : (
                    <>
                        Predict Outcome 
                        <ArrowRight className="w-6 h-6 ml-3" />
                    </>
                )}
            </button>
            
            {!isFormValid && (
                <p className="mt-4 text-sm text-center font-semibold text-red-600">
                    Please fill the student name and all fields with valid numbers.
                </p>
            )}

            {/* --- Response Display --- */}
            {prediction ? (
                <ResultCard result={prediction} />
            ) : (
                <div className="mt-8 p-4 text-center bg-gray-100 rounded-xl text-gray-700 italic border border-gray-300">
                    {loading ? "Crunching the data..." : predictionMessage}
                </div>
            )}
        </div>
    );
};


// =================================================================
// 4. MAIN APP CONTAINER (Handles Routing)
// =================================================================

const App = () => {
    const [userRole, setUserRole] = useState(null); 
    const [allPredictions, setAllPredictions] = useState([]);

    const handleLoginSuccess = (role) => {
        setUserRole(role);
    };

    const handleLogout = () => {
        setUserRole(null);
    };
    
    const handleSavePrediction = (newPrediction) => {
        setAllPredictions(prev => [...prev, newPrediction]);
    };

    let content;
    if (userRole === 'student') {
        content = <StudentPredictorTool 
                    onLogout={handleLogout} 
                    onSavePrediction={handleSavePrediction}
                  />;
    } else if (userRole === 'faculty') {
        content = <FacultyDashboard 
                    onLogout={handleLogout} 
                    predictions={allPredictions}
                  />;
    } else {
        content = <LoginScreen onLoginSuccess={handleLoginSuccess} />;
    }

    const customStyles = `
        /* Ensures the background and height cover the entire viewing area */
        body, html, #root {
            height: 100%;
            width: 100%;
            margin: 0;
            padding: 0;
            background-color: #f9fafb !important; 
            overflow: auto; 
        }
        /* Custom CSS from user's input */
        .input-group { margin-bottom: 1.5rem; }
        .insights-section h3 { margin-top: 1rem; padding-bottom: 0.5rem; border-bottom: 1px solid #ddd; }
        @keyframes fadeIn { from { opacity: 0; transform: translateY(10px); } to { opacity: 1; transform: translateY(0); } }
        .animate-fadeIn { animation: fadeIn 0.5s ease-out; }
        @keyframes pulse-slow { 0%, 100% { opacity: 1; } 50% { opacity: 0.5; } }
        .animate-pulse-slow { animation: pulse-slow 3s infinite; }
    `;

    return (
        <div className="w-full min-h-screen bg-gray-50 flex justify-center py-16">
            <style>{customStyles}</style>
            {content}
        </div>
    );
};

export default App;