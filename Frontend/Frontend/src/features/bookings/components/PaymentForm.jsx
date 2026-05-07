import React from 'react';
import { useFormik } from 'formik';
import * as Yup from 'yup';

const PaymentForm = ({ onSubmit, onBack, totalAmount }) => {
  const formik = useFormik({
    initialValues: {
      cardName: '',
      cardNumber: '',
      expiryDate: '',
      cvv: ''
    },
    validationSchema: Yup.object({
      cardName: Yup.string().required('Name on card is required'),
      cardNumber: Yup.string()
        .matches(/^[0-9]{16}$/, 'Card number must be 16 digits')
        .required('Card number is required'),
      expiryDate: Yup.string()
        .matches(/^(0[1-9]|1[0-2])\/([0-9]{2})$/, 'Invalid format (MM/YY)')
        .required('Expiry date is required'),
      cvv: Yup.string()
        .matches(/^[0-9]{3,4}$/, 'Invalid CVV')
        .required('CVV is required'),
    }),
    onSubmit: (values) => {
      onSubmit(values);
    },
  });

  return (
    <div className="bg-white rounded-3xl p-8 shadow-sm border border-gray-100">
      <h2 className="text-2xl font-bold text-gray-900 mb-6">Payment Method</h2>
      
      <div className="mb-8 p-4 bg-blue-50 border border-blue-100 rounded-2xl flex items-center">
        <div className="bg-blue-600 p-2 rounded-lg mr-4">
          <svg className="h-6 w-6 text-white" fill="none" viewBox="0 0 24 24" stroke="currentColor">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 10h18M7 15h1m4 0h1m-7 4h12a3 3 0 003-3V8a3 3 0 00-3-3H6a3 3 0 00-3 3v8a3 3 0 003 3z" />
          </svg>
        </div>
        <div>
          <p className="text-blue-900 font-bold">Secure Payment</p>
          <p className="text-blue-700 text-xs">Your payment information is encrypted and secure.</p>
        </div>
      </div>

      <form onSubmit={formik.handleSubmit} className="space-y-6">
        {/* Card Name */}
        <div>
          <label className="block text-sm font-bold text-gray-700 mb-2">Name on Card</label>
          <input
            type="text"
            placeholder="e.g. John Doe"
            {...formik.getFieldProps('cardName')}
            className={`w-full px-4 py-3 rounded-xl border ${formik.touched.cardName && formik.errors.cardName ? 'border-red-500 bg-red-50' : 'border-gray-200 focus:border-primary-500'} outline-none transition-all`}
          />
          {formik.touched.cardName && formik.errors.cardName && (
            <p className="mt-1 text-xs text-red-500 font-medium">{formik.errors.cardName}</p>
          )}
        </div>

        {/* Card Number */}
        <div>
          <label className="block text-sm font-bold text-gray-700 mb-2">Card Number</label>
          <input
            type="text"
            placeholder="0000 0000 0000 0000"
            {...formik.getFieldProps('cardNumber')}
            className={`w-full px-4 py-3 rounded-xl border ${formik.touched.cardNumber && formik.errors.cardNumber ? 'border-red-500 bg-red-50' : 'border-gray-200 focus:border-primary-500'} outline-none transition-all`}
          />
          {formik.touched.cardNumber && formik.errors.cardNumber && (
            <p className="mt-1 text-xs text-red-500 font-medium">{formik.errors.cardNumber}</p>
          )}
        </div>

        <div className="grid grid-cols-2 gap-6">
          {/* Expiry */}
          <div>
            <label className="block text-sm font-bold text-gray-700 mb-2">Expiry Date</label>
            <input
              type="text"
              placeholder="MM/YY"
              {...formik.getFieldProps('expiryDate')}
              className={`w-full px-4 py-3 rounded-xl border ${formik.touched.expiryDate && formik.errors.expiryDate ? 'border-red-500 bg-red-50' : 'border-gray-200 focus:border-primary-500'} outline-none transition-all`}
            />
            {formik.touched.expiryDate && formik.errors.expiryDate && (
              <p className="mt-1 text-xs text-red-500 font-medium">{formik.errors.expiryDate}</p>
            )}
          </div>

          {/* CVV */}
          <div>
            <label className="block text-sm font-bold text-gray-700 mb-2">CVV</label>
            <input
              type="password"
              placeholder="123"
              {...formik.getFieldProps('cvv')}
              className={`w-full px-4 py-3 rounded-xl border ${formik.touched.cvv && formik.errors.cvv ? 'border-red-500 bg-red-50' : 'border-gray-200 focus:border-primary-500'} outline-none transition-all`}
            />
            {formik.touched.cvv && formik.errors.cvv && (
              <p className="mt-1 text-xs text-red-500 font-medium">{formik.errors.cvv}</p>
            )}
          </div>
        </div>

        <div className="pt-6 flex justify-between items-center">
          <button
            type="button"
            onClick={onBack}
            className="text-gray-600 font-bold hover:text-gray-900 transition-colors"
          >
            Back to Details
          </button>
          <button
            type="submit"
            className="bg-primary-600 text-white px-10 py-4 rounded-xl font-bold hover:bg-primary-700 shadow-xl shadow-primary-200 active:scale-95 transition-all"
          >
            Confirm & Pay ₹{(totalAmount * 1.12).toLocaleString()}
          </button>
        </div>
      </form>
    </div>
  );
};

export default PaymentForm;
