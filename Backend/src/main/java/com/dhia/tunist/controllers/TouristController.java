package com.dhia.tunist.controllers;

import java.util.List;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.validation.BindingResult;
import org.springframework.web.bind.annotation.DeleteMapping;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.ModelAttribute;
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
	public List<Tourist> getAll() {
		List<Tourist> allTourists = touristService.allTourists();
		
		return allTourists;
	}
	
	@GetMapping("/{id}")
	public Tourist getOne(@PathVariable("id")Long id) {
		Tourist tourist = touristService.findTouristById(id);
		
		return tourist;
	}
	
	@PostMapping("")
	public Tourist createTourist(@RequestBody @Valid Tourist tourist , HttpSession s,BindingResult result) {
		if (result.hasErrors()) {
			return null;
		}
		Long user_id= (Long) s.getAttribute("user_id");
		User user = userService.findUserById(user_id);
		tourist.setUser(user);
		Tourist newTourist = touristService.createTourist(tourist);
		user.setTourist(newTourist);
		userService.updateUser(user);
		
		return newTourist;
		
	}
	
	@PatchMapping("/{id}")
    public Tourist updateTourist(@Valid @ModelAttribute("tourist") Tourist tourist , 
            BindingResult result, @PathVariable("id") Long id, HttpSession session) {

        if(result.hasErrors()) {
            return null;
        }
        touristService.updateTourist(tourist);
        return tourist;

    }

    @DeleteMapping("/{id}")
    public String deleteTourist(@PathVariable("id") Long id) {
        touristService.deleteTourist(id);
        return "deleted tourist with id= "+id+" successfully.";
    }
	
	
}
