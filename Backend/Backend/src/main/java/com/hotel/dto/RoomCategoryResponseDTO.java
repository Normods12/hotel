package com.hotel.dto;

import lombok.AllArgsConstructor;
import lombok.Builder;
import lombok.Data;
import lombok.NoArgsConstructor;

@Data
@Builder
@NoArgsConstructor
@AllArgsConstructor
public class RoomCategoryResponseDTO {
    private Long id;
    private String categoryName;
    private Double basePrice;
    private Integer maxOccupancy;
    private String bedType;
}
