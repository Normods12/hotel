import React from 'react';
import { Link } from 'react-router-dom';

const HotelCard = ({ hotel }) => {
  const { id, name, description, city, starRating, imageUrl, basePrice } = hotel;

  return (
    <div className="bg-white rounded-2xl overflow-hidden shadow-md hover:shadow-xl transition-all duration-300 group">
      {/* Image Container */}
      <div className="relative h-60 overflow-hidden">
        <img 
          src={imageUrl} 
          alt={name} 
          className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-500"
        />
        <div className="absolute top-4 right-4 bg-white/90 backdrop-blur-sm px-3 py-1 rounded-full text-sm font-bold text-gray-900 shadow-sm">
          ₹{basePrice.toLocaleString()}<span className="text-gray-500 font-normal">/night</span>
        </div>
      </div>

      {/* Content */}
      <div className="p-6">
        <div className="flex justify-between items-start mb-2">
          <div>
            <h3 className="text-xl font-bold text-gray-900 group-hover:text-primary-600 transition-colors line-clamp-1">{name}</h3>
            <p className="text-gray-500 text-sm flex items-center mt-1">
              <svg xmlns="http://www.w3.org/2000/svg" className="h-4 w-4 mr-1 text-primary-500" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17.657 16.657L13.414 20.9a1.998 1.998 0 01-2.827 0l-4.244-4.243a8 8 0 1111.314 0z" />
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 11a3 3 0 11-6 0 3 3 0 016 0z" />
              </svg>
              {city}
            </p>
          </div>
          <div className="flex items-center bg-yellow-50 px-2 py-1 rounded-lg">
            <span className="text-yellow-600 font-bold mr-1">{starRating}</span>
            <svg xmlns="http://www.w3.org/2000/svg" className="h-4 w-4 text-yellow-500 fill-current" viewBox="0 0 20 20">
              <path d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.07 3.292a1 1 0 00.95.69h3.462c.969 0 1.371 1.24.588 1.81l-2.8 2.034a1 1 0 00-.364 1.118l1.07 3.292c.3.921-.755 1.688-1.54 1.118l-2.8-2.034a1 1 0 00-1.175 0l-2.8 2.034c-.784.57-1.838-.197-1.539-1.118l1.07-3.292a1 1 0 00-.364-1.118L2.98 8.72c-.783-.57-.38-1.81.588-1.81h3.461a1 1 0 00.951-.69l1.07-3.292z" />
            </svg>
          </div>
        </div>

        <p className="text-gray-600 text-sm mb-6 line-clamp-2 leading-relaxed">
          {description}
        </p>

        <Link 
          to={`/hotels/${id}`}
          className="block w-full text-center bg-gray-50 text-gray-900 font-semibold py-3 rounded-xl hover:bg-primary-600 hover:text-white transition-all duration-300 border border-gray-100 hover:border-primary-600 shadow-sm"
        >
          View Details
        </Link>
      </div>
    </div>
  );
};

export default HotelCard;
