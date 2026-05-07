package com.hotel.mapper;

import com.hotel.dto.HotelRequestDTO;
import com.hotel.dto.HotelResponseDTO;
import com.hotel.entity.Hotel;
import org.mapstruct.Mapper;
import org.mapstruct.Mapping;
import org.mapstruct.ReportingPolicy;

import java.util.List;

@Mapper(componentModel = "spring", unmappedTargetPolicy = ReportingPolicy.IGNORE)
public interface HotelMapper {

    Hotel toEntity(HotelRequestDTO requestDTO);

    HotelResponseDTO toResponseDTO(Hotel entity);

    List<HotelResponseDTO> toResponseDTOList(List<Hotel> entities);
}
