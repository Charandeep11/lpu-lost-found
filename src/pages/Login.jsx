import { useState } from 'react';
import { PackageSearch, Lock, User as UserIcon } from 'lucide-react';
import { useNavigate } from 'react-router-dom';

export default function Login({ onLogin }) {
  const [regNo, setRegNo] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState('');
  const [isLoading, setIsLoading] = useState(false);
  
  const navigate = useNavigate();

  const handleLogin = (e) => {
    e.preventDefault();
    setError('');
    
    // Basic validation
    if (!regNo || !password) {
      setError('Please fill in both fields.');
      return;
    }
    
    if (regNo.length < 8) {
      setError('Invalid Registration Number format.');
      return;
    }

    setIsLoading(true);

    // Mock Authentication Delay
    setTimeout(() => {
      // For this demo, we accept any valid-looking credentials
      localStorage.setItem('lpu_auth_token', 'mock_token_123');
      localStorage.setItem('lpu_user_reg', regNo);
      
      onLogin(); // Tell App.jsx we are logged in
      navigate('/dashboard');
    }, 1500);
  };

  return (
    <div className="min-h-screen flex items-center justify-center p-4 relative overflow-hidden bg-slate-50 dark:bg-black transition-colors">
      {/* Background Magical Elements */}
      <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[800px] h-[800px] bg-brand-500/10 rounded-full blur-[120px] pointer-events-none animate-pulse-slow"></div>
      
      <div className="brand-card w-full max-w-md p-10 relative z-10 animate-fade-in backdrop-blur-xl">
        <div className="flex flex-col items-center mb-10">
          <div className="mb-6 relative">
            <div className="absolute inset-0 bg-brand-400 blur-xl opacity-50 rounded-full"></div>
            <div className="relative bg-white dark:bg-black border border-brand-500/50 p-4 rounded-2xl transition-colors">
              <PackageSearch size={48} className="text-brand-400" strokeWidth={1.5} />
            </div>
          </div>
          <h1 className="text-3xl font-sans text-slate-900 dark:text-white tracking-widest uppercase mb-2 brand-glow text-center transition-colors">LPU Lost & Found</h1>
          <p className="text-brand-600 dark:text-brand-300/70 font-sans text-sm uppercase tracking-[0.2em] font-medium transition-colors">Student Portal Gateway</p>
        </div>

        {error && (
          <div className="mb-6 p-4 bg-red-950/30 border border-red-500/30 text-red-400 text-sm rounded-lg text-center animate-fade-in font-medium">
            {error}
          </div>
        )}

        <form onSubmit={handleLogin} className="space-y-8">
          <div className="space-y-6">
            <div className="relative group">
              <UserIcon className="absolute left-0 top-1/2 -translate-y-1/2 text-brand-500/50 group-focus-within:text-brand-400 transition-colors" size={20} />
              <input 
                type="text" 
                value={regNo}
                onChange={(e) => setRegNo(e.target.value)}
                placeholder="Registration Number"
                className="brand-input w-full pl-10 text-lg"
              />
            </div>
            
            <div className="relative group">
              <Lock className="absolute left-0 top-1/2 -translate-y-1/2 text-brand-500/50 group-focus-within:text-brand-400 transition-colors" size={20} />
              <input 
                type="password" 
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                placeholder="UMS Password"
                className="brand-input w-full pl-10 text-lg"
              />
            </div>
          </div>

          <button 
            type="submit" 
            disabled={isLoading}
            className="brand-button w-full py-4 text-lg flex items-center justify-center gap-3 disabled:opacity-50 disabled:hover:text-brand-300 disabled:hover:bg-transparent"
          >
            {isLoading ? (
              <>
                <div className="w-5 h-5 border-2 border-brand-400/30 border-t-brand-400 rounded-full animate-spin"></div>
                Authenticating...
              </>
            ) : (
              'Enter Portal'
            )}
          </button>
        </form>
        
        <div className="mt-8 text-center border-t border-slate-300 dark:border-white/5 pt-6 transition-colors">
          <p className="text-xs text-slate-500 uppercase tracking-widest">Secured by LPU UMS Integration</p>
        </div>
      </div>
    </div>
  );
}
