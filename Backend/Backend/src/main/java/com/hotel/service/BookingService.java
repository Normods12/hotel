package com.hotel.service;

import com.hotel.dto.BookingDetailResponseDTO;
import com.hotel.dto.BookingRequestDTO;
import com.hotel.dto.BookingResponseDTO;
import com.hotel.entity.Users;
import java.util.List;

public interface BookingService {
    BookingResponseDTO createBooking(BookingRequestDTO requestDTO, Users currentUser);
    BookingDetailResponseDTO getBookingDetails(Long id);
    List<BookingDetailResponseDTO> getUserBookings(Long userId);
    BookingResponseDTO cancelBooking(Long id);
}
