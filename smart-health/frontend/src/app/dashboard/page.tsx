export default function Dashboard() {
  return (
    <div className="space-y-10">
      
      {/* Header Section */}
      <div>
        <h1 className="text-4xl font-black text-slate-800 tracking-tight">Welcome back, BANNU! 👋</h1>
        <p className="text-lg text-slate-500 font-medium mt-2">Here's your health overview for today.</p>
      </div>

      {/* KPI Stats */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        <div className="bg-blue-50/50 p-6 rounded-3xl border border-blue-100 flex items-center gap-4">
          <div className="w-14 h-14 bg-blue-100 text-blue-600 rounded-2xl flex items-center justify-center text-2xl font-black">
            0
          </div>
          <span className="text-lg font-bold text-slate-700">Scheduled</span>
        </div>
        
        <div className="bg-emerald-50/50 p-6 rounded-3xl border border-emerald-100 flex items-center gap-4">
          <div className="w-14 h-14 bg-emerald-100 text-emerald-600 rounded-2xl flex items-center justify-center text-2xl font-black">
            0
          </div>
          <span className="text-lg font-bold text-slate-700">Upcoming</span>
        </div>
        
        <div className="bg-rose-50/50 p-6 rounded-3xl border border-rose-100 flex items-center gap-4">
          <div className="w-14 h-14 bg-rose-100 text-rose-600 rounded-2xl flex items-center justify-center text-2xl font-black">
            0
          </div>
          <span className="text-lg font-bold text-slate-700">Alerts</span>
        </div>
      </div>

      {/* Main Sections Grid */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
        
        {/* Today's Medicines */}
        <div className="bg-white p-8 rounded-3xl shadow-xl shadow-slate-200/40 border border-slate-100 flex flex-col justify-between">
          <div>
            <div className="w-12 h-12 bg-blue-50 text-blue-600 rounded-xl flex items-center justify-center text-xl mb-6">💊</div>
            <h2 className="text-xl font-bold text-slate-800 mb-2">Today's Medicines</h2>
            <p className="text-slate-500 font-medium">No medicines scheduled for today.</p>
          </div>
          <button className="mt-8 text-blue-600 font-bold hover:text-blue-700 text-left">
            View All Medicines &rarr;
          </button>
        </div>

        {/* Appointments */}
        <div className="bg-white p-8 rounded-3xl shadow-xl shadow-slate-200/40 border border-slate-100 flex flex-col justify-between">
          <div>
            <div className="w-12 h-12 bg-purple-50 text-purple-600 rounded-xl flex items-center justify-center text-xl mb-6">📅</div>
            <h2 className="text-xl font-bold text-slate-800 mb-2">Appointments</h2>
            <p className="text-slate-500 font-medium">No upcoming appointments.</p>
          </div>
          <button className="mt-8 text-purple-600 font-bold hover:text-purple-700 text-left">
            Manage Appointments &rarr;
          </button>
        </div>

        {/* Expiry Alerts */}
        <div className="bg-white p-8 rounded-3xl shadow-xl shadow-slate-200/40 border border-slate-100 flex flex-col justify-between">
          <div>
            <div className="w-12 h-12 bg-amber-50 text-amber-600 rounded-xl flex items-center justify-center text-xl mb-6">⚠️</div>
            <h2 className="text-xl font-bold text-slate-800 mb-2">Expiry Alerts</h2>
            <p className="text-emerald-500 font-medium">All medicines are within safe dates.</p>
          </div>
          <button className="mt-8 text-amber-600 font-bold hover:text-amber-700 text-left">
            Check Inventory &rarr;
          </button>
        </div>

      </div>

      {/* Quick Action Buttons */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6 pt-6 border-t border-slate-100 print:hidden">
        
        <button className="bg-white border-2 border-slate-100 p-6 rounded-2xl hover:border-blue-500 hover:shadow-lg transition-all text-left group">
          <div className="flex items-center gap-4 mb-2">
            <span className="text-2xl">➕</span>
            <h3 className="text-lg font-bold text-slate-800 group-hover:text-blue-600 transition-colors">Add Medicine</h3>
          </div>
          <p className="text-slate-500 font-medium ml-10">Schedule new dosages</p>
        </button>
        
        <button className="bg-white border-2 border-slate-100 p-6 rounded-2xl hover:border-purple-500 hover:shadow-lg transition-all text-left group">
          <div className="flex items-center gap-4 mb-2">
            <span className="text-2xl">🏥</span>
            <h3 className="text-lg font-bold text-slate-800 group-hover:text-purple-600 transition-colors">Book Appointment</h3>
          </div>
          <p className="text-slate-500 font-medium ml-10">Visit your doctor</p>
        </button>
        
        <button className="bg-white border-2 border-slate-100 p-6 rounded-2xl hover:border-amber-500 hover:shadow-lg transition-all text-left group">
          <div className="flex items-center gap-4 mb-2">
            <span className="text-2xl">🔍</span>
            <h3 className="text-lg font-bold text-slate-800 group-hover:text-amber-600 transition-colors">Track Expiry</h3>
          </div>
          <p className="text-slate-500 font-medium ml-10">Check stock dates</p>
        </button>

      </div>
    </div>
  );
}
