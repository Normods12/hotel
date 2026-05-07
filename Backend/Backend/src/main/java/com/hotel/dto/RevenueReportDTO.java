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
public class RevenueReportDTO {
    private Double totalRevenue;
    private List<HotelRevenueDTO> revenueByHotel;

    @Data
    @AllArgsConstructor
    @NoArgsConstructor
    public static class HotelRevenueDTO {
        private String hotelName;
        private Double revenue;
    }
}
