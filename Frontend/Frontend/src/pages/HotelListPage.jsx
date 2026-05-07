import React, { useEffect, useState, useMemo } from 'react';
import { useSearchParams } from 'react-router-dom';
import HotelCard from '../features/hotels/components/HotelCard';
import SearchBar from '../features/hotels/components/SearchBar';
import FilterSidebar from '../features/hotels/components/FilterSidebar';
import { getAllHotels } from '../services/HotelService';
import toast from 'react-hot-toast';

const HotelListPage = () => {
  const [searchParams, setSearchParams] = useSearchParams();
  const [hotels, setHotels] = useState([]);
  const [loading, setLoading] = useState(true);

  // Extract params for search/filtering
  const location = searchParams.get('location') || '';
  const maxPrice = parseInt(searchParams.get('maxPrice')) || 20000;
  const ratingStr = searchParams.get('rating') || '';
  const amenitiesStr = searchParams.get('amenities') || '';

  const filters = useMemo(() => ({
    maxPrice,
    ratings: ratingStr ? ratingStr.split(',').map(Number) : [],
    amenities: amenitiesStr ? amenitiesStr.split(',') : []
  }), [maxPrice, ratingStr, amenitiesStr]);

  const handleFilterChange = (key, value) => {
    const newParams = new URLSearchParams(searchParams);
    
    if (key === 'clear') {
      setSearchParams({ location });
      return;
    }

    if (key === 'maxPrice') {
      newParams.set('maxPrice', value);
    } else if (key === 'ratings') {
      if (value.length > 0) newParams.set('rating', value.join(','));
      else newParams.delete('rating');
    } else if (key === 'amenities') {
      if (value.length > 0) newParams.set('amenities', value.join(','));
      else newParams.delete('amenities');
    }

    setSearchParams(newParams);
  };

  useEffect(() => {
    const fetchHotels = async () => {
      setLoading(true);
      try {
        const query = {
          city: location,
          maxPrice,
          minRating: filters.ratings.length > 0 ? Math.min(...filters.ratings) : null
        };
        const data = await getAllHotels(query);
        setHotels(data);
      } catch (err) {
        toast.error("An error occurred while fetching properties.");
      } finally {
        setLoading(false);
      }
    };

    fetchHotels();
  }, [location, maxPrice, ratingStr, amenitiesStr, filters.ratings]);

  const filteredHotels = useMemo(() => {
    return hotels.filter(hotel => {
      const matchLocation = hotel.city.toLowerCase().includes(location.toLowerCase()) || 
                          hotel.name.toLowerCase().includes(location.toLowerCase());
      const matchPrice = hotel.basePrice <= maxPrice;
      const matchRating = filters.ratings.length > 0 ? filters.ratings.includes(hotel.starRating) : true;
      const matchAmenities = filters.amenities.length > 0 
        ? filters.amenities.every(a => hotel.amenities?.includes(a)) 
        : true;
      
      return matchLocation && matchPrice && matchRating && matchAmenities;
    });
  }, [hotels, location, maxPrice, filters]);

  return (
    <div className="bg-gray-50 min-h-screen">
      <div className="bg-white shadow-sm border-b border-gray-100 py-8 sticky top-0 z-20">
        <div className="container mx-auto px-4">
          <SearchBar />
        </div>
      </div>

      <div className="container mx-auto px-4 py-10">
        <div className="flex flex-col lg:flex-row gap-10">
          <aside className="w-full lg:w-72 flex-shrink-0">
            <FilterSidebar filters={filters} onFilterChange={handleFilterChange} />
          </aside>

          <main className="flex-grow">
            <div className="flex justify-between items-center mb-8">
              <h2 className="text-3xl font-extrabold text-gray-900 tracking-tight">
                {loading ? 'Finding hotels...' : `${filteredHotels.length} Properties found`}
              </h2>
            </div>

            {loading ? (
              <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
                {[...Array(4)].map((_, i) => (
                  <div key={i} className="bg-white rounded-3xl h-96 animate-pulse border border-gray-100"></div>
                ))}
              </div>
            ) : filteredHotels.length > 0 ? (
              <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
                {filteredHotels.map(hotel => (
                  <HotelCard key={hotel.id} hotel={hotel} />
                ))}
              </div>
            ) : (
              <div className="bg-white rounded-3xl p-16 text-center shadow-sm border border-gray-100">
                <h3 className="text-xl font-bold text-gray-900 mb-2">No results found</h3>
                <button 
                  onClick={() => setSearchParams({ location })}
                  className="bg-primary-600 text-white px-8 py-3 rounded-xl font-bold hover:bg-primary-700 transition-all shadow-lg mt-4"
                >
                  Clear All Filters
                </button>
              </div>
            )}
          </main>
        </div>
      </div>
    </div>
  );
};

export default HotelListPage;
