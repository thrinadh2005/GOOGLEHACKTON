"use client";
import { FileText, Search, Database, Download } from "lucide-react";
import { useState, useEffect } from "react";

export default function EHRLookup() {
  const [search, setSearch] = useState("");
  const [records, setRecords] = useState<any[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    // Fetch live EHR records from FastAPI
    const fetchEHR = async () => {
      try {
        const tokenMatch = document.cookie.match(/token=([^;]+)/);
        const token = tokenMatch ? tokenMatch[1] : "mock_admin_token";
        
        const backendUrl = process.env.NEXT_PUBLIC_API_URL || "http://localhost:8000";
        const res = await fetch(`${backendUrl}/api/doctor/ehr`, {
          headers: {
            "Authorization": `Bearer ${token}`
          }
        });
        
        if (res.ok) {
          const data = await res.json();
          setRecords(data);
        }
      } catch (e) {
        console.error("Failed to fetch EHR records", e);
      } finally {
        setLoading(false);
      }
    };
    
    fetchEHR();
  }, []);

  const filteredRecords = records.filter(r => 
    r.patient.toLowerCase().includes(search.toLowerCase()) || 
    r.id.toLowerCase().includes(search.toLowerCase())
  );

  return (
    <div className="space-y-8">
      <div>
        <h1 className="text-3xl font-black text-slate-800 flex items-center gap-3">
          <Database className="text-emerald-600 w-8 h-8" />
          EHR GridFS Lookup
        </h1>
        <p className="text-slate-500 font-medium mt-1">Securely retrieve unstructured patient records from MongoDB GridFS.</p>
      </div>

      <div className="bg-white border border-slate-200 p-2 rounded-2xl shadow-lg shadow-slate-200/50 flex items-center max-w-2xl">
        <div className="pl-4 text-slate-400"><Search size={20} /></div>
        <input 
          type="text" 
          placeholder="Search by Patient Name or EHR ID..."
          className="w-full bg-transparent border-none focus:ring-0 text-slate-800 font-medium px-4 py-3 outline-none"
          value={search}
          onChange={(e) => setSearch(e.target.value)}
        />
        <button className="bg-emerald-600 hover:bg-emerald-700 text-white font-bold py-3 px-6 rounded-xl transition-colors">
          Query
        </button>
      </div>

      <div className="bg-white rounded-3xl shadow-xl shadow-slate-200/50 border border-slate-100 overflow-hidden">
        <div className="overflow-x-auto">
          {loading ? (
             <div className="p-12 flex justify-center text-slate-400 font-bold animate-pulse">Querying MongoDB GridFS...</div>
          ) : (
            <table className="w-full text-left">
              <thead>
                <tr className="bg-slate-50 border-b border-slate-100 text-xs font-bold text-slate-500 uppercase tracking-wider">
                  <th className="p-6">Record ID</th>
                  <th className="p-6">Patient Name</th>
                  <th className="p-6">Date of Birth</th>
                  <th className="p-6">Last Visit</th>
                  <th className="p-6">Storage Status</th>
                  <th className="p-6 text-right">Actions</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-slate-50">
                {filteredRecords.map((record) => (
                  <tr key={record.id} className="hover:bg-slate-50/50 transition-colors">
                    <td className="p-6 font-mono text-sm font-bold text-emerald-600">{record.id}</td>
                    <td className="p-6 font-bold text-slate-800">{record.patient}</td>
                    <td className="p-6 font-medium text-slate-600">{record.dob}</td>
                    <td className="p-6 font-medium text-slate-600">{record.lastVisit}</td>
                    <td className="p-6">
                      <span className={`px-3 py-1 text-xs font-bold uppercase rounded-full ${
                        record.status.includes('Synced') ? 'bg-blue-100 text-blue-700' : 'bg-slate-100 text-slate-600'
                      }`}>
                        {record.status}
                      </span>
                    </td>
                    <td className="p-6 text-right space-x-2">
                      <button className="p-2 bg-emerald-50 text-emerald-600 hover:bg-emerald-100 rounded-lg transition-colors tooltip" title="View Full Record">
                        <FileText size={18} />
                      </button>
                      <button className="p-2 bg-slate-50 text-slate-600 hover:bg-slate-100 rounded-lg transition-colors tooltip" title="Download DICOM">
                        <Download size={18} />
                      </button>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          )}
        </div>
      </div>
    </div>
  );
}
