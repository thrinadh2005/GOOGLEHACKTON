"use client";
import { useEffect, useState } from "react";
import Link from "next/link";
import { useRouter, usePathname } from "next/navigation";
import { Activity, Package, LayoutDashboard, PhoneCall, Network, ShieldCheck } from "lucide-react";

export default function DashboardLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  const router = useRouter();
  const pathname = usePathname();
  const [userRole, setUserRole] = useState<string | null>(null);

  useEffect(() => {
    setUserRole(localStorage.getItem('userRole'));
  }, []);

  const handlePrint = () => window.print();

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

  const navLinks = [
    { name: "Overview", href: "/dashboard", icon: LayoutDashboard },
    { name: "Vitals", href: "/dashboard/vitals", icon: Activity },
    { name: "Inventory", href: "/dashboard/inventory", icon: Package },
    { name: "Telemedicine", href: "/dashboard/consultation", icon: PhoneCall },
    { name: "AI Analytics", href: "/dashboard/analytics", icon: Network },
    { name: "Compliance", href: "/dashboard/settings", icon: ShieldCheck },
  ];

  return (
    <div className="min-h-screen bg-slate-50 text-slate-900 flex flex-col font-sans">
      
      {/* Top Navigation Bar */}
      <header className="bg-white border-b border-slate-200 px-6 py-4 flex flex-col md:flex-row items-center justify-between sticky top-0 z-50 shadow-sm print:hidden gap-4 md:gap-0">
        <div className="flex items-center gap-8 w-full md:w-auto overflow-x-auto pb-2 md:pb-0">
          <div className="flex items-center gap-3 shrink-0">
            <div className="w-8 h-8 rounded-lg bg-gradient-to-br from-blue-600 to-emerald-500 flex items-center justify-center text-white font-bold shadow-md">
              +
            </div>
            <h2 className="text-2xl font-black text-slate-800 tracking-tight">
              SmartCare
            </h2>
          </div>
          
          <nav className="flex items-center gap-1 bg-slate-100 p-1 rounded-xl border border-slate-200 shrink-0">
            {navLinks.map((link) => {
              const Icon = link.icon;
              const isActive = pathname === link.href;
              return (
                <Link 
                  key={link.name} 
                  href={link.href}
                  className={`flex items-center gap-2 px-3 py-2 rounded-lg font-bold text-sm transition-all ${
                    isActive ? "bg-white text-blue-600 shadow-sm" : "text-slate-500 hover:text-slate-700 hover:bg-slate-200/50"
                  }`}
                >
                  <Icon size={16} />
                  {link.name}
                </Link>
              )
            })}
          </nav>
        </div>
        
        <div className="flex items-center gap-4 shrink-0">
          <button 
            onClick={handleVoiceSummary}
            className="flex items-center gap-2 px-4 py-2 bg-blue-50 text-blue-700 hover:bg-blue-100 rounded-lg font-bold text-sm transition-colors"
          >
            🔊 Voice
          </button>
          
          <button 
            onClick={handlePrint}
            className="flex items-center gap-2 px-4 py-2 border border-slate-200 text-slate-600 hover:bg-slate-50 rounded-lg font-bold text-sm transition-colors"
          >
            🖨️ Print
          </button>
          
          <div className="h-8 w-px bg-slate-200 mx-2"></div>

          {userRole === 'doctor' && (
            <Link href="/doctor" className="text-sm font-bold text-emerald-600 hover:text-emerald-700 transition-colors mr-2">
              ← Return to Triage
            </Link>
          )}
          
          {userRole === 'admin' && (
            <Link href="/admin" className="text-sm font-bold text-purple-600 hover:text-purple-700 transition-colors mr-2">
              ← Return to Command Center
            </Link>
          )}
          
          
          <div className="w-10 h-10 rounded-full bg-slate-100 flex items-center justify-center font-black text-blue-600 border-2 border-slate-200 shadow-inner">
            G
          </div>
          
          <button 
            onClick={handleLogout}
            className="font-bold text-rose-500 hover:text-rose-700 transition-colors ml-2"
          >
            Logout
          </button>
        </div>
      </header>

      {/* Main Content Area */}
      <main className="flex-1 p-4 md:p-8 max-w-7xl mx-auto w-full">
        {children}
      </main>
      
      {/* Print-only footer */}
      <div className="hidden print:block text-center mt-8 text-slate-400 text-sm">
        SmartCare Official Health Report - Generated securely.
      </div>
    </div>
  );
}
