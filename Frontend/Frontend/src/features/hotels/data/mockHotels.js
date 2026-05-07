export const MOCK_HOTELS = [
  {
    id: 1,
    name: "The Grand Palace",
    description: "Experience luxury in the heart of the city with our world-class amenities and stunning views. The Grand Palace offers an unparalleled blend of traditional elegance and modern sophistication, making it the perfect choice for discerning travelers.",
    city: "Mumbai",
    address: "Marine Drive, Mumbai, Maharashtra",
    starRating: 5,
    imageUrl: "https://images.unsplash.com/photo-1566073771259-6a8506099945?ixlib=rb-4.0.3&auto=format&fit=crop&w=1200&q=80",
    basePrice: 12000,
    amenities: ["WiFi", "Pool", "Gym", "Spa", "Restaurant", "Bar", "Room Service", "Parking"],
    roomCategories: [
      {
        id: 101,
        categoryName: "Deluxe City View",
        basePrice: 12000,
        maxOccupancy: 2,
        bedType: "King Size",
        description: "Elegant room featuring stunning views of the Mumbai skyline.",
        amenities: ["AC", "WiFi", "Minibar", "Safe"],
        imageUrls: ["https://images.unsplash.com/photo-1611892440504-42a792e24d32?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&q=80"]
      },
      {
        id: 102,
        categoryName: "Royal Suite",
        basePrice: 25000,
        maxOccupancy: 3,
        bedType: "King Size + Sofa Bed",
        description: "Experience royalty in our spacious suites with separate living area.",
        amenities: ["AC", "WiFi", "Minibar", "Bathtub", "Balcony"],
        imageUrls: ["https://images.unsplash.com/photo-1582719478250-c89cae4dc85b?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&q=80"]
      }
    ]
  },
  {
    id: 2,
    name: "Coastal Breeze Resort",
    description: "A serene getaway by the beach, perfect for families and couples seeking relaxation. Our resort features private beach access and lush tropical gardens.",
    city: "Goa",
    address: "Calangute Beach, Goa",
    starRating: 4,
    imageUrl: "https://images.unsplash.com/photo-1520250497591-112f2f40a3f4?ixlib=rb-4.0.3&auto=format&fit=crop&w=1200&q=80",
    basePrice: 8500,
    amenities: ["WiFi", "Pool", "Beach Access", "Restaurant", "Bar", "Parking"],
    roomCategories: [
      {
        id: 201,
        categoryName: "Beachfront Room",
        basePrice: 8500,
        maxOccupancy: 2,
        bedType: "Queen Size",
        description: "Wake up to the sound of waves in our beachfront rooms.",
        amenities: ["AC", "WiFi", "Balcony"],
        imageUrls: ["https://images.unsplash.com/photo-1571896349842-33c89424de2d?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&q=80"]
      }
    ]
  },
  {
    id: 3,
    name: "Mountain View Inn",
    description: "Nestled in the Himalayas, offering cozy rooms and breathtaking mountain vistas. Perfect for trekkers and nature lovers.",
    city: "Manali",
    address: "Old Manali Road, Himachal Pradesh",
    starRating: 3,
    imageUrl: "https://images.unsplash.com/photo-1445019980597-93fa8acb246c?ixlib=rb-4.0.3&auto=format&fit=crop&w=1200&q=80",
    basePrice: 4500,
    amenities: ["WiFi", "Restaurant", "Parking", "Trekking Tours"],
    roomCategories: [
      {
        id: 301,
        categoryName: "Standard Room",
        basePrice: 4500,
        maxOccupancy: 2,
        bedType: "Double Bed",
        description: "Cozy rooms with traditional wooden interiors.",
        amenities: ["WiFi", "Heater"],
        imageUrls: ["https://images.unsplash.com/photo-1590490360182-c33d57733427?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&q=80"]
      }
    ]
  },
  {
    id: 4,
    name: "Urban Oasis Hotel",
    description: "Sleek, modern, and perfectly located for business travelers in the tech hub of Bangalore.",
    city: "Bangalore",
    address: "Indiranagar, Bangalore, Karnataka",
    starRating: 4,
    imageUrl: "https://images.unsplash.com/photo-1541971875076-8f970d573be6?ixlib=rb-4.0.3&auto=format&fit=crop&w=1200&q=80",
    basePrice: 6000,
    amenities: ["WiFi", "Gym", "Business Center", "Restaurant", "Parking"],
    roomCategories: [
      {
        id: 401,
        categoryName: "Business Executive",
        basePrice: 6000,
        maxOccupancy: 1,
        bedType: "Queen Size",
        description: "Optimized for work with high-speed internet and ergonomic desk.",
        amenities: ["AC", "WiFi", "Coffee Maker"],
        imageUrls: ["https://images.unsplash.com/photo-1598928506311-c55ded91a20c?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&q=80"]
      }
    ]
  },
  {
    id: 5,
    name: "Heritage Haveli",
    description: "Step back in time in this beautifully restored 19th-century haveli with royal hospitality and traditional architecture.",
    city: "Jaipur",
    address: "Amer Road, Jaipur, Rajasthan",
    starRating: 5,
    imageUrl: "https://images.unsplash.com/photo-1549388604-817d15aa0110?ixlib=rb-4.0.3&auto=format&fit=crop&w=1200&q=80",
    basePrice: 9500,
    amenities: ["WiFi", "Pool", "Restaurant", "Cultural Shows", "Parking"],
    roomCategories: [
      {
        id: 501,
        categoryName: "Royal Chamber",
        basePrice: 9500,
        maxOccupancy: 2,
        bedType: "King Size",
        description: "Decorated with traditional frescoes and antique furniture.",
        amenities: ["AC", "WiFi", "Minibar"],
        imageUrls: ["https://images.unsplash.com/photo-1578683010236-d716f9759678?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&q=80"]
      }
    ]
  },
  {
    id: 6,
    name: "Lakeview Suites",
    description: "Elegant suites overlooking the tranquil lakes of Udaipur, ideal for a peaceful and romantic retreat.",
    city: "Udaipur",
    address: "Lake Pichola, Udaipur, Rajasthan",
    starRating: 4,
    imageUrl: "https://images.unsplash.com/photo-1571896349842-33c89424de2d?ixlib=rb-4.0.3&auto=format&fit=crop&w=1200&q=80",
    basePrice: 7800,
    amenities: ["WiFi", "Restaurant", "Boat Rides", "Parking"],
    roomCategories: [
      {
        id: 601,
        categoryName: "Lakefront Suite",
        basePrice: 7800,
        maxOccupancy: 2,
        bedType: "King Size",
        description: "Panoramic views of Lake Pichola from your private balcony.",
        amenities: ["AC", "WiFi", "Balcony", "Minibar"],
        imageUrls: ["https://images.unsplash.com/photo-1596394516093-501ba68a0ba6?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&q=80"]
      }
    ]
  }
];
