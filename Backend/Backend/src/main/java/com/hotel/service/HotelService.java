package com.hotel.service;

import com.hotel.dto.HotelRequestDTO;
import com.hotel.dto.HotelResponseDTO;

import java.util.List;

public interface HotelService {
    HotelResponseDTO createHotel(HotelRequestDTO hotelRequestDTO);
    List<HotelResponseDTO> getAllHotels();
    HotelResponseDTO getHotelById(Long id);
    List<HotelResponseDTO> advancedSearch(String city, Integer starRating, Double minPrice, Double maxPrice, String amenities);
}
