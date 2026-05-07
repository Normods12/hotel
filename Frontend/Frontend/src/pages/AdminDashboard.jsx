import React, { useEffect, useState } from 'react';
import HotelTable from '../features/admin/components/HotelTable';
import AddHotelModal from '../features/admin/components/AddHotelModal';
import { getAllHotels, addHotel, updateHotel, deleteHotel } from '../services/HotelService';
import toast from 'react-hot-toast';

const AdminDashboard = () => {
  const [hotels, setHotels] = useState([]);
  const [loading, setLoading] = useState(true);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [editingHotel, setEditingHotel] = useState(null);

  useEffect(() => {
    fetchHotels();
  }, []);

  const fetchHotels = async () => {
    setLoading(true);
    try {
      const data = await getAllHotels();
      setHotels(data);
    } catch (err) {
      toast.error("Failed to load properties. Using mock data for demo.");
      // Fallback
      import('../features/hotels/data/mockHotels').then(module => setHotels(module.MOCK_HOTELS));
    } finally {
      setLoading(false);
    }
  };

  const handleCreateOrUpdate = async (values) => {
    try {
      if (editingHotel) {
        await updateHotel(editingHotel.id, values);
        toast.success("Property updated successfully!");
      } else {
        await addHotel(values);
        toast.success("New property added!");
      }
      setIsModalOpen(false);
      setEditingHotel(null);
      fetchHotels();
    } catch (err) {
      toast.error(err.message || "Action failed.");
    }
  };

  const handleDelete = async (id) => {
    if (window.confirm("Are you sure you want to delete this property?")) {
      try {
        await deleteHotel(id);
        toast.success("Property deleted.");
        fetchHotels();
      } catch (err) {
        toast.error(err.message || "Delete failed.");
      }
    }
  };

  const openEditModal = (hotel) => {
    setEditingHotel(hotel);
    setIsModalOpen(true);
  };

  return (
    <div className="bg-gray-50 min-h-screen">
      {/* Admin Header */}
      <div className="bg-white border-b border-gray-100 py-8">
        <div className="container mx-auto px-4 flex flex-col md:flex-row justify-between items-center gap-4">
          <div>
            <h1 className="text-3xl font-extrabold text-gray-900 tracking-tight">Admin Dashboard</h1>
            <p className="text-gray-500 font-medium">Manage properties, inventory, and listings.</p>
          </div>
          <button 
            onClick={() => { setEditingHotel(null); setIsModalOpen(true); }}
            className="bg-primary-600 text-white px-8 py-3 rounded-2xl font-bold hover:bg-primary-700 shadow-lg shadow-primary-100 transition-all flex items-center"
          >
            <svg className="h-5 w-5 mr-2" fill="none" viewBox="0 0 24 24" stroke="currentColor">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 6v6m0 0v6m0-6h6m-6 0H6" />
            </svg>
            Add New Hotel
          </button>
        </div>
      </div>

      <div className="container mx-auto px-4 py-10">
        <div className="flex flex-col lg:flex-row gap-10">
          {/* Sidebar Nav */}
          <aside className="w-full lg:w-64 space-y-2">
            <button className="w-full flex items-center space-x-3 px-6 py-4 bg-primary-50 text-primary-600 rounded-2xl font-bold border border-primary-100 transition-all">
              <svg className="h-5 w-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 21V5a2 2 0 00-2-2H7a2 2 0 00-2 2v16m14 0h2m-2 0h-5m-9 0H3m2 0h5M9 7h1m-1 4h1m4-4h1m-1 4h1m-5 10v-5a1 1 0 011-1h2a1 1 0 011 1v5m-4 0h4" />
              </svg>
              <span>Hotels</span>
            </button>
            <button className="w-full flex items-center space-x-3 px-6 py-4 text-gray-500 hover:bg-gray-100 rounded-2xl font-bold transition-all">
              <svg className="h-5 w-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M16 7a4 4 0 11-8 0 4 4 0 018 0zM12 14a7 7 0 00-7 7h14a7 7 0 00-7-7z" />
              </svg>
              <span>Users</span>
            </button>
            <button className="w-full flex items-center space-x-3 px-6 py-4 text-gray-500 hover:bg-gray-100 rounded-2xl font-bold transition-all">
              <svg className="h-5 w-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5H7a2 2 0 00-2 2v12a2 2 0 002 2h10a2 2 0 002-2V7a2 2 0 00-2-2h-2M9 5a2 2 0 002 2h2a2 2 0 002-2M9 5a2 2 0 002-2h2a2 2 0 002 2" />
              </svg>
              <span>Bookings</span>
            </button>
          </aside>

          {/* Main Content */}
          <main className="flex-grow">
            <div className="flex items-center justify-between mb-8">
              <h2 className="text-xl font-bold text-gray-900">Property Inventory</h2>
              <div className="flex items-center space-x-2 text-sm text-gray-500">
                <span className="font-bold text-gray-900">{hotels.length}</span> properties total
              </div>
            </div>

            {loading ? (
              <div className="space-y-4">
                {[...Array(5)].map((_, i) => (
                  <div key={i} className="h-20 bg-white rounded-2xl animate-pulse"></div>
                ))}
              </div>
            ) : (
              <HotelTable 
                hotels={hotels} 
                onEdit={openEditModal} 
                onDelete={handleDelete} 
              />
            )}
          </main>
        </div>
      </div>

      {/* Add/Edit Modal */}
      <AddHotelModal 
        isOpen={isModalOpen} 
        hotel={editingHotel} 
        onClose={() => setIsModalOpen(false)} 
        onSubmit={handleCreateOrUpdate}
      />
    </div>
  );
};

export default AdminDashboard;