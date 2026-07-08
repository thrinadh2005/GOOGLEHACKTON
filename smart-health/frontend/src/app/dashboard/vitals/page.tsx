"use client";
import { useEffect, useState, useRef } from "react";
import { LineChart, Line, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer } from "recharts";
import { Activity, Heart, Droplets, Thermometer } from "lucide-react";

export default function VitalsDashboard() {
  const [data, setData] = useState<any[]>([]);
  const ws = useRef<WebSocket | null>(null);

  useEffect(() => {
    // Generate initial flatline data
    const initialData = Array(20).fill(0).map((_, i) => ({ time: i, heartRate: 75 }));
    setData(initialData);

    const backendUrl = process.env.NEXT_PUBLIC_API_URL?.replace("http", "ws") || "ws://localhost:8000";
    
    ws.current = new WebSocket(`${backendUrl}/api/ws/vitals`);
    
    ws.current.onmessage = (event) => {
      const newData = JSON.parse(event.data);
      setData(prev => {
        const next = [...prev.slice(1), { ...newData, time: prev[prev.length-1].time + 1 }];
        return next;
      });
    };

    return () => {
      ws.current?.close();
    };
  }, []);

  const latest = data[data.length - 1] || {};

  return (
    <div className="space-y-8">
      <div>
        <h1 className="text-3xl font-black text-slate-800 flex items-center gap-3">
          <Activity className="text-blue-600 w-8 h-8 animate-pulse" />
          Live IoT Edge Vitals
        </h1>
        <p className="text-slate-500 font-medium mt-1">Real-time sub-millisecond telemetry from Edge nodes.</p>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-4 gap-6">
        <div className="bg-white p-6 rounded-3xl shadow-xl shadow-rose-200/40 border border-rose-100 relative overflow-hidden">
          <Heart className="w-10 h-10 text-rose-500 mb-4 opacity-80" />
          <h3 className="text-slate-500 font-bold text-sm uppercase">Heart Rate</h3>
          <p className="text-4xl font-black text-slate-800 mt-2">{latest.heartRate || "--"} <span className="text-lg text-slate-400">bpm</span></p>
          <div className="absolute -bottom-10 -right-10 w-32 h-32 bg-rose-500/10 rounded-full blur-2xl"></div>
        </div>
        
        <div className="bg-white p-6 rounded-3xl shadow-xl shadow-blue-200/40 border border-blue-100 relative overflow-hidden">
          <Activity className="w-10 h-10 text-blue-500 mb-4 opacity-80" />
          <h3 className="text-slate-500 font-bold text-sm uppercase">Blood Pressure</h3>
          <p className="text-3xl font-black text-slate-800 mt-2">{latest.bloodPressureSys || "--"}/{latest.bloodPressureDia || "--"} <span className="text-lg text-slate-400">mmHg</span></p>
          <div className="absolute -bottom-10 -right-10 w-32 h-32 bg-blue-500/10 rounded-full blur-2xl"></div>
        </div>
        
        <div className="bg-white p-6 rounded-3xl shadow-xl shadow-emerald-200/40 border border-emerald-100 relative overflow-hidden">
          <Droplets className="w-10 h-10 text-emerald-500 mb-4 opacity-80" />
          <h3 className="text-slate-500 font-bold text-sm uppercase">SpO2</h3>
          <p className="text-4xl font-black text-slate-800 mt-2">{latest.spo2 || "--"} <span className="text-lg text-slate-400">%</span></p>
          <div className="absolute -bottom-10 -right-10 w-32 h-32 bg-emerald-500/10 rounded-full blur-2xl"></div>
        </div>
        
        <div className="bg-white p-6 rounded-3xl shadow-xl shadow-amber-200/40 border border-amber-100 relative overflow-hidden">
          <Thermometer className="w-10 h-10 text-amber-500 mb-4 opacity-80" />
          <h3 className="text-slate-500 font-bold text-sm uppercase">Temp</h3>
          <p className="text-4xl font-black text-slate-800 mt-2">{latest.temperature || "--"} <span className="text-lg text-slate-400">°F</span></p>
          <div className="absolute -bottom-10 -right-10 w-32 h-32 bg-amber-500/10 rounded-full blur-2xl"></div>
        </div>
      </div>

      <div className="bg-white p-8 rounded-3xl shadow-xl shadow-slate-200/50 border border-slate-100">
        <h2 className="text-xl font-bold text-slate-800 mb-6">Continuous ECG Streaming (Mock)</h2>
        <div className="h-[400px] w-full">
          <ResponsiveContainer width="100%" height="100%">
            <LineChart data={data} margin={{ top: 5, right: 30, left: 20, bottom: 5 }}>
              <CartesianGrid strokeDasharray="3 3" stroke="#f1f5f9" vertical={false} />
              <XAxis dataKey="time" hide />
              <YAxis domain={['auto', 'auto']} stroke="#94a3b8" />
              <Tooltip 
                contentStyle={{ borderRadius: '12px', border: 'none', boxShadow: '0 10px 25px -5px rgba(0,0,0,0.1)' }}
              />
              <Line 
                type="monotone" 
                dataKey="heartRate" 
                stroke="#e11d48" 
                strokeWidth={4} 
                dot={false}
                isAnimationActive={false}
              />
            </LineChart>
          </ResponsiveContainer>
        </div>
      </div>
    </div>
  );
}
