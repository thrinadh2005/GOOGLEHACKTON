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
    <div className="space-y-6">
      <div className="bg-white p-6 rounded-xl shadow-sm border border-slate-100">
        <h2 className="text-xl font-bold mb-2">Telemedicine Consultation</h2>
        <p className="text-slate-500 mb-6">Secure WebRTC peer-to-peer video connection</p>
        
        <div className="bg-blue-50 text-blue-800 p-4 rounded-lg mb-6 flex items-center justify-between">
          <span>Your Meeting ID: <strong>{peerId || "Generating..."}</strong></span>
          <button 
            onClick={() => navigator.clipboard.writeText(peerId)}
            className="text-sm bg-blue-200 px-3 py-1 rounded hover:bg-blue-300"
          >
            Copy
          </button>
        </div>

        <div className="flex gap-4 mb-8">
          <input 
            type="text" 
            value={remotePeerIdValue} 
            onChange={e => setRemotePeerIdValue(e.target.value)} 
            placeholder="Enter patient/doctor ID to call"
            className="flex-1 px-4 py-2 border border-slate-200 rounded-lg focus:outline-none focus:ring-2 focus:ring-emerald-500"
          />
          <button 
            onClick={() => call(remotePeerIdValue)}
            className="px-6 py-2 bg-emerald-600 text-white rounded-lg hover:bg-emerald-700 transition-colors"
          >
            Start Video Call
          </button>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          <div className="relative bg-slate-900 rounded-xl overflow-hidden aspect-video shadow-inner">
            <video ref={currentVideoRef} muted className="w-full h-full object-cover" />
            <div className="absolute bottom-4 left-4 bg-black/50 text-white px-3 py-1 rounded text-sm backdrop-blur-md">
              You (Local)
            </div>
          </div>
          <div className="relative bg-slate-900 rounded-xl overflow-hidden aspect-video shadow-inner flex items-center justify-center">
            <video ref={remoteVideoRef} className="w-full h-full object-cover absolute inset-0 z-0" />
            {!remoteVideoRef.current?.srcObject && (
              <span className="text-slate-500 z-10">Waiting for connection...</span>
            )}
            <div className="absolute bottom-4 left-4 bg-black/50 text-white px-3 py-1 rounded text-sm backdrop-blur-md z-10">
              Remote User
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
