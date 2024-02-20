package com.dhia.tunist.repositories;

import java.util.List;
import java.util.Optional;

import org.springframework.data.repository.CrudRepository;
import org.springframework.stereotype.Repository;

import com.dhia.tunist.models.Attraction;

@Repository
public interface AttractionRepository extends CrudRepository<Attraction, Long> {
	
	List<Attraction>findAll();
	
}