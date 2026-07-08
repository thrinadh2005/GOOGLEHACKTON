"use client";
import { useState } from "react";
import { GoogleOAuthProvider, GoogleLogin } from "@react-oauth/google";
import { useRouter } from "next/navigation";
import { Stethoscope, User, ShieldCheck } from "lucide-react";

export default function LoginPage() {
  const router = useRouter();
  const [role, setRole] = useState<"patient" | "doctor" | null>(null);
  const [isLoading, setIsLoading] = useState(false);

  const handleLoginSuccess = (credentialResponse: any) => {
    setIsLoading(true);
    // Mock processing delay for demo
    setTimeout(() => {
      document.cookie = `token=${credentialResponse.credential}; path=/; max-age=3600`;
      
      // Route based on selected role!
      if (role === "doctor") {
        router.push("/doctor");
      } else {
        router.push("/dashboard");
      }
    }, 1500);
  };

  const handleLoginError = () => {
    console.error("Google Login Failed");
    alert("Authentication failed. Please check your Google Cloud Console origins.");
  };

  return (
    <div className="min-h-screen bg-slate-50 flex items-center justify-center p-4">
      <div className="bg-white max-w-4xl w-full rounded-3xl shadow-2xl shadow-slate-200/50 flex flex-col md:flex-row overflow-hidden border border-slate-100">
        
        {/* Left Side - Branding */}
        <div className="w-full md:w-5/12 bg-gradient-to-br from-blue-600 to-emerald-500 p-12 text-white flex flex-col justify-between">
          <div>
            <div className="w-12 h-12 rounded-xl bg-white/20 backdrop-blur-sm flex items-center justify-center text-2xl font-bold mb-6">
              +
            </div>
            <h1 className="text-4xl font-black mb-4 leading-tight">SmartCare<br/>Identity.</h1>
            <p className="text-blue-100 text-lg font-medium">
              Secure, HIPAA-compliant access to your enterprise health intelligence platform.
            </p>
          </div>
          
          <div className="mt-12 flex items-center gap-2 text-sm font-bold text-emerald-100 bg-black/10 w-fit px-4 py-2 rounded-full backdrop-blur-md">
            <ShieldCheck size={18} />
            OAuth 2.0 Secured
          </div>
        </div>

        {/* Right Side - Role Selection & Login */}
        <div className="w-full md:w-7/12 p-12 flex flex-col justify-center bg-white relative">
          
          {isLoading ? (
            <div className="absolute inset-0 bg-white/90 backdrop-blur-sm flex flex-col items-center justify-center z-50">
              <div className="w-12 h-12 border-4 border-slate-200 border-t-blue-600 rounded-full animate-spin mb-4"></div>
              <h3 className="text-xl font-bold text-slate-800">Authenticating...</h3>
              <p className="text-slate-500 font-medium mt-2">Establishing secure session</p>
            </div>
          ) : null}

          {!role ? (
            <div className="animate-fade-in-up">
              <h2 className="text-3xl font-black text-slate-800 mb-2">Select Your Role</h2>
              <p className="text-slate-500 font-medium mb-8">Please identify yourself to access the correct portal.</p>
              
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <button 
                  onClick={() => setRole("patient")}
                  className="p-6 border-2 border-slate-100 rounded-2xl flex flex-col items-center gap-4 hover:border-blue-500 hover:bg-blue-50 transition-all group text-left"
                >
                  <div className="w-16 h-16 bg-blue-100 text-blue-600 rounded-full flex items-center justify-center group-hover:scale-110 transition-transform">
                    <User size={32} />
                  </div>
                  <div className="text-center">
                    <h3 className="font-bold text-slate-800 text-lg">I am a Patient</h3>
                    <p className="text-sm text-slate-500 mt-1">Access your health records and appointments.</p>
                  </div>
                </button>

                <button 
                  onClick={() => setRole("doctor")}
                  className="p-6 border-2 border-slate-100 rounded-2xl flex flex-col items-center gap-4 hover:border-emerald-500 hover:bg-emerald-50 transition-all group text-left"
                >
                  <div className="w-16 h-16 bg-emerald-100 text-emerald-600 rounded-full flex items-center justify-center group-hover:scale-110 transition-transform">
                    <Stethoscope size={32} />
                  </div>
                  <div className="text-center">
                    <h3 className="font-bold text-slate-800 text-lg">Medical Staff</h3>
                    <p className="text-sm text-slate-500 mt-1">Access patient triage and EHR systems.</p>
                  </div>
                </button>
              </div>
            </div>
          ) : (
            <div className="animate-fade-in-up flex flex-col items-center text-center">
              <button 
                onClick={() => setRole(null)}
                className="self-start text-sm font-bold text-slate-400 hover:text-slate-600 mb-6 flex items-center gap-1"
              >
                ← Back to Roles
              </button>
              
              <div className={`w-20 h-20 rounded-full mb-6 flex items-center justify-center ${role === 'doctor' ? 'bg-emerald-100 text-emerald-600' : 'bg-blue-100 text-blue-600'}`}>
                {role === 'doctor' ? <Stethoscope size={40} /> : <User size={40} />}
              </div>
              
              <h2 className="text-3xl font-black text-slate-800 mb-2">
                {role === 'doctor' ? 'Doctor Login' : 'Patient Login'}
              </h2>
              <p className="text-slate-500 font-medium mb-10">
                Continue with your enterprise Google Workspace or personal account.
              </p>
              
              <div className="w-full max-w-xs scale-110 transform origin-center">
                <GoogleOAuthProvider clientId="368875710369-kf2thveu8rdihldj3dtgcothu98ofmta.apps.googleusercontent.com">
                  <GoogleLogin
                    onSuccess={handleLoginSuccess}
                    onError={handleLoginError}
                    useOneTap
                    shape="pill"
                    theme="filled_blue"
                    size="large"
                    text="continue_with"
                  />
                </GoogleOAuthProvider>
              </div>
            </div>
          )}
          
        </div>
      </div>
    </div>
  );
}
