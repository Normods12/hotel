import React from 'react';
import { Link } from 'react-router-dom';

const BookingConfirmation = ({ bookingReference, hotel, totalAmount }) => {
  return (
    <div className="bg-white rounded-3xl p-12 shadow-sm border border-gray-100 text-center animate-in fade-in zoom-in duration-700">
      <div className="w-20 h-20 bg-green-100 text-green-600 rounded-full flex items-center justify-center mx-auto mb-8">
        <svg className="h-10 w-10" fill="none" viewBox="0 0 24 24" stroke="currentColor">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={3} d="M5 13l4 4L19 7" />
        </svg>
      </div>
      
      <h2 className="text-4xl font-extrabold text-gray-900 mb-2">Booking Confirmed!</h2>
      <p className="text-gray-500 text-lg mb-8">Your reservation has been successfully placed.</p>
      
      <div className="bg-gray-50 rounded-2xl p-6 mb-10 inline-block text-left border border-gray-100">
        <div className="space-y-3">
          <div className="flex justify-between gap-12">
            <span className="text-gray-500 text-sm uppercase font-bold tracking-wider">Booking ID</span>
            <span className="text-gray-900 font-mono font-bold tracking-tight">{bookingReference}</span>
          </div>
          <div className="flex justify-between gap-12">
            <span className="text-gray-500 text-sm uppercase font-bold tracking-wider">Property</span>
            <span className="text-gray-900 font-bold">{hotel.name}</span>
          </div>
          <div className="flex justify-between gap-12">
            <span className="text-gray-500 text-sm uppercase font-bold tracking-wider">Amount Paid</span>
            <span className="text-primary-600 font-bold">₹{(totalAmount * 1.12).toLocaleString()}</span>
          </div>
        </div>
      </div>

      <div className="flex flex-col sm:flex-row justify-center gap-4">
        <Link 
          to="/dashboard" 
          className="bg-gray-900 text-white px-8 py-3 rounded-xl font-bold hover:bg-gray-800 transition-all shadow-lg active:scale-95"
        >
          View My Bookings
        </Link>
        <Link 
          to="/" 
          className="bg-white text-gray-900 border border-gray-200 px-8 py-3 rounded-xl font-bold hover:bg-gray-50 transition-all active:scale-95"
        >
          Back to Home
        </Link>
      </div>

      <p className="mt-12 text-gray-400 text-sm">
        A confirmation email has been sent to your registered email address.
      </p>
    </div>
  );
};

export default BookingConfirmation;
