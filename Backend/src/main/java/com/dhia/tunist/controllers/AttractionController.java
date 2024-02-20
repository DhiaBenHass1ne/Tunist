package com.dhia.tunist.controllers;

import java.util.List;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.DeleteMapping;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PatchMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import com.dhia.tunist.models.Attraction;
import com.dhia.tunist.services.AttractionService;

import jakarta.validation.Valid;

@RestController
@RequestMapping("/api/attractions")
public class AttractionController {

	@Autowired
	private AttractionService attractionService;

	@PostMapping("/new")
	public ResponseEntity<Attraction> createAttraction(@RequestBody @Valid Attraction attraction) {
		Attraction createdAttraction = attractionService.createAttraction(attraction);
		return new ResponseEntity<>(createdAttraction, HttpStatus.CREATED);
	}

	@GetMapping("/{id}")
	public ResponseEntity<Attraction> findAttractionById(@PathVariable Long id) {
		Attraction foundAttraction = attractionService.findAttractionById(id);

		if (foundAttraction != null) {
			return new ResponseEntity<>(foundAttraction, HttpStatus.OK);
		} else {
			return new ResponseEntity<>(HttpStatus.NOT_FOUND);
		}
	}

	@GetMapping("")
	public ResponseEntity<List<Attraction>> findAllAttractions() {
		List<Attraction> allAttractions = attractionService.allAttractions();


		return new ResponseEntity<>(allAttractions, HttpStatus.OK);
	}

	@PatchMapping("/edit")
	public ResponseEntity<Attraction> updateArticle(@RequestBody @Valid Attraction attraction) {

		Attraction updatedAttraction = attractionService.updateAttraction(attraction);

		return new ResponseEntity<>(updatedAttraction, HttpStatus.CREATED);
	}

	@DeleteMapping("/{id}")
	public ResponseEntity<Void> deleteArticle(@PathVariable Long id) {
		attractionService.deleteAttraction(id);
		return new ResponseEntity<>(HttpStatus.NO_CONTENT);
	}

}
