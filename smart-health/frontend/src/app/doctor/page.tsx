"use client";
import { Users, AlertCircle, Clock, Video, FileText, CheckCircle2 } from "lucide-react";

export default function DoctorDashboard() {
  const triageQueue = [
    { id: "PAT-091", name: "Robert Chen", age: 64, riskScore: 92, reason: "Abnormal ECG / Chest Pain", waitTime: "4 mins", critical: true },
    { id: "PAT-112", name: "Maria Garcia", age: 41, riskScore: 78, reason: "Elevated BP / SpO2 Drop", waitTime: "12 mins", critical: true },
    { id: "PAT-004", name: "Bannu", age: 28, riskScore: 24, reason: "Routine Checkup", waitTime: "30 mins", critical: false },
    { id: "PAT-441", name: "James Smith", age: 35, riskScore: 12, reason: "Prescription Renewal", waitTime: "45 mins", critical: false },
  ];

  return (
    <div className="space-y-8">
      <div>
        <h1 className="text-3xl font-black text-slate-800">Welcome, Dr. Jenkins</h1>
        <p className="text-slate-500 font-medium mt-1">You have 2 critical patients waiting in the AI Triage Queue.</p>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        <div className="bg-rose-50 border border-rose-100 p-6 rounded-3xl">
          <div className="flex items-center gap-3 mb-2">
            <AlertCircle className="text-rose-500" />
            <h3 className="font-bold text-rose-800 uppercase tracking-wide text-sm">Critical Waiting</h3>
          </div>
          <p className="text-4xl font-black text-rose-900">2</p>
        </div>
        
        <div className="bg-blue-50 border border-blue-100 p-6 rounded-3xl">
          <div className="flex items-center gap-3 mb-2">
            <Users className="text-blue-500" />
            <h3 className="font-bold text-blue-800 uppercase tracking-wide text-sm">Total in Queue</h3>
          </div>
          <p className="text-4xl font-black text-blue-900">14</p>
        </div>
        
        <div className="bg-emerald-50 border border-emerald-100 p-6 rounded-3xl">
          <div className="flex items-center gap-3 mb-2">
            <CheckCircle2 className="text-emerald-500" />
            <h3 className="font-bold text-emerald-800 uppercase tracking-wide text-sm">Completed Today</h3>
          </div>
          <p className="text-4xl font-black text-emerald-900">8</p>
        </div>
      </div>

      <div className="bg-white rounded-3xl shadow-xl shadow-slate-200/50 border border-slate-100 overflow-hidden">
        <div className="p-6 border-b border-slate-100 bg-slate-50/50 flex justify-between items-center">
          <h2 className="text-xl font-bold text-slate-800 flex items-center gap-2">
            AI Triage Queue
          </h2>
          <span className="text-xs font-bold text-slate-500 uppercase tracking-wider bg-slate-200 px-3 py-1 rounded-full">Sorted by Risk Score</span>
        </div>
        <div className="overflow-x-auto">
          <table className="w-full text-left">
            <thead>
              <tr className="border-b border-slate-100 text-xs font-bold text-slate-400 uppercase tracking-wider">
                <th className="p-4 pl-6">Patient</th>
                <th className="p-4">AI Risk Score</th>
                <th className="p-4">Primary Reason</th>
                <th className="p-4">Wait Time</th>
                <th className="p-4 pr-6 text-right">Actions</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-slate-50">
              {triageQueue.map((patient) => (
                <tr key={patient.id} className="hover:bg-slate-50 transition-colors">
                  <td className="p-4 pl-6">
                    <p className="font-bold text-slate-800">{patient.name}</p>
                    <p className="text-xs text-slate-500 font-mono">{patient.id} • {patient.age} y/o</p>
                  </td>
                  <td className="p-4">
                    <div className="flex items-center gap-2">
                      <div className={`w-8 h-8 rounded-full flex items-center justify-center font-bold text-sm ${
                        patient.critical ? 'bg-rose-100 text-rose-700' : 'bg-emerald-100 text-emerald-700'
                      }`}>
                        {patient.riskScore}
                      </div>
                      {patient.critical && <AlertCircle size={16} className="text-rose-500" />}
                    </div>
                  </td>
                  <td className="p-4">
                    <p className="font-bold text-slate-700 text-sm">{patient.reason}</p>
                  </td>
                  <td className="p-4">
                    <div className="flex items-center gap-1 text-sm font-medium text-slate-500">
                      <Clock size={14} />
                      {patient.waitTime}
                    </div>
                  </td>
                  <td className="p-4 pr-6 text-right space-x-2">
                    <button className="p-2 bg-slate-100 text-slate-600 hover:bg-slate-200 rounded-lg transition-colors tooltip" title="View EHR">
                      <FileText size={18} />
                    </button>
                    <button className="p-2 bg-blue-100 text-blue-600 hover:bg-blue-200 rounded-lg transition-colors tooltip" title="Start Consult">
                      <Video size={18} />
                    </button>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
}
