"use client";
import { useRouter } from 'next/navigation';
import { GoogleOAuthProvider, GoogleLogin } from '@react-oauth/google';

export default function Login() {
  const router = useRouter();

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

        <div className="bg-white p-8 rounded-3xl shadow-2xl shadow-slate-200/50 border border-slate-100 text-center backdrop-blur-xl flex flex-col items-center">
          <h2 className="text-xl font-bold text-slate-700 mb-8">Sign in to access your health records</h2>
          
          <div className="w-full flex justify-center">
            <GoogleOAuthProvider clientId="368875710369-kf2thveu8rdihldj3dtgcothu98ofmta.apps.googleusercontent.com">
              <GoogleLogin
                onSuccess={(credentialResponse) => {
                  console.log("Real Google Authentication Success!");
                  // Inject the real Google JWT into the session cookie
                  document.cookie = `token=${credentialResponse.credential}; path=/;`;
                  // Route to the protected dashboard
                  router.push('/dashboard');
                }}
                onError={() => {
                  console.log('Google Login Failed');
                  alert("Google Authentication failed. Please try again.");
                }}
                useOneTap
                shape="pill"
                size="large"
                theme="outline"
                text="signin_with"
                width="300"
              />
            </GoogleOAuthProvider>
          </div>
        </div>

        <p className="text-center text-slate-400 text-sm mt-8 font-medium">
          Protected by ISO 21434 & HIPAA Compliance
        </p>
      </div>
    </div>
  );
}
