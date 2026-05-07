import React from 'react';
import { Link } from 'react-router-dom';
import { motion } from 'framer-motion';

const Home = () => {
  return (
    <div className="bg-slate-50">
      {/* Hero Section */}
      <section className="relative min-h-[90vh] flex items-center pt-20 pb-32 overflow-hidden">
        <div className="container mx-auto px-4 grid grid-cols-1 lg:grid-cols-2 gap-16 items-center relative z-10">
          <motion.div 
            initial={{ opacity: 0, x: -30 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.8, ease: "easeOut" }}
          >
            <div className="inline-flex items-center space-x-2 bg-primary-50 text-primary-700 px-4 py-2 rounded-full mb-8 border border-primary-100">
              <span className="relative flex h-2 w-2">
                <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-primary-400 opacity-75"></span>
                <span className="relative inline-flex rounded-full h-2 w-2 bg-primary-600"></span>
              </span>
              <span className="text-xs font-black uppercase tracking-widest">Next Generation Management</span>
            </div>
            
            <h1 className="text-6xl md:text-8xl font-black text-slate-900 leading-[0.9] mb-8 tracking-tighter">
              Manage Your <br />
              <span className="text-primary-600">Hostel Space</span> <br />
              With Precision.
            </h1>
            
            <p className="text-xl text-slate-500 mb-12 max-w-lg leading-relaxed font-medium">
              A comprehensive system designed for modern property owners. Elevate your hosting experience with seamless booking and room management.
            </p>
            
            <div className="flex flex-col sm:flex-row gap-6">
              <Link 
                to="/hotels" 
                className="bg-primary-600 text-white px-10 py-5 rounded-2xl font-black text-sm uppercase tracking-[0.2em] hover:bg-primary-700 transition-all shadow-2xl shadow-primary-200 active:scale-95 text-center"
              >
                Find Hostels
              </Link>
              <Link 
                to="/admin" 
                className="bg-white text-slate-900 border-2 border-slate-100 px-10 py-5 rounded-2xl font-black text-sm uppercase tracking-[0.2em] hover:border-primary-600 transition-all active:scale-95 text-center"
              >
                Admin Panel
              </Link>
            </div>

            <div className="mt-16 flex items-center space-x-8 grayscale opacity-50">
              <img src="https://upload.wikimedia.org/wikipedia/commons/a/ab/Airbnb_Logo_Belo.svg" alt="" className="h-6" />
              <img src="https://upload.wikimedia.org/wikipedia/commons/6/69/Airbnb_Logo_Belo.svg" alt="" className="h-6 hidden" />
              <span className="font-bold text-slate-400 uppercase tracking-widest text-[10px]">Trusted by Industry Leaders</span>
            </div>
          </motion.div>

          <motion.div 
            initial={{ opacity: 0, scale: 0.9 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ duration: 1, delay: 0.2 }}
            className="relative"
          >
            <div className="relative z-10 rounded-[3rem] overflow-hidden shadow-2xl rotate-2 hover:rotate-0 transition-transform duration-700">
              <img 
                src="https://images.unsplash.com/photo-1555854817-40e098ee7f5a?ixlib=rb-4.0.3&auto=format&fit=crop&w=1000&q=80" 
                alt="Modern Hostel" 
                className="w-full h-[600px] object-cover"
              />
            </div>
            {/* Floating UI Elements */}
            <div className="absolute -top-10 -right-10 bg-white p-6 rounded-3xl shadow-2xl z-20 animate-bounce duration-[3000ms]">
              <div className="flex items-center space-x-4">
                <div className="w-12 h-12 bg-emerald-100 text-emerald-600 rounded-2xl flex items-center justify-center">
                  <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z" /></svg>
                </div>
                <div>
                  <p className="text-xs font-black text-slate-400 uppercase">Bookings Today</p>
                  <p className="text-2xl font-black text-slate-900">+42</p>
                </div>
              </div>
            </div>
            
            <div className="absolute -bottom-10 -left-10 bg-slate-900 p-8 rounded-[2rem] shadow-2xl z-20 text-white max-w-[240px]">
              <p className="text-[10px] font-black text-primary-400 uppercase tracking-widest mb-4">Real-time Analytics</p>
              <div className="flex items-end space-x-2 h-12 mb-4">
                <div className="w-full bg-primary-600 h-[40%] rounded-t-md"></div>
                <div className="w-full bg-primary-600 h-[70%] rounded-t-md"></div>
                <div className="w-full bg-primary-600 h-[100%] rounded-t-md"></div>
                <div className="w-full bg-primary-600 h-[60%] rounded-t-md"></div>
                <div className="w-full bg-primary-600 h-[85%] rounded-t-md"></div>
              </div>
              <p className="text-sm font-bold opacity-70 leading-snug">System occupancy at 94% this week.</p>
            </div>
          </motion.div>
        </div>

        {/* Decor */}
        <div className="absolute top-0 right-0 w-1/3 h-full bg-primary-600/5 -z-0 rounded-l-[10rem]"></div>
      </section>

      {/* Categories Section */}
      <section className="py-32 bg-white relative">
        <div className="container mx-auto px-4">
          <div className="flex justify-between items-end mb-20">
            <div>
              <p className="text-primary-600 font-black uppercase tracking-[0.3em] text-xs mb-4">Curated Inventory</p>
              <h2 className="text-5xl font-black text-slate-900 tracking-tighter">Explore Best Spaces.</h2>
            </div>
            <Link to="/hotels" className="text-slate-900 font-black uppercase tracking-widest text-xs hover:text-primary-600 transition-colors border-b-2 border-slate-900 hover:border-primary-600 pb-2">View All Properties</Link>
          </div>
          
          <div className="grid grid-cols-1 md:grid-cols-3 gap-10">
            {[
              { name: 'Mumbai Hub', count: '12 Hostels', img: 'https://images.unsplash.com/photo-1570160897040-334711995ef9?auto=format&fit=crop&w=800&q=80' },
              { name: 'Goa Retreats', count: '24 Hostels', img: 'https://images.unsplash.com/photo-1512343879784-a960bf40e7f2?auto=format&fit=crop&w=800&q=80' },
              { name: 'Jaipur Heritage', count: '18 Hostels', img: 'https://images.unsplash.com/photo-1599661046289-e318978b39c0?auto=format&fit=crop&w=800&q=80' }
            ].map(city => (
              <motion.div 
                key={city.name}
                whileHover={{ y: -10 }}
                className="group cursor-pointer"
              >
                <div className="relative h-[450px] rounded-[2.5rem] overflow-hidden mb-6 shadow-xl">
                  <img src={city.img} alt={city.name} className="w-full h-full object-cover transition-transform duration-1000 group-hover:scale-110" />
                  <div className="absolute inset-0 bg-gradient-to-t from-slate-900/90 via-slate-900/20 to-transparent"></div>
                  <div className="absolute bottom-8 left-8 right-8 text-white">
                    <p className="text-[10px] font-black uppercase tracking-widest text-primary-400 mb-2">{city.count}</p>
                    <h3 className="text-3xl font-black mb-4 tracking-tight">{city.name}</h3>
                    <div className="w-12 h-12 bg-white/10 backdrop-blur-md rounded-2xl flex items-center justify-center group-hover:bg-primary-600 transition-colors">
                      <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2.5" d="M17 8l4 4m0 0l-4 4m4-4H3" /></svg>
                    </div>
                  </div>
                </div>
              </motion.div>
            ))}
          </div>
        </div>
      </section>
    </div>
  );
};

export default Home;
