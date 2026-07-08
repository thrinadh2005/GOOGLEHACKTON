"use client";
import { useState } from 'react';
import { useRouter } from 'next/navigation';

export default function Login() {
  const [loading, setLoading] = useState(false);
  const router = useRouter();

  const handleGoogleLogin = () => {
    setLoading(true);
    // Simulating Google OAuth Flow for Hackathon Demo
    setTimeout(() => {
      document.cookie = `token=mock_google_jwt_token; path=/;`;
      router.push('/dashboard');
    }, 1500);
  };

  return (
    <div className="min-h-screen bg-slate-50 flex flex-col justify-center items-center p-4 relative overflow-hidden font-sans">
      
      {/* Background Decor */}
      <div className="absolute top-[-10%] left-[-10%] w-[40%] h-[50%] bg-blue-100 rounded-full blur-[100px] opacity-70"></div>
      <div className="absolute bottom-[-10%] right-[-10%] w-[40%] h-[50%] bg-emerald-100 rounded-full blur-[100px] opacity-70"></div>

      <div className="w-full max-w-md relative z-10">
        <div className="text-center mb-10">
          <div className="w-16 h-16 bg-gradient-to-br from-blue-600 to-emerald-500 rounded-2xl mx-auto mb-6 flex items-center justify-center shadow-xl shadow-blue-200">
            <span className="text-white text-3xl font-black">+</span>
          </div>
          <h1 className="text-4xl font-black tracking-tight text-slate-800">SmartCare</h1>
          <p className="text-slate-500 mt-2 font-medium">Your Personal Health Dashboard</p>
        </div>

        <div className="bg-white p-8 rounded-3xl shadow-2xl shadow-slate-200/50 border border-slate-100 text-center backdrop-blur-xl">
          <h2 className="text-xl font-bold text-slate-700 mb-8">Sign in to access your health records</h2>
          
          <button 
            onClick={handleGoogleLogin}
            disabled={loading}
            className="w-full bg-white border-2 border-slate-200 text-slate-700 py-4 rounded-xl font-bold text-lg hover:bg-slate-50 shadow-md transition-all flex items-center justify-center gap-4"
          >
            {loading ? (
              <span className="animate-pulse">Authenticating with Google...</span>
            ) : (
              <>
                <svg className="w-6 h-6" viewBox="0 0 24 24">
                  <path fill="#4285F4" d="M22.56 12.25c0-.78-.07-1.53-.2-2.25H12v4.26h5.92c-.26 1.37-1.04 2.53-2.21 3.31v2.77h3.57c2.08-1.92 3.28-4.74 3.28-8.09z"/>
                  <path fill="#34A853" d="M12 23c2.97 0 5.46-.98 7.28-2.66l-3.57-2.77c-.98.66-2.23 1.06-3.71 1.06-2.86 0-5.29-1.93-6.16-4.53H2.18v2.84C3.99 20.53 7.7 23 12 23z"/>
                  <path fill="#FBBC05" d="M5.84 14.09c-.22-.66-.35-1.36-.35-2.09s.13-1.43.35-2.09V7.07H2.18C1.43 8.55 1 10.22 1 12s.43 3.45 1.18 4.93l2.85-2.22.81-.62z"/>
                  <path fill="#EA4335" d="M12 5.38c1.62 0 3.06.56 4.21 1.64l3.15-3.15C17.45 2.09 14.97 1 12 1 7.7 1 3.99 3.47 2.18 7.07l3.66 2.84c.87-2.6 3.3-4.53 6.16-4.53z"/>
                </svg>
                Sign in with Google
              </>
            )}
          </button>
        </div>

        <p className="text-center text-slate-400 text-sm mt-8 font-medium">
          Protected by ISO 21434 & HIPAA Compliance
        </p>
      </div>
    </div>
  );
}
