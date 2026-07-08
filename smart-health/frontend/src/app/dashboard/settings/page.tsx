"use client";
import { ShieldCheck, Lock, Fingerprint, EyeOff, Server, UserCheck } from "lucide-react";
import { useState } from "react";

export default function SettingsCompliance() {
  const [federatedEnabled, setFederatedEnabled] = useState(true);

  return (
    <div className="space-y-8 max-w-4xl">
      <div>
        <h1 className="text-3xl font-black text-slate-800 flex items-center gap-3">
          <ShieldCheck className="text-indigo-600 w-8 h-8" />
          Security & Compliance
        </h1>
        <p className="text-slate-500 font-medium mt-1">Manage your zero-trust privacy settings and view compliance metrics.</p>
      </div>

      <div className="bg-white rounded-3xl shadow-xl shadow-slate-200/50 border border-slate-100 overflow-hidden">
        <div className="p-6 border-b border-slate-100 bg-slate-50/50">
          <h2 className="text-xl font-bold text-slate-800">Privacy Controls</h2>
        </div>
        
        <div className="p-6 space-y-6">
          <div className="flex items-center justify-between p-4 border border-slate-200 rounded-2xl bg-white hover:border-indigo-200 transition-colors">
            <div className="flex gap-4">
              <div className="w-12 h-12 bg-indigo-50 text-indigo-600 rounded-xl flex items-center justify-center shrink-0">
                <Server size={24} />
              </div>
              <div>
                <h3 className="font-bold text-slate-800 text-lg">Federated Learning Participation</h3>
                <p className="text-sm text-slate-500 font-medium mt-1 pr-8">Allow your anonymized local model weights to be securely aggregated into the global SmartCare AI. Your raw PII never leaves this device.</p>
              </div>
            </div>
            
            <button 
              onClick={() => setFederatedEnabled(!federatedEnabled)}
              className={`w-14 h-8 rounded-full flex items-center p-1 transition-colors shrink-0 ${federatedEnabled ? 'bg-indigo-600' : 'bg-slate-300'}`}
            >
              <div className={`w-6 h-6 bg-white rounded-full shadow-md transform transition-transform ${federatedEnabled ? 'translate-x-6' : 'translate-x-0'}`}></div>
            </button>
          </div>

          <div className="flex items-center justify-between p-4 border border-slate-200 rounded-2xl bg-slate-50 opacity-70">
            <div className="flex gap-4">
              <div className="w-12 h-12 bg-slate-200 text-slate-500 rounded-xl flex items-center justify-center shrink-0">
                <Lock size={24} />
              </div>
              <div>
                <h3 className="font-bold text-slate-700 text-lg">End-to-End Encryption (E2EE)</h3>
                <p className="text-sm text-slate-500 font-medium mt-1">AES-256 encryption is mandated by the enterprise administrator. Cannot be disabled.</p>
              </div>
            </div>
            <div className="text-sm font-bold text-emerald-600 uppercase bg-emerald-100 px-3 py-1 rounded-full">Enforced</div>
          </div>
        </div>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        <div className="bg-slate-900 rounded-3xl p-6 text-white relative overflow-hidden shadow-2xl">
          <Fingerprint className="w-10 h-10 text-emerald-400 mb-4 opacity-80" />
          <h3 className="font-bold text-sm uppercase tracking-wide text-slate-400">OAuth 2.0 Identity</h3>
          <p className="text-xl font-bold mt-2">Verified via Google Auth</p>
          <p className="text-sm text-slate-500 mt-2 font-mono">JWT Token: Valid (Expires in 58m)</p>
          <div className="absolute -bottom-10 -right-10 w-32 h-32 bg-emerald-500/10 rounded-full blur-2xl"></div>
        </div>
        
        <div className="bg-slate-900 rounded-3xl p-6 text-white relative overflow-hidden shadow-2xl">
          <EyeOff className="w-10 h-10 text-blue-400 mb-4 opacity-80" />
          <h3 className="font-bold text-sm uppercase tracking-wide text-slate-400">ISO 21434 Audit</h3>
          <p className="text-xl font-bold mt-2">Zero-Trust Secured</p>
          <p className="text-sm text-slate-500 mt-2 font-mono">No threat vectors detected.</p>
          <div className="absolute -bottom-10 -right-10 w-32 h-32 bg-blue-500/10 rounded-full blur-2xl"></div>
        </div>
      </div>
    </div>
  );
}
