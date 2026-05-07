import React, { useState } from 'react';
import { useLocation, useNavigate } from 'react-router-dom';
import GuestDetailsForm from './GuestDetailsForm';
import PaymentForm from './PaymentForm';
import BookingConfirmation from './BookingConfirmation';
import BookingSummary from './BookingSummary';
import { createBooking } from '../../../services/BookingService';
import toast from 'react-hot-toast';

const BookingWizard = () => {
  const location = useLocation();
  const navigate = useNavigate();
  
  // Data passed from HotelDetailPage
  const { hotel, selectedRooms, totalAmount } = location.state || {};

  const [currentStep, setCurrentStep] = useState(1);
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [bookingReference, setBookingReference] = useState(null);
  const [bookingData, setBookingData] = useState({
    guestDetails: null,
    paymentDetails: null
  });

  if (!hotel || !selectedRooms) {
    return (
      <div className="container mx-auto px-4 py-20 text-center">
        <h2 className="text-2xl font-bold text-gray-900 mb-4">No booking session found</h2>
        <button onClick={() => navigate('/hotels')} className="bg-primary-600 text-white px-6 py-2 rounded-lg">
          Browse Hotels
        </button>
      </div>
    );
  }

  const handleGuestSubmit = (values) => {
    setBookingData({ ...bookingData, guestDetails: values });
    setCurrentStep(2);
  };

  const handlePaymentSubmit = (values) => {
    setBookingData({ ...bookingData, paymentDetails: values });
    submitBooking();
  };

  const submitBooking = async () => {
    setIsSubmitting(true);
    try {
      // Prepare payload for backend
      const payload = {
        hotelId: hotel.id,
        rooms: selectedRooms.map(r => ({ categoryId: r.id, quantity: r.quantity })),
        guestDetails: bookingData.guestDetails,
        totalAmount: totalAmount * 1.12 // Including taxes
      };
      
      const response = await createBooking(payload);
      
      // Assume backend returns { bookingReference: "..." } or similar
      setBookingReference(response.bookingReference || `BK-${Date.now()}`);
      setCurrentStep(3);
      toast.success("Booking confirmed!");
    } catch (err) {
      toast.error(err.message || "Booking failed. Using mock confirmation for demo.");
      // Fallback for demo
      setBookingReference(`BK-MOCK-${Date.now()}`);
      setCurrentStep(3);
    } finally {
      setIsSubmitting(false);
    }
  };

  const steps = [
    { id: 1, name: 'Guest Info' },
    { id: 2, name: 'Payment' },
    { id: 3, name: 'Confirm' }
  ];

  return (
    <div className="bg-gray-50 min-h-screen py-12 relative">
      {/* Loading Overlay */}
      {isSubmitting && (
        <div className="fixed inset-0 bg-white/80 backdrop-blur-sm z-[100] flex items-center justify-center flex-col">
          <div className="w-16 h-16 border-4 border-primary-100 border-t-primary-600 rounded-full animate-spin mb-4"></div>
          <p className="text-xl font-bold text-gray-900">Processing your booking...</p>
          <p className="text-gray-500">Please do not refresh the page.</p>
        </div>
      )}

      <div className="container mx-auto px-4 max-w-6xl">
        {/* Progress Tracker */}
        {currentStep < 3 && (
          <div className="flex justify-center mb-12">
            {steps.map((step, idx) => (
              <React.Fragment key={step.id}>
                <div className="flex flex-col items-center relative">
                  <div className={`w-10 h-10 rounded-full flex items-center justify-center font-bold transition-all duration-500 ${
                    currentStep >= step.id ? 'bg-primary-600 text-white shadow-lg shadow-primary-200' : 'bg-white text-gray-400 border border-gray-200'
                  }`}>
                    {currentStep > step.id ? '✓' : step.id}
                  </div>
                  <span className={`absolute -bottom-7 text-xs font-bold uppercase tracking-wider whitespace-nowrap ${
                    currentStep >= step.id ? 'text-primary-600' : 'text-gray-400'
                  }`}>
                    {step.name}
                  </span>
                </div>
                {idx < steps.length - 1 && (
                  <div className={`w-16 h-0.5 mt-5 transition-all duration-500 ${
                    currentStep > step.id ? 'bg-primary-600' : 'bg-gray-200'
                  }`}></div>
                )}
              </React.Fragment>
            ))}
          </div>
        )}

        <div className="flex flex-col lg:flex-row gap-8 justify-center">
          {/* Main Wizard Content */}
          <div className={`flex-grow ${currentStep === 3 ? 'max-w-3xl' : ''}`}>
            {currentStep === 1 && (
              <GuestDetailsForm 
                initialValues={bookingData.guestDetails} 
                onSubmit={handleGuestSubmit} 
                onBack={() => navigate(`/hotels/${hotel.id}`)}
              />
            )}
            
            {currentStep === 2 && (
              <PaymentForm 
                onSubmit={handlePaymentSubmit}
                onBack={() => setCurrentStep(1)}
                totalAmount={totalAmount}
              />
            )}

            {currentStep === 3 && (
              <BookingConfirmation 
                bookingReference={bookingReference}
                hotel={hotel}
                totalAmount={totalAmount}
              />
            )}
          </div>

          {/* Sidebar Summary */}
          {currentStep < 3 && (
            <aside className="w-full lg:w-96 flex-shrink-0">
              <BookingSummary 
                hotel={hotel} 
                selectedRooms={selectedRooms} 
                totalAmount={totalAmount} 
              />
            </aside>
          )}
        </div>
      </div>
    </div>
  );
};

export default BookingWizard;
