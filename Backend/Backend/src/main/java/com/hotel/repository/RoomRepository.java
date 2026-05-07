package com.hotel.repository;

import com.hotel.entity.Room;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

import java.util.List;

import org.springframework.data.jpa.repository.Query;
import org.springframework.data.repository.query.Param;
import java.time.LocalDate;

@Repository
public interface RoomRepository extends JpaRepository<Room, Long> {
    List<Room> findByRoomCategoryId(Long categoryId);

    @Query("SELECT r FROM Room r " +
           "WHERE r.roomCategory.hotel.id = :hotelId " +
           "AND r.isActive = true " +
           "AND r.currentStatus = com.hotel.entity.Room.RoomStatus.AVAILABLE " +
           "AND r.id NOT IN (" +
           "  SELECT br.room.id FROM BookingRoom br " +
           "  WHERE br.booking.status != com.hotel.entity.Booking.BookingStatus.CANCELLED " +
           "  AND br.booking.checkInDate < :checkOut " +
           "  AND br.booking.checkOutDate > :checkIn" +
           ")")
    List<Room> findAvailableRooms(@Param("hotelId") Long hotelId, 
                                  @Param("checkIn") LocalDate checkIn, 
                                  @Param("checkOut") LocalDate checkOut);
}
