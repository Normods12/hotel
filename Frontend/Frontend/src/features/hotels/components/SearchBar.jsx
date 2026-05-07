import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';

const SearchBar = () => {
  const navigate = useNavigate();
  const [location, setLocation] = useState('');

  const handleSearch = (e) => {
    e.preventDefault();
    if (location) {
      navigate(`/hotels?location=${location}`);
    }
  };

  return (
    <div className="w-full max-w-5xl mx-auto">
      <form 
        onSubmit={handleSearch}
        className="bg-white p-4 rounded-[2rem] shadow-2xl shadow-slate-200 border border-slate-100 flex flex-col md:flex-row items-center gap-4"
      >
        <div className="flex-grow flex items-center px-6 py-4 bg-slate-50 rounded-2xl border border-slate-100 group focus-within:border-primary-600 transition-all w-full">
          <svg className="h-6 w-6 text-slate-400 group-focus-within:text-primary-600 transition-colors mr-4" fill="none" viewBox="0 0 24 24" stroke="currentColor">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2.5} d="M17.657 16.657L13.414 20.9a1.998 1.998 0 01-2.827 0l-4.244-4.243a8 8 0 1111.314 0z" />
          </svg>
          <input 
            type="text" 
            placeholder="Where are you going?" 
            value={location}
            onChange={(e) => setLocation(e.target.value)}
            className="bg-transparent border-none outline-none text-slate-900 font-bold placeholder-slate-400 w-full"
          />
        </div>

        <div className="flex items-center px-6 py-4 bg-slate-50 rounded-2xl border border-slate-100 w-full md:w-auto min-w-[200px]">
          <svg className="h-6 w-6 text-slate-400 mr-4" fill="none" viewBox="0 0 24 24" stroke="currentColor">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2.5} d="M8 7V3m8 4V3m-9 8h10M5 21h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v12a2 2 0 002 2z" />
          </svg>
          <div className="flex flex-col">
            <span className="text-[10px] font-black text-slate-400 uppercase tracking-widest leading-none mb-1">Check-in</span>
            <span className="text-sm font-black text-slate-900 leading-none">Choose Date</span>
          </div>
        </div>

        <button 
          type="submit"
          className="bg-slate-900 text-white px-10 py-5 rounded-2xl font-black text-sm uppercase tracking-[0.2em] hover:bg-primary-600 transition-all shadow-xl shadow-slate-200 active:scale-95 w-full md:w-auto"
        >
          Search
        </button>
      </form>
    </div>
  );
};

export default SearchBar;
