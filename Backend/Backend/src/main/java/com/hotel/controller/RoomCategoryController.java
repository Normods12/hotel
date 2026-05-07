package com.hotel.controller;

import com.hotel.dto.RoomCategoryRequestDTO;
import com.hotel.dto.RoomCategoryResponseDTO;
import com.hotel.service.RoomCategoryService;
import jakarta.validation.Valid;
import lombok.RequiredArgsConstructor;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.security.access.prepost.PreAuthorize;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@RestController
@RequestMapping("/api")
@RequiredArgsConstructor
public class RoomCategoryController {

    private final RoomCategoryService roomCategoryService;

    @PostMapping("/room-categories")
    @PreAuthorize("hasRole('ADMIN')")
    public ResponseEntity<RoomCategoryResponseDTO> createRoomCategory(@Valid @RequestBody RoomCategoryRequestDTO requestDTO) {
        RoomCategoryResponseDTO createdCategory = roomCategoryService.createRoomCategory(requestDTO);
        return new ResponseEntity<>(createdCategory, HttpStatus.CREATED);
    }

    @GetMapping("/hotels/{hotelId}/room-categories")
    public ResponseEntity<List<RoomCategoryResponseDTO>> getRoomCategoriesByHotel(@PathVariable Long hotelId) {
        return ResponseEntity.ok(roomCategoryService.getRoomCategoriesByHotel(hotelId));
    }
}
