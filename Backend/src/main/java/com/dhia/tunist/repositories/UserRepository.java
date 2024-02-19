package com.dhia.tunist.repositories;

import java.util.List;
import java.util.Optional;

import org.springframework.data.repository.CrudRepository;
import org.springframework.stereotype.Repository;

import com.dhia.tunist.models.User;

@Repository
public interface UserRepository extends CrudRepository<User, Long> {

	// for logging user
	Optional<User>findByEmail(String email);
	
	List<User>findAll();
	
}
