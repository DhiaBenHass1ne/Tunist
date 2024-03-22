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
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.PutMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import com.dhia.tunist.models.Guide;
import com.dhia.tunist.models.User;
import com.dhia.tunist.services.GuideService;
import com.dhia.tunist.services.UserService;

import jakarta.servlet.http.HttpSession;
import jakarta.validation.Valid;

@RestController
@CrossOrigin(origins = "http://localhost:5173")
@RequestMapping("/api/guides")

public class GuideController {

	@Autowired
	private GuideService guideService;

	@Autowired
	private UserService userService;

	@GetMapping("")
	public List<Map<String, Object>> allGuides() {
		List<Guide> allGuides = guideService.allGuides();
		List<Map<String, Object>> guideData = new ArrayList<>();
		for (Guide guide : allGuides) {
			Map<String, Object> guideMap = new HashMap<>();
			guideMap.put("id", guide.getId()); // Add article data
			guideMap.put("guide", guide);
			List<String> cin = guide.getCin();
			if (cin!=null) {
				
			List<Map<String, String>> newCin = new ArrayList<>();
			for (String image : cin) {
				Map<String, String> map = new HashMap<>();
				map.put("url", image);
				newCin.add(map);
			}
			guideMap.put("cin", newCin);
			}
			guideMap.put("publicTours", guide.getPublicTour());
			User user = guide.getUser(); // Assuming you have a PublisherModel class
			if (user != null && user.getId() != null) {
				System.out.println("first attraction ===>"+user) ;
				
				Map<String, Object> userMap = new HashMap<>();
				userMap.put("id", user.getId());
				userMap.put("firstName", user.getFirstName());
				userMap.put("lastName", user.getLastName());
				userMap.put("image", user.getImage());
				guideMap.put("user", userMap);
				
		}
			guideData.add(guideMap);
		}
		
		
		return guideData;
		
	
	}

	@PostMapping("")
	public ResponseEntity<Object> newGuide(@RequestBody @Valid Guide guide, HttpSession session) {

		Long userId = guide.getUser().getId();
		User user = userService.findUserById(userId);

		guide.setUser(user);
		Guide newGuide = guideService.createGuide(guide);
		user.setGuide(newGuide);
		userService.updateUser(user);
//		System.out.println("user linked to guide is ===> id : "+guide.getUser().getId()+" ==== email : "+guide.getUser().getEmail());
//		return new ResponseEntity<>(newGuide,HttpStatus.CREATED);	
		return ResponseEntity.ok().body(newGuide);

	}

	@GetMapping("/{id}")
	public ResponseEntity<Map<String, Object>> oneGuide(@PathVariable("id") Long id) {
		Guide guide = guideService.findGuideById(id);
		if (guide != null) {
			Map<String, Object> guideMap = new HashMap<>();
			guideMap.put("id", guide.getId()); // Add article data
			guideMap.put("guide", guide);
			List<String> cin = guide.getCin();
			if (cin!=null) {
				
			List<Map<String, String>> newCin = new ArrayList<>();
			for (String image : cin) {
				Map<String, String> map = new HashMap<>();
				map.put("url", image);
				newCin.add(map);
			}
			guideMap.put("cin", newCin);
			}
			guideMap.put("publicTours", guide.getPublicTour());
			User user = guide.getUser(); // Assuming you have a PublisherModel class
			if (user != null && user.getId() != null) {
				System.out.println("first attraction ===>"+user) ;
				
				Map<String, Object> userMap = new HashMap<>();
				userMap.put("id", user.getId());
				userMap.put("firstName", user.getFirstName());
				userMap.put("lastName", user.getLastName());
				userMap.put("image", user.getImage());
				guideMap.put("user", userMap);}
			return new ResponseEntity<>(guideMap, HttpStatus.OK);
		} else {
			return new ResponseEntity<>(HttpStatus.NOT_FOUND);
		}
	}

	@PutMapping("/{id}")
	public ResponseEntity<Guide> updateGuide(@RequestBody @Valid Guide guide, @PathVariable("id") Long id,
			HttpSession session) {
		guide.setId(id);
		System.out.println("put method start");
		Guide updatedGuide = guideService.findGuideById(id);
		System.out.println("edit form status===>"+guide.getStatus());
		updatedGuide.setStatus(guide.getStatus());
		System.out.println("updating guide status befor update"+ updatedGuide.getStatus());
		guideService.updateGuide(updatedGuide);
		System.out.println("guide status after after==>"+updatedGuide.getStatus());
		
		
//		guideService.updateGuide(guide);  maybe use this with post man
		return new ResponseEntity<>(updatedGuide, HttpStatus.CREATED);

	}

	@DeleteMapping("/{id}")
	public ResponseEntity<Void> deleteGuide(@PathVariable("id") Long id) {
		guideService.deleteGuide(id);
		return new ResponseEntity<>(HttpStatus.NO_CONTENT);
	}
}
