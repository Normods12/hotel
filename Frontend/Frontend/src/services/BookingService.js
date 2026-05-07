import { MOCK_BOOKINGS } from "../features/bookings/data/mockBookings";

// Helper to simulate API delay
const delay = (ms) => new Promise(resolve => setTimeout(resolve, ms));

// Create a new booking (Mocked)
export const createBooking = async (bookingData) => {
  await delay(1500);
  return { 
    ...bookingData, 
    id: Date.now(), 
    bookingReference: `BK-${Math.floor(Math.random() * 1000000)}`,
    status: 'CONFIRMED' 
  };
};

// Get current user's bookings (Mocked)
export const getMyBookings = async () => {
  await delay(800);
  return MOCK_BOOKINGS;
};

// Cancel a booking (Mocked)
export const cancelBooking = async (bookingId) => {
  await delay(1000);
  return { success: true, id: bookingId, status: 'CANCELLED' };
};
