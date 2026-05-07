package com.hotel.service.impl;

import com.hotel.dto.OccupancyReportDTO;
import com.hotel.dto.RevenueReportDTO;
import com.hotel.entity.Booking;
import com.hotel.entity.Hotel;
import com.hotel.entity.Room;
import com.hotel.repository.BookingRepository;
import com.hotel.repository.HotelRepository;
import com.hotel.repository.RoomRepository;
import com.hotel.service.AdminReportService;
import lombok.RequiredArgsConstructor;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import java.time.LocalDate;
import java.util.ArrayList;
import java.util.List;
import java.util.stream.Collectors;

@Service
@RequiredArgsConstructor
public class AdminReportServiceImpl implements AdminReportService {

    private final BookingRepository bookingRepository;
    private final HotelRepository hotelRepository;
    private final RoomRepository roomRepository;

    @Override
    @Transactional(readOnly = true)
    public RevenueReportDTO getRevenueReport() {
        List<Object[]> results = bookingRepository.sumTotalAmountByHotel();
        
        List<RevenueReportDTO.HotelRevenueDTO> hotelRevenues = results.stream()
                .map(res -> new RevenueReportDTO.HotelRevenueDTO((String) res[0], (Double) res[1]))
                .collect(Collectors.toList());

        double totalRevenue = hotelRevenues.stream().mapToDouble(RevenueReportDTO.HotelRevenueDTO::getRevenue).sum();

        return RevenueReportDTO.builder()
                .totalRevenue(totalRevenue)
                .revenueByHotel(hotelRevenues)
                .build();
    }

    @Override
    @Transactional(readOnly = true)
    public OccupancyReportDTO getOccupancyReport() {
        List<Hotel> hotels = hotelRepository.findAll();
        List<OccupancyReportDTO.HotelOccupancyDTO> occupancyList = new ArrayList<>();

        LocalDate today = LocalDate.now();

        for (Hotel hotel : hotels) {
            // Find all rooms for this hotel
            List<Room> allRooms = roomRepository.findAll().stream()
                    .filter(r -> r.getRoomCategory().getHotel().getId().equals(hotel.getId()))
                    .collect(Collectors.toList());

            if (allRooms.isEmpty()) continue;

            // Find available rooms for today
            List<Room> availableRooms = roomRepository.findAvailableRooms(hotel.getId(), today, today.plusDays(1));
            
            long totalRooms = allRooms.size();
            long occupiedRooms = totalRooms - availableRooms.size();
            double percentage = (occupiedRooms * 100.0) / totalRooms;

            occupancyList.add(new OccupancyReportDTO.HotelOccupancyDTO(
                    hotel.getName(),
                    percentage,
                    occupiedRooms,
                    totalRooms
            ));
        }

        return OccupancyReportDTO.builder()
                .occupancyByHotel(occupancyList)
                .build();
    }
}
