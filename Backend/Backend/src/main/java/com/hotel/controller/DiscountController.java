package com.hotel.controller;

import com.hotel.dto.DiscountResponseDTO;
import com.hotel.dto.DiscountValidationDTO;
import com.hotel.service.DiscountService;
import jakarta.validation.Valid;
import lombok.RequiredArgsConstructor;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

@RestController
@RequestMapping("/api/discounts")
@RequiredArgsConstructor
public class DiscountController {

    private final DiscountService discountService;

    @PostMapping("/validate")
    public ResponseEntity<DiscountResponseDTO> validateDiscount(@Valid @RequestBody DiscountValidationDTO validationDTO) {
        return ResponseEntity.ok(discountService.validateDiscount(validationDTO));
    }
}
