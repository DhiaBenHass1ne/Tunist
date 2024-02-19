package com.dhia.tunist.repositories;

import java.util.List;
import java.util.Optional;

import org.springframework.data.repository.CrudRepository;
import org.springframework.stereotype.Repository;

import com.dhia.tunist.models.House;

@Repository
public interface HouseRepository extends CrudRepository<House, Long> {

	// for logging user
	Optional<House>findByEmail(String email);
	
	List<House>findAll();
	
}