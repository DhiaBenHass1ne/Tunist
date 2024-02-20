package com.dhia.tunist.repositories;

import java.util.List;

import org.springframework.data.repository.CrudRepository;
import org.springframework.stereotype.Repository;

import com.dhia.tunist.models.House;

@Repository
public interface HouseRepository extends CrudRepository<House, Long> {


	
	List<House>findAll();
	
}