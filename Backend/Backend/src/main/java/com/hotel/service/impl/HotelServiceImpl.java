package com.hotel.service.impl;

import com.hotel.dto.HotelRequestDTO;
import com.hotel.dto.HotelResponseDTO;
import com.hotel.entity.Hotel;
import com.hotel.exception.ResourceNotFoundException;
import com.hotel.mapper.HotelMapper;
import com.hotel.repository.HotelRepository;
import com.hotel.service.HotelService;
import lombok.RequiredArgsConstructor;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import java.util.List;

@Service
@RequiredArgsConstructor
public class HotelServiceImpl implements HotelService {

    private final HotelRepository hotelRepository;
    private final HotelMapper hotelMapper;

    @Override
    @Transactional
    public HotelResponseDTO createHotel(HotelRequestDTO hotelRequestDTO) {
        Hotel hotel = hotelMapper.toEntity(hotelRequestDTO);
        Hotel savedHotel = hotelRepository.save(hotel);
        return hotelMapper.toResponseDTO(savedHotel);
    }

    @Override
    @Transactional(readOnly = true)
    public List<HotelResponseDTO> getAllActiveHotels() {
        List<Hotel> activeHotels = hotelRepository.findByIsActiveTrue();
        return hotelMapper.toResponseDTOList(activeHotels);
    }

    @Override
    @Transactional(readOnly = true)
    public HotelResponseDTO getHotelById(Long id) {
        Hotel hotel = hotelRepository.findById(id)
                .orElseThrow(() -> new ResourceNotFoundException("Hotel not found with id: " + id));
        return hotelMapper.toResponseDTO(hotel);
    }
}
