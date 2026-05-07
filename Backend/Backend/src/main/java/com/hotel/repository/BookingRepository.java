package com.hotel.repository;

import com.hotel.entity.Booking;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

import java.util.List;
import java.util.Optional;

@Repository
public interface BookingRepository extends JpaRepository<Booking, Long> {
    Optional<Booking> findByBookingReference(String reference);
    List<Booking> findByUserId(Long userId);

    @org.springframework.data.jpa.repository.Query("SELECT b.hotel.name, SUM(b.totalAmount) FROM Booking b WHERE b.status != 'CANCELLED' GROUP BY b.hotel.name")
    List<Object[]> sumTotalAmountByHotel();
}
