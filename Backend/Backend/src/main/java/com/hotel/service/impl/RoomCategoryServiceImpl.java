package com.hotel.service.impl;

import com.hotel.dto.RoomCategoryRequestDTO;
import com.hotel.dto.RoomCategoryResponseDTO;
import com.hotel.entity.Hotel;
import com.hotel.entity.RoomCategory;
import com.hotel.exception.ResourceNotFoundException;
import com.hotel.mapper.RoomCategoryMapper;
import com.hotel.repository.HotelRepository;
import com.hotel.repository.RoomCategoryRepository;
import com.hotel.service.RoomCategoryService;
import lombok.RequiredArgsConstructor;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import java.util.List;

@Service
@RequiredArgsConstructor
public class RoomCategoryServiceImpl implements RoomCategoryService {

    private final RoomCategoryRepository roomCategoryRepository;
    private final HotelRepository hotelRepository;
    private final RoomCategoryMapper roomCategoryMapper;

    @Override
    @Transactional
    public RoomCategoryResponseDTO createRoomCategory(RoomCategoryRequestDTO requestDTO) {
        Hotel hotel = hotelRepository.findById(requestDTO.getHotelId())
                .orElseThrow(() -> new ResourceNotFoundException("Hotel not found with id: " + requestDTO.getHotelId()));

        RoomCategory roomCategory = roomCategoryMapper.toEntity(requestDTO);
        roomCategory.setHotel(hotel);
        
        RoomCategory savedCategory = roomCategoryRepository.save(roomCategory);
        return roomCategoryMapper.toResponseDTO(savedCategory);
    }

    @Override
    @Transactional(readOnly = true)
    public List<RoomCategoryResponseDTO> getRoomCategoriesByHotel(Long hotelId) {
        if (!hotelRepository.existsById(hotelId)) {
            throw new ResourceNotFoundException("Hotel not found with id: " + hotelId);
        }
        List<RoomCategory> categories = roomCategoryRepository.findByHotelId(hotelId);
        return roomCategoryMapper.toResponseDTOList(categories);
    }
}
