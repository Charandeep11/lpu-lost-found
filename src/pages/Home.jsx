import { Link } from 'react-router-dom';
import { Search, PlusCircle, MapPin, ShieldCheck, Clock } from 'lucide-react';

export default function Home() {
  return (
    <div className="flex flex-col animate-fade-in w-full text-slate-800 dark:text-slate-300 transition-colors">
      {/* Hero Section */}
      <section className="relative py-24 overflow-hidden flex flex-col items-center justify-center text-center">
        
        <div className="inline-flex items-center gap-2 px-4 py-1.5 rounded-none text-xs tracking-widest uppercase font-sans border border-brand-500/30 text-brand-600 dark:text-brand-400 mb-10 brand-border-glow animate-slide-up bg-brand-50 dark:bg-black transition-colors">
          <MapPin size={14} className="text-brand-500" />
          Lovely Professional University
        </div>
        
        <h1 className="text-5xl md:text-7xl lg:text-8xl font-sans tracking-widest uppercase leading-tight mb-8 max-w-5xl mx-auto animate-slide-up brand-glow" style={{ animationDelay: '100ms' }}>
          <span className="text-slate-900 dark:text-white transition-colors">Find What You </span>
          <br className="hidden md:block" />
          <span className="text-brand-500">
            Lost
          </span>
        </h1>
        
        <p className="text-sm md:text-base font-sans tracking-[0.2em] uppercase text-slate-500 mb-16 max-w-2xl mx-auto animate-slide-up" style={{ animationDelay: '200ms' }}>
          The digital compendium of lost and found items. <br/>From block 32 to BH-10.
        </p>

        <div className="flex flex-col sm:flex-row gap-6 justify-center animate-slide-up w-full px-4 sm:w-auto" style={{ animationDelay: '300ms' }}>
          <Link to="/post" className="brand-button px-10 py-5 text-sm flex items-center justify-center gap-3 w-full sm:w-auto">
            <PlusCircle size={20} className="relative z-10" />
            <span className="relative z-10">Report an Item</span>
          </Link>
          <Link to="/search" className="bg-transparent border border-slate-300 dark:border-white/20 text-slate-800 dark:text-white hover:border-brand-500 hover:text-brand-600 dark:hover:text-brand-300 px-10 py-5 font-sans text-sm tracking-widest uppercase transition-all duration-300 flex items-center justify-center gap-3 w-full sm:w-auto">
            <Search size={20} />
            Browse Items
          </Link>
        </div>
      </section>

      {/* Features Grid */}
      <section className="py-20 relative">
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8 relative z-10">
          <FeatureCard 
            icon={<MapPin className="text-brand-500" size={32} strokeWidth={1.5} />}
            title="Campus Locations"
            description="Tag items exactly where you found them, whether it's Baldev Raj Mittal Unipolis, BH-9, or GH-1."
          />
          <FeatureCard 
            icon={<ShieldCheck className="text-brand-500" size={32} strokeWidth={1.5} />}
            title="Secure Claiming"
            description="Built-in verification. Prove ownership by answering specific questions to initiate contact."
          />
          <FeatureCard 
            icon={<Clock className="text-brand-500" size={32} strokeWidth={1.5} />}
            title="Real-Time Logging"
            description="Get notified when someone claims your found item or when your lost item is turned in."
          />
        </div>
      </section>

      {/* Recent Activity */}
      <section className="py-20 border-t border-white/5 relative">
        <div className="flex flex-col sm:flex-row justify-between items-start sm:items-end mb-12 gap-4 relative z-10">
          <div>
            <h2 className="text-2xl md:text-3xl font-sans tracking-widest uppercase text-slate-900 dark:text-white transition-colors mb-2 brand-glow">Recent Discoveries</h2>
            <p className="text-slate-500 text-sm font-sans tracking-[0.1em] uppercase">Items turned in around campus recently.</p>
          </div>
          <Link to="/search" className="text-brand-400 hover:text-white border-b border-brand-500/30 pb-1 font-sans text-xs tracking-[0.2em] uppercase flex items-center gap-2 transition-all">
            View Archives <span>&rarr;</span>
          </Link>
        </div>
        
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6 relative z-10">
          <RecentItemCard title="Apple AirPods Pro" location="Block 32, Floor 3" time="2 hours ago" type="found" />
          <RecentItemCard title="Student ID Card" location="Uni Mall Food Court" time="5 hours ago" type="found" />
          <RecentItemCard title="HP Laptop Charger" location="Central Library" time="1 day ago" type="lost" />
          <RecentItemCard title="Black Notebook" location="BH-9" time="1 day ago" type="found" />
        </div>
      </section>
    </div>
  );
}

function FeatureCard({ icon, title, description }) {
  return (
    <div className="brand-card p-10 flex flex-col items-center text-center relative overflow-hidden group">
      <div className="p-6 bg-slate-50 dark:bg-black border border-slate-200 dark:border-white/5 shadow-[0_0_20px_rgba(6,182,212,0.05)] dark:shadow-[0_0_20px_rgba(6,182,212,0.1)] mb-8 group-hover:border-brand-500/50 group-hover:shadow-[0_0_30px_rgba(6,182,212,0.15)] dark:group-hover:shadow-[0_0_30px_rgba(6,182,212,0.3)] transition-all duration-500 relative">
        {icon}
      </div>
      <h3 className="text-xl font-sans tracking-wider text-slate-900 dark:text-white transition-colors mb-4 uppercase">{title}</h3>
      <p className="text-slate-500 leading-relaxed font-sans text-sm">{description}</p>
    </div>
  );
}

function RecentItemCard({ title, location, time, type }) {
  const isFound = type === 'found';
  return (
    <div className="brand-card group relative overflow-hidden flex flex-col h-full hover:-translate-y-1">
      <div className="aspect-video bg-slate-100 dark:bg-[#050505] p-4 flex items-center justify-center border-b border-slate-200 dark:border-white/5 relative overflow-hidden group-hover:bg-slate-200 dark:group-hover:bg-[#0a0a0a] transition-colors">
        <div className="w-16 h-16 bg-white dark:bg-black border border-slate-300 dark:border-white/10 shadow-[0_0_15px_rgba(0,0,0,0.05)] dark:shadow-[0_0_15px_rgba(255,255,255,0.05)] relative z-10 flex items-center justify-center group-hover:border-brand-500/50 transition-colors duration-500"></div>
        <span className={`absolute top-4 right-4 text-[9px] font-sans font-bold uppercase tracking-[0.2em] px-3 py-1.5 border z-10 ${isFound ? 'bg-white dark:bg-black text-brand-600 dark:text-brand-400 border-brand-500/50' : 'bg-white dark:bg-black text-rose-600 dark:text-rose-500 border-rose-500/50'} transition-colors`}>
          {type}
        </span>
      </div>
      <div className="p-6 relative z-10 flex-1 flex flex-col bg-white/50 dark:bg-black/50 transition-colors">
        <h4 className="font-sans text-lg mb-4 truncate text-slate-900 dark:text-white group-hover:text-brand-600 dark:group-hover:text-brand-400 transition-colors uppercase tracking-wider">{title}</h4>
        <div className="flex items-center gap-3 text-xs text-slate-500 mb-3 font-sans uppercase tracking-widest">
          <MapPin size={14} className="text-brand-600" />
          <span className="truncate">{location}</span>
        </div>
        <div className="flex items-center justify-between text-xs font-sans text-slate-600 uppercase tracking-widest mt-auto">
          <span className="flex items-center gap-2"><Clock size={12} className="text-brand-600" /> {time}</span>
        </div>
      </div>
    </div>
  );
}
