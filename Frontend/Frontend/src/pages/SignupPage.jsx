import React from 'react';
import { useFormik } from 'formik';
import * as Yup from 'yup';
import { Link, useNavigate } from 'react-router-dom';
import { registerUser } from '../services/UserService';
import toast from 'react-hot-toast';

const SignupPage = () => {
  const navigate = useNavigate();

  const formik = useFormik({
    initialValues: {
      firstName: '',
      lastName: '',
      email: '',
      password: '',
    },
    validationSchema: Yup.object({
      firstName: Yup.string().required('First name is required'),
      lastName: Yup.string().required('Last name is required'),
      email: Yup.string().email('Invalid email address').required('Email is required'),
      password: Yup.string().min(6, 'Password must be at least 6 characters').required('Password is required'),
    }),
    onSubmit: async (values, { setSubmitting }) => {
      try {
        await registerUser(values);
        toast.success("Account created successfully! Please sign in.");
        navigate('/login');
      } catch (err) {
        toast.error(err.message || "Registration failed. Please try again.");
      } finally {
        setSubmitting(false);
      }
    },
  });

  return (
    <div className="min-h-screen bg-gray-50 flex flex-col justify-center py-12 sm:px-6 lg:px-8">
      <div className="sm:mx-auto sm:w-full sm:max-w-md">
        <h2 className="mt-6 text-center text-4xl font-extrabold text-gray-900 tracking-tight">
          Join the community
        </h2>
        <p className="mt-2 text-center text-sm text-gray-600">
          Already have an account?{' '}
          <Link to="/login" className="font-bold text-primary-600 hover:text-primary-500 transition-colors">
            Sign in here
          </Link>
        </p>
      </div>

      <div className="mt-8 sm:mx-auto sm:w-full sm:max-w-md">
        <div className="bg-white py-10 px-4 shadow-xl shadow-gray-200/50 sm:rounded-3xl sm:px-10 border border-gray-100">
          <form className="space-y-6" onSubmit={formik.handleSubmit}>
            <div className="grid grid-cols-1 gap-y-6 gap-x-4 sm:grid-cols-2">
              <div>
                <label className="block text-sm font-bold text-gray-700 mb-2">First Name</label>
                <input
                  type="text"
                  {...formik.getFieldProps('firstName')}
                  className={`w-full px-4 py-3 rounded-xl border ${formik.touched.firstName && formik.errors.firstName ? 'border-red-500 bg-red-50' : 'border-gray-200 focus:border-primary-500'} outline-none transition-all placeholder-gray-300`}
                  placeholder="John"
                />
              </div>

              <div>
                <label className="block text-sm font-bold text-gray-700 mb-2">Last Name</label>
                <input
                  type="text"
                  {...formik.getFieldProps('lastName')}
                  className={`w-full px-4 py-3 rounded-xl border ${formik.touched.lastName && formik.errors.lastName ? 'border-red-500 bg-red-50' : 'border-gray-200 focus:border-primary-500'} outline-none transition-all placeholder-gray-300`}
                  placeholder="Doe"
                />
              </div>
            </div>

            <div>
              <label className="block text-sm font-bold text-gray-700 mb-2">Email address</label>
              <input
                type="email"
                {...formik.getFieldProps('email')}
                className={`w-full px-4 py-3 rounded-xl border ${formik.touched.email && formik.errors.email ? 'border-red-500 bg-red-50' : 'border-gray-200 focus:border-primary-500'} outline-none transition-all placeholder-gray-300`}
                placeholder="john@example.com"
              />
              {formik.touched.email && formik.errors.email && (
                <p className="mt-2 text-xs text-red-500 font-medium">{formik.errors.email}</p>
              )}
            </div>

            <div>
              <label className="block text-sm font-bold text-gray-700 mb-2">Password</label>
              <input
                type="password"
                {...formik.getFieldProps('password')}
                className={`w-full px-4 py-3 rounded-xl border ${formik.touched.password && formik.errors.password ? 'border-red-500 bg-red-50' : 'border-gray-200 focus:border-primary-500'} outline-none transition-all placeholder-gray-300`}
                placeholder="Minimum 6 characters"
              />
              {formik.touched.password && formik.errors.password && (
                <p className="mt-2 text-xs text-red-500 font-medium">{formik.errors.password}</p>
              )}
            </div>

            <div>
              <button
                type="submit"
                disabled={formik.isSubmitting}
                className="w-full flex justify-center py-3 px-4 border border-transparent rounded-xl shadow-lg text-sm font-bold text-white bg-primary-600 hover:bg-primary-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-primary-500 transition-all active:scale-[0.98] disabled:opacity-50"
              >
                {formik.isSubmitting ? 'Creating account...' : 'Create Account'}
              </button>
            </div>
          </form>

          <p className="mt-8 text-xs text-center text-gray-500">
            By signing up, you agree to our{' '}
            <a href="#" className="font-bold text-gray-700 hover:underline">Terms of Service</a> and{' '}
            <a href="#" className="font-bold text-gray-700 hover:underline">Privacy Policy</a>.
          </p>
        </div>
      </div>
    </div>
  );
};

export default SignupPage;