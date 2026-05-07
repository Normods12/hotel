import React from 'react';
import HotelCard from '../features/hotels/components/HotelCard';
import { MOCK_HOTELS } from '../features/hotels/data/mockHotels';

const HotelListPage = () => {
  return (
    <div className="bg-gray-50 min-h-screen pb-20">
      {/* Header Section */}
      <div className="bg-white border-b border-gray-200 pt-12 pb-16">
        <div className="container mx-auto px-4">
          <h1 className="text-4xl font-extrabold text-gray-900 mb-4">Discover Extraordinary Hotels</h1>
          <p className="text-lg text-gray-600 max-w-2xl">
            From luxury palaces to cozy mountain retreats, find the perfect stay for your next adventure.
          </p>
        </div>
      </div>

      {/* Main Content */}
      <div className="container mx-auto px-4 -mt-8">
        {/* Results Info */}
        <div className="flex justify-between items-center mb-8 bg-white p-4 rounded-xl shadow-sm border border-gray-100">
          <p className="text-gray-700">
            Showing <span className="font-bold">{MOCK_HOTELS.length}</span> hotels
          </p>
          <div className="flex space-x-4">
            <select className="bg-gray-50 border border-gray-200 rounded-lg px-4 py-2 text-sm font-medium focus:outline-none focus:ring-2 focus:ring-primary-500">
              <option>Sort by: Recommended</option>
              <option>Price: Low to High</option>
              <option>Price: High to Low</option>
              <option>Rating: High to Low</option>
            </select>
          </div>
        </div>

        {/* Hotel Grid */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-8">
          {MOCK_HOTELS.map((hotel) => (
            <HotelCard key={hotel.id} hotel={hotel} />
          ))}
        </div>
      </div>
    </div>
  );
};

export default HotelListPage;
