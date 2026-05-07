package com.hotel.service;

import com.hotel.dto.OccupancyReportDTO;
import com.hotel.dto.RevenueReportDTO;

public interface AdminReportService {
    RevenueReportDTO getRevenueReport();
    OccupancyReportDTO getOccupancyReport();
}
