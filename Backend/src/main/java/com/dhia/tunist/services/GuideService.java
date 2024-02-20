package com.dhia.tunist.services;

import java.util.List;
import java.util.Optional;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import com.dhia.tunist.models.Guide;
import com.dhia.tunist.repositories.GuideRepository;

@Service
public class GuideService {

	@Autowired
	private GuideRepository guideRepository;

	public Guide createGuide(Guide guide) {
		return guideRepository.save(guide);
	}

	// READ ALL
	public List<Guide> allGuides() {
		return guideRepository.findAll();
	}

	// READ ONE
	public Guide findGuideById(Long id) {
		Optional<Guide> maybeGuide = guideRepository.findById(id);
		if (maybeGuide.isPresent()) {
			return maybeGuide.get();
		} else {
			return null;
		}
	}

	// UPDATE
	public Guide updateGuide(Guide b) {
		return guideRepository.save(b);
	}

	// DELETE
	public void deleteGuide(Long id) {
		guideRepository.deleteById(id);
	}

}
