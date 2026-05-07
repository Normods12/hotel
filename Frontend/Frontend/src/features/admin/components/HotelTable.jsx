import React from 'react';

const HotelTable = ({ hotels, onEdit, onDelete }) => {
  return (
    <div className="bg-white rounded-3xl shadow-sm border border-gray-100 overflow-hidden">
      <div className="overflow-x-auto">
        <table className="w-full text-left">
          <thead className="bg-gray-50 border-b border-gray-100">
            <tr>
              <th className="px-6 py-4 text-xs font-bold text-gray-400 uppercase tracking-widest">Property</th>
              <th className="px-6 py-4 text-xs font-bold text-gray-400 uppercase tracking-widest">Location</th>
              <th className="px-6 py-4 text-xs font-bold text-gray-400 uppercase tracking-widest">Rating</th>
              <th className="px-6 py-4 text-xs font-bold text-gray-400 uppercase tracking-widest">Base Price</th>
              <th className="px-6 py-4 text-xs font-bold text-gray-400 uppercase tracking-widest text-right">Actions</th>
            </tr>
          </thead>
          <tbody className="divide-y divide-gray-50">
            {hotels.map((hotel) => (
              <tr key={hotel.id} className="hover:bg-gray-50/50 transition-colors">
                <td className="px-6 py-4">
                  <div className="flex items-center space-x-4">
                    <img src={hotel.imageUrl} alt="" className="w-10 h-10 rounded-lg object-cover" />
                    <div>
                      <p className="font-bold text-gray-900">{hotel.name}</p>
                      <p className="text-xs text-gray-500">ID: {hotel.id}</p>
                    </div>
                  </div>
                </td>
                <td className="px-6 py-4 text-sm text-gray-600 font-medium">
                  {hotel.city}
                </td>
                <td className="px-6 py-4">
                  <div className="flex items-center text-yellow-400">
                    <span className="text-sm font-bold text-gray-900 mr-1">{hotel.starRating}</span>
                    <svg className="h-4 w-4 fill-current" viewBox="0 0 20 20"><path d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.07 3.292a1 1 0 00.95.69h3.462c.969 0 1.371 1.24.588 1.81l-2.8 2.034a1 1 0 00-.364 1.118l1.07 3.292c.3.921-.755 1.688-1.54 1.118l-2.8-2.034a1 1 0 00-1.175 0l-2.8 2.034c-.784.57-1.838-.197-1.539-1.118l1.07-3.292a1 1 0 00-.364-1.118L2.98 8.72c-.783-.57-.38-1.81.588-1.81h3.461a1 1 0 00.951-.69l1.07-3.292z" /></svg>
                  </div>
                </td>
                <td className="px-6 py-4 text-sm font-bold text-gray-900">
                  ₹{hotel.basePrice.toLocaleString()}
                </td>
                <td className="px-6 py-4 text-right space-x-3">
                  <button 
                    onClick={() => onEdit(hotel)}
                    className="text-primary-600 hover:text-primary-700 font-bold text-sm"
                  >
                    Edit
                  </button>
                  <button 
                    onClick={() => onDelete(hotel.id)}
                    className="text-red-600 hover:text-red-700 font-bold text-sm"
                  >
                    Delete
                  </button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
};

export default HotelTable;
