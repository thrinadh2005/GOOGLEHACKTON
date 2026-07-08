export default function Analytics() {
  return (
    <div className="space-y-6 max-w-7xl mx-auto">
      <div className="flex justify-between items-end mb-8">
        <div>
          <h1 className="text-3xl font-black text-slate-800 tracking-tight">Analytics & Reports</h1>
          <p className="text-slate-500 font-medium mt-1">Hospital-wide AI predictive trends and patient triage metrics.</p>
        </div>
        <button className="bg-blue-600 hover:bg-blue-700 text-white px-6 py-2.5 rounded-xl font-bold shadow-lg shadow-blue-200 transition-all">
          Export Report
        </button>
      </div>

      {/* KPI Cards */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        <div className="bg-white p-6 rounded-2xl shadow-xl shadow-slate-200/50 border border-slate-100 hover:-translate-y-1 transition-transform">
          <p className="text-sm font-bold text-slate-400 uppercase tracking-wider mb-2">Total Patients Screened</p>
          <div className="flex items-end gap-3">
            <h3 className="text-4xl font-black text-slate-800">1,284</h3>
            <span className="text-emerald-500 font-bold mb-1">+14% this week</span>
          </div>
        </div>
        <div className="bg-white p-6 rounded-2xl shadow-xl shadow-slate-200/50 border border-slate-100 hover:-translate-y-1 transition-transform">
          <p className="text-sm font-bold text-slate-400 uppercase tracking-wider mb-2">High Risk Identified</p>
          <div className="flex items-end gap-3">
            <h3 className="text-4xl font-black text-rose-600">342</h3>
            <span className="text-rose-500 font-bold mb-1">+2% this week</span>
          </div>
        </div>
        <div className="bg-white p-6 rounded-2xl shadow-xl shadow-slate-200/50 border border-slate-100 hover:-translate-y-1 transition-transform">
          <p className="text-sm font-bold text-slate-400 uppercase tracking-wider mb-2">AI Accuracy Rate</p>
          <div className="flex items-end gap-3">
            <h3 className="text-4xl font-black text-blue-600">92.4%</h3>
            <span className="text-emerald-500 font-bold mb-1">Stable</span>
          </div>
        </div>
      </div>

      {/* Chart Placeholder */}
      <div className="bg-white rounded-2xl shadow-xl shadow-slate-200/50 border border-slate-100 p-8 h-[400px] flex items-center justify-center relative overflow-hidden">
        <div className="absolute inset-0 opacity-10 bg-[radial-gradient(ellipse_at_center,_var(--tw-gradient-stops))] from-blue-400 via-transparent to-transparent"></div>
        <div className="text-center z-10">
          <div className="text-6xl mb-4">📊</div>
          <h3 className="text-xl font-bold text-slate-700">Predictive Risk Distribution Chart</h3>
          <p className="text-slate-400 mt-2">Data visualization module loads here.</p>
        </div>
      </div>
    </div>
  );
}
