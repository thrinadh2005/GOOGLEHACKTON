"use client";
import { useEffect, useState } from "react";
import { AreaChart, Area, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer } from "recharts";
import { Network, Server, Zap } from "lucide-react";

export default function AnalyticsDashboard() {
  const [data, setData] = useState<any[]>([]);

  useEffect(() => {
    // Mock Federated Learning Data Generation over epochs
    const generateData = () => {
      let currentAcc = 78.5;
      const history = [];
      for (let i = 1; i <= 50; i++) {
        history.push({
          epoch: `E${i}`,
          accuracy: currentAcc,
          nodes: Math.floor(10 + (i * 1.5))
        });
        // Asymptotically approach 98% accuracy
        currentAcc = currentAcc + (98 - currentAcc) * 0.15 + (Math.random() * 0.5 - 0.25);
      }
      setData(history);
    };
    generateData();
  }, []);

  return (
    <div className="space-y-8">
      <div>
        <h1 className="text-3xl font-black text-slate-800 flex items-center gap-3">
          <Network className="text-purple-600 w-8 h-8" />
          Federated Learning Network
        </h1>
        <p className="text-slate-500 font-medium mt-1">Aggregating decentralized AI weights without compromising patient data.</p>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        <div className="bg-gradient-to-br from-purple-600 to-indigo-700 p-6 rounded-3xl shadow-xl shadow-purple-200 text-white relative overflow-hidden">
          <Server className="w-10 h-10 mb-4 opacity-80" />
          <h3 className="font-bold text-sm uppercase tracking-wide text-purple-200">Active Edge Nodes</h3>
          <p className="text-4xl font-black mt-2">124 <span className="text-lg font-medium text-purple-200">Hospitals</span></p>
          <div className="absolute -bottom-10 -right-10 w-32 h-32 bg-white/10 rounded-full blur-2xl"></div>
        </div>
        
        <div className="bg-white border border-slate-200 p-6 rounded-3xl shadow-lg">
          <Zap className="w-10 h-10 text-amber-500 mb-4" />
          <h3 className="font-bold text-sm uppercase tracking-wide text-slate-500">Global Model Accuracy</h3>
          <p className="text-4xl font-black text-slate-800 mt-2">97.8<span className="text-lg text-slate-400">%</span></p>
        </div>
        
        <div className="bg-white border border-slate-200 p-6 rounded-3xl shadow-lg">
          <Network className="w-10 h-10 text-emerald-500 mb-4" />
          <h3 className="font-bold text-sm uppercase tracking-wide text-slate-500">Data Privacy Score</h3>
          <p className="text-4xl font-black text-emerald-600 mt-2">A+ <span className="text-lg text-slate-400">Zero-Knowledge</span></p>
        </div>
      </div>

      <div className="bg-white p-8 rounded-3xl shadow-xl shadow-slate-200/50 border border-slate-100">
        <div className="flex justify-between items-center mb-6">
          <h2 className="text-xl font-bold text-slate-800">Model Convergence across Epochs</h2>
          <span className="bg-purple-100 text-purple-700 px-3 py-1 rounded-full text-xs font-bold uppercase tracking-wide">Live Aggregation</span>
        </div>
        <div className="h-[400px] w-full">
          <ResponsiveContainer width="100%" height="100%">
            <AreaChart data={data} margin={{ top: 10, right: 30, left: 0, bottom: 0 }}>
              <defs>
                <linearGradient id="colorAcc" x1="0" y1="0" x2="0" y2="1">
                  <stop offset="5%" stopColor="#7e22ce" stopOpacity={0.8}/>
                  <stop offset="95%" stopColor="#7e22ce" stopOpacity={0}/>
                </linearGradient>
              </defs>
              <XAxis dataKey="epoch" stroke="#94a3b8" />
              <YAxis domain={['auto', 'auto']} stroke="#94a3b8" />
              <CartesianGrid strokeDasharray="3 3" vertical={false} stroke="#f1f5f9" />
              <Tooltip 
                contentStyle={{ borderRadius: '12px', border: 'none', boxShadow: '0 10px 25px -5px rgba(0,0,0,0.1)' }}
              />
              <Area type="monotone" dataKey="accuracy" stroke="#7e22ce" strokeWidth={4} fillOpacity={1} fill="url(#colorAcc)" />
            </AreaChart>
          </ResponsiveContainer>
        </div>
      </div>
    </div>
  );
}
