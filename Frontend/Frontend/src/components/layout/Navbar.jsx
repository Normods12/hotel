import { Link, useNavigate } from "react-router-dom";
import { useContext } from "react";
import { AuthContext } from "../../context/authContext";
import { motion } from "framer-motion";

const Navbar = () => {
  const navigate = useNavigate();
  const { isAuthenticated, logout, user } = useContext(AuthContext);

  const handleLogout = () => {
    logout();
    navigate("/login");
  };

  return (
    <nav className="bg-white/80 backdrop-blur-md border-b border-slate-100 sticky top-0 z-50 shadow-sm">
      <div className="container mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex justify-between h-20 items-center">
          {/* Brand */}
          <Link to="/" className="flex items-center space-x-3 group">
            <div className="w-10 h-10 bg-primary-600 rounded-xl flex items-center justify-center shadow-lg shadow-primary-200 group-hover:rotate-12 transition-transform duration-300">
              <svg className="w-6 h-6 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2.5" d="M3 12l2-2m0 0l7-7 7 7M5 10v10a1 1 0 001 1h3m10-11l2 2m-2-2v10a1 1 0 01-1 1h-3m-6 0a1 1 0 001-1v-4a1 1 0 011-1h2a1 1 0 011 1v4a1 1 0 001 1m-6 0h6" />
              </svg>
            </div>
            <div className="flex flex-col">
              <span className="text-xl font-black text-slate-900 leading-tight tracking-tight uppercase">Hostel</span>
              <span className="text-xs font-bold text-primary-600 tracking-[0.2em] uppercase -mt-1">Management System</span>
            </div>
          </Link>

          {/* Desktop Nav */}
          <div className="hidden md:flex items-center space-x-8">
            <Link to="/" className="text-slate-600 hover:text-primary-600 font-bold text-sm uppercase tracking-wider transition-colors">Home</Link>
            <Link to="/hotels" className="text-slate-600 hover:text-primary-600 font-bold text-sm uppercase tracking-wider transition-colors">Find a Stay</Link>
            {isAuthenticated && (
              <Link to="/dashboard" className="text-slate-600 hover:text-primary-600 font-bold text-sm uppercase tracking-wider transition-colors">Dashboard</Link>
            )}
          </div>

          {/* Auth Buttons */}
          <div className="flex items-center space-x-6">
            {!isAuthenticated ? (
              <>
                <Link to="/login" className="text-slate-600 hover:text-primary-600 font-bold text-sm uppercase tracking-wider transition-colors">Login</Link>
                <Link 
                  to="/signup" 
                  className="bg-slate-900 text-white px-7 py-3 rounded-2xl font-bold text-sm uppercase tracking-widest hover:bg-primary-600 transition-all shadow-xl shadow-slate-200 active:scale-95"
                >
                  Join Now
                </Link>
              </>
            ) : (
              <div className="flex items-center space-x-6">
                <div className="flex flex-col text-right hidden sm:block">
                  <span className="text-[10px] font-black text-slate-400 uppercase tracking-widest">Active Session</span>
                  <span className="text-sm font-bold text-slate-900 leading-none">{user?.firstName || 'Explorer'}</span>
                </div>
                <button 
                  onClick={handleLogout}
                  className="bg-rose-50 text-rose-600 px-5 py-2.5 rounded-xl text-xs font-black uppercase tracking-widest hover:bg-rose-600 hover:text-white transition-all active:scale-95 border border-rose-100"
                >
                  Logout
                </button>
              </div>
            )}
          </div>
        </div>
      </div>
    </nav>
  );
};

export default Navbar;
