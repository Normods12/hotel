package com.hotel.service.impl;

import com.hotel.dto.DiscountResponseDTO;
import com.hotel.dto.DiscountValidationDTO;
import com.hotel.entity.DiscountCode;
import com.hotel.repository.DiscountCodeRepository;
import com.hotel.service.DiscountService;
import lombok.RequiredArgsConstructor;
import org.springframework.stereotype.Service;

import java.time.LocalDateTime;

@Service
@RequiredArgsConstructor
public class DiscountServiceImpl implements DiscountService {

    private final DiscountCodeRepository discountCodeRepository;

    @Override
    public DiscountResponseDTO validateDiscount(DiscountValidationDTO validationDTO) {
        DiscountCode discountCode = discountCodeRepository.findByCodeAndIsActiveTrue(validationDTO.getCode())
                .orElse(null);

        if (discountCode == null) {
            return DiscountResponseDTO.builder()
                    .isValid(false)
                    .message("Invalid or inactive discount code")
                    .build();
        }

        // Check expiry
        if (discountCode.getExpiryDate() != null && discountCode.getExpiryDate().isBefore(LocalDateTime.now())) {
            return DiscountResponseDTO.builder()
                    .isValid(false)
                    .message("Discount code has expired")
                    .build();
        }

        // Check minimum amount
        if (discountCode.getMinBookingAmount() != null && validationDTO.getBookingAmount() < discountCode.getMinBookingAmount()) {
            return DiscountResponseDTO.builder()
                    .isValid(false)
                    .message("Booking amount too low for this discount. Minimum required: " + discountCode.getMinBookingAmount())
                    .build();
        }

        // Calculate discount
        double discountAmount = 0;
        if (discountCode.getType() == DiscountCode.DiscountType.PERCENTAGE) {
            discountAmount = (validationDTO.getBookingAmount() * discountCode.getDiscountValue()) / 100;
        } else {
            discountAmount = discountCode.getDiscountValue();
        }

        // Ensure discount doesn't exceed booking amount
        discountAmount = Math.min(discountAmount, validationDTO.getBookingAmount());

        return DiscountResponseDTO.builder()
                .code(discountCode.getCode())
                .isValid(true)
                .discountAmount(discountAmount)
                .finalAmount(validationDTO.getBookingAmount() - discountAmount)
                .message("Discount applied successfully")
                .build();
    }
}
