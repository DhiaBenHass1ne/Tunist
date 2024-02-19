package com.dhia.tunist.repositories;

import java.util.List;
import java.util.Optional;

import org.springframework.data.repository.CrudRepository;

import com.dhia.tunist.models.PublicTour;

public interface PulicTourRepository extends CrudRepository<PublicTour, Long> {
	
	Optional<PublicTour>findByEmail(String email);
	
	List<PublicTour>findAll();
	
}
