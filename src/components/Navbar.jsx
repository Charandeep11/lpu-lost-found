import { Link, useLocation } from 'react-router-dom';
import { Search, PlusCircle, LogOut, PackageSearch, Sun, Moon } from 'lucide-react';

export default function Navbar({ isAuthenticated, onLogout, isDarkMode, toggleTheme }) {
  const location = useLocation();

  const isActive = (path) => location.pathname === path;

  if (!isAuthenticated) return null;

  return (
    <nav className="fixed top-0 left-0 right-0 z-50 bg-white/80 dark:bg-black/80 backdrop-blur-xl border-b border-slate-200 dark:border-white/5 transition-all duration-300">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="h-24 flex items-center justify-between">
          <Link to="/dashboard" className="flex items-center space-x-4 group outline-none">
            <div className="bg-transparent border border-brand-500/30 text-brand-400 p-2 group-hover:bg-brand-900/40 group-hover:border-brand-500 transition-all duration-500 brand-border-glow">
              <PackageSearch size={32} strokeWidth={1} />
            </div>
            <div className="flex flex-col text-slate-900 dark:text-white transition-colors duration-300">
              <span className="font-sans font-bold text-2xl tracking-widest uppercase brand-glow">
                LPU Lost
              </span>
              <span className="font-sans font-bold text-sm tracking-[0.2em] text-brand-500 uppercase">
                & Found Portal
              </span>
            </div>
          </Link>

          <div className="hidden md:flex items-center space-x-8">
            <Link 
              to="/search" 
              className={`flex items-center space-x-2 text-sm font-sans tracking-wide transition-all duration-300 hover:text-brand-300 ${isActive('/search') ? 'text-brand-400 font-medium' : 'text-slate-400'}`}
            >
              <Search size={18} className={isActive('/search') ? 'text-brand-400' : ''} />
              <span>Browse Items</span>
            </Link>
            
            <Link 
              to="/post" 
              className={`flex items-center space-x-2 text-sm font-sans tracking-wide transition-all duration-300 hover:text-brand-300 ${isActive('/post') ? 'text-brand-400 font-medium' : 'text-slate-400'}`}
            >
              <PlusCircle size={18} className={isActive('/post') ? 'text-brand-400' : ''} />
              <span>Report Lost/Found</span>
            </Link>

            <div className="h-8 w-px bg-slate-200 dark:bg-white/10 transition-colors"></div>

            <button
              onClick={toggleTheme}
              className="p-2 text-slate-500 hover:text-brand-500 dark:text-slate-400 dark:hover:text-brand-400 transition-colors"
              aria-label="Toggle Theme"
            >
              {isDarkMode ? <Sun size={20} /> : <Moon size={20} />}
            </button>

            <button 
              onClick={onLogout}
              className="brand-button flex items-center space-x-2 px-5 py-2 group text-sm"
            >
              <LogOut size={16} className="text-brand-500 group-hover:text-white transition-colors" />
              <span className="relative z-10">Sign Out</span>
            </button>
          </div>
        </div>
      </div>
    </nav>
  );
}
