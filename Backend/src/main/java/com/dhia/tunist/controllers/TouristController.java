package com.dhia.tunist.controllers;

import java.util.HashMap;
import java.util.List;
import java.util.Map;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.validation.BindingResult;
import org.springframework.web.bind.annotation.CrossOrigin;
import org.springframework.web.bind.annotation.DeleteMapping;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PatchMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import com.dhia.tunist.models.Tourist;
import com.dhia.tunist.models.User;
import com.dhia.tunist.services.TouristService;
import com.dhia.tunist.services.UserService;

import jakarta.servlet.http.HttpSession;
import jakarta.validation.Valid;

@RestController
@CrossOrigin(origins = "http://localhost:5173")
@RequestMapping("/api/tourists")
public class TouristController {

	
	@Autowired
	private TouristService touristService;
	
	@Autowired
	private UserService userService;
	
	@GetMapping("")
	public ResponseEntity<List<Tourist>> getAll() {
		List<Tourist> allTourists = touristService.allTourists();
		
		return new ResponseEntity<List<Tourist>>(allTourists,HttpStatus.OK);
	}
	
	@GetMapping("/{id}")
	public ResponseEntity<Map<String, Object>> getOne(@PathVariable("id")Long id) {
		Tourist tourist = touristService.findTouristById(id);
		if(tourist!=null) {
			Map<String, Object> touristMap = new HashMap<>();
			touristMap.put("id", tourist.getId()); 
			
			touristMap.put("privateTours", tourist.getPrivateTour());
			touristMap.put("publicTours", tourist.getPublicTour());
			touristMap.put("nationality", tourist.getNationality());
			if(tourist.getUser() !=null) {	
				System.out.println("tourist's user id ====>"+tourist.getUser().getId());
			Map<String, Object> userMap = new HashMap<>();
			userMap.put("firstName", tourist.getUser().getFirstName());
			userMap.put("lastName", tourist.getUser().getLastName());
			userMap.put("image", tourist.getUser().getImage());
			userMap.put("attraction", tourist.getUser().getAttractions());
			userMap.put("houses", tourist.getUser().getHouses());
			touristMap.put("user", userMap);}
			
			return new ResponseEntity<>(touristMap, HttpStatus.OK);

			}
			  else {
		            return new ResponseEntity<>(HttpStatus.NOT_FOUND);
		         		}

		}
	
	
	@PostMapping(path="", consumes = "application/json;charset=UTF-8")
	public ResponseEntity<Tourist> createTourist(@RequestBody @Valid Tourist tourist , HttpSession s,BindingResult result) {
//		tourist.setUser(user);
		User user = userService.findUserById(tourist.getUser().getId());
		  tourist.setUser(user);
		Tourist newTourist = touristService.createTourist(tourist);
		user.setTourist(newTourist);
		userService.updateUser(user);

		
		return new ResponseEntity<>(newTourist,HttpStatus.CREATED);
		
	}
	
	@PatchMapping("/{id}")
    public ResponseEntity<Tourist> updateTourist(@RequestBody @Valid Tourist tourist , 
            BindingResult result, HttpSession session) {
        Tourist updatedTourist = touristService.updateTourist(tourist);
        return new ResponseEntity<>(updatedTourist, HttpStatus.OK);
    }

    @DeleteMapping("/{id}")
    public ResponseEntity<Long> deleteTourist(@PathVariable("id") Long id) {
        touristService.deleteTourist(id);
        return new ResponseEntity<>(id,HttpStatus.OK);
    }
	
	
}
