package com.hotel.service;

import com.hotel.dto.RoomCategoryRequestDTO;
import com.hotel.dto.RoomCategoryResponseDTO;

import java.util.List;

public interface RoomCategoryService {
    RoomCategoryResponseDTO createRoomCategory(RoomCategoryRequestDTO requestDTO);
    List<RoomCategoryResponseDTO> getRoomCategoriesByHotel(Long hotelId);
}
