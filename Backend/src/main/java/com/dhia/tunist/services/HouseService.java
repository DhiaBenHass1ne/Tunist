package com.dhia.tunist.services;

import java.util.List;
import java.util.Optional;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import com.dhia.tunist.models.House;
import com.dhia.tunist.repositories.HouseRepository;

@Service
public class HouseService {

	@Autowired
	private HouseRepository houseRepository;

	public House createHouse(House house) {
		return houseRepository.save(house);
	}

	// READ ALL
	public List<House> allHouses() {
		return houseRepository.findAll();
	}

	// READ ONE
	public House findHouseById(Long id) {
		Optional<House> maybeHouse = houseRepository.findById(id);
		if (maybeHouse.isPresent()) {
			return maybeHouse.get();
		} else {
			return null;
		}
	}

	// UPDATE
	public House updateHouse(House b) {
		return houseRepository.save(b);
	}

	// DELETE
	public void deleteHouse(Long id) {
		houseRepository.deleteById(id);
	}

}
