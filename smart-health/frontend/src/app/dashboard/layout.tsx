'use client'
import Link from 'next/link';
import { usePathname, useRouter } from 'next/navigation';
import { useEffect, useState } from 'react';

export default function DashboardLayout({
  children,
}: {
  children: React.ReactNode
}) {
  const pathname = usePathname();
  const router = useRouter();
  const [isAuthorized, setIsAuthorized] = useState(false);

  useEffect(() => {
    const token = localStorage.getItem('smart_health_token');
    if (!token) {
      router.push('/login');
    } else {
      setIsAuthorized(true);
    }
  }, [router]);

  const handleLogout = () => {
    localStorage.removeItem('smart_health_token');
    router.push('/');
  };

  if (!isAuthorized) {
    return <div className="min-h-screen flex items-center justify-center bg-slate-900 text-slate-400">Loading...</div>;
  }

  return (
    <div className="min-h-screen bg-slate-900 text-slate-200">
      <nav className="border-b border-slate-800 bg-slate-900/50 backdrop-blur-xl sticky top-0 z-50">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex justify-between h-16 items-center">
            <Link href="/" className="text-xl font-bold bg-clip-text text-transparent bg-gradient-to-r from-blue-400 to-emerald-400">
              Smart Health
            </Link>
            <div className="flex items-center gap-8">
              <div className="hidden md:flex space-x-6 items-center">
                <Link 
                  href="/dashboard" 
                  className={`transition-colors ${pathname === '/dashboard' ? 'text-blue-400 font-medium' : 'text-slate-400 hover:text-slate-200'}`}
                >
                  Patients
                </Link>
                <Link 
                  href="/dashboard/consultation"
                  className={`transition-colors flex items-center gap-2 ${pathname === '/dashboard/consultation' ? 'text-blue-400 font-medium' : 'text-slate-400 hover:text-slate-200'}`}
                >
                  <span className="relative flex h-2 w-2">
                    <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-emerald-400 opacity-75"></span>
                    <span className="relative inline-flex rounded-full h-2 w-2 bg-emerald-500"></span>
                  </span>
                  Telemedicine
                </Link>
              </div>
              <div className="flex items-center space-x-4 border-l border-slate-700 pl-6">
                <span className="text-sm font-medium text-slate-400">Dr. Sarah Jenkins</span>
                <div className="h-8 w-8 rounded-full bg-blue-500/20 flex items-center justify-center text-blue-400 font-bold border border-blue-500/30">
                  SJ
                </div>
                <button 
                  onClick={handleLogout}
                  className="text-sm bg-red-500/10 text-red-400 hover:bg-red-500/20 px-3 py-1.5 rounded transition-colors ml-4"
                >
                  Logout
                </button>
              </div>
            </div>
          </div>
        </div>
      </nav>
      <main className="max-w-7xl mx-auto py-8 px-4 sm:px-6 lg:px-8">
        {children}
      </main>
    </div>
  );
}
