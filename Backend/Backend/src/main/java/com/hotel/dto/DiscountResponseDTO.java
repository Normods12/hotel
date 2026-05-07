package com.hotel.dto;

import lombok.AllArgsConstructor;
import lombok.Builder;
import lombok.Data;
import lombok.NoArgsConstructor;

@Data
@Builder
@NoArgsConstructor
@AllArgsConstructor
public class DiscountResponseDTO {
    private String code;
    private Double discountAmount;
    private Double finalAmount;
    private String message;
    private boolean isValid;
}
