export default function Settings() {
  return (
    <div className="space-y-6 max-w-4xl mx-auto">
      <div className="mb-8">
        <h1 className="text-3xl font-black text-slate-800 tracking-tight">System Settings</h1>
        <p className="text-slate-500 font-medium mt-1">Configure your clinical preferences and system integrations.</p>
      </div>

      <div className="bg-white rounded-2xl shadow-xl shadow-slate-200/50 border border-slate-100 p-8">
        <h2 className="text-xl font-bold text-slate-800 mb-6 border-b border-slate-100 pb-4">Profile & Authentication</h2>
        
        <div className="space-y-6">
          <div className="flex justify-between items-center">
            <div>
              <p className="font-bold text-slate-700">Two-Factor Authentication (2FA)</p>
              <p className="text-sm text-slate-500 mt-1">Secure your account with an authenticator app.</p>
            </div>
            <button className="bg-emerald-50 text-emerald-600 border border-emerald-200 px-4 py-2 rounded-lg font-bold hover:bg-emerald-100 transition-colors">
              Enabled
            </button>
          </div>
          
          <div className="flex justify-between items-center">
            <div>
              <p className="font-bold text-slate-700">Change Password</p>
              <p className="text-sm text-slate-500 mt-1">Update your JWT credentials.</p>
            </div>
            <button className="px-4 py-2 border border-slate-200 text-slate-600 rounded-lg hover:bg-slate-50 font-medium transition-colors">
              Update
            </button>
          </div>
        </div>
      </div>

      <div className="bg-white rounded-2xl shadow-xl shadow-slate-200/50 border border-slate-100 p-8 mt-6">
        <h2 className="text-xl font-bold text-slate-800 mb-6 border-b border-slate-100 pb-4">AI Model Configuration</h2>
        
        <div className="space-y-6">
          <div className="flex justify-between items-center">
            <div>
              <p className="font-bold text-slate-700">MongoDB GridFS Source</p>
              <p className="text-sm text-slate-500 mt-1">Currently fetching: disease_model.pkl</p>
            </div>
            <span className="flex items-center gap-2 text-sm font-bold text-blue-600 bg-blue-50 px-3 py-1 rounded-full border border-blue-200">
              <span className="w-2 h-2 rounded-full bg-blue-600 animate-pulse"></span>
              Connected
            </span>
          </div>
        </div>
      </div>
    </div>
  );
}
