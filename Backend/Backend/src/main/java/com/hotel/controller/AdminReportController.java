package com.hotel.controller;

import com.hotel.dto.OccupancyReportDTO;
import com.hotel.dto.RevenueReportDTO;
import com.hotel.service.AdminReportService;
import lombok.RequiredArgsConstructor;
import org.springframework.http.ResponseEntity;
import org.springframework.security.access.prepost.PreAuthorize;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

@RestController
@RequestMapping("/api/admin")
@RequiredArgsConstructor
@PreAuthorize("hasRole('ADMIN')")
public class AdminReportController {

    private final AdminReportService adminReportService;

    @GetMapping("/revenue")
    public ResponseEntity<RevenueReportDTO> getRevenueReport() {
        return ResponseEntity.ok(adminReportService.getRevenueReport());
    }

    @GetMapping("/occupancy")
    public ResponseEntity<OccupancyReportDTO> getOccupancyReport() {
        return ResponseEntity.ok(adminReportService.getOccupancyReport());
    }
}
