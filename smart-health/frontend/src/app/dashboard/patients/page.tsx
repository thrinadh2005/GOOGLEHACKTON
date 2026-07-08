export default function PatientsDirectory() {
  return (
    <div className="space-y-6 max-w-7xl mx-auto">
      <div className="flex justify-between items-end mb-8">
        <div>
          <h1 className="text-3xl font-black text-slate-800 tracking-tight">Patient Directory</h1>
          <p className="text-slate-500 font-medium mt-1">Manage all registered patients and review AI risk assessments.</p>
        </div>
        <button className="bg-emerald-500 hover:bg-emerald-600 text-white px-6 py-2.5 rounded-xl font-bold shadow-lg shadow-emerald-200 transition-all">
          + Add New Patient
        </button>
      </div>

      <div className="bg-white rounded-2xl shadow-xl shadow-slate-200/50 border border-slate-100 overflow-hidden">
        <div className="p-4 border-b border-slate-100 bg-slate-50 flex gap-4">
          <input 
            type="text" 
            placeholder="Search by Name or ID..." 
            className="flex-1 px-4 py-2 border border-slate-200 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 bg-white"
          />
          <button className="px-6 py-2 border border-slate-200 bg-white text-slate-600 rounded-lg hover:bg-slate-100 font-medium transition-colors">
            Filter
          </button>
        </div>
        
        <table className="w-full text-left border-collapse">
          <thead>
            <tr className="bg-white border-b border-slate-100 text-slate-400 text-sm uppercase tracking-wider">
              <th className="p-4 font-bold">Patient ID</th>
              <th className="p-4 font-bold">Name</th>
              <th className="p-4 font-bold">Last Vitals Sync</th>
              <th className="p-4 font-bold">AI Risk Status</th>
              <th className="p-4 font-bold text-right">Actions</th>
            </tr>
          </thead>
          <tbody className="divide-y divide-slate-50">
            {[
              { id: "12345", name: "John Doe", time: "10 mins ago", status: "High Risk", color: "text-rose-600 bg-rose-50 border-rose-200" },
              { id: "12346", name: "Jane Smith", time: "1 hour ago", status: "Low Risk", color: "text-emerald-600 bg-emerald-50 border-emerald-200" },
              { id: "12347", name: "Robert Johnson", time: "2 hours ago", status: "Moderate", color: "text-amber-600 bg-amber-50 border-amber-200" },
            ].map((patient) => (
              <tr key={patient.id} className="hover:bg-slate-50 transition-colors group">
                <td className="p-4 font-medium text-slate-600">#{patient.id}</td>
                <td className="p-4 font-bold text-slate-800">{patient.name}</td>
                <td className="p-4 text-slate-500 text-sm">{patient.time}</td>
                <td className="p-4">
                  <span className={`px-3 py-1 rounded-full text-xs font-bold border ${patient.color}`}>
                    {patient.status}
                  </span>
                </td>
                <td className="p-4 text-right">
                  <button className="text-blue-600 font-bold text-sm hover:underline opacity-0 group-hover:opacity-100 transition-opacity">View Profile</button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
}
