package com.hotel.dto;

import lombok.AllArgsConstructor;
import lombok.Builder;
import lombok.Data;
import lombok.NoArgsConstructor;

import java.util.List;

@Data
@Builder
@NoArgsConstructor
@AllArgsConstructor
public class OccupancyReportDTO {
    private List<HotelOccupancyDTO> occupancyByHotel;

    @Data
    @AllArgsConstructor
    @NoArgsConstructor
    public static class HotelOccupancyDTO {
        private String hotelName;
        private Double occupancyPercentage;
        private Long occupiedRooms;
        private Long totalRooms;
    }
}
