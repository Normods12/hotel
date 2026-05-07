import { MOCK_HOTELS } from "../features/hotels/data/mockHotels";

// Helper to simulate API delay
const delay = (ms) => new Promise(resolve => setTimeout(resolve, ms));

// Fetch all hotels or search/filter (Mocked)
export const getAllHotels = async (params = {}) => {
  await delay(500);
  let hotels = [...MOCK_HOTELS];

  if (params.city) {
    hotels = hotels.filter(h => h.city.toLowerCase().includes(params.city.toLowerCase()));
  }
  if (params.maxPrice) {
    hotels = hotels.filter(h => h.basePrice <= params.maxPrice);
  }
  if (params.minRating) {
    hotels = hotels.filter(h => h.starRating >= params.minRating);
  }

  return hotels;
};

// Fetch specific hotel details (Mocked)
export const getHotelById = async (id) => {
  await delay(300);
  const hotel = MOCK_HOTELS.find(h => h.id === parseInt(id));
  if (!hotel) throw new Error("Hotel not found");
  return hotel;
};

// Advanced search (Mocked)
export const searchHotels = async (searchParams) => {
  return getAllHotels(searchParams);
};

// Admin: Add new hotel (Mocked)
export const addHotel = async (hotelData) => {
  await delay(800);
  return { ...hotelData, id: Date.now() };
};

// Admin: Update hotel (Mocked)
export const updateHotel = async (id, hotelData) => {
  await delay(800);
  return { ...hotelData, id };
};

// Admin: Delete hotel (Mocked)
export const deleteHotel = async (id) => {
  await delay(500);
  return { success: true };
};
