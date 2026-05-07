import React from 'react';
import { useFormik } from 'formik';
import * as Yup from 'yup';

const GuestDetailsForm = ({ initialValues, onSubmit, onBack }) => {
  const formik = useFormik({
    initialValues: initialValues || {
      firstName: '',
      lastName: '',
      email: '',
      phone: '',
      specialRequests: ''
    },
    validationSchema: Yup.object({
      firstName: Yup.string().required('First name is required'),
      lastName: Yup.string().required('Last name is required'),
      email: Yup.string().email('Invalid email address').required('Email is required'),
      phone: Yup.string().min(10, 'Phone must be at least 10 digits').required('Phone is required'),
    }),
    onSubmit: (values) => {
      onSubmit(values);
    },
  });

  return (
    <div className="bg-white rounded-3xl p-8 shadow-sm border border-gray-100">
      <h2 className="text-2xl font-bold text-gray-900 mb-6">Guest Details</h2>
      
      <form onSubmit={formik.handleSubmit} className="space-y-6">
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          {/* First Name */}
          <div>
            <label className="block text-sm font-bold text-gray-700 mb-2">First Name</label>
            <input
              type="text"
              name="firstName"
              {...formik.getFieldProps('firstName')}
              className={`w-full px-4 py-3 rounded-xl border ${formik.touched.firstName && formik.errors.firstName ? 'border-red-500 bg-red-50' : 'border-gray-200 focus:border-primary-500'} outline-none transition-all`}
            />
            {formik.touched.firstName && formik.errors.firstName && (
              <p className="mt-1 text-xs text-red-500 font-medium">{formik.errors.firstName}</p>
            )}
          </div>

          {/* Last Name */}
          <div>
            <label className="block text-sm font-bold text-gray-700 mb-2">Last Name</label>
            <input
              type="text"
              name="lastName"
              {...formik.getFieldProps('lastName')}
              className={`w-full px-4 py-3 rounded-xl border ${formik.touched.lastName && formik.errors.lastName ? 'border-red-500 bg-red-50' : 'border-gray-200 focus:border-primary-500'} outline-none transition-all`}
            />
            {formik.touched.lastName && formik.errors.lastName && (
              <p className="mt-1 text-xs text-red-500 font-medium">{formik.errors.lastName}</p>
            )}
          </div>
        </div>

        {/* Email */}
        <div>
          <label className="block text-sm font-bold text-gray-700 mb-2">Email Address</label>
          <input
            type="email"
            name="email"
            {...formik.getFieldProps('email')}
            className={`w-full px-4 py-3 rounded-xl border ${formik.touched.email && formik.errors.email ? 'border-red-500 bg-red-50' : 'border-gray-200 focus:border-primary-500'} outline-none transition-all`}
          />
          {formik.touched.email && formik.errors.email && (
            <p className="mt-1 text-xs text-red-500 font-medium">{formik.errors.email}</p>
          )}
        </div>

        {/* Phone */}
        <div>
          <label className="block text-sm font-bold text-gray-700 mb-2">Phone Number</label>
          <input
            type="text"
            name="phone"
            {...formik.getFieldProps('phone')}
            className={`w-full px-4 py-3 rounded-xl border ${formik.touched.phone && formik.errors.phone ? 'border-red-500 bg-red-50' : 'border-gray-200 focus:border-primary-500'} outline-none transition-all`}
          />
          {formik.touched.phone && formik.errors.phone && (
            <p className="mt-1 text-xs text-red-500 font-medium">{formik.errors.phone}</p>
          )}
        </div>

        {/* Special Requests */}
        <div>
          <label className="block text-sm font-bold text-gray-700 mb-2">Special Requests (Optional)</label>
          <textarea
            name="specialRequests"
            rows="3"
            {...formik.getFieldProps('specialRequests')}
            className="w-full px-4 py-3 rounded-xl border border-gray-200 focus:border-primary-500 outline-none transition-all resize-none"
            placeholder="e.g. Early check-in, dietary requirements..."
          ></textarea>
        </div>

        <div className="pt-6 flex justify-between">
          <button
            type="button"
            onClick={onBack}
            className="px-8 py-3 text-gray-600 font-bold hover:text-gray-900 transition-colors"
          >
            Back to Hotel
          </button>
          <button
            type="submit"
            className="bg-primary-600 text-white px-10 py-3 rounded-xl font-bold hover:bg-primary-700 shadow-lg active:scale-95 transition-all"
          >
            Next: Review & Payment
          </button>
        </div>
      </form>
    </div>
  );
};

export default GuestDetailsForm;
