"use client";
import { useState } from 'react';

export default function Chatbot() {
  const [isOpen, setIsOpen] = useState(false);
  const [message, setMessage] = useState("");
  const [history, setHistory] = useState<{role: string, content: string}[]>([]);
  const [loading, setLoading] = useState(false);

  const sendMessage = async () => {
    if (!message) return;

    const newHistory = [...history, { role: "user", content: message }];
    setHistory(newHistory);
    setMessage("");
    setLoading(true);

    try {
      const backendUrl = process.env.NEXT_PUBLIC_API_URL || "http://localhost:8000";
      const response = await fetch(`${backendUrl}/api/chat/triage`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ message })
      });
      const data = await response.json();
      setHistory([...newHistory, { role: "assistant", content: data.reply }]);
    } catch (e) {
      setHistory([...newHistory, { role: "assistant", content: "Error connecting to LLaMA3 Triage API." }]);
    }
    
    setLoading(false);
  };

  return (
    <div className="fixed bottom-6 right-6 z-50">
      {isOpen && (
        <div className="bg-white border border-slate-200 shadow-2xl rounded-2xl w-80 h-96 flex flex-col mb-4 overflow-hidden animate-fade-in-up">
          <div className="bg-gradient-to-r from-blue-600 to-emerald-500 p-4 text-white flex justify-between items-center shadow-md z-10">
            <div>
              <h3 className="font-bold text-sm tracking-wide">LLaMA3 Triage AI</h3>
              <p className="text-xs text-blue-100">Groq High-Speed Inference</p>
            </div>
            <button onClick={() => setIsOpen(false)} className="hover:text-slate-200 font-bold transition-colors">
              ✕
            </button>
          </div>
          
          <div className="flex-1 p-4 overflow-y-auto bg-slate-50 space-y-4">
            {history.map((msg, i) => (
              <div key={i} className={`text-sm p-3 rounded-2xl shadow-sm ${
                msg.role === "user" 
                  ? "bg-blue-600 text-white ml-8 rounded-tr-sm" 
                  : "bg-white border border-slate-100 text-slate-700 mr-8 rounded-tl-sm"
              }`}>
                {msg.content}
              </div>
            ))}
            {loading && (
              <div className="text-sm p-3 rounded-2xl bg-white border border-slate-100 text-slate-700 mr-8 rounded-tl-sm w-fit animate-pulse shadow-sm flex items-center gap-2">
                <div className="w-1.5 h-1.5 bg-blue-400 rounded-full animate-bounce"></div>
                <div className="w-1.5 h-1.5 bg-emerald-400 rounded-full animate-bounce" style={{animationDelay: "150ms"}}></div>
                <div className="w-1.5 h-1.5 bg-blue-400 rounded-full animate-bounce" style={{animationDelay: "300ms"}}></div>
              </div>
            )}
          </div>
          
          <div className="p-3 bg-white border-t border-slate-100 flex gap-2">
            <input 
              type="text" 
              value={message}
              onChange={(e) => setMessage(e.target.value)}
              onKeyDown={(e) => e.key === 'Enter' && sendMessage()}
              className="flex-1 px-3 py-2 border border-slate-200 rounded-lg text-sm focus:outline-none focus:ring-2 focus:ring-blue-500 bg-slate-50 font-medium"
              placeholder="Describe symptoms..."
            />
            <button 
              onClick={sendMessage}
              className="bg-blue-600 hover:bg-blue-700 text-white px-4 py-2 rounded-lg font-bold shadow-sm transition-colors"
            >
              Send
            </button>
          </div>
        </div>
      )}

      {!isOpen && (
        <button 
          onClick={() => setIsOpen(true)}
          className="bg-white border-2 border-slate-100 text-blue-600 p-4 rounded-full shadow-xl shadow-slate-300 hover:scale-110 transition-transform flex items-center justify-center group"
        >
          <span className="text-2xl group-hover:animate-bounce">💬</span>
        </button>
      )}
    </div>
  );
}
