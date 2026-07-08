"use client";
import { Video, Mic, PhoneOff, MicOff, VideoOff, MessageSquare, AudioWaveform } from "lucide-react";
import { useState } from "react";

export default function TelemedicineHub() {
  const [isMuted, setIsMuted] = useState(false);
  const [isVideoOff, setIsVideoOff] = useState(false);

  return (
    <div className="space-y-6 max-w-6xl mx-auto h-[80vh] flex flex-col">
      <div>
        <h1 className="text-3xl font-black text-slate-800 flex items-center gap-3">
          <Video className="text-blue-600 w-8 h-8" />
          Telemedicine Consultation
        </h1>
        <p className="text-slate-500 font-medium mt-1">End-to-end encrypted WebRTC video relay.</p>
      </div>

      <div className="flex-1 flex flex-col md:flex-row gap-6 h-full">
        {/* Video Area */}
        <div className="w-full md:w-2/3 bg-slate-900 rounded-3xl overflow-hidden relative shadow-2xl flex flex-col">
          <div className="absolute top-4 left-4 bg-black/50 backdrop-blur-md text-white text-xs font-bold px-3 py-1.5 rounded-full flex items-center gap-2 z-10 border border-white/10">
            <div className="w-2 h-2 rounded-full bg-rose-500 animate-pulse"></div>
            REC 04:22
          </div>

          <div className="flex-1 relative flex items-center justify-center bg-slate-800">
             {isVideoOff ? (
               <div className="w-32 h-32 rounded-full bg-slate-700 flex items-center justify-center border-4 border-slate-600">
                 <VideoOff className="w-12 h-12 text-slate-400" />
               </div>
             ) : (
               <img src="https://images.unsplash.com/photo-1559839734-2b71ea197ec2?q=80&w=2070&auto=format&fit=crop" alt="Doctor Video" className="w-full h-full object-cover opacity-80" />
             )}
             
             {/* Self View */}
             <div className="absolute bottom-6 right-6 w-48 h-32 bg-slate-700 rounded-2xl border-2 border-white/20 shadow-2xl overflow-hidden">
               <img src="https://images.unsplash.com/photo-1534528741775-53994a69daeb?q=80&w=1964&auto=format&fit=crop" alt="Self Video" className="w-full h-full object-cover" />
             </div>
          </div>

          {/* Controls */}
          <div className="h-20 bg-slate-950/80 backdrop-blur-md flex items-center justify-center gap-6 border-t border-white/10">
            <button 
              onClick={() => setIsMuted(!isMuted)}
              className={`w-12 h-12 rounded-full flex items-center justify-center transition-colors ${isMuted ? 'bg-rose-500 text-white' : 'bg-slate-700 hover:bg-slate-600 text-white'}`}
            >
              {isMuted ? <MicOff size={20} /> : <Mic size={20} />}
            </button>
            <button 
              onClick={() => setIsVideoOff(!isVideoOff)}
              className={`w-12 h-12 rounded-full flex items-center justify-center transition-colors ${isVideoOff ? 'bg-rose-500 text-white' : 'bg-slate-700 hover:bg-slate-600 text-white'}`}
            >
              {isVideoOff ? <VideoOff size={20} /> : <Video size={20} />}
            </button>
            <button onClick={() => window.history.back()} className="w-16 h-12 rounded-2xl bg-rose-600 hover:bg-rose-700 text-white flex items-center justify-center transition-colors shadow-lg shadow-rose-900/50">
              <PhoneOff size={20} />
            </button>
          </div>
        </div>

        {/* NLP Transcription Side Panel */}
        <div className="w-full md:w-1/3 bg-white border border-slate-200 rounded-3xl shadow-xl flex flex-col overflow-hidden">
          <div className="p-4 border-b border-slate-100 bg-slate-50 flex justify-between items-center">
            <h3 className="font-bold text-slate-800 flex items-center gap-2">
              <AudioWaveform className="text-blue-500" size={18} /> AI Transcription
            </h3>
            <span className="text-xs bg-emerald-100 text-emerald-700 px-2 py-1 rounded font-bold uppercase">Active</span>
          </div>
          
          <div className="flex-1 p-6 space-y-4 overflow-y-auto bg-slate-50/50">
            <div className="bg-white p-4 rounded-2xl rounded-tl-none border border-slate-100 shadow-sm max-w-[90%]">
              <p className="text-sm font-bold text-slate-800 mb-1">Dr. Jenkins</p>
              <p className="text-sm text-slate-600">Hello! I see from your IoT edge vitals that your blood pressure has been slightly elevated this morning.</p>
            </div>
            
            <div className="bg-blue-600 text-white p-4 rounded-2xl rounded-tr-none shadow-sm max-w-[90%] self-end ml-auto">
              <p className="text-sm font-bold mb-1 opacity-80">You</p>
              <p className="text-sm text-blue-50">Yes, I've been feeling a bit stressed. Is it something I should be concerned about?</p>
            </div>
            
            <div className="bg-white p-4 rounded-2xl rounded-tl-none border border-slate-100 shadow-sm max-w-[90%] relative">
              <p className="text-sm font-bold text-slate-800 mb-1">Dr. Jenkins</p>
              <p className="text-sm text-slate-600">Not immediately, but our predictive AI flagged a minor anomaly. I'm going to prescribe...</p>
              
              {/* AI Insight Badge */}
              <div className="absolute -left-2 -bottom-2 bg-purple-100 border border-purple-200 text-purple-700 text-[10px] font-bold px-2 py-1 rounded-full flex items-center gap-1 shadow-sm">
                <MessageSquare size={10} /> NLP Sentiment: Calm
              </div>
            </div>
          </div>
          
          <div className="p-4 border-t border-slate-100 bg-white">
            <div className="w-full bg-slate-100 text-slate-500 text-sm px-4 py-3 rounded-xl flex items-center justify-center italic">
              Listening...
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
