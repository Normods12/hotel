package com.hotel.dto;

import lombok.AllArgsConstructor;
import lombok.Builder;
import lombok.Data;
import lombok.NoArgsConstructor;

import java.time.LocalDate;
import java.util.List;

@Data
@Builder
@NoArgsConstructor
@AllArgsConstructor
public class BookingDetailResponseDTO {
    private Long id;
    private String bookingReference;
    private HotelResponseDTO hotel;
    private LocalDate checkInDate;
    private LocalDate checkOutDate;
    private Double totalAmount;
    private String status;
    private List<BookingRoomDTO> rooms;

    @Data
    @Builder
    @NoArgsConstructor
    @AllArgsConstructor
    public static class BookingRoomDTO {
        private String roomNumber;
        private String categoryName;
        private Double priceAtBooking;
    }
}
