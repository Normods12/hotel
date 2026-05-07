import React from 'react';
import { Link } from 'react-router-dom';

const Footer = () => {
  return (
    <footer className="bg-slate-900 text-white pt-24 pb-12">
      <div className="container mx-auto px-4">
        <div className="grid grid-cols-1 md:grid-cols-4 gap-16 mb-20">
          <div className="col-span-1 md:col-span-1">
            <Link to="/" className="flex items-center space-x-3 mb-8">
              <div className="w-10 h-10 bg-primary-600 rounded-xl flex items-center justify-center shadow-lg shadow-primary-900/50">
                <svg className="w-6 h-6 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2.5" d="M3 12l2-2m0 0l7-7 7 7M5 10v10a1 1 0 001 1h3m10-11l2 2m-2-2v10a1 1 0 01-1 1h-3m-6 0a1 1 0 001-1v-4a1 1 0 011-1h2a1 1 0 011 1v4a1 1 0 001 1m-6 0h6" />
                </svg>
              </div>
              <div className="flex flex-col">
                <span className="text-xl font-black leading-tight tracking-tight uppercase">Hostel</span>
                <span className="text-xs font-bold text-primary-400 tracking-[0.2em] uppercase -mt-1">Management System</span>
              </div>
            </Link>
            <p className="text-slate-400 font-medium leading-relaxed mb-8">
              Empowering property owners with cutting-edge tools for seamless hostel management and guest satisfaction.
            </p>
            <div className="flex space-x-4">
              {['facebook', 'twitter', 'instagram', 'linkedin'].map(social => (
                <a key={social} href="#" className="w-10 h-10 bg-slate-800 rounded-xl flex items-center justify-center hover:bg-primary-600 transition-colors">
                  <span className="sr-only">{social}</span>
                  <div className="w-5 h-5 bg-white/20 rounded-sm"></div>
                </a>
              ))}
            </div>
          </div>

          <div>
            <h4 className="text-sm font-black uppercase tracking-[0.3em] mb-8 text-primary-400">Quick Links</h4>
            <ul className="space-y-4">
              <li><Link to="/hotels" className="text-slate-400 hover:text-white transition-colors font-bold text-sm uppercase tracking-widest">Find a Stay</Link></li>
              <li><Link to="/admin" className="text-slate-400 hover:text-white transition-colors font-bold text-sm uppercase tracking-widest">Admin Panel</Link></li>
              <li><Link to="/login" className="text-slate-400 hover:text-white transition-colors font-bold text-sm uppercase tracking-widest">User Login</Link></li>
              <li><Link to="/signup" className="text-slate-400 hover:text-white transition-colors font-bold text-sm uppercase tracking-widest">Create Account</Link></li>
            </ul>
          </div>

          <div>
            <h4 className="text-sm font-black uppercase tracking-[0.3em] mb-8 text-primary-400">Company</h4>
            <ul className="space-y-4">
              <li><a href="#" className="text-slate-400 hover:text-white transition-colors font-bold text-sm uppercase tracking-widest">About Us</a></li>
              <li><a href="#" className="text-slate-400 hover:text-white transition-colors font-bold text-sm uppercase tracking-widest">Careers</a></li>
              <li><a href="#" className="text-slate-400 hover:text-white transition-colors font-bold text-sm uppercase tracking-widest">Contact Support</a></li>
              <li><a href="#" className="text-slate-400 hover:text-white transition-colors font-bold text-sm uppercase tracking-widest">Terms & Privacy</a></li>
            </ul>
          </div>

          <div>
            <h4 className="text-sm font-black uppercase tracking-[0.3em] mb-8 text-primary-400">Newsletter</h4>
            <p className="text-slate-400 font-medium mb-6">Stay updated with the latest in hostel management.</p>
            <form className="flex flex-col space-y-4">
              <input 
                type="email" 
                placeholder="Enter your email" 
                className="bg-slate-800 border-none rounded-xl px-4 py-3 text-sm focus:ring-2 focus:ring-primary-600 outline-none"
              />
              <button className="bg-primary-600 text-white font-black uppercase tracking-widest text-[10px] py-4 rounded-xl hover:bg-primary-700 transition-colors">Subscribe</button>
            </form>
          </div>
        </div>

        <div className="border-t border-slate-800 pt-12 flex flex-col md:flex-row justify-between items-center">
          <p className="text-slate-500 text-xs font-bold uppercase tracking-widest">
            © 2026 HMS. All rights reserved. Built with precision.
          </p>
          <div className="flex space-x-8 mt-6 md:mt-0">
            <span className="text-slate-500 text-xs font-bold uppercase tracking-widest">Privacy Policy</span>
            <span className="text-slate-500 text-xs font-bold uppercase tracking-widest">Terms of Service</span>
          </div>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
