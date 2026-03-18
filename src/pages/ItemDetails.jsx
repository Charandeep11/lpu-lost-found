import { useState } from 'react';
import { useParams, Link } from 'react-router-dom';
import { MapPin, Clock, ShieldCheck, ChevronLeft, AlertCircle, Mail } from 'lucide-react';

const mockItems = {
  '1': { id: '1', title: 'iPhone 13 - Black', location: 'Block 32', time: '2 days ago', type: 'lost', category: 'Electronics', description: 'Lost my iPhone 13 near the ground floor washroom in Block 32. It has a transparent case with a tiny scratch on the back.' },
  '2': { id: '2', title: 'Student ID Card (Rahul Kumar)', location: 'Uni Mall', time: '5 hours ago', type: 'found', category: 'ID Cards & Documents', description: 'Found a student ID card near the Domino\'s outlet in Uni Mall.' },
  // ... other items remain same
};

export default function ItemDetails() {
  const { id } = useParams();
  // Provide fallback item if not in mock data for testing
  const item = mockItems[id] || { id, title: 'Mystical Artifact', location: 'Unknown', time: 'Just now', type: 'found', category: 'Other', description: 'A placeholder item.' };
  
  const [isClaiming, setIsClaiming] = useState(false);
  const [claimStatus, setClaimStatus] = useState('idle'); // idle, pending, success
  const [contactedOwner, setContactedOwner] = useState(false);

  const handleClaimSubmit = (e) => {
    e.preventDefault();
    setClaimStatus('pending');
    setTimeout(() => {
      setClaimStatus('success');
    }, 1500);
  };

  const handleFoundIt = () => {
    setContactedOwner(true);
  };

  const isFound = item.type === 'found';

  return (
    <div className="max-w-4xl mx-auto animate-fade-in pb-12 text-slate-800 dark:text-slate-300 transition-colors relative">
      <Link to="/search" className="inline-flex items-center gap-2 text-xs font-sans font-bold uppercase tracking-widest text-slate-500 hover:text-slate-900 dark:hover:text-white mb-8 transition-colors group">
        <div className="bg-transparent border border-slate-300 dark:border-white/10 p-1.5 group-hover:border-brand-500/50 transition-colors">
          <ChevronLeft size={16} />
        </div>
        Return to Archives
      </Link>

      <div className="brand-card p-0 overflow-hidden mb-8 relative">
        <div className="h-48 md:h-64 bg-slate-50 dark:bg-[#050505] flex items-center justify-center p-6 border-b border-slate-200 dark:border-white/5 relative overflow-hidden transition-colors">
          <div className="text-xl text-slate-400 dark:text-white/10 font-sans tracking-[0.2em] uppercase flex flex-col items-center relative z-10 transition-colors">
             <div className="w-20 h-20 mb-6 bg-white dark:bg-black border border-slate-200 dark:border-white/5 flex items-center justify-center group-hover:border-brand-500/50 transition-colors duration-500 shadow-[inset_0_0_10px_rgba(0,0,0,0.02)] dark:shadow-[inset_0_0_10px_rgba(255,255,255,0.02)]"></div>
             No Visual Record
          </div>
        </div>

        <div className="p-8 md:p-12 relative z-10 bg-white/80 dark:bg-black/80 transition-colors">
          <span className={`absolute top-0 right-8 -translate-y-1/2 px-5 py-2 text-[10px] font-sans font-bold uppercase tracking-[0.2em] shadow-2xl border ${isFound ? 'bg-white dark:bg-black text-brand-600 dark:text-brand-400 border-brand-500/50' : 'bg-white dark:bg-black text-rose-600 dark:text-rose-500 border-rose-500/50'} transition-colors`}>
            {item.type}
          </span>
          
          <div className="flex flex-col md:flex-row md:items-end justify-between gap-6 mb-8 pb-8 border-b border-slate-200 dark:border-white/10 transition-colors">
            <div>
              <span className="text-[10px] font-sans font-bold uppercase tracking-[0.2em] text-brand-600 dark:text-brand-500 mb-4 block border border-slate-300 dark:border-white/10 p-2 w-max transition-colors">{item.category}</span>
              <h1 className="text-4xl md:text-5xl font-sans text-slate-900 dark:text-white leading-tight uppercase tracking-wider transition-colors">{item.title}</h1>
            </div>
            {isFound && claimStatus === 'idle' && !isClaiming && (
              <button 
                onClick={() => setIsClaiming(true)}
                className="brand-button px-8 py-4 whitespace-nowrap"
              >
                Claim Artefact
              </button>
            )}
            {!isFound && !contactedOwner && (
              <button 
                onClick={handleFoundIt}
                className="bg-transparent border border-rose-500 text-rose-500 hover:bg-rose-500/10 hover:text-rose-400 font-sans font-bold tracking-widest uppercase px-8 py-4 transition-all duration-300 whitespace-nowrap"
              >
                I Found This
              </button>
            )}
            {!isFound && contactedOwner && (
              <div className="flex items-center gap-2 text-rose-500 font-sans text-xs font-bold tracking-widest uppercase border border-rose-500/30 bg-rose-500/5 px-6 py-4">
                <Mail size={16} /> Owner Notified
              </div>
            )}
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-8 mb-8">
            <div className="col-span-2">
              <h3 className="text-lg font-sans uppercase tracking-widest text-slate-900 dark:text-white mb-6 transition-colors">Description Record</h3>
              <p className="text-slate-600 dark:text-slate-400 font-sans text-sm tracking-wide leading-relaxed bg-slate-50 dark:bg-[#050505] p-8 border border-slate-200 dark:border-white/5 relative transition-colors">
                <span className="absolute top-0 left-0 w-2 h-full bg-brand-900/40"></span>
                {item.description}
              </p>
            </div>
            
            <div className="space-y-6 bg-slate-50 dark:bg-[#050505] p-8 border border-slate-200 dark:border-white/5 h-fit relative transition-colors">
              <span className="absolute top-0 left-0 w-full h-1 bg-gradient-to-r from-brand-900/0 via-brand-500/30 to-brand-900/0"></span>
              <div className="flex items-start gap-4 text-slate-300">
                <MapPin size={20} className="text-brand-600 mt-1" />
                <div>
                  <span className="block text-[10px] font-sans font-bold text-slate-500 dark:text-slate-600 uppercase tracking-[0.2em] mb-2 transition-colors">Location Discovered</span>
                  <span className="font-sans text-lg text-slate-900 dark:text-white uppercase tracking-wider transition-colors">{item.location}</span>
                </div>
              </div>
              <div className="w-full h-px bg-slate-200 dark:bg-white/5 my-6 transition-colors"></div>
              <div className="flex items-start gap-4 text-slate-300">
                <Clock size={20} className="text-brand-600 mt-1" />
                <div>
                  <span className="block text-[10px] font-sans font-bold text-slate-500 dark:text-slate-600 uppercase tracking-[0.2em] mb-2 transition-colors">Temporal Marker</span>
                  <span className="font-sans text-sm text-slate-700 dark:text-slate-300 tracking-wide transition-colors">{item.time}</span>
                </div>
              </div>
            </div>
          </div>

          {/* Claim Flow */}
          {isClaiming && isFound && claimStatus !== 'success' && (
            <div className="mt-12 p-8 md:p-10 bg-slate-50 dark:bg-[#050505] border border-brand-500/30 relative overflow-hidden animate-slide-up brand-border-glow transition-colors">
              <div className="flex flex-col sm:flex-row gap-4 justify-between sm:items-center border-b border-slate-200 dark:border-white/10 pb-6 mb-8 relative z-10 transition-colors">
                <div>
                  <h3 className="text-xl font-sans uppercase tracking-widest text-slate-900 dark:text-white flex items-center gap-3 transition-colors">
                    <ShieldCheck className="text-brand-500" size={24} /> Ownership Verification
                  </h3>
                  <p className="text-xs font-sans tracking-widest text-slate-500 mt-3 uppercase">
                    Provide identifying details to establish a link.
                  </p>
                </div>
                <div className="border border-red-500/30 text-red-500 px-4 py-2 text-[10px] font-sans font-bold flex items-center gap-2 whitespace-nowrap self-start sm:self-auto uppercase tracking-widest bg-red-500/5">
                    <AlertCircle size={14}/> Anti-Fraud Runes Active
                </div>
              </div>

              <form onSubmit={handleClaimSubmit} className="space-y-8 relative z-10">
                <div>
                  <label className="block text-xs font-sans uppercase tracking-[0.2em] text-slate-400 mb-4">
                    Identifying Marks / Internal Contents
                  </label>
                  <textarea 
                    required
                    rows="3"
                    className="brand-input w-full"
                    placeholder="Describe unique characteristics..."
                  ></textarea>
                </div>

                <div className="grid grid-cols-1 sm:grid-cols-2 gap-8">
                  <div>
                    <label className="block text-xs font-sans uppercase tracking-[0.2em] text-slate-400 mb-4">
                      Registration Sigil (Number)
                    </label>
                    <input 
                      type="text" 
                      required
                      placeholder="e.g. 12000000"
                      className="brand-input w-full font-mono"
                    />
                  </div>
                  <div>
                    <label className="block text-xs font-sans uppercase tracking-[0.2em] text-slate-400 mb-4">
                      Communication Frequency (Phone)
                    </label>
                    <input 
                      type="tel" 
                      required
                      placeholder="e.g. 9876543210"
                      className="brand-input w-full font-mono"
                    />
                  </div>
                </div>

                <div className="flex gap-4 pt-6">
                  <button 
                    type="submit" 
                    disabled={claimStatus === 'pending'}
                    className="brand-button flex-1 py-4 text-sm flex items-center justify-center disabled:opacity-50"
                  >
                    {claimStatus === 'pending' ? (
                      <span className="flex items-center gap-3">
                        <span className="w-4 h-4 border border-brand-400/30 border-t-brand-400 rounded-full animate-spin"></span> Verifying...
                      </span>
                    ) : 'Initiate Claim Protocol'}
                  </button>
                  <button 
                    type="button" 
                    onClick={() => setIsClaiming(false)}
                    className="px-8 bg-transparent text-slate-500 dark:text-slate-400 font-sans text-sm uppercase tracking-widest py-4 hover:bg-slate-100 dark:hover:bg-white/5 transition-all border border-slate-300 dark:border-white/10"
                  >
                    Abort
                  </button>
                </div>
              </form>
            </div>
          )}

          {claimStatus === 'success' && (
            <div className="mt-12 p-10 bg-slate-50 dark:bg-[#050505] border border-brand-500/30 text-center animate-fade-in relative overflow-hidden brand-border-glow transition-colors">
              <ShieldCheck size={48} className="mx-auto text-brand-400 mb-6 relative z-10 brand-glow" />
              <h3 className="text-2xl font-sans uppercase tracking-widest text-slate-900 dark:text-white mb-4 relative z-10 transition-colors">Verification Protocol Initiated</h3>
              <p className="text-slate-400 font-sans text-sm tracking-wide max-w-lg mx-auto relative z-10 leading-relaxed">
                Your credentials have been securely transmitted to the finder. The connection line is open and they will contact your frequency shortly.
              </p>
            </div>
          )}
        </div>
      </div>
    </div>
  );
}
