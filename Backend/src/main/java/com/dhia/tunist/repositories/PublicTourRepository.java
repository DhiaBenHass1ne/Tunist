package com.dhia.tunist.repositories;

import java.util.List;

import org.springframework.data.repository.CrudRepository;

import com.dhia.tunist.models.PublicTour;

public interface PublicTourRepository extends CrudRepository<PublicTour, Long> {
	

	
	List<PublicTour>findAll();
	
}
