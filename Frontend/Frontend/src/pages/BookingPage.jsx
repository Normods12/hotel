import React from 'react';
import BookingWizard from '../features/bookings/components/BookingWizard';

const BookingPage = () => {
  return (
    <div className="bg-gray-50 min-h-screen">
      <div className="bg-white border-b border-gray-200 py-6">
        <div className="container mx-auto px-4">
          <h1 className="text-2xl font-extrabold text-gray-900 tracking-tight">Complete Your Booking</h1>
        </div>
      </div>
      <BookingWizard />
    </div>
  );
};

export default BookingPage;
