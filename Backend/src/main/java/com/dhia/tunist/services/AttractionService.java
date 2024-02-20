package com.dhia.tunist.services;

import java.util.List;
import java.util.Optional;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import com.dhia.tunist.models.Attraction;
import com.dhia.tunist.repositories.AttractionRepository;

@Service
public class AttractionService {

	@Autowired
	private AttractionRepository attractionRepository;

	public Attraction createAttraction(Attraction attraction) {
		return attractionRepository.save(attraction);
	}

	// READ ALL
	public List<Attraction> allAttractions() {
		return attractionRepository.findAll();
	}

	// READ ONE
	public Attraction findAttractionById(Long id) {
		Optional<Attraction> maybeAttraction = attractionRepository.findById(id);
		if (maybeAttraction.isPresent()) {
			return maybeAttraction.get();
		} else {
			return null;
		}
	}

	// UPDATE
	public Attraction updateAttraction(Attraction b) {
		return attractionRepository.save(b);
	}

	// DELETE
	public void deleteAttraction(Long id) {
		attractionRepository.deleteById(id);
	}

}
