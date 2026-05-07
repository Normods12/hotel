package com.hotel.controller;

import com.hotel.dto.AvailabilityResponseDTO;
import com.hotel.service.AvailabilityService;
import lombok.RequiredArgsConstructor;
import org.springframework.format.annotation.DateTimeFormat;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.time.LocalDate;
import java.util.List;

@RestController
@RequestMapping("/api/availability")
@RequiredArgsConstructor
public class AvailabilityController {

    private final AvailabilityService availabilityService;

    @GetMapping("/search")
    public ResponseEntity<List<AvailabilityResponseDTO>> searchAvailability(
            @RequestParam Long hotelId,
            @RequestParam @DateTimeFormat(iso = DateTimeFormat.ISO.DATE) LocalDate checkIn,
            @RequestParam @DateTimeFormat(iso = DateTimeFormat.ISO.DATE) LocalDate checkOut,
            @RequestParam(required = false) Integer guests) {
        
        List<AvailabilityResponseDTO> results = availabilityService.searchAvailability(hotelId, checkIn, checkOut, guests);
        return ResponseEntity.ok(results);
    }
}
