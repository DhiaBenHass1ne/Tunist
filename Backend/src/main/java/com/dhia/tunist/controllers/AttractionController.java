package com.dhia.tunist.controllers;

import java.util.ArrayList;
import java.util.HashMap;
import java.util.List;
import java.util.Map;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.CrossOrigin;
import org.springframework.web.bind.annotation.DeleteMapping;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PatchMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import com.dhia.tunist.models.Attraction;
import com.dhia.tunist.models.User;
import com.dhia.tunist.services.AttractionService;
import com.dhia.tunist.services.PrivateTourService;
import com.dhia.tunist.services.PublicTourService;
import com.dhia.tunist.services.UserService;

import jakarta.validation.Valid;

@RestController
@CrossOrigin(origins = "http://localhost:5173")
@RequestMapping("/api/attractions")
public class AttractionController {

	@Autowired
	private AttractionService attractionService;
	@Autowired
	private UserService userService;
	@Autowired
	private PublicTourService	publicToursService;
	@Autowired
	private PrivateTourService privateToursService;
	@PostMapping("")
	public ResponseEntity<Attraction> createAttraction(@RequestBody @Valid Attraction attraction) {
		
	
			
		User user = userService.findUserById(attraction.getAuthor().getId());		
		attraction.setAuthor(user);
		
	
		
		Attraction createdAttraction = attractionService.createAttraction(attraction);
		return new ResponseEntity<>(createdAttraction, HttpStatus.CREATED);
	}

	@GetMapping("/{id}")
	public ResponseEntity<Map<String, Object>> findAttractionById(@PathVariable Long id) {
		Attraction foundAttraction = attractionService.findAttractionById(id);
		if (foundAttraction != null) {
			Map<String, Object> attractionMap = new HashMap<>();
			attractionMap.put("id", foundAttraction.getId());
			List<Map<String,String>> newMedia = new ArrayList<>();
			List<String> media= foundAttraction.getMedia();
			for (String image : media) {
				Map<String, String> map = new HashMap<>();
				map.put("url", image);
				newMedia.add(map) ;
			 }
			attractionMap.put("media",newMedia);

			attractionMap.put("attraction", foundAttraction); // Add article data
			User author = foundAttraction.getAuthor(); // Assuming you have a PublisherModel class
			if (author != null && author.getId() != null) {
				Map<String, Object> userMap = new HashMap<>();

				userMap.put("id", author.getId()); // Add publisher ID to article map
				userMap.put("firstName", author.getFirstName());
				userMap.put("lastName", author.getLastName());
				userMap.put("image", author.getImage());
				attractionMap.put("author",userMap );
			} 
			return new ResponseEntity<>(attractionMap, HttpStatus.OK);

		} 

		else {
			return new ResponseEntity<>(HttpStatus.NOT_FOUND);

		}
	}

	@GetMapping("")
	public ResponseEntity<List<Map<String, Object>>> findAllAttractions() {
		
		
		
		List<Attraction> allAttractions = attractionService.allAttractions(); // Assuming you have an Article class
        List<Map<String, Object>> attractionData = new ArrayList<>();

        for (Attraction attraction : allAttractions) {
            Map<String, Object> attractionMap = new HashMap<>();
            
            attractionMap.put("id", attraction.getId()); // Add article data
            attractionMap.put("position", attraction.getPosition()); // Add article data
            attractionMap.put("attraction", attraction); // Add article data
            User author = attraction.getAuthor(); // Assuming you have a PublisherModel class
            if (author != null && author.getId() != null) {
            	Map<String, Object> userMap = new HashMap<>();

				userMap.put("id", author.getId()); // Add publisher ID to article map
				userMap.put("firstName", author.getFirstName());
				userMap.put("lastName", author.getLastName());
				userMap.put("image", author.getImage());
				attractionMap.put("author",userMap );
            } 

            attractionData.add(attractionMap);
        }


		

		return new ResponseEntity<>(attractionData, HttpStatus.OK);
	}

	@PatchMapping("/{id}")
	public ResponseEntity<Attraction> updateArticle(@RequestBody @Valid Attraction attraction, @PathVariable Long id) {
		attraction.setId(id);	
		Attraction updatedAttraction = attractionService.updateAttraction(attraction);

		return new ResponseEntity<>(updatedAttraction, HttpStatus.CREATED);
	}

	@DeleteMapping("/{id}")
	public ResponseEntity<Void> deleteArticle(@PathVariable Long id) {
		attractionService.deleteAttraction(id);
		return new ResponseEntity<>(HttpStatus.NO_CONTENT);
	}

}
