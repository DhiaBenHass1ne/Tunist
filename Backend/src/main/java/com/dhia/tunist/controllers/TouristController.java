package com.dhia.tunist.controllers;

import java.util.List;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.validation.BindingResult;
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
	public ResponseEntity<Tourist> getOne(@PathVariable("id")Long id) {
		Tourist tourist = touristService.findTouristById(id);
		
		return new ResponseEntity<>(tourist,HttpStatus.OK);
	}
	
	@PostMapping("")
	public ResponseEntity<Tourist> createTourist(@RequestBody @Valid Tourist tourist , HttpSession s,BindingResult result) {
		Long user_id= (Long) s.getAttribute("user_id");
		User user = userService.findUserById(user_id);
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
