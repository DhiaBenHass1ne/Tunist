package com.dhia.tunist.controllers;

import java.util.List;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.ui.Model;
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

import com.dhia.tunist.models.Article;
import com.dhia.tunist.models.Guide;
import com.dhia.tunist.models.User;
import com.dhia.tunist.services.GuideService;
import com.dhia.tunist.services.UserService;

import jakarta.servlet.http.HttpSession;
import jakarta.validation.Valid;

@RestController
@RequestMapping("/api/guides")
public class GuideController {

	
	@Autowired
	private GuideService guideService;

	
	@Autowired
	private UserService userService;
	
	
	@GetMapping("")
	public ResponseEntity<List<Guide>>  allGuides() {
		List<Guide> allGuides = guideService.allGuides();
		return new ResponseEntity<>(allGuides,HttpStatus.OK) ;
	}
	
	@PostMapping("")
	public ResponseEntity<Guide>  newGuide( @RequestBody @Valid Guide guide , 
            HttpSession session) {
		
		
//		Long userid= (Long) session.getAttribute("user_id");
//		User user= userService.findUserById(userid);
//		guide.setUser(user);
		Guide newGuide = guideService.createGuide(guide);
//		user.setGuide(newGuide);
//		userService.updateUser(user);
		
		return new ResponseEntity<>(newGuide,HttpStatus.CREATED);	
	}
	
	@GetMapping("/{id}")
	public ResponseEntity<Guide> oneGuide(@PathVariable("id") Long id) {
		Guide guide= guideService.findGuideById(id);
		 if (guide != null) {
	            return new ResponseEntity<>(guide, HttpStatus.OK);
	        } else {
	            return new ResponseEntity<>(HttpStatus.NOT_FOUND);
	        }
	}
	
	@PatchMapping("/{id}")
	public ResponseEntity<Guide>  updateGuide(@RequestBody @Valid Guide guide , 
           @PathVariable("id") Long id, HttpSession session) {
	
		Long userid= (Long) session.getAttribute("user_id");
		User user= userService.findUserById(userid);
		guide.setUser(user);
		guideService.updateGuide(guide);
    	return new ResponseEntity<>(guide, HttpStatus.CREATED);
		
	}
	
	@DeleteMapping("/{id}")
	public ResponseEntity<Void> deleteGuide(@PathVariable("id") Long id) {
		guideService.deleteGuide(id);
        return new ResponseEntity<>(HttpStatus.NO_CONTENT);
	}
}
