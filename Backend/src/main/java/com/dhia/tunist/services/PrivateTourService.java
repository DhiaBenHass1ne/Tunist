package com.dhia.tunist.services;

import java.util.List;
import java.util.Optional;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import com.dhia.tunist.models.PrivateTour;
import com.dhia.tunist.repositories.PrivateTourRepository;

@Service
public class PrivateTourService {

	@Autowired
	private PrivateTourRepository privateTourRepository;

	public PrivateTour createPrivateTour(PrivateTour privateTour) {
		return privateTourRepository.save(privateTour);
	}

	// READ ALL
	public List<PrivateTour> allPrivateTours() {
		return privateTourRepository.findAll();
	}

	// READ ONE
	public PrivateTour findBookById(Long id) {
		Optional<PrivateTour> maybePrivateTour = privateTourRepository.findById(id);
		if (maybePrivateTour.isPresent()) {
			return maybePrivateTour.get();
		} else {
			return null;
		}
	}

	// UPDATE
	public PrivateTour updatePrivateTour(PrivateTour b) {
		return privateTourRepository.save(b);
	}

	// DELETE
	public void deletePrivateTour(Long id) {
		privateTourRepository.deleteById(id);
	}

}
