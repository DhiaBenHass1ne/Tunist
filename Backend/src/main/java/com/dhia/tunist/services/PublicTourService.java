package com.dhia.tunist.services;

import java.util.List;
import java.util.Optional;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import com.dhia.tunist.models.PublicTour;
import com.dhia.tunist.repositories.PublicTourRepository;

@Service
public class PublicTourService {

	@Autowired
	private PublicTourRepository publicTourRepository;

	public PublicTour createPublicTour(PublicTour publicTour) {
		return publicTourRepository.save(publicTour);
	}

	// READ ALL
	public List<PublicTour> allPublicTours() {
		return publicTourRepository.findAll();
	}

	// READ ONE
	public PublicTour findBookById(Long id) {
		Optional<PublicTour> maybePublicTour = publicTourRepository.findById(id);
		if (maybePublicTour.isPresent()) {
			return maybePublicTour.get();
		} else {
			return null;
		}
	}

	// UPDATE
	public PublicTour updatePublicTour(PublicTour b) {
		return publicTourRepository.save(b);
	}

	// DELETE
	public void deletePublicTour(Long id) {
		publicTourRepository.deleteById(id);
	}

}
