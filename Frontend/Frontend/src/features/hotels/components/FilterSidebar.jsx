import React from 'react';

const FilterSidebar = ({ filters, onFilterChange }) => {
  const handleRatingChange = (rating) => {
    const newRatings = filters.ratings.includes(rating)
      ? filters.ratings.filter(r => r !== rating)
      : [...filters.ratings, rating];
    onFilterChange('ratings', newRatings);
  };

  const amenities = ['WiFi', 'Pool', 'Gym', 'Parking', 'Spa', 'Restaurant'];

  const handleAmenityChange = (amenity) => {
    const newAmenities = filters.amenities.includes(amenity)
      ? filters.amenities.filter(a => a !== amenity)
      : [...filters.amenities, amenity];
    onFilterChange('amenities', newAmenities);
  };

  return (
    <div className="bg-white p-6 rounded-2xl shadow-sm border border-gray-100 sticky top-24">
      <div className="flex justify-between items-center mb-6">
        <h3 className="text-lg font-bold text-gray-900">Filters</h3>
        <button 
          onClick={() => onFilterChange('clear', null)}
          className="text-primary-600 text-sm font-semibold hover:underline"
        >
          Clear All
        </button>
      </div>

      {/* Price Range */}
      <div className="mb-8">
        <h4 className="text-sm font-bold text-gray-400 uppercase tracking-wider mb-4">Price Range (per night)</h4>
        <div className="space-y-4">
          <input 
            type="range" 
            min="0" 
            max="20000" 
            step="500"
            className="w-full h-2 bg-gray-200 rounded-lg appearance-none cursor-pointer accent-primary-600"
            value={filters.maxPrice}
            onChange={(e) => onFilterChange('maxPrice', e.target.value)}
          />
          <div className="flex justify-between text-sm font-medium text-gray-600">
            <span>₹0</span>
            <span>Up to ₹{Number(filters.maxPrice).toLocaleString()}</span>
          </div>
        </div>
      </div>

      {/* Star Rating */}
      <div className="mb-8">
        <h4 className="text-sm font-bold text-gray-400 uppercase tracking-wider mb-4">Star Rating</h4>
        <div className="space-y-3">
          {[5, 4, 3, 2].map((rating) => (
            <label key={rating} className="flex items-center group cursor-pointer">
              <div className="relative flex items-center">
                <input 
                  type="checkbox" 
                  className="peer h-5 w-5 cursor-pointer appearance-none rounded border border-gray-300 checked:bg-primary-600 checked:border-primary-600 transition-all"
                  checked={filters.ratings.includes(rating)}
                  onChange={() => handleRatingChange(rating)}
                />
                <svg xmlns="http://www.w3.org/2000/svg" className="absolute h-3.5 w-3.5 text-white opacity-0 peer-checked:opacity-100 top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 pointer-events-none" viewBox="0 0 20 20" fill="currentColor">
                  <path fillRule="evenodd" d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z" clipRule="evenodd" />
                </svg>
              </div>
              <span className="ml-3 text-gray-700 group-hover:text-primary-600 transition-colors flex items-center">
                {rating} Stars
                <div className="flex ml-2">
                  {[...Array(rating)].map((_, i) => (
                    <svg key={i} className="h-3 w-3 text-yellow-400 fill-current" viewBox="0 0 20 20"><path d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.07 3.292a1 1 0 00.95.69h3.462c.969 0 1.371 1.24.588 1.81l-2.8 2.034a1 1 0 00-.364 1.118l1.07 3.292c.3.921-.755 1.688-1.54 1.118l-2.8-2.034a1 1 0 00-1.175 0l-2.8 2.034c-.784.57-1.838-.197-1.539-1.118l1.07-3.292a1 1 0 00-.364-1.118L2.98 8.72c-.783-.57-.38-1.81.588-1.81h3.461a1 1 0 00.951-.69l1.07-3.292z" /></svg>
                  ))}
                </div>
              </span>
            </label>
          ))}
        </div>
      </div>

      {/* Amenities */}
      <div>
        <h4 className="text-sm font-bold text-gray-400 uppercase tracking-wider mb-4">Amenities</h4>
        <div className="space-y-3">
          {amenities.map((amenity) => (
            <label key={amenity} className="flex items-center group cursor-pointer">
              <div className="relative flex items-center">
                <input 
                  type="checkbox" 
                  className="peer h-5 w-5 cursor-pointer appearance-none rounded border border-gray-300 checked:bg-primary-600 checked:border-primary-600 transition-all"
                  checked={filters.amenities.includes(amenity)}
                  onChange={() => handleAmenityChange(amenity)}
                />
                <svg xmlns="http://www.w3.org/2000/svg" className="absolute h-3.5 w-3.5 text-white opacity-0 peer-checked:opacity-100 top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 pointer-events-none" viewBox="0 0 20 20" fill="currentColor">
                  <path fillRule="evenodd" d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z" clipRule="evenodd" />
                </svg>
              </div>
              <span className="ml-3 text-gray-700 group-hover:text-primary-600 transition-colors">{amenity}</span>
            </label>
          ))}
        </div>
      </div>
    </div>
  );
};

export default FilterSidebar;
