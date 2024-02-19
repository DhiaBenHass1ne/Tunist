package com.dhia.tunist.repositories;

import java.util.List;

import org.springframework.data.repository.CrudRepository;
import org.springframework.stereotype.Repository;

import com.dhia.tunist.models.Guide;


@Repository
public interface GuideRepository extends CrudRepository<Guide, Long> {
	
	List<Guide> findAll();

}
