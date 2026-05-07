import React from 'react';

const BookingSummary = ({ hotel, selectedRooms, totalAmount }) => {
  return (
    <div className="bg-white rounded-3xl p-6 shadow-sm border border-gray-100">
      <h3 className="text-xl font-bold text-gray-900 mb-6">Booking Summary</h3>
      
      {/* Hotel Info */}
      <div className="flex items-center space-x-4 mb-6 pb-6 border-b border-gray-100">
        <img 
          src={hotel.imageUrl} 
          alt={hotel.name} 
          className="w-20 h-20 rounded-xl object-cover"
        />
        <div>
          <h4 className="font-bold text-gray-900">{hotel.name}</h4>
          <p className="text-sm text-gray-500">{hotel.city}</p>
          <div className="flex mt-1">
            {[...Array(hotel.starRating)].map((_, i) => (
              <svg key={i} className="h-3 w-3 text-yellow-400 fill-current" viewBox="0 0 20 20"><path d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.07 3.292a1 1 0 00.95.69h3.462c.969 0 1.371 1.24.588 1.81l-2.8 2.034a1 1 0 00-.364 1.118l1.07 3.292c.3.921-.755 1.688-1.54 1.118l-2.8-2.034a1 1 0 00-1.175 0l-2.8 2.034c-.784.57-1.838-.197-1.539-1.118l1.07-3.292a1 1 0 00-.364-1.118L2.98 8.72c-.783-.57-.38-1.81.588-1.81h3.461a1 1 0 00.951-.69l1.07-3.292z" /></svg>
            ))}
          </div>
        </div>
      </div>

      {/* Selected Rooms */}
      <div className="space-y-4 mb-6">
        {selectedRooms.map((room) => (
          <div key={room.id} className="flex justify-between text-sm">
            <span className="text-gray-600">
              <span className="font-bold text-gray-900">{room.quantity}x</span> {room.categoryName}
            </span>
            <span className="font-bold text-gray-900">₹{(room.basePrice * room.quantity).toLocaleString()}</span>
          </div>
        ))}
      </div>

      {/* Total */}
      <div className="pt-6 border-t border-gray-100">
        <div className="flex justify-between items-center mb-1">
          <span className="text-gray-500 font-medium">Subtotal</span>
          <span className="font-bold text-gray-900">₹{totalAmount.toLocaleString()}</span>
        </div>
        <div className="flex justify-between items-center mb-4">
          <span className="text-gray-500 font-medium">Taxes & Fees (12%)</span>
          <span className="font-bold text-gray-900">₹{(totalAmount * 0.12).toLocaleString()}</span>
        </div>
        <div className="flex justify-between items-center bg-primary-50 p-4 rounded-2xl">
          <span className="text-primary-900 font-bold text-lg">Total</span>
          <span className="text-primary-600 font-extrabold text-2xl">₹{(totalAmount * 1.12).toLocaleString()}</span>
        </div>
      </div>
    </div>
  );
};

export default BookingSummary;
