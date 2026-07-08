"use client";
import { Package, ShieldCheck, Link2 } from "lucide-react";

export default function InventoryDashboard() {
  const inventory = [
    { id: "MX-1092", name: "Amoxicillin 500mg", stock: 1250, expiry: "2027-04-12", hash: "0x8f...3a92", status: "Optimal" },
    { id: "SX-4410", name: "Surgical Syringes", stock: 5000, expiry: "2030-01-01", hash: "0x1e...bb41", status: "Optimal" },
    { id: "VX-9921", name: "Influenza Vaccine", stock: 45, expiry: "2026-11-30", hash: "0x7a...0f11", status: "Low Stock" },
    { id: "PX-1120", name: "Paracetamol IV", stock: 800, expiry: "2026-02-15", hash: "0x4c...9d8a", status: "Optimal" },
  ];

  return (
    <div className="space-y-8">
      <div>
        <h1 className="text-3xl font-black text-slate-800 flex items-center gap-3">
          <Package className="text-emerald-600 w-8 h-8" />
          Immutable Supply Chain
        </h1>
        <p className="text-slate-500 font-medium mt-1">Blockchain-verified medical inventory tracking.</p>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        <div className="bg-emerald-50 border border-emerald-200 p-6 rounded-3xl flex items-center gap-4">
          <div className="bg-emerald-200 text-emerald-700 p-3 rounded-xl"><ShieldCheck size={28} /></div>
          <div>
            <h3 className="text-sm font-bold text-emerald-700 uppercase tracking-wide">Network Status</h3>
            <p className="text-2xl font-black text-emerald-900">Secure</p>
          </div>
        </div>
        <div className="bg-blue-50 border border-blue-200 p-6 rounded-3xl flex items-center gap-4">
          <div className="bg-blue-200 text-blue-700 p-3 rounded-xl"><Link2 size={28} /></div>
          <div>
            <h3 className="text-sm font-bold text-blue-700 uppercase tracking-wide">Verified Blocks</h3>
            <p className="text-2xl font-black text-blue-900">14,293</p>
          </div>
        </div>
      </div>

      <div className="bg-white rounded-3xl shadow-xl shadow-slate-200/50 border border-slate-100 overflow-hidden">
        <div className="overflow-x-auto">
          <table className="w-full text-left border-collapse">
            <thead>
              <tr className="bg-slate-50 border-b border-slate-100 text-sm font-bold text-slate-500 uppercase tracking-wider">
                <th className="p-6">Product ID</th>
                <th className="p-6">Item Name</th>
                <th className="p-6">Stock Level</th>
                <th className="p-6">Expiry Date</th>
                <th className="p-6">Ledger Hash</th>
                <th className="p-6">Status</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-slate-50">
              {inventory.map((item) => (
                <tr key={item.id} className="hover:bg-slate-50/50 transition-colors">
                  <td className="p-6 font-mono text-sm text-slate-600">{item.id}</td>
                  <td className="p-6 font-bold text-slate-800">{item.name}</td>
                  <td className="p-6 font-medium text-slate-700">{item.stock} units</td>
                  <td className="p-6 font-medium text-slate-700">{item.expiry}</td>
                  <td className="p-6">
                    <span className="font-mono text-xs bg-slate-100 text-slate-500 px-2 py-1 rounded border border-slate-200">
                      {item.hash}
                    </span>
                  </td>
                  <td className="p-6">
                    <span className={`px-3 py-1 text-xs font-bold uppercase rounded-full ${
                      item.status === 'Optimal' ? 'bg-emerald-100 text-emerald-700' : 'bg-rose-100 text-rose-700'
                    }`}>
                      {item.status}
                    </span>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
}
