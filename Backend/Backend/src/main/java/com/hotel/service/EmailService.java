package com.hotel.service;

import com.hotel.entity.Booking;

public interface EmailService {
    void sendBookingConfirmation(Booking booking);
    void sendBookingCancellation(Booking booking);
}
