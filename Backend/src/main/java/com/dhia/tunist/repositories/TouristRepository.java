package com.dhia.tunist.repositories;

import java.util.List;

import org.springframework.data.repository.CrudRepository;
import org.springframework.stereotype.Repository;

import com.dhia.tunist.models.Tourist;

@Repository
public interface TouristRepository extends CrudRepository<Tourist, Long> {

	
	List<Tourist>findAll();
	
}
