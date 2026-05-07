package com.hotel.dto;

import jakarta.validation.constraints.NotBlank;
import jakarta.validation.constraints.NotNull;
import jakarta.validation.constraints.Positive;
import lombok.AllArgsConstructor;
import lombok.Builder;
import lombok.Data;
import lombok.NoArgsConstructor;

@Data
@Builder
@NoArgsConstructor
@AllArgsConstructor
public class DiscountValidationDTO {
    @NotBlank(message = "Discount code is required")
    private String code;

    @NotNull(message = "Booking amount is required")
    @Positive(message = "Booking amount must be positive")
    private Double bookingAmount;
}
