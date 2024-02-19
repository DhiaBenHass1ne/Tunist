package com.dhia.tunist.repositories;

import java.util.List;
import java.util.Optional;

import org.springframework.data.repository.CrudRepository;
import org.springframework.stereotype.Repository;

import com.dhia.tunist.models.PrivateTour;

@Repository
public interface PrivateTourRepository extends CrudRepository<PrivateTour, Long> {

	// for logging user
	Optional<PrivateTour>findByEmail(String email);
	
	List<PrivateTour>findAll();
	
}