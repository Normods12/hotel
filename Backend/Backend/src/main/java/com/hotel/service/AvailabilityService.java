package com.hotel.service;

import com.hotel.dto.AvailabilityResponseDTO;
import com.hotel.dto.DailyAvailabilityDTO;
import java.time.LocalDate;
import java.util.List;

public interface AvailabilityService {
    List<AvailabilityResponseDTO> searchAvailability(Long hotelId, LocalDate checkIn, LocalDate checkOut, Integer guests);
    List<DailyAvailabilityDTO> getAvailabilityCalendar(Long hotelId, LocalDate startDate, Integer days);
}
