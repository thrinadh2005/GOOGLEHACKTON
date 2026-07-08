"use client";
import Link from "next/link";
import { useRouter, usePathname } from "next/navigation";
import { Users, FileText, PhoneCall, Stethoscope, Settings } from "lucide-react";

export default function DoctorLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  const router = useRouter();
  const pathname = usePathname();

  const handleLogout = () => {
    document.cookie = 'token=; Max-Age=0; path=/;';
    router.push('/login');
  };

  const navLinks = [
    { name: "Triage Queue", href: "/doctor", icon: Users },
    { name: "EHR Lookup", href: "/doctor/ehr", icon: FileText },
    { name: "Telemedicine", href: "/dashboard/consultation", icon: PhoneCall },
    { name: "Settings", href: "/dashboard/settings", icon: Settings },
  ];

  return (
    <div className="min-h-screen bg-slate-50 text-slate-900 flex flex-col font-sans">
      
      {/* Top Navigation Bar - Doctor Theme */}
      <header className="bg-white border-b border-emerald-100 px-6 py-4 flex items-center justify-between sticky top-0 z-50 shadow-sm">
        <div className="flex items-center gap-8">
          <div className="flex items-center gap-3">
            <div className="w-8 h-8 rounded-lg bg-emerald-600 flex items-center justify-center text-white font-bold shadow-md shadow-emerald-600/30">
              <Stethoscope size={18} />
            </div>
            <h2 className="text-2xl font-black text-slate-800 tracking-tight">
              SmartCare <span className="text-emerald-600 font-medium">Provider</span>
            </h2>
          </div>
          
          <nav className="hidden md:flex items-center gap-1 bg-emerald-50 p-1 rounded-xl border border-emerald-100">
            {navLinks.map((link) => {
              const Icon = link.icon;
              const isActive = pathname === link.href;
              return (
                <Link 
                  key={link.name} 
                  href={link.href}
                  className={`flex items-center gap-2 px-4 py-2 rounded-lg font-bold text-sm transition-all ${
                    isActive ? "bg-white text-emerald-700 shadow-sm border border-emerald-200" : "text-emerald-600/70 hover:text-emerald-800 hover:bg-emerald-100/50"
                  }`}
                >
                  <Icon size={16} />
                  {link.name}
                </Link>
              )
            })}
          </nav>
        </div>
        
        <div className="flex items-center gap-4">
          <div className="flex items-center gap-3 bg-emerald-50 px-4 py-2 rounded-full border border-emerald-100">
            <div className="w-2 h-2 rounded-full bg-emerald-500 animate-pulse"></div>
            <span className="text-sm font-bold text-emerald-800">On-Call</span>
          </div>
          
          <div className="h-8 w-px bg-slate-200 mx-2"></div>
          
          <div className="w-10 h-10 rounded-full bg-slate-100 flex items-center justify-center font-black text-emerald-600 border-2 border-emerald-200 shadow-inner overflow-hidden">
            <img src="https://api.dicebear.com/7.x/avataaars/svg?seed=Felix&backgroundColor=e2e8f0" alt="Doctor Profile" />
          </div>
          
          <button 
            onClick={handleLogout}
            className="font-bold text-slate-400 hover:text-rose-600 transition-colors ml-2"
          >
            Sign Out
          </button>
        </div>
      </header>

      {/* Main Content Area */}
      <main className="flex-1 p-8 max-w-7xl mx-auto w-full">
        {children}
      </main>
    </div>
  );
}
