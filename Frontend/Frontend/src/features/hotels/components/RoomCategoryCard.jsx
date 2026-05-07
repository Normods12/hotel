import React, { useState } from 'react';
import { motion } from 'framer-motion';

const RoomCategoryCard = ({ category, onQuantityChange, selectedQuantity }) => {
  const [isChecking, setIsChecking] = useState(false);
  const [availability, setAvailability] = useState('unknown'); // 'unknown', 'available', 'sold_out'

  const handleCheckAvailability = () => {
    setIsChecking(true);
    // Simulate API call
    setTimeout(() => {
      setIsChecking(false);
      // Mock: id 301 is sold out for demonstration
      setAvailability(category.id === 301 ? 'sold_out' : 'available');
    }, 1500);
  };

  return (
    <motion.div 
      initial={{ opacity: 0, x: -10 }}
      whileInView={{ opacity: 1, x: 0 }}
      viewport={{ once: true }}
      whileHover={{ scale: 1.005 }}
      className={`bg-white border rounded-2xl overflow-hidden shadow-sm transition-all flex flex-col md:flex-row ${
      availability === 'sold_out' ? 'opacity-75 grayscale-[0.5]' : 'hover:shadow-md'
    } ${selectedQuantity > 0 ? 'border-primary-500 ring-1 ring-primary-500' : 'border-gray-200'}`}>
      
      {/* Room Image */}
      <div className="w-full md:w-1/3 h-48 md:h-auto overflow-hidden relative">
        <img 
          src={category.imageUrls[0]} 
          alt={category.categoryName} 
          className="w-full h-full object-cover"
        />
        {availability === 'sold_out' && (
          <div className="absolute inset-0 bg-black/60 flex items-center justify-center">
            <span className="text-white font-bold text-lg uppercase tracking-widest">Sold Out</span>
          </div>
        )}
      </div>

      {/* Room Details */}
      <div className="p-6 flex-grow flex flex-col justify-between">
        <div>
          <div className="flex justify-between items-start mb-2">
            <div>
              <h3 className="text-xl font-bold text-gray-900">{category.categoryName}</h3>
              <p className="text-xs text-gray-500 mt-1 uppercase tracking-wider font-semibold">{category.bedType}</p>
            </div>
            <div className="text-right">
              <span className="text-2xl font-bold text-primary-600">₹{category.basePrice.toLocaleString()}</span>
              <p className="text-xs text-gray-500">per night</p>
            </div>
          </div>
          
          <p className="text-gray-600 text-sm mb-4 line-clamp-2">{category.description}</p>
          
          <div className="flex flex-wrap gap-2 mb-6">
            <span className="bg-gray-100 text-gray-700 text-xs px-2 py-1 rounded-md font-medium flex items-center">
              Max {category.maxOccupancy} Guests
            </span>
            {category.amenities.map(amenity => (
              <span key={amenity} className="bg-blue-50 text-blue-700 text-xs px-2 py-1 rounded-md font-medium">
                {amenity}
              </span>
            ))}
          </div>
        </div>

        <div className="flex flex-col sm:flex-row items-center gap-4">
          {availability === 'unknown' ? (
            <button 
              onClick={handleCheckAvailability}
              disabled={isChecking}
              className="w-full sm:w-auto bg-gray-900 text-white px-6 py-2.5 rounded-xl font-bold hover:bg-gray-800 transition-all disabled:opacity-50 flex items-center justify-center"
            >
              {isChecking ? (
                <>
                  <svg className="animate-spin -ml-1 mr-3 h-5 w-5 text-white" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24">
                    <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle>
                    <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
                  </svg>
                  Checking...
                </>
              ) : 'Check Availability'}
            </button>
          ) : availability === 'available' ? (
            <div className="flex items-center w-full justify-between sm:justify-start gap-4">
              <div className="flex items-center bg-gray-100 rounded-xl p-1">
                <button 
                  onClick={() => onQuantityChange(category.id, Math.max(0, selectedQuantity - 1))}
                  className="w-10 h-10 flex items-center justify-center text-gray-600 hover:bg-white hover:shadow-sm rounded-lg transition-all"
                >
                  -
                </button>
                <span className="w-12 text-center font-bold text-gray-900">{selectedQuantity}</span>
                <button 
                  onClick={() => onQuantityChange(category.id, selectedQuantity + 1)}
                  className="w-10 h-10 flex items-center justify-center text-gray-600 hover:bg-white hover:shadow-sm rounded-lg transition-all"
                >
                  +
                </button>
              </div>
              <span className="text-green-600 font-bold text-sm flex items-center">
                <svg className="h-4 w-4 mr-1" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
                </svg>
                Available
              </span>
            </div>
          ) : (
            <span className="text-red-600 font-bold flex items-center py-2">
              <svg className="h-5 w-5 mr-1" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
              </svg>
              Not available for selected dates
            </span>
          )}
        </div>
      </div>
    </motion.div>
  );
};

export default RoomCategoryCard;
