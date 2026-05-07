import React from 'react';

const CancelModal = ({ booking, onConfirm, onCancel }) => {
  if (!booking) return null;

  return (
    <div className="fixed inset-0 bg-black/60 backdrop-blur-sm z-[100] flex items-center justify-center p-4">
      <div className="bg-white rounded-3xl p-8 max-w-md w-full shadow-2xl animate-in fade-in zoom-in duration-300">
        <div className="w-16 h-16 bg-red-100 text-red-600 rounded-full flex items-center justify-center mb-6">
          <svg className="h-8 w-8" fill="none" viewBox="0 0 24 24" stroke="currentColor">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 9v2m0 4h.01m-6.938 4h13.856c1.54 0 2.502-1.667 1.732-3L13.732 4c-.77-1.333-2.694-1.333-3.464 0L3.34 16c-.77 1.333.192 3 1.732 3z" />
          </svg>
        </div>
        
        <h3 className="text-2xl font-bold text-gray-900 mb-2">Cancel Booking?</h3>
        <p className="text-gray-500 mb-6">
          Are you sure you want to cancel your booking for <span className="font-bold text-gray-900">{booking.hotelName}</span>? This action cannot be undone.
        </p>

        <div className="flex flex-col space-y-3">
          <button 
            onClick={() => onConfirm(booking.id)}
            className="w-full bg-red-600 text-white py-3 rounded-xl font-bold hover:bg-red-700 transition-all active:scale-95 shadow-lg shadow-red-100"
          >
            Yes, Cancel Booking
          </button>
          <button 
            onClick={onCancel}
            className="w-full bg-gray-100 text-gray-700 py-3 rounded-xl font-bold hover:bg-gray-200 transition-all"
          >
            No, Keep it
          </button>
        </div>
      </div>
    </div>
  );
};

export default CancelModal;
