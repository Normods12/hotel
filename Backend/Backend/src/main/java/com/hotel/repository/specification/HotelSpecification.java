package com.hotel.repository.specification;

import com.hotel.entity.Hotel;
import com.hotel.entity.RoomCategory;
import jakarta.persistence.criteria.Join;
import jakarta.persistence.criteria.Predicate;
import org.springframework.data.jpa.domain.Specification;

import java.util.ArrayList;
import java.util.List;

public class HotelSpecification {

    public static Specification<Hotel> filterHotels(String city, Integer starRating, Double minPrice, Double maxPrice, String amenities) {
        return (root, query, criteriaBuilder) -> {
            List<Predicate> predicates = new ArrayList<>();

            if (city != null && !city.isEmpty()) {
                predicates.add(criteriaBuilder.equal(root.get("city"), city));
            }

            if (starRating != null) {
                predicates.add(criteriaBuilder.equal(root.get("starRating"), starRating));
            }

            // Price range filtering (requires joining with RoomCategory)
            if (minPrice != null || maxPrice != null) {
                Join<Hotel, RoomCategory> roomCategories = root.join("roomCategories");
                if (minPrice != null) {
                    predicates.add(criteriaBuilder.greaterThanOrEqualTo(roomCategories.get("basePrice"), minPrice));
                }
                if (maxPrice != null) {
                    predicates.add(criteriaBuilder.lessThanOrEqualTo(roomCategories.get("basePrice"), maxPrice));
                }
                query.distinct(true);
            }

            if (amenities != null && !amenities.isEmpty()) {
                predicates.add(criteriaBuilder.like(root.get("description"), "%" + amenities + "%")); // Basic fallback
            }

            predicates.add(criteriaBuilder.equal(root.get("isActive"), true));

            return criteriaBuilder.and(predicates.toArray(new Predicate[0]));
        };
    }
}
