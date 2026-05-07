import React from 'react';

const BookingHistory = ({ bookings, onCancelClick }) => {
  const getStatusStyle = (status) => {
    switch (status) {
      case 'CONFIRMED': return 'bg-green-100 text-green-700 border-green-200';
      case 'CANCELLED': return 'bg-red-100 text-red-700 border-red-200';
      case 'COMPLETED': return 'bg-blue-100 text-blue-700 border-blue-200';
      default: return 'bg-gray-100 text-gray-700 border-gray-200';
    }
  };

  return (
    <div className="space-y-6">
      {bookings.length === 0 ? (
        <div className="bg-white rounded-3xl p-12 text-center border border-dashed border-gray-300">
          <p className="text-gray-500">No bookings found.</p>
        </div>
      ) : (
        bookings.map((booking) => (
          <div key={booking.id} className="bg-white rounded-3xl p-6 shadow-sm border border-gray-100 flex flex-col md:flex-row gap-6 hover:shadow-md transition-shadow">
            {/* Hotel Image */}
            <div className="w-full md:w-48 h-40 flex-shrink-0">
              <img 
                src={booking.imageUrl} 
                alt={booking.hotelName} 
                className="w-full h-full object-cover rounded-2xl"
              />
            </div>

            {/* Booking Details */}
            <div className="flex-grow">
              <div className="flex justify-between items-start mb-4">
                <div>
                  <div className={`inline-block px-3 py-1 rounded-full text-xs font-bold border mb-2 ${getStatusStyle(booking.status)}`}>
                    {booking.status}
                  </div>
                  <h3 className="text-xl font-bold text-gray-900">{booking.hotelName}</h3>
                  <p className="text-gray-500 text-sm">{booking.city}</p>
                </div>
                <div className="text-right">
                  <p className="text-xs text-gray-400 font-bold uppercase tracking-wider">Ref ID</p>
                  <p className="text-sm font-mono font-bold text-gray-900">{booking.bookingReference}</p>
                </div>
              </div>

              <div className="grid grid-cols-2 sm:grid-cols-4 gap-4 mb-6">
                <div>
                  <p className="text-xs text-gray-400 font-bold uppercase tracking-wider">Check In</p>
                  <p className="text-sm font-bold text-gray-900">{new Date(booking.checkIn).toLocaleDateString()}</p>
                </div>
                <div>
                  <p className="text-xs text-gray-400 font-bold uppercase tracking-wider">Check Out</p>
                  <p className="text-sm font-bold text-gray-900">{new Date(booking.checkOut).toLocaleDateString()}</p>
                </div>
                <div>
                  <p className="text-xs text-gray-400 font-bold uppercase tracking-wider">Rooms</p>
                  <p className="text-sm font-bold text-gray-900">
                    {booking.rooms.map(r => `${r.quantity}x ${r.categoryName}`).join(', ')}
                  </p>
                </div>
                <div>
                  <p className="text-xs text-gray-400 font-bold uppercase tracking-wider">Paid Amount</p>
                  <p className="text-sm font-bold text-primary-600">₹{booking.totalAmount.toLocaleString()}</p>
                </div>
              </div>

              {booking.status === 'CONFIRMED' && (
                <div className="flex justify-end border-t border-gray-50 pt-4">
                  <button 
                    onClick={() => onCancelClick(booking)}
                    className="text-red-600 text-sm font-bold hover:bg-red-50 px-4 py-2 rounded-lg transition-colors"
                  >
                    Cancel Booking
                  </button>
                </div>
              )}
            </div>
          </div>
        ))
      )}
    </div>
  );
};

export default BookingHistory;
