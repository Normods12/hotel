import React from 'react';
import { Link } from 'react-router-dom';
import { motion } from 'framer-motion';

const HotelCard = ({ hotel }) => {
  const { id, name, city, starRating, imageUrl, basePrice } = hotel;

  return (
    <motion.div 
      whileHover={{ y: -12 }}
      whileTap={{ scale: 0.98 }}
      className="bg-white rounded-[2.5rem] overflow-hidden shadow-sm hover:shadow-2xl hover:shadow-slate-200 transition-all duration-500 border border-slate-100 group h-full flex flex-col"
    >
      {/* Image Container */}
      <div className="relative h-72 overflow-hidden">
        <img 
          src={imageUrl} 
          alt={name} 
          className="w-full h-full object-cover transition-transform duration-1000 group-hover:scale-110"
        />
        <div className="absolute top-6 left-6 flex space-x-2">
          <div className="bg-white/90 backdrop-blur-md px-4 py-1.5 rounded-full text-[10px] font-black uppercase tracking-widest text-slate-900 shadow-sm">
            Featured
          </div>
          {starRating >= 4.5 && (
            <div className="bg-primary-600 px-4 py-1.5 rounded-full text-[10px] font-black uppercase tracking-widest text-white shadow-lg shadow-primary-200">
              Top Rated
            </div>
          )}
        </div>
        <div className="absolute bottom-0 left-0 right-0 h-1/2 bg-gradient-to-t from-slate-900/60 to-transparent"></div>
      </div>

      {/* Content */}
      <div className="p-8 flex-grow flex flex-col">
        <div className="flex justify-between items-start mb-4">
          <div>
            <p className="text-[10px] font-black text-primary-600 uppercase tracking-widest mb-1">{city}</p>
            <h3 className="text-2xl font-black text-slate-900 leading-tight group-hover:text-primary-600 transition-colors">{name}</h3>
          </div>
          <div className="flex items-center bg-slate-50 px-3 py-1.5 rounded-xl border border-slate-100">
            <svg className="h-4 w-4 text-amber-400 fill-current" viewBox="0 0 20 20"><path d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.07 3.292a1 1 0 00.95.69h3.462c.969 0 1.371 1.24.588 1.81l-2.8 2.034a1 1 0 00-.364 1.118l1.07 3.292c.3.921-.755 1.688-1.54 1.118l-2.8-2.034a1 1 0 00-1.175 0l-2.8 2.034c-.784.57-1.838-.197-1.539-1.118l1.07-3.292a1 1 0 00-.364-1.118L2.98 8.72c-.783-.57-.38-1.81.588-1.81h3.461a1 1 0 00.951-.69l1.07-3.292z" /></svg>
            <span className="ml-1.5 text-xs font-black text-slate-900">{starRating}</span>
          </div>
        </div>

        <div className="flex items-center space-x-6 mb-8 text-slate-400">
          <div className="flex items-center text-[10px] font-bold uppercase tracking-wider">
            <div className="w-1.5 h-1.5 bg-slate-300 rounded-full mr-2"></div>
            Fast WiFi
          </div>
          <div className="flex items-center text-[10px] font-bold uppercase tracking-wider">
            <div className="w-1.5 h-1.5 bg-slate-300 rounded-full mr-2"></div>
            Breakfast
          </div>
        </div>

        <div className="mt-auto pt-8 border-t border-slate-50 flex items-center justify-between">
          <div>
            <p className="text-[10px] font-black text-slate-400 uppercase tracking-widest mb-1">Starting from</p>
            <div className="flex items-baseline space-x-1">
              <span className="text-2xl font-black text-slate-900">₹{basePrice.toLocaleString()}</span>
              <span className="text-[10px] font-bold text-slate-400 uppercase tracking-widest">/ Night</span>
            </div>
          </div>
          <Link 
            to={`/hotels/${id}`} 
            className="w-12 h-12 bg-slate-900 text-white rounded-2xl flex items-center justify-center group-hover:bg-primary-600 transition-all duration-300 shadow-xl shadow-slate-100 hover:scale-110"
          >
            <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2.5" d="M17 8l4 4m0 0l-4 4m4-4H3" /></svg>
          </Link>
        </div>
      </div>
    </motion.div>
  );
};

export default HotelCard;
