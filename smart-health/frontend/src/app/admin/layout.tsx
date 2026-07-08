"use client";
import Link from "next/link";
import { useRouter } from "next/navigation";
import { LayoutDashboard, Users, Activity, ShieldCheck, Database, Server } from "lucide-react";

export default function AdminLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  const router = useRouter();

  const handleLogout = () => {
    router.push('/');
  };

  const navLinks = [
    { name: "Command Center", href: "/admin", icon: LayoutDashboard },
    { name: "User Management", href: "#", icon: Users },
    { name: "Node Telemetry", href: "#", icon: Activity },
    { name: "Compliance Logs", href: "#", icon: ShieldCheck },
  ];

  return (
    <div className="min-h-screen bg-slate-950 text-slate-200 flex flex-col font-sans">
      
      {/* Top Navigation Bar - Dark Tech Theme */}
      <header className="bg-slate-900 border-b border-slate-800 px-6 py-4 flex items-center justify-between sticky top-0 z-50 shadow-2xl">
        <div className="flex items-center gap-8">
          <div className="flex items-center gap-3">
            <div className="w-8 h-8 rounded-lg bg-rose-600 flex items-center justify-center text-white font-bold shadow-lg shadow-rose-900/50">
              <Server size={18} />
            </div>
            <h2 className="text-2xl font-black text-white tracking-tight">
              SmartCare <span className="text-rose-500 font-mono text-lg uppercase">Admin</span>
            </h2>
          </div>
          
          <nav className="hidden md:flex items-center gap-2">
            {navLinks.map((link) => {
              const Icon = link.icon;
              return (
                <Link 
                  key={link.name} 
                  href={link.href}
                  className={`flex items-center gap-2 px-4 py-2 rounded-lg font-bold text-sm transition-all ${
                    link.name === "Command Center" ? "bg-slate-800 text-rose-400 border border-slate-700" : "text-slate-400 hover:text-slate-200 hover:bg-slate-800"
                  }`}
                >
                  <Icon size={16} />
                  {link.name}
                </Link>
              )
            })}
          </nav>
        </div>
        
        <div className="flex items-center gap-6">
          <div className="flex items-center gap-2 text-xs font-mono text-emerald-400 bg-emerald-950/30 px-3 py-1.5 rounded-full border border-emerald-900/50">
            <div className="w-2 h-2 rounded-full bg-emerald-500 animate-pulse"></div>
            SYSTEM ONLINE
          </div>
          
          <div className="h-8 w-px bg-slate-800 mx-2"></div>
          
          <Link href="/dashboard" className="text-sm font-bold text-blue-400 hover:text-blue-300 transition-colors">
            Switch to Patient View
          </Link>
          
          <button 
            onClick={handleLogout}
            className="font-bold text-slate-400 hover:text-white transition-colors ml-4 bg-slate-800 px-4 py-2 rounded-lg"
          >
            Exit
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
