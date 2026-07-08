"use client";
import Link from "next/link";
import { useRouter } from "next/navigation";

export default function DashboardLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  const router = useRouter();

  const handlePrint = () => {
    window.print();
  };

  const handleVoiceSummary = () => {
    const text = "Welcome back, BANNU! Here is your health overview for today. You have 0 scheduled medicines, 0 upcoming appointments, and 0 alerts. All medicines are within safe dates.";
    const utterance = new SpeechSynthesisUtterance(text);
    utterance.rate = 1.0;
    utterance.pitch = 1.0;
    window.speechSynthesis.speak(utterance);
  };

  const handleLogout = () => {
    document.cookie = 'token=; Max-Age=0; path=/;';
    router.push('/login');
  };

  return (
    <div className="min-h-screen bg-slate-50 text-slate-900 flex flex-col font-sans">
      
      {/* Top Navigation Bar */}
      <header className="bg-white border-b border-slate-200 px-6 py-4 flex items-center justify-between sticky top-0 z-50 shadow-sm print:hidden">
        <div className="flex items-center gap-3">
          <div className="w-8 h-8 rounded-lg bg-gradient-to-br from-blue-600 to-emerald-500 flex items-center justify-center text-white font-bold shadow-md">
            +
          </div>
          <h2 className="text-2xl font-black text-slate-800 tracking-tight">
            SmartCare Dashboard
          </h2>
        </div>
        
        <div className="flex items-center gap-4">
          <button 
            onClick={handleVoiceSummary}
            className="flex items-center gap-2 px-4 py-2 bg-blue-50 text-blue-700 hover:bg-blue-100 rounded-lg font-bold text-sm transition-colors"
          >
            🔊 Voice Summary
          </button>
          
          <button 
            onClick={handlePrint}
            className="flex items-center gap-2 px-4 py-2 border border-slate-200 text-slate-600 hover:bg-slate-50 rounded-lg font-bold text-sm transition-colors"
          >
            🖨️ Print
          </button>
          
          <div className="h-8 w-px bg-slate-200 mx-2"></div>
          
          <button className="font-bold text-slate-600 hover:text-blue-600 transition-colors">
            Profile
          </button>
          
          <div className="w-10 h-10 rounded-full bg-slate-100 flex items-center justify-center font-black text-blue-600 border-2 border-slate-200 shadow-inner">
            G
          </div>
          
          <button 
            onClick={handleLogout}
            className="font-bold text-rose-500 hover:text-rose-700 transition-colors ml-4"
          >
            Logout
          </button>
        </div>
      </header>

      {/* Main Content Area */}
      <main className="flex-1 p-8 max-w-7xl mx-auto w-full">
        {children}
      </main>
      
      {/* Print-only footer */}
      <div className="hidden print:block text-center mt-8 text-slate-400 text-sm">
        SmartCare Official Health Report - Generated securely.
      </div>
    </div>
  );
}
