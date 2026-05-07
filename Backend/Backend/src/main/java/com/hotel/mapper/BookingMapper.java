package com.hotel.mapper;

import com.hotel.dto.BookingDetailResponseDTO;
import com.hotel.entity.Booking;
import com.hotel.entity.BookingRoom;
import org.mapstruct.Mapper;
import org.mapstruct.Mapping;
import org.mapstruct.ReportingPolicy;

import java.util.List;

@Mapper(componentModel = "spring", unmappedTargetPolicy = ReportingPolicy.IGNORE, uses = {HotelMapper.class})
public interface BookingMapper {

    @Mapping(target = "rooms", source = "bookingRooms")
    BookingDetailResponseDTO toDetailResponseDTO(Booking booking);

    List<BookingDetailResponseDTO> toDetailResponseDTOList(List<Booking> bookings);

    @Mapping(target = "roomNumber", source = "room.roomNumber")
    @Mapping(target = "categoryName", source = "room.roomCategory.categoryName")
    @Mapping(target = "priceAtBooking", source = "pricePerNight")
    BookingDetailResponseDTO.BookingRoomDTO toBookingRoomDTO(BookingRoom bookingRoom);
}
