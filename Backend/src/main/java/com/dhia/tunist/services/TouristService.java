package com.dhia.tunist.services;

import java.util.List;
import java.util.Optional;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import com.dhia.tunist.models.Tourist;
import com.dhia.tunist.repositories.TouristRepository;

@Service
public class TouristService {

	@Autowired
	private TouristRepository touristRepository;

	public Tourist createTourist(Tourist tourist) {
		return touristRepository.save(tourist);
	}

	// READ ALL
	public List<Tourist> allTourists() {
		return touristRepository.findAll();
	}

	// READ ONE
	public Tourist findTouristById(Long id) {
		Optional<Tourist> maybeTourist = touristRepository.findById(id);
		if (maybeTourist.isPresent()) {
			return maybeTourist.get();
		} else {
			return null;
		}
	}

	// UPDATE
	public Tourist updateTourist(Tourist b) {
		return touristRepository.save(b);
	}

	// DELETE
	public void deleteTourist(Long id) {
		touristRepository.deleteById(id);
	}

}
