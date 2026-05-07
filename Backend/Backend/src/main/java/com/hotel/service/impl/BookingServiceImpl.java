package com.hotel.service.impl;

import com.hotel.dto.BookingDetailResponseDTO;
import com.hotel.dto.BookingRequestDTO;
import com.hotel.dto.BookingResponseDTO;
import com.hotel.entity.*;
import com.hotel.exception.ResourceNotFoundException;
import com.hotel.mapper.BookingMapper;
import com.hotel.repository.*;
import com.hotel.service.BookingService;
import lombok.RequiredArgsConstructor;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import java.time.temporal.ChronoUnit;
import java.util.ArrayList;
import java.util.List;
import java.util.UUID;
import java.util.stream.Collectors;

@Service
@RequiredArgsConstructor
public class BookingServiceImpl implements BookingService {

    private final BookingRepository bookingRepository;
    private final BookingRoomRepository bookingRoomRepository;
    private final RoomRepository roomRepository;
    private final HotelRepository hotelRepository;
    private final RoomCategoryRepository roomCategoryRepository;
    private final BookingMapper bookingMapper;
    private final com.hotel.service.EmailService emailService;

    @Override
    @Transactional
    public BookingResponseDTO createBooking(BookingRequestDTO requestDTO, Users currentUser) {
        if (!requestDTO.getCheckOutDate().isAfter(requestDTO.getCheckInDate())) {
            throw new IllegalArgumentException("Check-out date must be after check-in date");
        }

        Hotel hotel = hotelRepository.findById(requestDTO.getHotelId())
                .orElseThrow(() -> new ResourceNotFoundException("Hotel not found with id: " + requestDTO.getHotelId()));

        long nights = ChronoUnit.DAYS.between(requestDTO.getCheckInDate(), requestDTO.getCheckOutDate());

        List<Room> allSelectedRooms = new ArrayList<>();
        double totalAmount = 0;

        for (BookingRequestDTO.RoomSelectionDTO selection : requestDTO.getRooms()) {
            RoomCategory category = roomCategoryRepository.findById(selection.getCategoryId())
                    .orElseThrow(() -> new ResourceNotFoundException("Room category not found with id: " + selection.getCategoryId()));

            if (!category.getHotel().getId().equals(hotel.getId())) {
                throw new IllegalArgumentException("Room category " + category.getCategoryName() + " does not belong to the selected hotel");
            }

            List<Room> availableRooms = roomRepository.findAvailableRooms(hotel.getId(), requestDTO.getCheckInDate(), requestDTO.getCheckOutDate());
            
            List<Room> categoryAvailableRooms = availableRooms.stream()
                    .filter(r -> r.getRoomCategory().getId().equals(category.getId()))
                    .collect(Collectors.toList());

            if (categoryAvailableRooms.size() < selection.getQuantity()) {
                throw new IllegalStateException("Not enough rooms available for category: " + category.getCategoryName());
            }

            List<Room> selectedRooms = categoryAvailableRooms.subList(0, selection.getQuantity());
            allSelectedRooms.addAll(selectedRooms);

            totalAmount += category.getBasePrice() * nights * selection.getQuantity();
        }

        String reference = "BK-" + System.currentTimeMillis() + "-" + UUID.randomUUID().toString().substring(0, 4).toUpperCase();
        
        Booking booking = Booking.builder()
                .user(currentUser)
                .hotel(hotel)
                .bookingReference(reference)
                .checkInDate(requestDTO.getCheckInDate())
                .checkOutDate(requestDTO.getCheckOutDate())
                .totalAmount(totalAmount)
                .status(Booking.BookingStatus.CONFIRMED)
                .build();

        Booking savedBooking = bookingRepository.save(booking);

        for (Room room : allSelectedRooms) {
            BookingRoom bookingRoom = BookingRoom.builder()
                    .booking(savedBooking)
                    .room(room)
                    .pricePerNight(room.getRoomCategory().getBasePrice())
                    .build();
            bookingRoomRepository.save(bookingRoom);
        }

        // Trigger Async Email
        emailService.sendBookingConfirmation(savedBooking);

        return BookingResponseDTO.builder()
                .bookingReference(savedBooking.getBookingReference())
                .totalAmount(savedBooking.getTotalAmount())
                .status(savedBooking.getStatus().name())
                .build();
    }

    @Override
    @Transactional(readOnly = true)
    public BookingDetailResponseDTO getBookingDetails(Long id) {
        Booking booking = bookingRepository.findById(id)
                .orElseThrow(() -> new ResourceNotFoundException("Booking not found with id: " + id));
        return bookingMapper.toDetailResponseDTO(booking);
    }

    @Override
    @Transactional(readOnly = true)
    public List<BookingDetailResponseDTO> getUserBookings(Long userId) {
        List<Booking> bookings = bookingRepository.findByUserId(userId);
        return bookingMapper.toDetailResponseDTOList(bookings);
    }

    @Override
    @Transactional
    public BookingResponseDTO cancelBooking(Long id) {
        Booking booking = bookingRepository.findById(id)
                .orElseThrow(() -> new ResourceNotFoundException("Booking not found with id: " + id));

        if (booking.getStatus() == Booking.BookingStatus.CANCELLED) {
            throw new IllegalStateException("Booking is already cancelled");
        }

        if (booking.getStatus() == Booking.BookingStatus.COMPLETED) {
            throw new IllegalStateException("Completed bookings cannot be cancelled");
        }

        booking.setStatus(Booking.BookingStatus.CANCELLED);
        Booking savedBooking = bookingRepository.save(booking);

        // Trigger Async Email
        emailService.sendBookingCancellation(savedBooking);

        return BookingResponseDTO.builder()
                .bookingReference(savedBooking.getBookingReference())
                .totalAmount(savedBooking.getTotalAmount())
                .status(savedBooking.getStatus().name())
                .build();
    }
}
