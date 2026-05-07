package com.hotel.service.impl;

import com.hotel.dto.AvailabilityResponseDTO;
import com.hotel.entity.Room;
import com.hotel.entity.RoomCategory;
import com.hotel.repository.RoomRepository;
import com.hotel.service.AvailabilityService;
import lombok.RequiredArgsConstructor;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import java.time.LocalDate;
import java.util.List;
import java.util.Map;
import java.util.stream.Collectors;

@Service
@RequiredArgsConstructor
public class AvailabilityServiceImpl implements AvailabilityService {

    private final RoomRepository roomRepository;

    @Override
    @Transactional(readOnly = true)
    public List<AvailabilityResponseDTO> searchAvailability(Long hotelId, LocalDate checkIn, LocalDate checkOut, Integer guests) {
        // Fetch all rooms that are available for the given dates in the specified hotel
        List<Room> availableRooms = roomRepository.findAvailableRooms(hotelId, checkIn, checkOut);

        // Group rooms by category and count them
        Map<RoomCategory, Long> categoryCounts = availableRooms.stream()
                .collect(Collectors.groupingBy(Room::getRoomCategory, Collectors.counting()));

        // Convert to DTOs
        return categoryCounts.entrySet().stream()
                .map(entry -> AvailabilityResponseDTO.builder()
                        .categoryId(entry.getKey().getId())
                        .categoryName(entry.getKey().getCategoryName())
                        .availableCount(entry.getValue().intValue())
                        .price(entry.getKey().getBasePrice())
                        .build())
                .filter(dto -> guests == null || dto.getAvailableCount() > 0) // Basic filter for now
                .collect(Collectors.toList());
    }
}
