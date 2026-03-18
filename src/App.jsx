import { useState, useEffect } from 'react';
import { BrowserRouter, Routes, Route, Navigate, Outlet, useLocation } from 'react-router-dom';
import Navbar from './components/Navbar';
import Home from './pages/Home';
import PostItem from './pages/PostItem';
import SearchItems from './pages/SearchItems';
import ItemDetails from './pages/ItemDetails';
import Login from './pages/Login';

// Protected Route Wrapper
const ProtectedRoute = ({ isAuthenticated, children }) => {
  if (!isAuthenticated) {
    return <Navigate to="/login" replace />;
  }
  // Supports both patterns:
  // - <Route element={<ProtectedRoute ... />}><Route .../></Route> (Outlet)
  // - <ProtectedRoute ...>{children}</ProtectedRoute> (children)
  return children ?? <Outlet />;
};

// Layout with Navbar
const Layout = ({ isAuthenticated, handleLogout, isDarkMode, toggleTheme, children }) => {
  const location = useLocation();
  // Don't show Navbar on login page
  const isLoginPage = location.pathname === '/login';

  return (
    <div className="min-h-screen text-slate-800 dark:text-slate-300 font-sans relative overflow-hidden transition-colors duration-500 bg-slate-50 dark:bg-[#0a0a0a]">
      {/* Ambient Mesh Backgrounds */}
      <div className="fixed top-[-10%] left-[-10%] w-[50vw] h-[50vw] rounded-full bg-brand-400/20 dark:bg-brand-500/10 blur-[100px] pointer-events-none animate-pulse-slow"></div>
      <div className="fixed bottom-[-10%] right-[-10%] w-[60vw] h-[60vw] rounded-full bg-indigo-400/20 dark:bg-indigo-600/10 blur-[130px] pointer-events-none animate-pulse-slow" style={{ animationDelay: '2s' }}></div>

      {!isLoginPage && <Navbar isAuthenticated={isAuthenticated} onLogout={handleLogout} isDarkMode={isDarkMode} toggleTheme={toggleTheme} />}
      <main className={`w-full max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 flex-1 relative z-10 ${!isLoginPage ? 'pt-28 pb-12' : ''}`}>
        {children}
      </main>
    </div>
  );
};

function App() {
  const [isAuthenticated, setIsAuthenticated] = useState(false);
  const [isInitializing, setIsInitializing] = useState(true);
  const [isDarkMode, setIsDarkMode] = useState(() => {
    const saved = localStorage.getItem('lpu_theme');
    if (saved) return saved === 'dark';
    // Check if window exists to prevent build issues, then use matchMedia
    if (typeof window !== 'undefined') {
      return window.matchMedia('(prefers-color-scheme: dark)').matches;
    }
    return true; // Default to dark theme
  });

  useEffect(() => {
    // Apply theme class to html element
    if (isDarkMode) {
      document.documentElement.classList.add('dark');
      localStorage.setItem('lpu_theme', 'dark');
    } else {
      document.documentElement.classList.remove('dark');
      localStorage.setItem('lpu_theme', 'light');
    }
  }, [isDarkMode]);

  const toggleTheme = () => setIsDarkMode(prev => !prev);

  useEffect(() => {
    // Check for auth token on mount
    const token = localStorage.getItem('lpu_auth_token');
    if (token) {
      setIsAuthenticated(true);
    }
    setIsInitializing(false);
  }, []);

  const handleLogin = () => {
    setIsAuthenticated(true);
  };

  const handleLogout = () => {
    localStorage.removeItem('lpu_auth_token');
    localStorage.removeItem('lpu_user_reg');
    setIsAuthenticated(false);
  };

  if (isInitializing) {
    return <div className="min-h-screen bg-black flex items-center justify-center text-magic-500 font-magic">Initializing Portal...</div>;
  }

  return (
    <BrowserRouter>
      <Layout isAuthenticated={isAuthenticated} handleLogout={handleLogout} isDarkMode={isDarkMode} toggleTheme={toggleTheme}>
        <Routes>
          <Route path="/login" element={<Login onLogin={handleLogin} />} />
          <Route path="/" element={<Navigate to="/dashboard" replace />} />

          <Route element={<ProtectedRoute isAuthenticated={isAuthenticated} />}>
            <Route path="/dashboard" element={<Home />} />
            <Route path="/post" element={<PostItem />} />
            <Route path="/search" element={<SearchItems />} />
            <Route path="/item/:id" element={<ItemDetails />} />
          </Route>

          <Route path="*" element={<Navigate to={isAuthenticated ? '/dashboard' : '/login'} replace />} />
        </Routes>
      </Layout>
    </BrowserRouter>
  );
}

export default App;
