import React from 'react';

const Footer = () => {
  return (
    <footer className="bg-gray-900 text-white py-12 mt-auto">
      <div className="container mx-auto px-4">
        <div className="grid grid-cols-1 md:grid-cols-4 gap-8">
          <div className="col-span-1 md:col-span-2">
            <h3 className="text-2xl font-bold text-primary-400 mb-4 italic">Tomato</h3>
            <p className="text-gray-400 max-w-md">
              Bringing the world's best hotels to your fingertips. Book your next adventure with ease and confidence.
            </p>
          </div>
          <div>
            <h4 className="text-lg font-semibold mb-4">Quick Links</h4>
            <ul className="space-y-2 text-gray-400">
              <li><a href="/" className="hover:text-primary-400 transition-colors">Home</a></li>
              <li><a href="/hotels" className="hover:text-primary-400 transition-colors">Browse Hotels</a></li>
              <li><a href="/dashboard" className="hover:text-primary-400 transition-colors">My Bookings</a></li>
            </ul>
          </div>
          <div>
            <h4 className="text-lg font-semibold mb-4">Contact Us</h4>
            <p className="text-gray-400">Email: support@tomato.com</p>
            <p className="text-gray-400">Phone: +1 (555) 000-0000</p>
          </div>
        </div>
        <div className="border-t border-gray-800 mt-12 pt-8 text-center text-gray-500">
          <p>&copy; {new Date().getFullYear()} Tomato Hotel Booking. All rights reserved.</p>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
