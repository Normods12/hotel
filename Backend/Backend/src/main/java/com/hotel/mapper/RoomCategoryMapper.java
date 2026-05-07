package com.hotel.mapper;

import com.hotel.dto.RoomCategoryRequestDTO;
import com.hotel.dto.RoomCategoryResponseDTO;
import com.hotel.entity.RoomCategory;
import org.mapstruct.Mapper;
import org.mapstruct.Mapping;
import org.mapstruct.ReportingPolicy;

import java.util.List;

@Mapper(componentModel = "spring", unmappedTargetPolicy = ReportingPolicy.IGNORE)
public interface RoomCategoryMapper {

    @Mapping(target = "hotel", ignore = true)
    RoomCategory toEntity(RoomCategoryRequestDTO requestDTO);

    RoomCategoryResponseDTO toResponseDTO(RoomCategory entity);

    List<RoomCategoryResponseDTO> toResponseDTOList(List<RoomCategory> entities);
}
