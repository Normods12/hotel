import React from 'react';
import { useFormik } from 'formik';
import * as Yup from 'yup';

const AddHotelModal = ({ hotel, isOpen, onClose, onSubmit }) => {
  if (!isOpen) return null;

  const formik = useFormik({
    initialValues: hotel || {
      name: '',
      city: '',
      address: '',
      starRating: 5,
      imageUrl: '',
      basePrice: '',
      description: '',
      amenities: '' // String, then split
    },
    enableReinitialize: true,
    validationSchema: Yup.object({
      name: Yup.string().required('Required'),
      city: Yup.string().required('Required'),
      address: Yup.string().required('Required'),
      starRating: Yup.number().min(1).max(5).required('Required'),
      imageUrl: Yup.string().url('Invalid URL').required('Required'),
      basePrice: Yup.number().required('Required'),
    }),
    onSubmit: (values) => {
      const formattedValues = {
        ...values,
        amenities: typeof values.amenities === 'string' 
          ? values.amenities.split(',').map(a => a.trim()).filter(a => a)
          : values.amenities
      };
      onSubmit(formattedValues);
    },
  });

  return (
    <div className="fixed inset-0 bg-black/60 backdrop-blur-sm z-[100] flex items-center justify-center p-4">
      <div className="bg-white rounded-3xl w-full max-w-2xl max-h-[90vh] overflow-y-auto shadow-2xl animate-in fade-in zoom-in duration-300">
        <div className="sticky top-0 bg-white border-b border-gray-100 p-6 flex justify-between items-center z-10">
          <h2 className="text-2xl font-bold text-gray-900">{hotel ? 'Edit Property' : 'Add New Property'}</h2>
          <button onClick={onClose} className="text-gray-400 hover:text-gray-900">
            <svg className="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
            </svg>
          </button>
        </div>

        <form onSubmit={formik.handleSubmit} className="p-8 space-y-6">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <div>
              <label className="block text-sm font-bold text-gray-700 mb-2">Hotel Name</label>
              <input 
                type="text" 
                {...formik.getFieldProps('name')}
                className="w-full px-4 py-3 rounded-xl border border-gray-200 focus:border-primary-500 outline-none"
              />
            </div>
            <div>
              <label className="block text-sm font-bold text-gray-700 mb-2">City</label>
              <input 
                type="text" 
                {...formik.getFieldProps('city')}
                className="w-full px-4 py-3 rounded-xl border border-gray-200 focus:border-primary-500 outline-none"
              />
            </div>
          </div>

          <div>
            <label className="block text-sm font-bold text-gray-700 mb-2">Full Address</label>
            <input 
              type="text" 
              {...formik.getFieldProps('address')}
              className="w-full px-4 py-3 rounded-xl border border-gray-200 focus:border-primary-500 outline-none"
            />
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <div>
              <label className="block text-sm font-bold text-gray-700 mb-2">Star Rating (1-5)</label>
              <input 
                type="number" 
                {...formik.getFieldProps('starRating')}
                className="w-full px-4 py-3 rounded-xl border border-gray-200 focus:border-primary-500 outline-none"
              />
            </div>
            <div>
              <label className="block text-sm font-bold text-gray-700 mb-2">Base Price (₹)</label>
              <input 
                type="number" 
                {...formik.getFieldProps('basePrice')}
                className="w-full px-4 py-3 rounded-xl border border-gray-200 focus:border-primary-500 outline-none"
              />
            </div>
          </div>

          <div>
            <label className="block text-sm font-bold text-gray-700 mb-2">Cover Image URL</label>
            <input 
              type="text" 
              {...formik.getFieldProps('imageUrl')}
              className="w-full px-4 py-3 rounded-xl border border-gray-200 focus:border-primary-500 outline-none"
            />
          </div>

          <div>
            <label className="block text-sm font-bold text-gray-700 mb-2">Amenities (Comma separated)</label>
            <input 
              type="text" 
              {...formik.getFieldProps('amenities')}
              placeholder="WiFi, Pool, Spa, Parking"
              className="w-full px-4 py-3 rounded-xl border border-gray-200 focus:border-primary-500 outline-none"
            />
          </div>

          <div>
            <label className="block text-sm font-bold text-gray-700 mb-2">Description</label>
            <textarea 
              rows="4"
              {...formik.getFieldProps('description')}
              className="w-full px-4 py-3 rounded-xl border border-gray-200 focus:border-primary-500 outline-none resize-none"
            ></textarea>
          </div>

          <div className="pt-6 border-t border-gray-100 flex justify-end space-x-4">
            <button 
              type="button" 
              onClick={onClose}
              className="px-6 py-3 text-gray-500 font-bold hover:bg-gray-50 rounded-xl"
            >
              Cancel
            </button>
            <button 
              type="submit"
              disabled={formik.isSubmitting}
              className="bg-primary-600 text-white px-10 py-3 rounded-xl font-bold hover:bg-primary-700 shadow-lg active:scale-95 transition-all"
            >
              {hotel ? 'Update Hotel' : 'Create Hotel'}
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};

export default AddHotelModal;
