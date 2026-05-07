package com.hotel.service;

import com.hotel.dto.AvailabilityResponseDTO;

import java.time.LocalDate;
import java.util.List;

public interface AvailabilityService {
    List<AvailabilityResponseDTO> searchAvailability(Long hotelId, LocalDate checkIn, LocalDate checkOut, Integer guests);
}
