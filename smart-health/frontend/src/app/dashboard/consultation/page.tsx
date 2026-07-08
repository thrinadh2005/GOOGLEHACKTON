"use client";
import { useEffect, useRef, useState } from "react";
// Dynamic import for Peer to avoid SSR issues
import dynamic from 'next/dynamic';

export default function Consultation() {
  const [peerId, setPeerId] = useState<string>("");
  const [remotePeerIdValue, setRemotePeerIdValue] = useState<string>("");
  const remoteVideoRef = useRef<HTMLVideoElement>(null);
  const currentVideoRef = useRef<HTMLVideoElement>(null);
  const peerInstance = useRef<any>(null);

  useEffect(() => {
    // Only run on client side
    const initPeer = async () => {
      const { default: Peer } = await import('peerjs');
      const peer = new Peer();

      peer.on("open", (id) => {
        setPeerId(id);
      });

      peer.on("call", (call) => {
        navigator.mediaDevices
          .getUserMedia({ video: true, audio: true })
          .then((mediaStream) => {
            if (currentVideoRef.current) {
              currentVideoRef.current.srcObject = mediaStream;
              currentVideoRef.current.play();
            }
            call.answer(mediaStream);
            call.on("stream", (remoteStream) => {
              if (remoteVideoRef.current) {
                remoteVideoRef.current.srcObject = remoteStream;
                remoteVideoRef.current.play();
              }
            });
          });
      });

      peerInstance.current = peer;
    };
    
    initPeer();

    return () => {
      if (peerInstance.current) {
        peerInstance.current.destroy();
      }
    };
  }, []);

  const call = (remotePeerId: string) => {
    navigator.mediaDevices
      .getUserMedia({ video: true, audio: true })
      .then((mediaStream) => {
        if (currentVideoRef.current) {
          currentVideoRef.current.srcObject = mediaStream;
          currentVideoRef.current.play();
        }

        const call = peerInstance.current.call(remotePeerId, mediaStream);
        
        call.on("stream", (remoteStream: MediaStream) => {
          if (remoteVideoRef.current) {
            remoteVideoRef.current.srcObject = remoteStream;
            remoteVideoRef.current.play();
          }
        });
      });
  };

  return (
    <div className="space-y-6 max-w-7xl mx-auto">
      <div className="flex justify-between items-end mb-8">
        <div>
          <h1 className="text-3xl font-black text-slate-800 tracking-tight">Telemedicine Suite</h1>
          <p className="text-slate-500 font-medium mt-1">High-definition WebRTC peer-to-peer encrypted consultation.</p>
        </div>
      </div>

      <div className="bg-white p-8 rounded-3xl shadow-xl shadow-slate-200/50 border border-slate-100">
        
        <div className="bg-blue-50 border border-blue-100 text-blue-800 p-4 rounded-xl mb-8 flex items-center justify-between shadow-inner">
          <span className="font-medium">Secure Meeting ID: <strong className="text-blue-900 tracking-wider bg-white px-3 py-1 rounded ml-2 shadow-sm">{peerId || "Generating..."}</strong></span>
          <button 
            onClick={() => navigator.clipboard.writeText(peerId)}
            className="text-sm bg-white border border-blue-200 px-4 py-2 rounded-lg hover:bg-blue-100 font-bold transition-colors"
          >
            Copy ID
          </button>
        </div>

        <div className="flex gap-4 mb-8">
          <input 
            type="text" 
            value={remotePeerIdValue} 
            onChange={e => setRemotePeerIdValue(e.target.value)} 
            placeholder="Enter Patient ID to initiate call..."
            className="flex-1 px-5 py-3 border border-slate-200 rounded-xl focus:outline-none focus:ring-2 focus:ring-emerald-500 bg-slate-50 text-slate-800 font-medium"
          />
          <button 
            onClick={() => call(remotePeerIdValue)}
            className="px-8 py-3 bg-emerald-500 text-white font-bold rounded-xl shadow-lg shadow-emerald-200 hover:bg-emerald-600 transition-colors"
          >
            Start Encrypted Call
          </button>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          <div className="relative bg-slate-900 rounded-2xl overflow-hidden aspect-video shadow-lg border-4 border-slate-100">
            <video ref={currentVideoRef} muted className="w-full h-full object-cover" />
            <div className="absolute bottom-4 left-4 bg-white/90 text-slate-800 px-4 py-1.5 rounded-lg text-sm font-bold backdrop-blur-md shadow-sm">
              Local Feed (Doctor)
            </div>
          </div>
          <div className="relative bg-slate-900 rounded-2xl overflow-hidden aspect-video shadow-lg border-4 border-slate-100 flex items-center justify-center">
            <video ref={remoteVideoRef} className="w-full h-full object-cover absolute inset-0 z-0" />
            {!remoteVideoRef.current?.srcObject && (
              <span className="text-slate-400 font-medium z-10 flex flex-col items-center">
                <span className="text-4xl mb-2">📡</span>
                Waiting for patient connection...
              </span>
            )}
            <div className="absolute bottom-4 left-4 bg-white/90 text-slate-800 px-4 py-1.5 rounded-lg text-sm font-bold backdrop-blur-md z-10 shadow-sm">
              Remote Feed (Patient)
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
