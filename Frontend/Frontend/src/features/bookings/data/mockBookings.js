export const MOCK_BOOKINGS = [
  {
    id: 1,
    bookingReference: "BK-1715056234-982",
    hotelName: "The Grand Palace",
    city: "Mumbai",
    checkIn: "2026-05-15",
    checkOut: "2026-05-18",
    totalAmount: 40320, // 3 nights + taxes
    status: "CONFIRMED",
    rooms: [
      { categoryName: "Deluxe City View", quantity: 1 }
    ],
    imageUrl: "https://images.unsplash.com/photo-1566073771259-6a8506099945?ixlib=rb-4.0.3&auto=format&fit=crop&w=400&q=80"
  },
  {
    id: 2,
    bookingReference: "BK-1714023112-441",
    hotelName: "Heritage Haveli",
    city: "Jaipur",
    checkIn: "2026-04-10",
    checkOut: "2026-04-12",
    totalAmount: 21280,
    status: "COMPLETED",
    rooms: [
      { categoryName: "Royal Chamber", quantity: 1 }
    ],
    imageUrl: "https://images.unsplash.com/photo-1549388604-817d15aa0110?ixlib=rb-4.0.3&auto=format&fit=crop&w=400&q=80"
  },
  {
    id: 3,
    bookingReference: "BK-1713011223-102",
    hotelName: "Coastal Breeze Resort",
    city: "Goa",
    checkIn: "2026-06-01",
    checkOut: "2026-06-05",
    totalAmount: 38080,
    status: "CANCELLED",
    rooms: [
      { categoryName: "Beachfront Room", quantity: 1 }
    ],
    imageUrl: "https://images.unsplash.com/photo-1520250497591-112f2f40a3f4?ixlib=rb-4.0.3&auto=format&fit=crop&w=400&q=80"
  }
];
