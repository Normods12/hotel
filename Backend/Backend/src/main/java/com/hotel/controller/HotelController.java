package com.hotel.controller;

import com.hotel.dto.HotelRequestDTO;
import com.hotel.dto.HotelResponseDTO;
import com.hotel.service.HotelService;
import jakarta.validation.Valid;
import lombok.RequiredArgsConstructor;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.security.access.prepost.PreAuthorize;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@RestController
@RequestMapping("/api/hotels")
@RequiredArgsConstructor
public class HotelController {

    private final HotelService hotelService;

    @GetMapping
    public ResponseEntity<List<HotelResponseDTO>> getAllHotels() {
        return ResponseEntity.ok(hotelService.getAllHotels());
    }

    @GetMapping("/{id}")
    public ResponseEntity<HotelResponseDTO> getHotelById(@PathVariable Long id) {
        return ResponseEntity.ok(hotelService.getHotelById(id));
    }

    @GetMapping("/search/advanced")
    public ResponseEntity<List<HotelResponseDTO>> advancedSearch(
            @RequestParam(required = false) String city,
            @RequestParam(required = false) Integer starRating,
            @RequestParam(required = false) Double minPrice,
            @RequestParam(required = false) Double maxPrice,
            @RequestParam(required = false) String amenities) {
        
        return ResponseEntity.ok(hotelService.advancedSearch(city, starRating, minPrice, maxPrice, amenities));
    }

    @PostMapping
    @PreAuthorize("hasRole('ADMIN')")
    public ResponseEntity<HotelResponseDTO> createHotel(@Valid @RequestBody HotelRequestDTO hotelRequestDTO) {
        HotelResponseDTO createdHotel = hotelService.createHotel(hotelRequestDTO);
        return new ResponseEntity<>(createdHotel, HttpStatus.CREATED);
    }
}
