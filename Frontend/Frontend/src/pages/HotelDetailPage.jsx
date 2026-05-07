import React, { useEffect, useState } from 'react';
import { useParams, Link, useNavigate } from 'react-router-dom';
import { getHotelById } from '../services/HotelService';
import RoomCategoryCard from '../features/hotels/components/RoomCategoryCard';
import toast from 'react-hot-toast';

const HotelDetailPage = () => {
  const { id } = useParams();
  const navigate = useNavigate();
  const [hotel, setHotel] = useState(null);
  const [loading, setLoading] = useState(true);
  const [selections, setSelections] = useState({});

  useEffect(() => {
    const fetchHotel = async () => {
      setLoading(true);
      try {
        const data = await getHotelById(id);
        setHotel(data);
      } catch (err) {
        toast.error("Property not found.");
      } finally {
        setLoading(false);
      }
    };

    fetchHotel();
  }, [id]);

  const handleQuantityChange = (categoryId, quantity) => {
    setSelections(prev => ({ ...prev, [categoryId]: quantity }));
  };

  const selectedRoomsList = hotel?.roomCategories
    ?.filter(cat => selections[cat.id] > 0)
    .map(cat => ({ ...cat, quantity: selections[cat.id] })) || [];

  const totalAmount = selectedRoomsList.reduce((acc, curr) => acc + (curr.basePrice * curr.quantity), 0);
  const totalRooms = selectedRoomsList.reduce((acc, curr) => acc + curr.quantity, 0);

  if (loading) {
    return (
      <div className="container mx-auto px-4 py-20 text-center">
        <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-primary-600 mx-auto mb-4"></div>
        <p className="text-gray-500">Loading hotel details...</p>
      </div>
    );
  }

  if (!hotel) {
    return (
      <div className="container mx-auto px-4 py-20 text-center">
        <h2 className="text-2xl font-bold text-gray-900 mb-4">Hotel Not Found</h2>
        <Link to="/hotels" className="text-primary-600 hover:underline">Return to Listings</Link>
      </div>
    );
  }

  return (
    <div className="bg-gray-50 min-h-screen pb-32">
      <div className="bg-white border-b border-gray-200 pt-6 pb-2">
        <div className="container mx-auto px-4">
          <nav className="flex text-sm text-gray-500 mb-4">
            <Link to="/" className="hover:text-primary-600">Home</Link>
            <span className="mx-2">/</span>
            <Link to="/hotels" className="hover:text-primary-600">Hotels</Link>
            <span className="mx-2">/</span>
            <span className="text-gray-900 font-medium">{hotel.name}</span>
          </nav>
        </div>
      </div>

      <div className="container mx-auto px-4 py-8">
        <div className="flex flex-col lg:flex-row gap-8">
          <div className="lg:w-2/3">
            <div className="rounded-3xl overflow-hidden shadow-lg mb-8 relative h-[400px]">
              <img src={hotel.imageUrl} alt={hotel.name} className="w-full h-full object-cover" />
              <div className="absolute bottom-6 left-6 right-6 p-6 bg-gradient-to-t from-black/80 to-transparent text-white rounded-2xl">
                <h1 className="text-3xl font-extrabold mb-1">{hotel.name}</h1>
                <p className="text-white/80 flex items-center">
                  <svg className="h-5 w-5 mr-1" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17.657 16.657L13.414 20.9a1.998 1.998 0 01-2.827 0l-4.244-4.243a8 8 0 1111.314 0z" />
                  </svg>
                  {hotel.address}
                </p>
              </div>
            </div>

            <div className="bg-white rounded-3xl p-8 shadow-sm border border-gray-100 mb-8">
              <h2 className="text-2xl font-bold text-gray-900 mb-4">About the Property</h2>
              <p className="text-gray-600 leading-relaxed mb-6">{hotel.description}</p>
            </div>

            <div id="rooms">
              <h2 className="text-2xl font-bold text-gray-900 mb-6">Choose Your Room</h2>
              <div className="space-y-6">
                {hotel.roomCategories?.map(category => (
                  <RoomCategoryCard 
                    key={category.id} 
                    category={category} 
                    selectedQuantity={selections[category.id] || 0}
                    onQuantityChange={handleQuantityChange}
                  />
                ))}
              </div>
            </div>
          </div>

          <div className="lg:w-1/3">
            <div className="sticky top-24">
              <div className="bg-white rounded-3xl p-6 shadow-sm border border-gray-100">
                <h3 className="text-lg font-bold text-gray-900 mb-4">Location</h3>
                <div className="bg-gray-100 rounded-2xl h-48 mb-4 flex items-center justify-center text-gray-400">
                  Map Placeholder
                </div>
                <p className="text-sm text-gray-600">{hotel.address}</p>
              </div>
            </div>
          </div>
        </div>
      </div>

      {totalRooms > 0 && (
        <div className="fixed bottom-8 left-1/2 -translate-x-1/2 w-[95%] max-w-4xl bg-gray-900 text-white rounded-2xl shadow-2xl p-4 flex items-center justify-between z-50">
          <div className="flex items-center space-x-6 px-4">
            <div>
              <p className="text-gray-400 text-xs uppercase font-bold tracking-widest">Total Selection</p>
              <p className="text-lg font-bold">{totalRooms} Rooms</p>
            </div>
            <div className="h-8 w-px bg-gray-700"></div>
            <div>
              <p className="text-gray-400 text-xs uppercase font-bold tracking-widest">Total Price</p>
              <p className="text-xl font-bold text-primary-400">₹{totalAmount.toLocaleString()}</p>
            </div>
          </div>
          <button 
            onClick={() => navigate('/booking/steps', { state: { hotel, selectedRooms: selectedRoomsList, totalAmount } })}
            className="bg-primary-600 text-white px-8 py-3 rounded-xl font-bold hover:bg-primary-700 transition-all shadow-lg active:scale-95"
          >
            Reserve Now
          </button>
        </div>
      )}
    </div>
  );
};

export default HotelDetailPage;
