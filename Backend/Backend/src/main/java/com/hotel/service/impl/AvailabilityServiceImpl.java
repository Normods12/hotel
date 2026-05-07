package com.hotel.service.impl;

import com.hotel.dto.AvailabilityResponseDTO;
import com.hotel.dto.DailyAvailabilityDTO;
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
                .filter(dto -> guests == null || dto.getAvailableCount() > 0)
                .collect(Collectors.toList());
    }

    @Override
    @Transactional(readOnly = true)
    public List<DailyAvailabilityDTO> getAvailabilityCalendar(Long hotelId, LocalDate startDate, Integer days) {
        List<DailyAvailabilityDTO> calendar = new java.util.ArrayList<>();
        LocalDate currentDate = startDate != null ? startDate : LocalDate.now();
        int duration = days != null ? days : 30;

        for (int i = 0; i < duration; i++) {
            LocalDate date = currentDate.plusDays(i);
            // Search availability for a single night (checkIn = date, checkOut = date + 1)
            List<AvailabilityResponseDTO> dayResults = searchAvailability(hotelId, date, date.plusDays(1), null);
            
            List<DailyAvailabilityDTO.CategoryAvailabilityDTO> categoryResults = dayResults.stream()
                    .map(res -> DailyAvailabilityDTO.CategoryAvailabilityDTO.builder()
                            .categoryId(res.getCategoryId())
                            .categoryName(res.getCategoryName())
                            .availableCount(res.getAvailableCount())
                            .price(res.getPrice())
                            .build())
                    .collect(Collectors.toList());

            calendar.add(DailyAvailabilityDTO.builder()
                    .date(date)
                    .categories(categoryResults)
                    .build());
        }
        return calendar;
    }
}
