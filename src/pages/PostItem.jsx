import { useState, useRef } from 'react';
import { UploadCloud, CheckCircle2, MapPin, Tag, X } from 'lucide-react';

const LOCATIONS = [
  'Block 32', 'Block 33', 'Block 34', 'Block 35',
  'Block 36', 'Block 37', 'Block 38', 'Block 55', 'Block 56',
  'Uni Mall', 'Baldev Raj Mittal Unipolis',
  'BH-1', 'BH-2', 'BH-3', 'BH-4', 'BH-5', 'BH-6', 'BH-7', 'BH-8', 'BH-9', 'BH-10',
  'GH-1', 'GH-2', 'GH-3', 'GH-4', 'GH-5', 'GH-6'
];

const CATEGORIES = [
  'Electronics', 'ID Cards & Documents', 'Stationery', 'Clothing & Accessories', 'Other'
];

export default function PostItem() {
  const [reportType, setReportType] = useState('lost');
  const [isSubmitted, setIsSubmitted] = useState(false);
  const [imagePreview, setImagePreview] = useState(null);
  const fileInputRef = useRef(null);

  const handleImageChange = (e) => {
    const file = e.target.files[0];
    if (file) {
      if (file.size > 5 * 1024 * 1024) {
        alert("File size exceeds 5MB limit.");
        return;
      }
      const reader = new FileReader();
      reader.onloadend = () => setImagePreview(reader.result);
      reader.readAsDataURL(file);
    }
  };

  const removeImage = () => {
    setImagePreview(null);
    if (fileInputRef.current) fileInputRef.current.value = "";
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    setIsSubmitted(true);
    setTimeout(() => {
      window.location.href = '/search';
    }, 2000);
  };

  if (isSubmitted) {
    return (
      <div className="flex flex-col items-center justify-center min-h-[60vh] animate-fade-in text-center">
        <div className="relative">
          <CheckCircle2 size={80} className="text-brand-400 relative z-10 mb-8 brand-glow" strokeWidth={1} />
        </div>
        <h2 className="text-3xl font-sans uppercase tracking-[0.2em] mb-4 text-slate-900 dark:text-white transition-colors">
          Record Sealed
        </h2>
        <p className="text-slate-500 font-sans tracking-widest uppercase text-xs">Redirecting to Archives...</p>
      </div>
    );
  }

  return (
    <div className="max-w-3xl mx-auto animate-fade-in">
      <div className="mb-12 text-center">
        <h1 className="text-4xl md:text-5xl font-sans tracking-widest uppercase text-slate-900 dark:text-white transition-colors mb-6 brand-glow">Report Discovery</h1>
        <p className="text-sm font-sans tracking-[0.2em] uppercase text-slate-500">
          Enscribe details of lost or found artefacts.
        </p>
      </div>

      <div className="brand-card p-8 md:p-12 relative overflow-hidden bg-black/60">
        
        {/* Toggle Type */}
        <div className="relative z-10 flex p-1 bg-slate-50 dark:bg-[#050505] border border-slate-200 dark:border-white/5 mb-10 w-full md:w-fit mx-auto transition-colors">
          <button 
            type="button"
            onClick={() => setReportType('lost')}
            className={`px-8 py-3 text-xs font-sans tracking-[0.2em] uppercase font-bold transition-all duration-300 ${reportType === 'lost' ? 'bg-white dark:bg-black text-rose-600 dark:text-rose-500 border border-slate-200 dark:border-rose-500/30 dark:shadow-[inset_0_0_10px_rgba(244,63,94,0.1)]' : 'text-slate-500 hover:text-slate-700 dark:hover:text-slate-300 border border-transparent'}`}
          >
            I Lost Something
          </button>
          <button 
            type="button"
            onClick={() => setReportType('found')}
            className={`px-8 py-3 text-xs font-sans tracking-[0.2em] uppercase font-bold transition-all duration-300 ${reportType === 'found' ? 'bg-white dark:bg-black text-brand-600 dark:text-brand-400 border border-slate-200 dark:border-brand-500/30' : 'text-slate-500 hover:text-slate-700 dark:hover:text-slate-300 border border-transparent'}`}
          >
            I Found Something
          </button>
        </div>

        <form onSubmit={handleSubmit} className="space-y-10 relative z-10">
          {/* Image Upload */}
          <div>
            <label className="block text-xs font-sans uppercase tracking-[0.2em] text-slate-400 mb-4">Visual Record (Photo)</label>
            
            {!imagePreview ? (
              <div 
                className="border border-dashed border-slate-300 dark:border-white/20 p-12 flex flex-col items-center justify-center text-slate-500 hover:bg-slate-50 dark:hover:bg-white/[0.02] hover:border-brand-500/50 transition-all cursor-pointer group bg-slate-100 dark:bg-[#050505]"
                onClick={() => fileInputRef.current.click()}
              >
                <div className="p-4 border border-slate-200 dark:border-white/5 mb-4 group-hover:border-brand-500/30 group-hover:text-brand-600 dark:group-hover:text-brand-400 transition-colors bg-white dark:bg-black">
                  <UploadCloud size={24} strokeWidth={1} />
                </div>
                <p className="text-sm font-sans tracking-widest uppercase mb-2 group-hover:text-slate-800 dark:group-hover:text-slate-300 transition-colors">Select Visual</p>
                <p className="text-[10px] font-sans tracking-widest uppercase text-slate-600">Max 5MB (JPG/PNG)</p>
              </div>
            ) : (
              <div className="relative overflow-hidden border border-slate-300 dark:border-white/20 group bg-slate-100 dark:bg-black p-2 transition-colors">
                <img src={imagePreview} alt="Preview" className="w-full h-64 object-contain" />
                <div className="absolute inset-0 bg-black/80 opacity-0 group-hover:opacity-100 transition-opacity flex items-center justify-center backdrop-blur-sm shadow-[inset_0_0_20px_rgba(0,0,0,1)]">
                  <button 
                    type="button" 
                    onClick={removeImage}
                    className="flex items-center gap-3 px-6 py-3 bg-rose-500/10 text-rose-500 border border-rose-500/50 font-sans text-xs uppercase tracking-[0.2em] font-bold hover:bg-rose-500/20 transition-colors"
                  >
                    <X size={14} /> Clear Visual
                  </button>
                </div>
              </div>
            )}
            
            <input 
              type="file" 
              accept="image/*" 
              className="hidden" 
              ref={fileInputRef}
              onChange={handleImageChange}
            />
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 gap-8">
            <div>
              <label className="block text-xs font-sans uppercase tracking-[0.2em] text-slate-400 mb-4">Artefact Name</label>
              <input 
                type="text" 
                required
                placeholder="e.g. Apple AirPods Pro"
                className="brand-input w-full font-sans tracking-wider text-xl"
              />
            </div>
            
            <div>
              <label className="block text-xs font-sans uppercase tracking-[0.2em] text-slate-400 mb-4">Date {reportType === 'lost' ? 'Lost' : 'Found'}</label>
              <input 
                type="date" 
                required
                className="brand-input w-full font-sans tracking-widest uppercase text-sm"
                style={{ colorScheme: 'dark' }}
              />
            </div>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 gap-8">
            <div>
              <label className="block text-xs font-sans uppercase tracking-[0.2em] text-slate-400 mb-4 flex items-center gap-2">
                <Tag size={12} className="text-brand-600"/> Classification
              </label>
              <select className="flex-1 bg-transparent border-b border-slate-300 dark:border-white/20 px-0 py-3 rounded-none focus:border-brand-500 outline-none w-full text-slate-900 dark:text-white font-sans tracking-wide text-sm appearance-none cursor-pointer transition-colors">
                <option value="" className="bg-white dark:bg-black text-slate-500">Select class</option>
                {CATEGORIES.map(c => <option key={c} value={c} className="bg-white dark:bg-black text-slate-800 dark:text-slate-200">{c}</option>)}
              </select>
            </div>
            
            <div>
              <label className="block text-xs font-sans uppercase tracking-[0.2em] text-slate-400 mb-4 flex items-center gap-2">
                <MapPin size={12} className="text-brand-600"/> Location Point
              </label>
              <select className="flex-1 bg-transparent border-b border-slate-300 dark:border-white/20 px-0 py-3 rounded-none focus:border-brand-500 outline-none w-full text-slate-900 dark:text-white font-sans tracking-wide text-sm appearance-none cursor-pointer transition-colors">
                <option value="" className="bg-white dark:bg-black text-slate-500">Select area coordinates</option>
                {LOCATIONS.map(l => <option key={l} value={l} className="bg-white dark:bg-black text-slate-800 dark:text-slate-200">{l}</option>)}
              </select>
            </div>
          </div>

          <div>
            <label className="block text-xs font-sans uppercase tracking-[0.2em] text-slate-400 mb-4">Detailed Inscription</label>
            <textarea 
              rows="4"
              placeholder="Describe subtle traits..."
              className="brand-input w-full resize-none"
            ></textarea>
          </div>

          <div className="pt-4">
            <button 
              type="submit" 
              className="brand-button w-full py-5 text-sm"
            >
              Seal Record into Archives
            </button>
          </div>
        </form>
      </div>
    </div>
  );
}
