import React, { useContext, useEffect, useState } from "react";
import { AuthContext } from "../context/authContext";
import BookingHistory from "../features/bookings/components/BookingHistory";
import CancelModal from "../features/bookings/components/CancelModal";
import { getMyBookings, cancelBooking } from "../services/BookingService";
import toast from 'react-hot-toast';

const DashBoard = () => {
  const { user } = useContext(AuthContext);
  const [bookings, setBookings] = useState([]);
  const [loading, setLoading] = useState(true);
  const [selectedBooking, setSelectedBooking] = useState(null);

  useEffect(() => {
    const fetchBookings = async () => {
      setLoading(true);
      try {
        const data = await getMyBookings();
        setBookings(data);
      } catch (err) {
        toast.error("Failed to load your bookings. Showing mock data.");
        // Fallback
        import('../features/bookings/data/mockBookings').then(module => {
          setBookings(module.MOCK_BOOKINGS);
        });
      } finally {
        setLoading(false);
      }
    };

    fetchBookings();
  }, []);

  const handleCancelConfirm = async (id) => {
    try {
      await cancelBooking(id);
      setBookings(prev => prev.map(b => 
        b.id === id ? { ...b, status: 'CANCELLED' } : b
      ));
      toast.success("Booking cancelled successfully!");
    } catch (err) {
      toast.error(err.message || "Cancellation failed.");
    } finally {
      setSelectedBooking(null);
    }
  };

  const activeBookings = bookings.filter(b => b.status === 'CONFIRMED' || b.status === 'PENDING');
  const pastBookings = bookings.filter(b => b.status === 'COMPLETED' || b.status === 'CANCELLED');

  return (
    <div className="bg-gray-50 min-h-screen py-12">
      <div className="container mx-auto px-4 max-w-5xl">
        {/* Profile Header */}
        <div className="bg-white rounded-3xl p-8 shadow-sm border border-gray-100 mb-12 flex flex-col md:flex-row items-center gap-8">
          <div className="w-24 h-24 bg-primary-100 text-primary-600 rounded-full flex items-center justify-center text-3xl font-bold border-4 border-white shadow-md">
            {user?.firstName?.[0] || user?.email?.[0]?.toUpperCase() || 'U'}
          </div>
          <div className="text-center md:text-left flex-grow">
            <h1 className="text-3xl font-extrabold text-gray-900 mb-1">
              Hello, {user?.firstName || 'Traveler'}!
            </h1>
            <p className="text-gray-500 font-medium">{user?.email}</p>
          </div>
          <div className="flex gap-4">
            <div className="bg-gray-50 px-6 py-3 rounded-2xl text-center border border-gray-100">
              <p className="text-2xl font-bold text-gray-900">{loading ? '...' : activeBookings.length}</p>
              <p className="text-xs text-gray-400 font-bold uppercase tracking-widest">Active</p>
            </div>
            <div className="bg-gray-50 px-6 py-3 rounded-2xl text-center border border-gray-100">
              <p className="text-2xl font-bold text-gray-900">{loading ? '...' : bookings.length}</p>
              <p className="text-xs text-gray-400 font-bold uppercase tracking-widest">Total</p>
            </div>
          </div>
        </div>

        {/* Bookings Sections */}
        {loading ? (
          <div className="space-y-8">
            <div className="h-64 bg-white rounded-3xl animate-pulse"></div>
            <div className="h-64 bg-white rounded-3xl animate-pulse"></div>
          </div>
        ) : (
          <div className="space-y-12">
            <section>
              <div className="flex items-center space-x-4 mb-6">
                <h2 className="text-2xl font-bold text-gray-900">Upcoming Trips</h2>
                <div className="flex-grow h-px bg-gray-200"></div>
              </div>
              <BookingHistory 
                bookings={activeBookings} 
                onCancelClick={(b) => setSelectedBooking(b)} 
              />
            </section>

            <section>
              <div className="flex items-center space-x-4 mb-6">
                <h2 className="text-2xl font-bold text-gray-900">Past & Cancelled</h2>
                <div className="flex-grow h-px bg-gray-200"></div>
              </div>
              <BookingHistory 
                bookings={pastBookings} 
                onCancelClick={() => {}} 
              />
            </section>
          </div>
        )}
      </div>

      <CancelModal 
        booking={selectedBooking} 
        onConfirm={handleCancelConfirm} 
        onCancel={() => setSelectedBooking(null)} 
      />
    </div>
  );
};

export default DashBoard;