import Link from "next/link";

export default function Home() {
  return (
    <main className="min-h-screen bg-gradient-to-br from-slate-900 via-blue-900 to-slate-900 text-white selection:bg-blue-500 selection:text-white">
      {/* Navigation */}
      <nav className="fixed w-full z-50 bg-slate-900/50 backdrop-blur-md border-b border-white/10">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex items-center justify-between h-16">
            <div className="flex-shrink-0">
              <span className="text-2xl font-bold bg-clip-text text-transparent bg-gradient-to-r from-blue-400 to-emerald-400">
                SmartHealth
              </span>
            </div>
            <div className="hidden md:block">
              <div className="ml-10 flex items-baseline space-x-4">
                <Link href="/dashboard" className="px-3 py-2 rounded-md text-sm font-medium hover:bg-white/10 transition-colors">
                  Dashboard
                </Link>
                <Link href="#features" className="px-3 py-2 rounded-md text-sm font-medium hover:bg-white/10 transition-colors">
                  Features
                </Link>
              </div>
            </div>
          </div>
        </div>
      </nav>

      {/* Hero Section */}
      <div className="relative pt-32 pb-20 sm:pt-40 sm:pb-24 lg:pb-32 overflow-hidden">
        <div className="relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 sm:static">
          <div className="sm:max-w-lg">
            <h1 className="text-4xl font-extrabold tracking-tight sm:text-6xl lg:text-7xl">
              <span className="block">AI-Driven</span>
              <span className="block text-transparent bg-clip-text bg-gradient-to-r from-blue-400 to-emerald-400">
                Health Center
              </span>
            </h1>
            <p className="mt-6 text-xl text-slate-300 max-w-3xl">
              Enterprise-grade health intelligence. Seamlessly integrating IoT edge devices, federated learning, and blockchain supply chains to deliver unparalleled patient care.
            </p>
            <div className="mt-10 flex space-x-4">
              <Link href="/dashboard" className="px-8 py-4 border border-transparent text-base font-medium rounded-full text-white bg-blue-600 hover:bg-blue-700 md:text-lg transition-all shadow-lg shadow-blue-500/30">
                Launch Dashboard
              </Link>
              <Link href="#architecture" className="px-8 py-4 border border-white/20 text-base font-medium rounded-full text-white bg-white/5 hover:bg-white/10 md:text-lg backdrop-blur-sm transition-all">
                View Architecture
              </Link>
            </div>
          </div>
        </div>

        {/* Decorative background elements */}
        <div className="absolute top-0 right-0 -translate-y-12 translate-x-1/3">
          <div className="w-[600px] h-[600px] bg-blue-500/20 rounded-full blur-3xl" />
        </div>
        <div className="absolute bottom-0 left-0 translate-y-1/3 -translate-x-1/3">
          <div className="w-[400px] h-[400px] bg-emerald-500/20 rounded-full blur-3xl" />
        </div>
      </div>

      {/* Features Grid */}
      <div id="features" className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-20 relative z-10">
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          {[
            { title: "Predictive Analytics", desc: "AI models to forecast disease risks based on real-time vitals and EHR data." },
            { title: "IoT Edge Integration", desc: "Process vital signs locally with sub-millisecond latency using Edge AI." },
            { title: "Immutable Supply Chain", desc: "Blockchain-backed smart contracts for transparent medical supply tracking." }
          ].map((feature, idx) => (
            <div key={idx} className="p-8 rounded-2xl bg-white/5 border border-white/10 backdrop-blur-md hover:bg-white/10 transition-colors">
              <h3 className="text-xl font-bold mb-4">{feature.title}</h3>
              <p className="text-slate-400">{feature.desc}</p>
            </div>
          ))}
        </div>
      </div>
    </main>
  );
}
