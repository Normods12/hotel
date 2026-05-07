package com.hotel.service;

import com.hotel.dto.DiscountResponseDTO;
import com.hotel.dto.DiscountValidationDTO;

public interface DiscountService {
    DiscountResponseDTO validateDiscount(DiscountValidationDTO validationDTO);
}
