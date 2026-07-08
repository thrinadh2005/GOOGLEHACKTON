"use client";
import { Server, Activity, Users, ShieldCheck, Database, Cpu, AlertTriangle } from "lucide-react";

export default function AdminDashboard() {
  const users = [
    { id: "DOC-9912", name: "Dr. Sarah Jenkins", role: "Cardiologist", status: "Active", lastLogin: "2 mins ago" },
    { id: "DOC-4410", name: "Dr. Mark Rolo", role: "Neurologist", status: "Active", lastLogin: "1 hr ago" },
    { id: "PAT-1102", name: "Bannu (Patient)", role: "Patient", status: "Active", lastLogin: "Just now" },
    { id: "PAT-8819", name: "John Doe", role: "Patient", status: "Suspended", lastLogin: "4 days ago" },
  ];

  return (
    <div className="space-y-10">
      
      {/* Header Section */}
      <div className="flex justify-between items-end border-b border-slate-800 pb-6">
        <div>
          <h1 className="text-4xl font-black text-white tracking-tight">Global Command Center</h1>
          <p className="text-lg text-slate-400 font-medium mt-2">Enterprise network telemetry and compliance overview.</p>
        </div>
        <div className="text-right">
          <p className="text-sm text-slate-500 uppercase tracking-widest font-bold">Network Load</p>
          <p className="text-2xl font-black text-emerald-400">Stable (34%)</p>
        </div>
      </div>

      {/* Telemetry Stats */}
      <div className="grid grid-cols-1 md:grid-cols-4 gap-6">
        <div className="bg-slate-900 border border-slate-800 p-6 rounded-2xl">
          <div className="flex justify-between items-start mb-4">
            <Server className="text-blue-500" />
            <span className="text-xs font-mono text-emerald-500 bg-emerald-500/10 px-2 py-1 rounded">ONLINE</span>
          </div>
          <h3 className="text-slate-400 text-sm font-bold uppercase tracking-wide">FastAPI Gateway</h3>
          <p className="text-3xl font-black text-white mt-1">12ms <span className="text-sm font-medium text-slate-500">ping</span></p>
        </div>
        
        <div className="bg-slate-900 border border-slate-800 p-6 rounded-2xl">
          <div className="flex justify-between items-start mb-4">
            <Database className="text-purple-500" />
            <span className="text-xs font-mono text-emerald-500 bg-emerald-500/10 px-2 py-1 rounded">SYNCED</span>
          </div>
          <h3 className="text-slate-400 text-sm font-bold uppercase tracking-wide">MongoDB GridFS</h3>
          <p className="text-3xl font-black text-white mt-1">4.2 <span className="text-sm font-medium text-slate-500">TB</span></p>
        </div>
        
        <div className="bg-slate-900 border border-slate-800 p-6 rounded-2xl">
          <div className="flex justify-between items-start mb-4">
            <Cpu className="text-rose-500" />
            <span className="text-xs font-mono text-rose-500 bg-rose-500/10 px-2 py-1 rounded">HIGH</span>
          </div>
          <h3 className="text-slate-400 text-sm font-bold uppercase tracking-wide">AI Inference GPU</h3>
          <p className="text-3xl font-black text-white mt-1">89% <span className="text-sm font-medium text-slate-500">load</span></p>
        </div>
        
        <div className="bg-slate-900 border border-slate-800 p-6 rounded-2xl">
          <div className="flex justify-between items-start mb-4">
            <ShieldCheck className="text-emerald-500" />
            <span className="text-xs font-mono text-emerald-500 bg-emerald-500/10 px-2 py-1 rounded">SECURE</span>
          </div>
          <h3 className="text-slate-400 text-sm font-bold uppercase tracking-wide">ISO 21434 Status</h3>
          <p className="text-3xl font-black text-white mt-1">100% <span className="text-sm font-medium text-slate-500">pass</span></p>
        </div>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
        
        {/* User Management Table */}
        <div className="md:col-span-2 bg-slate-900 border border-slate-800 rounded-3xl overflow-hidden shadow-2xl">
          <div className="p-6 border-b border-slate-800 flex justify-between items-center">
            <h2 className="text-xl font-bold text-white flex items-center gap-2"><Users className="text-blue-500" size={20} /> Identity Access Management</h2>
            <button className="bg-blue-600 hover:bg-blue-700 text-white px-4 py-2 rounded-lg text-sm font-bold transition-colors">
              + Invite User
            </button>
          </div>
          <div className="overflow-x-auto">
            <table className="w-full text-left">
              <thead>
                <tr className="bg-slate-800/50 text-xs font-bold text-slate-400 uppercase tracking-wider">
                  <th className="p-4 pl-6">ID</th>
                  <th className="p-4">Name</th>
                  <th className="p-4">Role</th>
                  <th className="p-4">Last Login</th>
                  <th className="p-4 pr-6">Status</th>
                  <th className="p-4">Actions</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-slate-800">
                {users.map((user) => (
                  <tr key={user.id} className="hover:bg-slate-800/30 transition-colors">
                    <td className="p-4 pl-6 font-mono text-xs text-slate-500">{user.id}</td>
                    <td className="p-4 font-bold text-slate-200">{user.name}</td>
                    <td className="p-4 text-sm text-slate-400">{user.role}</td>
                    <td className="p-4 text-sm text-slate-500">{user.lastLogin}</td>
                    <td className="p-4 pr-6">
                      <span className={`px-2 py-1 text-xs font-bold uppercase rounded border ${
                        user.status === 'Active' ? 'bg-emerald-500/10 text-emerald-400 border-emerald-500/20' : 'bg-rose-500/10 text-rose-400 border-rose-500/20'
                      }`}>
                        {user.status}
                      </span>
                    </td>
                    <td className="p-4">
                      <button className="text-blue-400 hover:text-blue-300 text-sm font-bold mr-3">Edit</button>
                      <button className="text-rose-400 hover:text-rose-300 text-sm font-bold">Suspend</button>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>

        {/* Compliance Audit Log */}
        <div className="bg-slate-900 border border-slate-800 p-6 rounded-3xl shadow-2xl flex flex-col">
          <h2 className="text-xl font-bold text-white flex items-center gap-2 mb-6"><ShieldCheck className="text-emerald-500" size={20} /> Live Compliance Audit</h2>
          
          <div className="space-y-4 flex-1">
            <div className="bg-slate-800/50 p-4 rounded-xl border border-slate-700/50">
              <div className="flex items-center gap-2 mb-1">
                <ShieldCheck className="text-emerald-400" size={16} />
                <span className="font-bold text-slate-200 text-sm">Data Encryption at Rest</span>
              </div>
              <p className="text-xs text-slate-500">AES-256 enabled on GridFS clusters.</p>
            </div>
            
            <div className="bg-slate-800/50 p-4 rounded-xl border border-slate-700/50">
              <div className="flex items-center gap-2 mb-1">
                <ShieldCheck className="text-emerald-400" size={16} />
                <span className="font-bold text-slate-200 text-sm">OAuth/JWT Session Limits</span>
              </div>
              <p className="text-xs text-slate-500">Tokens strictly expiring in 1 hour.</p>
            </div>
            
            <div className="bg-rose-900/20 p-4 rounded-xl border border-rose-900/50">
              <div className="flex items-center gap-2 mb-1">
                <AlertTriangle className="text-rose-400" size={16} />
                <span className="font-bold text-rose-200 text-sm">Unauthorized Edge Node</span>
              </div>
              <p className="text-xs text-rose-400/80">Attempt blocked from IP 192.168.x.x</p>
            </div>
            
             <div className="bg-slate-800/50 p-4 rounded-xl border border-slate-700/50">
              <div className="flex items-center gap-2 mb-1">
                <ShieldCheck className="text-emerald-400" size={16} />
                <span className="font-bold text-slate-200 text-sm">HIPAA PII Sandboxing</span>
              </div>
              <p className="text-xs text-slate-500">Zero-knowledge proofs validated.</p>
            </div>
          </div>
          
          <button className="w-full mt-6 bg-slate-800 hover:bg-slate-700 text-white font-bold py-3 rounded-xl transition-colors border border-slate-700">
            Generate Audit Report PDF
          </button>
        </div>

      </div>
    </div>
  );
}
