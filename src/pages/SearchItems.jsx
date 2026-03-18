import { useState } from 'react';
import { Link } from 'react-router-dom';
import { Search, MapPin, SlidersHorizontal, Clock, ArrowRight } from 'lucide-react';

const mockItems = [
  { id: '1', title: 'iPhone 13 - Black', location: 'Block 32', time: '2 days ago', type: 'lost', category: 'Electronics', image: null },
  { id: '2', title: 'Student ID Card', location: 'Uni Mall', time: '5 hours ago', type: 'found', category: 'ID Cards', image: null },
  { id: '3', title: 'Apple AirPods Pro', location: 'Block 34', time: '2 hours ago', type: 'found', category: 'Electronics', image: null },
  { id: '4', title: 'HP Laptop Charger', location: 'Central Library', time: '1 day ago', type: 'lost', category: 'Electronics', image: null },
  { id: '5', title: 'Black Notebook', location: 'Baldev Raj Mittal Unipolis', time: '1 day ago', type: 'found', category: 'Stationery', image: null },
  { id: '6', title: 'Blue Umbrella', location: 'BH-9', time: '3 hours ago', type: 'found', category: 'Other', image: null },
];

export default function SearchItems() {
  const [searchTerm, setSearchTerm] = useState('');
  const [filterType, setFilterType] = useState('all');

  const filteredItems = mockItems.filter(item => {
    const matchesSearch = item.title.toLowerCase().includes(searchTerm.toLowerCase()) || 
                          item.location.toLowerCase().includes(searchTerm.toLowerCase());
    const matchesType = filterType === 'all' || item.type === filterType;
    return matchesSearch && matchesType;
  });

  return (
    <div className="flex flex-col md:flex-row gap-8 animate-fade-in w-full text-slate-800 dark:text-slate-300 transition-colors">
      {/* Sidebar Filters */}
      <aside className="w-full md:w-72 shrink-0 space-y-6">
        <div className="brand-card p-6 sticky top-32">
          <div className="flex items-center gap-3 font-sans text-sm tracking-[0.2em] uppercase text-slate-900 dark:text-white border-b border-slate-200 dark:border-white/10 pb-4 mb-6 relative z-10 brand-glow transition-colors">
            <SlidersHorizontal size={16} className="text-brand-500" /> Filters
          </div>

          <div className="space-y-8 relative z-10">
            <div>
              <label className="block text-xs font-sans tracking-widest text-slate-500 uppercase mb-4">Item Status</label>
              <div className="flex flex-col gap-4 font-sans text-sm">
                <label className="flex items-center gap-3 text-slate-600 dark:text-slate-400 cursor-pointer hover:text-slate-900 dark:hover:text-white transition-colors">
                  <input type="radio" name="type" checked={filterType === 'all'} onChange={() => setFilterType('all')} className="accent-brand-500 w-4 h-4" /> 
                  <span className="tracking-wide">All Items</span>
                </label>
                <label className="flex items-center gap-3 text-slate-600 dark:text-slate-400 cursor-pointer hover:text-slate-900 dark:hover:text-white transition-colors">
                  <input type="radio" name="type" checked={filterType === 'lost'} onChange={() => setFilterType('lost')} className="accent-rose-500 w-4 h-4" /> 
                  <span className="tracking-wide">Reported Lost</span>
                </label>
                <label className="flex items-center gap-3 text-slate-600 dark:text-slate-400 cursor-pointer hover:text-slate-900 dark:hover:text-white transition-colors">
                  <input type="radio" name="type" checked={filterType === 'found'} onChange={() => setFilterType('found')} className="accent-brand-500 w-4 h-4" /> 
                  <span className="tracking-wide">Reported Found</span>
                </label>
              </div>
            </div>

            <div>
              <label className="block text-xs font-sans tracking-widest text-slate-500 uppercase mb-4">Location</label>
              <select className="w-full text-sm px-0 py-3 bg-transparent border-b border-slate-300 dark:border-white/20 outline-none cursor-pointer focus:border-brand-500 text-slate-900 dark:text-white transition-colors font-sans tracking-wide">
                <option value="all" className="bg-white dark:bg-black text-slate-800 dark:text-white">Any Location</option>
                <option value="b32" className="bg-white dark:bg-black text-slate-800 dark:text-white">Block 32</option>
                <option value="b34" className="bg-white dark:bg-black text-slate-800 dark:text-white">Block 34</option>
                <option value="unimall" className="bg-white dark:bg-black text-slate-800 dark:text-white">Uni Mall</option>
                <option value="library" className="bg-white dark:bg-black text-slate-800 dark:text-white">Central Library</option>
                <option value="bh1" className="bg-white dark:bg-black text-slate-800 dark:text-white">BH-1</option>
                <option value="bh9" className="bg-white dark:bg-black text-slate-800 dark:text-white">BH-9</option>
                <option value="bh10" className="bg-white dark:bg-black text-slate-800 dark:text-white">BH-10</option>
                <option value="gh1" className="bg-white dark:bg-black text-slate-800 dark:text-white">GH-1</option>
              </select>
            </div>
          </div>
        </div>
      </aside>

      {/* Main Content */}
      <div className="flex-1 space-y-6">
        {/* Search Bar */}
        <div className="relative group">
          <Search size={22} className="absolute left-0 top-1/2 -translate-y-1/2 text-brand-600 z-10" />
          <input 
            type="text" 
            placeholder="Search the archives..." 
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
            className="w-full pl-10 pr-0 py-5 bg-transparent border-b border-slate-300 dark:border-white/20 outline-none focus:border-brand-500 text-xl text-slate-900 dark:text-white placeholder:text-slate-400 dark:placeholder:text-slate-600 transition-colors font-sans tracking-wider relative z-0"
          />
        </div>

        {/* Results Info */}
        <div className="flex items-center justify-between text-xs font-sans tracking-widest uppercase text-slate-500 py-4">
          <span>Showing <span className="text-brand-400">{filteredItems.length}</span> Records</span>
        </div>

        {/* Items Grid */}
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
          {filteredItems.map(item => (
            <ItemCard key={item.id} item={item} />
          ))}

          {filteredItems.length === 0 && (
            <div className="col-span-full py-24 text-center text-slate-500 brand-card flex flex-col items-center">
              <Search size={32} className="text-slate-700 mb-6" />
              <p className="text-sm font-sans tracking-[0.2em] uppercase">No records found matching your query.</p>
            </div>
          )}
        </div>
      </div>
    </div>
  );
}

function ItemCard({ item }) {
  const isFound = item.type === 'found';
  return (
    <div className="brand-card group relative overflow-hidden flex flex-col hover:-translate-y-1 bg-white/40 dark:bg-black/40 transition-colors">
      <div className="aspect-video bg-slate-50 dark:bg-[#050505] flex items-center justify-center border-b border-slate-200 dark:border-white/5 relative overflow-hidden group-hover:bg-slate-100 dark:group-hover:bg-[#0a0a0a] transition-colors">
        <div className="w-16 h-16 bg-white dark:bg-black border border-slate-200 dark:border-white/10 relative z-10 flex items-center justify-center group-hover:border-brand-500/50 transition-colors duration-500 dark:shadow-[0_0_15px_rgba(255,255,255,0.05)] shadow-[0_0_15px_rgba(0,0,0,0.05)]">
          <MapPin size={20} className={isFound ? 'text-brand-500' : 'text-rose-500'} strokeWidth={1} />
        </div>
        
        <span className={`absolute top-4 right-4 text-[9px] uppercase tracking-[0.2em] font-bold px-3 py-1.5 border z-10 bg-white dark:bg-black transition-colors ${isFound ? 'text-brand-600 dark:text-brand-400 border-brand-500/50' : 'text-rose-600 dark:text-rose-500 border-rose-500/50'}`}>
          {item.type}
        </span>
      </div>
      <div className="p-6 flex-1 flex flex-col relative z-10">
        <div className="mb-6">
          <h4 className="font-sans text-xl mb-3 truncate text-slate-900 dark:text-white group-hover:text-brand-600 dark:group-hover:text-brand-400 transition-colors duration-300 uppercase tracking-wider" title={item.title}>
            {item.title}
          </h4>
          <span className="text-[10px] uppercase font-sans tracking-widest text-slate-500 border border-slate-300 dark:border-white/10 px-2 py-1 transition-colors">
            {item.category}
          </span>
        </div>
        
        <div className="flex flex-col gap-3 text-xs text-slate-400 mb-8 font-sans uppercase tracking-[0.1em]">
          <div className="flex items-center gap-3"><MapPin size={14} className="text-brand-600" />{item.location}</div>
          <div className="flex items-center gap-3"><Clock size={14} className="text-brand-600" />{item.time}</div>
        </div>

        <Link to={`/item/${item.id}`} className="mt-auto px-0 py-3 border-t border-slate-200 dark:border-white/5 text-slate-500 dark:text-slate-400 hover:text-brand-600 dark:hover:text-brand-400 text-xs font-sans tracking-widest uppercase flex items-center justify-between transition-all duration-300 group-hover:border-brand-500/30">
          Inspect Record <ArrowRight size={14} className="group-hover:translate-x-1 transition-transform" />
        </Link>
      </div>
    </div>
  );
}
