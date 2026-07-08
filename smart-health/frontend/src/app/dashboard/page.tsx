"use client";
import { useState, useEffect } from "react";

export default function Dashboard() {
  const [patientId, setPatientId] = useState("12345");
  const [patientData, setPatientData] = useState<any>(null);
  const [prediction, setPrediction] = useState<any>(null);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");

  const fetchPatientData = async () => {
    setLoading(true);
    setError("");
    setPrediction(null);
    try {
      const token = localStorage.getItem('smart_health_token');
      const res = await fetch(`http://localhost:8000/api/patients/${patientId}`, {
        headers: {
          'Authorization': `Bearer ${token}`
        }
      });
      if (res.status === 401) {
        window.location.href = '/login';
        return;
      }
      if (!res.ok) throw new Error("Patient not found");
      const data = await res.json();
      setPatientData(data);
    } catch (err: any) {
      setError(err.message);
      setPatientData(null);
    } finally {
      setLoading(false);
    }
  };

  const runAIPrediction = async () => {
    if (!patientData) return;
    setLoading(true);
    try {
      const token = localStorage.getItem('smart_health_token');
      const res = await fetch(`http://localhost:8000/api/ai/predict-disease`, {
        method: "POST",
        headers: { 
          "Content-Type": "application/json",
          "Authorization": `Bearer ${token}`
        },
        body: JSON.stringify({
          patient_id: patientData.patient_id,
          age: patientData.age,
          blood_pressure: patientData.blood_pressure,
          heart_rate: patientData.heart_rate,
          cholesterol: 250 // Mocking some extra data
        })
      });
      if (res.status === 401) {
        window.location.href = '/login';
        return;
      }
      const data = await res.json();
      setPrediction(data.prediction);
    } catch (err: any) {
      setError("Failed to run AI prediction");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="space-y-6">
      <div className="bg-white p-6 rounded-xl shadow-sm border border-slate-100">
        <h2 className="text-lg font-semibold mb-4">Patient Lookup</h2>
        <div className="flex gap-4">
          <input
            type="text"
            value={patientId}
            onChange={(e) => setPatientId(e.target.value)}
            className="flex-1 px-4 py-2 border border-slate-200 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
            placeholder="Enter Patient ID (e.g., 12345)"
          />
          <button 
            onClick={fetchPatientData}
            disabled={loading}
            className="px-6 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 disabled:opacity-50 transition-colors"
          >
            {loading ? "Searching..." : "Search"}
          </button>
        </div>
        {error && <p className="mt-2 text-red-500 text-sm">{error}</p>}
      </div>

      {patientData && (
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          <div className="bg-white p-6 rounded-xl shadow-sm border border-slate-100">
            <h2 className="text-lg font-semibold mb-4 text-slate-800">Patient Vitals (Edge IoT)</h2>
            <div className="space-y-4">
              <div className="flex justify-between p-3 bg-slate-50 rounded-lg border border-slate-100">
                <span className="text-slate-500">Name</span>
                <span className="font-medium text-slate-900">{patientData.name}</span>
              </div>
              <div className="flex justify-between p-3 bg-slate-50 rounded-lg border border-slate-100">
                <span className="text-slate-500">Age</span>
                <span className="font-medium text-slate-900">{patientData.age}</span>
              </div>
              <div className="flex justify-between p-3 bg-slate-50 rounded-lg border border-slate-100">
                <span className="text-slate-500">Blood Pressure</span>
                <span className="font-medium text-slate-900">{patientData.blood_pressure}</span>
              </div>
              <div className="flex justify-between p-3 bg-slate-50 rounded-lg border border-slate-100">
                <span className="text-slate-500">Heart Rate</span>
                <span className="font-medium text-slate-900">{patientData.heart_rate} bpm</span>
              </div>
            </div>
            <button 
              onClick={runAIPrediction}
              disabled={loading}
              className="mt-6 w-full py-3 bg-gradient-to-r from-emerald-500 to-emerald-600 text-white font-semibold rounded-lg hover:from-emerald-600 hover:to-emerald-700 shadow-lg shadow-emerald-500/20 transition-all"
            >
              Run AI Predictive Analysis
            </button>
          </div>

          {prediction && (
            <div className="bg-white p-6 rounded-xl shadow-sm border border-slate-100 relative overflow-hidden">
              <div className={`absolute top-0 left-0 w-1 h-full ${
                prediction.risk_level === 'High' ? 'bg-red-500' :
                prediction.risk_level === 'Medium' ? 'bg-amber-500' : 'bg-emerald-500'
              }`}></div>
              
              <h2 className="text-lg font-semibold mb-4 text-slate-800">AI Analysis Results</h2>
              
              <div className="mb-6">
                <p className="text-sm text-slate-500 mb-1">Risk Level</p>
                <div className="flex items-end gap-3">
                  <span className={`text-4xl font-bold ${
                    prediction.risk_level === 'High' ? 'text-red-500' :
                    prediction.risk_level === 'Medium' ? 'text-amber-500' : 'text-emerald-500'
                  }`}>
                    {prediction.risk_level}
                  </span>
                  <span className="text-sm font-medium text-slate-400 mb-1">
                    ({(prediction.confidence_score * 100).toFixed(0)}% confidence)
                  </span>
                </div>
              </div>

              <div>
                <p className="text-sm text-slate-500 mb-2">Automated Recommendations</p>
                <ul className="space-y-2">
                  {prediction.recommendations.map((rec: string, i: number) => (
                    <li key={i} className="flex items-start gap-2 text-sm text-slate-700 bg-slate-50 p-3 rounded-lg border border-slate-100">
                      <span className="text-emerald-500">✓</span>
                      {rec}
                    </li>
                  ))}
                </ul>
              </div>
            </div>
          )}
        </div>
      )}
    </div>
  );
}
