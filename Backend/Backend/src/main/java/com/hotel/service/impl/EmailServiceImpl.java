package com.hotel.service.impl;

import com.hotel.entity.Booking;
import com.hotel.service.EmailService;
import jakarta.mail.MessagingException;
import jakarta.mail.internet.MimeMessage;
import lombok.RequiredArgsConstructor;
import lombok.extern.slf4j.Slf4j;
import org.springframework.mail.javamail.JavaMailSender;
import org.springframework.mail.javamail.MimeMessageHelper;
import org.springframework.scheduling.annotation.Async;
import org.springframework.stereotype.Service;

@Service
@RequiredArgsConstructor
@Slf4j
public class EmailServiceImpl implements EmailService {

    private final JavaMailSender mailSender;

    @Override
    @Async
    public void sendBookingConfirmation(Booking booking) {
        try {
            MimeMessage message = mailSender.createMimeMessage();
            MimeMessageHelper helper = new MimeMessageHelper(message, true, "UTF-8");

            helper.setTo(booking.getUser().getEmail());
            helper.setSubject("Booking Confirmation - " + booking.getBookingReference());
            
            String content = "<h1>Booking Confirmed!</h1>" +
                    "<p>Dear " + booking.getUser().getFirstName() + ",</p>" +
                    "<p>Your booking at <strong>" + booking.getHotel().getName() + "</strong> has been confirmed.</p>" +
                    "<p><strong>Reference:</strong> " + booking.getBookingReference() + "</p>" +
                    "<p><strong>Check-in:</strong> " + booking.getCheckInDate() + "</p>" +
                    "<p><strong>Check-out:</strong> " + booking.getCheckOutDate() + "</p>" +
                    "<p><strong>Total Amount:</strong> $" + booking.getTotalAmount() + "</p>" +
                    "<p>Thank you for choosing us!</p>";

            helper.setText(content, true);
            mailSender.send(message);
            log.info("Confirmation email sent for booking: {}", booking.getBookingReference());

        } catch (MessagingException e) {
            log.error("Failed to send confirmation email for booking: {}", booking.getBookingReference(), e);
        }
    }

    @Override
    @Async
    public void sendBookingCancellation(Booking booking) {
        try {
            MimeMessage message = mailSender.createMimeMessage();
            MimeMessageHelper helper = new MimeMessageHelper(message, true, "UTF-8");

            helper.setTo(booking.getUser().getEmail());
            helper.setSubject("Booking Cancelled - " + booking.getBookingReference());
            
            String content = "<h1>Booking Cancelled</h1>" +
                    "<p>Dear " + booking.getUser().getFirstName() + ",</p>" +
                    "<p>Your booking at <strong>" + booking.getHotel().getName() + "</strong> (Ref: " + booking.getBookingReference() + ") has been successfully cancelled.</p>" +
                    "<p>We hope to see you again soon.</p>";

            helper.setText(content, true);
            mailSender.send(message);
            log.info("Cancellation email sent for booking: {}", booking.getBookingReference());

        } catch (MessagingException e) {
            log.error("Failed to send cancellation email for booking: {}", booking.getBookingReference(), e);
        }
    }
}
