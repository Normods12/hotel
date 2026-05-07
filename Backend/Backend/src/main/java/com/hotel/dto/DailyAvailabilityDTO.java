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
public class DailyAvailabilityDTO {
    private LocalDate date;
    private List<CategoryAvailabilityDTO> categories;

    @Data
    @Builder
    @NoArgsConstructor
    @AllArgsConstructor
    public static class CategoryAvailabilityDTO {
        private Long categoryId;
        private String categoryName;
        private Integer availableCount;
        private Double price;
    }
}
